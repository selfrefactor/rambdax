const R = require("rambda")

const wrapper = promise => new Promise(resolve => {
  promise()
  .then(result => {
    resolve({
      type:"result",
      payload:result
    })
  })
  .catch(err =>{
    resolve({
      type:"error",
      payload:err
    })
  })
})

function resolve (promises) {
  return new Promise( res => {
    
  })
}

module.exports = resolve
