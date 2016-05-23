# Free after the example from the Python 3.5 manual

from turtle import *

up ()
goto (-300, -25)
startPos = pos ()

down ()
color ('red', 'yellow')
begin_fill ()
while True:
	forward (600)
	right (170)
	if distance (startPos) < 1:
		break
end_fill ()
done ()
