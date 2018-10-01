import { omit } from 'rambda'
import template from './template'
import headObject from './headObject'
import isType from './isType'
import ok from './ok'
console.log(headObject)
const evaluationsSchema = {
  label: 'string'
}
/**
 * TODO
 * any,function can be supported
 */
const dataSchemaX = {
  foo: 'any',
  t: 'function',
  f: 'function'
}

export default function runTests(input){
  const pass = ok(input)({
    testSuite: 'string',
    evaluations: [evaluationsSchema],
  })
  
  if(describe === undefined || !pass){
    throw new Error('R.runTests.init')
  }
  try {
    const {
      testSuite,
      evaluations,
      data
    } = input
    describe(testSuite, () => {
      evaluations.forEach(singleEvaluation => {
        data.forEach(dataInstance => {
          const {
            prop: tag,
            value: x
          } = headObject(dataInstance)
          const {
            value: evaluationFunction
          } = headObject(
            omit('label', singleEvaluation)
          )
          
          const label = template(
            singleEvaluation.label, 
            {tag}
          )
     
          test(label, () => {
            evaluationFunction(x)
          })
        })
      })
    })

  } catch (err) {
      console.log(err);
      throw new Error(`R.runTestsCatch`)    
  }
  
}