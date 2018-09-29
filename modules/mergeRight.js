import { merge } from 'rambda'

export default function mergeRight (x,y) {
  return merge(y, x)
}
