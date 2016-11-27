
import org.transcrypt.autotester
import basic_tests

autoTester = org.transcrypt.autotester.AutoTester ()

autoTester.run( basic_tests, "basic_tests" )

autoTester.done()
