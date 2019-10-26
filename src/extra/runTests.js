import { omit } from '../rambda/omit'
import { map } from '../rambda/map'
import { type } from '../rambda/type'
import { filter } from '../rambda/filter'
import { maybe } from '../maybe'
import { headObject } from '../_internals/headObject'
import { pass as passMethod } from '../pass'

const TEST_MODES = [ 'ok', 'fail', 'danger' ]
const dataPredicate = data => {
  const filtered = filter(
    x => {
      if (type(x) !== 'Object') return true
      if (Object.keys(x).length === 1) return true
      if (Object.keys(x).length === 2 && typeof x.label === 'string') return true

      return false
    },
    data
  )

  return Object.keys(filtered).length === Object.keys(data).length
}

/*
  TODO
  R.isValid Array of object passing predicate
*/

const parseData = map(
  x => {
    if (type(x) !== 'Object') return { ok : x }

    if (Object.keys(x).length === 1){
      const { prop } = headObject(x)

      return TEST_MODES.includes(prop) ?
        x :
        { ok : x }
    }
    if (Object.keys(x).length === 2 && x.label){

      const { prop } = headObject(omit('label', x))

      return TEST_MODES.includes(prop) ?
        x :
        { ok : x }
    }

    return { ok : x }
  }
)

export function runTests(input){
  const pass = passMethod(input)({
    label : 'string',
    data  : dataPredicate,
  })
  if (describe === undefined || !pass){
    throw new Error('R.runTests.init')
  }
  try {
    const { label: suiteLabel, fn, data } = input
    const counters = {
      ok     : -1,
      fail   : -1,
      danger : -1,
    }
    describe(suiteLabel, () => {
      parseData(data).forEach(dataInstanceRaw => {
        const withLabel = Object.keys(dataInstanceRaw).length === 2
        const dataInstance = withLabel ?
          omit('label', dataInstanceRaw) :
          dataInstanceRaw

        const { prop: testMode, value: x } = headObject(dataInstance)

        if (!TEST_MODES.includes(testMode)) return
        if (!withLabel){
          counters[ testMode ] = counters[ testMode ] + 1
        }

        const appendLabel = maybe(
          withLabel,
          '',
          counters[ testMode ] > 0 ? ` - ${ counters[ testMode ] }` : '',
        )

        const testLabel = withLabel ?
          dataInstanceRaw.label :
          `${ testMode }${ appendLabel }`
        
        if (testMode === 'ok'){
          test(testLabel, () => {
            expect(fn(x)).toBeTruthy()
          })
        }

        if (testMode === 'fail'){
          test(testLabel, () => {
            expect(fn(x)).toBeFalsy()
          })
        }
        if (testMode === 'danger'){
          test(testLabel, () => {
            expect(() => fn(x)).toThrow()
          })
        }
      })
    })
  } catch (err){
    console.log(err)
    throw new Error('R.runTestsCatch')
  }
}
