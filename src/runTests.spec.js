import { omit } from './rambda/omit'
import { delay } from './delay'
import { runTests } from './runTests'

const whenTrue = {
  label: '{{tag}} my sweet lord',
  whenTrue: x => {
    expect(typeof x.foo).toBe(x.t)
  },
}
const whenFalse = {
  label: '{{tag}} under my thumb',
  whenFalse: x => {
    expect(typeof x.foo).not.toBe(x.f)
  },
}
const singleCase = {
  foo: 1,
  t: 'number',
  f: 'boolean',
}

const runTestsInput = {
  testSuite: 'foo',
  data: [{ singleCase }],
  evaluations: [whenTrue, whenFalse],
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
  foo: 1,
  t: 'RAMBDAX_DELAY',
  f: 2,
}

const whenTrueAsync = {
  label: '{{tag}} hey hey what can I do',
  whenTrue: async x => {
    const result = await delay(x.foo)

    expect(result).toBe(x.t)
  },
}

const runTestsInputAsync = {
  testSuite: 'foo',
  data: [{ singleCaseAsync }],
  evaluations: [whenTrueAsync],
}

runTests(runTestsInputAsync)
