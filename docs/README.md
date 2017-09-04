# Rambdax

Extended version of Rambda(utility library) - [Documentation](https://selfrefactor.github.io/rambdax/#/)

## Simple example

```
const R = require("rambdax")
const result = R.compose(
  R.filter(val => val>2),
  R.flatten,
)([ [1], [2], [3], 4])
console.log(result) // => [3,4]
```

## How to use it?

Simple `npm i rambdax` is sufficient

## Differences between Rambda and Ramda

- Rambda's **equals** doesn't protect against circular structures as **Ramda.equals** does

- Rambda's **map/filter** works only for arrays, while Ramda's **map/filter** accept also objects

- Rambda's **type** detect async functions. The returned value is `"Async"`

## Differences between Rambda and Ramdax

Rambdax passthrough all `Rambda`'s methods and introduce some new functions.

The idea of `Rambdax` is to extend `Rambda` without worring for `Ramda` compatibility.

## API

### API part I - Rambdax own methods

#### all

> all(fn: Function, arr: Array): Boolean

It returns `true` if all members of array `arr` returns `true`, when applied as argument to function `fn`. 

```
const numArr = [ 0, 1, 2, 3, 4 ]
const fn = x => x > -1
expect(R.all(fn, numArr)).toBeTruthy()
```

#### allPass

> allPass(rules: Array<Function>, input: any): Boolean

It returns `true` if all functions of `rules` return `true`, when `input` is their argument.

```
const obj = {
  a : 1,
  b : 2,
}
const conditionArr = [
  val => val.a === 1,
  val => val.b === 2,
]
expect(
  R.allPass(conditionArr, obj)
).toBeTruthy()
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

#### compact

> compact(arr: Array)

It removes the empty values from an array `arr`.

```
const arr = [
  1,
  null,
  undefined,
  false,
  "",
  " ",
  "foo", {},
  [],
  [1],
  /\s/g
]
const result = R.compact(arr)
const expectedResult = [1, false, " ", "foo", [1]]
expect(result).toEqual(expectedResult)
```

#### composeAsync

> composeAsync(fn1: Function|Async, .. , fnN: Function|Async)(startValue: any): Promise

- `compose` that accepts `async` functions as arguments

```
const delayAsync = async ms => delay(ms)

const delay = ms => new Promise(resolve=>{
  setTimeout(function () {
    resolve(ms+110)
  }, ms)
})

const result = await composeAsync(
  a => a - 1000,
  a => a,
  async a => delayAsync(a),
  a => a+11
)(await delay(20))
expect(
  result
).toEqual(-749)
```

#### debounce

> debounce(fn: Function, wait: Number): any

```
it("", async() => {
  let counter = 0
  const inc = () => {
    counter++
  }

  const delay = ms => new Promise(resolve => {
    setTimeout(resolve, ms)
  })
  const incWrapped = debounce(inc, 500)
  incWrapped()
  expect(counter).toBe(0)
  await delay(200)
  incWrapped()
  expect(counter).toBe(0)
  await delay(200)
  incWrapped()
  expect(counter).toBe(0)
  await delay(200)
  incWrapped()
  expect(counter).toBe(0)
  await delay(700)
  expect(counter).toBe(1)
})
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
expect(result).toEqual({
  firstName: "Tomato",
  data: {
    elapsed: 101,
    remaining: 1399,
  },
  id: 123,
})  
```

#### flip

> flip(fn: Function): Function

It returns copy of the function `fn` with exchanged order of the first and second function arguments.
```
const fn = (a,b) => a - b
const flipped = R.flip(fn)
fn(4,1)      // =>  3 
flipped(4,1) // => -3
```

#### intersection

> intersection(a: Array, b: Array): Array

It returns array with the overlapped members of `a` and `b`.

```
R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
```

#### isValid

> isValid(input: Object, schema: Object): Boolean

It checks if `input` is following `schema` specifications.

This is full copy of [json-validity](https://github.com/selfrefactor/json-validity) library.

```
const songSchema = {
  published: "number",
  style: [ "rock", "jazz" ],
  title: "string",
}

const song = {
  published: 1975,
  style: "rock",
  title: "In my time of dying",
}

R.isValid(song,songSchema) // => true
```

#### mapAsync

> mapAsync(fn: Async|Promise, arr: Array): Promise<Array>

Sequential asynchronous mapping with `fn` over members of `arr`

```
const fn = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + 100)
  }, 100)
})

const result = await R.composeAsync(
  R.mapAsync(async a => await fn(a)),
  R.mapAsync(fn),
  R.map(a => a * 10)
)([1, 2, 3])
expect(result).toEqual([210, 220, 230])
```

#### mapFastAsync

> mapAsync(fn: Async|Promise, arr: Array): Promise<Array>

Parrallel asynchronous mapping with `fn` over members of `arr`

```
const fn = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + 100)
  }, 100)
})

const result = await R.composeAsync(
  R.mapAsync(async a => await fn(a)),
  R.mapAsync(fn),
  R.map(a => a * 10)
)([1, 2, 3])
expect(result).toEqual([210, 220, 230])
```

#### memoize

> memoize(fn: Function|Promise): any

When `fn` is called for a second time with the same input, then the cache result is returned instead of calling `fn`.

```
describe("memoize", () => {
  it("normal function", () => {
    let counter = 0
    const fn = (a,b) =>{
      counter++
      return a+b
    }
    const memoized = R.memoize(fn)
    expect(memoized(1,2)).toBe(3)
    expect(memoized(1,2)).toBe(3)
    expect(memoized(1,2)).toBe(3)
    expect(counter).toBe(1)
    expect(memoized(2,2)).toBe(4)
    expect(counter).toBe(2)
    expect(memoized(1,2)).toBe(3)
    expect(counter).toBe(2)
  })

  it("async function", async () => {
    let counter = 0
    const delay = ms => new Promise(resolve => {
      setTimeout(resolve, ms)
    })
    const fn = async (ms,a,b) => {
      await delay(ms)
      counter++
      return a+b
    }

    const memoized = R.memoize(fn)
    expect(await memoized(100,1,2)).toBe(3)
    expect(await memoized(100,1,2)).toBe(3)
    expect(await memoized(100,1,2)).toBe(3)
    expect(counter).toBe(1)
    expect(await memoized(100,2,2)).toBe(4)
    expect(counter).toBe(2)
    expect(await memoized(100,1,2)).toBe(3)
    expect(counter).toBe(2)
  })
})
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
expect(R.mergeAll(arr)).toEqual(expectedResult)
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
expect(R.omitBy(fn, input)).toEqual(expectedResult)
```

#### once

> once(fn: Function): Function

It returns a function, which invokes only once`fn`.

```
const addOneOnce = R.once((a, b, c) => a + b + c)

expect(addOneOnce(10,20,30)).toBe(60)
expect(addOneOnce(40)).toEqual(60)
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
expect(R.pickBy(fn, input)).toEqual(expectedResult)
```

#### produce

> produce( conditions: Object, input: any): Promise|Object

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
result === expectedResult // => true
```

`conditions` is an object with sync or async functions as values.

The values of the returned object `returnValue` are the results of those functions when `input` is passed. 
The properties of the returned object are equal to `input`.

If any of the `conditions` is a `Promise`, then the returned value is a `Promise` that resolves to `returnValue`. 

#### race

> race(promised: Object): Object

It acts as `Promise.race` for object with promises.

```
const delay = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve(ms)
  }, ms)
})
const promises = {
  a : delay(20),
  b : delay(10),
}

R.race(promises)
.then(result =>{
  // => { a: 10 }
})
```

```
const delay = ms => new Promise((resolve,reject) => {
  setTimeout(() => {
    reject(ms)
  }, ms)
})
const promises = {
  a : delay(1),
  b : delay(2),
}
R.race(promises)
.then(console.log)
.catch(err =>{
  // => { a: 1 }
})
```

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

> Typing:

```
R.renameProps(rules: Object, input: Object): Object
```

If property `prop` of `rules` is also a property in `input`, then rename `input` property to `rules[prop]`.

> Example:

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
```

#### resolveObj

> resolveObj(promises: Object): Object

It acts as `Promise.all` for object with Promises.

```
const delay = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve(ms)
  }, ms)
})
const promises = {
  a : delay(1),
  b : delay(2),
  c : delay(3),
}
const result = await R.resolveObj(promises)
// => { a:1, b:2, c:3 }
```

#### resolveSecure

> resolveObj(promises: Array): Array<{type: 'result'|'error', payload:any}>

It acts as `Promise.all` with fault tollerance.

Error `err` in any of the `promises` would simply add `{type: 'error', payload: err}` to the returned array.
Result `result` in any of the `promises` adds `{type: 'result', payload: result}`.

```
const delay = ms => new Promise(res => {
  setTimeout(() => res(ms), ms)
})

const fail = async ms => {
  try {
    JSON.parse("{:a")
  }
  catch (err) {
    throw new Error(err)
  }
}

const arr = [delay(2000), fail(1000), delay(1000)]
const result = await R.resolveSecure(arr)
const expectedResult = [
  {
    "payload": 2000,
    "type": "result"
  },
  {
    payload:"Unexpected token : in JSON at position 1",
    type: "error"
  },
  {
    "payload": 2000,
    "type": "result"
  }
]  
// => result === expectedResult
```

#### shuffle

> shuffle(arr: Array): Array

It returns randomized copy of `arr`.

#### tap

> tap(fn: Function, inputArgument: T): T

It returns back `inputArgument` after calling `fn` with `inputArgument`. 

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

const delay = ms => new Promise(resolve => {
  setTimeout(resolve, ms)
})
const incWrapped = throttle(inc, 1000)
await delay(500)
incWrapped()
incWrapped()
incWrapped()
expect(counter).toBe(1)
await delay(1500)
incWrapped()
expect(counter).toBe(2)
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

#### wrap

> wrap({fn: Function, when: Function|Async, defaultTo: any}): Promise|Function

It returns a function or a Promise with input argument `input`.

- When `fn` is called with `input`, then `intermediateResult` is obtained.

- `fn` can be from the asynchronous entity, i.e. `Promise` or `Async`

- if that is the case, `when` can also be a Promise-like

- `rule` is called with `intermediateResult` to obtain `ruleResult`. 

- If `ruleResult` is `true`, then the final result is `intermediateResult`. 

- If `ruleResult` is `false`, then the final result is `defaultTo`. 


```
const result = R.wrap({
  fn: R.filter(a => a > 3), 
  defaultTo:  [ 4 ],
  when:       x => R.length(x) === 0
})([1, 2, 3])

expect(result)
.toEqual([4])
```


### Methods inherited from Rambda

#### add

> add(a: Number, b: Number): Number

```javascript
R.add(2, 3) // =>  5
```

#### addIndex

> addIndex(fn: Function): Function

```javascript
const mapWithIndex = R.addIndex(R.map)
mapWithIndex(
  (val, index) => `${val} - ${index}`,
  ["A", "B", "C"]
) // => ["A - 0", "B - 1", "C - 2"]
```

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
  R.map(a => a*2)
  R.filter(val => val>2),
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

> defaultTo(defaultArgument: T, inputArgument: any): T

It returns `defaultArgument` if `inputArgument` is `undefined` or the type of `inputArgument` is different of the type of `defaultArgument`.

It returns `inputArgument` in any other case.

```javascript
R.defaultTo('foo', undefined) // => 'foo'
R.defaultTo('foo')('bar') // => 'bar'
R.defaultTo('foo')(1) // => 'foo'
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

> endsWith(x: any, arrOrStr: Array|String): Boolean

```
R.endsWith(
  'bar',
  "foo-bar"
) // => true

R.endsWith(
  'baz',
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

Note that it works only for functions that expects two arguments. If third argument is passed, then `undefined` is returned.

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

Retrieve the value at `pathToSearch` in object `obj`

```javascript
R.path('a.b', {a: {b: 2}}) // => 2
R.path(['a', 'b'], {a: {b: 2}}) // => 2
R.path(['a', 'c'], {a: {b: 2}}) // => undefined
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

> startsWith(x: any, arrOrStr: Array|String): Boolean

```
R.endsWith(
  'bar',
  "foo-bar"
) // => true

R.endsWith(
  'baz',
  "foo-bar"
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

#### includes

> includes(x: any, arrOrStr: Array|String): Boolean

```
R.includes(1, [1, 2]) // => true
R.includes('oo', 'foo') // => true
R.includes('z', 'foo') // => false
```

Note that this method is not part of `Ramda` API.

#### padEnd

> padEnd(x: Number, str: String): String

`R.padEnd(3, 'foo') // => 'foo   '`

Note that this method is not part of `Ramda` API.

#### padStart

> padStart(x: Number, str: String): String

`R.padStart(3, 'foo') // => '   foo'`

Note that this method is not part of `Ramda` API.

