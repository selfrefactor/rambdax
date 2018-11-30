// WAIT
export function defaultToStrict(defaultArgument, inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder =>
      defaultToStrict(defaultArgument, inputArgumentHolder)
  }

  return Boolean(inputArgument) ?
    inputArgument :
    defaultArgument
}
