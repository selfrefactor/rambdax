import { inject } from './inject'

test('', () => {
  const result = inject(
    ' INJECTION',
    'MARKER',
    'foo bar MARKER baz'
  )

  const expectedResult = 'foo bar MARKER INJECTION baz'

  expect(
    result
  ).toBe(expectedResult)
})
