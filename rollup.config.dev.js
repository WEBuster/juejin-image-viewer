import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/juejin-image-viewer.js',
  output: {
    format: 'umd',
    name: 'JuejinImageViewer',
    file: 'dev/juejin-image-viewer.js'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
