"""Python's collections module -- for Transcrypt."""


class defaultdict(dict):
    """Dictionary that takes a factory parameter and always returns a value."""

    def __init__(self, default_factory=None, *args, **kwargs):  # noqa
        if not callable(default_factory) and default_factory is not None:
            raise TypeError("first argument must be callable or None")
        super().__init__(*args, **kwargs)
        self.default_factory = default_factory

    def __repr__(self):
        return "defaultdict({}, {})".format(
            self.default_factory, super().__repr__(self)
        )

    def __missing__(self, key: str):
        if self.default_factory is None:
            raise KeyError(key)
        self[key] = self.default_factory()
        return super().__getitem__(key)

    def __getitem__(self, key: str):
        try:
            return super().__getitem__(key)
        except KeyError:
            return self.__missing__(key)
