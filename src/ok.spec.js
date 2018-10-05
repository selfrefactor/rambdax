import {ok} from './ok'

test('ok', () => {
  const result = ok(1,'foo', {})('number', 'string','object')
  expect(
    result
  ).toBe(true)
})

test('when validation fails', () => {
  expect(
    ok(1,'foo', {})('number', 'string', 'string')
  ).toBe(false)
})

test('when both arguments length is not equal', () => {
  expect(
    ok(1,'foo', {})('number', 'string')
  ).toBe(false)
})