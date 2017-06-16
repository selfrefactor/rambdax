const R = require("./rambdax")

const stringify = a => {
  if(R.type(a)==="String"){
    return a
  }
  let willReturn = ""
  if(R.type(a)==="Array"){
    a.map(val=>{
      willReturn += `${stringify(val)}_`
    })
    return R.init(willReturn)
  }else if(R.type(a)==="Object"){
    for(const prop in a){
      willReturn += `${prop}_${stringify(a[prop])}_`
    }
    return R.init(willReturn)
  }else if(["Function","Async"].includes(R.type(a))){
    return R.replace(/\s/g,"_",R.take(15,a.toString()))
  }
  return `${a}`
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
}

debug()
