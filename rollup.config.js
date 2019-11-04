import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import html from 'rollup-plugin-bundle-html';
import alias from 'rollup-plugin-alias';
import copy from 'rollup-plugin-copy';

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  babel({
    exclude: 'node_modules/**',
  }),
  resolve(),
  commonjs(),
];

const builds = [];

const lib = {
  input: 'src/index.js',
  output: {
    file: 'dist/cjs.js',
    format: 'cjs',
  },
  external: ['react'],
  plugins,
};
builds.push(lib);

if (process.env.DEV) {
  const devtool = {
    input: 'example/index.js',
    output: {
      file: 'dist/example.js',
      format: 'umd',
    },
    plugins: [
      ...plugins,
      copy({
        targets: [
          {
            src: 'node_modules/shaka-player/dist/controls.css',
            dest: 'dist',
          },
        ],
      }),
      serve('dist'),
      html({
        dest: 'dist',
        filename: 'index.html',
        template: 'example/template.html',
        ignore: /cjs\.js/,
      }),
      alias({
        entries: [
          {
            find: 'shaka-player-react',
            replacement: 'src/index.js',
          },
        ],
      }),
    ],
  };
  builds.push(devtool);
}

export default builds;
