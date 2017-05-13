const R = require("rambda")

exports.curry = require("./modules/curry")
exports.renameProps = require("./modules/renameProps")
exports.produce = require("./modules/produce")
exports.mergeAll = require("./modules/mergeAll")
exports.memoize = require("./modules/memoize")
exports.pickBy = require("./modules/pickBy")
exports.once = require("./modules/once")
exports.rangeBy = require("./modules/rangeBy")
exports.flip = require("./modules/flip")

function intersection(a,b){
  if(b === undefined){
    return bHolder => intersection(a,bHolder)
  }
  return R.filter(val=>b.includes(val))(a)
}

function tap(fn,inputArguments){
  if(inputArguments === undefined){
    return inputArgumentsHolder => tap(fn,inputArgumentsHolder)
  }
  fn(inputArguments)
  
  return inputArguments
}

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

function defaultTo({defaultArgument, inputArgument}){
  if(inputArgument === undefined){}
  return inputArgument === undefined || !(R.type(inputArgument)===R.type(defaultArgument)) ?
  defaultArgument :
  inputArgument
}

function all(condition, arr){
  return R.filter(condition,arr).length === arr.length
}

function allPass(conditionArr,obj){
  return !R.any(condition => !condition(obj))(conditionArr)
}

exports.all = all
exports.allPass = allPass
exports.defaultTo = defaultTo
exports.pluck = pluck
exports.omitBy = omitBy
exports.tap = tap
exports.intersection = intersection
exports.where  = where

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
