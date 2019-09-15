import { range } from './rambda/range'
import { head } from './rambda/head'
import { shuffle } from './shuffle'

const charCodes = [
  ...range(49, 57),
  ...range(65, 90),
  ...range(97, 122),
]

export function uuid(length = 8){
  const loops = range(0, length)

  return loops.map(
    x => String.fromCharCode(head(shuffle(charCodes)))
  ).join('')
}
