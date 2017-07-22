const R = require("../rambdax")

const fn = (input, flag) => new Promise((resolve, reject) => {
  setTimeout(function() {
    if (flag === true) {
      return reject("REJECT")
    }
    resolve(input)
  }, 100);
})

test("wrap", async() => {
  const result = await R.wrap(
    x => x > 1,
    {
      rule: async y => {
        const z = await fn(y)
        return z === y
      },
      defaultTo: 7
    }
  )(0)
  
  expect(result).toEqual(false)
})

test("wrap", async() => {
  const result = await R.composeAsync(
    R.wrap(
      async x => await (fn(x)), {
        rule: x => x > 0,
        defaultTo: 2
      }
    ),
    R.wrap(R.filter(a => a > 3), {
      defaultTo: 1,
      rule: x => R.length(x) > 0
    })
  )([1, 2, 3])
  expect(result).toEqual(1)
})
