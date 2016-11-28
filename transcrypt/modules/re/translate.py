# Python RegExp Syntax to Javascript RegExp Syntax Translator
# This code was pulled from the repository at:
#   https://github.com/GULPF/rescrypt
# Original license was MIT but was converted to Apache v2 for
# ease of integrating with the Transcrypt project
#


__pragma__ ('tconv')

VERBOSE = False

MAX_SHIFTREDUCE_LOOPS = 1000

stringFlags = 'aiLmsux'

# Represents a regex group (e.g /()/, /(?:)/ /(?=), etc).
# `start` and `end` is the index of the groups start and end token in the token list.
class Group:
    def __init__(self, start, end, klass):
        self.start = start
        self.end = end
        self.klass = klass

    def __repr__(self):
        return str((self.start, self.end, self.klass))


# Generates a list of `Group`s from a token list.
def generateGroupSpans(tokens):
    groupInfo = []

    idx = 0
    for token in tokens:
        if token.name.startswith('('):
            groupInfo.append(Group(idx, None, token.name))
        elif token.name == ')':
            for group in reversed(groupInfo):
                if group.end is None:
                    group.end = idx
        idx += 1
    return groupInfo


def countCaptureGroups(tokens):
    groupInfo = generateGroupSpans(tokens)
    count = 0

    for token in tokens:
        if token.name == '(':
            count += 1

    return count


# Get the `Group` for a capture group with a given id or name.
def getCaptureGroup(groupInfo, namedGroups, groupRef):
    try:
        id = int(groupRef)
    except:
        id = namedGroups[groupRef]
    search = 0
    for group in groupInfo:
        if group.klass == '(':
            search += 1
            if search == id:
                return group


# Regex conditionals is implemented by splitting the regex into two parts,
# one for the if case and one for the else case.
# Example: if the input is (a)?(b)?(?(1)a|c)(?(2)b|d),
# the first conditional will cause it to split into these parts:
# `()(b)?c(?(2)b|d)` and `(a)(b)?a(?(2)b|d)`
# The second conditional will then cause each part to split into two, creating four parts in total:
# `()()cd`, `()(b)cb`, `(a)()ad` and `(a)(b)ab`
# The parts are then merged into a single regex: `part1|part2|part3|part4`.
# TODO: This causes the group indexes to be messed up. To fix it, group indexes must be modified with `% len(groups) + 1`.
def splitIfElse(tokens, namedGroups):
    variants = []
    groupInfo = generateGroupSpans(tokens)

    for group in groupInfo:
        if group.klass == '(?<':
            iff = tokens[:]
            els = tokens[:]
            conStart = group.start
            conEnd   = group.end

            ref = tokens[conStart + 1].name
            captureGroup = getCaptureGroup(groupInfo, namedGroups, ref)
            captureGroupModifier = tokens[captureGroup.end + 1]

            if captureGroupModifier.name in ['?', '*'] or captureGroupModifier.name.startswith('{0,'):
                if captureGroupModifier.name == '?':
                    iff[captureGroup.end + 1] = None
                elif captureGroupModifier.name == '*':
                    iff[captureGroup.end + 1] = Token('+')
                elif captureGroupModifier.name.startswith('{0,'):
                    iff[captureGroup.end + 1].name[0:3] = '{1,'
                els[captureGroup.end + 1] = None

                hasElse = False
                for idx in range(conStart, conEnd):
                    if tokens[idx].name == '|':
                        hasElse = True
                        els.pop(conEnd)
                        iff[idx:conEnd + 1] = []
                        els[conStart:idx + 1] = []
                        break

                if not hasElse:
                    els[conStart:conEnd + 1] = []
                    iff.pop(conEnd)

                iff[conStart:conStart + 3] = []
                els[captureGroup.start:captureGroup.end + 1] = [Token('('), Token(')')]
                iff.remove(None)
                els.remove(None)
                variants.append(iff)
                variants.append(els)

            else:  # the easy case - 'else' is impossible
                pastIff = False
                for idx in range(conStart, conEnd):
                    if iff[idx].name == '|':
                        iff = tokens[:idx]
                        iff.extend(tokens[conEnd + 1:])
                        break
                iff[conStart:conStart + 3] = []
                variants.append(iff)
            break

    if not variants:
        return [tokens]

    allVariants = []
    for variant in variants:
        allVariants.extend(splitIfElse(variant, namedGroups))
    return allVariants


class Token:
    def __init__(self, name, paras=None, pure=False):
        if paras is None:
            paras = []
        self.name  = name
        self.paras = paras
        self.pure = pure
        # tmp until I have thought of something better
        self.isModeGroup = False

    def __repr__(self):
        return self.name

    def resolve(self):
        paras = ''
        for para in self.paras:
            paras += str(para)

        return self.name + paras


def shift(stack, queue):
    done = not bool(queue)
    if not done:
        stack.append(Token(queue[0], [], True))
        queue = queue[1:]
    return stack, queue, done


# Shift-reduce parser. Creates the next state of the stack & queue.
def shiftReduce(stack, queue, namedGroups, flags):
    done = False
    high = len(stack) - 1

    if len(stack) < 2:
        stack, queue, done = shift(stack, queue)
        return stack, queue, flags, done

    s0 = stack[high]     if len(stack) > 0 else Token('')
    s1 = stack[high - 1] if len(stack) > 1 else Token('')

    if VERBOSE:
        for token in stack:
            console.log(token.resolve(), '\t', end='')
        console.log('')

    if s1.name == '\\':
        if s0.name == 'A':
            stack[-2:] = [Token('^')]

        elif s0.name == 'a':
            stack[-2:] = [Token('\\07')]

        elif s0.name == 'Z':
            stack[-2:] = [Token('$')]

        else:
            stack[-2:] = [Token('\\' + s0.name)]

    elif s0.name == '$' and s0.pure:
        stack.pop()
        stack.extend([Token('(?='), Token('\\n'), Token('?'), Token('$'), Token(')')])

    elif s1.name == '{':
        if s0.name == ',' and len(s1.paras) == 0:
            s1.paras.append('0')
            s1.paras.append(',')
        else:
            if s0.name == '}':
                s1.paras.append('}')
                s1.name = s1.resolve()
                s1.paras = []
            else:
                s1.paras.append(s0.name)

        stack = stack[:-1]

    elif s1.name == '[' and s0.name == '^':
        stack[-2:] = [Token('[^')]

    elif s1.name == '(' and s0.name == '?':
        stack[-2:] = [Token('(?')]

    elif s1.name in ['*', '+', '?'] and s0.name == '?':
        stack[-2:] = [Token(s1.name + '?')]

    elif s1.isModeGroup and s0.name == ')':
        stack = stack[:-2]

    elif s1.name == '(?':
        if s0.name in stringFlags:
            if s0.name == 'i':
                flags |= re.IGNORECASE
            elif s0.name == 'L':
                flags |= re.LOCALE
            elif s0.name == 'm':
                flags |= re.MULTILINE
            elif s0.name == 's':
                flags |= re.DOTALL
            elif s0.name == 'u':
                flags |= re.UNICODE
            elif s0.name == 'x':
                flags |= re.VERBOSE
            elif s0.name == 'a':
                flags |= re.ASCII

            stack.pop()
            s1.isModeGroup = True

        else:
            if s0.name == '(':
                s0.name = '<'

            newToken = Token('(?' + s0.name)
            stack[-2:] = [newToken]

    elif s1.name == '(?<':
        if s0.name == ')':
            stack[-1:] = [Token(''.join(s1.paras)), Token('>')]
            s1.paras = []
        else:
            s1.paras.append(s0.name)
            stack.pop()

    elif s1.name == '(?P':
        stack[-2:] = [Token('(?P' + s0.name)]

    elif s1.name == '(?P<':
        if s0.name == '>':
            # todo: don't count every time, just keep track of it over time
            namedGroups[''.join(s1.paras)] = countCaptureGroups(stack) + 1
            stack[-2:] = [Token('(')]
        else:
            s1.paras.append(s0.name)
            stack.pop()

    elif s1.name == '(?P=':
        if s0.name == ')':
            stack[-2:] = [Token('\\' + str(namedGroups[s1.paras[0]]))]
        elif not s1.paras:
            s1.paras.append(s0.name)
            stack.pop()
        else:
            s1.paras[0] += s0.name
            stack.pop()

    elif s1.name == '(?#':
        if s0.name == ')':
            stack = stack[:-2]
        else:
            stack = stack[:-1]

    else:
        stack, queue, done = shift(stack, queue)

    return stack, queue, flags, done


# Takes a re-regex and returns a js-regex.
# TODO: Returns way to many values.
def translate(rgx):
    # can't import as normal because it's a circular dependency
    import re
    stack = []
    queue = list(rgx)

    flags = 0
    namedGroups = dict()

    nloop = 0

    while True:
        nloop += 1
        if nloop > MAX_SHIFTREDUCE_LOOPS:
            raise Exception()

        stack, queue, flags, done = shiftReduce(stack, queue, namedGroups, flags)
        if done:
            break

    variants = splitIfElse(stack, namedGroups)
    n_splits = len(variants)

    final = []
    for i in range(0, len(variants)):
        final.extend(variants[i])
        if i < len(variants) - 1:
            final.append(Token('|'))
    stack = final

    groupInfo = generateGroupSpans(stack)
    resolvedTokens = []

    for token in stack:
        stringed = token.resolve()
        if (flags & re.DOTALL) and stringed == '.':
            stringed = '[\s\S]'
        resolvedTokens.append(stringed)
    return resolvedTokens, flags, namedGroups, countCaptureGroups(stack), n_splits
