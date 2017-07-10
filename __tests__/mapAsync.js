const R = require("../rambdax")

const delay = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + 20)
  }, 100)
})

const tap = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a)
  }, 100)
})

const rejectDelay = a => new Promise((_, reject) => {
  setTimeout(() => {
    reject(a + 20)
  }, 100)
})

describe("mapAsync", () => {
  it("", async () => {
    const result = await R.mapAsync(delay)([ 1, 2, 3 ])
    expect(result).toEqual([ 21, 22, 23 ])
  })

  it.only("composeAsync", async () => {
    const result = await R.composeAsync(
      //R.mapAsync(delay),
      R.mapAsync(async a => await delay(a)),
      R.mapAsync(async a => await delay(a)),
      R.map(a => a * 10)
    )(await tap([ 1, 2, 3 ]))
    expect(result).toEqual([ 30, 40, 50 ])
  })

  it("error", async () => {
    try {
      const result = await R.mapAsync(rejectDelay)([ 1, 2, 3 ])
    } catch (err) {
      expect(err).toBe(21)
    }
  })
})

