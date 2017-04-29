const R = require("rambda")

function helper({condition,inputArgument,prop}){
  return new Promise((resolve,reject) =>{
      if(!(R.type(condition)==="Async")){
        resolve({
          type:prop,
          payload: condition(inputArgument)
        })
        
      }
      
      condition(inputArgument)
      .then(result =>{
        resolve({
          type:prop,
          payload: result
        })
      })
      .catch(err=> reject(err))
    })
}    

function produce(conditions,inputArgument){
  if(inputArgument === undefined){
    return inputArgumentHolder => produce(conditions,inputArgumentHolder)
  }
    
  if(R.type(conditions)==="Array"){
      const willReturn = []
      for(const condition of conditions){
        willReturn.push(condition(inputArgument))
      }
      return willReturn
  }

  let asyncConditionsFlag = false
  for(const prop in conditions){
    if(R.type(conditions[prop])==="Async"){
      asyncConditionsFlag = true
    }
  }
  
  if(asyncConditionsFlag === false){
    const willReturn = {}
    for(const prop in conditions){
      willReturn[prop] = conditions[prop](inputArgument)
    }
    
    return willReturn  
  }
  const promised = []
  for(const prop in conditions){
    const condition = conditions[prop]
    promised.push(helper({inputArgument, condition,prop}))
  }
  
  return new Promise((resolve,reject)=>{
    Promise.all(promised)
    .then(results =>{
      
      const willReturn = {}
      
      R.map(result => {
        willReturn[result.type] = result.payload  
      }, results)
      
      resolve(willReturn)
    })
    .catch(err=> reject(err))
  })
}

exports.produce = produce

function mergeAll(arr){
  let willReturn = {}
  R.map(val =>{
    willReturn = R.merge(willReturn,val)
  }, arr)
  return willReturn
}

exports.mergeAll = mergeAll

function intersection(a,b){
  if(b === undefined){
    return bHolder => intersection(a,bHolder)
  }
  return R.filter(val=>b.includes(val))(a)
}

exports.intersection = intersection

const cache = {}

function memoize(fn,inputArguments){
  if(inputArguments === undefined){
    return inputArgumentsHolder => memoize(fn,inputArgumentsHolder)
  }
  const prop = `${JSON.stringify(inputArguments)}${R.take(20,fn.toString())}`
  if(prop in cache){
    return cache[prop]
  }
  if(R.type(fn)==="Async"){
    return new Promise(resolve =>{
      fn(inputArguments).then(result=>{
        cache[prop] = result
        resolve(result)
      })
    })
  }
  const result = fn(inputArguments)
  cache[prop] = result
  return result
}

exports.memoize = memoize

var myMemoizeFunc = function (passedFunc) {
    var cache = {};
    return function (x) {
        if (x in cache) return cache[x];
        return cache[x] = passedFunc(x);
    };
}

function once(fn,inputArguments){
  let result
  if(inputArguments === undefined){
      return inputArgumentsHolder => {
        if(result === undefined){
          result = fn(inputArgumentsHolder)  
        }
        
        
        return result
      }
  }
  
  return result
}

exports.once = once

function tap(fn,inputArguments){
  if(inputArguments === undefined){
    return inputArgumentsHolder => tap(fn,inputArgumentsHolder)
  }
  fn(inputArguments)
  
  return inputArguments
}

exports.tap = tap

function where(conditions, obj){
  if(obj === undefined){
    return objHolder => where(conditions,objHolder)
  }
  let flag = true
  for(const prop in conditions){
    const result = conditions[prop](obj[prop])
    if(flag&&result===false){
      flag = false
    }
  }
  return flag
}

exports.where = where

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
exports.pluck = pluck

function rangeBy(startNum, endNum, distance){
  if (endNum === undefined) {
    return (endNumHolder, distanceHolder) => rangeBy(startNum, endNumHolder, distanceHolder)
  } else if (distance === undefined) {
    return distanceHolder => rangeBy(startNum, endNum, distanceHolder)
  }

  const isInteger = !distance.toString().includes(".")
  if(startNum>endNum){
    const startNumHolder = startNum
    startNum = endNum
    endNum = startNumHolder
    l(startNum, endNum)
  }
  const willReturn = [startNum]
  let valueToPush = startNum

  if(isInteger){
    const loopIndexes = R.range(0,Math.floor((endNum-startNum)/distance))
    for(const i of loopIndexes){
      valueToPush += distance
      willReturn.push(valueToPush)
    }
  }else{
    const decimalLength = R.compose(
      R.length,
      R.last,
      R.split(".")
    )(distance.toString())
    const loopIndexes = R.range(0,Math.floor((endNum-startNum)/distance))
    for(const i of loopIndexes){
      valueToPush = valueToPush+distance
      willReturn.push(Number(valueToPush.toFixed(decimalLength)))
    }
  }

  return willReturn
}

function omitBy(fn, obj){
  if (obj === undefined) {
    return holder => omitBy(fn, holder)
  }

  const willReturn = {}
  for (prop in obj) {
    if (!fn(obj[prop],prop)) {
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

function pickBy(fn, obj){
  if (obj === undefined) {
    return holder => pickBy(fn, holder)
  }

  const willReturn = {}
  for (prop in obj) {
    if (fn(obj[prop],prop)) {
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

function randomIndex(arr){
  return arr[ Math.floor(arr.length * Math.random()) ]
}

function typeEquals(a,b){
  if(b === undefined){
    return bHolder => typeEquals(a, bHolder)
  }

  return R.type(a) === R.type(b)
}

function setDefault(inputArgument, defaultArgument){
  return inputArgument === undefined || !(R.type(inputArgument)===R.type(defaultArgument)) ?
  defaultArgument :
  inputArgument
}

function setDefaultBy(inputArgument, defaultArgument, conditionFn){
  return conditionFn(inputArgument) === true ?
    inputArgument :
    defaultArgument
}

function all(condition, arr){
  return R.filter(condition,arr).length === arr.length
}

function allPass(conditionArr,obj){
  return !R.any(condition => !condition(obj))(conditionArr)
}

exports.all = all
exports.allPass = allPass
exports.setDefault = setDefault
exports.typeEquals = typeEquals
exports.omitBy = omitBy
exports.pickBy = pickBy
exports.rangeBy = rangeBy
exports.randomIndex = randomIndex
exports.add = R.add
exports.adjust = R.adjust
exports.any = R.any
exports.append = R.append
exports.compose = R.compose
exports.contains = R.contains
exports.drop = R.drop
exports.dropLast = R.dropLast
exports.equals = R.equals
exports.filter = R.filter
exports.find = R.find
exports.findIndex = R.findIndex
exports.flatten = R.flatten
exports.head = R.head
exports.indexOf = R.indexOf
exports.init = R.init
exports.join = R.join
exports.last = R.last
exports.length = R.length
exports.map = R.map
exports.match = R.match
exports.merge = R.merge
exports.omit = R.omit
exports.path = R.path
exports.pick = R.pick
exports.prepend = R.prepend
exports.prop = R.prop
exports.propEq = R.propEq
exports.range = R.range
exports.repeat = R.repeat
exports.replace = R.replace
exports.sort = R.sort
exports.sortBy = R.sortBy
exports.split = R.split
exports.splitEvery = R.splitEvery
exports.subtract = R.subtract
exports.tail = R.tail
exports.take = R.take
exports.takeLast = R.takeLast
exports.test = R.test
exports.toLower = R.toLower
exports.toUpper = R.toUpper
exports.trim = R.trim
exports.type = R.type
exports.uniq = R.uniq
exports.update = R.update
exports.values = R.values
