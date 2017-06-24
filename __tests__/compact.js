const R = require("../rambdax")

describe("compact", () => {
  it("", () => {
    const arr = [
      1,
      null,
      undefined,
      false,
      "",
      " ",
      "foo", {},
      [],
      [1],
      /\s/g
    ]
    const result = R.compact(arr)
    const expectedResult = [1, false, " ", "foo", [1]]
    expect(result).toEqual(expectedResult)
  })
})
