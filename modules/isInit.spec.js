import isInit from './isInit'

/**
 * TODO
 * isInit can be used to initialize with sets of schemas
 */
 isInit()

const schemaA = {a: 'number', 'b?': 'string'} 
const schemaB = {c: 'object', d: [schemaA]} 
const schemaC = {e: {f: schemaA, f1: 'boolean'}, h: {g: 'array'}} 

const arrayArray = {foo: [[1], [2]], t: ['array'], f: ['number']}
const number = {foo: 'foo', t: 'string', f: ['string']}
const numberArray = {foo: [1, 2], t: ['number'], f: ['string']}
const string = {foo: 'foo', t: 'string', f: ['string']}
const stringArray = {foo: ['foo', 'bar'], t: ['string'], f: ['number']}
const schemaA1 = {foo: {a:1}, t: schemaA, f: schemaB}
const schemaA2 = {foo: {a:1, b: 'bar'}, t: schemaA, f: schemaB}
const schemaA3 = {foo: {a:1, b: 2}, t: 'object', f: schemaA}
const schemaB1 = {
  foo: {
    c:{}, 
    d: [schemaA1.foo, schemaA2.foo]
  }, 
  t: schemaB, 
  f: schemaA
}
const schemaB2 = {
  foo: {
    c:{}, 
    d: [schemaA1.foo, schemaA2.foo, schemaA3.foo]
  }, 
  t: 'object', 
  f: schemaB
}
const schemaC1 = {
  foo: {
    e: {f: {a:1}, f1: true},
    h: {g: [2]}  
  },
  t: schemaC,
  f: schemaA,
}
const objectArray = {
  foo: [{a:1}, {b:2}, {}],
  t:'object',
  f: 'array'
}
const fn1 = {foo: () => {}, t:'function', f:'object'}
const fn2 = {foo: [() => {}, () =>{}], t:['function'], f:'object'}
const conditional = {foo: 5, t: x => x > 2, f:x => x > 10}
const regex = {foo: 'foo', t: /fo/, f:/ba/}
const data = [
  {fn1},
  {fn2},
  {conditional},
  {regex},
  {schemaA1},
  {schemaA2},
  {schemaA3},
  {schemaB1},
  {schemaB2},
  {schemaC1},
  {arrayArray},
  {number},
  {numberArray},
  {string},
  {stringArray},
]

describe('isInit', () => {
  data.forEach(x => {
    const [tag] = Object.keys(x) 
    test(`${tag} - true`, () => {
      expect(x[tag].foo.is(x[tag].t)).toBeTruthy()
    })
    test(`${tag} - false`, () => {
      expect(x[tag].foo.is(x[tag].f)).toBeFalsy()
    })
  })
})


test('null throws', () =>{
  try{
    expect(null.is('string')).toBe(2)
  }catch(err){
    expect(err).toBeInstanceOf(Error)
  }
})

test('undefined throws', () =>{
  try{
    expect(undefined.is('string')).toBe(2)
  }catch(err){
    expect(err).toBeInstanceOf(Error)
  }
})