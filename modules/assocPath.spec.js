const R = require('../rambdax')

const obj = { a : { b : { c : 0 } } }
const x = 42
const path = 'a.b.c'
const pathAsArray = [ 'a', 'b', 'c' ]

test('', () => {
  const result = R.assocPath(path, x, obj)
  const expectedResult = { a : { b : { c : 42 } } }
  expect(result).toEqual(expectedResult)

  const resultCurriedFirst = R.assocPath(path)(x, obj)
  const resultCurriedSecond = R.assocPath(path, x)(obj)
  const resultCurriedThird = R.assocPath(path)(x)(obj)

  expect(resultCurriedFirst).toEqual(expectedResult)
  expect(resultCurriedSecond).toEqual(expectedResult)
  expect(resultCurriedThird).toEqual(expectedResult)
})

test('with array as path', () => {
  const result = R.assocPath(pathAsArray, x, obj)
  const expectedResult = { a : { b : { c : 42 } } }
  expect(result).toEqual(expectedResult)
})

test('when obj is undefined', () => {
  const result = R.assocPath(path, x)(undefined)
  const expectedResult = { a : { b : { c : 42 } } }

  expect(result).toEqual(expectedResult)
})

test('when path is short', () => {
  const result = R.assocPath([ 'a' ], x, obj)
  const expectedResult = { a : 42 }

  expect(result).toEqual(expectedResult)
})

test('does not work when path is empty and correct', () => {
  const result = R.assocPath('', x, obj)
  const resultAsArray = R.assocPath([], x, obj)

  expect(result).not.toEqual(obj)
  expect(resultAsArray).not.toEqual(obj)
})

test('when such object path does not exists', () => {
  const result = R.assocPath('d.e.f', x, obj)
  const expectedResult = {
    a : { b : { c : 0 } },
    d : { e : { f : 42 } },
  }

  expect(result).toEqual(expectedResult)
})

