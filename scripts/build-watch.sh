#!/bin/bash

bun build \
	index.js \
	--outdir ./dist \
	--minify \
	--sourcemap linked \
	--watch \
