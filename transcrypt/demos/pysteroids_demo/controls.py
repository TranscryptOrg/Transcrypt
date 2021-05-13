from utils import clamp

class Keyboard:
    def __init__(self):
        self.keyboard = {0: False}
        self.handlers = {}

    def key_down(self, key):
        self.keyboard[key.key] = True

    def key_up(self, key):
        self.keyboard[key.key] = False

    def get(self, key):
        return self.keyboard.get(key, False)

    def get_axis(self, key):
        return self.handlers[key].value

    def add_handler(self, name, handler):
        self.handlers[name] = handler

    def update(self, interval):
        for _, eachhandler in self.handlers.items():
            eachhandler.update(self, interval)

    def clear(self, axis):
        self.handlers.get(axis).value = 0


class ControlAxis:
    __pragma__('kwargs')

    def __init__(self, positive_key: str, negative_key: str, attack=1, decay=0, deadzone=0.02):
        self.positive = positive_key
        self.negative = negative_key
        self.attack = attack
        self.decay = decay
        self.deadzone = deadzone
        self.value = 0

    __pragma__('nokwargs')

    def update(self, keyboard: Keyboard, interval: float):
        self.value -= (interval * self.decay * self.value)
        dz = abs(self.value) < self.deadzone
        if keyboard.get(self.positive):
            dz = False
            self.value += interval * self.attack
        if keyboard.get(self.negative):
            dz = False
            self.value -= interval * self.attack

        if dz:
            self.value = 0
        else:
            self.value = clamp(self.value, -1, 1)
