const R = require("rambda")
const log = require("log-fn")

function pluck(keyToPluck,arr){
  if(arr === undefined){
    return arrHolder => pluck(keyToPluck, arrHolder)
  }
  const willReturn = []
  R.map(
    val =>{
      if(!(val[keyToPluck]===undefined)){
        willReturn.push(val[keyToPluck])
      }
    },
    arr
  )
  return willReturn
}
