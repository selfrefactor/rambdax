import { compact } from 'rambdax'

const arr = [
  1,
  null,
  undefined,
  false,
  '',
  ' ',
  () => {},
  'foo',
  {},
  [],
  [ 1 ],
  /\s/g,
]

describe('compact', () => {
  it('happy', () => {
    const result = compact(arr)

    result // $ExpectType unknown[]
  });
});
 