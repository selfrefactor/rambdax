export function pickBy(fn, obj) {
  if (arguments.length === 1) {
    return holder => pickBy(fn, holder)
  }

  const willReturn = {}
  for (const prop in obj) {
    if (fn(prop, obj[prop])) {
      willReturn[prop] = obj[prop]
    }
  }

  return willReturn
}
