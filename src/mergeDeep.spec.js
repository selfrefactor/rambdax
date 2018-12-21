import { mergeDeep } from './mergeDeep'

const aBase = { 
  name: 'evilMe', 
  age: 10, 
  contact: { 
    a: 1,
    email: 'foo@example.com' 
  }
}
const bBase = { 
  age: 40, 
  contact: { email: 'baz@example.com' },
  songs: {title: 'Remains the same'}
}

test('', () =>{
  const result = mergeDeep(aBase,bBase)
  const curryResult = mergeDeep(aBase)(bBase)
  const expectedResult = {
    "age": 40, 
    "name": "evilMe",
    "contact": {
      "a": 1, 
      "email": "baz@example.com"
    }, 
    songs: {title: 'Remains the same'}
  }

  expect(result).toEqual(expectedResult)
  expect(curryResult).toEqual(expectedResult)
})