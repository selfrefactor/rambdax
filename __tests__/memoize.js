const R = require("../rambdax")

describe("memoize", () => {
  it("", () => {
    let counter = 0
    const fn = (a,b) =>{
      counter++
      return a+b
    }
    const memoized = R.memoize(fn)
    expect(memoized(1,2)).toBe(3)
    expect(memoized(1,2)).toBe(3)
    expect(memoized(1,2)).toBe(3)
    expect(counter).toBe(1)
    expect(memoized(2,2)).toBe(4)
    expect(counter).toBe(2)
    expect(memoized(1,2)).toBe(3)
    expect(counter).toBe(2)
  })
})
