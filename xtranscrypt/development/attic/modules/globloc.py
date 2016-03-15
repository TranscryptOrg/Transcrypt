a = int (input ())

def f ():
	print  ('global:', a)
	if 5 < 0:
		a = -a	# Creates local a
		print ('local:', a)
		
	print ('global or local', a)
	
f ()	
print ('global:', a)