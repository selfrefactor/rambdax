const R = require("../rambdax")

describe("omitBy", () => {
  it("should remove omitted props", () => {
    const input = {
      a : 1,
      b : 2,
      c : 3,
      d : 4,
    }
    const fn = val => val < 3
    const expectedResult = {
      c : 3,
      d : 4,
    }
    expect(R.omitBy(fn, input)).toEqual(expectedResult)
  })
})
