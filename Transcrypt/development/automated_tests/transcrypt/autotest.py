import org.transcrypt.autotester

import classes
import modules

autoTester = org.transcrypt.autotester.AutoTester ()

classes.run (autoTester)
modules.run (autoTester)

autoTester.done ()
