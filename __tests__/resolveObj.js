const R = require("../rambdax")

describe("resolve", () => {
  it("", async() => {
    const delay = ms => new Promise(resolve => {
      setTimeout(() => {
        resolve(ms)
      }, ms)
    })
    const promises = {
      a : delay(1),
      b : delay(2),
      c : delay(3),
    }
    const result = await R.resolveObj(promises)

    expect(result).toEqual({
      a:1,
      b:2,
      c:3,
    })
  })
})
