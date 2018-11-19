import { interval } from './interval'
import { delay } from './delay'

test('', async () =>{
  let counter = 0
  const fn = () => {
    console.log({counter})
    counter++
  }  
  const ms = 300
  const whenStop = () => counter > 8

  await interval({fn,ms,whenStop})

  expect(counter).toBe(9)
  await delay(1000)
  expect(counter).toBe(9)
})

test('whenStop returns initially true', async () =>{
  let counter = 0
  const fn = () => {
    console.log({counter})
    counter++
  }  
  const ms = 500
  const whenStop = () => counter < 8

  await interval({fn,ms,whenStop})

  expect(counter).toBe(0)
  await delay(1000)
  expect(counter).toBe(0)
})