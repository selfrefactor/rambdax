import { any } from './rambda/any'
import { type } from './rambda/type'

export function includesType(targetType, list){
  if (arguments.length === 1){
    return listHolder => includesType(targetType, listHolder)
  }

  return any(x => type(x) === targetType, list)
}
