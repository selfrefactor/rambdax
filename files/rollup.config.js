import babel from 'rollup-plugin-babel'

export default {
  input    : './rambdax.js',
  plugins  : [ babel() ],
  output   : [
    {
      file   : './dist/rambdax.js',
      format : 'cjs',
    },
    {
      file   : './dist/rambdax.esm.js',
      format : 'es',
    },
  ],
}
