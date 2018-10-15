export function findInObject(fn, obj){
  if (arguments.length === 1){
    return objHolder => findInObject(fn, objHolder)
  }
  let willReturn = { fallback : true }

  Object.entries(obj).map(([ prop, value ]) => {
    if (willReturn.fallback){
      if (fn(value, prop)){
        willReturn = {
          prop,
          value,
        }
      }
    }
  })

  return willReturn
}
