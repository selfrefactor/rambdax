import { delay } from './delay'
import { prop } from 'rambda'
import { tryCatch } from './tryCatch'

test('when fallback is used', () =>{
  const fn = prop('x')

  expect(
    tryCatch(fn,false)(null)
  ).toBe(false)
})

test('when fn is used', () =>{
  const fn = prop('x')

  expect(
    tryCatch(fn,false)({})
  ).toBe(undefined)
  
  expect(
    tryCatch(fn,false)({x:1})
  ).toBe(1)
})

test('when fn is used', async () =>{
  let called = false

  const fn = async (input) => {
    await delay(input)
    console.log(11);
    
    called = true

    return JSON.parse('{a:')
  }

  expect(
    await tryCatch(fn,'fallback')(100)
  ).toBe('fallback')
})