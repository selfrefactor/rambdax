import babel from 'rollup-plugin-babel'

export default {
  input     : 'source.js',
  sourcemap : false,
  // external: [ 'rambda' ],
  plugins   : [ babel() ],
  output    : [
    {
      file   : 'a.js',
      format : 'cjs',
    }
  ],
  // legacy: false,
  // treeshake: true,
  // externalHelpers: false,
}
