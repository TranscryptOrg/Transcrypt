class Spawn:
    def __init__ (self, width, height):
        self.width, self.height, self.spacing = self.fill = width, height, 100, d3.scale.category20 ()

        self.svg = d3.select ('body'
        ) .append ('svg'
        ) .attr ('width', self.width
        ) .attr ('height', self.height
        ) .on ('mousemove', self.mousemove
        ) .on ('mousedown', self.mousedown)
        
        self.svg.append ('rect'
        ) .attr ('width', self.width
        ) .attr ('height', self.height)

        self.cursor = self.svg.append ('circle'
        ) .attr ('r', self.spacing
        ) .attr ('transform', 'translate ({}, {})' .format (self.width / 2, self.height / 2)
        ) .attr ('class', 'cursor')

        self.force = d3.layout.force (
        ) .size ([self.width, self.height]
        ) .nodes ([{}]
        ) .linkDistance (self.spacing
        ) .charge (-1000
        ) .on ('tick', self.tick)       

        self.nodes, self.links, self.node, self.link = self.force.nodes (), self.force.links (), self.svg.selectAll ('.node'), self.svg.selectAll ('.link')
        
        self.restart ()
        
    def mousemove (self):
        self.cursor.attr ('transform', 'translate (' + d3.mouse (self.svg.node ()) + ')')

    def mousedown (self):
        def pushLink (target):
            x, y = target.x - node.x, target.y - node.y
            if Math.sqrt (x * x + y * y) < self.spacing:
                spawn.links.push ({'source': node, 'target': target})
                
        point = d3.mouse (self.svg.node ())
        node = {'x': point [0], 'y': point [1]}
        self.nodes.push (node)
        self.nodes.forEach (pushLink)
        self.restart ()     
            
    def tick (self):
        self.link.attr ('x1', lambda d: d.source.x
        ) .attr ('y1', lambda d: d.source.y
        ) .attr ('x2', lambda d: d.target.x
        ) .attr ('y2', lambda d: d.target.y)
            
        self.node.attr ('cx', lambda d: d.x
        ) .attr ('cy', lambda d: d.y)

    def restart (self):
        self.link = self.link.data (self.links)
        
        self.link.enter (
        ) .insert ('line', '.node'
        ) .attr('class', 'link')

        self.node = self.node.data (self.nodes)
            
        self.node.enter (
        ) .insert ('circle', '.cursor'
        ) .attr ('class', 'node'
        ) .attr ('r', 7
        ) .call (self.force.drag)

        self.force.start ()

spawn = Spawn (window.innerWidth, window.innerHeight)
