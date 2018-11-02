import { pickBy } from './pickBy'

test('pickBy', () => {
  const input = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  }
  const fn = prop => ['a', 'c'].includes(prop)
  const expectedResult = {
    a: 1,
    c: 3,
  }
  expect(pickBy(fn, input)).toEqual(expectedResult)
})
