const R = require("../rambdax")

describe("once", () => {
  it("", () => {
    let counter = 0
    const once = R.once((x) => {
      counter++
      return x + 2
    })
    expect(once(1)).toEqual(3)
    once(1)
    once(1)
    once(1)
    expect(counter).toEqual(1)
  })

  it("", () => {
    const addOneOnce = R.once((a, b, c) => a + b + c)

    expect(addOneOnce(10,20,30)).toBe(60)
    expect(
      addOneOnce(40)
    ).toEqual(60)
  })
})
