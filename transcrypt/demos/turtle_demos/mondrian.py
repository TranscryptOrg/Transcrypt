import turtle as turtle_graphics
import random

class Bounds:
	def __init__ (self, x, y, width, height):
		self.x = x
		self.y = y
		self.width = width
		self.height = height

BORDER_COLOR = 'black'  # so you can add 'black' to COLORS below

BORDER_WIDTH = 10

MINIMUM_DIVISIBLE_PORTION = .2	# limits recursion

COLORS = ('gray', 'green', 'red', 'white', 'blue', 'yellow')  # multiple 'white' to increase probability

PICTURE_BOUNDS = Bounds(x=-250, y=-300, width=500, height=600)

def fill_rectangle(turtle, bounds, color=BORDER_COLOR):
	""" Fill a rectangle with the border color (by default) and then fill the center with a bright color """
	turtle.up()
	turtle.goto(bounds.x, bounds.y)
	turtle.color(color)
	turtle.down()
	turtle.begin_fill()
	for _ in range(2):
		turtle.forward(bounds.width)
		turtle.left(90)
		turtle.forward(bounds.height)
		turtle.left(90)
	turtle.end_fill()
	turtle.up()

	if color == BORDER_COLOR:
		fill_rectangle(turtle, Bounds(bounds.x + BORDER_WIDTH, bounds.y + BORDER_WIDTH, bounds.width - BORDER_WIDTH*2, bounds.height - BORDER_WIDTH*2), random.choice(COLORS))


def mondrian(piet, bounds):
	""" Divide, fill and divide & fill some more.  Intuitively and recursively """

	if bounds.width < bounds.height:
		random_dimension = random.randint (bounds.height // 5, 2 * bounds.height // 3)
		bounds_yin = Bounds(bounds.x, bounds.y + random_dimension, bounds.width, bounds.height - random_dimension)
		bounds_yang = Bounds(bounds.x, bounds.y, bounds.width, random_dimension)
		
		if bounds_yin.height > bounds_yang.height:
			bounds_paint, bounds_divide = bounds_yang, bounds_yin
		else:
			bounds_paint, bounds_divide = bounds_yin, bounds_yang

		fill_rectangle(piet, bounds_paint)

		if bounds_divide.height < MINIMUM_DIVISIBLE_PORTION * PICTURE_BOUNDS.height:
			fill_rectangle(piet, bounds_divide)
		else:
			pass
			mondrian(piet, bounds_divide)
	else:
		random_dimension = random.randint(bounds.width // 5, 2 * bounds.width // 3)
		bounds_yin = Bounds(bounds.x, bounds.y, random_dimension, bounds.height)
		bounds_yang = Bounds(bounds.x + random_dimension, bounds.y, bounds.width - random_dimension, bounds.height)
		if bounds_yin.width > bounds_yang.width:
			bounds_paint, bounds_divide = bounds_yang, bounds_yin
		else:
			bounds_paint, bounds_divide = bounds_yin, bounds_yang

		fill_rectangle(piet, bounds_paint)

		if bounds_divide.width < MINIMUM_DIVISIBLE_PORTION * PICTURE_BOUNDS.width:
			fill_rectangle(piet, bounds_divide)
		else:
			pass
			mondrian(piet, bounds_divide)


def paint_canvas(dummy_x=0, dummy_y=0):
	""" Runs the program and can be used as an event handler """
	#fill_rectangle(turtle_graphics, PICTURE_BOUNDS, 'black')
	mondrian(turtle_graphics, PICTURE_BOUNDS)

paint_canvas()
