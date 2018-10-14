import { okInit } from './okInit'

test('throws when no schemas are passed', () =>{
  expect(
    () => okInit()
  ).toThrow()
})