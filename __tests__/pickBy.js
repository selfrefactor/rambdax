const R = require("../rambdax")

describe("pickBy", () => {
  it("", () => {
    const input = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    }
    const fn = val => val > 2
    const expectedResult = {
      c: 3,
      d: 4,
    }
    expect(R.pickBy(fn, input)).toEqual(expectedResult)
  })
})

