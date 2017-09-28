import {map} from 'rambda'

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

export default async function resolve (input) {
  try {
    const promised = map(
      a => wrapper(a),
      input
    )

    return await Promise.all(promised)
  } catch (err) {
    console.log(err)
  }
}
