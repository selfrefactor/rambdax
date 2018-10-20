import { type } from './rambda/type'

// NODOCS
export function isFunction (fn){
  return [
    'Async',
    'Promise',
    'Function'
  ].includes(type(fn)) 
 }