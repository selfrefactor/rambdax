async function mapAsyncFn(fn,arr){
  try{
    const willReturn = []
    for(const a of arr){
      willReturn.push(await fn(a))
    }
    return willReturn  
  }catch(err){
    // throw new Error(err)
    throw err
  }
  
}

function mapAsync(fn,arr){
  if(arr === undefined){
    return holder => new Promise((resolve,reject) =>{
      mapAsync(fn,holder).then(resolve).catch(reject)
    })
  }
  return new Promise((resolve,reject) =>{
    mapAsyncFn(fn,arr).then(resolve).catch(reject)  
  })
}

module.exports = mapAsync