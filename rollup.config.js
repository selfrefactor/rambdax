import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup'
import replace from '@rollup/plugin-replace'
import {nodeResolve}  from '@rollup/plugin-node-resolve'

const extensions = [ '.js' ]

export default {
  plugins : [
    replace({ preventAssignment: true, 'process.env.NODE_ENV' : JSON.stringify('production') }),
    nodeResolve({
      extensions,
      browser: false,
      preferBuiltins : true,
    }),
    cleanup(),
    babel({
      babelHelpers: 'bundled',
        extensions,
        exclude : [ 'node_modules/**' ],
    })
  ],
  input  : 'rambdax.js',
  output : [
    {
      file   : './dist/rambdax.js',
      format : 'cjs',
    },
    {
      file   : './dist/rambdax.esm.js',
      format : 'es',
    },
    {
      file   : './dist/rambdax.mjs',
      format : 'esm',
    },
  ],
}
