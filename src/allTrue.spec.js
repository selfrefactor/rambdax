import { allTrue } from './allTrue'

const foo = 4
const bar = { a : 1 }
const baz = [ 1, 2, 3 ]

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

test('escapes early - case 1', () => {
  const foo = null
  const result = allTrue(
    foo,
    () => foo.a,
  )
  expect(result).toBe(false)
})

test('escapes early - case 2', () => {
  const foo = { a : 'bar' }
  const result = allTrue(
    foo,
    foo.a,
    foo.a.b,
  )
  expect(result).toBe(false)
})

test('escapes early - case 3', () => {
  const foo = { a : { b : 'bar' } }
  const result = allTrue(
    foo,
    () => foo.a,
    () => foo.a.b,
  )
  expect(result).toBe(true)
})
