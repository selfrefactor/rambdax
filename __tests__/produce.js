const R = require("../rambdax")

const delay = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(R.take(5, `${ Math.random() }`))
  }, 333)
})

describe("produce", () => {
  it("", async () => {
    const fn = R.produce({
      foo : async () => {
        const result = await delay()

        return result
      },
      bar : inputArgument => inputArgument === 5,
    })

    const result = await fn(5)

    expect(
        result.bar
      ).toEqual(true)

    expect(
        typeof result.foo
      ).toEqual("string")
  })
})
