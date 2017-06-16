const {
  debounce
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
    const incWrapped = debounce(inc, 500)
    incWrapped()
    expect(counter).toBe(0)
    await delay(200)
    incWrapped()
    expect(counter).toBe(0)
    await delay(200)
    incWrapped()
    expect(counter).toBe(0)
    await delay(200)
    incWrapped()
    expect(counter).toBe(0)
    await delay(700)
    expect(counter).toBe(1)
  })
})

