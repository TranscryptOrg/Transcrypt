import org.transcrypt.autotester

print (7777777777)
import sys
for item in sys.path:
	print (item)
print (8888888888)

import classes
import modules

autoTester = org.transcrypt.autotester.AutoTester ()

classes.run (autoTester)
modules.run (autoTester)

autoTester.done ()
