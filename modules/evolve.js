import { type, curry, filter } from 'rambda'

function evolveFn (rules, input) {
  const clone = Object.assign({}, input)
  const propRules = filter(
    x => clone[ x ] !== undefined
  )(Object.keys(rules))

  if (propRules.length === 0) {
    return input
  }

  propRules.map(prop => {
    const fn = rules[ prop ]
    if (type(fn) === 'Function') {
      clone[ prop ] = fn(clone[ prop ])
    } else if (type(fn) === 'Object') {
      clone[ prop ] = evolve(fn, clone[ prop ])
    }
  })

  return clone
}

export const evolve = curry(evolveFn)
