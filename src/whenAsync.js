function createThenable(x) {
  return async function(input) {
    return x(input)
  }
}

export function whenAsync(condition, whenTrueFn) {
  if (arguments.length === 1) {
    return whenTrueFnHolder =>
      whenAsync(condition, whenTrueFnHolder)
  }

  return input =>
    new Promise((resolve, reject) => {
      const whenTrueFnPromise = createThenable(whenTrueFn)

      if (typeof condition === 'boolean') {
        if (condition === false) {
          return resolve(input)
        }

        whenTrueFnPromise(input)
          .then(resolve)
          .catch(reject)
      } else {
        const conditionPromise = createThenable(condition)

        conditionPromise(input)
          .then(conditionResult => {
            if (conditionResult === false) {
              return resolve(input)
            }

            whenTrueFnPromise(input)
              .then(resolve)
              .catch(reject)
          })
          .catch(reject)
      }
    })
}