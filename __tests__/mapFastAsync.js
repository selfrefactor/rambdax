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

describe("mapFastAsync", () => {
  it("", async () => {
    const result = await R.mapFastAsync(delay)([ 1, 2, 3 ])
    expect(result).toEqual([ 21, 22, 23 ])
  })

  it("composeAsync", async () => {
    const result = await R.composeAsync(
      R.mapFastAsync(async a => await delay(a)),
      R.mapFastAsync(delay),
      R.map(a => a * 10)
    )(await tap([ 1, 2, 3 ]))
    expect(result).toEqual([ 50, 60, 70 ])
  })

  it("error", async () => {
    try {
      const result = await R.mapFastAsync(rejectDelay)([ 1, 2, 3 ])
    } catch (err) {
      expect(err).toBe(21)
    }
  })
})

