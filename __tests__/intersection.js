const R = require('../rambdax')

test('', () => {
  expect(
    R.intersection([ 1, 3, 5 ], [ 2, 3, 5 ])
  ).toEqual([ 3, 5 ])
})