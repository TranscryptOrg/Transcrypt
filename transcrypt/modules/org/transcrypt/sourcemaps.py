esc = chr (27)
maxNrOfSourceLinesPerModule = 1000000000
lineNrLength = 11

class GetBase64Vlq:
	def __init__ (self):
		self.nBits32 = 5
		self.encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
		
		# Most used vlq's are prefabricated
		self.prefabSize = 256
		self.prefab = [self (i, True) for i in range (self.prefabSize)]
	
	def __call__ (self, anInteger, init = False):
		if not init and 0 < anInteger < self.prefabSize:
			return self.prefab [anInteger]
		else:
			signed = bin (abs (anInteger)) [2 : ] + ('1' if anInteger < 0 else '0')
			nChunks = math.ceil (len (signed) / float (self.nBits32))
			padded = (self.nBits32 * '0' + signed) [-nChunks * self.nBits32 : ]
			chunks = [('1' if iChunk else '0') + padded [iChunk * self.nBits32 : (iChunk + 1) * self.nBits32] for iChunk in range (nChunks - 1, -1, -1)]
			return ''.join ([self.encoding [int (chunk, 2)] for chunk in chunks])

getBase64Vlq = GetBase64Vlq ()

class SourceMap:
	@classmethod
	def create (cls, sourceFileName, mappings):
		obj = cls ()
		obj.sourceFileName = sourceFileName
		obj.mappings = mappings
		return obj
			
	@classmethod
	def join (cls, partialSourceMaps)
		obj = cls ()
		for partialSourceMap in partialSourceMaps:
			obj.sourceFileNames += partialSourceMap.sourceFileNames
			obj.mappings += partialSourceMap.mappings
		return obj
			
	@classmethod
	def load (cls, mapPath):
		obj = cls ()
		with open (mapPath) as aFile:
			sourceMapDict = eval (aFile.read ())
			
			obj.targetPath = sourceMapDict ['file']
			obj.sourceDir = sourceMapDict ['sourceRoot']
			obj.sourceFileNames = sourceMapDict ['sources']
			obj.mappings = sourceMapDict ['mappings']
		return obj
			
	@classmethod
	def pad (cls, targetCode):
		obj = cls ()
		obj.mappings = ';' * (targetCode.count ('\n') + 1)
		return obj
			
	def __init__ (self):
		self.targetPath = ''
		self.sourceDir = ''
		self.sourceFileNames = []
		self.mappings = ''
		
	def target (self, targetPath):
		self.targetPath = targetPath
		return self		
		
	def __repr__ (self):
		return (
			'{\n'
			'\t"version": 3,\n' +
			'\t"file": "{}",\n'.format (self.targetPath) +
			'\t"sourceRoot": "",\n' +
			'\t"sources": {},\n'.format (self.sourceFileNames) +
			'\t"mappings": "{};"\n'.format (self.mappings) +
			'}\n'
		)

	def __str__ (self):
		return self.__repr__ ()
		