import allFalse from './allFalse'

test('usage with variables', () => {
  const foo = null
  const bar = undefined
  const baz = false
  const result = allFalse(
    foo,
    bar,
    baz
  )
  expect(result).toBe(true)
})

test('usage with boolean', () => {
  const foo = 1
  const bar = { a : 0 }
  const baz = []
  const result = allFalse(
    foo > 2,
    bar.a === 1,
    baz.length === 3
  )
  expect(result).toBe(true)
})
