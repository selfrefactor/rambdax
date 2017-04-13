const R = require("rambda")
const log = require("log-fn");


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
const argb = {
  firstFn: a => a>2,
  secondFn: a => a>1,
  input: 0
}
const argc = [1,2,3]
const arg = setDefaultBy
//const arg = {a:1,b:2,c:3}
function allPass(conditionArr,obj){
  return !R.any(condition => !condition(obj))(conditionArr)
}

function both(firstFn,secondFn,input){
  log("sep")
  console.log(firstFn,secondFn,input)
  log("sep")
  return firstFn(input) === true && secondFn(input) === true
}

function curry(fnToCurry){
  return (...curryArguments)=>{
    console.log(curryArguments,2)
    const argumentsDiff = fnToCurry.length - curryArguments.length
    if(argumentsDiff <= 0){
      console.log(0)
      return fnToCurry(...curryArguments)
    }else if(argumentsDiff === 1){
      console.log(1,curryArguments)
      return holder => fnToCurry(...curryArguments,holder)
    }else{
      console.log(2,curryArguments)
      return aHolder => bHolder => fnToCurry(...curryArguments,aHolder, bHolder)
    }
  }
}

function curr(fnToCurry){
  console.log(0,fnToCurry)
  return (...curryArguments)=>{
    console.log(1,curryArguments)
    return 1
  }
}


log(":","box")
const conditionA = x => x>0 
const conditionB = x => x>1 

let c = (a,b) => a+b
let d = curry(both)

const a = () => {
  
  return d(conditionA)(conditionB)(1)
}


function pluck(keyToPluck,arr){
  
}
// 
//R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]

// TODO benchmark between the static export vs Object.keys(...)
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
