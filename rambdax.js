import R from 'rambda'

import isTypeMethod from './modules/isType'

export {default as compact} from './modules/compact'
export {default as composeAsync} from './modules/composeAsync'
export {default as debounce} from './modules/debounce'
export const DELAY = 'RAMBDAX_DELAY'
export {default as delay} from './modules/delay'
export {default as evolve} from './modules/evolve'
export {default as ifElseAsync} from './modules/ifElseAsync'
export {default as intersection} from './modules/intersection'

exports.delay = require('./modules/delay')
exports.evolve = require('./modules/evolve')
exports.ifElseAsync = require('./modules/ifElseAsync')
exports.intersection = require('./modules/intersection')
exports.isArray = x => isType('Array', x)
exports.isObject = x => isType('Object', x)
exports.isPromiseLike = require('./modules/isPromiseLike')
exports.isString = x => isType('String', x)
export const isType = isTypeMethod
exports.isValid = require('./modules/isValid')
exports.mapAsync = require('./modules/mapAsync')
exports.mapFastAsync = require('./modules/mapFastAsync')
exports.memoize = require('./modules/memoize')
exports.mergeAll = require('./modules/mergeAll')
exports.omitBy = require('./modules/omitBy')
exports.once = require('./modules/once')
exports.pickBy = require('./modules/pickBy')
exports.produce = require('./modules/produce')
exports.random = require('./modules/random')
exports.rangeBy = require('./modules/rangeBy')
exports.renameProps = require('./modules/renameProps')
exports.resolve = require('./modules/resolve')
exports.resolveSecure = require('./modules/resolveSecure')
exports.shuffle = require('./modules/shuffle')
exports.tap = require('./modules/tap')
exports.tapAsync = require('./modules/tapAsync')
exports.throttle = require('./modules/throttle')
exports.when = require('./modules/when')
exports.where = require('./modules/where')
exports.wrap = require('./modules/wrap')

Object.keys(R).map(method => {
  exports[ method ] = R[ method ]
})
