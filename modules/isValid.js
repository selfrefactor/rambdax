import {type, toLower, contains, test, any} from 'rambda'

export default function isValid({input, schema}){
  if (type(input) === 'Object' && type(schema) === 'Object') {
    let flag = true
    for (requirement in schema) {
      if (flag) {
        const rule = schema[ requirement ]
        const ruleType = type(rule)
        const inputProp = input[ requirement ]
        const inputPropType = type(input[ requirement ])

        if (ruleType === 'Object' && rule.type === 'ArrayOfSchemas' && inputPropType === 'Array') {
          inputProp.map(val => {
            let localFlag = false
            rule.rule.map(singleRule => {
              if (isValid(val, singleRule)) {
                localFlag = true
              }
            })
            if (localFlag === false) {
              flag = false
            }
          })
        } else if (
          ruleType === 'String'
        ) {
          if (inputProp !== undefined) {
            if (toLower(inputPropType) !== rule) {
              flag = false
            }
          } else {
            flag = false
          }
        } else if (
          typeof rule === 'function'
        ) {
          if (rule(inputProp) === false) {
            flag = false
          }
        } else if (
          ruleType === 'Object' &&
          inputPropType === 'Object'
        ) {
          if (
            !isValid(inputProp, rule)
          ) {
            flag = false
          }
        } else if (
          ruleType === 'Array' &&
          inputPropType === 'String'
        ) {
          if (!contains(inputProp, rule)) {
            flag = false
          }
        } else if (
          ruleType === 'Array' &&
          inputPropType === 'Array' &&
          rule.length === 1 &&
          inputProp.length > 0
        ) {
          const arrayRuleType = type(rule[ 0 ])

          if (arrayRuleType === 'String') {
            const result = any(
              val => toLower(type(val)) !== rule[ 0 ],
              inputProp
            )

            if (result) {
              flag = false
            }
          } else if (arrayRuleType === 'Object') {
            const result = any(
              val => !isValid(val, rule[ 0 ])
            )(inputProp)
            if (result) {
              flag = false
            }
          }
        } else if (
          ruleType === 'RegExp' &&
          inputPropType === 'String'
        ) {
          if (!test(rule, inputProp)) {
            flag = false
          }
        } else {
          flag = false
        }
      }
    }

    return flag
  }

  return false
}
