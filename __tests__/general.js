const R = require('../rambdax')

test('isNil', () => {
  expect(
    R.isNil(null)
  ).toBeTruthy()

  expect(
    R.isNil(undefined)
  ).toBeTruthy()

  expect(
    R.nox(R.isNil)(null)
  ).toBeFalsy()

  expect(
    R.nox(R.isNil(undefined))
  ).toBeFalsy()

  expect(
    R.nox(R.isNil([]))
  ).toBeTruthy()

  expect(
    R.isNil([])
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
