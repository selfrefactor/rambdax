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
// runTests(runTestsInput)

const withObjectFn = x => ({
  ...x,
  foo : x.bar + 1,
})

const withObjectData = [
  {
    ok    : { bar : 1 },
    match : {
      bar : 1,
      foo : 2,
    },
  },
  {
    ok    : { bar : 1 },
    match : {
      bar : 1,
      foo : 2,
    },
    label : 'dancing days',
  },
]

const withObject = {
  label : 'with.object',
  data  : withObjectData,
  fn    : withObjectFn,
}
// runTests(withObject, {logFlag: false})

const withAsyncFn = async x => {
  await delay(100)
  if(!x) throw new Error('foo.error')

  return x + 1
}

const withAsyncData = [
  // {
  //   ok    : 1,
  //   match : 2,
  // },
  // {
  //   fail  : 1,
  //   match : 3,
  //   label : 'tea for one',
  // },
  // { danger : null },
  {
    danger : null,
    match  : 'foo.error',
  },
]

const withAsync = {
  label : 'works with async',
  fn    : withAsyncFn,
  data  : withAsyncData,
}

runTests(withAsync, { async : true })

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
