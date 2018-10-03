import { ifElseAsync } from './ifElseAsync'
import { type, T, F } from 'rambda';
import { delay } from './delay';

test('', async () => {
  const result = await ifElseAsync(
    async x => type(await delay(x * 80)) === 'String',
    async x => {
      await delay(x * 60)

      return true
    },
    async x => {
      await delay(x * 60)

      return false
    },
  )(7)

  expect(result).toEqual(true)
})

test('works with regular functions', async () => {
  const result = await ifElseAsync(
    async x => type(await delay(x * 80)) === 'String',
    T,
    F
  )(7)

  expect(result).toEqual(true)
})
