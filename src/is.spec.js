import { is } from './is'

test('ok', () => {
  const result = is(1, 'foo', {})('number', 'string', 'object')
  expect(
    result
  ).toBe(true)
})

test('throw on failed validation', () => {
  expect(
    () => is(1, 'foo', {})('number', 'string', 'string')
  ).toThrow()
})

test('throw if both arguments list is not equal', () => {
  expect(
    () => is(1, 'foo', {})('number', 'string')
  ).toThrow()
})
