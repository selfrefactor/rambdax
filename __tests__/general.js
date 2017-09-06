const R = require('../rambdax')

test('', () => {
  expect(
    R.complement(R.isNil)(null)
  ).toBeFalsy()
})

test('isPromiseLike', () => {
  expect(
    R.isPromiseLike(
      () => {}
    )
  ).toBeFalsy()

  expect(
    R.isPromiseLike(
      async () => {}
    )
  ).toBeTruthy()

  const delay = ms => new Promise(resolve => {
    setTimeout(() => {
      resolve(ms + 110)
    }, ms)
  })

  expect(
    R.isPromiseLike(
      delay(10)
    )
  ).toBeTruthy()
})

test('isType', () => {
  expect(R.isType('String', 'foo')).toBeTruthy()
  expect(R.isType('Array', 'foo')).toBeFalsy()
})
