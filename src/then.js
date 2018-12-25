export function then(afterResolve, toResolve){
  if (arguments.length === 1){
    return toResolveHolder => then(afterResolve, toResolveHolder)
  }

  return new Promise(resolve => {
    toResolve.then(result => resolve(afterResolve(result)))
  })
}
