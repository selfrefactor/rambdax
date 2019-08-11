const {
  emptyDirSync,
  copySync,
} = require('fs-extra')

const SOURCE = `${ process.env.HOME }/repos/rambda/src`
const OUTPUT = `${ process.env.HOME }/repos/rambdax/src/rambda`

emptyDirSync(OUTPUT)

copySync(SOURCE, OUTPUT)
