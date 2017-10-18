import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import license from 'rollup-plugin-license'
import manifest from './package.json'

const banner = [
  '/**',
  ` * ${manifest.name} v${manifest.version}`,
  ` * (c) ${new Date().getFullYear()} ${manifest.author}`,
  ` * @license ${manifest.license}`,
  ' */'
].join('\n')

export default {
  input: 'src/juejin-image-viewer.js',
  output: {
    format: 'umd',
    name: 'JuejinImageViewer',
    file: 'dist/juejin-image-viewer.min.js'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    license({ banner })
  ]
}
