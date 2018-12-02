This tutorial demonstrates some of the possibilities of static typechecking.

- First create a subdirectory __target__ if it does not yet exist, since this is were the results of static type checking will be stored

- Then compile as follows:

        transcrypt -n -c -ds .\static_typing > .\__target__\static_typing.out
        
- After that, start a http server, e.g. with:

        python -m http.server
        
- Open a browser, go to localhost:8000 and inspect the type error reports that will be shown

NB1 Alternatively to just 'python', you may have to start the interpreter with python37 (Windows) or python3.7 (Linux), depending on your installation.
NB2 First the application as a whole is typechecked. After that the imported modules are typechecked one by one.
