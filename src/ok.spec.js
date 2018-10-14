import { ok } from './ok'
import { okInit } from './okInit'

test('ok', () => {
  const result = ok(1, 'foo', {})('number', 'string', 'object')
  expect(
    result
  ).toBe(true)
})

test('when validation fails', () => {
  expect(
    () => ok(1, 'foo', {})('number', 'string', 'string')
  ).toThrow()
})

test('error contains schema', () => {
  try {
    ok(1, 'foo', {})('number', 'string', 'string')
    expect(false).toBe(true)
  } catch (e){
    expect(e.message.startsWith(
      'Failed R.ok with schema'
    )).toBeTruthy()
    expect(e).toBeInstanceOf(Error)
  }
})

test('throw if both arguments list is not equal', () => {
  expect(
    () => ok(1, 'foo', {})('number', 'string')
  ).toThrow()
})

test('okInit', () => {
  okInit({
    foo : {
      a : 'number',
      b : 'string',
    },
    bar : {
      c : [ 'number' ],
      d : [ 'string' ],
    },
  })

  expect(
    ok({
      a : 1,
      b : 'baz',
    })('foo')
  ).toBeTruthy()

  expect(
    () => ok({
      a : '1',
      b : 'baz',
    })('foo')
  ).toThrow()
})
