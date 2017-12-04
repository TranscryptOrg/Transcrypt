import div_issues.issue387.test1
import div_issues.issue387.test1.test2

def run387 (autoTester):
    autoTester.check (div_issues.issue387.test1.getReport ())
    autoTester.check ('From test: ', div_issues.issue387.test1.test2.C.__module__)

    autoTester.check (__name__)

    class D:
        pass
    
    autoTester.check ('From test:', D.__module__)
    autoTester.check (D.__name__)
    

