	(function () {
		var __symbols__ = ['e5'];
		var RiotTag = __init__ (__world__.riot_tag).RiotTag;
		var P = __class__ ('P', [RiotTag], {
			get count_up () {return __get__ (this, function (self) {
				self.counter = self.counter + 1;
				self.pp ('counter:', self.counter, 'len lv:', len (self.lv), 'adding one lv');
				self.lv.append (dict ({'name': 'n' + self.counter}));
				return self.counter;
			});}
		});
		P.debug = 1;
		P.lv = list ([dict ({'name': 'n0'})]);
		P.counter = 1;
		P.template = ' <div><h1>Riot Transcrypt Tag Instance {label}</h1>\n                         <div>INNER</div></div> ';
		var Sample2 = __class__ ('Sample2', [P], {
			get __init__ () {return __get__ (this, function (self, tag, opts) {
				self.label = opts.label.capitalize ();
				self._setup_tag (tag);
				self.pp ('tag init, adding 2 lv');
				self.lv.extend (list ([dict ({'name': 'n1'}), dict ({'name': 'n2'})]));
			});}
		});
		Sample2.template = P.template.py_replace ('INNER', '\n    <div>\n    <h5 each="{lv}">name: {name} - counter: {count_up()}</h5>\n    </div>\n    ');
		Sample2.style = 'sample2 h5 {color: green}';
		__pragma__ ('<use>' +
			'riot_tag' +
		'</use>')
		__pragma__ ('<all>')
			__all__.P = P;
			__all__.Sample2 = Sample2;
		__pragma__ ('</all>')
	}) ();
