const R = require('../rambdax')

test('', async () => {
  const result = await R.tapAsync(R.delay)(1)
  expect(
    result
  ).toEqual(1)
})
