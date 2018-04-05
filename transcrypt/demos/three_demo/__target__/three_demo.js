// Transcrypt'ed from Python, 2018-04-05 23:14:01
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
import {api} from './org.threejs.js';
export var scene = api.Scene ();
export var camera = api.PerspectiveCamera (30, window.innerWidth / window.innerHeight, 0.1, 1000);
export var renderer = api.WebGLRenderer ();
renderer.setSize (window.innerWidth, window.innerHeight);
document.body.appendChild (renderer.domElement);
export var geometry = api.BoxGeometry (1, 1, 1);
export var material = api.MeshLambertMaterial (dict ({'color': 16777215}));
export var cube = api.Mesh (geometry, material);
scene.add (cube);
export var ambientLight = api.AmbientLight (255, 0.5);
scene.add (ambientLight);
export var directionalLight0 = api.DirectionalLight (16711680, 0.5);
scene.add (directionalLight0);
export var directionalLight1 = api.DirectionalLight (65280, 0.5);
directionalLight1.position.set (50, 50, 50);
scene.add (directionalLight1);
camera.position.z = 5;
export var render = function () {
	requestAnimationFrame (render);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render (scene, camera);
};
render ();

//# sourceMappingURL=three_demo.map