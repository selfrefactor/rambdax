import { omit } from 'rambda'
import {runTests} from './runTests'

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
const singleCase = {foo:1, t: 'number', f: 'boolean'}
const runTestsInput = {
  testSuite: 'foo',
  data: [{singleCase}],
  evaluations: [whenTrue,whenFalse]
}

test('undefined throws', () => {
  expect(() => runTests()).toThrow()
})

test('missing `testSuite`', () => {
  expect(() => runTests(
    omit('testSuite', runTestsInput)
  )).toThrow()
})

runTests(runTestsInput)
