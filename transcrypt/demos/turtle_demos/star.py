# Free after the example from the Python 3.5 manual

from turtle import *

up ()
goto (-250, -21)
startPos = pos ()

down ()
color ('red', 'yellow')
begin_fill ()
while True:
    forward (500)
    right (170)
    if distance (startPos) < 1:
        break
end_fill ()
done ()
