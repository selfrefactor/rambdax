const R = require("../rambdax")

describe("pickBy", () => {
  it("", () => {
    const input = {
      a : 1,
      b : 2,
      c : 3,
      d : 4,
    }
    const fn = prop => [ "a", "c" ].includes(prop)
    const expectedResult = {
      a : 1,
      c : 3,
    }
    expect(R.pickBy(fn, input)).toEqual(expectedResult)
  })
})

