export let logHolder = []
let shouldLog = false
let shouldPush = false
let initPassed = false

function init(){
  if(initPassed) return
  initPassed = true

  if(!process) return
  if(!process.env) return

  if(process.env.RAMBDAX_LOG === 'true'){
    shouldLog = true
  }
}

export function logInit({ logFlag = true, pushFlag = false } = {}){
  shouldLog = Boolean(logFlag)
  shouldPush = Boolean(pushFlag)

  logHolder = []
  initPassed = true
}

export function log(...inputs){
  init()
  if (shouldPush) logHolder.push(inputs)
  if (!shouldLog) return

  console.log(...inputs)
}
