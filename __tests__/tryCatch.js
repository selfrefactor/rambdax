const R = require('../rambdax')

test('Async', async () => {
  const fn = async() => {
    await R.delay(100)
    return JSON.parse('{a;')
  }

  const result = await R.tryCatch(fn)
  expect(
    R.is(Error, result)
  ).toBeTruthy()
})

test('Async with no error', async () => {
  const fn = async() => {
    await R.delay(100)
    return 1
  }
  
  const result = await R.tryCatch(fn)
  expect(
    R.is(Error, result)
  ).toBeFalsy()

  expect(result).toBe(1)
})

test('Sync', () => {
  const fn = () => {
    return JSON.parse('{a;')
  }

  const result = R.tryCatch(fn)
  expect(
    R.is(Error, result)
  ).toBeTruthy()
})

test('Sync with no error', () => {
  const fn = () => {
    return 1
  }

  const result = R.tryCatch(fn)
  expect(
    R.is(Error, result)
  ).toBeFalsy()

  expect(result).toBe(1)
})


