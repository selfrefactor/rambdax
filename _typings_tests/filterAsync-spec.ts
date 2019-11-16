import { filterAsync, delay } from 'rambdax'

describe('filterAsync', () => {
  it('happy', async () => {
    const predicate = async (x: number) => {
      await delay(100)
      return x%2 === 1
    }

  const list = [ 1,2,3,4,5 ]

  const result = await filterAsync<number>(predicate, list)
  const resultx = await filterAsync(predicate, list)

    result // $ExpectType number[]
    resultx // $ExpectType number[]
  });

  it('with object', async () => {
    const predicate = async (x: number) => {
      await delay(100)
      return x%2 === 1
    }

  const list = {a:1,b:2,c:3}

  const result = await filterAsync<number>(predicate, list)
  const resultx = await filterAsync<number>(predicate, list)
    result // $ExpectType { [prop: string]: number; }
    resultx // $ExpectType { [prop: string]: number; }
  });
});
 