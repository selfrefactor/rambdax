import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  external  : false,
  input     : './rambdax.js',
  treeshake : false,
  plugins   : [
    resolve(),
    babel(),
  ],
  output : [
    {
      file   : './dist/rambdax.umd.js',
      format : 'umd',
      sourcemap: true,
      name   : 'R',
    },
  ],
}
