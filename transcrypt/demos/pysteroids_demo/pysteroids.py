import logging
import math
import random

import audio
import org.threejs as three
from controls import Keyboard, ControlAxis
from units import Ship, Asteroid, Bullet
from utils import wrap, now, FPSCounter, coroutine, clamp, set_limits

DEBUG = True
logger = logging.getLogger('root')
logger.addHandler(logging.StreamHandler())

if DEBUG:
    logger.setLevel(logging.INFO)
    logger.info("====== debug logging on =====")


def waiter(*args):
    return True, args[0]


def done(*args):
    print("done at", args[0])


def hfov(vfov, w, h):
    """gives horizontal fov (in rads) for given vertical fov (in rads) and aspect ratio"""
    return


class Graphics:
    def __init__(self, w, h, canvas, fov=53.13):
        self.width = float(w)
        self.height = float(h)
        self.scene = three.Scene()
        self.camera = three.PerspectiveCamera(fov, self.width / self.height, 1, 500)
        self.vfov = math.radians(fov)
        self.hfov = 2 * math.atan(math.tan(math.radians(fov) / 2.0) * (w / h * 1.0))

        self.camera.position.set(0, 0, 80)
        self.camera.lookAt(self.scene.position)
        self.renderer = three.WebGLRenderer({'Antialias': True})
        self.renderer.setSize(self.width, self.height)
        canvas.appendChild(self.renderer.domElement)

    def render(self):
        self.renderer.render(self.scene, self.camera)

    def add(self, item):
        self.scene.add(item.geo)

    def extent(self):
        v_extent = math.tan(self.vfov / 2.0) * 80
        h_extent = math.tan(self.hfov / 2.0) * 80
        return h_extent, v_extent


class Audio:
    def __init__(self, audio_path=""):
        pth = lambda p: audio_path + p

        self.fire_rota = [audio.clip(pth('344276__nsstudios__laser3.wav')),
                          audio.clip(pth('344276__nsstudios__laser3.wav')),
                          audio.clip(pth('344276__nsstudios__laser3.wav')),
                          audio.clip(pth('344276__nsstudios__laser3.wav'))]
        self.explosion_rota = [audio.clip(pth('108641__juskiddink__nearby-explosion-with-debris.wav')),
                               audio.clip(pth('108641__juskiddink__nearby-explosion-with-debris.wav')),
                               audio.clip(pth('108641__juskiddink__nearby-explosion-with-debris.wav')),
                               audio.clip(pth('108641__juskiddink__nearby-explosion-with-debris.wav'))]
        self.thrust = audio.loop(pth('146770__qubodup__rocket-boost-engine-loop.wav'))
        self.fail = audio.clip(pth('172950__notr__saddertrombones.mp3'))
        self.thrust.play()
        self.shoot_ctr = 0
        self.explode_ctr = 0

    def fire(self):
        self.fire_rota[self.shoot_ctr % 4].play()
        self.shoot_ctr += 1

    def explode(self):
        self.explosion_rota[self.shoot_ctr % 4].play()
        self.shoot_ctr += 1


class Game:
    def __init__(self, canvas, fullscreen=True):
        self.keyboard = Keyboard()
        if fullscreen:
            self.graphics = Graphics(window.innerWidth, window.innerHeight, canvas)
        else:
            self.graphics = Graphics(canvas.offsetWidth, (3 * canvas.offsetWidth) / 4, canvas)

        self.extents = self.graphics.extent()
        set_limits(*self.extents)
        self.create_controls()
        self.ship = None
        self.bullets = []
        self.asteroids = []
        self.helptext = None
        self.resetter = None
        self.setup()
        self.last_frame = now()
        self.audio = Audio()
        self.lives = 3
        self.score = 0
        self.score_display = document.getElementById('score')
        self.fps_counter = FPSCounter(document.getElementById("FPS"))

        # adjust the position of the game over div
        v_center = canvas.offsetHeight / 3
        title = document.getElementById("game_over")
        title.style.top = v_center
        hud = document.getElementById('hud')
        hud.style.width = canvas.offsetWidth
        hud.style.height = canvas.offsetHeight
        frame = document.getElementById('game_frame')
        frame.style.min_height = canvas.offsetHeight

    def create_controls(self):
        self.keyboard.add_handler('spin', ControlAxis('ArrowRight', 'ArrowLeft', attack=1, decay=.6))
        self.keyboard.add_handler('thrust', ControlAxis('ArrowUp', 'ArrowDown', attack=.65, decay=2.5, deadzone=.1))
        self.keyboard.add_handler('fire', ControlAxis(' ', 'None', attack=10))
        document.onkeydown = self.keyboard.key_down
        document.onkeyup = self.keyboard.key_up

        # prevent arrow keys from scrolling browser
        def suppress_scroll(e):
            if e.keyCode in [32, 37, 38, 39, 40]:
                e.preventDefault()

        window.addEventListener("keydown", suppress_scroll, False)

    def setup(self):

        self.ship = Ship(self.keyboard, self)
        self.graphics.add(self.ship)

        def rsign():
            if random.random() < .5:
                return -1
            return 1

        for a in range(8):
            x = (random.random() - 0.5) * 2
            y = random.random() - 0.5
            z = 0
            offset = three.Vector3(x, y, z)
            offset.normalize();
            push = random.randint(20, 60)
            offset = offset.multiplyScalar(push)

            r = (random.random() + 1.0) * 2.5
            asteroid = Asteroid(r, offset)

            mx = random.random() + random.random() + random.random(2) - 2.0
            my = random.random() + random.random() + random.random(2) - 2.0
            asteroid.momentum = three.Vector3(mx, my, 0)

            self.graphics.add(asteroid)
            self.asteroids.append(asteroid)

        for b in range(8):
            bullet = Bullet()
            self.graphics.add(bullet)
            self.bullets.append(bullet)

        self.helptext = self.help_display()

    def tick(self):

        if len(self.asteroids) == 0 or self.lives < 1:
            document.getElementById("game_over").style.visibility = 'visible'
            document.getElementById('credits').style.visibility = 'visible'
            document.getElementById('game_canvas').style.cursor = 'auto'
            return

        requestAnimationFrame(self.tick)

        t = (now() - self.last_frame)

        self.fps_counter.update(t)
        self.keyboard.update(t)

        # controls
        if self.ship.visible:
            self.handle_input(t)

        # clean up bullets, check for collisions
        dead = []
        for b in self.bullets:
            if b.position.z < 1000:
                for a in self.asteroids:
                    if a.bbox.contains(b.position):
                        d = a.geo.position.distanceTo(b.position)
                        if d < a.radius:
                            b.reset()
                            dead.append(a)

        if self.ship.visible:
            for a in self.asteroids:
                if a.bbox.contains(self.ship.position):
                    d = a.geo.position.distanceTo(self.ship.position)
                    if d < (a.radius + 0.5):
                        self.resetter = self.kill()
                        print("!!", self.resetter)
                        dead.append(a)
        else:
            self.resetter.advance(t)

        for d in dead:
            self.asteroids.remove(d)
            new_score = int(100 * d.radius)
            self.update_score(new_score)

            d.geo.visible = False
            if d.radius > 1.5:
                self.audio.explode()
                new_asteroids = random.randint(2, 5)
                for n in range(new_asteroids):
                    new_a = Asteroid((d.radius + 1.0) / new_asteroids, d.position)
                    mx = (random.random() - 0.5) * 6
                    my = (random.random() - 0.5) * 4
                    new_a.momentum = three.Vector3().copy(d.momentum)
                    new_a.momentum.add(three.Vector3(mx, my, 0))
                    self.graphics.add(new_a)
                    self.asteroids.append(new_a)

        for b in self.bullets:
            b.update(t)

        self.ship.update(t)
        wrap(self.ship.geo)

        for item in self.asteroids:
            item.update(t)
            wrap(item.geo)

        # advance coroutines
        if self.resetter is not None:
            self.resetter.advance(t)

        if self.helptext is not None:
            self.helptext.advance(t)

        self.graphics.render()
        self.last_frame = now()

    def handle_input(self, t):

        if self.keyboard.get_axis('fire') >= 1:
            mo = three.Vector3().copy(self.ship.momentum).multiplyScalar(t)
            if self.fire(self.ship.position, self.ship.heading, mo):
                self.audio.fire()
            self.keyboard.clear('fire')

        spin = self.keyboard.get_axis('spin')
        self.ship.spin(spin * t)

        thrust = self.keyboard.get_axis('thrust')
        self.audio.thrust.volume = clamp(thrust * 5, 0, 1)
        self.ship.thrust(thrust * t)

    def fire(self, pos, vector, momentum, t):
        for each_bullet in self.bullets:
            if each_bullet.geo.position.z >= 1000:
                each_bullet.geo.position.set(pos.x, pos.y, pos.z)
                each_bullet.vector = vector
                each_bullet.lifespan = 0
                each_bullet.momentum = three.Vector3().copy(momentum).multiplyScalar(.66)
                return True
        return False

    def kill(self):
        self.lives -= 1
        self.ship.momentum = three.Vector3(0, 0, 0)
        self.ship.position = three.Vector3(0, 0, 0)
        self.ship.geo.setRotationFromEuler(three.Euler(0, 0, 0))
        self.keyboard.clear('spin')
        self.keyboard.clear('thrust')
        self.keyboard.clear('fire')

        self.ship.visible = False
        self.audio.fail.play()
        can_reappear = now() + 3.0

        def reappear(t):
            if now() < can_reappear:
                return True, "waiting"
            for a in self.asteroids:
                if a.bbox.contains(self.ship.position):
                    return True, "can't spawn"
            return False, "OK"

        def clear_resetter():
            self.ship.visible = True
            self.resetter = None

        reset = coroutine(reappear, clear_resetter)

        next(reset)
        return reset

    def help_display(self):

        """
        cycle through the help messages, fading in and out
        """

        messages = 3
        repeats = 2
        elapsed = 0
        count = 0
        period = 2.25
        def display_stuff(t):
            nonlocal elapsed, count, messages, repeats
            if count < messages * repeats:
                elapsed += t / period
                count = int(elapsed)
                lintime = elapsed % 1
                opacity = math.pow(math.sin(lintime * 3.1415), 2)
                logger.info(lintime)
                document.getElementById("instructions{}".format(count % 3)).style.opacity = opacity

                return True, opacity
            else:
                return False, "OK"

        def done():
             document.getElementById("instructions1").style.visiblity = 'hidden'

        displayer = coroutine(display_stuff, done)

        next(displayer)
        logger.debug("displayer", displayer)
        return displayer



    def update_score(self, score):
        self.score += score
        self.score_display.innerHTML = self.score
        print(self.score, self.score_display)


canvas = document.getElementById("game_canvas")
game = Game(canvas, True)

game.tick()
