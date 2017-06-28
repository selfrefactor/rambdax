const {
  throttle
} = require("../rambdax")

describe("", () => {
  it("", async() => {
    let counter = 0
    const inc = () => {
      counter++
    }

    const delay = ms => new Promise(resolve => {
      setTimeout(resolve, ms)
    })
    const incWrapped = throttle(inc, 1000)
    await delay(500)
    incWrapped()
    incWrapped()
    incWrapped()
    expect(counter).toBe(1)
    await delay(1500)
    incWrapped()
    expect(counter).toBe(2)
  })
})

