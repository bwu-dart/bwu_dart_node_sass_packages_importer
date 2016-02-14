# bwu_dart_node_sass_packages_importer
## installation

```
npm install bwu_dart_node_sass_packages_importer
```

## usage and description
Custom importer is an experimental feature of node-sass (https://github.com/sass/node-sass). You can read more about it here:
https://github.com/sass/node-sass/blob/03aa20e744707e74ffea15d93669b69d9e6c8e33/README.md#importer--v200---experimental

With this custom importer, .scss or .sass files can be imported using package 
paths even when `pub get` or `pub upgrade` was run with `--no-package-symlinks`
and no `packages` directories with symlinks are available.  
This custom importer utilizes the `.packages` file to resolve package imports like

    @import 'packages/some_package/some_dir/some_style.scss';
 
