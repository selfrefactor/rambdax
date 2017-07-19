const R = require("../rambdax")

test("renameProps",() => {
  const rules = {
    f: "foo",
    b: "bar"
  }
  const input = {
    f:1,
    b:2
  }
  const result = R.renameProps(rules, input)
  const expectedResult = {
    foo:1,
    bar:2
  }
  expect(result).toEqual(expectedResult)
})