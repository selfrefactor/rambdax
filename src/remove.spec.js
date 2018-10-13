const { remove } = require('./remove')

test('', () =>{
  const inputs = ["foo","bar"]
  const text = foo bar baz foo

  const result = remove(inputs,text)
  const expectedResult = baz foo

  expect(
    result
  ).toEqual(expectedResult)
})