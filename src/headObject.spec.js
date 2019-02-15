import { headObject } from './headObject'

test('happy path', () => {
  const input = { a : 1 }

  const result = headObject(input)
  const expectedResult = {
    prop  : 'a',
    value : 1,
  }

  expect(
    result
  ).toEqual(expectedResult)
})

test('with empty object', () => {
  const result = headObject({})
  expect(
    result.prop
  ).toBe(undefined)
  expect(
    result.value
  ).toBe(undefined)
})

test('with larger object', () => {
  expect(
    () => headObject({
      a : 1,
      b : 2,
    })
  ).toThrow()
})

test('with undefined', () => {
  expect(
    () => headObject(undefined)
  ).toThrow()
})

test('with null', () => {
  expect(
    () => headObject(null)
  ).toThrow()
})
