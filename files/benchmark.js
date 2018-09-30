const assert = require('assert')
const Benchmark = require('benchmark')
const benchmarks = require('beautify-benchmark')
const R = require('../dist/rambdax.js')

const suite = new Benchmark.Suite()

const suiteToRun = suite
  .add('plain', () => {
    base()
  })
  .add('current', () => {
    base(R.memoize)
  })
  .add('next', () => {
    base(memoizeNext)
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

  const memoized = memoizeFn ? memoizeFn(fn) : fn
  const expected = memoizeFn ? 2 : 5
  
  memoized(1, 2)
  memoized(1, 2)
  memoized(1, 2)
  memoized(2, 2)
  memoized(1, 2)
  assert.ok(counter <= expected)
}
