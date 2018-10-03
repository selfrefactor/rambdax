import { map, merge } from 'rambda'

export function mergeAll (arr) {
  let willReturn = {}
  map(val => {
    willReturn = merge(willReturn, val)
  }, arr)

  return willReturn
}
