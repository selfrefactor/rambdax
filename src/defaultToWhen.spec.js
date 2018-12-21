import { defaultToWhen } from './defaultToWhen'

const fn = x => x > 2
const fallback = 10

test('one input argument + no fallback', () => {
  expect(defaultToWhen(fallback, fn, 3)).toBe(3)
})

test('one input argument + fallback', () => {
  expect(defaultToWhen(fallback, fn, 1)).toBe(10)
})

test('three input argument + fallback', () => {
  expect(defaultToWhen(fallback, fn, 0,1,2)).toBe(10)
})

test('three input argument + no fallback', () => {
  expect(defaultToWhen(fallback, fn, 0,1,2,3)).toBe(3)
})

test('curry', () => {
  expect(defaultToWhen(fallback, fn)(0,1,2,3)).toBe(3)
})
