[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/rambdax.svg)](https://circleci.com/gh/selfrefactor/rambdax)
[![codecov](https://codecov.io/gh/selfrefactor/rambdax/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/rambdax)

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

## How to use it

Simple `yarn add rambdax` is sufficient

ES5 compatible version - `yarn add rambdax#0.8.0`

## Differences between Rambda and Ramdax

Rambdax passthrough all [Rambda](https://github.com/selfrefactor/rambda) methods and introduce some new functions.

The idea of **Rambdax** is to extend **Rambda** without worring for **Ramda** compatibility.

- `Rambdax` replaces `Rambda`'s `is` with very different method. Check the API below for further details.

## API

Methods between `allFalse` and `when` belong to **Rambdax**, while methods between `add` and `without` are inherited from **Rambda**.

#### allTrue

> allTrue(...inputs: any[]): boolean

It returns `true` if all passed elements return `false` when passed to `Boolean`.

```
R.allFalse(null, undefined, '')
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allFalse.js)

#### allTrue

> allTrue(...inputs: any[]): boolean

It returns `true` if all passed elements return `true` when passed to `Boolean`.

```
const x = 2
R.allTrue([1,2], x > 1, {})
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allTrue.js)

#### change

> change(origin: object, path: string, changeData: any): object

It helps changing object's properties if there are below 3 levels deep.

Explanation:

`path` provide way to specify which object's sub-branch you want to manipulate. Pass empty string if you target the whole `origin` object.

`changeData` can be a direct value. If it is a object, then this object is used to edit or add new properties to the selected sub-branch. 

```
const simpleResult = change(
  { a: 1, b: { c: 2 } },
  'b.c',
  3
)
const expectedSimpleResult = {
  a: 1,
  b: { c: 3 }
}
// simpleResult === expectedSimpleResult

const origin = {
  a   : 0,
  foo : {
    bar : 1,
    bax : { nested : 2 },
  },
}
const changeData = {
  bar: 2,
  bay: 3,
  bax: { baq: 9 }
}
const result = change(
  origin,
  'foo',
  changeData
)

const expectedResult = {
  a   : 0,
  foo : {
    bar : 2,
    bay : 3,
    bax : {
      nested : 2,
      baq: 9
    },
  },
}
// result === expectedResult
```

#### compact

> compact(arr: any[]): any[]

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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/compact.js)

#### composeAsync

> composeAsync(...fns: Array<Function|Async>)(startValue: any): Promise

Asyncronous version of `R.compose`.

```
const fn = async x => {
  await R.delay(500)
  return x+1
}
const fnSecond = async x => fn(x)

const result = R.composeAsync(
  fn,
  fnSecond
)(0)
// `result` resolves to `2`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/composeAsync.js)

#### debounce

> debounce(fn: Function, ms: number): any

Creates a debounced function that delays invoking `fn` until after wait milliseconds `ms` have elapsed since the last time the debounced function was invoked. (description is taken from `Lodash` docs)

```
let counter = 0
const inc = () => {
  counter++
}
const debouncedInc = R.debounce(inc, 900)

const result = async function(){
  debouncedInc()
  await R.delay(500)
  debouncedInc()
  await R.delay(800)
  console.log(counter) //=> 0

  await R.delay(1000)
  console.log(counter) //=> 1

  return counter
}
// `result` resolves to `1`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/debounce.js)

#### defaultWhen

> defaultWhen(fn: Function, fallback: T, input: any): T

It returns `fallback`, if `input` returns `false` when applied to `fn`.

It returns `input` in the other case.

```
const fn = x => x > 2
const fallback = 10
const result = defaultWhen(fn, fallback, 1)
// `result` is `10`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/defaultWhen.js)

#### delay

> delay(ms: number): Promise

`setTimeout` as a promise that resolves to `R.DELAY` variable.

The value of `R.DELAY` is `'RAMBDAX_DELAY'`.

```
const result = R.delay(1000)
// `result` resolves to `'RAMBDAX_DELAY'`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/delay.js)

#### evolve

> evolve (rules: Object, input: Object): Object

Properties of `input` object are transformed according to `rules` object that contains functions as values.

If property `prop` of `rules` is a function and also a property of `input`, then `input[prop]` will be equal to the result of `rules[prop](input[prop])`.

`rules[prop]` can be also a object that contains functions, as you can see in the example below:

```
const input = {
  firstName : '  Tomato ',
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

const result = R.evolve(rules, input)

const expectedResult = {
  firstName: 'Tomato',
  data: {
    elapsed: 101,
    remaining: 1399,
  },
  id: 123,
}
console.log(result === expectedResult)
// true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/evolve.js)

#### greater

> greater(x: number, y: number): boolean

It return true if the second argument is greater than the first argument.

Note that this is opposite direction compared to Rambda's `gt` method, because it makes more sense in `R.compose` context.

```
R.greater(1,2) // => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/greater.js)

#### inject

> inject(injection: string, marker: string, str: string): string

```
const result = R.inject(
  ' INJECTION',
  'MARKER',
  'foo bar MARKER baz'
)

const expectedResult = 'foo bar MARKER INJECTION baz'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/inject.js)

#### is

> is(...inputs: any[]): (schemas: any[]) => boolean

It checks if `inputs` are following `schemas` specifications.

It uses underneath `R.isValid`, so you may want to [check its detailed explanation](https://github.com/selfrefactor/rambdax/tree/master/files/isValid.md).

If validation fails, it returns `false`.

```
const result = R.is(1,['foo','bar'])('number',['string'])
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/is.js)

#### isPromise

> isPromise(x: any): boolean

It returns true if `x` is either async function or unresolved promise.

```
R.isPromise(R.delay)
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isPromise.js)

#### isType

> isType(xType: string, x: any): boolean

It returns true if `x` matches the type returned from `R.type`.

```
R.isType('Async',async () => {})
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isType.js)

#### less

> less(x: number, y: number): boolean

It return true if the second argument is less than the first argument.

Note that this is opposite direction compared to Rambda's `lt` method, because it makes more sense in `R.compose` context.

```
R.less(2,1) // => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/less.js)

#### mapAsync

> mapAsync(fn: Async|Promise, arr: Array): Promise

Sequential asynchronous mapping with `fn` over members of `arr`.

```
async function fn(x){
  await R.delay(1000)

  return x+1
}

const result = R.composeAsync(
  R.mapAsync(fn),
  R.map(x => x*2)
)( [1, 2, 3] )

// `result` resolves after 3 seconds to `[3, 5, 7]`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mapAsync.js)

#### mapFastAsync

> mapFastAsync(fn: Async|Promise, arr: Array): Promise

Parrallel asynchronous mapping with `fn` over members of `arr`.

```
async function fn(x){
  await R.delay(1000)

  return x+1
}

const result = R.composeAsync(
  R.mapAsync(fn),
  R.map(x => x*2)
)( [1, 2, 3] )

// `result` resolves after 1 second to `[3, 5, 7]`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mapFastAsync.js)

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

> mergeAll(input: Object[]): Object

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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mergeAll.js)

#### multiline

> multiline(input: string, glue?: string): string

It transforms multiline strings to single line.

```
const result = R.multiline(`
  foo
  bar
  baz
`)

const expectedResult = 'foo bar baz'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/multiline.js)

#### ok

> ok(...inputs: any[]): (schemas: any[]) => true | Error

It checks if `inputs` are following `schemas` specifications.

It uses underneath `R.isValid`, so you may want to [check its detailed explanation](https://github.com/selfrefactor/rambdax/tree/master/files/isValid.md).

If validation fails, it throws. If you don't want that, then you can use `R.is`.  It is the same as `R.ok` method, but it returns `false` upon failed validation.

```

const result = R.ok(1,['foo','bar'])('number',['string'])
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/ok.js)

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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/omitBy.js)

#### once

> once(fn: Function): Function

It returns a function, which invokes only once`fn`.

```
const addOneOnce = R.once((a, b, c) => a + b + c)

console.log(addOneOnce(10, 20, 30)) //=> 60
console.log(addOneOnce(1, 2, 3)) //=> 60
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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/pickBy.js)

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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/produce.js)

#### random

> random(min: number, max: number): number

It returns a random number between `min` inclusive and `max` inclusive.

#### rangeBy

> rangeBy(start: number, end: number, step: number): number[]

It returns array of all numbers between `start` and `end`, when the step of increase is `step`.

```
const result = R.rangeBy(0, 10, 2)
// => [0, 2, 4, 6, 8, 10])

console.log(R.rangeBy(0, 2, 0.3))
// =>[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8]
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/rangeBy.js)

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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/renameProps.js)

#### resolve

> resolve(promises: Object): Promise

It acts as `Promise.all` for object with Promises.
It returns a promise that resolve to object.

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

const result = R.resolve(promises)
const expectedResult = { a:1, b:2 }
// `result` resolves to `expectedResult`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/resolve.js)

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

const result = R.resolveSecure([
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
// `result` resolves to `expectedResult`
```

#### s

> s(): undefined

Taken from `https://github.com/staltz/zii`
Chain function calls using a prototype function `s`

```
// To turn it on
R.s()

// Then
const result = 'foo'
  .s(R.toUpper)
  .s(R.take(2))
  .s(R.add('bar'))

const expectedResult = 'barFO'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/resolveSecure.js)

#### shuffle

> shuffle(arr: T[]): T[]

It returns randomized copy of array.

#### switcher

Edited fork of [Switchem](https://github.com/planttheidea/switchem) library.

It is best explained with the following example:

```
const valueToMatch = {foo: 1}

const result = R.switcher(valueToMatch)
  .is('baz', 'is baz')
  .is( x => typeof x === 'boolean', 'is boolean')
  .is({foo: 1}, 'Property foo is 1')
  .default('is bar')

console.log(result) // => 'Property foo is 1'
```

As you can see `valueToMatch` is matched sequentially against various `is` conditions.
If none of them is appliable, then `default` value is returned as result.

Note that `default` must be the last condition and it is mandatory.

Rambda's `equals` is used as part of the comparison process.

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/switcher.js)

#### tapAsync

> tapAsync(fn: Function|Async|Promise, inputArgument: T): T

It is `R.tap` that accept promise-like `fn` argument.

```
const fn = async x => {
  await R.delay(1000)
  console.log(x)
}

const result = R.tapAsync(fn, "foo")
// the console logs `foo`
// `result` is equal to 'foo'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/tapAsync.js)

#### template

> template(input: string, templateInput: object): string

It generages a new string from `input` by replacing all `{{foo}}` occurances with values provided by `templateInput.

```
const input = 'foo is {{bar}} even {{a}} more'
const templateInput = {"bar":"BAR", a: 1}

const result = template(input,templateInput)
const expectedResult = 'foo is BAR even 1 more'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/template.js)

#### throttle

> throttle(fn: Function, period: number): Function

It creates a throttled function that invokes `fn` maximum once for a `period` of milliseconds.

```
let counter = 0
const inc = () => {
  counter++
}

const throttledInc = R.throttle(inc, 800)

const result = async () => {
  throttledInc()
  await R.delay(500)
  throttledInc()

  return counter
}
// `result` resolves to `1`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/throttle.js)

#### where

> where(conditions: object, input: object): boolean

Each property `prop` in `conditions` is a function.

This function is called with `input(prop)`. If all such function calls return `true`, then the final result is also `true`.

```
const condition = R.where({
  a : aProp => typeof aProp === "string",
  b : bProp => bProp === 4
})

const result = condition({
  a : "foo",
  b : 4,
  c : 11,
}) //=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/where.js)

#### when

> when(rule: Function|boolean, fn: Function): Function

```
const truncate = R.when(
  x => x.length > 5,
  R.compose(x => `${x}...`, R.take(5))
)

const result = truncate('12345678')
// => '12345...'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/when.js)

#### whenAsync

> whenAsync<T>(rule: condition: Async | Function | boolean, whenFn: Async | Function): Promise<T>

```
const fn = await R.whenAsync(
  async x => {
    await R.delay(x*100)
    return x > 2
  },
  async x => {
    await R.delay(x*100)
    return x * 2
  }
)

const result = fn(5) // => 10
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/whenAsync.js)

#### add

> add(a: number, b: number): number

```
R.add(2, 3) // =>  5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/add.js)

#### addIndex

> addIndex(fn: Function): Function

```
const mapWithIndex = R.addIndex(R.map)
const result = mapWithIndex(
  (val, index) => `${val} - ${index}`,
  ['A', 'B', 'C']
) // => ['A - 0', 'B - 1', 'C - 2']
```

#### adjust

> adjust(replaceFn: Function, i: number, arr: T[]): T[]

It replaces `i` index in `arr` with the result of `replaceFn(arr[i])`.

```
R.adjust(
  a => a + 1,
  0,
  [0, 100]
) // => [1, 100]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/adjust.js)

#### all

> all(fn: Function, arr: T[]): boolean

It returns `true`, if all members of array `arr` returns `true`, when applied as argument to function `fn`.

```
const arr = [ 0, 1, 2, 3, 4 ]
const fn = x => x > -1

const result = R.all(fn, arr)
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/all.js)

#### allPass

> allPass(rules: Function[], input: any): boolean

It returns `true`, if all functions of `rules` return `true`, when `input` is their argument.

```
const input = {
  a : 1,
  b : 2,
}
const rules = [
  x => x.a === 1,
  x => x.b === 2,
]
const result = R.allPass(rules, input) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/allPass.js)

#### always

> always(x: any): Function

It returns function that always returns `x`.
```
const fn = R.always(7)

console.log(fn())// => 7
```

#### any

> any(condition: Function, arr: T[]): boolean

It returns `true`, if at least one member of `arr` returns true, when passed to the `condition` function.

```
R.any(a => a * a > 8)([1, 2, 3])
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/any.js)

#### anyPass

> anyPass(conditions: Function[]): Function

```
const isBig = a => a > 20
const isOdd = a => a % 2 === 1

const result = R.anyPass(
  [isBig, isOdd]
)(11)
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/anyPass.js)

#### append

> append(valueToAppend: T, arr: T[]): T[]

```
R.append(
  'foo',
  ['bar', 'baz']
) // => ['bar', 'baz', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/append.js)

#### both

> both(firstCondition: Function, secondCondition: Function, input: any): boolean

It returns `true`, if both function `firstCondition` and function `secondCondition` return `true`, when `input` is their argument.

```
const fn = R.both(
  a => a > 10,
  a => a < 20
)
console.log(fn(15)) //=> true
console.log(fn(30)) //=> false
```

#### compose

> compose(fn1: Function, ... , fnN: Function): any

It performs right-to-left function composition.

```
const result = R.compose(
  R.map(x => x * 2),
  R.filter(x => x > 2)
)([1, 2, 3, 4])

// => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/compose.js)

#### complement

> complement(fn: Function): Function

It returns `complemented` function that accept `input` as argument.

The return value of `complemented` is the negative boolean value of `fn(input)`.

```
const fn = R.complement(x => !x)

const result = fn(false) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/complement.js)

#### concat

> concat(x: T[]|string, y: T[]|string): T[]|string

It returns a new string or array, which is the result of merging `x` and `y`.

```
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo')('bar') // => 'foobar'
```

#### contains

> contains(valueToFind: T, arr: T[]): boolean

It returns `true`, if `valueToFind` is part of `arr`.

```
R.contains(2, [1, 2]) // => true
R.contains(3, [1, 2]) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/contains.js)

#### curry

> curry(fn: Function): Function

It returns curried version of `fn`.

```
const addFourNumbers = (a, b, c, d) => a + b + c + d
const curriedAddFourNumbers = R.curry(addFourNumbers)
const f = curriedAddFourNumbers(1, 2)
const g = f(3)
const result = g(4) // => 10
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/curry.js)

#### dec

> dec(x: number): number

It decrements a number.
```
R.dec(2) // => 1
```

#### defaultTo

> defaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` is `undefined`, `null` or `NaN`.

It returns `inputArgument` in any other case.

```
R.defaultTo('foo', undefined) // => 'foo'
R.defaultTo('foo', 'bar') // => 'bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/defaultTo.js)

#### divide

```
R.divide(71, 100) // => 0.71
```

#### drop

> drop(howManyToDrop: number, arrOrStr: T[]|string): T[]|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the left.

```
R.drop(1, ['foo', 'bar', 'baz']) // => ['bar', 'baz']
R.drop(1, 'foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/drop.js)

#### dropLast

> dropLast(howManyToDrop: number, arrOrStr: T[]|String): T[]|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the right.

```
R.dropLast(1, ['foo', 'bar', 'baz']) // => ['foo', 'bar']
R.dropLast(1, 'foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/dropLast.js)

#### endsWith

> endsWith(x: string, str: string): boolean

```
R.endsWith(
  'bar',
  'foo-bar'
) // => true

R.endsWith(
  'foo',
  'foo-bar'
) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/endsWith.js)

#### either

> endsWith(firstCondition: Function, secondCondition: Function): Function

```
R.either(
  a => a > 10,
  a => a % 2 === 0
)(15) //=> true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/either.js)

#### equals

> equals(a: any, b: any): boolean

It returns equality match between `a` and `b`.

It doesn't handle cyclical data structures.

```
R.equals(
  [1, {a:2}, [{b:3}]],
  [1, {a:2}, [{b:3}]]
) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/equals.js)

#### F

`R.F() // => false`

#### filter

> filter(filterFn: Function, x: Array|Object): Array|Object

It filters `x` iterable over boolean returning `filterFn`.

```
const filterFn = a => a % 2 === 0

const result = R.filter(filterFn, [1, 2, 3, 4])
// => [2, 4]
```

The method works with objects as well.

Note that unlike Ramda's `filter`, here object keys are passed as second argument to `filterFn`.

```
const result = R.filter((val, prop)=>{
  return prop === 'a' || val === 2
}, {a: 1, b: 2, c: 3})

// => {a: 1, b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/filter.js)

#### find

> find(findFn: Function, arr: T[]): T|undefined

It returns `undefined` or the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === 'Number'
const arr = [{foo: 'bar'}, {foo: 1}]

const result = R.find(findFn, arr) 
// => {foo: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/find.js)

#### findIndex

> findIndex(findFn: Function, arr: T[]): number

It returns `-1` or the index of the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === 'Number'
const arr = [{foo: 'bar'}, {foo: 1}]

const result = R.findIndex(findFn, arr)
// => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/findIndex.js)

#### flatten

> flatten(arr: any[]): any[]

```
R.flatten([ 1, [ 2, [ 3 ] ] ])
// => [ 1, 2, 3 ]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/flatten.js)

#### flip

> flip(fn: Function): Function

It returns function which calls `fn` with exchanged first and second argument.

```
const subtractFlip = R.flip(R.subtract)

const result = subtractFlip(1,7)
// => 6
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/flip.js)

#### forEach

> forEach(fn: Function, arr: Array): Array

It applies function `fn` over all members of array `arr` and returns `arr`.

```
const sideEffect = {}
const result = R.forEach(
  x => sideEffect[`foo${x}`] = x
)([1, 2])

console.log(sideEffect) //=> {foo1 : 1, foo2 : 2}
console.log(result) //=> [1, 2]
```

Note, that unlike `Ramda`'s **forEach**, Rambda's one doesn't dispatch to `forEach` method of `arr` if `arr` has such method.

[Source](https://github.com/selfrefactor/rambda/tree/master/src/forEach.js)

#### has

> has(prop: string, obj: Object): boolean

- It returns `true` if `obj` has property `prop`.

```
R.has('a', {a: 1}) // => true
R.has('b', {a: 1}) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/has.js)

#### head

> head(arrOrStr: T[]|string): T|string

It returns the first element of `arrOrStr`.

```
R.head([1, 2, 3]) // => 1
R.head('foo') // => 'f'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/head.js)

#### identity

> identity(x: T): T

It just passes back the supplied arguments.

```
R.identity(7) // => 7
```

#### ifElse

> ifElse(condition: Function|boolean, ifFn: Function, elseFn: Function): Function

It returns function, which expect `input` as argument and returns `finalResult`.

When this function is called, a value `answer` is generated as a result of `condition(input)`.

If `answer` is `true`, then `finalResult` is equal to `ifFn(input)`.
If `answer` is `false`, then `finalResult` is equal to `elseFn(input)`.

```
const fn = R.ifElse(
 x => x > 10,
 x => x*2,
 x => x*10
)

const result = fn(8)
// => 80
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/ifElse.js)

#### inc

> inc(x: number): number

It increments a number.
```
R.inc(1) // => 2
```

#### includes

> includes(x: any, arrOrStr: T[]|string): boolean

```
R.includes(1, [1, 2]) // => true
R.includes('oo', 'foo') // => true
R.includes('z', 'foo') // => false
```

!! Note that this method is not part of `Ramda` API.

[Source](https://github.com/selfrefactor/rambda/tree/master/src/includes.js)

#### indexOf

> indexOf(valueToFind: any, arr: T[]): number

It returns `-1` or the index of the first element of `arr` equal of `valueToFind`.

```
R.indexOf(1, [1, 2]) // => 0
R.indexOf(0, [1, 2]) // => -1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/indexOf.js)

#### init

> init(arrOrStr: T[]|string): T[]|string

- It returns all but the last element of `arrOrStr`.

```
R.init([1, 2, 3])  // => [1, 2]
R.init('foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/init.js)

#### join

> join(separator: string, arr: T[]): string

```
R.join('-', [1, 2, 3])  // => '1-2-3'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/join.js)

#### isNil

> isNil(x: any): boolean

It returns `true` is `x` is either `null` or `undefined`.

```
R.isNil(null)  // => true
R.isNil(1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/isNil.js)

#### last

> last(arrOrStr: T[]|string): T|string

- It returns the last element of `arrOrStr`.

```
R.last(['foo', 'bar', 'baz']) // => 'baz'
R.last('foo') // => 'o'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/last.js)

#### lastIndexOf

> lastIndexOf(x: any, arr: T[]): number

It returns the last index of `x` in array `arr`.

`R.equals` is used to determine equality between `x` and members of `arr`.

Value `-1` is returned if no `x` is found in `arr`.

```
R.lastIndexOf(1, [1, 2, 3, 1, 2]) // => 3
R.lastIndexOf(10, [1, 2, 3, 1, 2]) // => -1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/lastIndexOf.js)

#### length

> length(arrOrStr: Array|String): Number

```
R.length([1, 2, 3]) // => 3
```

#### map

> map(mapFn: Function, x: Array|Object): Array|Object

It returns the result of looping through iterable `x` with `mapFn`.

The method works with objects as well.

Note that unlike Ramda's `map`, here object keys are passed as second argument to `mapFn`.

```
const mapFn = x => x * 2
const resultWithArray = R.map(mapFn, [1, 2, 3])
// => [2, 4, 6]

const result = R.map((val, prop)=>{
  return `${val}-${prop}`
}, {a: 1, b: 2})
// => {a: 'a-1', b: 'b-2'}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/map.js)

#### match

> match(regExpression: Regex, str: string): string[]

```
R.match(/([a-z]a)/g, 'bananas') // => ['ba', 'na', 'na']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/match.js)

#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/merge.js)

#### modulo

> modulo(a: number, b: number):numberNumber

It returns the remainder of operation `a/b`.

```
R.module(14, 3) // => 2
```

#### multiply

> multiply(a: number, b: number): number

It returns the result of operation `a*b`.

```
R.multiply(4, 3) // => 12
```

#### not

> not(x: any): boolean

It returns inverted boolean version of input `x`.

```
R.not(true) //=> false
R.not(false) //=> true
R.not(0) //=> true
R.not(1) //=> false
```

#### omit

> omit(propsToOmit: string[]|string, obj: Object): Object

It returns a partial copy of an `obj` with omitting `propsToOmit`

```
R.omit('a,c,d', {a: 1, b: 2, c: 3}) // => {b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/omit.js)

#### path

> path(pathToSearch: string[]|string, obj: Object): any

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

```
R.path('a.b', {a: {b: 1}}) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/path.js)

#### pathOr

> pathOr(defaultValue: any, pathToSearch: string[]|string, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` is `undefined`, `null` or `NaN`, then `defaultValue` will be returned.

`pathFound` is returned in any other case.

```
R.pathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'b'], {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'c'], {a: {b: 2}}) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pathOr.js)

#### partialCurry

> partialCurry(fn: Function|Async, a: Object, b: Object): Function|Promise

When called with function `fn` and first set of input `a`, it will return a function.

This function will wait to be called with second set of input `b` and it will invoke `fn` with the merged object of `a` over `b`.

`fn` can be asynchronous function. In that case a `Promise` holding the result of `fn` is returned.

See the example below:

```
const fn = ({a, b, c}) => {
  return (a * b) + c
}
const curried = R.partialCurry(fn, {a: 2})
const result = curried({b: 3, c: 10})
// => 16
```

- Note that `partialCurry` is method specific for **Rambda** and the method is not part of **Ramda**'s API

- You can read my argumentation for creating *partialCurry* [here](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

[Source](https://github.com/selfrefactor/rambda/tree/master/src/partialCurry.js)

#### pick

> pick(propsToPick: string[], obj: Object): Object

It returns a partial copy of an `obj` containing only `propsToPick` properties.

```
R.pick(['a', 'c'], {a: 1, b: 2}) // => {a: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pick.js)

#### pipe

> pipe(fn1: Function, ... , fnN: Function): any

It performs left-to-right function composition.

```
const result = R.pipe(
  R.filter(val => val > 2),
  R.map(a => a * 2)
)([1, 2, 3, 4])

// => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pipe.js)

#### pluck

> pluck(property: string, arr: Object[]): any[]

It returns list of the values of `property` taken from the objects in array of objects `arr`.

```
R.pluck('a')([{a: 1}, {a: 2}, {b: 3}]) // => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pluck.js)

#### prepend

> prepend(x: T, arr: T[]): T[]

It adds `x` to the start of the array `arr`.

```
R.prepend('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/prepend.js)

#### prop

> prop(propToFind: string, obj: Object): any

It returns `undefined` or the value of property `propToFind` in `obj`

```
R.prop('x', {x: 100}) // => 100
R.prop('x', {a: 1}) // => undefined
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/prop.js)

#### propEq

> propEq(propToFind: string, valueToMatch: any, obj: Object): boolean

It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`.

```
const propToFind = 'foo'
const valueToMatch = 0

const result = R.propEq(propToFind, valueToMatch)({foo: 0})
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/propEq.js)

#### range

> range(start: number, end: number): number[]

It returns a array of numbers from `start`(inclusive) to `end`(exclusive).

```
R.range(0, 3)   // => [0, 1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/range.js)

#### reduce

> reduce(iteratorFn: Function, accumulator: any, array: T[]): any

```
const iteratorFn = (acc, val) => acc + val
const result = R.reduce(iteratorFn, 1, [1, 2, 3])
// => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reduce.js)

#### reject

> reject(fn: Function, arr: T[]): T[]

It has the opposite effect of `R.filter`.

It will return those members of `arr` that return `false` when applied to function `fn`.

```
const fn = x => x % 2 === 1

const result = R.reject(fn, [1, 2, 3, 4]) 
// => [2, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reject.js)

#### repeat

> repeat(valueToRepeat: T, num: number): T[]

```
R.repeat('foo', 2) // => ['foo', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/repeat.js)

#### replace

> replace(strOrRegex: string|Regex, replacer: string, str: string): string

It replaces `strOrRegex` found in `str` with `replacer`.

```
R.replace('foo', 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/, 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/g, 'bar', 'foo foo') // => 'bar bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/replace.js)

#### reverse

reverse(str: T[]): T[]

```
const arr = [1, 2]

const result = R.reverse(arr)
// => [2, 1]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reverse.js)

#### sort

takeLast(num: number, arrOrStr: T[]|string): T[]|String

It returns copy of `arr` sorted by `sortFn`.

Note that `sortFn` must return a number type.

```
const sortFn = (a, b) => a - b

const result = R.sort(sortFn, [3, 1, 2]) 
// => [1, 2, 3]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/sort.js)

#### sortBy

> sortBy(sortFn: Function, arr: T[]): T[]

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return value for comparison

```
const sortFn = obj => obj.foo

const result = R.sortBy(sortFn, [
  {foo: 1},
  {foo: 0}
])

const expectedResult = [ {foo: 0}, {foo: 1} ]
console.log(result === expectedResult) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/sortBy.js)

#### split

> split(separator: string, str: string): string[]

```
R.split('-', 'a-b-c') // => ['a', 'b', 'c']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/split.js)

#### splitEvery

> splitEvery(sliceLength: number, arrOrString: T[]|string): T[T[]]|string[]

- It splits `arrOrStr` into slices of `sliceLength`.

```
R.splitEvery(2, [1, 2, 3]) // => [[1, 2], [3]]
R.splitEvery(3, 'foobar') // => ['foo', 'bar']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/splitEvery.js)

#### startsWith

> startsWith(x: string, str: string): boolean

```
R.startsWith(
  'foo',
  'foo-bar'
) // => true

R.startsWith(
  'bar',
  'foo-bar'
) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/startsWith.js)

#### subtract

> subtract(a: number, b: number): number

```
R.subtract(3, 1) // => 2
```

#### T

`R.T() // => true`

#### tail

> tail(arrOrStr: T[]|string): T[]|string

- It returns all but the first element of `arrOrStr`

```
R.tail([1, 2, 3])  // => [2, 3]
R.tail('foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/tail.js)

#### take

> take(num: number, arrOrStr: T[]|string): T[]|string

- It returns the first `num` elements of `arrOrStr`.

```
R.take(1, ['foo', 'bar']) // => ['foo']
R.take(2, ['foo']) // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/take.js)

#### takeLast

> takeLast(num: number, arrOrStr: T[]|string): T[]|string

- It returns the last `num` elements of `arrOrStr`.

```
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, ['foo']) // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/takeLast.js)

#### test

> test(regExpression: Regex, str: string): boolean

- Determines whether `str` matches `regExpression`

```
R.test(/^f/, 'foo') 
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/test.js)

#### times

> times(fn: Function, n: number): T[]

It returns the result of applying function `fn` over members of range array.
The range array includes numbers between `0` and `n`(exclusive).

```
R.times(R.identity, 5)
//=> [0, 1, 2, 3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/times.js)

#### toLower

> toLower(str: string): string

```
R.toLower('FOO') // => 'foo'
```

#### toString

> toString(x: any): string

```
R.toString([1, 2]) // => '1,2'
```

#### toUpper

> toUpper(str: string): string

```
R.toUpper('foo') // => 'FOO'
```

#### trim

> trim(str: string): string

```
R.trim('  foo  ') // => 'foo'
```

#### type

> type(a: any): string

```
R.type(() => {}) // => 'Function'
R.type(async () => {}) // => 'Async'
R.type([]) // => 'Array'
R.type({}) // => 'Object'
R.type('foo') // => 'String'
R.type(1) // => 'Number'
R.type(true) // => 'Boolean'
R.type(null) // => 'Null'
R.type(/[A-z]/) // => 'RegExp'

const delay = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve()
  }, ms)
})
R.type(delay) // => 'Promise'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/type.js)

#### uniq

> uniq(arr: T[]): T[]

It returns a new array containing only one copy of each element in `arr`.

```
R.uniq([1, 1, 2, 1])
// => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/uniq.js)

#### uniqWith

> uniqWith(fn: Function, arr: T[]): T[]

It returns a new array containing only one copy of each element in `arr` according to boolean returning function `fn`.

```
const arr = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
  {id: 3, title:'foo'},
  {id: 4, title:'bar'},
]

const expectedResult = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
]

const fn = (x,y) => x.title === y.title

const result = R.uniqWith(fn, arr)

console.log(result === expectedResult) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/uniqWith.js)

#### update

> update(i: number, replaceValue: T, arr: T[]): T[]

It returns a new copy of the `arr` with the element at `i` index
replaced with `replaceValue`.

```
R.update(0, 'foo', ['bar', 'baz'])
// => ['foo', baz]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/update.js)

#### values

> values(obj: Object): Array

It returns array with of all values in `obj`.

```
R.values({a: 1, b: 2})
// => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/values.js)

#### without

> without(a: T[], b: T[]): T[]

It will return a new array based on `b` array.

This array contains all members of `b` array, that doesn't exist in `a` array.

Method `R.equals` is used to determine the existance of `b` members in `a` array.

```
R.without([1, 2], [1, 2, 3, 4])
// => [3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/without.js)
