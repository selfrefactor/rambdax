import { runTests } from './runTests'
import { waitFor } from './waitFor'
import { delay } from './delay'

const fn = x => {
  let counterFn = 0
  return () => {
    counterFn++
  
    return counterFn> x
  }
}
const howLong = 1000

// const promiseFn = new Promise(resolve => {

//   counter++
//   resolve(counter > x)

// })
test('a1', async () =>{
  let counter = 0
  const condition = x => {
    counter++
    return counter > x
  }

  const result = await waitFor(condition,howLong)(6)
  expect(
    result
  ).toEqual(true)
})

test('a2', async () =>{
  let counter = 0
  const condition = x => {
    counter++
    return counter > x
  }

  const result = await waitFor(condition,howLong)(12)
  expect(
    result
  ).toEqual(false)
})

test('a3', async () =>{
  let counter = 0
  const condition = async x => {
    counter++
    return counter > x
  }

  const result = await waitFor(
    condition,
    howLong
  )(6)
  expect(
    result
  ).toEqual(true)
})

test('a4', async () =>{
  let counter = 0
  const condition = async x => {
    counter++
    return counter > x
  }

  const result = await waitFor(
    condition,
    howLong
  )(12)
  expect(
    result
  ).toEqual(false)
})