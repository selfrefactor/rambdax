import { any } from './rambda/any'
import { check } from './ok'

export function pass(...inputs){
  return (...schemas) =>
    any((x, i) => {
      const schema =
          schemas[ i ] === undefined ? schemas[ 0 ] : schemas[ i ]

      return !check(x, schema)
    }, inputs) === false

}
