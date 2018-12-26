import { type } from './rambda/type'
import { toLower } from './rambda/toLower'
import { contains } from './rambda/contains'
import { test } from './rambda/testModule'
import { any } from './rambda/any'
import { all } from './rambda/all'
import { init } from './rambda/init'

function fromPrototypeToString(rule, ruleType){
  if (ruleType !== 'Function') return {
    rule,
    parsed : false,
  }
  if (
    typeof rule.prototype === 'function' ||
    rule.prototype === undefined
  ){
    return {
      rule,
      parsed : false,
    }
  }
  if (String.prototype === rule.prototype){
    return {
      rule   : 'string',
      parsed : true,
    }
  }
  if (Boolean.prototype === rule.prototype){
    return {
      rule   : 'boolean',
      parsed : true,
    }
  }
  if (Number.prototype === rule.prototype){
    return {
      rule   : 'number',
      parsed : true,
    }
  }

  return {
    rule   : type(rule.prototype).toLowerCase(),
    parsed : true,
  }
}

function getRuleAndType(schema, requirementRaw){
  const ruleRaw = schema[ requirementRaw ]
  const typeIs = type(ruleRaw)
  const { rule, parsed } = fromPrototypeToString(ruleRaw, typeIs)

  return {
    rule     : rule,
    ruleType : parsed ? 'String' : typeIs,
  }
}

export function isValid({ input, schema }){
  if (input === undefined || schema === undefined) return false

  let flag = true
  const boom = boomFlag => {
    if (!boomFlag){
      flag = false
    }
  }

  for (const requirementRaw in schema){
    if (flag){
      const isOptional = requirementRaw.endsWith('?')
      const requirement = isOptional ?
        init(requirementRaw) :
        requirementRaw

      const { rule, ruleType } = getRuleAndType(
        schema,
        requirementRaw
      )
      const inputProp = input[ requirement ]
      const inputPropType = type(input[ requirement ])

      const ok =
        isOptional && inputProp !== undefined || !isOptional

      if (
        !ok ||
        rule === 'any' && inputProp != null ||
        rule === inputProp
      )
        continue

      if (ruleType === 'Object'){
        /**
         * This rule is standalone schema, so we recursevly call `isValid`
         */
        const isValidResult = isValid({
          input  : inputProp,
          schema : rule,
        })
        boom(isValidResult)
      } else if (ruleType === 'String'){
        /**
         * Rule is actual rule such as 'number', so the two types are compared
         */
        boom(toLower(inputPropType) === rule)
      } else if (typeof rule === 'function'){
        /**
         * Rule is function so we pass to it the input
         */
        boom(rule(inputProp))
      } else if (
        ruleType === 'Array' &&
        inputPropType === 'String'
      ){
        /**
         * Enum case | rule is like a: ['foo', 'bar']
         */
        boom(contains(inputProp, rule))
      } else if (
        ruleType === 'Array' &&
        rule.length === 1 &&
        inputPropType === 'Array'
      ){
        /**
         * 1. array of type | rule is like a: ['number']
         * 2. rule is like a: [{from: 'string'}]
         */
        const currentRule = rule[ 0 ]
        const currentRuleType = type(rule[ 0 ])
        //Check if rule is invalid
        boom(
          currentRuleType === 'String' ||
            currentRuleType === 'Object'
        )

        if (currentRuleType === 'String'){
          /**
           * 1. array of type
           */
          const isInvalidResult = any(
            inputPropInstance =>
              type(inputPropInstance).toLowerCase() !==
              currentRule,
            inputProp
          )
          boom(!isInvalidResult)
        }

        if (currentRuleType === 'Object'){
          /**
           * 2. rule is like a: [{from: 'string'}]
           */
          const isValidResult = all(
            inputPropInstance =>
              isValid({
                input  : inputPropInstance,
                schema : currentRule,
              }),
            inputProp
          )
          boom(isValidResult)
        }
      } else if (
        ruleType === 'RegExp' &&
        inputPropType === 'String'
      ){
        boom(test(rule, inputProp))
      } else {
        boom(false)
      }
    }
  }

  return flag
}
