import { merge } from './rambda/merge'

export function mergeRight(x, y){
  return merge(y, x)
}
