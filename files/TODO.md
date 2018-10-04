# TODO

### `run-fn`

- `run init`

> It reads current package.json

package.json:

```json
{
  "runFn": {
    "label": "./files/label.js",
    "foo": "./files/foo.js",
  }
}
```

foo.js:

```javascript
const { range, multiline, any , inject } = require('../dist/')
const {readFileSync, writeFileSync} = require('fs')

CONST DIR = 'foo'
CONST FILE = 'FOO.md'

function today(){
  return 'DD/MM/YY'
}

function getHeading(headingBase, content){
  if(content.includes(`## ${headingBase}`)){
    return headingBase
  }
  const [availableNumber] = any(x => {
    return !content.includes(`## ${headingBase}.${x}`)
  }, range(0,20))

  return `## ${headingBase}.${availableNumber}`
}

// cwd - directory from where `run foo making trouble is kind of nonsense` is run
// projectDir - `/home/s/repos/rambdax` as it is the directory when `run init` was activated
// inputs - ['making', ..., 'nonsense']
function foo({
  cwd,
  projectDir,
  inputs
}){
  const filePath = multiline(`
    ${projectDir}
    ${DIR}
    ${FILE}
  `, '/')
  const content = readFileSync(filePath).toString()
  const heading = getHeading(today(), content)
  const text = inputs.join(' ')

  const newContent = `
    ${heading}

    ${text}
  `.trim()

  const contentToWrite = inject(
    `\n${newContent}`,
    '# LOG',
    content
  )
  writeFileSync(filePath, contentToWrite)  
}

module.export = {
  async: false,
  fn: foo
}
```

> run.fn appends to its `config.json`

config.json:

```
{
  'label' :{
    projectDir: '/home/s/repos/rambdax',
    file: '/home/s/repos/rambdax/files/label.js',
  },
  'foo' :{
    projectDir: '/home/s/repos/rambdax',
    file: '/home/s/repos/rambdax/files/foo.js',
  },
}
```

- `run foo making trouble is kind of nonsense`

> run.fn see that `foo` is not part of the allowed commands

It checks in its config file, if there is a key `foo`

There is, so it runs:

```javascript
if(Object.keys(customCommands).includes(command)){
  await processCustomCommands(customCommands[command])
}
```

processCustomCommands.js:

```javascript
async function processCustomCommands(){}
```