// https://github.com/sass/node-sass/blob/03aa20e744707e74ffea15d93669b69d9e6c8e33/README.md#importer--v200---experimental
// examples https://github.com/sass/node-sass/tree/974f93e76ddd08ea850e3e663cfe64bb6a059dd3/test/fixtures/extras

var path = require('path');
var fs = require('fs');

module.exports = function (url, file, done) {
  var findPackagesFile = function (startDir) {
    var directories = fs.readdirSync(startDir);
    var packagesFile = directories[directories.indexOf('.packages')];
    if (packagesFile) {
      return path.join(startDir, packagesFile);
    }
    var parentDir = path.resolve(startDir, '..');
    if (parentDir) {
      return findPackagesFile(parentDir);
    }
    // not found
  };
  var resolvePackagePath = function (importPath) {
    var packagesFilePath = findPackagesFile(process.cwd());
    var packageName = /(?:packages\/)([^\/]*)/g.exec(importPath)[1];
    if (packagesFilePath) {
      var content = fs.readFileSync(packagesFilePath, {encoding: 'UTF8'});
      if (content) {
        content = content.split('\n');
        var packageFilePath = content.find(function (el) {
          return el.startsWith(packageName + ':');
        });
        packageFilePath = packageFilePath.substring(packageName.length + 1);
        return path.join(packageFilePath, importPath.substr(('packages/' + packageName).length));
      }
    }
    // not found
  };

  if (url) {
    if (url.startsWith('packages/')) {
      var resolvedPackagePath = resolvePackagePath(url);
      if (resolvedPackagePath) {
        return {
          file: resolvedPackagePath
        };
      }
    }
  }

  return {file: url};
};
