def run (autoTester):
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
