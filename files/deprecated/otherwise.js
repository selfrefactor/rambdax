export function otherwise(fallback, toResolve){
  if (arguments.length === 1){
    return toResolveHolder => otherwise(fallback, toResolveHolder)
  }

  return new Promise(resolve => {
    toResolve.then(resolve).catch(e => resolve(fallback(e)))
  })
}
