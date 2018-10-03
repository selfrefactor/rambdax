import { merge } from 'rambda'

export function mergeRight (x,y) {
  return merge(y, x)
}
