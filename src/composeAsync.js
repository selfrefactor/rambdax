import { type } from 'rambda'

export function composeAsync(...inputArguments) {
  try {
    return async function(startArgument) {
      let argumentsToPass = startArgument

      while (inputArguments.length !== 0) {
        const fn = inputArguments.pop()
        if (type(fn) === 'Async' || type(fn) === 'Promise') {
          argumentsToPass = await fn(argumentsToPass)
          console.log(argumentsToPass)
        } else {
          argumentsToPass = fn(argumentsToPass)
        }
      }

      return argumentsToPass
    }
  } catch (err) {
    throw err
  }
}
