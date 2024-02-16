#!/bin/env bash

pnpm esbuild --outfile=dist/use-monaco-editor.js --bundle --minify --format=esm --platform=browser --loader:.ttf=file src/use-monaco-editor.js
pnpm esbuild --outfile=dist/monaco-editor.worker.js --bundle --minify --format=esm --platform=browser --loader:.ttf=file src/monaco-editor.worker.js
