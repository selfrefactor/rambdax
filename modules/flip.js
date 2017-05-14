function flip (fnToCurry) {
  return (...curryArguments) => {
    const len = fnToCurry.length
    if (curryArguments[ 1 ] === undefined) {
      if (len > 1) {
        return (...futureArguments) => {
          if (len === 3 && futureArguments.length === 1) {
            return holder => fnToCurry(holder, futureArguments[ 0 ], curryArguments[ 0 ])
          }

          return fnToCurry(...futureArguments.reverse(), curryArguments[ 0 ])
        }
      }
    } else if (curryArguments[ 2 ] === undefined && len === 3) {
      return futureArgument => fnToCurry(futureArgument, ...curryArguments.reverse())
    }

    return fnToCurry(...curryArguments.reverse())
  }
}

module.exports = flip
