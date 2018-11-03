import { range } from './rambda/range'
import { length } from './rambda/length'
import { last } from './rambda/last'
import { split } from './rambda/split'
import { compose } from './rambda/compose'

export function rangeBy(startNum, endNum, distance) {
  const isInteger = !distance.toString().includes('.')
  if (startNum > endNum) {
    const startNumHolder = startNum
    startNum = endNum
    endNum = startNumHolder
  }
  const willReturn = [startNum]
  let valueToPush = startNum

  if (isInteger) {
    const loopIndexes = range(
      0,
      Math.floor((endNum - startNum) / distance)
    )
    loopIndexes.forEach(()=>{
      valueToPush += distance
      willReturn.push(valueToPush)
    })
  } else {
    const decimalLength = compose(
      length,
      last,
      split('.')
    )(distance.toString())
    const loopIndexes = range(
      0,
      Math.floor((endNum - startNum) / distance)
    )
    loopIndexes.forEach(()=>{
      valueToPush += distance
      willReturn.push(Number(valueToPush.toFixed(decimalLength)))
    })
  }

  return willReturn
}
