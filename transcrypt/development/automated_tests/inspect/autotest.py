from org.transcrypt.autotester import AutoTester

import test_isclass

atester = AutoTester()

atester.run(test_isclass, 'test_isclass')

atester.done()
