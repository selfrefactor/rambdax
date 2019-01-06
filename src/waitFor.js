import { range } from './rambda/range'
import { type } from './rambda/type'
import { delay } from './delay'

export function waitFor(condition, howLong, loops = 10) {
  const typeCondition = type(condition)

  const passPromise = typeCondition === 'Async'
  const passFunction = typeCondition === 'Function'
  const interval = Math.floor(howLong / loops)

  if (!(passPromise || passFunction)) {
    throw new Error('R.waitFor')
  }

  if (passFunction) {
    return async (...inputs) => {
      for (const i of range(0, loops)) { // deepscan-disable-line
        const resultCondition = condition(...inputs)

        if (resultCondition === false) {
          await delay(interval)
        } else {
          return resultCondition
        }
      }

      return false
    }
  }

  return async (...inputs) => {
    for (const i of range(0, loops)) {
      const resultCondition = await condition(...inputs)

      if (resultCondition === false) {
        await delay(interval)
      } else {
        return resultCondition
      }
    }

    return false
  }
}
