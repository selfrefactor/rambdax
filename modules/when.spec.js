const R = require('../rambdax')

test('', () => {
  const truncate = R.when(
    x => x.length > 5,
    R.compose(x => `${ x }...`, R.take(5))
  )

  expect(truncate('1234')).toEqual('1234')
  expect(truncate('12345678')).toEqual('12345...')
})

test('use boolean', () => {
  const truncateTrue = R.when(
    true,
    R.compose(x => `${ x }...`, R.take(5))
  )

  const truncateFalse = R.when(
    false,
    R.compose(x => `${ x }...`, R.take(5))
  )

  expect(truncateFalse('1234')).toEqual('1234')
  expect(truncateTrue('12345678')).toEqual('12345...')
})

