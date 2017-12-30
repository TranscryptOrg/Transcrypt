class Foo:
	pass

foo = Foo ()
foo.bar = 'baz'
foo.name = 'hello'
foo.default = 'world'

print ([x for x in dir (foo) if not x.startswith ('__')])

#__pragma__('kwargs')
def foo (*args, **kwargs):
	default = kwargs.get ('default', 'bar')
	return default

print (foo())
print (foo(default = 'Hello World'))
