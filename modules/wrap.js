const R = require("rambda")

const isPromiseLike = x => [ "Async", "Promise" ].includes(R.type(x))

function wrap (fn, { rule, defaultTo }) {
  if (isPromiseLike(fn)) {
    return input => new Promise((resolve, reject) => {
      fn(input).then(intermediateResult => {
        if (isPromiseLike(rule)) {
          rule(input)
          .then(ruleResult => {
            const result = ruleResult === true ?
              intermediateResult :
              defaultTo

            resolve()
          })
          .catch(reject)
        } else {
          const result = rule(intermediateResult) === true ?
          intermediateResult :
          defaultTo

          resolve(result)
        }
      }).catch(reject)
    })
  }
  if (isPromiseLike(rule)) {
    return input => new Promise((resolve, reject) => {
      const intermediateResult = fn(input)

      rule(intermediateResult)
      .then(ruleResult => {
        const result = ruleResult === true ?
          intermediateResult :
          defaultTo

        resolve(result)
      })
      .catch(reject)
    })
  }

  return function (input) {
    const intermediateResult = fn(input)

    return rule(intermediateResult) === true ?
      intermediateResult :
      defaultTo
  }
}

module.exports = wrap
