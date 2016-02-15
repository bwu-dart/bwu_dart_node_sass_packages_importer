# bwu_dart_node_sass_packages_importer
## Installation

```
npm install bwu_dart_node_sass_packages_importer
```

## Usage and description
Custom importer is an experimental feature of node-sass (https://github.com/sass/node-sass). You can read more about it here:
https://github.com/sass/node-sass/blob/03aa20e744707e74ffea15d93669b69d9e6c8e33/README.md#importer--v200---experimental

## Package imports
With this custom importer, .scss or .sass files can be imported using package 
paths even when `pub get` or `pub upgrade` was run with `--no-package-symlinks`
and no `packages` directories with symlinks are available.  
This custom importer utilizes the `.packages` file to resolve package imports like

    @import 'packages/some_package/some_dir/some_style.scss';
 
## Import rewrites
When a `sass_theme_override.cfg` file is found the rules defined in this file are
use to rewrite imports with an "override hook".

An import in the form of `@import '::a:b:c::somedir/somefile';` can be rewritten
by a rule in `sass_theme_override.cfg` like `a:b:c otherdir/otherfile` to make 
SASS import `otherdir/otherfile` instead of `somedir/somefile`.  
If no override rule exists, `somedir/somefile` is used. 

The intention is to set `a` to the package name, `b` to the component name, and
`c` to a hook ID within a component, but that is not mandatory.
