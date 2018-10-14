import { allTrue } from './allTrue'
import { isValid } from './isValid'

function any(fn, arr) {
  let counter = 0
  while (counter < arr.length) {
    if (fn(arr[ counter ], counter)) {
      return true
    }
    counter++
  }

  return false
}

function check(singleInput, schema){
  return isValid({
    input  : { singleInput },
    schema : { singleInput : schema },
  })
}

let holder = {}
export function okInit(rules){
  holder = {
    ...holder,
    ...rules,
  }
}

export function ok(...inputs){
  return (...schemas) => {
    if (inputs.length !== schemas.length) return false

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
          failedSchema = JSON.stringify(schema)
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
