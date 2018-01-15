import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  externalHelpers: false,
  input     : './rambdax.js',
  legacy: false,
  sourcemap : true,
  treeshake: true,
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output    : [
    {
      file   : './dist/rambdax.umd.js',
      format : 'umd',
      name   : 'R',
    }  
  ],
}
