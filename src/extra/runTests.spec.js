import { omit } from '../rambda/omit'
import { delay } from '../delay'
import { runTests } from './runTests'

const testFn = x => typeof x.a === 'number'

const testData = [
  { a : 3 },
  {
    ok    : { a : 1 },
    label : 'happy',
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

// runTests(runTestsInput)

// const singleCaseAsync = {
//   foo : 1,
//   t   : 'RAMBDAX_DELAY',
//   f   : 2,
// }

// const whenTrueAsync = {
//   label    : '{{tag}} hey hey what can I do',
//   whenTrue : async x => {
//     const result = await delay(x.foo)

//     expect(result).toBe(x.t)
//   },
// }

// const runTestsInputAsync = {
//   testSuite   : 'foo',
//   data        : [ { singleCaseAsync } ],
//   evaluations : [ whenTrueAsync ],
// }

// runTests(runTestsInputAsync)

// const withGetEvaluations = {
//   testSuite   : 'foo',
//   data        : [ { singleCase } ],
//   evaluations : getEvaluations({
//     label : 'BAR',
//     fn    : x => typeof x,
//   }),
// }

// runTests(withGetEvaluations)

// const evaluations = [
//   getPositiveEvaluation({
//     label : 'positive',
//     fn    : x => x > 0,
//   }),
//   getNegativeEvaluation({
//     label : 'negative',
//     fn    : x => typeof x === 'boolean',
//   }),
// ]

// const simpleCase = { foo : 1 }

// const withGetPositiveEvaluation = {
//   testSuite : 'foo',
//   data      : [ { simpleCase } ],
//   evaluations,
// }

// runTests(withGetPositiveEvaluation)
