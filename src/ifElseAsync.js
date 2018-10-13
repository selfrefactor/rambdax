function createThenable(x) {
  return async function(input) {
    return x(input)
  }
}

export function ifElseAsync(condition, ifFn, elseFn) {
  if (ifFn === undefined) {
    return (ifFnHolder, elseFnHolder) => ifElseAsync(condition, ifFnHolder, elseFnHolder)
  } else if (elseFn === undefined) {
    return elseFnHolder => ifElseAsync(condition, ifFn, elseFnHolder)
  }

  return input => new Promise((resolve, reject) => {
    const conditionPromise = createThenable(condition)
    const ifFnPromise = createThenable(ifFn)
    const elseFnPromise = createThenable(elseFn)

    conditionPromise(input)
      .then(conditionResult => {
        const promised = conditionResult === true ?
          ifFnPromise :
          elseFnPromise

        promised(input)
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}
