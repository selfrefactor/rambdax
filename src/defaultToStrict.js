import {type} from './rambda/type'
import {equals} from './rambda/equals'

function flagIs(targetType, input){
  if(!Boolean(input)) return false
  if(type(input) !== targetType) return false

  if(targetType === 'Array') return !equals([], input)
  if(targetType === 'Object') return !equals({}, input)

  return true
}

export function defaultToStrict(defaultArgument, ...inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder =>
      defaultToStrict(defaultArgument, inputArgumentHolder)
  }
  if(arguments.length === 2){
    return flagIs(type(defaultArgument), inputArgument[0]) ?
      inputArgument[0] :
      defaultArgument
  }

  const targetType = type(defaultArgument)
  const limit = inputArgument.length - 1
  let len = limit + 1
  let ready = false
  let holder

  while(!ready){
    const instance = inputArgument[limit - len  + 1]

    if(len === 0){
      ready = true
    }else if(flagIs(targetType, instance)){
      holder = instance
      ready = true
    }else{
      len = len - 1
    }
  }

  return holder === undefined ?
    defaultArgument :
    holder
}
