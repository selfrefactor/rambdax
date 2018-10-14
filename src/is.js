import { allTrue } from './allTrue'
import { any, check } from './ok'
import { okInit } from './okInit'

let holder = {}

export function is(...inputs){
  if (Object.keys(holder).length === 0){
    holder = okInit({ _internal : true })
  }

  return (...schemas) => {
    if (inputs.length !== schemas.length) return false

    return any(
      (singleInput, i) => {
        const isCustomSchema = allTrue(
          typeof schemas[ i ] === 'string',
          holder[ schemas[ i ] ]
        )

        const schema = isCustomSchema ?
          holder[ schemas[ i ] ] :
          schemas[ i ]

        return !check(singleInput, schema)
      },
      inputs
    ) === false
  }
}
