import { memoize } from './memoize'

test('', () => {
  let counter = 0

  const fn = ({ a, b, c }) => {
    counter++

    return a + b - c
  }
  const memoized = memoize(fn)
  expect(memoized({
    a : 1,
    c : 3,
    b : 2,
  })).toBe(0)
  expect(counter).toBe(1)
  expect(memoized({
    b : 2,
    c : 3,
    a : 1,
  })).toBe(0)
  expect(counter).toBe(1)
})

test('normal function', () => {
  let counter = 0
  const fn = (a, b) => {
    counter++

    return a + b
  }
  const memoized = memoize(fn)
  expect(memoized(1, 2)).toBe(3)
  expect(memoized(1, 2)).toBe(3)
  expect(memoized(1, 2)).toBe(3)
  expect(counter).toBe(1)
  expect(memoized(2, 2)).toBe(4)
  expect(counter).toBe(2)
  expect(memoized(1, 2)).toBe(3)
  expect(counter).toBe(2)
})

test('async function', async () => {
  let counter = 0
  const delay = ms => new Promise(resolve => {
    setTimeout(resolve, ms)
  })
  const fn = async (ms, a, b) => {
    await delay(ms)
    counter++

    return a + b
  }

  const memoized = memoize(fn)
  expect(await memoized(100, 1, 2)).toBe(3)
  expect(await memoized(100, 1, 2)).toBe(3)
  expect(await memoized(100, 1, 2)).toBe(3)
  expect(counter).toBe(1)
  expect(await memoized(100, 2, 2)).toBe(4)
  expect(counter).toBe(2)
  expect(await memoized(100, 1, 2)).toBe(3)
  expect(counter).toBe(2)
})

test('s', () => {
  let count = 0
  const tester = memoize(n => {
    count++

    return n + 6
  })
  tester(5)
  tester(5)
  tester(5)

  expect(
    tester(5)
  ).toEqual(11)

  expect(
    count
  ).toEqual(1)

  tester(6)

  expect(
    tester(6)
  ).toEqual(12)

  expect(
    count
  ).toEqual(2)
})
