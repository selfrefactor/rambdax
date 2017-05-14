const R = require('rambda') 
const cache = {}

function memoize (fn, inputArguments) {
  if (inputArguments === undefined) {
    return inputArgumentsHolder => memoize(fn, inputArgumentsHolder)
  }
  const prop = `${ JSON.stringify(inputArguments) }${ R.take(20, fn.toString()) }`
  if (prop in cache) {
    return cache[ prop ]
  }
  if (R.type(fn) === "Async") {
    return new Promise(resolve => {
      fn(inputArguments).then(result => {
        cache[ prop ] = result
        resolve(result)
      })
    })
  }
  const result = fn(inputArguments)
  cache[ prop ] = result

  return result
}

module.exports = memoize
