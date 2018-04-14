# Python RegExp Syntax to Javascript RegExp Syntax Translator
# This code was pulled from the repository at:
#   https://github.com/GULPF/rescrypt
# Original license was MIT but was converted to Apache v2 for
# ease of integrating with the Transcrypt project
#

# XXX: don't redefine those here

T = (1<<0)
TEMPLATE = T

I = (1<<1)
IGNORECASE = I

# Deprecated
L = (1<<2)
LOCALE = L

M = (1<<3)
MULTILINE = M

S = (1 << 4)
DOTALL = S
# Legacy - Unicode by default in Python 3
U = (1 << 5)
UNICODE = U
X = (1 << 6)
VERBOSE = X
DEBUG = (1<<7)

A = (1<<8)
ASCII = A

# This is a javascript specific flag
Y = (1 << 16)
STICKY = Y
G = (1 << 17)
GLOBAL = G
# This flag is used to indicate that re module should use
# the javascript regex engine directly and not attempt to
# translate the regex string into a python regex
J = (1<<19)
JSSTRICT = J

__pragma__ ('tconv')

def _read_escape(rgx, idx, append_to):
    # XXX: This must handle the case in `if c == '\\'`?:
    if rgx[idx] == '\\':
        if idx + 1 >= len(rgx):
            pass # XXX: exception
        # These three are regex escape codes
        # that doesn't exist in JS.
        if rgx[idx + 1] == 'A':
            append_to.append('^')
        elif rgx[idx + 1] == 'a':
            append_to.append('\\07')
        elif rgx[idx + 1] == 'Z':
            append_to.append('$')
        # Otherwise just leave as is.
        else:
            append_to.append('\\' + rgx[idx + 1])
        idx += 2            
    else:
        append_to.append(rgx[idx])
        idx += 1
    return idx

def _read_until(rgx, start, char, append_to):
    idx = start
    while idx < len(rgx) and rgx[idx] != char:
        idx = _read_escape(rgx, idx, append_to)
    if idx >= len(rgx):
        raise Exception("Unexpected end of input")
    # append_to.append(rgx[idx])
    # idx += 1
    return idx 

def _safe_char_at(s, idx):
    if idx >= len(s):
        return ''
    return s[idx]

def translate(rgx, flags=0):
    # import re

    idx = 0

    flagdict = {
        'i': IGNORECASE,
        'L': LOCALE,
        'm': MULTILINE,
        's': DOTALL,
        'u': UNICODE,
        'x': VERBOSE,
        'a': ASCII
    }

    tokens = []
    groupindex = {}
    n_capturings = 1 # Capturing indices start at 1

    while idx < len(rgx):
        # The current and next character
        c = rgx[idx]
        n = _safe_char_at(rgx, idx + 1)

        # TODO: use read_escape instead
        if c == '\\':
            # These three are regex escape codes
            # that doesn't exist in JS.
            if n == 'A':
                value = '^'
            elif n == 'a':
                value = '\\07'
            elif n == 'Z':
                value = '$'
            # Otherwise just leave as is.
            else:
                value = '\\' + n

            tokens.append(value)
            idx += 2

        elif c == '$':
            # '$' has slightly different semantics in Python and JS.
            # Note that /\Z/ in Python is equal to /$/ in JS.
            tokens.append('(?=\\n?$)')
            idx += 1

        elif c == '{':
            # Rewrite `{,b}` to `{0,b}`.
            # Leave others as is.
            if n == ',':
                itr = idx + 2
                b_nbrs = []

                while rgx[itr] in '0123456789' and itr < len(rgx):
                    b_nbrs.append(rgx[itr])
                    itr += 1

                if rgx[itr] == '}':
                    tokens.extend(["{", "0", ","] + b_nbrs)
                    idx += 2 + len(b_nbrs)
                else:
                    tokens.extend(["{", ","])
                    idx += 2
            else:
                tokens.append(rgx[idx])
                idx += 1

        elif c == '[':
            # This requires no rewriting, but we need
            # to consume everything until the next
            # unescaped ']' to make sure that what's
            # inside of the set isn't interpreted as something
            # special (e.g /[(]/ is valid but /(/ isn't)
            tokens.append(rgx[idx])
            idx += 1

            if rgx[idx] == '^':
                tokens.append(rgx[idx])
                idx += 1

            # As a special rule, Python allows a literal ']' as the first
            # member of a set. E.g  /[]]/ is a set containing ']',
            # and /[^]]/ is an inverted set containing ']'.
            if n == ']':
                tokens.append('\\' + n)
                idx += 1

            idx = _read_until(rgx, idx, ']', tokens)
            tokens.append(']')
            idx += 1

        elif c == '(' and n == '?':
            # Extension notation.
            n2 = _safe_char_at(rgx, idx + 2)
            n3 = _safe_char_at(rgx, idx + 3)

            # Named group def.
            # XXX: For simplicity this allows any chars in group name
            #      but Python only allows valid identfiers.
            if n2 == 'P' and n3 == '<':
                namearr = []
                idx += 4 # skip (?P<
                idx = _read_until(rgx, idx, '>', namearr)
                idx += 1 # skip '>'
                groupindex["".join(namearr)] = n_capturings
                n_capturings += 1
                tokens.append('(')

            # Named group ref.
            elif n2 == 'P' and n3 == '=':
                namearr = []
                idx += 4 # skip (?P=                
                idx = _read_until(rgx, idx + 4, ')', namearr)
                idx += 1 # skip '>'
                name = "".join(namearr)
                if name not in groupindex:
                    raise error("Unknown named capturing group: " + name)
                tokens.append('\\' + groupindex[name])

            # Comment
            elif n2 == '#':
                idx = _read_until(rgx, idx, ')', [])
                idx += 1 # Skip )

            # Flag
            elif n2 in flagdict:
                idx += 2
                # NOTE: No reason to care about escape
                #       sequences here since the only
                #       valid letters are 'iLmsux'.
                while idx < len(rgx) and rgx[idx] != ')':
                    if rgx[idx] not in flagdict:
                        break
                    flags |= flagdict[rgx[idx]]
                    idx += 1

                if idx == len(rgx):
                    raise error("Expected '(' but found " + rgx[idx])

                if rgx[idx] != ')':
                    if rgx[idx] in ["-", ":"]:
                        raise error("The '(?imsx-imsx:...)' regex syntax " +
                                    "is not supported by Transcrypt.")
                    raise error("Unknown regex flag '" + rgx[idx] + "'")

                idx += 1

            elif (n2 == '<' and n3 == '=') or (n2 == '<' and n3 == '!'):
                raise Exception("Regex lookbehinds are not supported by Transcrypt")

            elif n2 == ':':
                tokens.append(rgx[idx])
                idx += 1

            # XXX: implement
            # One of:
            #   - lookahead
            #   - neg lookahead
            #   - if then else
            # Note that we are probably not able to implement
            # lookbehinds.
            else:
                raise Exception("Unknown regex extension '" + n2 + "'")
        else:
            if c == '(':
                n_capturings += 1
            tokens.append(rgx[idx])
            idx += 1
        
    if flags & DOTALL:
        for idx, token in enumerate(tokens):
            if token == '.':
                tokens[idx] = r'[\s\S]'

    return "".join(tokens), flags, groupindex, n_capturings - 1

print("input", r"(?P<prefix>[a-zA-Z]+)://(?P<suffix>[^/]*)")
print("output", translate(r"(?P<prefix>[a-zA-Z]+)://(?P<suffix>[^/]*)"))
