import { isValidAsync, delay } from 'rambdax'

const simplePredicate = async (x: any) => {
  await delay(100)
  // return x
  return x > 5
}

const input = {
  a: 1,
  b: 7,
  c: 9,
}
const schema = {
  a: Number,
  b: simplePredicate,
  c: simplePredicate
}

describe('isValid', () => {
  it('happy', async () => {
    const result = await isValidAsync({input, schema})
    
    result // $ExpectType boolean
  });
});
 