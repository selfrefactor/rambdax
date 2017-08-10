const R = require("rambda")

const helper = ({ promise, prop }) => new Promise((resolve, reject) => {
  promise.then(result => {
    resolve({
      prop   : prop,
      result : result,
    })
  }).catch(err => {
    reject({
      prop  : prop,
      error : err,
    })
  })
})

function race (promises) {
  return new Promise((resolve, reject) => {
    const props = {}
    const promisedArr = []
    for (const prop in promises) {
      promisedArr.push(helper({
        promise : promises[ prop ],
        prop    : prop,
      }))
    }
    Promise.race(promisedArr)
      .then(result => {
        resolve({ [ result.prop ] : result.result })
      })
      .catch(err => {
        resolve({ [ err.prop ] : err.error })
      })
  })
}

module.exports = race
