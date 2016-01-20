import org.transcrypt.autotester

import testlet0
import testlet1

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run (testlet0, 'testlet0')
autoTester.run (testlet1, 'testlet1')

autoTester.done ()
