const R = require('../rambdax')

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

  const result = await R.composeAsync(
    R.map(R.prop('payload')),
    async inputs => Promise.all(inputs.map(async input => fn(input))),
    R.map(R.prop('payload'))
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

  const result = await R.composeAsync(
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
    const result = await R.composeAsync(
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
  const result = await R.composeAsync(
    R.tapAsync(async x => {
      sideEffect = R.equals(x, [ 2, 4, 6 ])

      return await R.delay(x * 3)
    }),
    R.mapAsync(async x => {
      await R.delay(x * 100)

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
