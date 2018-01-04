import { merge, omit } from 'rambda'

export default function renameProps (conditions, inputObject) {
  if (inputObject === undefined) {
    return inputObjectHolder => renameProps(conditions, inputObjectHolder)
  }
  const renamed = {}
  Object.keys(conditions).map(renameConditionProp => {
    if (Object.keys(inputObject).includes(renameConditionProp)) {
      renamed[ conditions[ renameConditionProp ] ] = inputObject[ renameConditionProp ]
    }
  })

  return merge(
    renamed,
    omit(
      Object.keys(conditions),
      inputObject
    )
  )
}
