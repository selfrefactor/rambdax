function curry (fnToCurry) {
  return (...curryArguments) => {
    const len = fnToCurry.length
    if (curryArguments[ 1 ] === undefined) {
      if (len > 1) {
        return (...futureArguments) => {
          if (len === 3 && futureArguments.length === 1) {
            return b => fnToCurry(curryArguments[ 0 ], futureArguments[ 0 ], b)
          }

          return fnToCurry(curryArguments[ 0 ], ...futureArguments)
        }
      }
    } else if (curryArguments[ 2 ] === undefined && len === 3) {
      return futureArgument => fnToCurry(...curryArguments, futureArgument)
    }

    return fnToCurry(...curryArguments)
  }
}

function onceFn(fn, context) {
	let result

	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments)
			fn = null
		}

		return result
	}
}

function once(fn, context){
  if(arguments.length === 1){
    let wrap = onceFn(fn,context)
    return curry(wrap)
  }
  return onceFn(fn,context)
}

module.exports = once
