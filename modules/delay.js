module.exports = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve("RAMBDAX_DELAY")
  }, ms)
})
