import s from './s'
import {toUpper, take, add} from 'rambda'

test('', () =>{
  
  expect(s()).toBe(undefined)
  
  const input = 'foo'
  const result = input
    .s(toUpper)
    .s(take(2))
    .s(add('bar'))

  const expectedResult = 'barFO'

  expect(
    result
  ).toEqual(expectedResult)
})