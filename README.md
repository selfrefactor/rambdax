# Rambdax

Extended version of Rambda(utility library) - [Documentation](https://selfrefactor.github.io/rambdax/#/)

## Simple example

```
const R = require("rambdax")
const result = R.compose(
  R.filter(val => val>2),
  R.flatten,
)([ [1], [2], [3], 4])
console.log(result) // => [3, 4]
```

## How to use it?

Simple `yarn add rambdax` is sufficient

## Differences between Rambda and Ramdax

Rambdax passthrough all [Rambda](https://github.com/selfrefactor/rambda) methods and introduce some new functions.

The idea of `Rambdax` is to extend `Rambda` without worring for `Ramda` compatibility.

## API

### API part I - Rambdax own methods

#### compact

> compact(arr: Array<any>)

It removes the empty values from an array.

```
const arr = [
  1,
  null,
  undefined,
  false,
  "",
  " ",
  "foo",
  {},
  [],
  [1],
  /\s/g
]
const result = R.compact(arr)
const expectedResult = [1, false, " ", "foo", [1]]
// result === expectedResult
```

#### composeAsync

> composeAsync(...fns: Array<Function|Async>)(startValue: any): Promise

Asyncronous version of `R.compose`.

```
const fn = async x => {
  await R.delay(x)
  return x+1
}

const result = await composeAsync(
  fn,
  async x => fn(x),
)(await fn(0))

console.log(result) //=> 3
```

#### debounce

> debounce(fn: Function, ms: Number): any

Creates a debounced function that delays invoking `fn` until after wait milliseconds `ms` have elapsed since the last time the debounced function was invoked.

Description is taken from `Lodash` docs.

```
let counter = 0
const inc = () => {
  counter++
}
const fn = debounce(inc, 1000)
fn()
await R.delay(500)
console.log(counter) //=> 0
await R.delay(1000)
console.log(counter) //=> 1
```

#### delay

> delay(ms: Number): Promise<R.DELAY>

`setTimeout` as a promise that resolves to`R.DELAY` variable.

```
R.delay(1000).then( result => {
  console.assert( result === R.DELAY )
})

```

The value of `R.DELAY` is `'RAMBDAX_DELAY'`

#### evolve

> evolve (rules: Object, input: Object): Object

Properties of `input` object are transformed according to `rules` object that contains functions as values.

If property `prop` of `rules` is a function and also a property of `input`, then `input[prop]` will be equal to the result of `rules[prop](input[prop])`.


`rules[prop]` can be also a object that contains functions, as you can see in the example below:

```
const input = {
    firstName : "  Tomato ",
    data      : {
      elapsed   : 100,
      remaining : 1400,
    },
    id : 123,
  }
const rules = {
    firstName : R.trim,
    lastName  : R.trim, //Will not get invoked.
    data      : {
      elapsed   : R.add(1),
      remaining : R.add(-1),
    },
  }

const result = R.evolve(transformations, tomato)
const expectedResult = {
  firstName: "Tomato",
  data: {
    elapsed: 101,
    remaining: 1399,
  },
  id: 123,
})
// result === expectedResult
```

#### intersection

> intersection(a: Array, b: Array): Array

It returns array with the overlapped members of `a` and `b`.

```
R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
```

#### isType

> isType(xType: string, x: any): Boolean

It returns `true` if `R.type` of `x` is equal to `xType`.

#### isArray

> isArray(x: any): Boolean

#### isString

> isString(x: any): Boolean

#### isObject

> isObject(x: any): Boolean

#### isPromiseLike

> isPromiseLike(x: any): Boolean

It returns true if `x` is either async function or unresolved promise.

#### isValid

> isValid({input: Object, schema: Object}): Boolean

It checks if `input` is following `schema` specifications.

This is modified version of [json-validity](https://github.com/selfrefactor/json-validity) library.
```
const schema = {
  published: "number",
  style: [ "rock", "jazz" ],
  title: "string",
}

const song = {
  published: 1975,
  style: "rock",
  title: "In my time of dying",
}

R.isValid({input,schema}) // => true
```

#### mapAsync

> mapAsync(fn: Async|Promise, arr: Array): Promise<Array>

Sequential asynchronous mapping with `fn` over members of `arr`.

```
const fn = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + 1)
  }, 100)
})

const result = await R.composeAsync(
  R.mapAsync(fn),
  R.map(a => a * 10)
)([1, 2, 3])
console.log(result) //=> [11, 21, 31]
```

#### mapFastAsync

> mapFastAsync(fn: Async|Promise, arr: Array): Promise<Array>

Parrallel asynchronous mapping with `fn` over members of `arr`.

```
const fn = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + 1)
  }, 100)
})

const result = await R.composeAsync(
  R.mapFastAsync(fn),
  R.map(a => a * 10)
)([1, 2, 3])
console.log(result) //=> [11, 21, 31]
```

#### memoize

> memoize(fn: Function|Promise): any

When `fn` is called for a second time with the same input, then the cache result is returned instead of calling `fn`.

```
let counter = 0
const fn = (a,b) =>{
  counter++
  return a+b
}
const memoized = R.memoize(fn)
memoized(1,2)
memoized(1,2)
console.log(counter) //=> 1
```

#### mergeAll

> mergeAll(input: Array): Object

It merges all objects of `input` array sequentially and returns the result.

```
const arr = [
  {a:1},
  {b:2},
  {c:3}
]
const expectedResult = {
  a:1,
  b:2,
  c:3
}
const result = R.mergeAll(arr)
// result === expectedResult
```

#### omitBy

> omitBy(fn: function, input: Object): Object

It returns only those properties of `input` that return `false` when passed to `fn`.

```
const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const fn = (prop, val) => val < 3
const expectedResult = {
  c: 3,
  d: 4,
}
const result = R.omitBy(fn, input)
// result === expectedResult
```

#### once

> once(fn: Function): Function

It returns a function, which invokes only once`fn`.

```
const addOneOnce = R.once((a, b, c) => a + b + c)

console.log(addOneOnce(10,20,30)) //=> 60
console.log(addOneOnce(1,2,3)) //=> 60
```

#### pickBy

> pickBy(fn: Function, input: Object): Object

It returns only those properties of `input` that return `true` when passed to `fn`.

```
const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const fn = (prop,val) => val > 3 || prop === 'a'
const expectedResult = {
  a: 1,
  d: 4,
}
const result = R.pickBy(fn, input)
// result === expectedResult
```

#### produce

> produce(conditions: Object, input: any): Promise|Object

```
const conditions = {
  foo: a => a > 10,
  bar: a => ({baz:a})
}

const result = R.produce(conditions, 7)

const expectedResult = {
  foo: false,
  bar: {baz: 7}
}
// result === expectedResult
```

`conditions` is an object with sync or async functions as values.

The values of the returned object `returnValue` are the results of those functions when `input` is passed.
The properties of the returned object are equal to `input`.

If any of the `conditions` is a `Promise`, then the returned value is a `Promise` that resolves to `returnValue`.

#### random

> random(min: Number, max: Number)

It returns a random number between `min` inclusive and `max` inclusive.

```
const randomResult = R.random(1, 10)
expect(randomResult).toBeLessThanOrEqual(10)
expect(randomResult).toBeGreaterThanOrEqual(1)
```

#### rangeBy

> rangeBy(start: Number, end: Number, step: Number)

It returns array of all numbers between `start` and `end`, when the step of increase is `step`.

```
expect(
  R.rangeBy(0, 10, 2)
).toEqual([0, 2, 4, 6, 8, 10])
expect(
  R.rangeBy(0, 2, 0.3)
).toEqual([0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8])
```

#### renameProps

> renameProps(rules: Object, input: Object): Object

If property `prop` of `rules` is also a property in `input`, then rename `input` property to `rules[prop]`.

```
const rules = {
  f: "foo",
  b: "bar"
}
const input = {
  f:1,
  b:2
}
const result = R.renameProps(rules, input)
const expectedResult = {
  foo:1,
  bar:2
}
// result === expectedResult
```

#### resolve

> resolve(promises: Object): Object

It acts as `Promise.all` for object with Promises.

```
const fn = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve(ms)
  }, ms)
})
const promises = {
  a : fn(1),
  b : fn(2),
}
const result = await R.resolve(promises)
const expectedResult = { a:1, b:2 }
// result === expectedResult
```

#### resolveSecure

> resolveSecure(promises: Array): Array<{type: 'RESULT'|'ERROR', payload:any}>

It acts as `Promise.all` with fault tollerance.

Occurence of error `err` in any of the `promises` adds `{type: 'ERROR', payload: err}` to the final result.
Result `result` in any of the `promises` adds `{type: 'RESULT', payload: result}` to the final result.

```
const fn = async () => {
  try {
    JSON.parse("{:a")
  }
  catch (err) {
    throw new Error(err)
  }
}

const result = await R.resolveSecure([
  R.delay(2000),
  fn(1000)
])

const expectedResult = [
  {
    "payload": 'RAMBDAX_DELAY',
    "type": "RESULT"
  },
  {
    payload:"Unexpected token : in JSON at position 1",
    type: "ERROR"
  }
]
// => result === expectedResult
```

#### shuffle

> shuffle(arr: Array): Array

It returns randomized copy of array.

#### tap

> tap(fn: Function, input: T): T

It returns back `input` after calling `fn` with `input`.

```
const log = a => console.log(a)
const result = R.tap(log, "foo")
// the console logs `foo`
// `result` is equal to "foo"
```

#### tapAsync

> tapAsync(fn: Function|Async|Promise, inputArgument: T): T

It is `R.tap` that accept promise-like `fn` argument.

```
const log = async a => {
  await R.delay(1000)
  console.log(a)
}
const result = R.tapAsync(log, "foo")
// the console logs `foo`
// `result` is equal to "foo"
```

#### throttle

> throttle(fn: Function, period: Number): Function

It creates a throttled function that invokes `fn` maximum once for a `period` of milliseconds.

```
let counter = 0
const inc = () => {
  counter++
}

const fn = throttle(inc, 1000)
fn()
await R.delay(500)
fn()
console.log(counter) // => 1
```

#### where

> where(conditions: Object, input: Object): Boolean

Each property `prop` in `conditions` is a function.

This function is called with `input(prop)`. If all such function calls return `true`, then the final result is also `true`.

```
const condition = R.where({
  a : aProp => typeof aProp === "string",
  b : bProp => bProp === 4
})

condition({
  a : "foo",
  b : 4,
  c : 11,
}) //=> true

condition({
  a : 1,
  b : 4,
  c : 11,
}) //=> false
```

#### when

> when(rule: Function, fn: Function): Function

`
var truncate = R.when(
  x => x.length > 5,
  R.compose(x => `${x}...`, R.take(5))
)

expect(truncate('1234')).toEqual('1234')
expect(truncate('12345678')).toEqual('12345...')
`

---

### Methods inherited from Rambda
