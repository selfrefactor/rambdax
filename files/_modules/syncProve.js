const {
  emptyDirSync,
  copySync,
  readJsonSync,
  outputJsonSync,
  writeFileSync,
  readFileSync,
} = require('fs-extra')
const { replace, omit, glue } = require('../../dist/rambdax.js')

const SOURCE_BASE = `${ process.env.HOME }/repos/rambda`
const SOURCE = `${ SOURCE_BASE }/src`
const SOURCE_BUNDLE = `${ SOURCE_BASE }/dist/rambda.js`
const SOURCE_PACKAGE_JSON = `${ process.env.HOME }/repos/rambda/package.json`
const OUTPUT = `${ process.env.HOME }/repos/rambdax/src/rambda`
const OUTPUT_PACKAGE_JSON = `${ process.env.HOME }/repos/rambdax/package.json`
const OUTPUT_EXPORTS_DECLARATION = `${ process.env.HOME }/repos/rambdax/rambdax.js`

const a = readFileSync(OUTPUT_EXPORTS_DECLARATION).toString()
const [ rambdaxExports ] = a.split('//RAMBDA')
const sk = Object.keys(require(SOURCE_BUNDLE))

const sd = sk.map(singleMethod => `export * from './src/rambda/${ singleMethod }'`)

const injection = sd.join('\n')
const fixed = replace(
  './src/rambda/test', './src/rambda/testMethod', injection
)

const c = `${ rambdaxExports }//RAMBDA\n${ fixed }\n`
writeFileSync(OUTPUT_EXPORTS_DECLARATION, c)
emptyDirSync(OUTPUT)

copySync(SOURCE, OUTPUT)

const { devDependencies } = readJsonSync(SOURCE_PACKAGE_JSON)
const sourcePackageJson = readJsonSync(OUTPUT_PACKAGE_JSON)

const toOmit = glue(`
  @types/ramda
  lodash
  rambdax
  markdown-toc
`,
',')

const rambdaxDevDependencies = {
  'fs-extra' : '7.0.0',
  // 'rambda'   : 'https://github.com/selfrefactor/rambda#4.0.1',
  'rambda'   : '4.6.0',
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
