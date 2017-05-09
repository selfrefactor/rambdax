const R = require("./rambdax")
const Ramda = require("ramda")
const Benchmark = require("benchmark")
const benchmarks = require("beautify-benchmark")

const numArr = [0,1,2,3,4]
const obj = {a:1,b:2}

const options = {}

const all = new Benchmark.Suite
options.all = 0

if (options.all) {
  const fn = val => val > -1
  all.add("Rambdax.all", () => {
    R.all(fn, numArr)
  })
  .add("Ramda", () => {
    Ramda.all(fn, numArr)
  })
  .on("cycle", event => {
    benchmarks.add(event.target)
  })
  .on("complete", () => {
    benchmarks.log()
  })
  .run()
}

const allPass = new Benchmark.Suite
options.allPass = false

if (options.allPass) {
  const conditionArr = [
    val => val.a === 1,
    val => val.b === 2,
    ]
  allPass.add("Rambdax.all", () => {
    R.allPass(conditionArr, obj)
  })
  .add("Ramda", () => {
    Ramda.allPass(conditionArr, obj)
  })
  .on("cycle", event => {
    benchmarks.add(event.target)
  })
  .on("complete", () => {
    benchmarks.log()
  })
  .run()
}
