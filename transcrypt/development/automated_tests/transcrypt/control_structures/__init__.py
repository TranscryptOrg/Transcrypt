class ContextManagerExample:
    def __init__ (self):
        self.counter = 0
        
    def __enter__ (self):
        self.counter += 1
        return self
        
    def __exit__ (self, *args):
        self.counter += 99

def run (autoTester):

    # General control structure tests

    for index in range (10):
        autoTester.check (index)
        
    for index in range (8, 16):
        autoTester.check (index)
        
    for index in range (8, 16, 2):
        autoTester.check (index)
        
    for index in range (10, 0, -1):
        autoTester.check (index)
        
    for index in range (16, 8, -2):
        autoTester.check (index)
        
    for animal in ('cat', 'dog', 'turtle', 'goldfish'):
        autoTester.check (animal)

    for index, square in enumerate ([x * x for x in range (10) if x % 2]):
        for y in (1, 2, 3):
            for z in (10, 20, 30):
                autoTester.check (square + y, z )

    vehicles = ['bike', 'train', 'boat', 'car', 'plane', 'bus']
                
    for doBreak in (False, True):
        for doContinue in (False, True):
            for index in range (10):
                for index2 in range (0, 100, 10):
                    if doBreak and index2 == 50:
                        autoTester.check ('break2')
                        break
                    if doContinue and index2 == 50:
                        autoTester.check ('continue2')
                        continue
                else:
                    autoTester.check ('noBreak2')
                    
                if doBreak and index == 5:
                    autoTester.check ('break')
                    break
                if doContinue and index == 5:
                    autoTester.check ('continue')
                    continue
            else:
                autoTester.check ('noBreak')
                
            index = 0
            while index < len (vehicles) and vehicles [index] != 'bus':
                autoTester.check (index, vehicles [index])
                if doBreak and vehicles [index] == 'car':
                    autoTester.check ('breakWhile')
                    break
                if doContinue and vehicles [index] == 'car':
                    autoTester.check ('continueWhile')
                    index += 1
                    continue
                index += 1
            else:
                autoTester.check ('noBreakWhile')
                
        for vehicle in vehicles:
            if vehicle == 'bike':
                autoTester.check ('netherlands')
            elif vehicle == 'car':
                autoTester.check ('america')
            elif vehicle == 'boat':
                autoTester.check ('oceania')
            else:
                autoTester.check ('anywhere') 
                
    # Context manager tests

    externalCounter1 = 0
    with ContextManagerExample () as contextManagerExample1:
        externalCounter1 += 1
    autoTester.check ('ctx1', contextManagerExample1.counter, externalCounter1)
    
    externalCounter2 = 0
    with ContextManagerExample () as contextManagerExample2:
        externalCounter2 += 1
        contextManagerExample2.counter += 100
        externalCounter3 = 0
        with ContextManagerExample () as contextManagerExample3:
            externalCounter3 += 1
            contextManagerExample2.counter += 100     
            externalCounter3 += 2
            contextManagerExample3.counter += 200
        autoTester.check ('ctx3', contextManagerExample3.counter, externalCounter3)
        externalCounter2 += 2
        contextManagerExample2.counter += 200
    autoTester.check ('ctx2', contextManagerExample2.counter, externalCounter2)

    try:
        externalCounter4 = 0
        with ContextManagerExample () as contextManagerExample4:
            externalCounter4 += 1
            contextManagerExample4.counter += 100
            externalCounter5 = 0
            with ContextManagerExample () as contextManagerExample5:
                externalCounter5 += 1
                contextManagerExample5.counter += 100
                raise Exception ()    
                externalCounter5 += 2
                contextManagerExample5.counter += 200  
            externalCounter4 += 2
            contextManagerExample4.counter += 200
    except Exception as exception:
        autoTester.check ('ctx6', exception)
    finally:
        autoTester.check ('ctx5', contextManagerExample5.counter, externalCounter5)
        autoTester.check ('ctx4', contextManagerExample4.counter, externalCounter4) 
