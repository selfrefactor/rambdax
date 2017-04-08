const R = require("rambda")

function rangeBy(startNum, endNum, distance){
  if (endNum === undefined) {
    return (endNumHolder, distanceHolder) => rangeBy(startNum, endNumHolder, distanceHolder)
  } else if (distance === undefined) {
    return distanceHolder => rangeBy(startNum, endNum, distanceHolder)
  }
  
  const willReturn = [startNum]
  const isInteger = !distance.toString().includes(".")
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
    console.log(startNum.toFixed(decimalLength))
    console.log(endNum.toFixed(decimalLength))
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
// TODO benchmark between the static export vs Object.keys(...)
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