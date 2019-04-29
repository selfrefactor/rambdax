import { ok } from './ok'

test('ok', () => {
  const result = ok(1, 'foo', {})('number', 'string', 'object')
  expect(result).toBe(true)
})

test('when validation fails', () => {
  expect(() =>
    ok(1, 'foo', {})('number', 'string', 'string')
  ).toThrow()
})

test('error contains schema', () => {
  try {
    ok(1, 'foo', {})('number', 'string', 'string')
    expect(false).toBe(true)
  } catch (e){
    expect(
      e.message.startsWith('Failed R.ok with schema')
    ).toBeTruthy()
    expect(e).toBeInstanceOf(Error)
  }
})

test('when not throws with single schema', () => {
  expect(() => ok(1, 2, 3)('number')).not.toThrow()
})

test('when throws with single schema', () => {
  expect(() => ok(1, 2, '3')('number')).toThrow()
})
