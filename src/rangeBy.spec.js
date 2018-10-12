import { rangeBy } from './rangeBy'

test('', () => {
  expect(
    rangeBy(10, 0, 2)
  ).toEqual([ 0, 2, 4, 6, 8, 10 ])
})

test('', () => {
  expect(
    rangeBy(0, 1, 0.2)
  ).toEqual([ 0, 0.2, 0.4, 0.6, 0.8, 1.0 ])
})

test('', () => {
  expect(
    rangeBy(0, 2, 0.3)
  ).toEqual([ 0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8 ])
})

