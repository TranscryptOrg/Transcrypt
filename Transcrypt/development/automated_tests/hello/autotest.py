import org.transcrypt.autotester
import testlet0
import testlet1

autoTester = org.transcrypt.autotester.AutoTester ()
testlet0.run (autoTester)
testlet1.run (autoTester)
autoTester.done ()
