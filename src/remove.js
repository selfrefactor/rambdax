import { type, replace } from 'rambda'

export function remove(inputs, text){
  if (type(inputs) !== 'Array'){
    return replace(
      inputs,
      '',
      text
    ).trim()
  }

  let textCopy = text

  inputs.forEach(singleInput => {
    textCopy = replace(
      singleInput,
      '',
      textCopy
    ).trim()
  })

  return textCopy
}

