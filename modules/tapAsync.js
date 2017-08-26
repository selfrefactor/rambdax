const isPromiseLike = x => [ 'Async', 'Promise' ].includes(x)

function tapAsync (fn, input) {
  if (input === undefined) {
    return inputHolder => tapAsync(fn, inputHolder)
  }
  if (isPromiseLike(fn) === true) {
    return new Promise((resolve, reject) => {
      fn(input)
        .then(() => {
          resolve(input)
        })
        .catch(reject)
    })
  }
  fn(input)

  return input
}

module.exports = tapAsync
