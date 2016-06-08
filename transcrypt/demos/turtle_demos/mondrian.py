from turtle import *
from random import *

colors = ('gray', 'green', 'red', 'white', 'blue', 'yellow')
delta = 8
threshold = 100
color ('black', 'black')

def maybe (bias = None):
	return choice ([False, True, bias, bias] if bias != None else [False, True])	

def between (a, b):
	return a + (0.2 + 0.3 * random ()) * (b - a)

recentColors = ['black', 'black']
def originalColor ():
	global recentColors
	while True:
		result = choice (colors)
		if not result in recentColors:
			recentColors = [result, recentColors [0]]
			return result
	
def rect (xMin, yMin, xMax, yMax):
	for aColor in ('black', originalColor ()):
		color (aColor, aColor)
		
		up ()
		goto (xMin, yMin)
		down ()
		
		begin_fill ()
		goto (xMax, yMin)
		goto (xMax, yMax)
		goto (xMin, yMax)
		goto (xMin, yMin)
		end_fill ()
		
		xMin += delta
		yMin += delta
		xMax -= delta
		yMax -= delta
	
def draw (xMin, yMin, xMax, yMax):
	if xMax - xMin > threshold and yMax - yMin > threshold:
		if maybe (xMax - xMin > yMax - yMin):
			xMid = between (xMin, xMax)
			if maybe ():
				draw (xMin, yMin, xMid, yMax)
				rect (xMid, yMin, xMax, yMax)
			else:
				rect (xMin, yMin, xMid, yMax)
				draw (xMid, yMin, xMax, yMax)
		else:
			yMid = between (yMin, yMax)
			if maybe ():
				draw (xMin, yMin, xMax, yMid)
				rect (xMin, yMid, xMax, yMax)
			else:
				rect (xMin, yMin, xMax, yMid)
				draw (xMin, yMid, xMax, yMax)
	else:
		rect (xMin, yMin, xMax, yMax)
		done ()				

ontimer (lambda: draw (-250, -300, 250, 300), 800)
