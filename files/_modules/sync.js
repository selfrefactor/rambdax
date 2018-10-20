const {
  emptyDirSync,
  copySync
} = require('fs-extra') 

const SOURCE = '/home/s/repos/rambda/src'
const OUTPUT = '/home/s/repos/rambdax/src/rambda'

emptyDirSync(OUTPUT)

copySync(SOURCE, OUTPUT)