module.exports = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve("RAMBDAX_DELAY")
  }, ms)
})
