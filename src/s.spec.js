import { s } from './s'
import { toUpper, take, add } from 'rambda'

test('', () => {

  expect(s()).toBe(true)
  expect(s()).toBe(false)

  const input = 'foo'
  const result = input
    .s(toUpper)
    .s(take(2))
    .s(add('bar'))

  const expectedResult = 'barFO'

  expect(
    result
  ).toEqual(expectedResult)
})

test('init only once', () => {
  expect(s()).toBe(false)
})
