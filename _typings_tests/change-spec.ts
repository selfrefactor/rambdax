import { change } from 'rambdax'

describe('change', () => {
  it('happy', () => {
    const result = change(
      {a: {b: 'foo'}},
      'a.b',
      true
    ); 
    result // $ExpectType object
  });

  it('with declared types', () => {
    interface Input {
      a: {b: string}
    }
    interface Output {
      a: {b: boolean}
    }
    const result = change<Input, Output>(
      {a: {b: 'foo'}},
      'a.b',
      true
    ); 
    result // $ExpectType Output
  });
});
