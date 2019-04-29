import { type } from './rambda/type'

export function isFunction(fn){
  return [ 'Async', 'Promise', 'Function' ].includes(type(fn))
}
