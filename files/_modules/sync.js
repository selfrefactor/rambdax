const {
  emptyDirSync,
  copySync,
  readJsonSync,
  outputJsonSync,
} = require('fs-extra')
const { omit, glue } = require('../../dist/rambdax.js')

const SOURCE = `${ process.env.HOME }/repos/rambda/src`
const SOURCE_PACKAGE_JSON = `${ process.env.HOME }/repos/rambda/package.json`
const OUTPUT = `${ process.env.HOME }/repos/rambdax/src/rambda`
const OUTPUT_PACKAGE_JSON = `${ process.env.HOME }/repos/rambdax/package.json`

emptyDirSync(OUTPUT)

copySync(SOURCE, OUTPUT)

const { devDependencies } = readJsonSync(SOURCE_PACKAGE_JSON)
const sourcePackageJson = readJsonSync(OUTPUT_PACKAGE_JSON)

const toOmit = glue(`
  @types/ramda
  lodash
  rambdax
  markdown-toc
`, ',')

const rambdaxDevDependencies = {
  'fs-extra' : '7.0.0',
  'rambda'   : 'https://github.com/selfrefactor/rambda#4.0.1',
  // 'rambda'   : '4.0.1',
}

outputJsonSync(
  OUTPUT_PACKAGE_JSON,
  {
    ...sourcePackageJson,
    devDependencies : {
      ...omit(toOmit, devDependencies),
      ...rambdaxDevDependencies,
    },
  },
  { spaces : 2 }
)
