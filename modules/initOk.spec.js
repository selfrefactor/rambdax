import {data} from './isInit.spec'
import initOk from './initOk'

test('', () =>{
  const what = 1
  const followRules = 'number'

  const result = initOk(what,followRules)
  const expectedResult = true

  expect(
    result
  ).toEqual(expectedResult)
})