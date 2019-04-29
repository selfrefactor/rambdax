import { type } from './rambda/type'

export function isPromise(x){
  return [ 'Async', 'Promise' ].includes(type(x))
}
