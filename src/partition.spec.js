import { partition } from './partition'

test('with list', () =>{
  const rule = (x, i) => {
    expect(
      typeof i
    ).toBe('number')
    
    return x > 2
  }
  const list = [1,2,3,4]

  const result = partition(rule,list)
  const expectedResult = [[3,4], [1,2]]

  expect(
    result
  ).toEqual(expectedResult)
})

test('with object', () =>{
  const rule = (value, prop) => {
    expect(
      typeof prop
    ).toBe('string')

    return value > 2
  }
  const hash = {a: 1, b: 2, c: 3, d: 4}

  const result = partition(rule)(hash)
  const expectedResult = [
    {c:3, d: 4},
    {a:1, b: 2}
  ]

  expect(
    result
  ).toEqual(expectedResult)
})