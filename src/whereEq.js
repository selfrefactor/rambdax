import { equals } from './rambda/equals'
import { filter } from './rambda/filter'

export function whereEq(rule, input){
  if (arguments.length === 1){
    return inputHolder => whereEq(rule, inputHolder)
  }

  const result = filter(
    (ruleValue, ruleProp) => equals(ruleValue, input[ ruleProp ]),
    rule
  )

  return Object.keys(result).length === Object.keys(rule).length
}
