import assocPath from './assocPath'

const obj = { a : { b : { c : 0 } } }
const x = 42
const path = 'a.b.c'
const pathAsArray = [ 'a', 'b', 'c' ]

test('', () => {
  const result = assocPath(path, x, obj)
  const expectedResult = { a : { b : { c : 42 } } }
  expect(result).toEqual(expectedResult)

  const resultCurriedFirst = assocPath(path)(x, obj)
  const resultCurriedSecond = assocPath(path, x)(obj)
  const resultCurriedThird = assocPath(path)(x)(obj)

  expect(resultCurriedFirst).toEqual(expectedResult)
  expect(resultCurriedSecond).toEqual(expectedResult)
  expect(resultCurriedThird).toEqual(expectedResult)
})

test('with array as path', () => {
  const result = assocPath(pathAsArray, x, obj)
  const expectedResult = { a : { b : { c : 42 } } }
  expect(result).toEqual(expectedResult)
})

test('when obj is undefined', () => {
  const result = assocPath(path, x)(undefined)
  const expectedResult = { a : { b : { c : 42 } } }

  expect(result).toEqual(expectedResult)
})

test('when path is short', () => {
  const result = assocPath([ 'a' ], x, obj)
  const expectedResult = { a : 42 }

  expect(result).toEqual(expectedResult)
})

test('does not work when path is empty and correct', () => {
  const result = assocPath('', x, obj)
  const resultAsArray = assocPath([], x, obj)

  expect(result).not.toEqual(obj)
  expect(resultAsArray).not.toEqual(obj)
})

test('when such object path does not exists', () => {
  const result = assocPath('d.e.f', x, obj)
  const expectedResult = {
    a : { b : { c : 0 } },
    d : { e : { f : 42 } },
  }

  expect(result).toEqual(expectedResult)
})

