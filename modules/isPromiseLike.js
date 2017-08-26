const { type } = require('rambda')

function isPromiseLike (x) {
  return [ 'Async', 'Promise' ].includes(type(x))
}

module.exports = isPromiseLike
