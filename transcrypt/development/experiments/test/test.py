import test1
import test1.test2

def run (autoTester):
    autoTester.check ('From test: ', test1.test2.C.__module__)

    autoTester.check (__name__)

    class D:
        pass
    
    autoTester.check ('From test:', D.__module__)
    autoTester.check (D.__name__)
    

