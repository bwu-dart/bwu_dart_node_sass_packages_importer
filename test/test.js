var importer = require('../src/index.js');
var assert = require('assert');

module.exports = {

  'should return normal URL': function (test) {
    var url = 'abc';
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: url});
      test.done();
    });
  },

  'should return object with null when null is passed': function (test) {
    var url;
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: url});
      test.done();
    });
  },

  'package URL should be replace with ': function (test) {
    var url = 'packages/sass/sass.dart';
    var resolvedUrl = 'file:/home/zoechi/.pub-cache/hosted/pub.dartlang.org/sass-0.4.2/lib/sass.dart';
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: resolvedUrl});
      test.done();
    });
  },

  'should replace default path by overridden path': function (test) {
    var url = '::a:b:c::some_dir/some_style';
    var resolvedUrl = 'd';
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: resolvedUrl});
      test.done();
    });
  },

  'should return default path if no override is specified': function (test) {
    var url = '::a:a:a::some_dir/some_style';
    var resolvedUrl = 'some_dir/some_style';
    importer(url, 'file', function (obj) {
      assert.deepEqual(obj, {file: resolvedUrl});
      test.done();
    });
  },

};



