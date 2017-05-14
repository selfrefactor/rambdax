const R = require("rambda")

function renameProps (renameCondition, inputObject) {
  if (inputObject === undefined) {
    return inputObjectHolder => renameProps(renameCondition, inputObjectHolder)
  }
  const renamed = {}
  Object.keys(renameCondition).map(renameConditionProp => {
    if (Object.keys(inputObject).includes(renameConditionProp)) {
      renamed[ renameConditions[ renameConditionProp ] ] = inputObject[ renameConditionProp ]
    }
  })

  return R.merge(
    renamed,
    R.omit(
      Object.keys(renameCondition),
      inputObject
      )
    )
}
module.exports = renameProps
