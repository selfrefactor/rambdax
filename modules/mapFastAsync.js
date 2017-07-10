async function mapFastAsyncFn(fn,arr){
  try{
    const promised = arr.map(a => fn(a))
    return await Promise.all(promised)
  }catch(err){
    throw err
  }
  
}

function mapFastAsync(fn,arr){
  if(arr === undefined){
    return holder => new Promise((resolve,reject) =>{
      mapFastAsync(fn,holder).then(resolve).catch(reject)
    })
  }
  return new Promise((resolve,reject) =>{
    mapFastAsyncFn(fn,arr).then(resolve).catch(reject)  
  })
}

module.exports = mapFastAsync