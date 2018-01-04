import { map, merge } from 'rambda'

export default function mergeAll (arr) {
  let willReturn = {}
  map(val => {
    willReturn = merge(willReturn, val)
  }, arr)

  return willReturn
}
