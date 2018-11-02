import { defaultWhen } from './defaultWhen'

test('', () => {
  const fn = x => x > 2
  const fallback = 10

  expect(defaultWhen(fn, fallback, 1)).toBe(10)
  expect(defaultWhen(fn, fallback, 3)).toBe(3)
})

test('with curry', () => {
  const validationFn = defaultWhen(x => x > 2, 10)

  expect(validationFn(1)).toBe(10)
  expect(validationFn(3)).toBe(3)
})
