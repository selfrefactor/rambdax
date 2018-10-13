import { isValid } from './isValid'

export function validate(input, schema) {
  if (arguments.length === 2) {
    return isValid({
      input,
      schema,
    })
  }

  return schemaHolder => isValid(
    {
      input,
      schema : schemaHolder,
    }
  )
}

