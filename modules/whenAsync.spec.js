const R = require('../rambdax')

test('', async () => {
  const fn = await R.whenAsync(
    async x => {
      await R.delay(x*100)
      return x > 2
    },
    async x => {
      await R.delay(x*100)
      return x * 2      
    }
  )

  expect(
    await fn(1)
  ).toEqual(1)
  expect(
    await fn(5)
  ).toEqual(10)
})

test('use boolean', async () => {
  const some = 5
  const fn = await R.whenAsync(
    some === 5,
    async x => {
      await R.delay(x*100)
      return x * 2      
    }
  )

  expect(
    await fn(5)
  ).toEqual(10)
})

