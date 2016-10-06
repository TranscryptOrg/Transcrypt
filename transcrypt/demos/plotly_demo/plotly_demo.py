__pragma__ ('jskeys')	# For convenience, allow JS style unquoted string literals as dictionary keys

import random
import math
import itertools

xValues = [2 * math.pi * step / 200 for step in range (201)]
yValuesList = [
	[math.sin (xValue) + 0.5 * math.sin (xValue * 3 + 0.25 * math.sin (xValue * 5)) for xValue in xValues],
	[1 if xValue <= math.pi else -1 for xValue in xValues]
]
kind = 'linear'
Plotly.plot (
	kind,
	[
		{
			x: xValues,
			y: yValues
		}
		for yValues in yValuesList
	],
	{
		title: kind,
		xaxis: {title: 'U (t) [V]'},
		yaxis: {title: 't [s]'}
	}
)		

xValues = list (range (10))
yValues = [math.exp (x**2) for x in xValues] 
kind = 'logarithmic'
Plotly.plot (
	kind,
	[
		{
			x: xValues,
			y: yValues
		}
	],
	{
		title: kind,
		xaxis: {title: 'x'},
		yaxis: {type: 'log', tickformat: '2e', title: 'exp (x**2)'}
	}
)

tangentialValues = list (range (-180, 180))
radialValuesList = [
	[abs (t) for t in tangentialValues],
	[180 - abs (t) for t in tangentialValues],
	[abs (2 * t) for t in tangentialValues]
]
kind = 'polar'
Plotly.plot (
	kind,
	[
		{
			t: tangentialValues,
			r: radialValues,
			name: 'Cardioid {}'.format (i),
		}
		for i, radialValues in enumerate (radialValuesList)
	],
	{
		title: kind
	}
)

denseGrid = [8 * math.pi * step / 200 for step in range (-100, 101)]
sparseGrid = [8 * math.pi * step / 200 for step in range (-100, 101, 10)]

def getZValues (xGrid, yGrid):
	return [
		[math.sin (r) / r for  r in [math.sqrt (x * x + y * y) for x in xGrid]]	# One row
		for y in yGrid															# For all rows
	]

kind = 'wireframe'

__pragma__ ('ifdef', '__esv6__')

document.getElementById (kind) .innerHTML = 'Plotly {} not yet functional for JS6'.format (kind)

__pragma__ ('else')

type = 'scatter3d'
Plotly.plot (
	kind,
	itertools.chain (
		[
			{
				x: denseGrid,
				y: [sparseGrid [i] for value in denseGrid],
				z: getZValues (denseGrid, sparseGrid) [i],
				type: type,
				mode: 'lines',
				line: {color:'rgb(0,0,255)'},
				zmin: -0.2,
				zmax: 1,
				showscale: not i,
			}
			for i in range (20)
		],
		[
			{
				x: [sparseGrid [i] for value in denseGrid],
				y: denseGrid,
				z: zip (*getZValues (sparseGrid, denseGrid)) [i],	# Poor man's transpose to avoid dependency of demo on Numscrypt
				type: type,
				mode: 'lines',
				line: {color:'rgb(0,0,255)'},
				zmin: -0.2,
				zmax: 1,
				showscale: not i,
			} for i in range (20)
		]
	),
	{
		title: kind,
		showlegend: False
	}
)

__pragma__ ('endif')

kind = 'ribbon'
Plotly.plot (
	kind,
	[
		{
			x: denseGrid,
			y: list (range (i * 20, (i + 0.7) * 20)),
			z: getZValues (denseGrid, denseGrid) [i * 20 : (i + 0.7) * 20],	# Take the right 'band' out of the data
			type: 'surface',
			zmin: -0.2,
			zmax: 1,
			showscale: not i,
		}
		for i in range (10)
	],
	{
		title: kind
	}
)

kind = 'surface'
Plotly.plot (
	kind,
	[
		{
			x: denseGrid,
			y: denseGrid,
			z: getZValues (denseGrid, denseGrid),
			type: kind,
			zmin: -0.2,
			zmax: 1
		}
	],
	{
		title: kind
	}
)

labels = ['much', 'more', 'most']
kind = 'bar'
Plotly.plot (
	kind,
	[
		{
			name: 'rare',
			x: labels,
			y: [1, 2, 4],
			type: kind
		},
		{
			name: 'common',
			x: labels,
			y: [8, 16, 32],
			type: kind
		}
	],
	{
		title: kind,
		barmode: 'group'
	}
)

kind = 'pie'
Plotly.plot (
	kind,
	[
		{
			values: [1, 2, 3, 4, 5, 6],
			labels: ['least', 'less', 'little', 'much', 'more', 'most'],
			type: kind
		}
	],
	{
		title: kind
	}
)

kind = 'scatter3d'
def getRandoms (aMax):
	return [random.randint (0, aMax) for i in range (20)]
Plotly.plot (
	kind,
	[
		{
			x: getRandoms (aMax),
			y: getRandoms (aMax),
			z: getRandoms (aMax),
			mode: 'markers',
			marker: {
				color: 'rgb({}, 127, {})'.format (127 - aMax * 12, aMax * 12),
				size: 12,
				symbol: 'circle',
				line: {
					color: 'rgb({}, 255, {})'.format (255 - aMax * 25, aMax * 25),
					width: 1
				}
			},
			type: kind
		}
		for aMax in (2, 5, 10)
	],
	{
		title: kind
	}
)
