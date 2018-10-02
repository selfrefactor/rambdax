import {data} from './isInit.spec'
import {okInit} from './okInit'

test.skip('', () =>{
  const what = 1
  const followRules = 'number'

  const result = initOk(what,followRules)
  const expectedResult = true

  expect(
    result
  ).toEqual(expectedResult)
})