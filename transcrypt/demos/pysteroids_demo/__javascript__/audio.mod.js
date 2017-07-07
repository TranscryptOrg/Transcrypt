	__nest__ (
		__all__,
		'audio', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var logging = {};
					__nest__ (logging, '', __init__ (__world__.logging));
					var logger = logging.getLogger ('root');
					var load = function (player_element, sourcefile) {
						try {
							var audio_element = document.getElementById (player_element);
							if (!(len (audio_element))) {
								var __except0__ = Exception ("unable to load audio from element '{}'".format (player_element));
								__except0__.__cause__ = null;
								throw __except0__;
							}
							if (len (sourcefile)) {
								audio_element.src = sourcefile;
							}
							return audio_element;
						}
						catch (__except0__) {
							if (isinstance (__except0__, Exception)) {
								var e = __except0__;
								logging.exception (e);
							}
							else {
								throw __except0__;
							}
						}
					};
					var clip = function (filename) {
						var player = new Audio (filename);
						return player;
					};
					var loop = function (filename) {
						var player = new Audio (filename);
						var reset_player = function () {
							player.currentTime = 0;
							player.play ();
						};
						player.addEventListener ('ended', reset_player, false);
						return player;
					};
					__pragma__ ('<use>' +
						'logging' +
					'</use>')
					__pragma__ ('<all>')
						__all__.clip = clip;
						__all__.load = load;
						__all__.logger = logger;
						__all__.loop = loop;
					__pragma__ ('</all>')
				}
			}
		}
	);
