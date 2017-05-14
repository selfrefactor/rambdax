const R = require("rambda")

function all (condition, arr) {
  if (arr === undefined) {
    return arrHolder => all(condition, arrHolder)
  }

  return R.filter(condition, arr).length === arr.length
}

module.exports = all
