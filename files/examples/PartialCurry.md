# Using R.partialCurry with headless Chrome

```javascript
const R = require("rambdax")
const CDP = require("chrome-remote-interface")
const chromeLauncher = require("chrome-launcher")

const startChrome = () => chromeLauncher.launch({
  port         : 9222,
  handleSIGINT : false,
  chromeFlags  : ["--headless", "--no-sandbox"]
})

const evaluateFn = async ({ 
  fn,
  input,
  expression,
  Runtime,
  asyncFlag 
}) => {
  const expressionValue = expression === undefined ?
    `(${ fn })(${ JSON.stringify(input) })` :
    expression

  asyncFlag = R.defaultTo(false, asyncFlag)
  const evaluateResult = await Runtime.evaluate({
    expression   : expressionValue,
    awaitPromise : asyncFlag,
  })

  return R.path("result.value", evaluateResult)
}

const worker = async url => {
    const chrome = await startChrome()
    const client = await CDP({ port: 9222 })
    const { Page, Runtime, Network } = client
    await Promise.all([
      Page.enable(),
      Network.enable(),
      Runtime.enable(),
    ])
    const evaluate = R.partialCurry(
      evaluateFn,
      {Runtime}
    )

    await Page.navigate({ url })
    await Page.loadEventFired()
    const numberDivs = await evaluate({
         expression: 'document.querySelectorAll("div").length'
    })

    const numberElements = selector => document.querySelectorAll(selector)

    const numberHeadings = await evaluate({
         fn: numberElements,
         input: "h1"
    })
    
    return {
        numberDivs,
        numberHeadings
    }
}

worker('https://reddit.com')
  .then(console.log)
  .catch(console.log)
```