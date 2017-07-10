const {filter, equals} = require("rambda")

function ignore(element, arr){
  if(arr === undefined){
    return holder => ignore(a, holder)
  }
  return filter(
    a => !equals(a,element),
    arr
  )
}

module.exports = ignore