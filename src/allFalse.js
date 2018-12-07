import { type } from './rambda/type'

export function allFalse(...inputs) {
  let counter = 0

  while (counter < inputs.length) {
    const x = inputs[ counter ]

    if (type(x) === 'Function') {
      if (inputs[ counter ]()) {
        return false
      }
    } else if (inputs[ counter ]) {
      return false
    }

    counter++
  }

  return true
}