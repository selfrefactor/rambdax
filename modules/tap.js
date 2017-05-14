function tap (fn, inputArguments) {
  if (inputArguments === undefined) {
    return inputArgumentsHolder => tap(fn, inputArgumentsHolder)
  }
  fn(inputArguments)

  return inputArguments
}

module.exports = tap
