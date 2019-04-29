import { type } from './rambda/type'

export function anyType(targetType){
  return (...inputs) => {
    let counter = 0

    while (counter < inputs.length){
      if (type(inputs[ counter ]) === targetType){
        return true
      }
      counter++
    }

    return false
  }
}
