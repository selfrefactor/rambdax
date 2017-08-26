const R = require('../rambdax')

const fn = (input, flag) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (flag === true) {
      return reject('REJECT')
    }
    resolve(input)
  }, 100)
})

test('wrap', async () => {
  const result = await R.wrap({
    fn   : x => x > 1,
    when : async y => {
      const z = await fn(y)

      return z !== y
    },
    defaultTo : 7,
  })(0)

  expect(result).toEqual(false)
})

test('wrap', async () => {
  const result = await R.composeAsync(
    R.wrap({
      fn        : async x => await fn(x),
      when      : x => x === 1,
      defaultTo : 2,
    }),
    R.wrap({
      fn        : R.filter(a => a > 3),
      defaultTo : 1,
      when      : x => R.length(x) === 0,
    })
  )([ 1, 2, 3 ])
  expect(result).toEqual(2)
})
