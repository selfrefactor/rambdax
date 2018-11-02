# Promise.all with chunks of promises

The task is to lint huge list of files in fast manner.

```javascript
const R = require('rambdax')
const { execCommand } = require('./execCommand')

async function lintFiles(cwd = process.cwd(), files) {
  console.time('lintFolder')
  
  await R.mapFastAsync(async chunkOfFiles => {
    for (const filePath of chunkOfFiles) {
      
      await execCommand(
        R.multiline(`
          prettier 
          --no-semi
          --single-quote
          --trailing-comma
          --write
          ${filePath}
        `)
      }
    }
  }, R.splitEvery(5, allowedFiles))

  console.timeEnd('lintFiles')
}
```