import os
import math
import collections
import json
import shutil

from org.transcrypt import utils

'''
A non-cascaded mapping is made by calling 'generate', it uses construction parameters

    - targetPath            The path to the target (pretty) file, since that has to be in the sourcemap
    - mapPath               Where it has to write itself
    - mapdumpPath           Debug dump
    - deltaMapdumpPath      Debug dump of deltas

A cascaded mapping is made as follows:

    - First make a non-cascaded mapping

    - After that have the minifier generate a shrink map, and load it by calling 'load', it uses construction parameters
    
        - targetPath            The path to target (minified) file, since that has to be in the sourcemap
        - mapPath               Where it has to write itself
        - mapdumpPath           Debug dump
        - deltaMapdumpPath      Debug dump of deltas
        
    - After that call the 'cascade' function to make the cascaded map out of the non-cascaded map
      and the shrink map, it uses construction parameters:
      
        - targetPath            The path to target (minified) file, since that has to be in the sourcemap
        - mapPath               Where it has to write itself
        - mapdumpPath           Debug dump
        - deltaMapdumpPath      Debug dump of deltas
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

class SourceMap:
    def __init__ (
        self,
        targetPath,
        mapPath,
        mapdumpPath = '',
        deltaMapdumpPath = '',
        cascadeMapdumpPath = '',
    ):
        self.targetPath = targetPath
        self.mapPath = mapPath
        self.mapdumpPath = mapdumpPath
        self.deltaMapdumpPath = deltaMapdumpPath
        self.cascadeMapdumpPath = cascadeMapdumpPath
        self.clear ()
        
    def clear (self):
        self.sourcePaths = []
        self.sourceCodes = []
        self.sourceIndex = 0
        self.mappings = []      # Exactly one mapping per target line?
        
    def generate (self, sourcePath, sourceLineNrs):
        def addMapping (mapping):
            if self.sourceIndex >= len (self.sourcePaths) or self.sourcePaths [self.sourceIndex] != mapping [iSourceIndex]:
                try:
                    self.sourceIndex = self.sourcePaths.index (mapping [iSourceIndex])
                except ValueError:
                    self.sourceIndex = len (self.sourcePaths)
                    self.sourcePaths.append (mapping [iSourceIndex])
            # At this point we should have a valid self.currentSourceIndex
            self.mappings.append ([mapping [iTargetLine], mapping [iTargetColumn], self.sourceIndex, mapping [iSourceLine], mapping [iSourceColumn]])
            
        self.clear ()
        for targetLineIndex, sourceLineNr in enumerate (sourceLineNrs):
            addMapping ((targetLineIndex, 0, sourcePath, sourceLineNr - 1, 0))
            
        for sourcePath in self.sourcePaths:
            self.sourceCodes.append (None)
            
        self.mappings.sort ()   # ??? Needed?
    
        if utils.commandArgs.dmap and self.mapdumpPath and self.deltaMapdumpPath:
            self.dump ()
            
    def cascade (self, shrinkMap, miniMap):                                     # Result in miniMap
        def getCascadedMapping (shrinkMapping):                                 # N.B. self.mappings has to be sorted in advance
            prettyMapping = self.mappings [min (shrinkMapping [iSourceLine], len (self.mappings) - 1)] 
            result =            (
                shrinkMapping [ : iTargetColumn + 1]                            # Target location from shrink mapping
                +
                prettyMapping [iSourceIndex : ]                                 # Source location from self
            )
            if utils.commandArgs.dmap and miniMap.cascadeMapdumpPath:
                self.cascadeMapdumpFile.write ('{} {} {}\n'.format (result, shrinkMapping, prettyMapping))
            return result

        self.mappings.sort ()
        
        if utils.commandArgs.dmap and miniMap.cascadeMapdumpPath:
            self.cascadeMapdumpFile = utils.create (miniMap.cascadeMapdumpPath)
        
        miniMap.mappings = [
            getCascadedMapping (shrinkMapping)
            for shrinkMapping in shrinkMap.mappings
        ]
        
        if utils.commandArgs.dmap and miniMap.cascadeMapdumpPath:
            self.cascadeMapdumpFile.close ()
        
        miniMap.sourcePaths = self.sourcePaths
        miniMap.sourceCodes = self.sourceCodes
        
    def load (self):                                                            # Only maps with a single soure file ever get loaded
        with open (self.mapPath) as mapFile:
            self.rawMap = json.loads (mapFile.read ())
            
        self.version = self.rawMap ['version']
        self.sourcePaths =  self.rawMap ['sources']
        
        try:
            self.sourceCodes =  self.rawMap ['sourcesContent']
        except:                                                                 # Shrink map doesn't contain source codes
            pass
                
        self.deltaMappings = [
            [base64VlqConverter.decode (segment) for segment in group.split (',')]
            for group in self.rawMap ['mappings'] .split (';')
        ]
        
        self.mappings = []
        for groupIndex, deltaGroup in enumerate (self.deltaMappings):
            for segmentIndex, deltaSegment in enumerate (deltaGroup):
                if deltaSegment:                                                # Shrink map ends with empty group, i.e. 'holding empty segment'
                    if segmentIndex:
                        self.mappings.append ([groupIndex, deltaSegment [0] + self.mappings [-1][1]])
                    else:                                                       # Start of group
                        self.mappings.append ([groupIndex, deltaSegment [0]])   # Absolute target column
                        
                    for i in range (1, 4):
                        if groupIndex or segmentIndex:
                            self.mappings [-1] .append (deltaSegment [i] + self.mappings [-2][i + 1])
                        else:                                                   # Start of map
                            try:
                                self.mappings [-1] .append (deltaSegment [i])   # Absolut file index, source line and source column
                            except:                                             # Shrink map starts with 'A' rather than 'AAAA'
                                self.mappings [-1] .append (0)
                                
        self.mappings.sort ()
                                
        if utils.commandArgs.dmap and self.mapdumpPath and self.deltaMapdumpPath:
            self.dump ()
            
    def save (self):
        self.rawMappings = []
        targetColumnShift = 0
        sourceLineShift = 0
        sourceColumnShift = 0
        
        self.mappings.sort ()
        
        self.deltaMappings = []
        oldMapping = [-1, 0, 0, 0, 0]
        for mapping in self.mappings:
            newGroup = mapping [iTargetLine] != oldMapping [iTargetLine]
            
            if newGroup:
                self.deltaMappings.append ([])                                                              # Append new group
                
            self.deltaMappings [-1] .append ([])                                                            # Append new segment, one for each mapping
            
            if newGroup:
                self.deltaMappings [-1][-1] .append (mapping [iTargetColumn])                               # Only target column reset for every group
            else:
                self.deltaMappings [-1][-1] .append (mapping [iTargetColumn] - oldMapping [iTargetColumn])  # Others are delta's, so cumulative
                    
            for i in [iSourceIndex, iSourceLine, iSourceColumn]:
                self.deltaMappings [-1][-1] .append (mapping [i] - oldMapping [i])
                    
            oldMapping = mapping
                                    
        self.rawMap = collections.OrderedDict ([
            ('version', mapVersion),
            ('file', self.targetPath),
            ('sources', self.sourcePaths),
            ('sourcesContent', self.sourceCodes),
            ('mappings', ';'.join ([
                ','.join ([
                    base64VlqConverter.encode (segment)
                    for segment in group
                ])
                for group in self.deltaMappings
            ]))
        ])
                
        with utils.create (self.mapPath) as mapFile:
            mapFile.write (json.dumps (self.rawMap, indent = '\t'))
            
        if utils.commandArgs.dmap:
            self.dump ()
            
    def dump (self):
        with utils.create (self.mapdumpPath) as mapdumpFile:
            mapdumpFile.write ('mapVersion: {}\n\n'.format (mapVersion))
            mapdumpFile.write ('targetPath: {}\n\n'.format (self.targetPath))
            mapdumpFile.write ('sourcePaths: {}\n\n'.format (self.sourcePaths))
            mapdumpFile.write ('mappings:\n')
            for mapping in self.mappings:
                mapdumpFile.write ('\t{}\n'.format (mapping))
           
        if hasattr (self, 'deltaMappings'):
            with utils.create (self.deltaMapdumpPath) as deltaMapdumpFile:
                for group in self.deltaMappings:
                    deltaMapdumpFile.write ('(New group) ')
                    for segment in group:
                        deltaMapdumpFile.write ('Segment: {}\n'.format (segment))

        
                