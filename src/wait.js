export function wait(fn) {
  return new Promise(resolve => {
    fn.then(result => resolve([ result ])).catch(e => resolve([ , e ]))
  })
}
