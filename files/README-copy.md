## Simple example

### API part I - Rambdax own methods

#### composeAsync

> composeAsync(...fns: Array<Function|Async>)(startValue: any): Promise

Asyncronous version of `R.compose`.

```
const fn = async x => {
  await R.delay(500)
  return x+1
}
const fn2 = async x => fn(x)

const result = R.composeAsync(
  fn,
  fn2
)(0)
// `result` resolves to `2`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/modules/composeAsync.js)
