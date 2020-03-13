export function resolve(afterResolve, toResolve){
  if (arguments.length === 1){
    return toResolveHolder => resolve(afterResolve, toResolveHolder)
  }

  return new Promise(res => {
    toResolve.then(result => res(afterResolve(result)))
  })
}
