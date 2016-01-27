from org.transcrypt.fabric import fabric

__pragma__ (
	'js',
	'''
		circle = new fabric.Circle({
			radius: 20, fill: 'green', left: 100, top: 100
		});

		triangle = new fabric.Triangle({
			width: 20, height: 30, fill: 'blue', left: 50, top: 50
		});
	'''
)

canvas.add (circle, triangle);
