import { allTrue } from './allTrue'
import { isValid } from './isValid'
import { okInit } from './okInit'

/**
 * TODO apply to Rambda
 * Check if Rambda.any returns early
 */
export function any(fn, arr) {
  let counter = 0
  while (counter < arr.length) {
    if (fn(arr[ counter ], counter)) {
      return true
    }
    counter++
  }

  return false
}

export function check(singleInput, schema){
  return isValid({
    input  : { singleInput },
    schema : { singleInput : schema },
  })
}

let holder = {}

export function ok(...inputs){
  if (Object.keys(holder).length === 0){
    holder = okInit({ _internal : true })
  }

  return (...schemas) => {
    if (inputs.length !== schemas.length){
      throw new Error('inputs.length !== schemas.length')
    }

    let failedSchema

    const pass = any(
      (singleInput, i) => {
        const isCustomSchema = allTrue(
          typeof schemas[ i ] === 'string',
          holder[ schemas[ i ] ]
        )

        const schema = isCustomSchema ?
          holder[ schemas[ i ] ] :
          schemas[ i ]

        const checked = check(singleInput, schema)
        if (!checked){
          failedSchema = JSON.stringify({
            input : singleInput,
            schema,
          })
        }

        return !checked
      },
      inputs
    ) === false

    if (!pass) throw new Error(
      `Failed R.ok with schema ${ failedSchema }`
    )

    return true
  }
}
