const assert = require('assert')
const Benchmark = require('benchmark')
const benchmarks = require('beautify-benchmark')
const R = require('../dist/rambdax.cjs')

const suite = new Benchmark.Suite()

const suiteToRun = suite
  .add('plain', () => {
    let counter = 0
    const fn = (a, b) => {
      counter++
      return a + b
    }  

    const memoized = fn
    const expected = 5
    
    memoized(1, 2)
    memoized(1, 2)
    memoized(1, 2)
    memoized(2, 2)
    memoized(1, 2)
    assert.ok(counter <= expected)
  })
  .add('current', () => {
    let counter = 0
    const fn = (a, b) => {
      counter++
      return a + b
    }  

    const memoized = R.memoize(fn)
    const expected = 2
    
    memoized(1, 2)
    memoized(1, 2)
    memoized(1, 2)
    memoized(2, 2)
    memoized(1, 2)
    assert.ok(counter <= expected)
  })
  .add('next', () => {
    let counter = 0
    const fn = (a, b) => {
      counter++
      return a + b
    }  

    const memoized = memoizeNext(fn)
    const expected = 2
    
    memoized(1, 2)
    memoized(1, 2)
    memoized(1, 2)
    memoized(2, 2)
    memoized(1, 2)
    assert.ok(counter <= expected)
  })

suiteToRun
  .on('cycle', ({target}) => benchmarks.add(target))  
  .on('complete', () => benchmarks.log()) 
  .run()

function memoizeNext(fn){
  const cache = new Map()
  return function(inputRaw){
    const input = inputRaw.toString()
    if(!cache.has(input)){
      const result = fn(inputRaw)
      
      cache.set(input, result)
    }
    return cache.get(input)
  }
}

function base(memoizeFn){
  let counter = 0
  const fn = (a, b) => {
    counter++
    return a + b
  }  

  const memoized = memoizeFn ? R.memoize(fn) : fn
  const expected = memoizeFn ? 2 : 5
  
  memoized(1, 2)
  memoized(1, 2)
  memoized(1, 2)
  memoized(2, 2)
  memoized(1, 2)
  assert.ok(counter <= expected)
}
