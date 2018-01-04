const R = require('../rambdax')

test('', () => {
  const input = {
    a : [ 1, 2 ],
    b : 'foo',
  }
  const schema = {
    a : 'array',
    b : 'string',
  }

  expect(
    R.isValid({
      input,
      schema,
    })
  ).toBeTruthy()
})
