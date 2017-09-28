import Rambda from 'rambda'

import isTypeMethod from './modules/isType'

export {default as compact} from './modules/compact'
export {default as composeAsync} from './modules/composeAsync'
export {default as debounce} from './modules/debounce'
export const DELAY = 'RAMBDAX_DELAY'
export {default as delay} from './modules/delay'
export {default as evolve} from './modules/evolve'
export {default as ifElseAsync} from './modules/ifElseAsync'
export {default as intersection} from './modules/intersection'
export const isArray = x => isTypeMethod('Array', x)
export const isObject = x => isTypeMethod('Object', x)
export const isString = x => isTypeMethod('String', x)
export const isType = isTypeMethod
export {default as isPromiseLike} from './modules/isPromiseLike'
export {default as isValid} from './modules/isValid'
export {default as mapAsync} from './modules/mapAsync'
export {default as mapFastAsync} from './modules/mapFastAsync'
export {default as memoize} from './modules/memoize'
export {default as mergeAll} from './modules/mergeAll'
export {default as omitBy} from './modules/omitBy'
export {default as once} from './modules/once'
export {default as pickBy} from './modules/pickBy'
export {default as produce} from './modules/produce'
export {default as random} from './modules/random'
export {default as rangeBy} from './modules/rangeBy'
export {default as renameProps} from './modules/renameProps'
export {default as resolve} from './modules/resolve'
export {default as resolveSecure} from './modules/resolveSecure'
export {default as shuffle} from './modules/shuffle'
export {default as tapAsync} from './modules/tapAsync'
export {default as throttle} from './modules/throttle'
export {default as when} from './modules/when'
export {default as where} from './modules/where'

Object.keys(Rambda).map(method => {
  exports[ method ] = Rambda[ method ]
})
