__pragma__ ('noanno')

api = __pragma__ ('js',
    '{}',
    '''
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
     '''
)

# The above are just examples, all needed constructors can be added in this way
# THREE is just left in the global namespace as three.js itself seems to need it