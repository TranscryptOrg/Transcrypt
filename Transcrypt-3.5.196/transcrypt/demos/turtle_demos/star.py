# Free after the example from the Python 3.5 manual

from turtle import *

fillColor = 'yellow'

while fillColor:
	print ('Will plot star with fill color: ', fillColor)
	print ()

	up ()
	goto (-250, -21)
	startPos = pos ()

	down ()
	color ('red', fillColor)
	begin_fill ()
	while True:
		forward (500)
		right (170)
		if distance (startPos) < 1:
			break
	end_fill ()
	done ()
	
	fillColor = input ('Give new fill color (blue, green, orange, lightblue, ...) :')
	