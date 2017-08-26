const R = require('rambda')

const wrapper = promise => new Promise(resolve => {
  promise.then(result => {
    resolve({
      payload : result,
      type    : 'RESULT',
    })
  }).catch(err => {
    resolve({
      payload : err,
      type    : 'ERROR',
    })
  })
})

async function resolve (input) {
  try {
    const promised = R.map(
      a => wrapper(a),
      input
    )

    return await Promise.all(promised)
  } catch (err) {
    console.log(err)
  }
}

module.exports = resolve
