import { pass } from './pass'

test('true on success', () => {
  const result = pass(
    1, 'foo', {}
  )('number', 'string', 'object')
  
  expect(
    result
  ).toBe(true)
})

test('false on failure', () => {
  expect(
    pass(1, 'foo', {})('number', 'string', 'string')
  ).toBe(false)
})
