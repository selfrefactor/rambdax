const R = require("rambda")

exports.all = require("./modules/all")
exports.allPass = require("./modules/allPass")
exports.both = require("./modules/both")
exports.either = require("./modules/either")
exports.flip = require("./modules/flip")
exports.intersection = require("./modules/intersection")
exports.isValid = require("./modules/isValid")
exports.memoize = require("./modules/memoize")
exports.mergeAll = require("./modules/mergeAll")
exports.omitBy = require("./modules/omitBy")
exports.once = require("./modules/once")
exports.path = require("./modules/path")
exports.pickBy = require("./modules/pickBy")
exports.produce = require("./modules/produce")
exports.shuffle = require("./modules/shuffle")
exports.race = require("./modules/race")
exports.random = require("./modules/random")
exports.rangeBy = require("./modules/rangeBy")
exports.renameProps = require("./modules/renameProps")
exports.resolve = require("./modules/resolve")
exports.tap = require("./modules/tap")
exports.where = require("./modules/where")

exports.add = R.add
exports.adjust = R.adjust
exports.any = R.any
exports.append = R.append
exports.compose = R.compose
exports.contains = R.contains
exports.curry = R.curry
exports.drop = R.drop
exports.defaultTo = R.defaultTo
exports.dropLast = R.dropLast
exports.equals = R.equals
exports.filter = R.filter
exports.find = R.find
exports.findIndex = R.findIndex
exports.flatten = R.flatten
exports.head = R.head
exports.indexOf = R.indexOf
exports.init = R.init
exports.join = R.join
exports.last = R.last
exports.length = R.length
exports.map = R.map
exports.match = R.match
exports.merge = R.merge
exports.omit = R.omit
exports.pick = R.pick
exports.partialCurry = R.partialCurry
exports.pluck = R.pluck
exports.prepend = R.prepend
exports.prop = R.prop
exports.propEq = R.propEq
exports.range = R.range
exports.repeat = R.repeat
exports.replace = R.replace
exports.sort = R.sort
exports.sortBy = R.sortBy
exports.split = R.split
exports.splitEvery = R.splitEvery
exports.subtract = R.subtract
exports.tail = R.tail
exports.take = R.take
exports.takeLast = R.takeLast
exports.test = R.test
exports.toLower = R.toLower
exports.toUpper = R.toUpper
exports.trim = R.trim
exports.type = R.type
exports.uniq = R.uniq
exports.update = R.update
exports.values = R.values
