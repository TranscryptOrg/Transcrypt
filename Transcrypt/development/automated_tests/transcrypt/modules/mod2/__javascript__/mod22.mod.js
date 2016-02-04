	__nest__ (
		__all__,
		'modules.mod2.mod22', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var B = __class__ ('B', [object], {
						get __init__ () {return __get__ (this, function (self) {
							self.x = 'Geef mij maar Amsterdam\n';
						});}
					});
					__pragma__ ('<all>')
						__all__.B = B;
					__pragma__ ('</all>')
				}
			}
		}
	);
