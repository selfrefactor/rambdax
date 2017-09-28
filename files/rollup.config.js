import babel from 'rollup-plugin-babel'
import pkg from '../package.json'

export default {
  input     : './rambdax.js',
  sourcemap : true,
  external: [ 'rambda' ],
  plugins   : [ babel() ],
  output    : [
    {
      file   : pkg.main,
      format : 'cjs',
    },
    {
      file   : pkg.module,
      format : 'es',
    }
  ],
}
