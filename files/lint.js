const { allFalse } = require('../dist/rambdax')
const { exec } = require('helpers')
const { resolve } = require('path')

const LIMIT = 4
const skipRules = [
  'max-len',
  'sort-keys',
]

void async function lint(){
  process.env.SKIP_ESLINT_RULES = skipRules.join(',')

  const output = await exec({
    // It requires `npm i -g run-fn` ============================================
    command : 'run lint',
    cwd     : resolve(__dirname, '../src'),
  })

  const filtered = output.filter(
    line => allFalse(
      line.includes('/_internals/'),
      line.includes('/rambda/')
    )
  )
  console.log('=====END=====')
  if (filtered.length <= LIMIT){
    return console.log('No new lint errors')
  }
  filtered.map(x => console.log(x))
  console.log('==========')
  console.log(filtered.length)
}()
