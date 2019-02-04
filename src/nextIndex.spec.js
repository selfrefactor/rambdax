import { nextIndex } from './nextIndex'

const list = [ 1, 2, 3, 4 ]

test('happy path', () => {
  expect(nextIndex(2, list)).toEqual(3)
})

test('happy path', () => {
  expect(nextIndex(3, list)).toEqual(0)
})
