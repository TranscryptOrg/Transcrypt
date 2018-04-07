// Transcrypt'ed from Python, 2018-04-07 19:09:34
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {api} from './org.threejs.js';
var __name__ = '__main__';
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