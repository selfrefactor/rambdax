const R = require('../rambdax')

test('', () => {
  expect(
    R.greater(1)(2)
  ).toBeTruthy()
})

test('', () => {
  expect(
    R.greater(3, 2)
  ).toBeFalsy()
})
