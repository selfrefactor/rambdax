const R = require("../rambdax")

describe("mergeAll", () => {
  it("", () => {
    const arr = [
      {a:1},
      {b:2},
      {c:3}
    ]
    const expectedResult = {
      a:1,
      b:2,
      c:3
    }
    expect(R.mergeAll(arr)).toEqual(expectedResult)
  })
  
  it("", () => {
    expect(
        R.mergeAll([ { foo : 1 }, { bar : 2 }, { baz : 3 } ])
      ).toEqual({
        foo : 1,
        bar : 2,
        baz : 3,
      })
  })
})
