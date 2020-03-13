const { exec } = require('helpers')
const { readFileSync, writeFileSync } = require('fs')
const { replace } = require('../dist/rambdax')
const { resolve } = require('path')

const PATH = resolve(__dirname, '../node_modules/rambda/index.d.ts')
const OUTPUT_PATH = resolve(__dirname, '../index.d.ts')
const SOURCE_PATH = `${ __dirname }/typings/source.ts`

const INJECT_RAMBDAX = '// INJECT_RAMBDAX'

async function createTypes(){
  const rambda = readFileSync(PATH).toString()
  console.log(rambda)
  const rambdax = readFileSync(SOURCE_PATH).toString()

  const output = replace(
    INJECT_RAMBDAX, `\n${ rambdax }`, rambda
  )

  writeFileSync(OUTPUT_PATH, output)
  await exec({
    cwd     : process.cwd(),
    command : 'yarn tslint',
  })
  await exec({
    cwd     : process.cwd(),
    command : 'yarn tsformat',
  })
  console.log('done')
}

createTypes()
