import { type } from 'rambda'

export function composeAsync(...inputArguments) {
  return async function(startArgument) {
    let argumentsToPass = startArgument

    while (inputArguments.length !== 0) {
      const fn = inputArguments.pop()
      const typeFn = type(fn)

      if (typeFn === 'Async' || typeFn === 'Promise') {
        argumentsToPass = await fn(argumentsToPass)
      } else {
        argumentsToPass = fn(argumentsToPass)
      }
    }

    return argumentsToPass
  }
}
