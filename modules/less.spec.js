const R = require('../rambdax')

test('', () => {
  expect(
    R.less(1)(2)
  ).toBeFalsy()
})

test('', () => {
  expect(
    R.less(3, 2)
  ).toBeTruthy()
})
