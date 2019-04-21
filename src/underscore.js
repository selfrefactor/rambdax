import { contantCase } from './_internals/constantCase'

const predefined = {
  STATUS : x => {
    const flag = typeof x === 'boolean' ?
      () => x :
      () => [ 'ok', 'pass', 'passed' ].includes(x.toLowerCase())

    return flag() ?
      'OK' :
      'FAIL'
  },
}

const handler = {
  get : function(target, property){
    if (target[ property ]) return target[ property ]

    return constantCase(property)
  },
}

export const _ = new Proxy(predefined, handler)

