export default function tap (fn, inputArguments) {
  if (arguments.length === 1) {
    return inputArgumentsHolder => tap(fn, inputArgumentsHolder)
  }
  fn(inputArguments)

  return inputArguments
}
