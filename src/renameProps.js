import { merge } from './rambda/merge'
import { omit } from './rambda/omit'

export function renameProps(conditions, inputObject){
  if (inputObject === undefined){
    return inputObjectHolder =>
      renameProps(conditions, inputObjectHolder)
  }
  const renamed = {}
  Object.keys(conditions).forEach(renameConditionProp => {
    if (Object.keys(inputObject).includes(renameConditionProp)){
      renamed[ conditions[ renameConditionProp ] ] =
        inputObject[ renameConditionProp ]
    }
  })

  return merge(renamed, omit(Object.keys(conditions), inputObject))
}
