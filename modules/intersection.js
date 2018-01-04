import { filter } from 'rambda'

export default function intersection (a, b) {
  if (b === undefined) {
    return bHolder => intersection(a, bHolder)
  }

  return filter(val => b.includes(val))(a)
}
