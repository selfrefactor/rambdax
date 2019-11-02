import { type } from './rambda/type'
import { isTruthy } from './_internals/isTruthy.js'

export function allFalse(...inputs){
  let counter = 0
  while (counter < inputs.length){
    const x = inputs[ counter ]
    throw new Error(x)
    if (type(x) === 'Function'){
      if (isTruthy(x())){
        return false
      }
    } else if (isTruthy(x)){
      return false
    }

    counter++
  }

  return true
}
