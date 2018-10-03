import { produce } from './produce'
import { take } from '../rambdax'

/**
 * TODO
 * any('string')
 * any(['string'])
 * any(schemaA)
 * random
 */
const delay = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(take(5, `${ Math.random() }`))
  }, 333)
})

test('produce', async () => {
    const fn = produce({
      foo : async () => {
        const result = await delay()

        return result
      },
      bar : inputArgument => inputArgument === 5,
    })

    const result = await fn(5)

    expect(
      result.bar
    ).toEqual(true)

    expect(
      typeof result.foo
    ).toEqual('string')
})
