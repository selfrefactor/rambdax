import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  externalHelpers: false,
  input     : './rambdax.js',
  legacy: true,
  sourcemap : false,
  treeshake: false,
  plugins: [
    resolve(),
    babel()
  ],
  output    : [
    {
      file   : './dist/rambdax.umd.js',
      format : 'umd',
      name   : 'R',
    }  
  ],
}
