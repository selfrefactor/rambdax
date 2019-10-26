import { omit } from '../rambda/omit'
import { map } from '../rambda/map'
import { equals } from '../rambda/equals.js'
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
      const keys = Object.keys(x)
      const len = keys.length
      if (len === 1) return true
      if (len === 2 && typeof x.label === 'string') return true
      if (len === 2 && keys.includes('match')) return true
      if (len === 3 && keys.includes('match') && typeof x.label === 'string') return true

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
    const keys = Object.keys(x)
    const len = keys.length

    if (len === 1){
      const { prop } = headObject(x)

      return TEST_MODES.includes(prop) ?
        x :
        { ok : x }
    }
    if (len === 2 && keys.includes('label')){

      const { prop } = headObject(omit('label', x))

      return TEST_MODES.includes(prop) ?
        x :
        { ok : x }
    }

    if (len === 2 && keys.includes('match')){

      const { prop } = headObject(omit('match', x))

      return TEST_MODES.includes(prop) ?
        x :
        { ok : x }
    }

    if (len === 3 && keys.includes('match') && keys.includes('label')){

      const { prop } = headObject(omit('match,label', x))

      return TEST_MODES.includes(prop) ?
        x :
        { ok : x }
    }

    return { ok : x }
  }
)

export function runTests(input, optionsInput = {}){
  const options = {
    logFlag : false,
    async   : false,
    ...optionsInput,
  }

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
      parseData(data).forEach(dataInstanceInput => {
        const keys = Object.keys(dataInstanceInput)
        const withAsync = options.async
        const withLabel = keys.includes('label')
        const withMatch = keys.includes('match')
        const dataInstance = withLabel || withMatch ?
          omit('label,match', dataInstanceInput) :
          dataInstanceInput

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
          dataInstanceInput.label :
          `${ testMode }${ appendLabel }`

        if (testMode === 'ok' && !withMatch && !withAsync){
          test(testLabel, () => {
            const result = fn(x)
            if (options.logFlag) console.log({
              result,
              testLabel,
            })

            expect(result).toBeTruthy()
          })
        }

        if (testMode === 'ok' && !withMatch && withAsync){
          test(testLabel, async () => {
            const result = await fn(x)
            if (options.logFlag) console.log({
              result,
              testLabel,
            })

            expect(result).toBeTruthy()
          })
        }

        if (testMode === 'ok' && withMatch && !withAsync){
          test(testLabel, () => {
            const result = fn(x)
            if (options.logFlag) console.log({
              result,
              match : dataInstanceInput.match,
              testLabel,
            })

            expect(
              equals(result, dataInstanceInput.match)
            ).toBeTruthy()
          })
        }

        /*
          TODO handle long timeout
        */
        if (testMode === 'ok' && withMatch && withAsync){
          test(testLabel, async () => {
            const result = await fn(x)
            if (options.logFlag) console.log({
              result,
              match : dataInstanceInput.match,
              testLabel,
            })

            expect(
              equals(result, dataInstanceInput.match)
            ).toBeTruthy()
          })
        }

        if (testMode === 'fail' && !withMatch && !withAsync){
          test(testLabel, () => {
            const result = fn(x)
            if (options.logFlag) console.log({
              result,
              testLabel,
            })

            expect(result).toBeFalsy()
          })
        }

        if (testMode === 'fail' && !withMatch && withAsync){
          test(testLabel, async () => {
            const result = await fn(x)
            if (options.logFlag) console.log({
              result,
              testLabel,
            })

            expect(result).toBeFalsy()
          })
        }

        if (testMode === 'fail' && withMatch && !withAsync){
          test(testLabel, () => {
            const result = fn(x)
            if (options.logFlag) console.log({
              result,
              match : dataInstanceInput.match,
              testLabel,
            })

            expect(
              equals(result, dataInstanceInput.match)
            ).toBeFalsy()
          })
        }

        if (testMode === 'fail' && withMatch && withAsync){
          test(testLabel, async () => {
            const result = await fn(x)
            if (options.logFlag) console.log({
              result,
              match : dataInstanceInput.match,
              testLabel,
            })

            expect(
              equals(result, dataInstanceInput.match)
            ).toBeFalsy()
          })
        }

        if (testMode === 'danger' && !withMatch && !withAsync){
          test(testLabel, () => {
            if (options.logFlag) console.log({
              x,
              testLabel,
            })

            expect(
              () => fn(x)
            ).toThrow()
          })
        }

        if (testMode === 'danger' && !withMatch && withAsync){
          test(testLabel, async () => {
            if (options.logFlag) console.log({
              x,
              testLabel,
            })

            try {
              await fn(x)
              expect('danger should throw but it didn\'t').toBe('')

            } catch (error){
              expect('danger should throw and it did').toBe('danger should throw and it did')
            }
          })
        }

        if (testMode === 'danger' && withMatch && !withAsync){
          test(testLabel, () => {
            if (options.logFlag) console.log({
              x,
              testLabel,
              match : dataInstanceInput.match,
            })

            expect(
              () => fn(x)
            ).toThrow(dataInstanceInput.match)
          })
        }

        if (testMode === 'danger' && withMatch && withAsync){
          test(testLabel, async () => {
            if (options.logFlag) console.log({
              x,
              testLabel,
              match : dataInstanceInput.match,
            })

            try {
              await fn(x)
              expect('danger test mode should throw but it didn\'t').toBe('')
            } catch (error){
              expect(error).toEqual(dataInstanceInput.match)
            }
          })
        }
      })
    })
  } catch (err){
    console.log(err)
    throw new Error('R.runTestsCatch')
  }
}
