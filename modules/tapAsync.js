import isPromiseLike from './isPromiseLike'

export default function tapAsync (fn, input) {
  if (arguments.length === 1) {
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
