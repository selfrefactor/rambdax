const R = require('../rambdax')

test('', () => {
  const result = R.inject(
    ' INJECTION',
    'MARKER',
    'foo bar MARKER baz'
  )

  const expectedResult = 'foo bar MARKER INJECTION baz'

  expect(
    result
  ).toBe(expectedResult)
})
