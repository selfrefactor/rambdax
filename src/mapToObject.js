import { mergeAll } from './mergeAll'
import { map } from './rambda/map'
import { ok } from './ok'
import { type } from './rambda/type'

export function mapToObject (fn,list){
  if(arguments.length === 1){
    return listHolder => mapToObject(fn, listHolder)
  }
  ok(type(fn), type(list))('Function', 'Array')
  
  return mergeAll(map(fn,list))
 }