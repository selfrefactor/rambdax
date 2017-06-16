const R = require("../rambdax")

describe("memoize", () => {
  it.skip("", () => {
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
  
  it("", async () => {
    let counter = 0
    const delay = ms => new Promise(resolve => {
      setTimeout(resolve, ms)
    })
    const fn = async (ms,a,b) => {
      await delay(ms)
      counter++
      return a+b
    }
    
    const memoized = R.memoize(fn)
    expect(await memoized(100,1,2)).toBe(3)
    expect(await memoized(100,1,2)).toBe(3)
    expect(await memoized(100,1,2)).toBe(3)
    expect(counter).toBe(1)
    expect(await memoized(100,2,2)).toBe(4)
    expect(counter).toBe(2)
    expect(await memoized(100,1,2)).toBe(3)
    expect(counter).toBe(2)
  })
})
