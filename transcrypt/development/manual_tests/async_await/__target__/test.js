// Transcrypt'ed from Python, 2018-08-28 20:48:01
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';

    function waitAWhile (aTime, asio) {
      return new Promise (resolve => {
        setTimeout (() => {
          resolve (aTime);
        }, 1000 * aTime);
      });
    }

export var f = async function (waw, asio) {
	print ('f0');
	await waw (2, asio);
	print ('f1');
};
export var C =  __class__ ('C', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.aTime = 2;
	});},
	get g () {return __get__ (this, async function (self, waw, asio) {
		print ('g0');
		await waw (self.aTime, asio);
		print ('g1');
	});}
});
export var c = C ();
if (__envir__.executor_name == __envir__.transpiler_name) {
	f (waitAWhile, null);
	c.g (waitAWhile, null);
	c.g (waitAWhile, null);
	f (waitAWhile, null);
}
else {
	var eventLoop = asyncio.get_event_loop ();
	var tasks = list ([eventLoop.create_task (f (waitAWhile, asyncio)), eventLoop.create_task (c.g (waitAWhile, asyncio)), eventLoop.create_task (c.g (waitAWhile, asyncio)), eventLoop.create_task (f (waitAWhile, asyncio))]);
	var waitingTasks = asyncio.wait (tasks);
	eventLoop.run_until_complete (waitingTasks);
	eventLoop.close ();
}

//# sourceMappingURL=test.map