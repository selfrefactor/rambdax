function debounce(func, ms) {
  let timeout
  return function() {
    const thisHolder = this
    const args = arguments
    const later = function() {
      timeout = null
      func.apply(thisHolder, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}

module.exports = debounce