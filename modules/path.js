const R = require("rambda")

function path(pathArr, obj) {
  if (obj === undefined) {
    return holder => path(pathArr, holder)
  }
  if(
    R.type(pathArr)==="String" &&
    pathArr.includes(".")
    ){
    pathArr = R.split(".",pathArr)
  }    
  return R.path(pathArr,obj)
}

module.exports = path