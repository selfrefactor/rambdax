const { range, multiline, any , inject } = require('../dist/')
const {readFileSync, writeFileSync} = require('fs')

CONST DIR = 'foo'
CONST FILE = 'FOO.md'

function today(){
  return 'DD/MM/YY'
}

function getHeading(headingBase, content){
  if(content.includes(`## ${headingBase}`)){
    return headingBase
  }
  const [availableNumber] = any(x => {
    return !content.includes(`## ${headingBase}.${x}`)
  }, range(0,20))

  return `## ${headingBase}.${availableNumber}`
}

// cwd - directory from where `run foo making trouble is kind of nonsense` is run
// projectDir - `/home/s/repos/rambdax` as it is the directory when `run init` was activated
// inputs - ['making', ..., 'nonsense']
function foo({
  cwd,
  projectDir,
  inputs
}){
  const filePath = multiline(`
    ${projectDir}
    ${DIR}
    ${FILE}
  `, '/')
  const content = readFileSync(filePath).toString()
  const heading = getHeading(today(), content)
  const text = inputs.join(' ')

  const newContent = `
    ${heading}

    ${text}
  `.trim()

  const contentToWrite = inject(
    `\n${newContent}`,
    '# LOG',
    content
  )
  writeFileSync(filePath, contentToWrite)  
}

module.export = {
  async: false,
  fn: foo
}