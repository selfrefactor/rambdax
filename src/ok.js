import { isValid } from './isValid'
import { any } from './rambda/any'

export function check(singleInput, schema){
  return isValid({
    input  : { singleInput },
    schema : { singleInput : schema },
  })
}

export function ok(...inputs){
  return (...schemas) => {
    let failedSchema

    const pass =
      any((singleInput, i) => {
        const schema =
          schemas[ i ] === undefined ? schemas[ 0 ] : schemas[ i ]

        const checked = check(singleInput, schema)
        if (!checked){
          failedSchema = JSON.stringify({
            input : singleInput,
            schema,
          })
        }

        return !checked
      }, inputs) === false

    if (!pass)
      throw new Error(`Failed R.ok with schema ${ failedSchema }`)

    return true
  }
}
