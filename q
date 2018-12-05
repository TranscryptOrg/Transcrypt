[1mdiff --git a/transcrypt/modules/org/transcrypt/compiler.py b/transcrypt/modules/org/transcrypt/compiler.py[m
[1mindex b66f7be..39e7f34 100644[m
[1m--- a/transcrypt/modules/org/transcrypt/compiler.py[m
[1m+++ b/transcrypt/modules/org/transcrypt/compiler.py[m
[36m@@ -61,11 +61,7 @@[m [mclass Program:[m
         self.moduleSearchDirs = moduleSearchDirs[m
         self.symbols = symbols[m
         self.envir = envir[m
[31m-[m
[31m-        if not utils.commandArgs.esv:[m
[31m-            self.javascriptVersion = 6[m
[31m-        else:[m
[31m-            self.javascriptVersion = int (utils.commandArgs.esv)[m
[32m+[m[32m        self.javascriptVersion = int (utils.commandArgs.esv) if utils.commandArgs.esv else 6[m
 [m
         self.moduleDict = {}    # Administration of all modules that play a role in this program[m
         self.importStack = []   # Pending imports, enables showing load sequence in case a module cannot be loaded[m
[36m@@ -2357,8 +2353,8 @@[m [mreturn list (selfFields).''' + comparatorName + '''(list (otherFields));[m
             self.emit ('dict ({{')                              # Since we didn't return, we want identifier keys to be treated as string literals[m
         for index, (key, value) in enumerate (zip (node.keys, node.values)):[m
             self.emitComma (index)[m
[31m-            self.idFiltering = False                        # The key may be a string or an identifier, the latter normally would be filtered, which we don't want[m
[31m-            self.visit (key)                                # In a JavaScript object literal, an identifier isn't evaluated but literally taken to be a key.[m
[32m+[m[32m            self.idFiltering = False                            # The key may be a string or an identifier, the latter normally would be filtered, which we don't want[m
[32m+[m[32m            self.visit (key)                                    # In a JavaScript object literal, an identifier isn't evaluated but literally taken to be a key.[m
             self.idFiltering = True[m
             self.emit (': ')[m
             self.visit (value)[m
[36m@@ -2436,10 +2432,7 @@[m [mreturn list (selfFields).''' + comparatorName + '''(list (otherFields));[m
             self.emit (') {{\n')[m
             self.indent ()[m
 [m
[31m-        elif ([m
[31m-            self.module.program.javascriptVersion >= 6 and  # Supports for ... of[m
[31m-            not self.allowOperatorOverloading               # No overloaded __len__ c.q. __getitem__[m
[31m-        ):[m
[32m+[m[32m        elif not self.allowOperatorOverloading:     # No overloaded __len__ c.q. __getitem__[m
             self.emit ('for (var ')[m
             self.stripTuples = True[m
             self.visit (node.target)[m
[36m@@ -2457,45 +2450,6 @@[m [mreturn list (selfFields).''' + comparatorName + '''(list (otherFields));[m
             self.emit (') {{\n')[m
             self.indent ()[m
 [m
[31m-            ''' (1)[m
[31m-            # In the code below, destructuring assignment is done explicitly rather than left to JavaScript[m
[31m-            # It is left here as a comment until it becomes more clear that JavaScript destructuring suffices in all cases[m
[31m-[m
[31m-            # Produce universal iterator (something with a Python '__next__' and a JavaScript 'next') from iterable by calling py_iter from __builtin__[m
[31m-            self.emit ('var {} = {} (', self.nextTemp ('iterator'), self.filterId ('iter'))[m
[31m-            self.visit (node.iter)[m
[31m-            self.emit (');\n')[m
[31m-[m
[31m-            self.emit ('while (true) {{\n')[m
[31m-            self.indent ()[m
[31m-[m
[31m-            # Create and visit Assign node on the fly to benefit from tupple assignment[m
[31m-            self.emit ('try {{')[m
[31m-            self.indent ()[m
[31m-            self.visit (ast.Assign ([m
[31m-                targets = [node.target],        # As in Python: for <target> in ...[m
[31m-                value = ast.Call (              # Result of calling 'next' on the just produced universal iterator[m
[31m-                    func = ast.Name ([m
[31m-                        id = 'next',[m
[31m-                        ctx = ast.Load[m
[31m-                    ),[m
[31m-                    args = [ast.Name ([m
[31m-                        id = self.getTemp ('iterator'),[m
[31m-                        ctx = ast.Load[m
[31m-                    )],[m
[31m-                    keywords = [][m
[31m-                )[m
[31m-            ))[m
[31m-            self.emit (';')[m
[31m-            self.dedent ()[m
[31m-            self.emit ('}} ')[m
[31m-            self.emit ('catch (exception) {{')  # Assume 'StopIteration' thrown, iterator exhausted[m
[31m-            self.indent ()[m
[31m-            self.emit ('break;')[m
[31m-            self.dedent ()[m
[31m-            self.emit ('}}\n')[m
[31m-            '''[m
[31m-[m
         else:[m
             self.emit ('var {} = ', self.nextTemp ('iterable'))[m
             self.visit (node.iter)[m
[36m@@ -2531,13 +2485,7 @@[m [mreturn list (selfFields).''' + comparatorName + '''(list (otherFields));[m
         self.emit ('}}\n')[m
 [m
         if not (self.allowJavaScriptIter or optimize):[m
[31m-            if ([m
[31m-                self.module.program.javascriptVersion >= 6 and  # Supports for ... of[m
[31m-                not self.allowOperatorOverloading               # No overloaded __len__ c.q. __getitem__[m
[31m-            ):[m
[31m-                pass[m
[31m-                # self.prevTemp ('iterator')    # Leave in for now, see outcommented fragment (1) above[m
[31m-            else:[m
[32m+[m[32m            if self.allowOperatorOverloading:  # Possibly overloaded __len__ c.q. __getitem__[m
                 self.prevTemp ('index')[m
                 self.prevTemp ('iterable')[m
 [m
[1mdiff --git a/transcrypt/modules/org/transcrypt/utils.py b/transcrypt/modules/org/transcrypt/utils.py[m
[1mindex 5e1a25c..d58c79e 100644[m
[1m--- a/transcrypt/modules/org/transcrypt/utils.py[m
[1m+++ b/transcrypt/modules/org/transcrypt/utils.py[m
[36m@@ -49,7 +49,7 @@[m [mclass CommandArgs:[m
         self.argParser.add_argument ('-dn', '--dnostrip', help = "debug: no comment stripping of __core__ and __builtin__ in-line modules", action = 'store_true')[m
         self.argParser.add_argument ('-ds', '--dstat', help = "debug: validate static typing using annotations", action = 'store_true')[m
         self.argParser.add_argument ('-dt', '--dtree', help = "debug: dump syntax tree", action = 'store_true')[m
[31m-        self.argParser.add_argument ('-e', '--esv', nargs='?', help = "ecma script version of generated code, default = 5. The symbol __esv<versionnr>__ is added to the global symbol list, e.g. __esv7__.")[m
[32m+[m[32m        self.argParser.add_argument ('-e', '--esv', nargs='?', help = "ecma script version of generated code, default = 6. The symbol __esv<versionnr>__ is added to the global symbol list, e.g. __esv7__.")[m
         self.argParser.add_argument ('-f', '--fcall', help = "enable fastcall mechanism by default. You can also use __pragma__ ('fcal') and __pragma__ (\'nofcall\')", action = 'store_true')[m
         self.argParser.add_argument ('-g', '--gen', help = "enable generators and iterators. Disadvised, since it will result in a function call for each loop iteration. Preferably use __pragma__ ('gen') and __pragma__ ('nogen')", action = 'store_true')[m
         self.argParser.add_argument ('-i', '--iconv', help = "enable automatic conversion to iterable by default. Disadvised, since it will result in a type check for each for-loop. Preferably use __pragma__ ('iconv') and __pragma__ (\'noiconv\') to enable automatic conversion locally", action = 'store_true')[m
