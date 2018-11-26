import { intersection } from './intersection'

const foo = [0, 1, 2, 4, 5]
const bar = [0, 3, 4]

test('', () => {
  const result = intersection(foo, bar)

  const expectedResult = [0, 4]

  expect(result).toEqual(expectedResult)
})

test('curry', () => {
  const result = intersection(foo)(bar)

  const expectedResult = [0, 4]

  expect(result).toEqual(expectedResult)
})
