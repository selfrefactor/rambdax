import { piped } from './piped'
import { add } from './rambda/add'
import { filter } from './rambda/filter'
import { map } from './rambda/map'

test('', () => {
  const result = piped(
    [ 1, 2, 3 ],
    filter(x => x > 1),
    map(x => x * 10),
    map(add(1))
  )
  const expectedResult = [ 21, 31 ]

  expect(result).toEqual(expectedResult)
})
