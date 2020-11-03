from animals import *
import cats_submodule as csm

class Cat (Animal):
    def __init__ (self, name):
        self.species = csm.getTaxoTag ()
        super () .__init__ (name, 'fish', 'mraaaw')
        