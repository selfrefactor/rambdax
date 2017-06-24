const R = require("rambda")


function filterObj(fn, obj){
  if(obj === undefined){
    return objHolder => filterObj(fn, objHolder)
  }
  const willReturn = {}
  for(const prop in obj){
    if(fn(obj[prop],prop)){
      willReturn[prop] = obj[prop]
    }
  }
  
  return willReturn
}

module.exports = filterObj