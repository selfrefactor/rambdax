//Its lodash's set method taken from
//https://github.com/lodash/lodash/blob/4.5.0-npm-packages
import {set} from './_internals/set'

const isObject = x => {
  const ok = x !== null && !Array.isArray(x) && typeof x === 'object'
  if (!ok) {
    return false
  }

  return Object.keys(x).length > 0
}

export function change (origin, pathRaw, rules) {
  const willReturn = JSON.parse(JSON.stringify(origin))

  if (!isObject(rules)) {
    set(willReturn, pathRaw, rules)

    return willReturn
  }
  const path = pathRaw === '' ? '' : `${ pathRaw }.`

  for (const ruleKey of Object.keys(rules)) {
    const rule = rules[ ruleKey ]
    if (!isObject(rule)) {
      set(
        willReturn,
        `${ path }${ ruleKey }`,
        rule
      )
      continue
    }
    Object.keys(rule).filter(subruleKey => !isObject(rule[ subruleKey ]))
      .map(subruleKey => {
        const subrule = rule[ subruleKey ]
        set(
          willReturn,
          `${ path }${ ruleKey }.${ subruleKey }`,
          subrule
        )
      })
    Object.keys(rule).filter(subruleKey => isObject(rule[ subruleKey ]))
      .map(subruleKey => {
        const subrule = rule[ subruleKey ]
        Object.keys(subrule).map(deepKey => {
          const deep = rule[ subruleKey ][ deepKey ]
          set(
            willReturn,
            `${ path }${ ruleKey }.${ subruleKey }.${ deepKey }`,
            deep
          )
        })
      })
  }

  return willReturn
}
