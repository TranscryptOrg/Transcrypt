import org.transcrypt.autotester

import basic_pyre
import basic_jsre

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run (basic_jsre, 'Basic JS RE Tests')
autoTester.run (basic_pyre, 'Basic Python RE Tests')

autoTester.done ()
