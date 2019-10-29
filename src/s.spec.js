import { s } from './s'
import { toUpper } from './rambda/toUpper'
import { take } from './rambda/take'

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
