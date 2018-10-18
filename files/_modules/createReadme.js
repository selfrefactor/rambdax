const {all} = require('rambda')
const { rambdaREPL } = require('rambda-repl')
const { readFileSync, writeFileSync } = require('fs')

const MARKER_SOURCE = '[Source]'
const MARKER_CODE = '```'
const MARKER_METHOD = '#### '
const MARKER_METHOD_LINE = `---
#### `

function getCodeExample(input){
  const [ , code, ..._ ] = input.split(MARKER_CODE)

  return code.trim()
}

function getContentWithREPL(input){
  const codeExample = getCodeExample(input)
  const replLink = rambdaREPL(codeExample)
  const markdownLink = `<a href="${ replLink }">Try in REPL</a>`

  return `${ input.trim() }\n\n${ markdownLink }\n\n`
}

void function createReadme() {
  const outputPath = `${process.cwd()}/README.md`

  const content = readFileSync(
    `${ process.cwd() }/files/README.md`
  ).toString()

  const contentWithREPL = content
    .split(MARKER_METHOD)
    .map(singleMethod => {
      const flag = all(
        marker => singleMethod.includes(marker)
      )([ MARKER_CODE, MARKER_SOURCE ])

      if (flag){
        return getContentWithREPL(singleMethod)
      }

      return singleMethod
    })

  const newReadme = contentWithREPL.join(MARKER_METHOD_LINE)

  writeFileSync(outputPath, newReadme)
}()
