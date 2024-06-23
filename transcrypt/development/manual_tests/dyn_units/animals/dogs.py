from animals import *
import dogs_submodule as dsm

class Dog (Animal):
    def __init__ (self, name):
        self.species = dsm.getTaxoTag ()        
        super () .__init__ (name, 'meat', 'wooof')
        