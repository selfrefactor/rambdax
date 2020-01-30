import { isValid } from 'rambdax'

const simplePredicate = async (x: any) => {
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
  it('happy', () => {
    const result = isValid({input, schema})
    
    result // $ExpectType boolean
  });
});
 