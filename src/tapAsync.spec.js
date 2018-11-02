import { tapAsync } from './tapAsync'
import { delay } from './delay'

test('', async () => {
  const result = await tapAsync(delay)(1)
  expect(result).toEqual(1)
})
