const R = require('../rambdax')

test('', () => {
  const obj = {a: {b: {c: 0}}}
  const x = 42
  const path = 'a.b.c'
  
  const result = R.assocPath(path, x, obj)
  const expectedResult = {a: {b: {c: 42} } }
  expect(result).toEqual(expectedResult)
})

