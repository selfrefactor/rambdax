import { map } from './rambda/map'
import { prop } from './rambda/prop'
import { equals } from './rambda/equals'
import { composeAsync } from './composeAsync'
import { tapAsync } from './tapAsync'
import { mapAsync } from './mapAsync'
import { delay as delayModule } from './delay'

test('', async () => {
  const fn = input =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          type: 'result',
          payload: input,
        })
      }, 100)
    })

  const list = ['foo', 'bar'].map(a => fn(a))

  const result = await composeAsync(
    map(prop('payload')),
    async inputs =>
      Promise.all(inputs.map(async input => fn(input))),
    map(prop('payload'))
  )(await Promise.all(list))

  expect(result).toEqual(['foo', 'bar'])
})

test('', async () => {
  const delayAsync = async ms => delay(ms)

  const delay = ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(ms + 110)
      }, ms)
    })

  const result = await composeAsync(
    a => a - 1000,
    a => a,
    async a => delayAsync(a),
    a => a + 11
  )(await delay(20))
  expect(result).toEqual(-749)
})

test('', async () => {
  try {
    const delayAsync = async ms => delay(ms)

    const delay = ms =>
      new Promise((_, reject) => {
        setTimeout(() => {
          reject('error')
        }, ms)
      })
    await composeAsync(a => a - 1000, delayAsync)(20)
  } catch (err) {
    expect(err).toEqual('error')
  }
})

test('', async () => {
  let sideEffect
  const result = await composeAsync(
    tapAsync(async x => {
      sideEffect = equals(x, [2, 4, 6])

      return await delayModule(x * 3)
    }),
    mapAsync(async x => {
      await delayModule(x * 100)

      return x * 2
    })
  )([1, 2, 3])

  expect(result).toEqual([2, 4, 6])

  expect(sideEffect).toEqual(true)
})

test('inside compose explicit `async` keyword', async () => {
  const delay = ms =>
    new Promise((res, rej) => {
      const b = ms + 7

      res(b)
    })

  const result = await composeAsync(
    a => a,
    a => a + 1000,
    async a => delay(a),
    a => a + 11
  )(20)

  expect(result).toEqual(1038)
})

test('known issue - function returning promise', async () => {
  const delay = ms =>
    new Promise((res, rej) => {
      const b = ms + 7

      res(b)
    })

  const result = await composeAsync(
    a => a,
    a => a + 1000,
    delay,
    a => a + 11
  )(20)

  expect(result).toEqual('[object Promise]1000')
})

test('throw error', async () => {
  const delay = async ms => JSON.parse('{foo')

  let flag = true
  try {
    const result = await composeAsync(
      a => a,
      a => a + 1000,
      async a => delay(a),
      a => a + 11
    )(20)
  } catch (e) {
    flag = false
  }

  expect(flag).toBe(false)
})

