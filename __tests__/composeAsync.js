const { composeAsync } = require("../rambdax")
describe("composeAsync", () => {
  it("", async () => {
    const delayAsync = async ms => delay(ms)

    const delay = ms => new Promise(resolve => {
      setTimeout(() => {
        resolve(ms + 110)
      }, ms)
    })

    const result = await composeAsync(
      a => a - 1000,
      a => a,
      async a => delayAsync(a),
      a => a + 11
    )(delay(20))
    expect(
      result
    ).toEqual(-749)
  })
})
