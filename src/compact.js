import { equals } from './rambda/equals'
import { filter } from './rambda/filter'
import { type } from './rambda/type'

const types = ['Null', 'Undefined', 'RegExp']

export function compact(arr) {
  return filter(a => {
    const currentType = type(a)
    if (types.includes(currentType)) {
      return false
    }
    if (currentType === 'Object') {
      return !equals(a, {})
    }

    return a.length !== 0
  }, arr)
}
