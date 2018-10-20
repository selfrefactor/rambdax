import { runTests } from './runTests'
import { waitFor } from './waitFor'
import { delay } from './delay'

const firstExample = {
  foo: x => {
    let counter = 0
    return new Promise(resolve => {
      counter++
      delay(100).then(()=>{
        if(counter> x){
          return resolve(true)
        }
        resolve(false)
      })
    })
  },
  t: 3,
  f:30
}


const trueEvaluation = async x => {
  const result = await waitFor(x.foo, 1000)(x.t)
  
  expect(result).toBe(true)
}

const falseEvaluation = async x => {
  const result = await waitFor(x.foo, 1000)(x.f)
  
  expect(result).toBe(false)
}

const testInput = {
  testSuite: 'waitFor',
  data:[{firstExample}],
  evaluations:[
    {
      label : '{{tag}} - true',
      trueEvaluation,
    },
    {
      label : '{{tag}} - false',
      falseEvaluation,
    }
  ]
}

runTests(testInput)

// test('', () =>{
//   const condition = 'fn'
//   const howLong = 2000
//   const loops = ''

//   const result = waitFor(condition,howLong,loops)
//   const expectedResult = 5

//   expect(
//     result
//   ).toEqual(expectedResult)
// })