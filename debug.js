const R = require("./rambdax")

const stringify = a => {
  if(R.type(a)==="String"){
    return a
  }else if(["Function","Async"].includes(R.type(a))){
    const compacted = R.replace(/\s{1,}/g," ",a.toString())
    return R.replace(/\s/g,"_",R.take(15,compacted))
  }
  return JSON.stringify(a)
}

const delay = ms => new Promise(resolve => {
  setTimeout(resolve, ms)
})

const debug = async() => {
  let a = [1,2,3]
  console.log(stringify(a))   
  a = [1,{a:1},3]
  console.log(stringify(a)) 
  a = [1,{a:[1,2,null,a => a]},3]
  console.log(stringify(a))
  console.log(JSON.stringify(a))
}

debug()
