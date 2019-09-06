import { equals } from './rambda/equals'

export function contains(val, list){
  if (arguments.length === 1) return _list => contains(val, _list)

  let index = -1

  while (++index < list.length){
    if (equals(list[ index ], val)){
      return true
    }
  }

  return false
}
