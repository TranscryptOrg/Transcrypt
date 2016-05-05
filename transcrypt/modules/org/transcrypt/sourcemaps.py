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
		self.prefab = [self.encode ([i], True) for i in range (self.prefabSize)]
	
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
				numbers.append (sign * accu)												#	Append accumulated number to results
				accu = 0																	#	Reset accumulator for next number
				weight = 1																	#	Reset weight, next number will again start with least significant part
				
		return numbers
		
base64VlqConverter = Base64VlqConverter ()

# Tools to create and combine sourcemaps

mapVersion = 3
iTargetLine, iTargetColumn, iSourceIndex, iSourceLine, iSourceColumn = range (5)	

class SourceMap:
	def __init__ (self, targetDir, targetFileName, extraSubdir):
		self.targetDir = targetDir
		self.targetFileName = targetFileName
		self.targetPath = '{}/{}'.format (targetDir, targetFileName)
		self.mapSubdir = '{}/sourcemap'.format (extraSubdir)
		self.mapDir = '{}/{}'.format (self.targetDir, self.mapSubdir) 
		self.mapPath ='{}/{}.map'.format (self.mapDir, targetFileName)
		self.mapRef = '\n//# sourceMappingURL={}/{}\n'.format (self.mapSubdir, self.targetFileName)
		
		self.sourcePaths = []
		self.sourceIndex = 0
		self.mappings = []
		
	def getMapSourcePath (self, sourcePath):
		return '{}/{}'.format (
			self.mapDir,
			sourcePath.replace (':', '\'') .replace ('/', '!') .lower () [-96 : ]
		)
		
	def addMapping (self, mapping, nrOfTargetLines = 1):
		if self.sourceIndex >= len (self.sourcePaths) or self.sourcePaths [self.sourceIndex] != mapping [iSourceIndex]:
			try:
				self.sourceIndex = self.sourcePaths.index (mapping [iSourceIndex])
			except ValueError:
				self.sourceIndex = len (self.sourcePaths)
				self.sourcePaths.append (mapping [iSourceIndex])
					
		# At this point we should have a valid self.currentSourceIndex
		
		for i in range (nrOfTargetLines):
			self.mappings.append ([mapping [iTargetLine] + i , mapping [iTargetColumn], self.sourceIndex, mapping [iSourceLine], mapping [iSourceColumn]])
			
	def generate (self, sourcePath, sourceLineNrs):
		self.mappings = []
		for targetLineIndex, sourceLineNr in enumerate (sourceLineNrs):
			self.addMapping ((targetLineIndex + 1, 0, sourcePath, sourceLineNr, 0))
		
	def loadOrFake (self, sourcePath, nrOfTargetLines):
		if (
			not (os.path.isfile (self.mapPath) and os.path.isfile (self.getMapSourcePath(module.metadata.sourcePath)))	# Both files are needed, and one may have been thrown away
			or
			(utils.commandArgs.build and self.metadata.sourcePath.endswith ('.js'))	# In case of a build and a JavaScript only module, force generation of new fake map
		):
			self.mappings = []
			self.addMapping ((0, 0, sourcePath, 0, 0), nrOfTargetLines)
		else:	
			self.load ()
		
	def concatenate (self, moduleMaps):						# Result in self
		self.mappings = []
		
	def getCascadedMapping (self, shrinkMapping):			# N.B. self.mappings has to be sorted in advance
		for mapping in self.mappings:
			if mapping [iTargetLine] >= shrinkMapping [iSourceLine] and mapping [iTargetColumn] >= shrinkMapping [iSourceColumn]:
				return (
					shrinkMapping [ : iTargetColumn + 1]	# Target location from shrink mapping
					+
					mapping [iSourceIndex : ]				# Source location from self
				)
				
	def cascade (self, shrinkMap, miniMap):					# Result in miniMap
		self.mappings.sort ()		
		miniMap.mappings = [self.getCascadedMapping (shrinkMapping) for shrinkMapping in shrinkMap.mappings]
			
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
					deltaMappings [-1][-1] .append (mapping [i] - oldMapping [i])
				else:
					deltaMappings [-1][-1] .append (mapping [i])
	
		self.rawMap = collections.OrderedDict ([
			('version', mapVersion),
			('file', self.targetPath),
			('sources', self.sourcePaths),
			('mappings', ';'.join ([
				','.join (base64VlqConverter.encode (segment))
				for group in deltaMappings
				for segment in group
				
			]))
		])
		
		with utils.create (self.mapPath) as mapFile:
			mapFile.write (json.dumps (self.rawMap, indent = '\t'))
		
		for sourcePath in self.sourcePaths:		
			if not os.path.isfile (self.getMapSourcePath (sourcePath)):
				shutil.copyfile (sourcePath, self.getMapSourcePath (sourcePath))
				
				
		

		
		

		
