	__nest__ (
		__all__,
		'org.threejs', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'org.threejs';
					var api = 
					        {
					            Scene: function () {return new THREE.Scene (...arguments);},
					            PerspectiveCamera: function () {return new THREE.PerspectiveCamera (...arguments);},
					            BoxGeometry: function () {return new THREE.BoxGeometry (...arguments);},
					            WebGLRenderer: function () {return new THREE.WebGLRenderer (...arguments);},
					            MeshLambertMaterial: function () {return new THREE.MeshLambertMaterial (...arguments);},
					            Mesh: function () {return new THREE.Mesh (...arguments);},
					            AmbientLight: function () {return new THREE.AmbientLight (...arguments);},
					            DirectionalLight: function () {return new THREE.DirectionalLight (...arguments);}
					        }
					     
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.api = api;
					__pragma__ ('</all>')
				}
			}
		}
	);
