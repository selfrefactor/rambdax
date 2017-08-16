const R = require("../rambdax")

test("", () => {
  const tomato = {
    firstName: "  Foo ",
    data: {
      elapsed: 100,
      remaining: 1400,
    },
    id: 123,
  }
  const transformations = {
    firstName: R.trim,
    lastName: R.trim, //Will not get invoked.
    data: {
      elapsed: R.add(1),
      remaining: R.add(-1),
    },
  }
  const result = R.evolve(transformations, tomato)
  expect(result).toEqual({
    firstName: "Foo",
    data: {
      elapsed: 101,
      remaining: 1399,
    },
    id: 123,
  })
})

