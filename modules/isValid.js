const R = require('rambda')

const isValid = (obj, schema) => {
  if (R.type(obj) === 'Object' && R.type(schema) === 'Object') {
    let flag = true
    for (requirement in schema) {
      if (flag) {
        const rule = schema[ requirement ]
        const ruleType = R.type(rule)
        const objProp = obj[ requirement ]
        const objPropType = R.type(obj[ requirement ])

        if (ruleType === 'Object' && rule.type === 'ArrayOfSchemas' && objPropType === 'Array') {
          objProp.map(val => {
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
          if (objProp !== undefined) {
            if (R.toLower(objPropType) !== rule) {
              flag = false
            }
          } else {
            flag = false
          }
        } else if (
          typeof rule === 'function'
        ) {
          if (rule(objProp) === false) {
            flag = false
          }
        } else if (
          ruleType === 'Object' &&
          objPropType === 'Object'
        ) {
          if (
            !isValid(objProp, rule)
          ) {
            flag = false
          }
        } else if (
          ruleType === 'Array' &&
          objPropType === 'String'
        ) {
          if (!R.contains(objProp, rule)) {
            flag = false
          }
        } else if (
          ruleType === 'Array' &&
          objPropType === 'Array' &&
          rule.length === 1 &&
          objProp.length > 0
        ) {
          const arrayRuleType = R.type(rule[ 0 ])

          if (arrayRuleType === 'String') {
            const result = R.any(
              val => R.toLower(R.type(val)) !== rule[ 0 ],
              objProp
            )

            if (result) {
              flag = false
            }
          } else if (arrayRuleType === 'Object') {
            const result = R.any(
              val => !isValid(val, rule[ 0 ])
            )(objProp)
            if (result) {
              flag = false
            }
          }
        } else if (
          ruleType === 'RegExp' &&
          objPropType === 'String'
        ) {
          if (!R.test(rule, objProp)) {
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

module.exports = isValid
