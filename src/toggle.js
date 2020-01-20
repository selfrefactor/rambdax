import { take } from './rambda/take'

export function toggle(list, input){
  const clone = take(2, list)
  if (!clone.includes(input)) return input

  return input === clone[ 0 ] ? clone[ 1 ] : clone[ 0 ]
}
