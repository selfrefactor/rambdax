import {mapAsyncLimit, delay} from 'rambdax'

describe('isValid', () => {
  it('happy', async () => {
    const limit = 3
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const iterable = async (x: number) => {
      await delay(50)

      return x + 1
    }
    const result = await mapAsyncLimit<number, number>(iterable, limit, list)

    result // $ExpectType number[]
  })
})
