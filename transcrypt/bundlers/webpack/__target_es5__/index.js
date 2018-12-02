"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = exports.DEFAULT_PACKAGE_CONFIG = exports.loader_utils = exports.child_process = exports.path = void 0;

var _orgTranscrypt__runtime__ = require("./org.transcrypt.__runtime__.js");

// Transcrypt'ed from Python, 2018-12-31 09:55:46
var __name__ = '__main__';

var path = require('path');

exports.path = path;

var child_process = require('child_process');

exports.child_process = child_process;

var loader_utils = require('loader-utils');

exports.loader_utils = loader_utils;
var DEFAULT_PACKAGE_CONFIG = (0, _orgTranscrypt__runtime__.dict)({
  'command': 'python3 -m transcrypt',
  'arguments': (0, _orgTranscrypt__runtime__.list)(['--nomin', '--map', '--verbose'])
});
exports.DEFAULT_PACKAGE_CONFIG = DEFAULT_PACKAGE_CONFIG;

var main = function main(src) {
  var config = (0, _orgTranscrypt__runtime__.dict)({});
  config.py_update(DEFAULT_PACKAGE_CONFIG);
  config.py_update(loader_utils.getOptions(this));
  var fileinfo = path.parse(this.resource);
  var relative_dir = path.relative(this.rootContext, fileinfo.dir);

  if (fileinfo.name == '__init__') {
    var py_module = relative_dir.py_split(path.sep).join('.');
  } else {
    var py_module = path.join(relative_dir, fileinfo.name).py_split(path.sep).join('.');
  }

  var target_path = path.join(this.rootContext, '__target__', py_module) + '.js';
  var import_path = './' + path.relative(fileinfo.dir, target_path);
  var runinfo_path = path.join(this.rootContext, '__target__', relative_dir, fileinfo.name) + '.transcrypt.json';
  var cmd = (0, _orgTranscrypt__runtime__.list)([]);
  cmd.append(config['command']);
  cmd.extend(config['arguments']);
  cmd.append('"{}"'.format(py_module.py_replace('"', '\\"')));
  var cmd_options = (0, _orgTranscrypt__runtime__.dict)({
    'cwd': this.rootContext,
    'encoding': 'utf8'
  });

  try {
    var stdout = (0, _orgTranscrypt__runtime__.str)(child_process.execSync(' '.join(cmd), cmd_options));
  } catch (__except0__) {
    if ((0, _orgTranscrypt__runtime__.isinstance)(__except0__, _orgTranscrypt__runtime__.object)) {
      var err = __except0__;
      console.log('Error compiling {}: {}'.format(this.resource, err.stdout));
      __except0__.__cause__ = null;
      throw __except0__;
    } else {
      throw __except0__;
    }
  }

  return 'export * from "{}";'.format(import_path);
};

exports.main = main;
module.exports = main;