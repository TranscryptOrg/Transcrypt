import org.transcrypt.autotester

import classes
import modules
import datastructures

autoTester = org.transcrypt.autotester.AutoTester ()

classes.run (autoTester)
modules.run (autoTester)
datastructures.run (autoTester)

autoTester.done ()
