const R = require('../rambdax')

test('', async () => {
  let counter = 0
  let aHolder
  let bHolder

  const inc = (a,b) => {
    aHolder = a
    bHolder = b
    counter++
  }

  const incWrapped = R.throttle(inc, 1000)
  
  incWrapped(1,2)
  
  await R.delay(500)

  incWrapped(2,3)
  incWrapped(3,4)
  
  expect(counter).toBe(1)
  expect(aHolder).toBe(1)
  expect(bHolder).toBe(2)
  
  await R.delay(1000)
  
  incWrapped(5,6)
  
  expect(counter).toBe(2)
  expect(aHolder).toBe(5)
  expect(bHolder).toBe(6)
})

