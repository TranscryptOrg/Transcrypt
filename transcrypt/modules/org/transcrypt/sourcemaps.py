import os
import math
import collections
import json
import shutil

from org.transcrypt import utils

# Tools to embed source map info in target code

lineNrLength = 6
maxNrOfSourceLinesPerModule = 1000000

# Tools to encode and decode numbers as base 64 variable length quantities

class Base64VlqConverter:
	def __init__ (self):
		self.encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'	# Forward lookup table, from index to character, 64 symbols in total
		self.decoding = dict ((char, i) for i, char in enumerate (self.encoding))			# Enable reverse lookup, so from character to index
		
		self.prefabSize = 256																# The 256 most used vlq's are prefabricated
		self.prefab = [self.encode (i, True) for i in range (self.prefabSize)]
	
	def encode (self, numbers, init = False):
		segment = ''
		for number in numbers:
			if not init and 0 < number < self.prefabSize:
				return self.prefab [number]
			else:
				signed = bin (abs (number)) [2 : ] + ('1' if number < 0 else '0')			# Convert to binary, chop off '0b' and append sign bit
				nChunks = math.ceil (len (signed) / 5.0)									# Determine minimum nr of needed 5 bit chunks (2 ^ 5 == 32)
				padded = (5 * '0' + signed) [-nChunks * 5 : ]								# Pad by prepending zeroes to fit integer nr of chunks
				chunks = [
					('1' if iChunk else '0') + padded [										# Prefix first chunk with 0, continuation chunks with 1 (continuation bit)
						iChunk * 5 : (iChunk + 1) * 5										# Pick out a not yet prefixed chunk from the padded bits 
					] 
					for iChunk in range (nChunks - 1, -1, -1)								# Reverse chunks, so the chunk starting with 0 will be last, first has sign bit
				]																			# So encountering a chunk with int value < 32 will denote end of number
				field = ''.join ([self.encoding [int (chunk, 2)] for chunk in chunks])		# Convert each chunk, incl. continuation bit to its encoding
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
				ordinal -=32																# Reset continuation bit
				
			if weight == 1:																	# It was the tail of a number
				sign = -1 if ordinal % 2 else 1												# Remember sign
				ordinal //= 2																# Remove sign bit, no matter what it was
				
			accu += weight * ordinal														# Add new ordinal as currently least significant
			
			if isContinuation:																# If it's a continuation
				if weight == 1:																#	If it's the first continuation it will have the sign bit
					weight = 16																#		So next weight is 16
				else:																		# 	Else it won't have the sign bit:
					weight *= 32															# 		So next weight * 32
			else:																			# Else	('no continuation' means 'end of number', since chunks are reversed)
				numbers.append (sign * accu)											#	Append accumulated number to results
				accu = 0																	#	Reset accumulator for next number
				weight = 1																	#	Reset weight, next number will again start with least significant part
				
		return numbers
		
base64VlqConverter = Base64VlqConverter ()

# Tools to create and combine sourcemaps

mapVersion = 3
		
class SourceMap:
	def __init__ (self, targetDir, targetFileName):
		self.targetDir = targetDir
		self.targetFileName = targetFilename
		self.targetPath = '{}/{}'.format (targetDir, targetFileName)
		self.mapPath ='{}/extra/sourcemap/{}.map'.format (targetDir, targetFileName)
		
		self.version = 3		
		self.sourcePaths = []
		self.sourceIndex = -1
		self.mappings = []
		
	def addMapping (self, targetLine, targetColumn, sourcePath, sourceLine, sourceColumn, nrOfTargetLines):
		if self.sourcePaths [self.sourceIndex] != sourcePath:
			self.sourceIndex = self.sourcePaths.index (sourcePath)
			if self.sourceIndex == -1:
				self.sourceIndex = len (self.sourcePaths)
				self.sourcePaths.append (sourcePath)
					
		# At this point we should have a valid self.currentSourceIndex
		
		for i in range (nrOfTargetLines):
			self.mappings.append ([targetLine + i , targetColumn, sourceIndex, soureRow, sourceColumn])
						
	def load (self):
		with open (self.mapPath) as mapFile:
			self.rawMap = json.loads (mapFile.read ())
			
		self.version = self.rawMap ['version']
		self.sourcePaths =	self.rawMap ['sourcePaths']
		self.sourceIndex = -1
		
		deltaMappings = [
			[base64VlqConverter.decode (segment) for segment in group.split (',')]
			for group in self.rawMap ['map'] .split (';')
		]
		
		self.mappings = []
		for groupIndex, deltaGroup in enumerate (deltaMappings):
			for segmentIndex, deltaSegment in enumerate (deltaGroup):
				if segmentIndex:
					self.mappings.append ([self.mappings [-1][0] + deltaSegment [0]])
				else:
					self.mappings.append ([deltaSegment [0]])
					
				for i in range (1, 5):
					if groupIndex:
						self.mappings [-1] .append (self.mappings [-2][i] + deltaSegment [i])
					else:
						self.mappings [-1] .append (deltaSegment [i])
			
	def save (self):
		self.rawMappings = []
		targetColumnShift = 0
		sourceLineShift = 0
		sourceColumnShift = 0
		
		self.mappings.sort ()
		deltaMappings = []	
		oldMapping = [-1, -1, -1, -1, -1]
		for mapping in self.mappings:
			if mapping [0] == oldMapping [0]:									# Same target line means existing group
				deltaMappings [-1] .append ([mapping [0] - oldMapping [0]])
			else:																# Different target line means new group
				deltaMappings.append ([])
				deltaMappings [-1] .append ([mapping [0]])
			
			for i in range (1, 5):
				if len (deltaMappings) > 1:
					deltaMappings [-1] .append ([mapping [i] - oldMapping [i]])
				else:
					deltaMappings [-1] .append ([mapping [i])
	
		self.rawMap = collections.OrderedDict ([
			('version', self.version),
			('file', self.targetPath),
			('sources', [self.sourcePaths),
			('mappings', ';'.join ([
				','.join (base64VlqConverter.code (segment)) for segment in group
				for group in self.deltaMappings
			]))
		])
		
		with utils.create (self.mapPath) as mapFile:
			mapFile.write (json.dumps (self.rawMap, indent = '\t'))
		
		for sourcePath in self.sourcePaths:
			mapSourcePath = '{}/{}'.format (
				self.mapDir,
				sourcePath.replace (':', '\'') .replace ('/', '!') .lower () [-96 : ]
			)
		
			if not os.path.isfile (mapSourcePath):
				shutil.copyfile (sourcePath, mapSourcePath)
				
class ProgramMapperMixin:
	def getMapRef (self, mapUrl):
		return '\n//# sourceMappingURL={}\n'.format (mapUrl)
		
	def generatePrettyMap (self):	# Generates segmented map for pretty target file of whole program, .py -> .js
		startLineNr = 4
		rawSections = []
		
		for module in self.allModules:
			startLineNr += self.moduleCaptionSkip
				
			if module.rawMap:
				rawSections.append (collections.OrderedDict ([
					('offset', collections.OrderedDict ([
						('line', startLineNr),
						('column', 0)
					])),
					('map',  module.rawMap)
				]))		
				
				if module.metadata.name != self.mainModuleName:
					shutil.copy (module.metadata.mapSourcePath, self.moduleDict [self.mainModuleName] .metadata.mapDir)

			startLineNr += module.targetCode.count ('\n')
			
		self.rawPrettyMap = collections.OrderedDict ([
			('version', mapVersion),
			('file', self.targetPath),
			('sections', prettySections)
		])
		
		with utils.create (self.prettyMapPath) as aFile:
			aFile.write (json.dumps (self.rawPrettyMap, indent = '\t'))
			
		for module in self.allModules:
			if module.metadata.name != self.mainModuleName:
				shutil.copy (module.metadata.mapSourcePath, self.moduleDict [self.mainModuleName] .metadata.mapDir)
						
	def generateMiniMap (self):	# Cascades segmented pretty map (from Transcrypt) and non-segmented shrink map (from the minifier) into miniMap, .py -> .min.js
	
		# Read shrinkMap, it will be used to convert locations in the prettied target file to locations in the minified target file

		with open (self.metadata.shrinkMapPath) as aFile:
			self.rawShrinkMap = json.loads (aFile.read ())
		
		# Fill a conversion dictionary from the shrinkMap.
		
		conversionDict = {}

		for group in self.rawShrinkMap ['mappings'] .split (';'):
			for segment in group.split (','):
				if not prettyPos in conversionDict:
					conversionDict [prettyPos] = miniPos
		
		# Conversion works progressively, 'move' miniPos forward only if the next prettyPos is in the conversion dictionary
		
		miniPos = (0, 0)
		
		def setMiniPos (prettyPos):
			try:
				miniPos = conversionDict [prettyPos]
			except KeyError:
				pass
			
		# Start out with a rawMiniMap that is a copy of rawPrettyMap and then alter it section by section		
	
		self.rawMiniMap = copy.deepcopy (self.rawPrettyMap)
		
		for section in self.rawMiniMap ['sections']:
		
			# Change offset within pretty target to offset within mini target and 'move' miniPos to that point
		
			prettyPos = section ['offset']['line'], section ['offset']['column']
			miniPos = setMiniPos (prettyPos)
			section ['offset']['line'], section ['offset']['column'] = miniPos
			
			rawPrettyGroups = section ['map'] .split (';')			# Take groups from unmodified, so 'pretty' map, which has only one segment per group
			for lineIndex, group in enumerate (rawPrettyGroups):	
				numbers = base64VlqConverter.decode (group)
				prettyPos = (lineIndex + 1, 0)
				oldMiniPos = miniPos
				setMiniPos (prettyPos)
				if miniPos (0) !=
				
		with utils.create (self.miniMapPath) as aFile:
			aFile.write (json.dumps (self.rawMiniMap, indent = '\t'))
			aFile.write (self.getMapRef (self.miniMapUrl))
				
		

		
		

		
