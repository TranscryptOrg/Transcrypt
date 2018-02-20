class Animal:
    animals = {}
    
    @classmethod
    def get (cls, name):
        return self.animals [name]
        
    def __init__ (self, name, food, sound):
        self.animals [name] = self
        self.name = name
        self.fed = False
        
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
        