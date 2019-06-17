import { _ } from './underscore'

test('', () => {
  const result = _.MORE

  expect(
    result
  ).toEqual('MORE')
  expect(
    result
  ).toEqual(_.MORE)
})

test('parse with constant case', () => {
  const expected = 'FOO_BAR'

  expect(
    _.fooBar
  ).toEqual(expected)
  expect(
    _.FooBar
  ).toEqual(expected)
})

test('with status', () => {
  expect(
    _.STATUS('ok')
  ).toEqual('OK')
  expect(
    _.STATUS(true)
  ).toEqual('OK')
  expect(
    _.STATUS('no')
  ).toEqual('FAIL')
  expect(
    _.STATUS(false)
  ).toEqual('FAIL')
  expect(
    _.STATUS('pass')
  ).toEqual('OK')
})

