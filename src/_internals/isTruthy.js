import { type } from '../rambda/type.js'

export function isTruthy(x){
  console.log(x, 7)
  if (Array.isArray(x)){
    return x.length > 0
  }
  if (type(x) === 'Object'){

    return Object.keys(x).length > 0
  }

  return Boolean(x)
}
