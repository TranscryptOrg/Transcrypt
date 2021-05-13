#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

def normalize(form, unistr):
    # Delegate to ES6's method:
    # http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.normalize
    # Both ES6 and CPython require that `form` be the same four values.
    # https://github.com/python/cpython/blob/e42b705188271da108de42b55d9344642170aa2b/Modules/unicodedata.c
    return String.prototype.normalize.call(unistr, form)
