# File: transcrypt/modules/warnings/__init__.py
# Author: Carl Allendorph
# Date: 20NOV2016
#
# Description:
#   This file contains the implementation of a module to
# provide features that can be used by developer to flag
# runtime issues that would not be caught by the static
# type checking system. These warnings are for conditions
# that aren't necessarily fatal but denote differences in
# the transcrypt implementation from the normal cpython
# implementation
#

###########################################
# Transcrypt differences with Python `warnings` module
#
# 1) We don't have import/eval so this makes passing
#       in custom "Warning" types hard. To help with this,
#       I've added a new method "addWarningCategory" that
#       allows the user to add a new warning type via a
#       programmatic interface.
# 2) There is a limited subset of warnings right now to keep
#       things small.
# 3) catch_warnings is not implemented currently because the
#       transcrypt framework currently does not support "with/as"
#       clauses very well.
# 4) This module does not implement the `warn` method. The user
#       is suggested to use the `warn_explicit` method instead.
#       In order to prevent cases where a NonImplementedError is
#       thrown instead of a useful warning, the `warn` method is
#       not present - forcing the developer to pick a better
#       solution (like use `warn_explicit`).

# @note - I've moved the re module dependency to the top level because
#  transcrypt will need to compile and include this regardless if it
#  gets used or not.
import re


# Module initialization
# @note - we don't have command line options - the user must
#    call the `setWarningOptions` method if they wish to provide
#    custom warning filtering.

# filters contains a sequence of filter 5-tuples
# The components of the 5-tuple are:
# - an action: error, ignore, always, default, module, or once
# - a compiled regex that must match the warning message
# - a class representing the warning category
# - a compiled regex that must match the module that is being warned
# - a line number for the line being warning, or 0 to mean any line
# If either if the compiled regexs are None, match anything.

class Actions:
    error = "error"
    ignore = "ignore"
    always = "always"
    defaultact = "default"
    module = "module"
    once = "once"

ActionSet = set([ x for x in dir(Actions) if not x.startswith("_")])

# @note - transcrypt can't use import or eval so we have a map
#    setup to make our lives easier
CategoryMap = {
    "UserWarning": UserWarning,
    "DeprecationWarning" : DeprecationWarning,
    "RuntimeWarning" : RuntimeWarning,
    }

_warnings_defaults = False

filters = []
defaultaction = Actions.defaultact
onceregistry = {}

_filters_version = 1

def _filters_mutated():
    global _filters_version
    _filters_version += 1


# Type definitions - Warnings
# In CPython, these warnings types seem to be defined in C so there
# is no lib we can pull from.
# The definitions of these warning can be found in the __standard__.py
# file for Transcrypt framework.

def showwarning(message, category, filename, lineno, file=None, line=None):
    """Hook to write a warning to a file; replace if you like."""
    msg = WarningMessage(message, category, filename, lineno, file, line)
    _showwarnmsg_impl(msg)

def formatwarning(message, category, filename, lineno, line=None):
    """Function to format a warning the standard way."""
    msg = WarningMessage(message, category, filename, lineno, None, line)
    return _formatwarnmsg_impl(msg)

def _showwarnmsg_impl(msg):
    """ Default Show Message Implementation
    """
    f = msg.file
    text = _formatwarnmsg(msg)
    if ( f is None ):
        # Log to console
        text = text.rstrip('\r\n')
        console.log(text)
    else:
        try:
            f.write(text)
        except Exception as exc:
            # This warning is lost in the aether.
            pass

def _formatwarnmsg_impl(msg):
    """ @note - we've removed the msg.source handling and the associated
    tracemalloc code as this isn't available in the js runtime.
    """
    s = "{}:{}: {}: {}\n".format(
        msg.filename, msg.lineno, msg.category, str(msg.message)
        )

    if msg.line:
        line = msg.line.strip()
        s += "  {}\n".format(line)

    return s

# Keep a reference to check if the function was replaced
_showwarning = showwarning

def setShowWarning(func):
    """
    """
    if not callable(func):
        raise TypeError("showwarning method must be callable")
    global showwarning
    showwarning = func

def _showwarnmsg(msg):
    """Hook to write a warning to a file; replace if you like."""

    if not callable(showwarning):
        raise TypeError("warnings.showwarning() must be set to a "
                        "function or method")

    showwarning(msg.message, msg.category, msg.filename, msg.lineno,
                msg.file, msg.line)

# Keep a reference to check if the function was replaced
_formatwarning = formatwarning

def _formatwarnmsg(msg):
    """Function to format a warning the standard way."""
    # @note - transcrypt does not seem to have globals so
    #    we can't really do this - we pull formatwarning
    #    from the module namespace.
    #formatwarning = globals().get('formatwarning', _formatwarning)
    global formatwarning
    if formatwarning is not _formatwarning:
        # warnings.formatwarning() was replaced
        return formatwarning(msg.message, msg.category,
                             msg.filename, msg.lineno, line=msg.line)
    return _formatwarnmsg_impl(msg)


def addWarningCategory(cat):
    """ This method allows the user to add a new warning
    category at runtime from their library set. This is necessary to
    get around limitations in the transcrypt runtime's lack of
    import and eval.
    """
    name = cat.__name__
    if ( name not in CategoryMap ):
        CategoryMap[name] = cat
    else:
        raise Exception("Warning Category {} already exists".format(name))


__pragma__("kwargs")
def filterwarnings(action, message="", category=Warning, module="", lineno=0,
                   append=False):
    """Insert an entry into the list of warnings filters (at the front).

    'action' -- one of "error", "ignore", "always", "default", "module",
                or "once"
    'message' -- a regex that the warning message must match
    'category' -- a class that the warning must be a subclass of
    'module' -- a regex that the module name must match
    'lineno' -- an integer line number, 0 matches all warnings
    'append' -- if true, append to the list of filters
    """
    assert action in ActionSet , "invalid action: {}".format(action)
    assert isinstance(message, str), "message must be a string"
#    assert issubclass(category, Warning), "category must be a Warning subclass"
    assert isinstance(module, str), "module must be a string"
    assert isinstance(lineno, int) and lineno >= 0, \
           "lineno must be an int >= 0"
    _add_filter(action, re.compile(message, re.I), category,
            re.compile(module), lineno, append=append)

def simplefilter(action, category=Warning, lineno=0, append=False):
    """Insert a simple entry into the list of warnings filters (at the front).

    A simple filter matches all modules and messages.
    'action' -- one of "error", "ignore", "always", "default", "module",
                or "once"
    'category' -- a class that the warning must be a subclass of
    'lineno' -- an integer line number, 0 matches all warnings
    'append' -- if true, append to the list of filters
    """
    assert action in ActionSet , "invalid action: {}".format(action)
    assert isinstance(lineno, int) and lineno >= 0, \
           "lineno must be an int >= 0"
    _add_filter(action, None, category, None, lineno, append=append)

def _add_filter(*item, append):
    # Remove possible duplicate filters, so new one will be placed
    # in correct place. If append=True and duplicate exists, do nothing.
    if not append:
        try:
            filters.remove(item)
        except Exception: # ValueError was previous here
            pass
        filters.insert(0, item)
    else:
        if item not in filters:
            filters.append(item)
    _filters_mutated()
__pragma__("nokwargs")

def resetwarnings():
    """Clear the list of warning filters, so that no filters are active."""
    filters = []
    _filters_mutated()


__warningregistry__ = {}

# @note - The current implementation of transcrypt cannot support
#    stack traversal so it is very difficult to support a `warnings.warn`
#    function. In order to prevent runtime conditions where a warning
#    should have been generated, but instead will generate a extremely
#    non-helpful "NotImplementedError", I'm removing the `warn` function
#    from the API. This will force developers to use the `warn_explicit`
#    function instead, leveraging the __filename__, __line__, __name__
#    macros.
#
# def warn(message, category=None, stacklevel=1):
#     """Issue a warning, or maybe ignore it or raise an exception."""
#     raise NotImplementedError("Stack info not implemented - use warn_explicit"))


def _checkCatMatch(msgCat, filtCat):
    """
    """
    return ( msgCat.__name__ == filtCat.__name__ )

def warn_explicit(message, category, filename, lineno,
                  module=None, registry=None, module_globals=None
                  ):
    """ Explicitly set the message and origin information for a warning.
    This is the preferred method to use in transcrypt.
    @param message message for the warning that will be created.
    @param category object that subclasses `Warning` and indicates the
       type of warning being created. @see addWarningCategory for
       extensibility
    @param filename name of the file from which this warning is originating.
       @note use the __file__ and __filename__ macro definitions for this.
       In general, this should refer to the python source file or if that
       does not exist a pure js file.
    @param lineno The line number in the associated source file that this
       warning is being generated at. @note use the __line__ macro.
    @param module name of the module that is generating this warning.
       @note use the __name__ macro as a mechanism for creating this
       string.
    @param registry This parameter is used to reference the data storage
       location which houses the state of warnings that have been
       generated. In most applications, you should leave this value as
       None. If this value is None, then the internal `warnings` module
       registry will be used by default. @note this is a deviation from
       the python standard API.
    @param module_globals This parameter is carry over from the python
       implementation and provided to keep the API the same. This
       parameter is currently not used.
    """
    lineno = int(lineno)
    if module is None:
        module = filename or "<unknown>"
        if module[-3:].lower() == ".py":
            module = module[:-3] # XXX What about leading pathname?
    if registry is None:
        # @note - this is a departure from the original python
        #    implementation - we are going to pull registry from
        #    the __warningregistry__ module level variable
        #    instead of just a blank registry
        registry = __warningregistry__
        #registry = {}

    try:
        currVersion = registry["version"]
    except KeyError:
        currVersion = 0

    if currVersion != _filters_version:
        registry.clear()
        registry['version'] = _filters_version

    if isinstance(message, Warning):
        text = str(message)
        category = message.__class__
    else:
        text = message
        message = category(message)
    key = (text, category, lineno)
    # Quick test for common case
    if key in registry:
        return

    # Search the filters
    for item in filters:
        action, msg, cat, mod, ln = item
        if ((msg is None or msg.match(text)) and
            # @note - No issubclass so we will attempt to match
            #    the category of the message to the filter's cat
            #    in a different way.
            #issubclass(category, cat) and #@note - no issubclass yet
            _checkCatMatch(category, cat) and

            (mod is None or mod.match(module)) and
            (ln == 0 or lineno == ln)):
            break
    else:
        action = defaultaction
    # Early exit actions
    if action == Actions.ignore:
        registry[key] = 1
        return

    # Prime the linecache for formatting, in case the
    # "file" is actually in a zipfile or something.
    #import linecache
    #linecache.getlines(filename, module_globals)

    if action == Actions.error:
        raise message
    # Other actions
    if action == Actions.once:
        registry[key] = 1
        oncekey = (text, category)
        if oncekey in onceregistry:
            return
        onceregistry[oncekey] = 1
    elif action == Actions.always:
        pass
    elif action == Actions.module:
        registry[key] = 1
        altkey = (text, category, 0)
        if altkey in registry:
            return
        registry[altkey] = 1
    elif action == Actions.defaultact:
        registry[key] = 1
    else:
        # Unrecognized actions are errors
        raise RuntimeError("Unrecognized action ({}) in warnings.filters:\n {}".format(action, item))
    # Print message and context
    msg = WarningMessage(message, category.__name__, filename, lineno)
    _showwarnmsg(msg)


class WarningMessage(object):

    def __init__(self, message, category, filename, lineno, file=None,
                 line=None):
        self.message = message
        self.category = category
        self.filename = filename
        self.lineno = lineno
        self.file = file
        self.line = line

        self._category_name = category.__name__ if category else None

    def __str__(self):
        return ("{{message : {}, category : {}, filename : {}, lineno : {}, "
                "line : {} }}".format(self.message, self._category_name,
                                      self.filename, self.lineno, self.line))

# @note - Currently transcrypt does not support "with/as" clauses so
#    this is currently not going to work. As such, this class will
#    throw an exception when the user tries to use it.
class catch_warnings(object):
    """A context manager that copies and restores the warnings filter upon
    exiting the context.

    The 'record' argument specifies whether warnings should be captured by a
    custom implementation of warnings.showwarning() and be appended to a list
    returned by the context manager. Otherwise None is returned by the context
    manager. The objects appended to the list are arguments whose attributes
    mirror the arguments to showwarning().

    The 'module' argument is to specify an alternative module to the module
    named 'warnings' and imported under that name. This argument is only useful
    when testing the warnings module itself.

    """

    def __init__(self, *, record=False, module=None):
        """Specify whether to record warnings and if an alternative module
        should be used other than sys.modules['warnings'].

        For compatibility with Python 3.0, please consider all arguments to be
        keyword-only.

        """
        self._record = record
        #self._module = sys.modules['warnings'] if module is None else module
        self._entered = False
        raise NotImplementedError("with/as not well supported in transcrypt")

    # def __repr__(self):
    #     args = []
    #     if self._record:
    #         args.append("record=True")
    #     if self._module is not sys.modules['warnings']:
    #         args.append("module=%r" % self._module)
    #     name = type(self).__name__
    #     return "%s(%s)" % (name, ", ".join(args))

    # def __enter__(self):
    #     if self._entered:
    #         raise RuntimeError("Cannot enter %r twice" % self)
    #     self._entered = True
    #     self._filters = self._module.filters
    #     self._module.filters = self._filters[:]
    #     self._module._filters_mutated()
    #     self._showwarning = self._module.showwarning
    #     self._showwarnmsg = self._module._showwarnmsg
    #     if self._record:
    #         log = []
    #         def showarnmsg(msg):
    #             log.append(msg)
    #         self._module._showwarnmsg = showarnmsg
    #         return log
    #     else:
    #         return None

    # def __exit__(self, *exc_info):
    #     if not self._entered:
    #         raise RuntimeError("Cannot exit %r without entering first" % self)
    #     self._module.filters = self._filters
    #     self._module._filters_mutated()
    #     self._module.showwarning = self._showwarning
    #     self._module._showwarnmsg = self._showwarnmsg


############################################################
# Warnings Module Options
# Configuration Methods
############################################################

def setWarningOptions(opts):
    """ This method can be used to configured the filters for the
    warning module.
    @param opts List of strings in the form
      "action:message:category:module:line"
      where action is string in the set `warnings.ActionSet`
      @see the python documentation for more info.
    """
    _processoptions(opts)

class _OptionError(Exception):
    """Exception used by option processing helpers."""
    pass

# Helper to process -W options passed via sys.warnoptions
def _processoptions(args):
    for arg in args:
        try:
            _setoption(arg)
        except _OptionError as msg:
            console.log("WARNING: Invalid -W option ignored: {}".format(msg))

# Helper for _processoptions()
def _setoption(arg):
    parts = arg.split(':')
    if len(parts) > 5:
        raise _OptionError("too many fields (max 5): {}".format(arg))
    while len(parts) < 5:
        parts.append('')
    action, message, category, module, lineno = [s.strip() for s in parts]
    action = _getaction(action)
    message = re.escape(message)
    category = _getcategory(category)
    module = re.escape(module)
    if module:
        module = module + '$'
    if lineno:
        try:
            lineno = int(lineno)
            if lineno < 0:
                raise ValueError
        except (ValueError, OverflowError):
            raise _OptionError("invalid lineno {}".format(lineno))
    else:
        lineno = 0
    filterwarnings(action, message, category, module, lineno)

# Helper for _setoption()
def _getaction(action):
    if not action:
        return Actions.defaultact
    if action == "all": return Action.always # Alias
    for a in ActionSet:
        if a.startswith(action):
            return a
    raise _OptionError("invalid action: {}".format(action))

# Helper for _setoption()
def _getcategory(category):
    if not category:
        return Warning
    if ( category in CategoryMap.keys() ):
        try:
            cat = CategoryMap[category]
        except NameError:
            raise _OptionError("unknown warning category: {}".format(category))
    else:
        # @note - transcrypt does not have the ability to import
        raise Exception("Unable to import category: {}, use `addWarningCategory`".format(category))
        # i = category.rfind(".")
        # module = category[:i]
        # klass = category[i+1:]
        # try:
        #     m = __import__(module, None, None, [klass])
        # except ImportError:
        #     raise _OptionError("invalid module name: %r" % (module,))
        # try:
        #     cat = getattr(m, klass)
        # except AttributeError:
        #     raise _OptionError("unknown warning category: %r" % (category,))
    #if not issubclass(cat, Warning):
    #    raise _OptionError("invalid warning category: {}".format(category))
    return cat

if not _warnings_defaults:
    #silence = [ImportWarning, PendingDeprecationWarning]
    silence = [DeprecationWarning]
    for cls in silence:
        simplefilter(Actions.ignore, category=cls)
    # bytes_warning = sys.flags.bytes_warning
    # if bytes_warning > 1:
    #     bytes_action = Actions.error
    # elif bytes_warning:
    #     bytes_action = Actions.defaultact
    # else:
    #     bytes_action = Actions.ignore
    # simplefilter(bytes_action, category=BytesWarning, append=1)
    # resource usage warnings are enabled by default in pydebug mode
    # if hasattr(sys, 'gettotalrefcount'):
    #     resource_action = Actions.always
    # else:
    #     resource_action = Actions.ignore
    # simplefilter(resource_action, category=ResourceWarning, append=1)

#del _warnings_defaults
