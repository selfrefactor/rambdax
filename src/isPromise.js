import { type } from 'rambda'

export function isPromise(x) {
  return [ 'Async', 'Promise' ].includes(type(x))
}
