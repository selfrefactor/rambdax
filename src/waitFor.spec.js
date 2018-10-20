import { waitFor } from './waitFor'

test('', () =>{
  const condition = 'fn'
  const howLong = 2000
  const loops = ''

  const result = waitFor(condition,howLong,loops)
  const expectedResult = 5

  expect(
    result
  ).toEqual(expectedResult)
})