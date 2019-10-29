import { isAttach } from './isAttach'
import { runTests } from 'helpers'

test('only one initialization', () => {
  expect(isAttach()).toBe(false)
})

isAttach()

const arrayInArray = { ok : [ [ [ 1 ], [ 2 ] ], [ 'array' ] ] }
const numArray = { ok : [ [ 1, 2 ], [ 'number' ] ] }
const fns = [
  { ok : [ () => {}, Function ] },
  { ok : [ [ () => {}, () => {} ], [ 'function' ] ] },
]

const conditional = [
  { ok : [ 5, x => x > 2 ] },
  { fail : [ 5, x => x < 2 ] },
]

const regex = [
  { ok : [ 'foo', String ] },
  { ok : [ 'foo', /fo/ ] },
  { fail : [ 'foo', /ba/ ] },
]

const testData = [
  arrayInArray,
  numArray,
  ...fns,
  ...conditional,
  ...regex,
]

runTests({
  data  : testData,
  label : 'isAttach',
  fn    : ([ x, y ]) => x.is(y),
})

test('null throws', () => {
  try {
    expect(null.is('string')).toBe(2)
  } catch (err){
    expect(err).toBeInstanceOf(Error)
  }
})

test('undefined throws', () => {
  try {
    expect(undefined.is('string')).toBe(2)
  } catch (err){
    expect(err).toBeInstanceOf(Error)
  }
})
