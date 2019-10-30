import { composeAsync } from 'rambdax'

describe('composeAsync', () => {
  it('happy', async () => {
    const fn = (input: any) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve({
          type    : 'result',
          payload : input,
        })
      }, 100)
    })

  const list = [ 'foo', 'bar' ]

  const result = await composeAsync<string[]>(
    x => x,
    async inputs => Promise.all(inputs.map(async (input: any) => fn(input))),
  )(list)

    result // $ExpectType string[]
  });
});
 