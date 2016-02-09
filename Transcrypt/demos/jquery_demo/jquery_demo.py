__pragma__ ('alias', 'S', '$')

def start ():
	def changeColors ():
		for div in S_divs:
			S (div) .css ({
				'color': 'rgb({},{},{})'.format (* [int (256 * Math.random ()) for i in range (3)]),
			})

	S_divs = S ('div')
	changeColors ()
	window.setInterval (changeColors, 500)
