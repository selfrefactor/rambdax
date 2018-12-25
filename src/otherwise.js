export function otherwise(x, y){
  if (arguments.length === 1){
    return yHolder => otherwise(x, yHolder)
  }

  return new Promise(resolve => {
    y.then(resolve).catch(e => resolve(x(e)))
  })
}
