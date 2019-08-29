import { inject } from './inject'

test('after marker is default', () => {
  const result = inject(
    ' INJECTION',
    'MARKER',
    'foo bar MARKER baz'
  )

  const expectedResult = 'foo bar MARKER INJECTION baz'

  expect(result).toBe(expectedResult)
})

test('with before marker', () => {
  const result = inject(
    'INJECTION ',
    'MARKER',
    'foo bar MARKER baz',
    true
  )

  const expectedResult = 'foo bar INJECTION MARKER baz'

  expect(result).toBe(expectedResult)
})
