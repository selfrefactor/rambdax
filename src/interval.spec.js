import { interval } from './interval'
import { delay } from './delay'

test('happy', async () => {
  let counter = 0
  const fn = () => {
    counter++
  }
  const ms = 300
  const stopWhen = () => counter > 8

  await interval({
    fn,
    ms,
    stopWhen,
  })

  expect(counter).toBe(9)
  await delay(1000)
  expect(counter).toBe(9)
})

test('stopWhen returns initially true', async () => {
  let counter = 0
  const fn = () => {
    console.log({ counter })
    counter++
  }
  const ms = 500
  const stopWhen = () => counter < 8

  await interval({
    fn,
    ms,
    stopWhen,
  })

  expect(counter).toBe(0)
  await delay(1000)
  expect(counter).toBe(0)
})
