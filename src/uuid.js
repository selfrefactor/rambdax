import { range } from './rambda/range'
import { head } from './rambda/head'
import { shuffle } from './shuffle'

const charCodes = [
  ...range(49, 57),
  ...range(65, 90),
  ...range(97, 122),
]

const loops = range(0, 8)

export function uuid(){
  return loops.map(
    x => String.fromCharCode(head(shuffle(charCodes)))
  ).join('')
}
