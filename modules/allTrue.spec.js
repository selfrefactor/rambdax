const allTrue = require('./allTrue').default

const foo = 4
const bar = {a: 1}
const baz = [1,2,3]

test('usage with non boolean', () => {
  const result = allTrue(
    foo,
    bar,
    baz
  )
  expect(result).toBe(true)
})

test('usage with boolean', () => {
  const result = allTrue(
    foo > 2,
    bar.a === 1,
    baz.length === 3
  )
  expect(result).toBe(true)
})
