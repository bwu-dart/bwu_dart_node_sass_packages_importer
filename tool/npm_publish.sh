#!/bin/sh
docker run -it --rm -v $(pwd):/usr/src/app -v $HOME/.npmrc:/root/.npmrc -w /usr/src/app node:4 npm publish
