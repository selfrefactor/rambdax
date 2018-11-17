import { any } from './rambda/any'
import { type } from './rambda/type'
import { equals } from './rambda/equals'

function expensiveIncludes(target, source){
  return any(
    singleSource => equals(target, singleSource),
    source
  )
}

export function includesAny (targets,source){ 
  if(arguments.length === 1){
    return sourceHolder => includesAny(targets, sourceHolder)
  }
  const sourceType = type(source)

  if(['Array','String'].includes(sourceType) === false){
    return false
  }

  if(sourceType === 'String'){
    return any(
      x => source.includes(x),
      targets
    )
  }
  
  return any(
    x => expensiveIncludes(x, source),
    targets
  )
}