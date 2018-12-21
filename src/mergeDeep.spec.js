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
  const expected = {
    "age": 40, 
    "name": "evilMe",
    "contact": {
      "a": 1, 
      "email": "baz@example.com"
    }, 
    songs: {title: 'Remains the same'}
  }

  expect(result).toEqual(expected)
  expect(curryResult).toEqual(expected)
})

test('Ramda compatible test 1', () => {
  var a = { w: 1, x: 2, y: { z: 3 }};
  var b = { a: 4, b: 5, c: { d: 6 }};
  const result = mergeDeep(a, b)
  const expected = { w: 1, x: 2, y: { z: 3 }, a: 4, b: 5, c: { d: 6 }}
  
  expect(result).toEqual(expected)
})

test('Ramda compatible test 2', () => {
  var a = { a: { b: 1, c: 2 }, y: 0 };
  var b = { a: { b: 3, d: 4 }, z: 0 };
  const result = mergeDeep(a, b)
  const expected = { a: { b: 3, c: 2, d: 4 }, y: 0, z: 0 }
  
  expect(result).toEqual(expected)
})

test('Ramda compatible test 3', () => {
  var a = { w: 1, x: { y: 2 }};
  var result = mergeDeep(a, { x: { y: 3 }});
  const expected = { w: 1, x: { y: 3 }}
  expect(result).toEqual(expected)
})
