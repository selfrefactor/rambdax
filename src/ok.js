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

export function ok(...inputs){
  return (...schemas) => {
    if (inputs.length !== schemas.length) return false

    return any((singleInput, i) =>
      !check(singleInput, schemas[ i ])
    , inputs) === false
  }
}
