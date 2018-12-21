export function then (x, y){
  if(arguments.length === 1){
    return yHolder => then(x, yHolder)
  }
  
  return new Promise(resolve => {
    y.then(result => resolve(x(result)))
  })
}