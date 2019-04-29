import { headObject } from './headObject'

test('undefined throws', () => {
  expect(() => headObject()).toThrow()
})

test('too many keys throws', () => {
  expect(() =>
    headObject({
      a : 1,
      b : 2,
    })
  ).toThrow()
})

test('empty object throws', () => {
  expect(() => headObject({})).toThrow()
})

test('ok', () => {
  expect(headObject({ a : 1 })).toEqual({
    prop  : 'a',
    value : 1,
  })
})
