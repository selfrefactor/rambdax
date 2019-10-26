import { runTests, getEvaluations } from 'rambdax'

const numberCase = {
  foo: 1,
  t: 'number',
  f: 'boolean',
}
const stringCase = {
  fo: '123',
  t: 'string',
  f: 'boolean',
}

describe('runTests', () => {
  it('data property fallback to object', () => {
    const evaluations = getEvaluations({
      label: 'BAR',
      fn: (x:any) => typeof x
    })

    const data = [
      {numberCase},
      {stringCase},
    ]
    const result = runTests({
      testSuite: 'Foo',
      data,
      evaluations
    }); 
    result // $ExpectType any
  });
});
