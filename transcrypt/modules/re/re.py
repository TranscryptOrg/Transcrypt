# Python RegExp Object
# This code was pulled from the repository at:
#   https://github.com/GULPF/rescrypt
# Original license was MIT but was converted to Apache v2 for
# ease of integrating with the Transcrypt project
#

from re.translate import translate

# @note - these flags are legacy from integrating the
#    python regexp object from GULPF/rescrypt. This could likely
#    be simplified.

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
