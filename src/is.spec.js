import { is } from './is'

test('true on success', () => {
  const result = is(1, 'foo', {})('number', 'string', 'object')
  expect(
    result
  ).toBe(true)
})

test('false on failure', () => {
  expect(
    is(1, 'foo', {})('number', 'string', 'string')
  ).toBe(false)
})

