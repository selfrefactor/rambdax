import { type } from 'rambda'

export default function isPromise (x) {
  return [ 'Async', 'Promise' ].includes(type(x))
}
