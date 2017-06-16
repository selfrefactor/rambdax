const {curry} = require("rambda")

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
    const wrap = onceFn(fn,context)
    return curry(wrap)
  }
  return onceFn(fn,context)
}

module.exports = once
