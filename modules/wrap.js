const R = require("rambda")

const isPromiseLike = x => [ "Async", "Promise" ].includes(R.type(x))

function wrap (fn, { when, defaultTo }) {
  if (isPromiseLike(fn)) {
    return input => new Promise((resolve, reject) => {
      fn(input).then(intermediateResult => {
        if (isPromiseLike(when)) {
          when(input)
            .then(whenResult => {
              const result = whenResult === true ?
                defaultTo :
                intermediateResult

              resolve()
            })
            .catch(reject)
        } else {
          const result = when(intermediateResult) === true ?
            defaultTo :
            intermediateResult

          resolve(result)
        }
      }).catch(reject)
    })
  }
  if (isPromiseLike(when)) {
    return input => new Promise((resolve, reject) => {
      const intermediateResult = fn(input)

      when(intermediateResult)
        .then(whenResult => {
          const result = whenResult === true ?
            defaultTo :
            intermediateResult

          resolve(result)
        })
        .catch(reject)
    })
  }

  return function (input) {
    const intermediateResult = fn(input)

    return when(intermediateResult) === true ?
      defaultTo :
      intermediateResult
  }
}

module.exports = wrap
