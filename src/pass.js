import { any } from './rambda/any'
import { check } from './ok'

export function pass(...inputs) {
  return (...schemas) => {
    if (inputs.length !== schemas.length) return false

    return any((x, i) => !check(x, schemas[i]), inputs) === false
  }
}
