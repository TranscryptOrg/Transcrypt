
import math
import itertools




class Vector:
    """
    Generic vector operations.
    """

    def _apply(self,op,   other):
        pairwise = None
        if type(other) is Vector:
            pairwise = zip(self.vals, other.vals)
        else:
            pairwise = zip(self.vals, [other for _ in self.vals])
        return Vector(*itertools.starmap(op, pairwise))

    def __init__(self, *args):
        self.vals = args

    def __add__(self, other):
        return self._apply(lambda a, b: a + b,  other)

    def __sub__(self, other):
        return self._apply(lambda a, b: a - b, other)

    def __mul__(self, other):
        return self._apply(lambda a, b: a*b, other)

    def __div__(self, other):
        return self._apply(lambda a, b: a / b, other)

    def length(self):
        total = sum(map(lambda a: math.pow(a, 2), self.vals))
        return math.sqrt(total)

    def normalized(self):
        divisor = [self.length()] * len(self)
        return Vector(*(self / divisor))

    def __iter__(self):
        return py_iter(self.vals)

    @classmethod
    def map(cls, *args):
        return args[0].map(args[1:])

    def __getitem__(self, item):
        return self.values[item]

    def __str__(self):
        return str(self.vals)

    def __len__(self):
        return len(self.vals)


    @classmethod
    def add(cls, a, b):
        return Vector(*a) + Vector(*b)

    @classmethod
    def sub(cls, a, b):
        return Vector(*a) - Vector(*b)

    @classmethod
    def mul(cls, a, b):
        return Vector(*a) * Vector(*b)

    @classmethod
    def div(cls, a, b):
        return Vector(*a) / Vector(*b)

    @classmethod
    def dot(cls, left, right):
        return sum(Vector.mul(left, right))

    @classmethod
    def norm_dot(Vector, left, right):
        left = Vector(*left).normalized()
        right = Vector(*right).normalized()

        return sum(Vector.mul(left, right))

