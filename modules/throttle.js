export default function throttle (fn, ms) {
  let wait = false

  return function (...input) {
    if (!wait) {
      fn.apply(undefined, input)
      wait = true
      setTimeout(() => {
        wait = false
      }, ms)
    }
  }
}
