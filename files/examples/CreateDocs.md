# Create documentation files with composeAsync and mapAsync

## The task

* Generate documentation from a folder
* For each Javascript file in the folder generate command for documentation generation
* Perform the bundle of commands
* Remove empty documentation files

## The tools

* `documentation` - for documentation generation 
* `klaw-sync` - for reading the content of the folder
* `fs-extra` - for file manipulations
* `rambdax` - for flow control
* `child_process` - for running the commands

## The solution

> Require modules

```
const R = require("rambdax")
const fs = require("fs-extra")
const klawSync = require("klaw-sync")
const { exec } = require("child_process")
```

> Create function for running CLI command

`documentation` is globally installed NPM library. It generates `markdown` files from files that follow `Flowtype` or`JSDoc` specification. 

Each Javascript file in the folder will generate a CLI command. These commands will be executed using the following declaration:

```
const execCommand = (command, cwd = process.cwd()) =>
  new Promise((resolve, reject) => {
    const proc = exec(
      command,
      { cwd }
    )
    proc.stdout.on("data", chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on("end", () => resolve())
    proc.stdout.on("error", err => reject(err))
  })
```

> Declare main function

The main function will be called \`generateDocumentation\` and will have the following typing:

```
generateDocumentation({ output: String, source: String }): Promise
```

For testing purposes, this function will be called in the following way:

```
generateDocumentation({
    source: `${__dirname}/src`
    output: `${__dirname}/documentation`
  })
  .then(console.log)
  .catch(console.log)
```


> Declaring the return statement

The main function will return a call to `R.composeAsync` which is a `Promise`

The pseudocode looks something like that:

```
async generateDocumentation({ output, source}){
   return await R.composeAsync(
      STEP-N
      ...  , 
      STEP-2,
      STEP-1,
   )(INPUT) 
}
```

Now we declare the steps in the order of their execution.

Initially we start with getting the `INPUT`



> Reading files from `source` folder

```
klawSync(source)
```

This call returns array of objects, with `path` property holding the filepath info.

Now we declare the first step



> Get only Javascript files

```
R.filter(x => x.path.endsWith(".js"))
```



> Get the property `path`

```
R.map(R.prop("path"))
```

Now we have all the data required to map over all Javascript files.

We will perform asynchronous operations on each member of the array.

For that we can use `R.mapAsync` , which allows us exactly that.

```
R.mapAsync(async filePath => {
  const fileName = R.compose(
    R.replace('.js', '.md'),
    R.last,
    R.split('/')
  )(filePath)
  const documentationFilePath = `${output}/${fileName}`
  const command = `documentation build ${filePath} -f md --shallow -o ${documentationFilePath}`
  await execCommand(command)
  return documentationFilePath
})
```

For each `filePath` a command is generated and executed. After the command is performed, the location of the `markdown file`is returned.

As final step, we need to remove empty `markdown` files, because not all of Javascript files in the directory will have documentation declarations.

We can use the synchronous methods of `fs-extra` .

Which means that simple `R.map` will do the trick.

```
R.map(documentationFilePath => {
  const content = fs.readFileSync(documentationFilePath)
  if (content.length < 120) {
    fs.removeSync(documentationFilePath)
  }
})
```

That was the final step.

I will just add some `async` related boilerplate in the main function and we are done.

Code is published at [https://gist.github.com/selfrefactor/4e79e42dd98966f0bb532f242065a989](https://gist.github.com/selfrefactor/4e79e42dd98966f0bb532f242065a989)

Documentation for `Ramdbax` is located at [https://selfrefactor.github.io/rambdax/](https://selfrefactor.github.io/rambdax/)

> Final version

```javascript
const R = require("rambdax")
const fs = require("fs-extra")
const klawSync = require("klaw-sync")
const {
  exec
} = require("child_process")

const execCommand = (command, cwd = process.cwd()) =>
  new Promise((resolve, reject) => {
    const proc = exec(
      command, {
        cwd
      }
    )
    proc.stdout.on("data", chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on("end", () => resolve())
    proc.stdout.on("error", err => reject(err))
  })


async function generateDocumentation({
  source,
  output
}) {
  try {
    return await R.composeAsync(
      R.map(documentationFilePath => {
        const content = fs.readFileSync(documentationFilePath)
        if (content.length < 120) {
          fs.removeSync(documentationFilePath)
        }
      }),
      R.mapAsync(async filePath => {
        const fileName = R.compose(
          R.replace('.js', '.md'),
          R.last,
          R.split('/')
        )(filePath)
        const documentationFilePath = `${output}/${fileName}`
        const command = `documentation build ${filePath} -f md --shallow -o ${documentationFilePath}`
        await execCommand(command)
        return documentationFilePath
      }),
      R.map(R.prop("path")),
      R.filter(a => a.path.endsWith(".js"))
    )(klawSync(source))
  }
  catch (err) {
    console.log(err)
  }
}


generateDocumentation({
    source: `${__dirname}/src`,
    output: `${__dirname}/documentation`
  })
  .then(console.log)
  .catch(console.log)
```

