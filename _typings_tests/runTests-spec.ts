import { runTests } from 'rambdax'

describe('runTests', () => {
  it('happy', () => {
    const testFn = (x:any) => typeof x.a === 'number'

    const testData = [
      {
        ok    : { a : 1 },
        label : 'happy',
        match : true,
      },
      { fail : { a : true } },
      { fail : { b : true } },
      { danger : null },
      {
        danger : null,
        match  : 'Cannot read property \'a\' of null',
      },
    ]
    
    const runTestsInput = {
      label : 'foo',
      data  : testData,
      fn    : testFn,
    }
    runTests(runTestsInput) 
  });
});
