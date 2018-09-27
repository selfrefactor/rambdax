const { is } = require('./is')

test('', () =>{
  const input = 1

  const result = is(input)
  const expectedResult = 2

  expect(
    result
  ).toEqual(expectedResult)
})