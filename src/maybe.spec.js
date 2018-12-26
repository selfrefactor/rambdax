import { maybe } from './maybe'

const whenIf = 7
const whenElse = 9

test('', () =>{
  const x = 5
  const ifRule = x > 3


  const result = maybe(ifRule,whenIf,whenElse)
  const expectedResult = 7

  expect(
    result
  ).toEqual(expectedResult)
})

test('', () =>{
  const x = 1
  const ifRule = x > 3

  const result = maybe(ifRule,whenIf,whenElse)
  const expectedResult = 9

  expect(
    result
  ).toEqual(expectedResult)
})