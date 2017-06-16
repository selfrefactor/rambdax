const R = require('rambda') 
const cache = {}

const stringify = a => {
  if(R.type(a)==="String"){
    return a
  }else if(["Function","Async"].includes(R.type(a))){
    const compacted = R.replace(/\s{1,}/g," ",a.toString())
    return R.replace(/\s/g,"_",R.take(15,compacted))
  }
  return JSON.stringify(a)
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
  console.log(prop)
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
