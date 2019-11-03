const { all, glue, replace } = require('../../dist/rambdax')
const { rambdaREPL } = require('./rambdaREPL')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const rambdaDocsPath = resolve(__dirname, '../../../rambda/files/README.md')

const ADD_METHOD = '#### add'

const rambdaDocs = readFileSync(rambdaDocsPath).toString()
const [ , fromAddMethod ] = rambdaDocs.split(ADD_METHOD)
const [ rambdaApi ] = fromAddMethod.split('[Source](https://github.com/selfrefactor/rambda/tree/master/src/zipObj.js)')

const MARKER_SOURCE = '[Source]'
const MARKER_CODE = '```'
const MARKER_METHOD = '#### '
const MARKER_METHOD_LINE = `---
#### `

const RAMBDA_DOCS_MARKER = '### RAMBDA_DOCS_MARKER'

let rambdaFlag = false

function getCodeExample(input){
  const [ , code, ..._ ] = input.split(MARKER_CODE)

  return code.trim()
}

function appendTestLink(input){
  const [ method ] = input.match(/.+/)

  if (method.trim() === 'add'){
    rambdaFlag = true
  }

  const link = glue(`
  https://github.com
  selfrefactor
  ${ rambdaFlag ? 'rambda' : 'rambdax' }
  blob
  master
  src
  ${ method }.spec.js
`, '/')

  const testLink = `\n\n[Test](${ link })\n\n`

  return `${ input.trim() }${ testLink }`
}

function getContentWithREPL(input){
  const codeExample = getCodeExample(input)
  const replLink = rambdaREPL(codeExample)
  const markdownLink = `<a href="${ replLink }">Try in REPL</a>`

  return `${ appendTestLink(input) }${ markdownLink }\n\n`
}

void function createReadme(){
  const outputPath = `${ process.cwd() }/README.md`

  const contentRaw = readFileSync(
    `${ process.cwd() }/files/README.md`
  ).toString()

  const content = replace(RAMBDA_DOCS_MARKER, `\n${ ADD_METHOD }${ rambdaApi }`, contentRaw)

  const contentWithREPL = content
    .split(MARKER_METHOD)
    .map((singleMethod, i) => {
      const flag = all(
        marker => singleMethod.includes(marker)
      )([ MARKER_CODE, MARKER_SOURCE ])

      if (i === 0) return singleMethod

      if (flag){
        return getContentWithREPL(singleMethod)
      }

      return appendTestLink(singleMethod)
    })

  const newReadme = contentWithREPL.join(MARKER_METHOD_LINE)

  writeFileSync(outputPath, newReadme)
}()
