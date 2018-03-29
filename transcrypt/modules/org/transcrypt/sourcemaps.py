import os
import math
import collections
import json
import shutil

from org.transcrypt import utils

'''
A non-cascaded mapping is made by calling 'generate', it uses construction parameters
A cascaded mapping is made as follows:
    - First make a non-cascaded mapping
    - After that have the minifier generate a shrink map, and load it by calling 'load', it uses construction parameters
    - After that call the 'cascade' function to make the cascaded map out of the non-cascaded map
      and the shrink map, it uses construction parameters:
'''


# Tools to embed source map info in target code

lineNrLength = 6
maxNrOfSourceLinesPerModule = 1000000

# Tools to encode and decode numbers as base 64 variable length quantities

class Base64VlqConverter:
    def __init__ (self):
        self.encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'  # Forward lookup table, from index to character, 64 symbols in total
        self.decoding = dict ((char, i) for i, char in enumerate (self.encoding))           # Enable reverse lookup, so from character to index
        
        self.prefabSize = 256                                                               # The 256 most used vlq's are prefabricated
        self.prefab = [self.encode ([i], True) for i in range (self.prefabSize)]
    
    def encode (self, numbers, init = False):
        segment = ''
        for number in numbers:
            if not init and 0 < number < self.prefabSize:
                field = self.prefab [number]
            else:
                signed = bin (abs (number)) [2 : ] + ('1' if number < 0 else '0')           # Convert to binary, chop off '0b' and append sign bit
                nChunks = math.ceil (len (signed) / 5.0)                                    # Determine minimum nr of needed 5 bit chunks (2 ^ 5 == 32)
                padded = (5 * '0' + signed) [-nChunks * 5 : ]                               # Pad by prepending zeroes to fit integer nr of chunks
                chunks = [
                    ('1' if iChunk else '0') + padded [                                     # Prefix first chunk with 0, continuation chunks with 1 (continuation bit)
                        iChunk * 5 : (iChunk + 1) * 5                                       # Pick out a not yet prefixed chunk from the padded bits 
                    ] 
                    for iChunk in range (nChunks - 1, -1, -1)                               # Reverse chunks, so the chunk starting with 0 will be last, first has sign bit
                ]                                                                           # So encountering a chunk with int value < 32 will denote end of number
                field = ''.join ([self.encoding [int (chunk, 2)] for chunk in chunks])      # Convert each chunk, incl. continuation bit to its encoding
            segment += field
        return segment

    def decode (self, segment):
        numbers = []
        accu = 0
        weight = 1

        for char in segment:
            ordinal = self.decoding [char]
            isContinuation = ordinal >= 32
            
            if isContinuation:
                ordinal -=32                                                                # Reset continuation bit
                
            if weight == 1:                                                                 # It was the tail of a number
                sign = -1 if ordinal % 2 else 1                                             # Remember sign
                ordinal //= 2                                                               # Remove sign bit, no matter what it was
                
            accu += weight * ordinal                                                        # Add new ordinal as currently least significant
            
            if isContinuation:                                                              # If it's a continuation
                if weight == 1:                                                             #   If it's the first continuation it will have the sign bit
                    weight = 16                                                             #       So next weight is 16
                else:                                                                       #   Else it won't have the sign bit:
                    weight *= 32                                                            #       So next weight * 32
            else:                                                                           # Else  ('no continuation' means 'end of number', since chunks are reversed)
                numbers.append (sign * accu)                                                #   Append accumulated number to results
                accu = 0                                                                    #   Reset accumulator for next number
                weight = 1                                                                  #   Reset weight, next number will again start with least significant part
                
        return numbers
        
base64VlqConverter = Base64VlqConverter ()

# Tools to create and combine sourcemaps

mapVersion = 3
iTargetLine, iTargetColumn, iSourceIndex, iSourceLine, iSourceColumn = range (5)    # Line indexes rather than line numbers are stored  

class SourceMapper: # There's only one sourcemapper needed to generate all maps of a module
    def __init__ (
        self,
        moduleName = '',
        targetDir,
        minify,
        dump
    ):
        self.moduleName = moduleName
        self.targetDir = targetDir
        self.minify = minify
        self.dump = dump
        
        self.clear ()
        
    def clear (self):
        self.mappings = []
        
    def generate (self, sourceLineNrs):
        self.clear ()
        
        for targetLineIndex, sourceLineNr in enumerate (sourceLineNrs):
            self.generatedMappings.append ((targetLineIndex, 0, 0, sourceLineNr - 1, 0))   
            
        self.generatedMappings.sort ()
        
        infix = 'pretty.'  if minify else ''
        
        self.save (self.generatedMappings, infix, '.py')
        
        if self.dump:
            self.dumpMap (self.generatedMappings, infix)
            self.dumpDeltaMap (self.generatedMappings, infix)
            
    def cascade (self):
        def getCascadedMapping (shrinkMapping):                                 # N.B. self.generatedMappings has to be sorted in advance
            generatedMapping = self.generatedMappings [min (shrinkMapping [iSourceLine], len (self.generatedMappings) - 1)] 
            
            result =            (
                shrinkMapping [ : iTargetColumn + 1]                            # Target location from shrink mapping
                +
                generatedMapping [iSourceIndex : ]                              # Source location from self
            )
            if self.dump:
                self.cascadeMapdumpFile.write ('{} {} {}\n'.format (result, shrinkMapping, generatedMapping))
            return result
        
        if dump:
            self.cascadeMapdumpFile = utils.create ('{self.workDir}/{self.prename}.cascade_map_dump')
        
        self.miniMappings = [
            getCascadedMapping (shrinkMapping)
            for shrinkMapping in self.shrinkMappings
        ]
        
        self.save (self.miniMappings, '', '.js')
        
        if dump:
            self.cascadeMapdumpFile.close ()
        
    def loadShrinkMap (self):
        with open  (f'{self.moduleName}.shrink.map') as mapFile:
            rawMap = json.loads (mapFile.read ())
                
        deltaMappings = [
            [base64VlqConverter.decode (segment) for segment in group.split (',')]
            for group in rawMap ['mappings'] .split (';')
        ]
        
        self.shrinkMappings = []
        for groupIndex, deltaGroup in enumerate (deltaMappings):
            for segmentIndex, deltaSegment in enumerate (deltaGroup):
                if deltaSegment:                                                # Shrink map ends with empty group, i.e. 'holding empty segment'
                    if segmentIndex:
                        self.shrinkMappings.append ([groupIndex, deltaSegment [0] + self.mappings [-1][1]])
                    else:                                                       # Start of group
                        self.shrinkMappings.append ([groupIndex, deltaSegment [0]])   # Absolute target column
                        
                    for i in range (1, 4):
                        if groupIndex or segmentIndex:
                            self.shrinkMappings [-1] .append (deltaSegment [i] + self.mappings [-2][i + 1])
                        else:                                                   # Start of map
                            try:
                                self.mappings [-1] .append (deltaSegment [i])   # Absolut file index, source line and source column
                            except:                                             # Shrink map starts with 'A' rather than 'AAAA'
                                self.mappings [-1] .append (0)
                                
        self.shrinkMappings.sort ()
                                
        if dump:
            self.dumpMap (self.shrinkMappings, '.shrink')
            self.dumpDeltaMap (deltaMappings, '.shrink')
            
    def save (self, mappings, infix, sourceExtension):                
        mappings.sort ()
        
        deltaMappings = []
        oldMapping = [-1, 0, 0, 0, 0]
        for mapping in mappings:
            newGroup = mapping [iTargetLine] != oldMapping [iTargetLine]
            
            if newGroup:
                deltaMappings.append ([])                                                              # Append new group
                
            deltaMappings [-1] .append ([])                                                            # Append new segment, one for each mapping
            
            if newGroup:
                deltaMappings [-1][-1] .append (mapping [iTargetColumn])                               # Only target column reset for every group
            else:
                deltaMappings [-1][-1] .append (mapping [iTargetColumn] - oldMapping [iTargetColumn])  # Others are delta's, so cumulative
                    
            for i in [iSourceIndex, iSourceLine, iSourceColumn]:
                self.deltaMappings [-1][-1] .append (mapping [i] - oldMapping [i])
                    
            oldMapping = mapping
                                    
        rawMap = collections.OrderedDict ([
            ('version', mapVersion),
            ('file', prename + f'{prename.js'), # Target
            ('sources', [f'{prename}{infix}{sourceExtension}']),
            ('sourcesContent', [null]),
            ('mappings', ';'.join ([
                ','.join ([
                    base64VlqConverter.encode (segment)
                    for segment in group
                ])
                for group in deltaMappings
            ]))
        ])
                
        with utils.create () as mapFile:
            mapFile.write (json.dumps (self.rawMap, indent = '\t'))
            
        if self.dump:
            self.dumpMap (mappings, infix)
            self.dumpDeltaMap (deltaMappings, infix)
            
    def dumpMap (self, mappings, infix):
        with utils.create (f'{self.prename}{infix}.map_dump') as mapdumpFile:
            mapdumpFile.write ('mapVersion: {}\n\n'.format (mapVersion))
            mapdumpFile.write ('targetPath: {}\n\n'.format (self.targetPath))
            mapdumpFile.write ('sourcePaths: {}\n\n'.format (self.sourcePaths))
            mapdumpFile.write ('mappings:\n')
            for mapping in mappings:
                mapdumpFile.write ('\t{}\n'.format (mapping))
                
    def dumpDeltaMap (self, deltaMappings, infix):
        with utils.create (f'{self.prename}{infix}.delta_map_dump') as deltaMapdumpFile:
            for group in deltaMappings:
                deltaMapdumpFile.write ('(New group) ')
                for segment in group:
                    deltaMapdumpFile.write ('Segment: {}\n'.format (segment))

        
                