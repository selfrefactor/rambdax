import { readFileSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { inject } from '../rambdax'
import { between } from 'string-fn'

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
const XPATH = '/home/s/repos/rambdax/node_modules/rambda/index.d.ts'
const OUTPUT_XPATH = '/home/s/repos/rambdax/index.d.ts'
const SOURCE_XPATH = '/home/s/repos/rambdax/files/types.d.ts'

export function createTypes (input) {
  try {
    const rambda = readFileSync(XPATH).toString()
    const source = readFileSync(SOURCE_XPATH).toString()

    const found = between(
      rambda,
      '// RAMBDA_START_MARKER',
      '// RAMBDA_END_MARKER',
    )
    console.log(found)
    const injected = inject(
      found,
      '// RAMBDA_MARKER\n',
      source
    )

    writeFileSync(OUTPUT_XPATH, injected)
  } catch (err) {
    throw err
  }
}
