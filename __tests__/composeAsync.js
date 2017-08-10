const R = require("../rambdax")

describe("composeAsync", () => {
  it("", async () => {
    const fn = input => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          type    : "result",
          payload : input,
        })
      }, 100)
    })

    const list = [ "foo", "bar" ].map(a => fn(a))

    const result = await R.composeAsync(
      R.map(R.prop("payload")),
      async inputs => Promise.all(inputs.map(async input => fn(input))),
      R.map(R.prop("payload"))
    )(await Promise.all(list))

    expect(
      result
    ).toEqual([ "foo", "bar" ])
  })
})

describe("composeAsync", () => {
  it("", async () => {
    const delayAsync = async ms => delay(ms)

    const delay = ms => new Promise(resolve => {
      setTimeout(() => {
        resolve(ms + 110)
      }, ms)
    })

    const result = await R.composeAsync(
      a => a - 1000,
      a => a,
      async a => delayAsync(a),
      a => a + 11
    )(await delay(20))
    expect(
      result
    ).toEqual(-749)
  })
})

describe("composeAsync", () => {
  it("", async () => {
    try {
      const delayAsync = async ms => delay(ms)

      const delay = ms => new Promise((_, reject) => {
        setTimeout(() => {
          reject("error")
        }, ms)
      })
      const result = await R.composeAsync(
        a => a - 1000,
        delayAsync
      )(20)
    } catch (err) {
      expect(
        err
      ).toEqual("error")
    }
  })
})
