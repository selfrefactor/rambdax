export function findInObject(fn,obj){
  let willReturn = {fallback: true}
  
  Object.entries(obj).map(([prop, value])=>{
    if(willReturn.fallback){
      if(fn(value, prop)){
        willReturn = {prop, value}
      }
    }
  })

  return willReturn
}