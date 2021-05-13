from org.transcrypt.stubs.browser import __pragma__

from org import threejs as three


def pad_wrap(min, max, val):
    if val < min:
        return max
    if val > max:
        return min
    return val


XWRAP = 0
XNWRAP = 0
YWRAP = 0
YNWRAP = 0


def set_limits(x: float, y: float):
    nonlocal XWRAP, XNWRAP, YWRAP, YNWRAP
    XWRAP = int(x)
    XNWRAP = -1 * XWRAP
    YWRAP = int(y)
    YNWRAP = -1 * YWRAP


def wrap(obj: three.Object3d):
    x, y, z = obj.position.x, obj.position.y, obj.position.z
    x = pad_wrap(XNWRAP, XWRAP, x)
    y = pad_wrap(YNWRAP, YWRAP, y)
    obj.position.set(x, y, z)


def clamp(val, low, high):
    return max(min(val, high), low)


def sign(val):
    if val > 0:
        return 1
    if val < 0:
        return -1
    return 0


def now():
    """absolute time in decimal seconds"""
    d = __new__(Date)
    return d.getTime() / 1000.0


def set_element(id, value):
    document.getElementById(id).innerHTML = value


class AABB:
    def __init__(self, width, height, center):
        self.hw = width / 2.0
        self.hh = width / 2.0
        self.position = center

    def contains(self, item):
        x = self.position.x
        y = self.position.y
        h = self.hh
        w = self.hw
        return item.x > x - w and item.x < x + w and item.y > y - h and item.y < y + h

    def update(self, pos):
        self.position = pos


class FPSCounter:
    def __init__(self, hud_element):
        self.frames = [.1]
        for n in range(99):
            self.frames.append(.1)
        self.next_frame = 0
        self.average = 0
        self.visible = True
        self.element = hud_element

    def update(self, t):
        self.frames[self.next_frame] = t
        self.next_frame += 1
        if self.next_frame > 99:
            self.next_frame = 0

        sum = lambda a, b: a + b
        total = 0
        for n in range(100):
            total += self.frames[n]

        self.average = total * 10
        if self.visible:
            # @todo: need a string formatting option to print out decimal MS
            self.element.innerHTML = "{} fps".format(int(1000 / self.average))


def advance(cr, value):
    """used by coroutines for updating without 'gsend' everywhere"""
    __pragma__('gsend')
    cr.send(value)
    __pragma__('nogsend')


def coroutine(loop, callback):
    callback_fn = callback if callback is not None else lambda a: a

    def coroutine_generator():
        alive = True
        result = None
        while alive:
            next_value = yield
            alive, result = loop(next_value)
            yield result
        yield callback_fn(result)

    cr = coroutine_generator()
    cr.advance = lambda a: advance(cr, a)
    return cr


def timer(duration, loop, callback):
    expires_at = now() + duration

    loop_fn = loop if loop is not None else lambda a: (True, a)
    callback_fn = callback if callback is not None else lambda a: a

    def timer_coroutine():
        alive = True
        result = None

        while alive:
            next_value = yield
            alive, result = loop_fn(next_value)
            alive = alive and now() < expires_at
            yield result
        yield callback_fn(result)

    tc = timer_coroutine()
    tc.advance = lambda a: advance(tc, a)
    return tc
