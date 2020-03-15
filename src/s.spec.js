import { take } from './rambda/take'
import { toUpper } from './rambda/toUpper'
import { s } from './s'

test('happy', () => {
  expect(s()).toBe(true)
  expect(s()).toBe(false)

  const input = 'foo'
  const result = input
    .s(toUpper)
    .s(take(2))

  const expectedResult = 'FO'

  expect(result).toEqual(expectedResult)
})

test('init only once', () => {
  expect(s()).toBe(false)
})
