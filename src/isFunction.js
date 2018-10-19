import { type } from 'rambda'

// NODOCS
export function isFunction (fn){
  return [
    'Async',
    'Promise',
    'Function'
  ].includes(type(fn)) 
 }