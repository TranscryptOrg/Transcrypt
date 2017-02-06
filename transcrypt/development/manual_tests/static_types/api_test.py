import sys

mypyPath = 'D:/activ_tosh/geatec/transcrypt/qquick/Transcrypt/transcrypt/modules/org/transcrypt/type_check/mypy-master-0.4.7'
sys.path.insert (0, mypyPath)   # Prepend, to favor it over CPython's mypy installation

from mypy import api

result = api.run(sys.argv[1:])

if result[0]:
    print('/nType checking report:/n')
    print(result[0])  # stdout

if result[1]:
    print('/nError report:/n')
    print(result[1])  # stderr

print ('/nExit status:', result[2])
