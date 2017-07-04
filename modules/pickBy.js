function pickBy (fn, obj) {
  if (obj === undefined) {
    return holder => pickBy(fn, holder)
  }

  const willReturn = {}
  for (prop in obj) {
    if (fn(prop, obj[ prop ])) {
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

module.exports = pickBy
