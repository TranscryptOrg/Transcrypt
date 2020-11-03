import random

from org import threejs as three
from utils import wrap, AABB


class Unit:
    def __init__(self):
        self.geo = None
        self.momentum = three.Vector3(0, 0, 0)

    def get_position(self):
        return self.geo.position

    def set_position(self, p):
        self.geo.position.set(p.x, p.y, p.z)

    def update(self, t):
        if self.visible:
            current_pos = self.geo.position
            move = three.Vector3().copy(self.momentum).multiplyScalar(t)
            current_pos = current_pos.add(move)
            self.geo.position.set(current_pos.x, current_pos.y, current_pos.z)

    def get_vis(self):
        return self.geo.visible

    def set_vis(self, v):
        self.geo.visible = v

    visible = property(get_vis, set_vis)
    position = property(get_position, set_position)


class Ship(Unit):
    ROTATE_SPEED = 2.1
    THRUST = 45

    def __init__(self, keyboard, game):
        Unit.__init__(self)
        self.keyboard = keyboard

        self.geo = three.Mesh(
            three.ConeBufferGeometry(1, 3, 8),
            three.MeshNormalMaterial()
        )
        exhaust = three.Mesh(
            three.ConeBufferGeometry(.5, 2, 8),
            three.MeshBasicMaterial({'color': 0xffff00})
        )
        self.geo.add(exhaust)
        exhaust.translateY(-2)
        exhaust.rotateZ(3.14159)
        self.exhaust = exhaust
        self.momentum = three.Vector3(0, 0, 0)
        self.keyboard = keyboard
        self.bbox = AABB(2, 3, self.geo.position)
        self.game = game

    def thrust(self, amt):
        thrust_amt = amt * self.THRUST
        self.momentum = self.momentum.add(self.heading.multiplyScalar(thrust_amt))
        self.exhaust.visible = amt > 0

    def spin(self, amt):
        self.geo.rotateZ(amt * self.ROTATE_SPEED * -1)

    def update(self, t):
        Unit.update(self, t)
        self.bbox.update(self.position)

    def get_heading(self):
        # return the local Y axis, since Z is 'up'
        m = self.geo.matrixWorld.elements
        return three.Vector3(m[4], m[5], m[6])


    heading = property(get_heading)


class Asteroid(Unit):
    def __init__(self, radius, pos):
        Unit.__init__(self)
        self.radius = radius
        self.geo = three.Mesh(
            three.SphereGeometry(self.radius),
            three.MeshNormalMaterial()
        )
        self.geo.position.set(pos.x, pos.y, pos.z)
        self.bbox = AABB(self.radius * 2, self.radius * 2, self.geo.position)
        self.momentum = three.Vector3(0, 0, 0)

    def update(self, t):
        Unit.update(self, t)
        self.bbox.update(self.position)


class Bullet:
    EXPIRES = 1
    RESET_POS = three.Vector3(0, 0, 1000)
    BULLET_SPEED = 50

    def __init__(self):
        self.vector = three.Vector3(0, 0, 0)
        self.geo = three.Mesh(
            three.BoxGeometry(.25, .25, .25),
            three.MeshBasicMaterial({'color': 0xffffff})
        )
        self.lifespan = 0
        self.momentum = three.Vector3(0, 0, 0)
        self.reset()

    def update(self, t):

        if self.geo.position.z < 1000:
            self.lifespan += t
            if self.lifespan > self.EXPIRES:
                self.reset()
                return
            delta = three.Vector3().copy(self.vector)
            delta.multiplyScalar(self.BULLET_SPEED * t)
            delta.add(self.momentum)
            current_pos = self.geo.position.add(delta)
            self.geo.position.set(current_pos.x, current_pos.y, current_pos.z)
            wrap(self.geo)

    def reset(self):
        self.lifespan = 0
        self.momentum = three.Vector3(0, 0, 0)
        self.geo.position.set(self.RESET_POS.x, self.RESET_POS.y, self.RESET_POS.z)

    def get_position(self):
        return self.geo.position

    position = property(get_position)
