// https://github.com/sass/node-sass/blob/03aa20e744707e74ffea15d93669b69d9e6c8e33/README.md#importer--v200---experimental
// examples https://github.com/sass/node-sass/tree/974f93e76ddd08ea850e3e663cfe64bb6a059dd3/test/fixtures/extras

var path = require('path');
var fs = require('fs');
// var sass = require('node-sass');

// Start at the current working directory and search upwards for a `.packages`
// file.
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

  // Resolve the path using the `.packages` file, if found.
  var resolvePackagePath = function (importPath) {
    var packagesFilePath = findPackagesFile(process.cwd());
    if (packagesFilePath) {
      // load `.packages` file content
      var content = fs.readFileSync(packagesFilePath, {encoding: 'UTF8'});
      if (content) {
        // get package name from import path
        var packageName = /(?:packages\/)([^\/]*)/g.exec(importPath)[1];
        // find line with matching package name in `.packages` file
        content = content.split('\n');
        var packageConfig = content.find(function (el) {
          return el.startsWith(packageName + ':');
        });
        if(packageConfig) {
          var resolvedFilePath = packageConfig.substring(packageName.length + 1);
          // create the new resolved path
          return path.join(resolvedFilePath, importPath.substr(('packages/' + packageName).length));
        }
      }
    }
    // not found
  };

  // Start at the current working directory and search upwards for a `.packages`
  // file.
  var findThemeOverrideFile = function (startDir) {
    var directories = fs.readdirSync(startDir);
    var overrideFile = directories[directories.indexOf('sass_theme_override.cfg')];
    if (overrideFile) {
      return path.join(startDir, overrideFile);
    }
    var parentDir = path.resolve(startDir, '..');
    if (parentDir && parentDir !== startDir) {
      return findThemeOverrideFile(parentDir);
    }
    // not found
  };

  // Check if an `sass_theme_override.cfg` exists and if it contains an override
  // for the requested import.
  var resolveOverride = function(importPath) {
    var themeOverrideFilePath = findThemeOverrideFile(process.cwd());
    var importParts = /(?:::)(.*)(?::)(.*)(?::)(.*)(?:::)(.*)/g.exec(importPath);
    if(themeOverrideFilePath && importParts) {
      // load `sass_theme_override.cfg` file content
      var content = fs.readFileSync(themeOverrideFilePath, {encoding: 'UTF8'});
      if (content) {
        // get override IDs from import path
        // find override line with matching IDs
        content = content.split('\n');
        var overrideConfig = content.find(function (el) {
          return el.startsWith(importParts[1] + ':' +  importParts[2] + ':' + importParts[3] + ' ');
        });
        if(overrideConfig) {
          var newPathMatches = /(?:.*)(?::)(?:.*)(?::)(?:.*)\ (.*)/g.exec(overrideConfig);
          return newPathMatches[1];
        }
      }
      return importParts[4];
    }
    // return default import path
    return importPath;
  };

  if (url) {
    if(url.startsWith('::')) {
      var resolvedRewrite = resolveOverride(url);
      if(resolvedRewrite) {
        url = resolvedRewrite;
      }
    }
    if (url.startsWith('packages/')) {
      var resolvedPackagePath = resolvePackagePath(url);
      if (resolvedPackagePath) {
        done({
          file: resolvedPackagePath
        });
        return
      }
    }
  }

  done({file: url});
};
