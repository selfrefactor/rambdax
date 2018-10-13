export function defaultWhen(fn, fallback, input) {
  if (arguments.length === 2){
    return inputHolder => defaultWhen(fn, fallback, inputHolder)
  }

  return fn(input) ?
    input :
    fallback
}
