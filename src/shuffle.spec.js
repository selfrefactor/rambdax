import { shuffle } from './shuffle'
import { range } from './rambda/range'
import { uniq } from './rambda/uniq'

test.skip('', () => {
  const list = range(0, 7)
  const sk = range(0, 3000).map(() => shuffle(list))
  const love = uniq(sk)
  console.log(love.length)
})
