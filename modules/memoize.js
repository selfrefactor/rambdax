const R = require('rambda') 
const cache = {}

const stringify = a => {
  if(R.type(a)==="String"){
    return a
  }
  let willReturn = ""
  if(R.type(a)==="Array"){
    R.take(3,a).map(val=>{
      willReturn += `${stringify(val)}_`
    })
    return R.init(willReturn)
  }else if(R.type(a)==="Object"){
    let counter = 0
    for(const prop in a){
      if(counter<3){
        willReturn += `${prop}_${stringify(a[prop])}_`
        counter++
      }
    }
    return R.init(willReturn)
  }else if(["Function","Async"].includes(R.type(a))){
    const compacted = R.replace(/\s{1,}/g," ",a.toString())
    return R.replace(/\s/g,"_",R.take(15,compacted))
  }
  return `${a}`
}

const generateProp = (fn, ...inputArguments) => {
  let propString = ""
  inputArguments.map(inputArgument => {
    propString += `${stringify(inputArgument)}_`
  })
  return `${propString}${stringify(fn)}`
}


function memoize (fn, ...inputArguments) {
  if(arguments.length === 1){
    return (...inputArgumentsHolder) => memoize(fn, ...inputArgumentsHolder) 
  }
  const prop = generateProp(fn, ...inputArguments)
  if (prop in cache) {
    return cache[ prop ]
  }
  if (R.type(fn) === "Async") {
    return new Promise(resolve => {
      fn(...inputArguments).then(result => {
        cache[ prop ] = result
        resolve(result)
      })
    })
  }
  const result = fn(...inputArguments)
  cache[ prop ] = result

  return result
}

module.exports = memoize
