import { map } from './rambda/map'
import { add } from './rambda/add'
import { filter } from './rambda/filter'
import { composed } from './composed'

test('', () => {
  const result = composed(
    map(add(1)),
    map(x => x * 10),
    filter(x => x > 1),
    [ 1, 2, 3 ]
  )
  const expectedResult = [ 21, 31 ]

  expect(result).toEqual(expectedResult)
})
