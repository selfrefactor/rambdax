import { sortObject } from 'rambdax'

describe('sortObject', () => {
  it('happy', () => {
    const predicate = (propA: string, propB: string) => propA > propB ? -1 : 1
    const input = {a: 1, b: 2, c: 3}
    const result = sortObject(predicate, input)
    const resultA = sortObject<number>(predicate)(input)
    result // $ExpectType { [keyOutput: string]: number; }
    resultA // $ExpectType { [keyOutput: string]: number; }
  });
});
 