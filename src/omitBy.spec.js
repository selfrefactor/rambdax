import { omitBy } from './omitBy'

test('should remove omitted props', () => {
  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  }
  const fn = (prop, val) => val < 3
  const expectedResult = {
    c: 3,
    d: 4,
  }
  expect(omitBy(fn, input)).toEqual(expectedResult)
  expect(omitBy(fn)(input)).toEqual(expectedResult)
})
