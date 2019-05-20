const babel = require("rollup-plugin-babel")
const replace = require("rollup-plugin-replace")
const resolve = require("rollup-plugin-node-resolve")
const cleanup = require("rollup-plugin-cleanup")

const extensions = [".js"]

export default {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      extensions,
      preferBuiltins: true
    }),
    cleanup(),
    babel({
      extensions,
      exclude: ["node_modules/**"]
		}),
  ],
  input: "rambdax.js",
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