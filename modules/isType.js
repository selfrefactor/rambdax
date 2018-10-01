import { type } from 'rambda'

export default function isType (xType, x) {
  if (arguments.length === 1) {
    return xHolder => isType(xType, xHolder)
  }
  console.log(typeof x)
  console.log(x)
  console.log(type(x))
  console.log(typeof xType)
  console.log(xType)
  

  return type(x) === xType
}
