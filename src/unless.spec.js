import { unless } from './unless'
import { isNil } from './rambda/isNil'
import { inc } from './rambda/inc'

test('whenFalse can be other than function', () => {
  const result = unless(isNil, 2)('foo')

  expect(result).toBe(2)
})

test('use boolean', () => {
  const safeInc = unless(isNil)(inc)

  expect(safeInc(null)).toBe(null)
  expect(safeInc(1)).toBe(2)
})

test('condition can be plain boolean', () => {
  const safeInc = unless(false)(inc)

  expect(safeInc(1)).toBe(2)
})
