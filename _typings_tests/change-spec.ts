import { change } from 'rambdax'

describe('change', () => {
  it('number', () => {
    const result = change(
      {a: {b: 'foo'}},
      'a.b',
      true
    ); 
    result // $ExpectType object
  });
});
