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
	
	def encode (self, anInteger, init = False):
		if not init and 0 < anInteger < self.prefabSize:
			return self.prefab [anInteger]
		else:
			signed = bin (abs (anInteger)) [2 : ] + ('1' if anInteger < 0 else '0')			# Convert to binary, chop off '0b' and append sign bit
			nChunks = math.ceil (len (signed) / 5.0)										# Determine minimum nr of needed 5 bit chunks (2 ^ 5 == 32)
			padded = (5 * '0' + signed) [-nChunks * 5 : ]									# Pad by prepending zeroes to fit integer nr of chunks
			chunks = [
				('1' if iChunk else '0') + padded [											# Prefix first chunk with 0, continuation chunks with 1 (continuation bit)
					iChunk * 5 : (iChunk + 1) * 5											# Pick out a not yet prefixed chunk from the padded bits 
				] 
				for iChunk in range (nChunks - 1, -1, -1)									# Reverse chunks, so the chunk starting with 0 will be last, first has sign bit
			]																				# So encountering a chunk with int value < 32 will denote end of number
			return ''.join ([self.encoding [int (chunk, 2)] for chunk in chunks])			# Convert each chunk, incl. continuation bit to its encoding

	def decode (self, codedNumbersString):
		decodedInts = []
		accu = 0
		weight = 1

		for char in codedNumbersString:
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
				decodedInts.append (sign * accu)											#	Append accumulated number to results
				accu = 0																	#	Reset accumulator for next number
				weight = 1																	#	Reset weight, next number will again start with least significant part
				
		return decodedInts
				
base64VlqConverter = Base64VlqConverter ()

# Tools to create and combine sourcemaps

mapVersion = 3

class ModuleMapperMixin:
	def generateMap (self, fake = False):	# Generates simple, non-segmented map for module self, .py -> .mod.js
		self.rawMap = collections.OrderedDict ([
			('version', mapVersion),
			('file', self.metadata.targetPath),
			('sources', [self.metadata.mapSourceFileName]),
			('mappings', (
				';'.join (['AACA'] * self.targetCode.count ('\n'))
			) if fake else (
				';'.join ([
					'AA{}A'.format (base64VlqConverter.code (sourceLineNrDelta))
					
					# Adapted to the quirks of Google Chrome and source maps in general
					for sourceLineNrDelta in [								# Start with offset from second line w.r.t. first line
						self.sourceLineNrs [index + 1] - self.sourceLineNrs [index]
						for index in range (len (self.sourceLineNrs) - 1)	# One entry less than the nr of lines
					]
				])
			))
		])
		
		with utils.create (self.metadata.mapPath) as aFile:
			aFile.write (json.dumps (self.rawMap, indent = '\t'))
		
		shutil.copyfile (self.metadata.sourcePath, self.metadata.mapSourcePath)
	
	def loadOrFakeMap (self):
		if (
			not (os.path.isfile (self.metadata.mapPath) and os.path.isfile (self.metadata.mapSourcePath))	# Both files are needed, and one may have been thrown away
			or
			(utils.commandArgs.build and self.metadata.sourcePath.endswith ('.js'))	# In case of a build and a JavaScript only module, force generation of new fake map
		):
			self.generateMap (True)
		else:	
			with open (self.metadata.mapPath) as aFile:
				self.rawMap = json.loads (aFile.read ())
				
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
				
				prettyPos = (
				
		with utils.create (self.miniMapPath) as aFile:
			aFile.write (json.dumps (self.rawMiniMap, indent = '\t'))
			aFile.write (self.getMapRef (self.miniMapUrl))
				
		

		
		

		
