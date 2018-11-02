import { whenAsync } from './whenAsync'
import { delay } from './delay'

test('', async () => {
  const fn = await whenAsync(
    async x => {
      await delay(x * 100)

      return x > 2
    },
    async x => {
      await delay(x * 100)

      return x * 2
    }
  )

  expect(await fn(1)).toEqual(1)
  expect(await fn(5)).toEqual(10)
})

test('use boolean', async () => {
  const some = 5
  const fn = await whenAsync(some === 5, async x => {
    await delay(x * 100)

    return x * 2
  })

  expect(await fn(5)).toEqual(10)
})
