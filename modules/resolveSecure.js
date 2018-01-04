import { map } from 'rambda'

const resolveSecureWrapper = promise => new Promise(res => {
  promise.then(result => {
    res({
      payload : result,
      type    : 'RESULT',
    })
  }).catch(err => {
    res({
      payload : err,
      type    : 'ERROR',
    })
  })
})

async function resolveSecure (input) {
  try {
    const promised = map(
      a => resolveSecureWrapper(a),
      input
    )

    return await Promise.all(promised)
  } catch (err) {
    console.log(err)
  }
}

export default resolveSecure
