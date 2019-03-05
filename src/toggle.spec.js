import { toggle } from './toggle'

test('1', () => {
  const input = 'foo'
  const list = [ 'foo', 'bar' ]

  const result = toggle(input, list)
  const expectedResult = 'bar'

  expect(
    result
  ).toEqual(expectedResult)
})

test('2', () => {
  const input = 'bar'
  const list = [ 'foo', 'bar' ]

  const result = toggle(input, list)
  const expectedResult = 'foo'

  expect(
    result
  ).toEqual(expectedResult)
})

test('wrong list input', () => {
  expect(
    () => toggle(2, null)
  ).toThrow()
})
