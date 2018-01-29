bcp47
=====

#### Parser for the BCP 47 language tag specification ####

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![coveralls][coveralls-image]][coveralls-url]

[BCP 47][bcp47]

___module_.parse(tag) : Object__  
Parses the language tag and returns an object with all the available information. If the tag is not valid it returns null. Look at the [examples][examples] folder to see what information returns.

[npm-image]: https://img.shields.io/npm/v/bcp47.svg?style=flat
[npm-url]: https://npmjs.org/package/bcp47
[travis-image]: https://img.shields.io/travis/gagle/node-bcp47.svg?style=flat
[travis-url]: https://travis-ci.org/gagle/node-bcp47
[coveralls-image]: https://img.shields.io/coveralls/gagle/node-bcp47.svg?style=flat
[coveralls-url]: https://coveralls.io/r/gagle/node-bcp47
[bcp47]: http://tools.ietf.org/rfc/bcp/bcp47.txt
[examples]: https://github.com/gagle/node-bcp47/tree/master/examples