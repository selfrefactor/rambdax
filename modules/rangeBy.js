const R = require("rambda")

function rangeBy (startNum, endNum, distance) {
  if (endNum === undefined) {
    return (endNumHolder, distanceHolder) => rangeBy(startNum, endNumHolder, distanceHolder)
  } else if (distance === undefined) {
    return distanceHolder => rangeBy(startNum, endNum, distanceHolder)
  }

  const isInteger = !distance.toString().includes(".")
  if (startNum > endNum) {
    const startNumHolder = startNum
    startNum = endNum
    endNum = startNumHolder
  }
  const willReturn = [ startNum ]
  let valueToPush = startNum

  if (isInteger) {
    const loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance))
    for (const i of loopIndexes) {
      valueToPush += distance
      willReturn.push(valueToPush)
    }
  } else {
    const decimalLength = R.compose(
      R.length,
      R.last,
      R.split(".")
    )(distance.toString())
    const loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance))
    for (const i of loopIndexes) {
      valueToPush += distance
      willReturn.push(Number(valueToPush.toFixed(decimalLength)))
    }
  }

  return willReturn
}

module.exports = rangeBy
