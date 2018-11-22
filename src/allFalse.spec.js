import {allFalse} from './allFalse'
import {runTests} from './runTests'

const OBJ = {c: 1}

const case1 = {
  foo: false,
  t: () => 2 > 10,
  f: () => 2 < 10,
}
const case2 = {
  foo: OBJ.a,
  t: OBJ.b,
  f: OBJ.c,
}

const trueEvaluation = x => {
  expect(allFalse(false, x.foo, x.t)).toBeTruthy()
}

const falseEvaluation = x => {
  expect(allFalse(x.foo, x.f)).toBeFalsy()
}

runTests({
  data: [{case1}, {case2}],
  evaluations: [
    {
      label: '{{tag}} - true',
      trueEvaluation,
    },
    {
      label: '{{tag}} - false',
      falseEvaluation,
    },
  ],
  testSuite: 'allFalse',
})
