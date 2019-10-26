import { omit } from '../rambda/omit'
import { delay } from '../delay'
import { runTests, getEvaluations, getPositiveEvaluation, getNegativeEvaluation } from './runTests'

const whenTrue = {
  label    : '{{tag}} - when true',
  whenTrue : x => {
    expect(typeof x.foo).toEqual(x.t)
  },
}
const whenFalse = {
  label     : '{{tag}} - when false',
  whenFalse : x => {
    expect(typeof x.foo).not.toEqual(x.f)
  },
}

const singleCase = {
  foo : 1,
  t   : 'number',
  f   : 'boolean',
}

const runTestsInput = {
  testSuite   : 'foo',
  data        : [ { singleCase } ],
  evaluations : [ whenTrue, whenFalse ],
}

test('undefined throws', () => {
  expect(() => runTests()).toThrow()
})

test('missing `testSuite`', () => {
  expect(() =>
    runTests(omit('testSuite', runTestsInput))
  ).toThrow()
})

runTests(runTestsInput)

const singleCaseAsync = {
  foo : 1,
  t   : 'RAMBDAX_DELAY',
  f   : 2,
}

const whenTrueAsync = {
  label    : '{{tag}} hey hey what can I do',
  whenTrue : async x => {
    const result = await delay(x.foo)

    expect(result).toBe(x.t)
  },
}

const runTestsInputAsync = {
  testSuite   : 'foo',
  data        : [ { singleCaseAsync } ],
  evaluations : [ whenTrueAsync ],
}

runTests(runTestsInputAsync)

const withGetEvaluations = {
  testSuite   : 'foo',
  data        : [ { singleCase } ],
  evaluations : getEvaluations({
    label : 'BAR',
    fn    : x => typeof x,
  }),
}

runTests(withGetEvaluations)

const evaluations = [
  getPositiveEvaluation({
    label: 'positive',
    fn: x => typeof x
  }),
  getNegativeEvaluation({
    label: 'negative',
    fn: x => typeof x
  }),
]

const withGetPositiveEvaluation = {
  testSuite   : 'foo',
  data        : [ { singleCase } ],
  evaluations,
}

runTests(withGetPositiveEvaluation)
