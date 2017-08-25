const R = require("../rambdax")

test("", async() => {
  let sideEffect
  const result = await R.composeAsync(
    R.tapAsync(async x => {
      sideEffect = R.equals(x, [2, 4, 6])
      return await R.delay(x * 3)
    }),
    R.mapAsync(async x => {
      await R.delay(x * 100)
      return x * 2
    })
  )([1, 2, 3])

  expect(
    result
  ).toEqual([2, 4, 6])

  expect(
    sideEffect
  ).toEqual(true)
})
