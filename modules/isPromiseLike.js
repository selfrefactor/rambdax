const { type } = require('rambda')

export default function isPromiseLike (x) {
  return [ 'Async', 'Promise' ].includes(type(x))
}
