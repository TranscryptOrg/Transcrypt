import org.transcrypt.autotester

import testlet0, strptime, mult_time

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run (testlet0, 'testlet0')
autoTester.run (strptime, 'strptime')
autoTester.run (mult_time, 'mult_time')

autoTester.done ()
