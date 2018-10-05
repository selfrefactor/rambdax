import { isValid } from './isValid'

function any (fn, arr) {
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
    input: {singleInput},
    schema : {singleInput: schema},
  })
}

export function is(...inputs){
  return (...schemas) => {
    if(inputs.length !== schemas.length) throw new Error('inputs.length !== schemas.length')
    
    let reason
    const wrong = any((singleInput, i)=> {
      const ok = check(singleInput, schemas[i])

      if(!ok){
        reason = {singleInput, schema: schemas[i]}
      }
      return !ok
    }, inputs)
    
    if(wrong) throw new Error(JSON.stringify(reason))

    return true
  }
}