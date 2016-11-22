# Python RegExp Object
# This code was pulled from the repository at:
#   https://github.com/GULPF/rescrypt
# Original license was MIT but was converted to Apache v2 for
# ease of integrating with the Transcrypt project
#

from re.translate import translate

JAVASCRIPT     = 0b1000000000

ASCII      = A = 0b100000000
DEBUG          = 0b010000000
VERBOSE    = X = 0b001000000
UNICODE    = U = 0b000100000
DOTALL     = S = 0b000010000
MULTILINE  = M = 0b000001000
LOCALE     = L = 0b000000100
IGNORECASE = I = 0b000000010
T = 0b000000001

_bitFlagFormatBits = [A, X, U, S, M, L, I]
_bitFlagFormatStr  = ['a', 'x', 'u', 's', 'm', 'L', 'i']
# TODO: js-specific flags should also be supported,
#       but they should be supported everywhere (e.g `compile("(?y)whatever")` should be valid).
_jsFlags = ['i', 'g', 'm']


def _decodeFlags(bitFlags):
    flags = ''
    for x in range(0, len(_bitFlagFormatBits)):
        if bitFlags & _bitFlagFormatBits[x]:
            flags += _bitFlagFormatStr[x]
    return flags


def _encodeFlags(flags):
    bitFlags = 0
    for flag in flags:
        x = _bitFlagFormatStr.indexOf(flag)
        if (x > -1):
            bitFlags |= _bitFlagFormatBits[x]
    return bitFlags


def _getJsFlags(flags):
    jsFlags = ''
    for flag in flags:
        if flag in _jsFlags:
            jsFlags += flag
    return jsFlags


class Match:
    def __init__(self, rgx, groups, txt, start, end):
        self._startIndex = groups.index
        self._groupsList = [g if g is not js_undefined else None for g in groups]
        self._namedGroups = rgx.groupindex

        self.pos = start
        self.endpos = end
        self.re = rgx
        self.string = txt
        self.lastindex = len(groups) - 1
        self.lastgroup = None

        for groupName, groupId in self._namedGroups.items():
            if groupId == self.lastindex:
                self.lastgroup = groupName
                break

        for idx, group in enumerate(groups):
            self[idx] = group

    def group(self, *groupIds):
        if len(groupIds) == 0:
            return self._groupsList[0]

        result = []
        for id in groupIds:
            if type(id) is str:
                result.append(self._groupsList[self._namedGroups[id]])
            else:
                result.append(self._groupsList[id])

        if len(result) == 1:
            return result[0]
        return tuple(result)

    def groups(self, default=None):
        return tuple([g if g is not None else default for g in self._groupsList[1:]])

    def groupdict(self, default=None):
        d = dict()
        for gName in Object.js_keys(self._namedGroups):
            gId = self._namedGroups[gName]
            value = self._groupsList[gId]
            d[gName] = default if value is None else value
        return d

    def end(self, group=None):
        if group is not None:
            raise Exception("match.end() with argument is not supported")
        return self._startIndex + self._groupsList[0].length

    def start(self, group=None):
        if group is not None:
            raise Exception("match.start() with argument is not supported")
        return self._startIndex

    def span(self, group=None):
        if group is not None:
            raise Exception("match.span() with argument is not supported")
        return (self.start(), self.end())


class PyRegExp:
    def __init__(self, pyPattern, jsTokens, flags, bitFlags, namedGroups, nCaptureGroups):
        self._flags = flags
        self._jsFlags = _getJsFlags(self._flags)
        self._jsPattern = RegExp(''.join(jsTokens), self._jsFlags)
        self._jsTokens = jsTokens

        self.flags = bitFlags
        self.groups = nCaptureGroups
        self.groupindex = namedGroups
        self.pattern = pyPattern

    def _getFirstMatch(self, txt, start, end):
        pattern = self._jsPattern

        #  In python, `^` with `start` will always fail to match _unless_ `txt[start - 1]` is `\n` and multi-line is active.
        #  Interestingly, `$` with `end` works as expected and requires no special handling.
        if start != 0 and 'm' not in self._flags or txt[start - 1] != '\n' and self._jsTokens:
            strRgx = ''
            for token in self._jsTokens:
                if token == '^':
                    # impossible group - will always fail.
                    # we can't just return None, since the '^' might be inside something like `(foo|^)`.
                    token = '[^\S\s]'
                strRgx += token
            pattern = RegExp(strRgx, self._jsFlags)

        return txt[start:end].match(pattern)

    def search(self, txt, start=0, end=None):
        if end is None:
            end = len(txt)

        match = self._getFirstMatch(txt, start, end)
        if match is not None:
            return Match(self, match, txt, start, end)
        return match

    def match(self, txt, start=0, end=None):
        if end is None:
            end = len(txt)

        match = self._getFirstMatch(txt, start, end)
        if match is None or match.index > start:
            return None
        return Match(self, match, txt, start, end)

    def fullmatch(self, txt, start=0, end=None):
        if end is None:
            end = len(txt)

        match = self._getFirstMatch(txt, start, end)
        if match.index != 0 | match.index + len(match[0]) != end:
            return None
        return Match(self, match, txt, start, end)

    def split(self, txt, maxsplit=None):
        if maxsplit is None:
            splitted = txt.split(self._jsPattern)
        else:
            splitted = txt['split'](self._jsPattern, maxsplit)

            consumed = 0
            for split in splitted:
                consumed += len(split)
            # if we split "test%test%test" with maxsplit 1,
            # python will give ["test", "test%test"], and js ["test", "%test%test"]
            # this last bit fixes that
            last_el = txt[consumed + 1:]
            skip = len(last_el.match(self._jsPattern)[0])
            splitted.append(last_el[skip:])

        return splitted

    def findall(self, txt, start=0, end=None):
        if end is None:
            end = len(txt)
        # modify pattern to match globally
        globalPattern = RegExp(self._jsPattern, 'g')
        # not correct? probably needs the same logic as `_getFirstMatch()`, but will work for now
        txt = txt[start:end]
        result = []

        while True:
            match = globalPattern.exec(txt)
            if match:
                if (len(match) > 2):
                    result.append(tuple(match[1:]))
                elif (len(match) == 2):
                    result.append(match[1])
                else:
                    result.append(match[0])
            else:
                break

        return result


def compile(pyPattern, bitFlags=0):
    passedFlags = _decodeFlags(bitFlags)

    if not flags & JAVASCRIPT:
        jsTokens, flags, namedGroups, nCaptureGroups = translate(pyPattern)
        bitFlags |= _encodeFlags(flags)
        return PyRegExp(pyPattern, jsTokens, flags + passedFlags, bitFlags, namedGroups, nCaptureGroups)
    return PyRegExp(pyPattern, None, '', dict())


def search(pyPattern, txt, bitFlags=0):
    rgx = compile(pyPattern, bitFlags)
    return rgx.search(txt)


def match(pyPattern, txt, bitFlags=0):
    rgx = compile(pyPattern, bitFlags)
    return rgx.match(txt)


def split(pyPattern, txt, maxsplit, bitFlags=0):
    rgx = compile(pyPattern, bitFlags)
    return rgx.split(txt, maxsplit=None)


def findall(pyPattern, txt, bitFlags=0):
    rgx = compile(pyPattern, bitFlags)
    return rgx.findall(txt)


def fullmatch(pyPattern, txt, bitFlags=0):
    rgx = compile(pyPattern, bitFlags)
    return rgx.fullmatch(txt)
