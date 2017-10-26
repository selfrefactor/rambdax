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

#### greater

> greater(x: string, y: string)

It return true if the second argument is greater than the first argument.
Note that this is opposite direction compared to Rambda's `gt` method.

#### intersection

> intersection(a: Array, b: Array): Array

It returns array with the overlapped members of `a` and `b`.

```
R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
```

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

#### isType

> isType(xType: String, x: any): Boolean

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

#### less

> less(x: string, y: string)

It return true if the second argument is less than the first argument.
Note that this is opposite direction compared to Rambda's `lt` method.

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

> memoize(fn: Function|Promise<any>): any

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

> mergeAll(input: object[]): object

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

> random(min: number, max: number): number

It returns a random number between `min` inclusive and `max` inclusive.

```
const randomResult = R.random(1, 10)
expect(randomResult).toBeLessThanOrEqual(10)
expect(randomResult).toBeGreaterThanOrEqual(1)
```

#### rangeBy

> rangeBy(start: number, end: number, step: number): number[]

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

> renameProps(rules: object, input: object): object

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

> resolve(promises: object): Promise

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

> shuffle(arr: any[]): any[]

It returns randomized copy of array.

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

> throttle(fn: Function, period: number): Function

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

> where(conditions: object, input: object): boolean

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

```
var truncate = R.when(
  x => x.length > 5,
  R.compose(x => `${x}...`, R.take(5))
)

console.log(truncate('1234')) => '1234'
console.log(truncate('12345678')) => '12345...'
```

---

### Methods inherited from Rambda

#### add

> add(a: Number, b: Number): Number

```javascript
R.add(2, 3) // =>  5
```

[Source](https://github.com/selfrefactor/rambda/blob/master/modules/add.js)

#### addIndex

> addIndex(fn: Function): Function

```javascript
const mapWithIndex = R.addIndex(R.map)
mapWithIndex(
  (val, index) => `${val} - ${index}`,
  ["A", "B", "C"]
) // => ["A - 0", "B - 1", "C - 2"]
```

[Source](https://github.com/selfrefactor/rambda/blob/master/modules/addIndex.js)

#### adjust

> adjust(replaceFn: Function, i:Number, arr:Array): Array

It replaces `i` index in `arr` with the result of `replaceFn(arr[i])`.

```javascript
R.adjust(a => a + 1, 0, [0, 100]) // => [1, 100]
```

#### all

> all(fn: Function, arr: Array): Boolean

It returns `true` if all members of array `arr` returns `true`, when applied as argument to function `fn`.

```
const arr = [ 0, 1, 2, 3, 4 ]
const fn = x => x > -1
R.all(fn, arr) // => true
```

#### allPass

> allPass(rules: Array<Function>, input: any): Boolean

It returns `true` if all functions of `rules` return `true`, when `input` is their argument.

```
const input = {
  a : 1,
  b : 2,
}
const rules = [
  x => x.a === 1,
  x => x.b === 2,
]
R.allPass(conditionArr, obj) // => true
```

#### always

> always(x: any): Function

It returns function that always returns `x`.
```
const fn = R.always(7)

fn()// => 7
fn()// => 7
```

#### any

> any(condition: Function, arr: Array): Boolean

It returns true if at least one member of `arr` returns true,
when passed to the `condition` function.

```javascript
R.any(a => a * a > 8)([1, 2, 3]) // => true
R.any(a => a * a > 10)([1, 2, 3]) // => false
```

#### append

> append(valueToAppend: any, arr: Array): Array

```javascript
R.append('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

#### both

> both(x: Function, y: Function, input: any): Boolean

It returns `true` if both function `x` and function `y` return `true`, when `input` is their argument.

```
const fn = R.both(
  a => a > 10,
  a => a < 20
)
fn(15) //=> true
fn(30) //=> false
```

#### compose

> compose(fn1: Function, ... , fnN: Function): any

It performs right-to-left function composition.
```
const result = R.compose(
  R.map(x => x * 2)
  R.filter(x => x > 2),
)([1, 2, 3, 4])
console.log(result) // => [6, 8]
```

#### complement

> complement(fn: Function): Function

It returns `complemented` function that accept `input` as argument.

The return value of `complemented` is the negative boolean value of `fn(input)`.

```
R.complement(R.always(0)) // => true
R.complement(R.always(true)) // => false
```

#### concat

> concat(x: Array|String, y: Array|String): Array|String

It returns new string or array, which is result merging `x` and `y`.

```
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo', 'bar') // => 'foobar'
```

#### contains

> contains(valueToFind: any, arr: Array): Boolean

It returns true if `valueToFind` is part of `arr`.

```javascript
R.contains(2, [1, 2]) // => true
R.contains(3, [1, 2]) // => false
```

#### curry

> curry(fn: Function): Function

It returns curried version of `fn`.

```javascript
const addFourNumbers = (a, b, c, d) => a + b + c + d
const curriedAddFourNumbers = R.curry(addFourNumbers)
const f = curriedAddFourNumbers(1, 2)
const g = f(3)
g(4) // => 10
```

#### defaultTo

> defaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` is `undefined`, `null` or `NaN`.

It returns `inputArgument` in any other case.

```javascript
R.defaultTo('foo', undefined) // => 'foo'
R.defaultTo('foo', 'bar') // => 'bar'
R.defaultTo('foo', 1) // => 1
```

#### divide

```javascript
R.divide(71, 100) // => 0.71
```

#### drop

> drop(howManyToDrop: Number, arrOrStr: Array|String): Array|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the left.

```javascript
R.drop(1, ['foo', 'bar', 'baz']) // => ['bar', 'baz']
R.drop(1, 'foo')  // => 'oo'
```

#### dropLast

> dropLast(howManyToDrop: Number, arrOrStr: Array|String): Array|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the right.

```javascript
R.dropLast(1, ['foo', 'bar', 'baz']) // => ['foo', 'bar']
R.dropLast(1, 'foo')  // => 'fo'
```

#### endsWith

> endsWith(x: String, str: String): Boolean

```
R.endsWith(
  'bar',
  'foo-bar'
) // => true

R.endsWith(
  'foo',
  "foo-bar"
) // => false
```

#### either

```
const fn = R.either(
  a => a > 10,
  a => a % 2 === 0
)
fn(15) //=> true
fn(6) //=> true
fn(7) //=> false
```

#### equals

> equals(a: any, b: any): Boolean

It returns equality match between `a` and `b`.

It doesn't handle cyclical data structures.

```javascript
R.equals(1, 1) // => true
R.equals({}, {}) // => false
R.equals([1, 2, 3], [1, 2, 3]) // => true
```

#### F

`R.F() // => false`

#### filter

> filter(filterFn: Function, arr: Array): Array

Filters `arr` throw boolean returning `filterFn`

```javascript
const filterFn = a => a % 2 === 0

R.filter(filterFn, [1, 2, 3, 4]) // => [2, 4]
```

#### find

> find(findFn: Function, arr: Array<T>): T|undefined

It returns `undefined` or the first element of `arr` satisfying `findFn`.

```javascript
const findFn = a => R.type(a.foo) === "Number"
const arr = [{foo: "bar"}, {foo: 1}]
R.find(findFn, arr) // => {foo: 1}
```

#### findIndex

> findIndex(findFn: Function, arr: Array): Number

It returns `-1` or the index of the first element of `arr` satisfying `findFn`.

```javascript
const findFn = a => R.type(a.foo) === "Number"
const arr = [{foo: "bar"}, {foo: 1}]
R.find(findFn, arr) // => 1
```

#### flatten

> flatten(arr: Array): Array

```javascript
R.flatten([ 1, [ 2, [ 3 ] ] ])
// => [ 1, 2, 3 ]
```

#### flip

> flip(fn: Function): Function

It returns function which calls `fn` with exchanged first and second argument.

```javascript
const subtractFlip = R.flip(R.subtract)
R.subtractFlip(1,7)
// => 6
```

#### forEach

> forEach(fn: Function, arr: Array): Array

It applies function `fn` over all members of array `arr` and returns `arr`.

```javascript
const sideEffect = {}
const result = R.forEach(
  x => sideEffect[`foo${x}`] = x
)([1, 2])

console.log(sideEffect) //=> {foo1 : 1, foo2 : 2}
console.log(result) //=> [1, 2]
```

Note, that unlike `Ramda`'s **forEach**, Rambda's one doesn't dispatch to `forEach` method of `arr`.

#### has

> has(prop: String, obj: Object): Boolean

- It returns `true` if `obj` has property `prop`.

```javascript
R.has("a", {a: 1}) // => true
R.has("b", {a: 1}) // => false
```

#### head

> head(arrOrStr: Array|String): any

It returns the first element of `arrOrStr`.

```javascript
R.head([1, 2, 3]) // => 1
R.head('foo') // => 'f'
```

#### identity

> identity(x: T): T

It just passes back the supplied arguments.
```
R.identity(7) // => 7
```

#### ifElse

> ifElse(condition: Function, ifFn: Function, elseFn: Function): Function

It returns function, which expect `input` as argument and returns `finalResult`.

When the function is called, a value `answer` is generated as a result of `condition(input)`.

If `answer` is `true`, then `finalResult` is equal to `ifFn(input)`.
If `answer` is `false`, then `finalResult` is equal to `elseFn(input)`.

```
const fn = R.ifElse(
 x => x > 10,
 x => x*2,
 x => x*10
)
fn(8) // => 80
fn(11) // => 22
```

#### indexOf

> indexOf(valueToFind: any, arr: Array): Number

It returns `-1` or the index of the first element of `arr` equal of `valueToFind`.

```javascript
R.indexOf(1, [1, 2]) // => 0
```

#### init

> init(arrOrStr: Array|String): Array|String

- It returns all but the last element of `arrOrStr`.

```javascript
R.init([1, 2, 3])  // => [1, 2]
R.init('foo')  // => 'fo'
```

#### join

> join(separator: String, arr: Array): String

```javascript
R.join('-', [1, 2, 3])  // => '1-2-3'
```

#### isNil

> isNil(x: any): Boolean

It returns `true` is `x` is either `null` or `undefined`.

```javascript
R.isNil(null)  // => true
R.isNil(1)  // => false
```

#### last

> last(arrOrStr: Array|String): any

- It returns the last element of `arrOrStr`.

```javascript
R.last(['foo', 'bar', 'baz']) // => 'baz'
R.last('foo') // => 'o'
```

#### lastIndexOf

> lastIndexOf(x: any, arr: Array): Number

```
R.lastIndexOf(1, [1, 2, 3, 1, 2]) // => 3
R.lastIndexOf(10, [1, 2, 3, 1, 2]) // => -1
```

#### length

> length(arrOrStr: Array|String): Number

```javascript
R.length([1, 2, 3]) // => 3
```

#### map

> map(mapFn: Function, arr: Array): Array

It returns the result of looping through `arr` with `mapFn`.

```javascript
const mapFn = x => x * 2;
R.map(mapFn, [1, 2, 3]) // => [2, 4, 6]
```

#### match

> match(regExpression: Regex, str: String): Array

```javascript
R.match(/([a-z]a)/g, 'bananas') // => ['ba', 'na', 'na']
```

#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```javascript
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

#### modulo

> modulo(a: Number, b: Number): Number

It returns the remainder of operation `a/b`.

```javascript
R.module(14,3) // => 2
```

#### multiply

> multiply(a: Number, b: Number): Number

It returns the result of operation `a*b`.

```javascript
R.module(14,3) // => 2
```

#### not

> not(x: any): Boolean

It returns inverted boolean version of input `x`.

```
R.not(true); //=> false
R.not(false); //=> true
R.not(0); //=> true
R.not(1); //=> false
```

#### omit

> omit(propsToOmit: Array<String>, obj: Object): Object

It returns a partial copy of an `obj` with omitting `propsToOmit`

```javascript
R.omit(['a', 'd'], {a: 1, b: 2, c: 3}) // => {b: 2, c: 3}
```

#### path

> path(pathToSearch: Array<String>|String, obj: Object): any

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

```javascript
R.path('a.b', {a: {b: 1}}) // => 1
R.path(['a', 'b'], {a: {b: 2}}) // => 2
R.path(['a', 'c'], {a: {b: 2}}) // => undefined
```

#### pathOr

> pathOr(defaultValue: any, pathToSearch: Array<String>|String, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` is `undefined`, `null` or `NaN`, then `defaultValue` will be returned.

`pathFound` is returned in any other case.

```javascript
R.pathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'b'], {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'c'], {a: {b: 2}}) // => 1
```

#### partialCurry

> partialCurry(fn: Function|Async, a: Object, b: Object): Function|Promise

When called with function `fn` and first set of input `a`, it will return a function.

This function will wait to be called with second set of input `b` and it will invoke `fn` with the merged object of `a` over `b`.

`fn` can be asynchronous function. In that case a `Promise` holding the result of `fn` is returned.

See the example below:

```javascript
const fn = ({a, b, c}) => {
  return (a * b) + c
}
const curried = R.partialCurry(fn, {a: 2})
curried({b: 3, c: 10}) // => 16
```

- Note that `partialCurry` is method specific for **Rambda** and the method is not part of **Ramda**'s API

- You can read my argumentation for creating *partialCurry* [here](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

#### pick

> pick(propsToPick: Array<String>, obj: Object): Object

It returns a partial copy of an `obj` containing only `propsToPick` properties.

```
R.pick(['a', 'c'], {a: 1, b: 2}) // => {a: 1}
```

#### pipe

> pipe(fn1: Function, ... , fnN: Function): any

It performs left-to-right function composition.
```
const result = R.pipe(
  R.filter(val => val > 2),
  R.map(a => a * 2)
)([1, 2, 3, 4])
console.log(result) // => [6, 8]
```

#### pluck

> pluck(property: String, arr: Array): Array

It returns list of the values of `property` taken from the objects in array of objects `arr`.

```
R.pluck('a')([{a: 1}, {a: 2}, {b: 3}]) // => [1, 2]
```

#### prepend

> prepend(x: any, arr: Array): Array

It adds `x` to the start of the array `arr`.

```javascript
R.prepend('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

#### prop

> prop(propToFind: String, obj: Object): any

It returns `undefined` or the value of property `propToFind` in `obj`

```javascript
R.prop('x', {x: 100}) // => 100
R.prop('x', {a: 1}) // => undefined
```

#### propEq

> propEq(propToFind: String, valueToMatch: any, obj: Object): Boolean

It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`

```javascript
const propToFind = "foo"
const valueToMatch = 0
R.propEq(propToFind, valueToMatch)({foo: 0}) // => true
R.propEq(propToFind, valueToMatch)({foo: 1}) // => false
```

#### range

> range(start: Number, end: Number): Array<Number>

It returns a array of numbers from `start`(inclusive) to `end`(exclusive).

```javascript
R.range(0, 2)   // => [0, 1]
```

#### reduce

> reduce(iteratorFn: Function, accumulator: any, array: Array): any

It returns a single item by iterating through the list, successively calling the iterator function `iteratorFn` and passing it an `accumulator` value and the current value from the array, and then passing the result to the next call.

The iterator function behaves like the native callback of the [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.

```javascript
const iteratorFn = (acc, val) => acc + val
R.reduce(iteratorFn, 1, [1, 2, 3])   // => 7
```

#### repeat

> repeat(valueToRepeat: T, num: Number): Array<T>

```javascript
R.repeat('foo', 2) // => ['foo', 'foo']
```

#### replace

> replace(strOrRegex: String|Regex, replacer: String, str: String): String

Replace `strOrRegex` found in `str` with `replacer`

```javascript
R.replace('foo', 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/, 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/g, 'bar', 'foo foo') // => 'bar bar'
```

#### reverse

!!! It modifies the array instead of returning new copy, as original `Ramda` method does.

```
const arr = [1, 2]
R.reverse(arr)
console.log(arr) // => [2, 1]
```

#### sort

> sort(sortFn: Function, arr: Array): Array

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return `Number`

```javascript
const sortFn = (a, b) => a - b
R.sort(sortFn, [3, 1, 2]) // => [1, 2, 3]
```

#### sortBy

> sortBy(sortFn: Function, arr: Array): Array

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return value for comparison

```javascript
const sortFn = obj => obj.foo
R.sortBy(sortFn, [
  {foo: 1},
  {foo: 0}
])
// => [{foo: 0}, {foo: 1}]
```

#### split

> split(separator: String, str: String): Array

```javascript
R.split('-', 'a-b-c') // => ['a', 'b', 'c']
```

#### splitEvery

> splitEvery(sliceLength: Number, arrOrString: Array|String): Array

- Splits `arrOrStr` into slices of `sliceLength`

```javascript
R.splitEvery(2, [1, 2, 3]) // => [[1, 2], [3]]
R.splitEvery(3, 'foobar') // => ['foo', 'bar']
```

#### startsWith

> startsWith(x: string, str: String): Boolean

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

#### subtract

> subtract(a: Number, b: Number): Number

```javascript
R.subtract(3, 1) // => 2
```

#### T

`R.T() // => true`

#### tail

> tail(arrOrStr: Array|String): Array|String

- It returns all but the first element of `arrOrStr`

```javascript
R.tail([1, 2, 3])  // => [2, 3]
R.tail('foo')  // => 'oo'
```

#### take

> take(num: Number, arrOrStr: Array|String): Array|String

- It returns the first `num` elements of `arrOrStr`.

```javascript
R.take(1, ['foo', 'bar']) // => ['foo']
R.take(2, ['foo']) // => 'fo'
```

#### takeLast

> takeLast(num: Number, arrOrStr: Array|String): Array|String

- It returns the last `num` elements of `arrOrStr`.

```javascript
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, ['foo']) // => 'oo'
```

#### test

> test(regExpression: Regex, str: String): Boolean

- Determines whether `str` matches `regExpression`

```javascript
R.test(/^f/, 'foo') // => true
R.test(/^f/, 'bar') // => false
```

#### times

> times(fn: Function, n: Number): Array

It returns the result of applying function `fn` over members of range array.
The range array includes numbers between `0` and `n`(exclusive).

```javascript
R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
```

#### toLower

> toLower(str: String): String

```javascript
R.toLower('FOO') // => 'foo'
```

#### toString
> toString(x: any): String

`R.toString([1, 2]) // => '1,2'`

#### toUpper

> toUpper(str: String): String

```javascript
R.toUpper('foo') // => 'FOO'
```

#### trim

> trim(str: String): String
```javascript
R.trim('  foo  ') // => 'foo'
```

#### type

> type(a: any): String

```javascript
R.type(() => {}) // => "Function"
R.type(async () => {}) // => "Async"
R.type([]) // => "Array"
R.type({}) // => "Object"
R.type('foo') // => "String"
R.type(1) // => "Number"
R.type(true) // => "Boolean"
R.type(null) // => "Null"
R.type(/[A-z]/) // => "RegExp"

const delay = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve()
  }, ms)
})
R.type(delay) // => "Promise"
```

#### typedDefaultTo

> typedDefaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` and `defaultValue` has different types.

It returns `inputArgument` in any other case.

```javascript
R.typedDefaultTo('foo', undefined) // => 'foo'
R.typedDefaultTo('foo', 'bar') // => 'bar'
R.typedDefaultTo('foo', 1) // => 'foo'
```

- Note that `typedDefaultTo` is method specific for **Rambda** and the method is not part of **Ramda**'s API

#### typedPathOr

> typedPathOr(defaultValue: any, pathToSearch: Array<String>|String, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` has different type than `defaultValue`, then `defaultValue` will be returned.

If `pathFound` has the same type as `defaultValue`, then `pathFound` will be returned.

```javascript
R.typedPathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.typedPathOr(1, 'a.b', {a: {b: 'foo'}}) // => 1
```

- Note that `typedPathOr` is method specific for **Rambda** and the method is not part of **Ramda**'s API

#### uniq

> uniq(arr: Array): Array

It returns a new array containing only one copy of each element in `arr`.

```javascript
R.uniq([1, 1, 2, 1]) // => [1, 2]
R.uniq([1, '1'])     // => [1, '1']
```

#### update

> update(i: Number, replaceValue: any, arr: Array): Array

It returns a new copy of the `arr` with the element at `i` index
replaced with `replaceValue`.

```javascript
R.update(0, "foo", ['bar', 'baz']) // => ['foo', baz]
```

#### values

> values(obj: Object): Array

It returns array with of all values in `obj`.

```javascript
R.values({a: 1, b: 2}) // => [1, 2]
```

---

#### includes

> includes(x: any, arrOrStr: Array|String): Boolean

```
R.includes(1, [1, 2]) // => true
R.includes('oo', 'foo') // => true
R.includes('z', 'foo') // => false
```

!! Note that this method is not part of `Ramda` API.

#### padEnd

> padEnd(x: Number, str: String): String

`R.padEnd(3, 'foo') // => 'foo   '`

!! Note that this method is not part of `Ramda` API.

#### padStart

> padStart(x: Number, str: String): String

`R.padStart(3, 'foo') // => '   foo'`

!! Note that this method is not part of `Ramda` API.
