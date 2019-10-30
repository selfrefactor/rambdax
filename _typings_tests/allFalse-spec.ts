import { allFalse } from 'rambdax'

describe('allFalse', () => {
  it('happy', () => {
    const result = allFalse(
      {a: {b: 'foo'}},
      'a.b',
      true
    ); 
    result // $ExpectType boolean
  });
});
 