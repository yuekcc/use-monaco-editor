import { build } from 'esbuild';

await build({
  entryPoints: [
    { in: 'src/use-monaco-editor.js', out: 'use-monaco-editor' },
    { in: 'src/monaco-editor.worker.js', out: 'monaco-editor.worker' },
  ],
  bundle: true,
  minify: true,
  outdir: 'dist',
  target: 'chrome100',
  format: 'esm',
  loader: {
    '.ttf': 'file',
  },
});

console.log('build done.');
