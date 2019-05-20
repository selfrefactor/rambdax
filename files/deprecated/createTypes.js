const { between } = require('string-fn')
const { inject } = require('../dist/rambdax')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const PATH = resolve(
  __dirname,
  '../node_modules/rambda/index.d.ts'
)
const OUTPUT_PATH = resolve(
  __dirname,
  '../index.d.ts'
)
const SOURCE_PATH = resolve(
  __dirname,
  '../files/types.d.ts'
)

function createTypes() {
  const rambda = readFileSync(PATH).toString()
  const source = readFileSync(SOURCE_PATH).toString()

  const found = between(
    rambda,
    '// RAMBDA_START_MARKER',
    '// RAMBDA_END_MARKER',
  )
  const injected = inject(
    found,
    '// RAMBDA_MARKER\n',
    source
  )

  writeFileSync(OUTPUT_PATH, injected)
  console.log('done')
}

createTypes()
