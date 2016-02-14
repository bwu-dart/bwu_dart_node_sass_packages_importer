var importer = require('../src/index.js');
var assert = require('assert');

module.exports = {

  'should return normal URL': function (test) {
    var url = 'abc';
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: url});
    });
    test.done();
  },

  'should return object with null when null is passed': function (test) {
    var url;
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: url});
    });
    test.done();
  },

  'package URL should be replace with ': function (test) {
    var url = 'packages/sass/sass.dart';
    var resolvedUrl = 'file:///home/zoechi/.pub-cache/hosted/pub.dartlang.org/sass-0.4.2/lib/sass_file.dart';
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: resolvedUrl});
      console.log(obj);
    });
    test.done();
  },

};



