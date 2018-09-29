const Benchmark = require('benchmark')
const benchmarks = require('beautify-benchmark')
const R = require('../dist/rambdax.cjs')

const suite = new Benchmark.Suite()

const suiteToRun = suite
  .add('current', () => {
    const a = 1
  })
  .add('next', () => {
    const a = 1
  })

suiteToRun
  .on('cycle', ({target}) => benchmarks.add(target))  
  .on('complete', () => benchmarks.log()) 
  .run()