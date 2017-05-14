const R = require("rambda")

function allPass (conditionArr, obj) {
  return !R.any(condition => !condition(obj))(conditionArr)
}

module.exports = allPass
