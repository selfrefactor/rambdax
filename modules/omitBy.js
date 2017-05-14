function omitBy (fn, obj) {
  if (obj === undefined) {
    return holder => omitBy(fn, holder)
  }

  const willReturn = {}
  for (prop in obj) {
    if (!fn(obj[ prop ], prop)) {
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

module.exports = omitBy
