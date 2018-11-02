import { greater } from './greater'

test('', () => {
  expect(greater(1)(2)).toBeTruthy()
})

test('', () => {
  expect(greater(3, 2)).toBeFalsy()
})
