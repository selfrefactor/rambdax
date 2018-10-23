import { omit } from './rambda/omit'
import { template } from './template'
import { headObject } from './headObject'
import { ok } from './ok'

const evaluationsSchema = { label : 'string' }

export function runTests(input){
  const pass = ok(input)({
    testSuite   : 'string',
    evaluations : [ evaluationsSchema ],
  })

  if (describe === undefined || !pass){
    throw new Error('R.runTests.init')
  }
  try {
    const {
      testSuite,
      evaluations,
      data,
    } = input
    
    describe(testSuite, () => {
      evaluations.forEach(singleEvaluation => {
        data.forEach(dataInstance => {
          const {
            prop: tag,
            value: x,
          } = headObject(dataInstance)
          const { value: evaluationFunction } = headObject(
            omit('label', singleEvaluation)
          )

          const label = template(
            singleEvaluation.label,
            { tag }
          )

          test(label, () => {
            evaluationFunction(x)
          })
        })
      })
    })

  } catch (err) {
    console.log(err)
    throw new Error('R.runTestsCatch')
  }

}
