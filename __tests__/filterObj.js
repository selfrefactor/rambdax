const R = require("../rambdax")

describe("filterObj", () => {
  it("normal function", () => {
    const fn = (val, prop) => val > 2 || prop === "b"
    const obj = {
      a : 1,
      b : 2,
      c : 3,
    }
    const result = R.filterObj(fn)(obj)
    expect(result).toEqual({
      b : 2,
      c : 3,
    })
  })
})
