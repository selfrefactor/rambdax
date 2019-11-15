import { range } from './rambda/range'
import { head } from './rambda/head'
import { shuffle } from './shuffle'

const charCodesString = [ ...range(65, 90), ...range(97, 122) ]
const charCodes = [ ...charCodesString, ...range(49, 57) ]

export function uuid(length = 8, stringTag = false){
  const loops = range(0, length)
  const charSet = stringTag ? charCodesString : charCodes

  return loops
    .map(x => String.fromCharCode(head(shuffle(charSet))))
    .join('')
}
