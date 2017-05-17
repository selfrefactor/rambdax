const curry = require("./curry")

function onceFn(fn, context) {
	var result;

	return function() {
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	};
}

function once(fn, context){
  if(arguments.length === 1){
    const a = onceFn(fn,context)
    return curry(a)
  }
  return onceFn(fn,context)
}

module.exports = once
