import { uuid } from './uuid'

test('', () => {
  expect(
    uuid().length
  ).toBe(8)
})

test('with length', () => {
  expect(
    uuid(3).length
  ).toBe(3)
})
