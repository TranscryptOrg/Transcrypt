"""The simplest cases of Python's json implemented with JS JSON.

https://docs.python.org/3/library/json.html

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
"""


class JSONDecodeError(ValueError):
    """Exception raised when a JSON document cannot be parsed."""

    def __init__(self, msg: str, doc):  # noqa
        # The interface is different in Python stdlib -- it has more variables,
        # but we cannot do that because the SyntaxError object is different in
        # each browser!
        super().__init__(msg)
        self.doc = doc  # the thing we tried to parse


def loads(s: str):  # noqa
    # The Python stdlib function has lots of kwargs; we don't.
    # We catch the JS SyntaxError and raise the python JSONDecodeError
    # in an attempt to resemble Python behavior.
    # __pragma__ ('ecom') # ===================================================
    # __pragma__ ("js", "{}", "try {return JSON.parse(s);}\ncatch (exc) {\nconsole.error(exc);\nvar py_exc = new JSONDecodeError(exc.message, s);\npy_exc.__cause__ = null;\nthrow py_exc;\n}")
    # __pragma__ ('noecom') # =================================================


def dumps(obj) -> str:  # noqa
    # The Python stdlib function has lots of kwargs; we don't.
    # JS: JSON.stringify(value, replacer, space)
    result = JSON.stringify(obj, None, 2)
    if result is js_undefined:
        console.error("Not JSON serializable: ", obj)
        raise ValueError("Object is not JSON serializable.")
    return result
