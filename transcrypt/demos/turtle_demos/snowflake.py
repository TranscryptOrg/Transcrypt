from turtle import *

josh = Turtle ()

def draw (length):
    if length > 9:
        draw (length / 3)
        josh.left (60)
        draw (length / 3)
        josh.right (120)
        draw (length / 3)
        josh.left (60)
        draw (length / 3)
    else:
        josh.forward (length)

length = 150
josh.up ()
josh.forward (length / 2)
josh.left (90)
josh.forward (length / 4)
josh.right (90)
josh.down ()

for i in range (3):
    josh.right (120)
    draw (length)
    
josh.done ()
