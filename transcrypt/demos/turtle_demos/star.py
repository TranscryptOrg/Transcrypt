from turtle import *

goto (-300, -75)
startPos = pos ()

color ('red', 'yellow')
begin_fill ()
while True:
	forward (600)
	right (170)
	if distance (startPos) < 1:
		break
end_fill ()
done ()
