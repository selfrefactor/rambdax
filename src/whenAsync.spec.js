import { whenAsync } from './whenAsync'
import { delay } from './delay'

const firstFn = async x => {
  await delay(x * 100)

  return x > 2
}
const secondFn = async x => {
  await delay(x * 100)

  return x * 2
}

test('happy', async () => {
  const fn = await whenAsync(firstFn, secondFn)

  expect(await fn(1)).toEqual(1)
  expect(await fn(5)).toEqual(10)
})

test('curry', async () => {
  const fn = await whenAsync(firstFn)(secondFn)

  expect(await fn(1)).toEqual(1)
  expect(await fn(5)).toEqual(10)
})

test('use boolean - true', async () => {
  const some = 5
  const fn = await whenAsync(some === 5, async x => {
    await delay(x * 100)

    return x * 2
  })

  expect(await fn(5)).toEqual(10)
})

test('use boolean - false', async () => {
  const some = 5
  const fn = await whenAsync(some > 5, async x => {
    await delay(x * 100)

    return x * 2
  })

  expect(await fn(5)).toEqual(5)
})
