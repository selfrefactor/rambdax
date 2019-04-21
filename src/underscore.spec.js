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

