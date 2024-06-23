# Copyright 2001-2016 by Vinay Sajip. All Rights Reserved.
#
# Permission to use, copy, modify, and distribute this software and its
# documentation for any purpose and without fee is hereby granted,
# provided that the above copyright notice appear in all copies and that
# both that copyright notice and this permission notice appear in
# supporting documentation, and that the name of Vinay Sajip
# not be used in advertising or publicity pertaining to distribution
# of the software without specific, written prior permission.
# VINAY SAJIP DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING
# ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL
# VINAY SAJIP BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR
# ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER
# IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
# OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

"""
Configuration functions for the logging package for Python. The core package
is based on PEP 282 and comments thereto in comp.lang.python, and influenced
by Apache's log4j system.

Copyright (C) 2001-2016 Vinay Sajip. All Rights Reserved.

To use, simply 'import logging' and log away!

Edited by Carl Allendorph 2016 for Transcrypt.

Transcrypt Limitations:

This code makes heavy use of the import functionality of the
CPython implementation to provide loading of formatters, handlers,
etc. This is fundementally counter to what transcrypt is setup
to do. As such, where a resolve method may have been used previously,
the user has the option to either use the default classes from the
`logging` module, like logging.Formatter, or can pass in their own
calleable that can be used to generate the necessary objects.

This module adds the method `addResolvable` which allows the user
to add new class objects that can be included in the dict config
by string representation. See the unit tests for an example

The converter syntax, e.g. `cfg:\\handlers.hdlr1`, is not tested at
this point and will throw an "NotImplemented" exception if a converter
sequence is encountered.

"""

import logging
import logging.handlers
import re

# No Threads
# try:
#           import _thread as thread
#           import threading
# except ImportError: #pragma: no cover
#           thread = None
thread = None

#from socketserver import ThreadingTCPServer, StreamRequestHandler


DEFAULT_LOGGING_CONFIG_PORT = 9030

RESET_ERROR = 1 #errno.ECONNRESET

#
#       The following code implements a socket listener for on-the-fly
#       reconfiguration of logging.
#
#       _listener holds the server object doing the listening
_listener = None

def fileConfig(fname, defaults=None, disable_existing_loggers=True):
    """ File IO not implemented
    """
    raise NotImplementedError("No Filesystem to read file config from")


class UnresolvableError(Exception):
    """ This exception gets thrown when this module is unable to
    find a preregistered class for the string name provided by the
    user in the configuration.
    """
    pass

# This dict contains all the known resolvable items that
# the config module can work with.
_resolvables = {
    "logging.StreamHandler" : logging.StreamHandler,
    "logging.Formatter" : logging.Formatter,
    "logging.Filter": logging.Filter,
    }

def addResolvable(name, obj):
    """ Add a resolvable item to the logging configuration mechanism.
    @param name unique name that will be associated with this object class
       you should use a fully qualified name in your project like
       "logging.StreamHandler" or "logging.handlers.BufferingHandler"
    @param obj callable class object that can be used to generate the
       object in question.
    """
    if ( name in _resolvables.keys() ):
        raise KeyError("Resolvable by name {} already exists".format(name))
    if ( obj is None ):
        raise ValueError("Resolvable cannot be None")
    _resolvables[name] = obj


def _resolve(name):
    """Resolve a dotted name to a global object."""

    if ( name in _resolvables ):
        return(_resolvables[name])
    else:
        raise UnresolvableError("class {} is not resolvable in logging.config")

def _strip_spaces(alist):
    return map(lambda x: x.strip(), alist)

def _create_formatters(cp):
    """Create and return formatters"""
    flist = cp["formatters"]["keys"]
    if not len(flist):
        return {}
    flist = flist.split(",")
    flist = _strip_spaces(flist)
    formatters = {}
    for form in flist:
        sectname = "formatter_{}".format(form)
        fs = cp.get(sectname, "format", raw=True, fallback=None)
        dfs = cp.get(sectname, "datefmt", raw=True, fallback=None)
        stl = cp.get(sectname, "style", raw=True, fallback='{')
        c = logging.Formatter
        class_name = cp[sectname].get("class")
        if class_name:
            c = _resolve(class_name)
        f = c(fs, dfs, stl)
        formatters[form] = f
    return formatters

def _handle_existing_loggers(existing, child_loggers, disable_existing):
    """
    When (re)configuring logging, handle loggers which were in the previous
    configuration but are not in the new configuration. There's no point
    deleting them as other threads may continue to hold references to them;
    and by disabling them, you stop them doing any logging.

    However, don't disable children of named loggers, as that's probably not
    what was intended by the user. Also, allow existing loggers to NOT be
    disabled if disable_existing is false.
    """
    root = logging.root
    for log in existing:
        logger = root.manager.loggerDict[log]
        if log in child_loggers:
            logger.level = logging.NOTSET
            logger.handlers = []
            logger.propagate = True
        else:
            logger.disabled = disable_existing

def _install_loggers(cp, handlers, disable_existing):
    """Create and install loggers"""

    # configure the root first
    llist = cp["loggers"]["keys"]
    llist = llist.split(",")
    llist = list(map(lambda x: x.strip(), llist))
    llist.remove("root")
    section = cp["logger_root"]
    root = logging.root
    log = root
    if "level" in section:
        level = section["level"]
        log.setLevel(level)
    for h in root.handlers[:]:
        root.removeHandler(h)
    hlist = section["handlers"]
    if len(hlist):
        hlist = hlist.split(",")
        hlist = _strip_spaces(hlist)
        for hand in hlist:
            log.addHandler(handlers[hand])

    #and now the others...
    #we don't want to lose the existing loggers,
    #since other threads may have pointers to them.
    #existing is set to contain all existing loggers,
    #and as we go through the new configuration we
    #remove any which are configured. At the end,
    #what's left in existing is the set of loggers
    #which were in the previous configuration but
    #which are not in the new configuration.
    existing = list(root.manager.loggerDict.keys())
    #The list needs to be sorted so that we can
    #avoid disabling child loggers of explicitly
    #named loggers. With a sorted list it is easier
    #to find the child loggers.
    existing.sort()
    #We'll keep the list of existing loggers
    #which are children of named loggers here...
    child_loggers = []
    #now set up the new ones...
    for log in llist:
        section = cp["logger_{}".format(log)]
        qn = section["qualname"]
        propagate = section.getint("propagate", fallback=1)
        logger = logging.getLogger(qn)
        if qn in existing:
            i = existing.index(qn) + 1 # start with the entry after qn
            prefixed = qn + "."
            pflen = len(prefixed)
            num_existing = len(existing)
            while i < num_existing:
                if existing[i][:pflen] == prefixed:
                    child_loggers.append(existing[i])
                i += 1
            existing.remove(qn)
        if "level" in section:
            level = section["level"]
            logger.setLevel(level)
        for h in logger.handlers[:]:
            logger.removeHandler(h)
        logger.propagate = propagate
        logger.disabled = 0
        hlist = section["handlers"]
        if len(hlist):
            hlist = hlist.split(",")
            hlist = _strip_spaces(hlist)
            for hand in hlist:
                logger.addHandler(handlers[hand])

    #Disable any old loggers. There's no point deleting
    #them as other threads may continue to hold references
    #and by disabling them, you stop them doing any logging.
    #However, don't disable children of named loggers, as that's
    #probably not what was intended by the user.
    #for log in existing:
    #        logger = root.manager.loggerDict[log]
    #        if log in child_loggers:
    #                logger.level = logging.NOTSET
    #                logger.handlers = []
    #                logger.propagate = 1
    #        elif disable_existing_loggers:
    #                logger.disabled = 1
    _handle_existing_loggers(existing, child_loggers, disable_existing)

IDENTIFIER = re.compile('^[a-z_][a-z0-9_]*$', re.I)


def valid_ident(s):
    m = IDENTIFIER.match(s)
    if not m:
        raise ValueError('Not a valid Python identifier: {}'.format(str(s)))
    return True


class BaseConfigurator(object):
    """
    The configurator base class which defines some useful defaults.
    """

    #CONVERT_PATTERN = re.compile(r'^(?P<prefix>[a-z]+)://(?P<suffix>.*)$')
    # Simplified grouping to make it easier to use the
    # javscript regex engine
    CONVERT_PATTERN = re.compile(r'^([a-z]+)://(.*)$')

    WORD_PATTERN = re.compile(r'^\s*(\w+)\s*')
    DOT_PATTERN = re.compile(r'^\.\s*(\w+)\s*')
    INDEX_PATTERN = re.compile(r'^\[\s*(\w+)\s*\]\s*')
    DIGIT_PATTERN = re.compile(r'^\d+$')

    value_converters = {
        'ext' : 'ext_convert',
        'cfg' : 'cfg_convert',
    }

    # We might want to use a different one, e.g. importlib
    # @note - import is not going to work here because we don't
    #    have this construct in transcrypt
    #importer = staticmethod(__import__)
    importer = None

    def __init__(self, config):
        self.config = config

    def resolve(self, s):
        """
        Resolve strings to objects using standard import and attribute
        syntax.
        """
        return(_resolve(s))

    def ext_convert(self, value):
        """Default converter for the ext:// protocol.
        @note - this won't work because it requires the import
        concept which we will not have.
        """
        return self.resolve(value)

    def cfg_convert(self, value):
        """Default converter for the cfg:// protocol."""
        rest = value
        m = self.WORD_PATTERN.match(rest)
        if m is None:
            raise ValueError("Unable to convert {}".format(value))
        else:
            rest = rest[m.end():]
            d = self.config[m.groups()[0]]
            #print d, rest
            while rest:
                m = self.DOT_PATTERN.match(rest)
                if m:
                    d = d[m.groups()[0]]
                else:
                    m = self.INDEX_PATTERN.match(rest)
                    if m:
                        idx = m.groups()[0]
                        if not self.DIGIT_PATTERN.match(idx):
                            d = d[idx]
                        else:
                            try:
                                n = int(idx) # try as number first (most likely)
                                d = d[n]
                            except TypeError:
                                d = d[idx]
                if m:
                    rest = rest[m.end():]
                else:
                    raise ValueError('Unable to convert '
                                                     '{} at {}'.format(str(value), str(rest)))
                #rest should be empty
        return d

    def convert(self, value):
        """
        Convert values to an appropriate type. dicts, lists and tuples are
        replaced by their converting alternatives. Strings are checked to
        see if they have a conversion format and are converted if they do.
        """
        if isinstance(value, str): # str for py3k
            m = self.CONVERT_PATTERN.match(value)
            if m:
                d = m.groupdict()
                prefix = d[1] # prefix
                converter = self.value_converters.get(prefix, None)
                if converter:
                    raise NotImplementedError("Converters Not Well Tested!")
                    #suffix = d[2] # suffix
                    #converter = getattr(self, converter)
                    #value = converter(suffix)
        return value

    def configure_custom(self, config):
        """Configure an object with a user-supplied factory."""
        c = self.convert(config.pop('()'))
        if not callable(c):
            c = self.resolve(c)
        props = config.pop('.', None)
        # Check for valid identifiers
        data = [(k, self.convert(config[k])) for k in config.keys() if valid_ident(k)]
        kwargs = dict(data)
        result = c(**kwargs)
        if props:
            for name, value in props.items():
                setattr(result, name, value)
        return result

    def as_tuple(self, value):
        """Utility function which converts lists to tuples."""
        if isinstance(value, list):
            value = tuple(value)
        return value

class DictConfigurator(BaseConfigurator):
    """
    Configure logging using a dictionary-like object to describe the
    configuration.
    """

    def configure(self):
        """Do the configuration."""

        config = self.config
        version = self.convert(config.get("version", None))
        if version != 1:
            raise ValueError("Unsupported version: {}".format(config['version']))
        incremental = self.convert(config.pop('incremental', False))
        EMPTY_DICT = {}
        logging._acquireLock()
        try:
            if incremental:
                handlers = self.convert(config.get('handlers', EMPTY_DICT))
                for name in handlers.keys():
                    if name not in logging._handlers:
                        raise ValueError('No handler found with name {}'.format(name))
                    else:
                        try:
                            handler = logging._handlers[name]
                            hconfig = self.convert(handlers[name])
                            level = self.convert(hconfig.get('level', None))
                            if level:
                                handler.setLevel(logging._checkLevel(level))
                        except Exception as e:
                            raise ValueError('Unable to configure handler '
                                                             '{}'.format(name)) from e
                loggers = self.convert(config.get('loggers', EMPTY_DICT))
                for name in loggers.keys():
                    try:
                        self.configure_logger(name, self.convert(loggers[name]), True)
                    except Exception as e:
                        raise ValueError('Unable to configure logger {}'.format(name)) from e
                root = self.convert(config.get('root', None))
                if root:
                    try:
                        self.configure_root(root, True)
                    except Exception as e:
                        raise ValueError('Unable to configure root logger') from e
            else:
                disable_existing = config.pop('disable_existing_loggers', True)

                logging._handlers.clear()
                logging._handlerList[:] = []

                # Do formatters first - they don't refer to anything else
                formatters = self.convert(config.get('formatters', EMPTY_DICT))
                for name in formatters.keys():
                    try:
                        fmtConfig = self.convert(formatters.get(name))
                        formatters[name] = self.configure_formatter(fmtConfig)
                    except Exception as e:
                        raise ValueError('Unable to configure formatter {}'.format(name)) from e
                # Next, do filters - they don't refer to anything else, either
                filters = self.convert(config.get('filters', EMPTY_DICT))
                for name in filters.keys():
                    try:
                        filtConfig = self.convert(filters.get(name))
                        filters[name] = self.configure_filter(filtConfig)
                    except Exception as e:
                        raise ValueError('Unable to configure filter {}'.format(name)) from e

                # Next, do handlers - they refer to formatters and filters
                # As handlers can refer to other handlers, sort the keys
                # to allow a deterministic order of configuration
                handlers = self.convert(config.get('handlers', EMPTY_DICT))
                deferred = []
                for name in sorted(handlers.keys()):
                    try:
                        handlerConfig = self.convert(handlers.get(name))
                        handler = self.configure_handler(handlerConfig)
                        handler.name = name
                        handlers[name] = handler
                    except UnresolvableError as exc:
                        raise exc
                    except Exception as e:
                        if 'target not configured yet' in str(e.__cause__):
                            deferred.append(name)
                        else:
                            raise ValueError(
                            'Unable to config handler {}'.format(name)
                            ) from e

                # Now do any that were deferred
                for name in deferred:
                    try:
                        handlerConfig = self.convert(handlers.get(name))
                        handler = self.configure_handler(handlerConfig)
                        handler.name = name
                        handlers[name] = handler
                    except UnresolvableError as exc:
                        raise exc
                    except Exception as e:
                        raise ValueError(
                            'Unable to configure handler {}'.format(name)
                        ) from e

                # Next, do loggers - they refer to handlers and filters

                #we don't want to lose the existing loggers,
                #since other threads may have pointers to them.
                #existing is set to contain all existing loggers,
                #and as we go through the new configuration we
                #remove any which are configured. At the end,
                #what's left in existing is the set of loggers
                #which were in the previous configuration but
                #which are not in the new configuration.
                root = logging.root
                existing = list(root.manager.loggerDict.keys())
                #The list needs to be sorted so that we can
                #avoid disabling child loggers of explicitly
                #named loggers. With a sorted list it is easier
                #to find the child loggers.
                existing.sort()
                #We'll keep the list of existing loggers
                #which are children of named loggers here...
                child_loggers = []
                #now set up the new ones...
                loggers = self.convert(config.get('loggers', EMPTY_DICT))
                for name in loggers.keys():
                    if name in existing:
                        i = existing.index(name) + 1 # look after name
                        prefixed = name + "."
                        pflen = len(prefixed)
                        num_existing = len(existing)
                        while i < num_existing:
                            if existing[i][:pflen] == prefixed:
                                child_loggers.append(existing[i])
                            i += 1
                        existing.remove(name)
                    try:
                        loggerConfig = loggers.get(name)
                        self.configure_logger(name, loggerConfig)
                    except Exception as e:
                        raise ValueError(
                            'Unable to configure logger {}'.format(name)
                        )from e

                #Disable any old loggers. There's no point deleting
                #them as other threads may continue to hold references
                #and by disabling them, you stop them doing any logging.
                #However, don't disable children of named loggers, as that's
                #probably not what was intended by the user.
                #for log in existing:
                #        logger = root.manager.loggerDict[log]
                #        if log in child_loggers:
                #                logger.level = logging.NOTSET
                #                logger.handlers = []
                #                logger.propagate = True
                #        elif disable_existing:
                #                logger.disabled = True
                _handle_existing_loggers(existing, child_loggers,
                                                                 disable_existing)

                # And finally, do the root logger
                root = self.convert(config.get('root', None))
                if root:
                    try:
                        self.configure_root(root)
                    except Exception as e:
                        raise ValueError('Unable to configure root '
                                                         'logger') from e
        finally:
            logging._releaseLock()

    def configure_formatter(self, config):
        """Configure a formatter from a dictionary."""
        if '()' in config.keys():
            factory = self.convert(config['()']) # for use in exception handler
            try:
                result = self.configure_custom(config)
            except TypeError as te:
                if "'format'" not in str(te):
                    raise te
                #Name of parameter changed from fmt to format.
                #Retry with old name.
                #This is so that code can be used with older Python versions
                #(e.g. by Django)
                config['fmt'] = self.convert(config.pop('format'))
                config['()'] = factory
                result = self.configure_custom(config)
        else:
            fmt = self.convert(config.get('format', None))
            dfmt = self.convert(config.get('datefmt', None))
            style = self.convert(config.get('style', '{'))
            cname = self.convert(config.get('class', None))
            if not cname:
                c = logging.Formatter
            else:
                c = _resolve(cname)
            result = c(fmt, dfmt, style)
        return result

    def configure_filter(self, config):
        """Configure a filter from a dictionary."""
        if '()' in config.keys():
            result = self.configure_custom(config)
        else:
            name = self.convert(config.get('name', ''))
            result = logging.Filter(name)
        return result

    def add_filters(self, filterer, filters):
        """Add filters to a filterer from a list of names."""
        for f in filters:
            try:
                filterer.addFilter(self.config['filters'][f])
            except Exception as e:
                raise ValueError('Unable to add filter {}'.format(str(f))) from e

    def configure_handler(self, config):
        """Configure a handler from a dictionary."""
        config_copy = dict(config)  # for restoring in case of error
        formatter = self.convert(config.pop('formatter', None))
        if formatter:
            try:
                formatter = self.config['formatters'][formatter]
            except Exception as e:
                raise ValueError('Unable to set formatter {}'.format(str(formatter))) from e
        level = self.convert(config.pop('level', None))
        filters = self.convert(config.pop('filters', None))
        if '()' in config.keys():
            c = self.convert(config.pop('()'))
            if not callable(c):
                c = self.resolve(c)
            factory = c
        else:
            cname = self.convert(config.pop('class'))
            klass = self.resolve(cname)
            # @note - issubclass does not seem to be implemented yet
            #   which makes it difficult to use this.
            #Special case for handler which refers to another handler
            # if issubclass(klass, logging.handlers.MemoryHandler) and ('target' in config):
            #     try:
            #         th = self.config['handlers'][config['target']]
            #         if not isinstance(th, logging.Handler):
            #             config.update(config_copy)  # restore for deferred cfg
            #             raise TypeError('target not configured yet')
            #         config['target'] = th
            #     except Exception as e:
            #         raise ValueError('Unable to set target handler {}'.format(config['target'])) from e
            factory = klass
        props = self.convert(config.pop('.', None))
        data = [(k, self.convert(config[k])) for k in config.keys() if valid_ident(k)]
        kwargs = dict(data)
        try:
            result = factory(**kwargs)
        except TypeError as te:
            if "'stream'" not in str(te):
                raise te
            #The argument name changed from strm to stream
            #Retry with old name.
            #This is so that code can be used with older Python versions
            #(e.g. by Django)
            kwargs['strm'] = kwargs.pop('stream')
            result = factory(**kwargs)
        if formatter:
            result.setFormatter(formatter)
        if level is not None:
            result.setLevel(logging._checkLevel(level))
        if filters:
            self.add_filters(result, filters)
        if props:
            for name, value in props.items():
                setattr(result, name, value)
        return result

    def add_handlers(self, logger, handlers):
        """Add handlers to a logger from a list of names."""
        for h in handlers:
            try:
                logger.addHandler(self.config['handlers'][h])
            except Exception as e:
                raise ValueError('Unable to add handler {}'.format(str(h))) from e

    def common_logger_config(self, logger, config, incremental=False):
        """
        Perform configuration which is common to root and non-root loggers.
        """
        level = self.convert(config.get('level', None))
        if level is not None:
            logger.setLevel(logging._checkLevel(level))
        if not incremental:
            #Remove any existing handlers
            for h in logger.handlers[:]:
                logger.removeHandler(h)
            handlers = config.get('handlers', None)
            if handlers:
                self.add_handlers(logger, handlers)
            filters = config.get('filters', None)
            if filters:
                self.add_filters(logger, filters)

    def configure_logger(self, name, config, incremental=False):
        """Configure a non-root logger from a dictionary."""
        logger = logging.getLogger(name)
        self.common_logger_config(logger, config, incremental)
        propagate = self.convert(config.get('propagate', None))
        if propagate is not None:
            logger.propagate = propagate

    def configure_root(self, config, incremental=False):
        """Configure a root logger from a dictionary."""
        root = logging.getLogger()
        self.common_logger_config(root, config, incremental)

dictConfigClass = DictConfigurator

def dictConfig(config):
    """Configure logging using a dictionary."""
    dictConfigClass(config).configure()


def listen(port=DEFAULT_LOGGING_CONFIG_PORT, verify=None):
    """ Socket server based logging configuration is not enabled
    """
    #if not thread: #pragma: no cover
    #   raise NotImplementedError("listen() needs threading to work")
    raise NotImplementedError()


def stopListening():
    """
    Stop the listening server which was created with a call to listen().
    """
    pass
