import { partitionMany } from './partitionMany.js'

test('happy', () => {
  const fn = x => {
    if (x.b) return 0
    if (x.a) return 1

    return 2
  }
  const result = partitionMany(fn, [ { a : 1 }, {
    a : 1,
    b : 2,
  }, { d : 3 }, { r : 3 } ])
  expect(result).toMatchSnapshot()
})
