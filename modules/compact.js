const R = require("rambda")

const types = [
  "Null",
  "Undefined",
  "RegExp",
  "Function",
  "Async"
]

function compact(arr){
  return R.filter(
    
  a => {
    const currentType = R.type(a)
    if(types.includes(currentType)){
      return false
    }
    if(currentType === "Object"){
      return !R.equals(a,{})
    }
    return a.length !== 0
  },  
  arr)
}

module.exports = compact