# File: transcript/modules/re/__init__.py
# Author: Carl Allendorph
# Date: 13NOV2016
#
# Description:
#    This file contains the definition of a simulated re python
# regular expression parsing module. The idea is to leverage the
# javascript native regular expression interface as much as
# possible. In fact, where necessary, this module chooses the
# javascript idiosyncracies over the python ones.
#
#

from org.transcrypt.stubs.browser import __pragma__
from re.translate import translate

# Flags

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



class error(Exception):
    """ Regular Expression Exception Class
    """
    def __init__(self, msg, error, pattern = None, flags = 0, pos = None):
        """
        """
        Exception.__init__(self, msg, error=error)
        self.pattern = pattern
        self.flags = flags
        self.pos = pos
        # @todo - lineno and colno attributes

class ReIndexError(IndexError):
    """ Index Error variant for the re module - primarily used for
    the group method in the Match Object.
    """
    def __init__(self):
        IndexError.__init__(self, "no such group")

class Match(object):
    """ Resulting Match from a Regex Operation
    """
    def __init__(self, mObj, string, pos, endpos, rObj, namedGroups = None):
        """
        """
        # JS has two "None" values: `null` and `undefined`.
        # `x is None` converts to `x === null`, which will fail if `x` is undefined.
        # The js match object uses undefined for non-used capture groups,
        # so it's not possible to find non-used groups by comparing with `None`,
        # unless this conversion is made.
        for index, match in enumerate(mObj):
            mObj[index] = None if mObj[index] == js_undefined else mObj[index]
        self._obj = mObj

        self._pos = pos
        self._endpos = endpos
        self._re = rObj
        self._string = string

        self._namedGroups = namedGroups

        self._lastindex = self._lastMatchGroup()
        if ( self._namedGroups is not None ):
            self._lastgroup = self._namedGroups[self._lastindex]
        else:
            # @note - javascript does not have the concept
            #       of named groups so we will never be able to
            #       implement this in raw RegExp
            self._lastgroup = None

    # Read-only Properties
    def _getPos(self):
        return(self._pos)
    def _setPos(self, val):
        raise AttributeError("readonly attribute")
    pos = property(_getPos, _setPos)

    def _getEndPos(self):
        return(self._endpos)
    def _setEndPos(self, val):
        raise AttributeError("readonly attribute")
    endpos = property(_getEndPos, _setEndPos)

    def _getRe(self):
        return(self._re)
    def _setRe(self, val):
        raise AttributeError("readonly attribute")
    re = property(_getRe, _setRe)

    def _getString(self):
        return(self._string)
    def _setString(self, val):
        raise AttributeError("readonly attribute")
    string = property(_getString, _setString)

    def _getLastGroup(self):
        return(self._lastgroup)
    def _setLastGroup(self, val):
        raise AttributeError("readonly attribute")
    lastgroup = property(_getLastGroup, _setLastGroup)

    def _getLastIndex(self):
        return(self._lastindex)
    def _setLastIndex(self, val):
        raise AttributeError("readonly attribute")
    lastindex = property(_getLastIndex, _setLastIndex)

    def _lastMatchGroup(self):
        """ Determine the last matching group in the object
        """
        if ( len(self._obj) > 1 ):
            for i in range(len(self._obj)-1,0,-1):
                if (self._obj[i] is not None):
                    return(i)
            # None of the capture groups matched -
            # this seems like it shouldn't happen
            return(None)
        else:
            # No Capture Groups
            return(None)

    def expand(self, template):
        """
        """
        raise NotImplementedError()

    def group(self, *args):
        """ Return the string[s] for a group[s]
        if only one group is provided, a string is returned
        if multiple groups are provided, a tuple of strings is returned
        """
        ret = []
        if ( len(args) > 0 ):
            for index in args:
                if type(index) is str:
                    if self._namedGroups is not None:
                        if ( index not in self._namedGroups.keys() ):
                            raise ReIndexError()
                        ret.append( self._obj[self._namedGroups[index]] )
                    else:
                        raise NotImplementedError("No NamedGroups Available");
                else:
                    if ( index >= len(self._obj) ):
                        # js will return an 'undefined' and we
                        # want this to return an index error
                        # Built-in Exceptions not defined ?
                        raise ReIndexError()
                    ret.append(self._obj[index])
        else:
            ret.append(self._obj[0])

        if ( len(ret) == 1 ):
            return(ret[0])
        else:
            return(tuple(ret))

    def groups(self, default = None):
        """ Get all the groups in this match. Replace any
        groups that did not contribute to the match with default
        value.
        """
        if ( len(self._obj) > 1 ):
            ret = self._obj[1:]
            return(tuple([x if x is not None else default for x in ret]))
        else:
            return(tuple())

    def groupdict(self, default = None):
        """ The concept of named captures doesn't exist
        in javascript so this will likely never be implemented.
        For the python translated re we will have a group dict where
        possible.
        """
        if ( self._namedGroups is not None ):
            ret = {}
            for gName, gId in self._namedGroups.items():
                value = self._obj[gId]
                ret[gName] = value if value is not None else default
            return(ret)
        else:
            # JS Only does not implement this
            raise NotImplementedError("No NamedGroups Available")

    def start(self, group = 0):
        """ Find the starting index in the string for the passed
        group id or named group string.
        @param group
          if the type of group is a str, then the named groups dict
            is searched for a matching string.
          if the type of group is an int, then the groups are
            indexed starting with 0 = entire match, and 1,... are
            the indices of the matched sub-groups
        """
        gId = 0
        if ( type(group) is str ):
            if ( self._namedGroups is not None):
                if ( group not in self._namedGroups.keys() ):
                    raise ReIndexError()
                gId = self._namedGroups[group]
            else:
                raise NotImplementedError("No NamedGroups Available")
        else:
            gId = group

        if ( gId >= len(self._obj) ):
            raise ReIndexError()

        if ( gId == 0 ):
            return(self._obj.index)
        else:
            # We don't really have a good way to do
            # this in javascript. so we will attempt
            # to match the string we found as a
            # sub position in the main string - this
            # isn't perfect though because you could
            # create a capture that only matches on
            # the last in a group - this is a difficult
            # problem to solve without completely
            # re-writing the regex engine from scratch.
            if ( self._obj[gId] is not None ):
                r = compile(escape(self._obj[gId]), self._re.flags)
                m = r.search(self._obj[0])
                if m:
                    return(self._obj.index + m.start())
                else:
                    raise Exception("Failed to find capture group")
            else:
                # This capture did not contribute the match.
                return(-1)

    def end(self, group = 0):
        """ Find the ending index in the string for the passed
        group id or named group string.
        @param group
          if the type of group is a str, then the named groups dict
            is searched for a matching string.
          if the type of group is an int, then the groups are
            indexed starting with 0 = entire match, and 1,... are
            the indices of the matched sub-groups
        """
        gId = 0
        if ( type(group) is str ):
            if ( self._namedGroups is not None):
                if ( group not in self._namedGroups.keys() ):
                    raise ReIndexError()
                gId = self._namedGroups[group]
            else:
                raise NotImplementedError("No NamedGroups Available")
        else:
            gId = group

        if ( gId >= len(self._obj) ):
            raise ReIndexError()

        if ( gId == 0 ):
            return( self._obj.index + len(self._obj[0]))
        else:
            # We don't really have a good way to do
            # this in javascript. so we will attempt
            # to match the string we found as a
            # sub position in the main string - this
            # isn't perfect though because you could
            # create a capture that only matches on
            # the last in a group - this is a difficult
            # problem to solve without completely
            # re-writing the regex engine from scratch.
            if ( self._obj[gId] is not None ):
                r = compile(escape(self._obj[gId]), self._re.flags)
                m = r.search(self._obj[0])
                if m:
                    return(self._obj.index + m.end())
                else:
                    raise Exception("Failed to find capture group")
            else:
                # This capture did not contribute the match.
                return(-1)

    def span(self, group = 0):
        """ Find the start and end index in the string for the passed
        group id or named group string.
        @param group
          if the type of group is a str, then the named groups dict
            is searched for a matching string.
          if the type of group is an int, then the groups are
            indexed starting with 0 = entire match, and 1,... are
            the indices of the matched sub-groups
        @return tuple of (start, end)
        """
        return( (self.start(group), self.end(group)) )

class Regex(object):
    """ Regular Expression Object
    """
    def __init__(self, pattern, flags):
        """ Initial the Regex Object
        @param pattern - javascript regular expression pattern as a string
        @param flags - string of javascript flags for the subsequently
           created RegExp object.
        """
        if ( not ((flags & ASCII) > 0) ):
            flags |= UNICODE

        self._flags = flags
        self._jsFlags, self._obj = self._compileWrapper(pattern, flags)
        self._jspattern = pattern
        # For this regex object pypattern and jspattern are the
        # same.
        self._pypattern = pattern

        # we will determine groups by using another regex
        # that tacks on an empty match.
        _, groupCounterRegex = self._compileWrapper(pattern + '|', flags)
        self._groups = groupCounterRegex.exec('').length-1
        # Javascript does not have named captures so this
        # will never have content in js only mode
        self._groupindex = None

    # Read-only Properties
    def _getPattern(self):
        ret = self._pypattern.replace('\\', '\\\\')
        return(ret)
    def _setPattern(self, val):
        raise AttributeError("readonly attribute")
    pattern = property(_getPattern, _setPattern)

    def _getFlags(self):
        return(self._flags)
    def _setFlags(self, val):
        raise AttributeError("readonly attribute")
    flags = property(_getFlags, _setFlags)

    def _getGroups(self):
        return(self._groups)
    def _setGroups(self, val):
        raise AttributeError("readonly attribute")
    groups = property(_getGroups, _setGroups)

    def _getGroupIndex(self):
        if ( self._groupindex is None ):
            return({})
        else:
            return(self._groupindex)
    def _setGroupIndex(self, val):
        raise AttributeError("readonly attribute")
    groupindex = property(_getGroupIndex, _setGroupIndex)

    def _compileWrapper(self, pattern, flags = 0):
        """ This function wraps the creation of the the
        regular expresion so that we can catch the
        Syntax Error exception and turn it into a
        Python Exception
        """
        jsFlags = self._convertFlags(flags)

        rObj = None
        errObj = None
        # The Exceptions need to be converted to python exceptions
        # in order to propagate appropriately
        __pragma__('js', '{}',
                   '''
                   try {
                     rObj = new RegExp(pattern, jsFlags)
                   } catch( err ) {
                     errObj = err
                   }
                   ''')

        if ( errObj is not None ):
            raise error(errObj.message, errObj, pattern, flags)

        return(jsFlags, rObj)

    def _convertFlags(self, flags):
        """ Convert the Integer map based flags to a
        string list of flags for js
        """
        bitmaps = [
            (DEBUG , ""),
            (IGNORECASE, "i"),
            (MULTILINE, "m"),
            (STICKY, "y"),
            (GLOBAL, "g"),
            (UNICODE, "u"),
        ]
        ret = "".join( [x[1] for x in bitmaps if (x[0] & flags) > 0] )
        return(ret)

    def _getTargetStr(self, string, pos, endpos):
        """ Given an start and endpos, slice out a target string.
        """
        endPtr = len(string)
        if ( endpos is not None ):
            if ( endpos < endPtr):
                endPtr = endpos
        if ( endPtr < 0 ):
            endPtr = 0
        ret = string[pos:endPtr]
        return(ret)

    def _patternHasCaptures(self):
        """ Check if the regex pattern contains a capture
        necessary to make split behave correctly
        """
        return(self._groups > 0)

    def search(self, string, pos=0, endpos=None):
        """ Search through a string for matches to
        this regex object. @see the python docs
        """
        if ( endpos is None ):
            endpos = len(string)
        # @note - pos/endpos don't operate like a slice
        #       here - we need to search complete string and then
        #       reject if the match happens outside of pos:endpos
        rObj = self._obj
        m = rObj.exec(string)
        if m:
            if ( m.index < pos or m.index > endpos ):
                return(None)
            else:
                # Valid match we will create a match object
                return( Match(m, string, pos, endpos, self, self._groupindex))
        else:
            return(None)

    def match(self, string, pos=0, endpos = None):
        """ Match this regex at the beginning of the passed
        string. @see the python docs
        """
        target = string
        if ( endpos is not None ):
            target = target[:endpos]
        else:
            endpos = len(string)

        rObj = self._obj
        m = rObj.exec(target)
        if m:
            # Match only at the beginning
            if ( m.index == pos ):
                return( Match(m, string, pos, endpos, self, self._groupindex))
            else:
                return(None)
        else:
            return(None)

    def fullmatch(self, string, pos=0, endpos = None):
        """ Match the entirety of the passed string to this regex
        object. @see the python docs
        """
        target = string
        strEndPos = len(string)
        if ( endpos is not None ):
            target = target[:endpos]
            strEndPos = endpos

        rObj = self._obj
        m = rObj.exec(target)
        if m:
            obsEndPos = (m.index+len(m[0]))
            if ( m.index == pos and obsEndPos == strEndPos ):
                return( Match(m, string, pos, strEndPos, self, self._groupindex))
            else:
                return(None)
        else:
            return(None)

    def split(self, string, maxsplit = 0):
        """ Split the passed string on each match of this regex
        object. If the regex contains captures, then the match
        content is included as a separate item. If no captures are
        in the regex, then only the non-matching split content is
        returned. @see the python docs
        @param maxsplit max number of times to split the string
          at a matching substring.
        @return list of sub-strings
        """
        # JS split is slightly different from Python
        # the "limit" arg limits the number of elements
        # returned in the list - it doesn't limit the number of
        # splits.

        if ( maxsplit < 0 ):
            return([string])

        mObj = None
        rObj = self._obj
        if ( maxsplit == 0 ):
            mObj = string.split(rObj)
            return(mObj)
        else:
            # the split limit parameter in js does not behave like
            # the maxsplit parameter in python - hence we need to
            # do this manually.
            # @todo - make this better handle the flags
            flags = self._flags
            flags |= GLOBAL

            _, rObj = self._compileWrapper(self._jspattern, flags)
            ret = []
            lastM = None
            cnt = 0
            for i in range(0, maxsplit):
                m = rObj.exec(string)
                if m:
                    cnt += 1
                    if ( lastM is not None ):
                        # subsequent match
                        start = lastM.index + len(lastM[0])
                        head = string[start:m.index]
                        ret.append(head)
                        if ( len(m) > 1 ):
                            ret.extend(m[1:])
                    else:
                        # First match
                        head = string[:m.index]
                        ret.append(head)
                        if ( len(m) > 1 ):
                            ret.extend(m[1:])
                    lastM = m
                else:
                    break

            if ( lastM is not None ):
                endPos = lastM.index + len(lastM[0])
                end = string[endPos:]
                ret.append(end)

            return(ret)

    def _findAllMatches(self, string, pos = 0, endpos = None):
        target = self._getTargetStr(string, pos, endpos)

        # Unfortunately, js RegExp.match does not behave
        # like findall behaves in python - it doesn't
        # pull out 'captures' like python expects so we
        # are going to use RegExp.exec instead of match
        flags = self._flags
        flags |= GLOBAL

        _, rObj = self._compileWrapper(self._jspattern, flags)
        ret = []
        while( True ):
            m = rObj.exec(target)
            if m:
                ret.append(m)
            else:
                break
        return(ret)

    def findall(self, string, pos = 0, endpos = None):
        """ Find All the matches to this regex in the passed string
        @return either:
          List of strings of the matched regex has 1 or 0 capture
            groups
          List of elements that are each a list of the groups matched
            at each location in the string.
        @see the python docs
        """
        mlist = self._findAllMatches(string, pos, endpos)

        def mSelect(m):
            if ( len(m) > 2 ):
                # Captures Present and we need to
                # convert to a tuple
                return(tuple(m[1:]))
            elif ( len(m) == 2 ):
                # 1 Capture
                return(m[1])
            else:
                # No captures
                return(m[0])

        ret = map(mSelect, mlist)

        return(ret)

    def finditer(self, string, pos, endpos = None):
        """ Like findall but returns an iterator instead of
        a list.
        @see the python docs
        """
        mlist = self._findAllMatches(string, pos, endpos)
        ret = map(lambda m: Match(m, string, 0, len(string), self, self._groupindex), mlist)
        return( iter(ret) )

    def sub(self, repl, string, count = 0):
        """ Substitude each match of this regex in the passed string
        with either:
          if repl is of type string,
             replace with repl
          if repl is a callable object, then the returned value
            from repl(m) where m is the match object at a particular
            point in the string.
        @see the python docs
        @return the augmented string with substitutions
        """
        ret,_ = self.subn(repl, string, count)
        return(ret)

    def subn(self, repl, string, count = 0):
        """ Similar to sub except that instead of just returning the
        augmented string, it returns a tuple of the augmented string
        and the number of times that the replacement op occured.
        (augstr, numreplacements)
        @see the python docs
        """
        # For this we are going to use the 'exec' method
        # because the 'replace' method in javascript is broken
        # for what we are trying do. There is no way to get
        # the function callback concept to work.
        flags = self._flags
        flags |= GLOBAL

        _, rObj = self._compileWrapper(self._jspattern, flags)
        ret = ""
        totalMatch = 0
        lastEnd = -1
        while(True):
            if (count > 0):
                if ( totalMatch >= count ):
                    if ( lastEnd < 0 ):
                        # This is an odd case - if we got
                        # here it means there is a bug in our code.
                        return(ret,totalMatch)
                    else:
                        ret += string[lastEnd:m.index]
                        return(ret,totalMatch)

            m = rObj.exec(string)
            if m:
                if ( lastEnd < 0 ):
                    # first match
                    ret += string[:m.index]
                else:
                    # subsequent match
                    ret += string[lastEnd:m.index]

                if callable(repl):
                    content = repl(Match(m, string, 0, len(string), self, self._groupindex))
                    ret += content
                else:
                    ret += repl

                totalMatch+=1
                # Update the last end so we know where to start
                # copying from on the next pass
                lastEnd = m.index + len(m[0])
            else:
                # Failed to match means that there are no more
                # matches in the string
                if ( lastEnd < 0 ):
                    # No matches were found - we return string
                    # unmolested
                    return(string, 0)
                else:
                    ret += string[lastEnd:]
                    return(ret,totalMatch)


class PyRegExp(Regex):
    """ Python Regular Expression object which translates a python
    regex syntax string into a format that can be passed to the
    js regex engine.
    """
    def __init__(self, pyPattern, flags):
        """
        @pattern Python Regex String
        @pattern flags bit flags passed by the user.
        """
        jsTokens, inlineFlags, namedGroups, nCapGroups, n_splits = translate(pyPattern)
        flags |= inlineFlags

        jsPattern = ''.join(jsTokens)
        Regex.__init__(self, jsPattern, flags)
        self._pypattern = pyPattern

        self._nsplits = n_splits
        self._jsTokens = jsTokens
        # nCapGroups = the same as self.groups defined in the
        #   base class.
        self._capgroups = nCapGroups
        self._groupindex = namedGroups

def compile(pattern, flags = 0):
    """ Compile a regex object and return
    an object that can be used for further processing.
    """
    if ( flags & JSSTRICT ):
        p = Regex(pattern, flags)
    else:
        p = PyRegExp(pattern, flags)
    return(p)

def search(pattern, string, flags = 0):
    """ Search a string for a particular matching pattern
    """
    p = compile(pattern, flags)
    return( p.search(string) )

def match(pattern, string, flags = 0):
    """ Match a string for a particular pattern
    """
    p = compile(pattern, flags)
    return( p.match(string) )

def fullmatch(pattern, string, flags = 0):
    """
    """
    p = compile(pattern, flags)
    return( p.fullmatch(string) )

def split(pattern, string, maxsplit = 0, flags = 0):
    """
    """
    p = compile(pattern, flags)
    return( p.split(string, maxsplit) )

def findall(pattern, string, flags = 0):
    """
    """
    p = compile(pattern, flags)
    return( p.findall(string) )

def finditer(pattern, string, flags = 0):
    """
    """
    p = compile(pattern, flags)
    return( p.finditer(string) )

def sub(pattern, repl, string, count = 0, flags = 0):
    """
    """
    p = compile(pattern, flags)
    return( p.sub(repl, string, count) )

def subn(pattern, repl, string, count = 0, flags = 0):
    """
    """
    p = compile(pattern, flags)
    return( p.subn(repl, string, count) )

def escape(string):
    """ Escape a passed string so that we can send it to the
    regular expressions engine.
    """
    ret = None
    def replfunc(m):
        if ( m[0] == "\\" ):
            return("\\\\\\\\")
        else:
            return("\\\\" + m[0])

    # @note - I had an issue getting replfunc to be called in
    #        javascript correctly when I didn't use this pragma
    #        not sure if I was just doing it wrong or what
    __pragma__(
        'js', '{}',
        '''
        var r = /[^A-Za-z:;\d]/g;
        ret = string.replace(r, replfunc);
        ''')
    if ( ret is not None ):
        return(ret)
    else:
        raise Exception("Failed to escape the passed string")

def purge():
    """ I think this function is unnecessary but included to keep interface
    consistent.
    """
    pass
