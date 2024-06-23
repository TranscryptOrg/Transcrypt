def mylibHello (autoTester):
    autoTester.check ('Hello World Function')
    
class mylibClass:
    def __init__ (self, autoTester):
        self.autoTester = autoTester
        self.autoTester.check ('Hello World Class')
        
    def checkSymbols (self):
        self.autoTester.check (sorted ([x for x in globals () if x.startswith ("my")])) # __: iconv
        