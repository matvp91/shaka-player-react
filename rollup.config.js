import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import fs from 'fs';

const plugins = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  resolve(),
  commonjs(),
  copy({
    targets: [
      {
        src: 'node_modules/shaka-player/dist/controls.css',
        dest: 'dist'
      }
    ]
  })
];

const builds = [];

const lib = {
  input: 'src/index.js',
  output: {
    file: 'dist/cjs.js',
    format: 'cjs',
    exports: 'default'
  },
  external: ['react'],
  plugins
};
builds.push(lib);

if (process.env.DEV) {
  const devtool = {
    input: 'example/index.js',
    output: {
      file: 'dist/example.js',
      format: 'umd'
    },
    plugins: [
      ...plugins,
      serve({
        open: true,
        contentBase: 'dist'
      }),
      html({
        dest: 'dist',
        filename: 'index.html',
        template: () => fs.readFileSync('./example/template.html'),
        ignore: /cjs\.js/
      }),
      alias({
        entries: [
          {
            find: 'shaka-player-react',
            replacement: 'src/index.js'
          }
        ]
      })
    ]
  };
  builds.push(devtool);
}

export default builds;
