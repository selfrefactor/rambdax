import { uuid } from './uuid'

test('happy', () => {
  expect(uuid().length).toBe(8)
})

test('with length', () => {
  expect(uuid(3).length).toBe(3)
})

test('only string uuid', () => {
  expect(uuid(3, true).length).toBe(3)
})
