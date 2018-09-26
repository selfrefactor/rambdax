const R = require('../rambdax')

test('readable', () => {
  const result = R.multiline`
    foo
    bar
    baz
  `

  const expectedResult = 'foo bar baz'

  expect(
    result
  ).toBe(expectedResult)
})

test('', () => {
  const result = R.multiline(`
    foo
    bar
    baz
  `)

  const expectedResult = 'foo bar baz'

  expect(
    result
  ).toBe(expectedResult)
})

test('define glue', () => {
  const result = R.multiline(`
    foo
    bar
    baz
  `, '==')

  const expectedResult = 'foo==bar==baz'

  expect(
    result
  ).toBe(expectedResult)
})
