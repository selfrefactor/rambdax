const R = require('rambda')
const cache = {}

const normalizeObject = obj => {
  const sortFn = (a,b) => a > b
  const willReturn = {}
  R.compose(
    R.map(prop => willReturn[prop] = obj[prop]),
    R.sort(sortFn)
  )(Object.keys(obj))
  return willReturn
}

const stringify = a => {
  if(R.type(a)==="String"){
    return a
  }else if(["Function","Async"].includes(R.type(a))){
    const compacted = R.replace(/\s{1,}/g," ",a.toString())
    return R.replace(/\s/g,"_",R.take(15,compacted))
  }else if(R.type(a) === "Object"){
    a = normalizeObject(a)
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
