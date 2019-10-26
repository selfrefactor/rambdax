import { omit } from '../rambda/omit'
import { delay } from '../delay'
import { runTests } from './runTests'

const testFn = x => typeof x.a === 'number'

const testData = [
  { a : 3 },
  {
    ok    : { a : 1 },
    label : 'happy',
    match : true,
  },
  { fail : { a : true } },
  { fail : { b : true } },
  { danger : null },
]

const runTestsInput = {
  label : 'foo',
  data  : testData,
  fn    : testFn,
}

runTests(runTestsInput)

// test('undefined throws', () => {
//   expect(() => runTests()).toThrow()
// })

// test('missing `testSuite`', () => {
//   expect(() =>
//     runTests(omit('testSuite', runTestsInput))
//   ).toThrow()
// })

//   whenTrue : async x => {
//     const result = await delay(x.foo)

//     expect(result).toBe(x.t)
//   },
