import { inject } from './inject'

test('', () => {
  const result = inject(
    '\nINJECTION',
    'MARKER',
    'foo bar MARKER baz'
  )

  const expectedResult = 'foo bar MARKER\nINJECTION baz'

  expect(result).toBe(expectedResult)
})
