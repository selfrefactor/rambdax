const R = require("../rambdax")

describe("path", () => {
  it("", () => {
    expect(
        R.path("a.b.c")({a:{b:{c:1}}})
      ).toEqual(1)
    expect(
        R.path(["a","b","c"])({a:{b:{c:1}}})
      ).toEqual(1)  
  })
})
