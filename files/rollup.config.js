import babel from 'rollup-plugin-babel'

export default {
  input    : './rambdax.js',
  plugins  : [ babel() ],
  output   : [
    {
      sourcemap: true,
      file   : './dist/rambdax.js',
      format : 'cjs',
    },
    {
      sourcemap: true,
      file   : './dist/rambdax.esm.js',
      format : 'es',
    },
  ],
}
