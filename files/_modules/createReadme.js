const {all, multiline} = require('../../dist/rambdax')
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

function appendTestLink(input){
  const [method] = input.match(/.+/)
  const link = multiline(`
    https://github.com
    selfrefactor
    rambdax
    blob
    master
    src
    ${method}.spec.js
  `, '/')

  const testLink = `\n\n[Test](${link})\n\n`

  return `${input.trim()}${testLink}`
}

function getContentWithREPL(input){
  const codeExample = getCodeExample(input)
  const replLink = rambdaREPL(codeExample)
  const markdownLink = `<a href="${ replLink }">Try in REPL</a>`

  return `${ appendTestLink(input) }${ markdownLink }\n\n`
}

void function createReadme() {
  const outputPath = `${process.cwd()}/README.md`

  const content = readFileSync(
    `${ process.cwd() }/files/README.md`
  ).toString()

  const contentWithREPL = content
    .split(MARKER_METHOD)
    .map((singleMethod, i) => {
      const flag = all(
        marker => singleMethod.includes(marker)
      )([ MARKER_CODE, MARKER_SOURCE ])

      if(i === 0) return singleMethod

      if (flag){
        return getContentWithREPL(singleMethod)
      }

      return appendTestLink(singleMethod)
    })

  const newReadme = contentWithREPL.join(MARKER_METHOD_LINE)

  writeFileSync(outputPath, newReadme)
}()
