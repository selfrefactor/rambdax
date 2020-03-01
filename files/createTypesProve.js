const { exec } = require('helpers')
const { inject } = require('../dist/rambdax')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path') 

const PATH = resolve(__dirname, '../node_modules/rambda/index.d.ts')
const OUTPUT_PATH = resolve(__dirname, '../index.d.ts')
const SOURCE_PATH_INTERFACES = `${ __dirname }/typings/interfaces.ts`
const SOURCE_PATH_METHODS = `${ __dirname }/typings/methods.ts`

async function createTypes(){
  const rambda = readFileSync(PATH).toString()
  const methods = readFileSync(SOURCE_PATH_METHODS).toString()
  const interfaces = readFileSync(SOURCE_PATH_INTERFACES).toString()

  const withInterfaces = inject(
    interfaces, '// INTERFACES_MARKER_END\n', rambda, true
  )
  const withMethods = inject(
    methods, '// METHODS_MARKER\n', withInterfaces
  )

  writeFileSync(OUTPUT_PATH, withMethods)
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
