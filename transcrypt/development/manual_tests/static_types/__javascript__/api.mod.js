	(function () {
		var __symbols__ = ['__esv5__'];
		var ValidationMessage = __class__ ('ValidationMessage', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.identifier = null;
				self.description = null;
			});}
		});
		var ValidationRemark = __class__ ('ValidationRemark', [ValidationMessage], {
		});
		var ValidationError = __class__ ('ValidationError', [ValidationMessage], {
		});
		var StaticTypingError = __class__ ('StaticTypingError', [ValidationError], {
			get __init__ () {return __get__ (this, function (self, error_info) {
				ValidationError.__init__ (self);
				self._error_info = error_info;
				self.description = self._error_info.message;
				self.import_context = self._error_info.import_ctx;
				self.file_name = self._error_info.file;
				self.class_name = self._error_info.type;
				self.function_name = self._error_info.function_or_member;
				self.line_nr = self._error_info.line;
				self.severity = self._error_info.severity;
			});}
		});
		var CompilationError = __class__ ('CompilationError', [ValidationError], {
			get __init__ () {return __get__ (this, function (self, compile_error) {
				ValidationError.__init__ (self);
				self._compile_error = compile_error;
				self._static_typing_errors = list ([]);
				if (self._compile_error.messages [0].startswith ('mypy:')) {
					self.description = self._compile_error.messages [0];
				}
				else {
					self.description = 'Unspecified compilation error';
					var __iterable0__ = self._compile_error.messages;
					for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
						var formatted_message = __iterable0__ [__index0__];
						if (__in__ (': error:', formatted_message)) {
							var __left0__ = formatted_message.py_split (':', 4);
							var file_name = __left0__ [0];
							var line_nr = __left0__ [1];
							var severity = __left0__ [2];
							var description = __left0__ [3];
							self._static_typing_errors.append (StaticTypingError (errors.ErrorInfo (__kwargdict__ ({import_ctx: null, file: file_name, typ: null, function_or_member: null, line: line_nr, severity: severity, description: description, blocker: null, only_once: null}))));
						}
					}
				}
			});}
		});
		var SyntaxError = __class__ ('SyntaxError', [CompilationError], {
		});
		var InternalError = __class__ ('InternalError', [CompilationError], {
		});
		var ValidatorOptions = __class__ ('ValidatorOptions', [object], {
			get __init__ () {return __get__ (this, function (self, python_version, platform, silent_imports, disallow_untyped_calls, disallow_untyped_defs, check_untyped_defs, warn_incomplete_stub, warn_redundant_casts, warn_unused_ignores) {
				if (typeof python_version == 'undefined' || (python_version != null && python_version .__class__ == __kwargdict__)) {;
					var python_version = defaults.PYTHON3_VERSION;
				};
				if (typeof platform == 'undefined' || (platform != null && platform .__class__ == __kwargdict__)) {;
					var platform = sys.platform;
				};
				if (typeof silent_imports == 'undefined' || (silent_imports != null && silent_imports .__class__ == __kwargdict__)) {;
					var silent_imports = false;
				};
				if (typeof disallow_untyped_calls == 'undefined' || (disallow_untyped_calls != null && disallow_untyped_calls .__class__ == __kwargdict__)) {;
					var disallow_untyped_calls = false;
				};
				if (typeof disallow_untyped_defs == 'undefined' || (disallow_untyped_defs != null && disallow_untyped_defs .__class__ == __kwargdict__)) {;
					var disallow_untyped_defs = false;
				};
				if (typeof check_untyped_defs == 'undefined' || (check_untyped_defs != null && check_untyped_defs .__class__ == __kwargdict__)) {;
					var check_untyped_defs = false;
				};
				if (typeof warn_incomplete_stub == 'undefined' || (warn_incomplete_stub != null && warn_incomplete_stub .__class__ == __kwargdict__)) {;
					var warn_incomplete_stub = false;
				};
				if (typeof warn_redundant_casts == 'undefined' || (warn_redundant_casts != null && warn_redundant_casts .__class__ == __kwargdict__)) {;
					var warn_redundant_casts = false;
				};
				if (typeof warn_unused_ignores == 'undefined' || (warn_unused_ignores != null && warn_unused_ignores .__class__ == __kwargdict__)) {;
					var warn_unused_ignores = false;
				};
				var params = locals ().items ();
				self._options = options.Options ();
				var __iterable0__ = params;
				for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
					var param = __iterable0__ [__index0__];
					print (111, param);
					setattr.apply (null, [self._options].concat (param));
				}
			});}
		});
		var _TypeValidator = __class__ ('_TypeValidator', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.set_options ();
			});},
			get set_options () {return __get__ (this, function (self, validator_options) {
				if (typeof validator_options == 'undefined' || (validator_options != null && validator_options .__class__ == __kwargdict__)) {;
					var validator_options = ValidatorOptions ();
				};
				self.validator_options = validator_options;
			});},
			get validate () {return __get__ (this, function (self, source_paths) {
				var compilation_error = null;
				try {
					var build_result = build.build (function () {
						var __accu0__ = [];
						var __iterable0__ = source_paths;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var source_path = __iterable0__ [__index0__];
							__accu0__.append (build.BuildSource (source_path, null, null));
						}
						return __accu0__;
					} (), null, self.validator_options._options);
					var static_typing_errors = function () {
						var __accu0__ = [];
						var __iterable0__ = build_result.manager.errors;
						for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
							var error_info = __iterable0__ [__index0__];
							__accu0__.append (StaticTypingError (error_info));
						}
						return __accu0__;
					} ();
				}
				catch (__except0__) {
					if (isinstance (__except0__, errors.CompileError)) {
						var compile_error = __except0__;
						var compilation_error = CompilationError (compile_error);
						var static_typing_errors = compilation_error._static_typing_errors;
					}
					else {
						throw __except0__;
					}
				}
				var validation_messages = null;
				var old_error = null;
				var __iterable0__ = enumerate (sorted (static_typing_errors, __kwargdict__ ({key: (function __lambda__ (error) {
					return tuple ([error.file_name, error.line_nr, error.description]);
				})})));
				for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
					var __left0__ = __iterable0__ [__index0__];
					var index = __left0__ [0];
					var error = __left0__ [1];
					if (index && !(error._error_info.only_once && error.file_name == old_error.file_name && error.line_nr == old_error.line_nr && error.description == old_error.description)) {
						validation_messages.append (error);
						var old_error = error;
					}
				}
				if (compilation_error) {
					validation_messages.append (compilation_error);
				}
				return validation_messages;
			});}
		});
		var type_validator = _TypeValidator ();
		__pragma__ ('<all>')
			__all__.CompilationError = CompilationError;
			__all__.InternalError = InternalError;
			__all__.StaticTypingError = StaticTypingError;
			__all__.SyntaxError = SyntaxError;
			__all__.ValidationError = ValidationError;
			__all__.ValidationMessage = ValidationMessage;
			__all__.ValidationRemark = ValidationRemark;
			__all__.ValidatorOptions = ValidatorOptions;
			__all__._TypeValidator = _TypeValidator;
			__all__.type_validator = type_validator;
		__pragma__ ('</all>')
	}) ();
