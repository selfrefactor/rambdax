export let logHolder = []
let shouldLog = true
let shouldPush = false

export function logInit({ logFlag = true, pushFlag = false } = {}){
  shouldLog = Boolean(logFlag)
  shouldPush = Boolean(pushFlag)

  logHolder = []
}

export function log(...inputs){
  if (shouldPush) logHolder.push(inputs)
  if (!shouldLog) return

  console.log(...inputs)
}
