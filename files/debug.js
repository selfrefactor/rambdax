const {
  match,
  init,
  replace,
  dropLast,
} = require('rambda')
const {readFileSync} = require('fs')
const {resolve} = require('path')
const {rambdaREPL} = require('rambda-repl')

const MARKER_SOURCE = '[Source]'
const MARKER_METHOD = '####'

function getMethod(sourceLink){
  const baseURL = '(https://github.com/selfrefactor/rambda/tree/master/modules/'
  const fileName = replace(
    baseURL,
    '',
    sourceLink
  )
  
  return dropLast(4, fileName.trim())
}

function getContentWithREPL(input){
  const [,sourceLink] = input.split(MARKER_SOURCE)
  const method = getMethod(sourceLink)
  let a
}

void function name() {
  const filePath = resolve(
    __dirname,
    '../README.md'
  )
  const content = readFileSync(filePath).toString()

  const contentWithREPL = content.split(MARKER_METHOD).map(singleMethod => {
    if(singleMethod.includes(MARKER_SOURCE)){
      return getContentWithREPL(singleMethod)
    }else{
      return singleMethod
    }
  })
  let aa
}()