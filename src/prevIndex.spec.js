import { prevIndex } from './prevIndex'

const list = [ 1, 2, 3, 4 ]

test('happy path', () => {
  expect(prevIndex(2, list)).toEqual(1)
})

test('happy path', () => {
  expect(prevIndex(0, list)).toEqual(3)
})
