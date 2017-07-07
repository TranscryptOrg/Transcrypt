	(function () {
		var api = __init__ (__world__.org.threejs).api;
		var scene = api.Scene ();
		var camera = api.PerspectiveCamera (30, window.innerWidth / window.innerHeight, 0.1, 1000);
		var renderer = api.WebGLRenderer ();
		renderer.setSize (window.innerWidth, window.innerHeight);
		document.body.appendChild (renderer.domElement);
		var geometry = api.BoxGeometry (1, 1, 1);
		var material = api.MeshLambertMaterial (dict ({'color': 16777215}));
		var cube = api.Mesh (geometry, material);
		scene.add (cube);
		var ambientLight = api.AmbientLight (255, 0.5);
		scene.add (ambientLight);
		var directionalLight0 = api.DirectionalLight (16711680, 0.5);
		scene.add (directionalLight0);
		var directionalLight1 = api.DirectionalLight (65280, 0.5);
		directionalLight1.position.set (50, 50, 50);
		scene.add (directionalLight1);
		camera.position.z = 5;
		var render = function () {
			requestAnimationFrame (render);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render (scene, camera);
		};
		render ();
		__pragma__ ('<use>' +
			'org.threejs' +
		'</use>')
		__pragma__ ('<all>')
			__all__.ambientLight = ambientLight;
			__all__.api = api;
			__all__.camera = camera;
			__all__.cube = cube;
			__all__.directionalLight0 = directionalLight0;
			__all__.directionalLight1 = directionalLight1;
			__all__.geometry = geometry;
			__all__.material = material;
			__all__.render = render;
			__all__.renderer = renderer;
			__all__.scene = scene;
		__pragma__ ('</all>')
	}) ();
