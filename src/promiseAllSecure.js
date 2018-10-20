import { map } from './rambda/map'

const promiseAllSecureWrapper = promise => new Promise(res => {
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

export async function promiseAllSecure(input) {
  try {
    const promised = map(
      a => promiseAllSecureWrapper(a),
      input
    )

    return await Promise.all(promised)
  } catch (err) {
    console.log(err)
  }
}
