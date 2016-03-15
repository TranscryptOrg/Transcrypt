"use strict"

__module1__ = function ():
	__module__ = {};
	a = 5;
	__module__.a = a;
	// So you have to know what the globals are when you assign to them
	// Since the module creator is special, this seems doable
	
	// Adding prefixes is more difficult, since you have to know what your globals
	// are when you reference (rather than assign) to them.
	// This search mechanism is dynamic.
	// At one point in execution something is a global.
	// At another it's local.
	// See globloc.py
	
	if (a) {
			b = aBigObject;
	}
	else {
			c = anotherBigObject;
	}
	
	__module__.b = aBigObject
	__module__.c = anotherBigObject
	return __module__;
	

module1 = __module1__;
