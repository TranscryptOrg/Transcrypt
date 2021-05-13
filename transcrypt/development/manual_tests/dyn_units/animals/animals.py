import animals_submodule as asm

_individuals = {}

def find (name):
    return _individuals [name]

class Animal:   
    def __init__ (self, name, food, sound):
        _individuals [name] = self
        self.name = name
        self.food = food
        self.sound = sound
        self.fed = False
        document.getElementById (self.name) .innerHTML  = self.speak (f'I was born just now! My kingdom is: {asm.getTaxoTag ()}. My species is {self.species}')       
        
    def speak (self, text):
        return f'{self.name} says: ' + text

    def feed (self):
        document.getElementById (self.name) .innerHTML = self.speak (
                f'No thanks, I first want to greet you with {self.sound}!'
            if self.fed else
                f'Thanks a lot, I am now eating {self.food}!'
        )
        self.fed = True
        
    def greet (self):
        document.getElementById (self.name) .innerHTML = self.speak (
                f'{self.sound}, {self.sound}, {self.sound}!'
            if self.fed else
                f'Sorry, I want to eat {self.food} first!'
        )
        self.fed = False
        