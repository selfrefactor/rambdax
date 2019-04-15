export let logHolder = []
let logFlag = true
let pushFlag = false

export function logInit(logInput = {}){
  if (logInput.logFlag === false) logFlag = false
  if (logInput.pushFlag) pushFlag = true

  logHolder = []
}

export function log(...inputs){
  if (pushFlag) logHolder.push(inputs)
  if (!logFlag) return

  console.log(...inputs)
}
