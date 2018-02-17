#__pragma__ ('keycheck')
try:
    a=[1,2,3]
    print('a[10]=', a[10])
except IndexError:
    print('indexError')
except KeyError:
    print('KeyError')
    