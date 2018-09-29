import template from './template'

test('', () =>{
  const input = 'foo is {{bar}} even more'
  const templateInput = {"bar":"BAR"}

  const result = template(input,templateInput)
  const expectedResult = 'foo is BAR even more'

  expect(
    result
  ).toEqual(expectedResult)
})

test('no interpolation', () =>{
  const input = 'foo is bar even more'
  const templateInput = {"bar":"BAR"}

  const result = template(input,templateInput)
  const expectedResult = 'foo is bar even more'

  expect(
    result
  ).toEqual(expectedResult)
})

test('missing template input', () =>{
  const input = 'foo is {{bar}} even more'
  const templateInput = {"baz":"BAR"}

  const result = template(input,templateInput)

  expect(
    result
  ).toEqual(input)
})