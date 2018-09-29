import {map, prop, equals} from 'rambda'
import composeAsync from './composeAsync'
import tapAsync from './tapAsync'
import mapAsync from './mapAsync'
import delay from './delay'

test('', async () => {
  const fn = input => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        type    : 'result',
        payload : input,
      })
    }, 100)
  })

  const list = [ 'foo', 'bar' ].map(a => fn(a))

  const result = await composeAsync(
    map(prop('payload')),
    async inputs => Promise.all(inputs.map(async input => fn(input))),
    map(prop('payload'))
  )(await Promise.all(list))

  expect(
    result
  ).toEqual([ 'foo', 'bar' ])
})

test('', async () => {
  const delayAsync = async ms => delay(ms)

  const delay = ms => new Promise(resolve => {
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
  expect(
    result
  ).toEqual(-749)
})

test('', async () => {
  try {
    const delayAsync = async ms => delay(ms)

    const delay = ms => new Promise((_, reject) => {
      setTimeout(() => {
        reject('error')
      }, ms)
    })
    await composeAsync(
      a => a - 1000,
      delayAsync
    )(20)
  } catch (err) {
    expect(
      err
    ).toEqual('error')
  }
})

test('', async () => {
  let sideEffect
  const result = await composeAsync(
    tapAsync(async x => {
      sideEffect = equals(x, [ 2, 4, 6 ])

      return await delay(x * 3)
    }),
    mapAsync(async x => {
      await delay(x * 100)

      return x * 2
    })
  )([ 1, 2, 3 ])

  expect(
    result
  ).toEqual([ 2, 4, 6 ])

  expect(
    sideEffect
  ).toEqual(true)
})
