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

> ES5 compatible version - `yarn add rambdax#0.8.0`

## Differences between Rambda and Ramdax

Rambdax passthrough all [Rambda](https://github.com/selfrefactor/rambda) methods and introduce some new functions.

The idea of **Rambdax** is to extend **Rambda** without worring for **Ramda** compatibility.

- `Rambdax` replaces `Rambda`'s `is` with very different method. Check the API below for further details.

## Typescript

You will need at least version `3.0.0` for `Rambdax` versions after `0.12.0`.

## API

Methods between `allFalse` and `when` belong to **Rambdax**, while methods between `add` and `without` are inherited from **Rambda**.

Several methods are dropped between versions `0.24.0` and `1.0.0`. The older version of the API is located [/files/deprecated/README.md](here.)

#### allFalse

> allFalse(...inputs: any[]): boolean

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

const result = R.allTrue([1,2], x > 1, {})
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allTrue.js)

#### allType

> allType(targetType: string): (...inputs: any[]) => boolean

It returns a function, which will return `true` if all passed elements has the same type as the `targetType`. The example below explains it better:

```
const result = R.allType('String')('foo','bar','baz')
//=> true
```

#### anyFalse

> anyFalse(...inputs: any[]): boolean

It returns `true` if any of the passed elements returns `false` when passed to `Boolean`.

```
R.anyFalse(1, {}, '')
//=> true
```

#### anyTrue

> anyTrue(...inputs: any[]): boolean

It returns `true` if any of the passed elements returns `true` when passed to `Boolean`.

```
R.anyTrue(1, {}, '')
//=> true
```

#### anyType

> anyType(targetType: string): (...inputs: any[]) => boolean

It returns a function, which will return `true` if at least one of the passed elements has the same type as the `targetType`. The example below explains it better:

```
R.anyType('String')(1, {},'baz')
//=> true
```

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

#### composeAsync

> composeAsync(...fns: Array<Function|Async>)(startValue: any): Promise

It is same as `R.compose` but with support for asynchronous functions.

Note that it doesn't work with promises or function retunring promises such as `const foo = input => new Promise(...)`.

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

#### composed

> composed(...fnList: any[]): any

It is basically `R.compose` but instead of passing the input argument as `(input)`, you pass it as the last argument. It is easier to understand with the following example:

```
const result = composed(
  R.map(x => x*10),
  R.filter(x => x > 1),
  [1,2,3]
)
// => [20, 30]
```

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

#### defaultToStrict

> defaultToStrict(defaultValue: T, ...inputArguments: any[]): T

It either returns `defaultValue`, if all of `inputArguments` are considered falsy.

Or it returns the first truthy `inputArguments` instance(from left to right).

It is similar to `R.defaultTo`, but its definition for truthy value is different. The requirement in `R.defaultTo` in any value different than `undefined`, `null` or `NaN`. With `R.defaultToStrict` the conditions are:

- Truthy with `Boolean`
- Has the same type as `defaultValue`(according to `R.type`)
- It is neigher empty object or empty array

```
R.defaultToStrict('foo', undefined) // => 'foo'
R.defaultToStrict('foo', 1) // => 'foo'
R.defaultToStrict('foo', {}) // => 'foo'
R.defaultTo('foo', undefined, 1, [], {}) // => 'foo'
R.defaultTo('foo', undefined, 1, [], {}, 'bar') // => 'bar'
```

#### defaultToWhen

> defaultToWhen(fallback: any, fn: Function, ...inputArguments: any[]): any

It returns `fallback`, if there is none instance of `inputArguments` that satisfies the predicate `fn`.

If there is such instance, then it will be the end result of `R.defaultToWhen`
.

```
const fn = x => x > 2
const fallback = 10
const result = R.defaultToWhen(fallback, fn, 1,6,8,0 )
// result is 6
```

#### delay

> delay(ms: number): Promise

`setTimeout` as a promise that resolves to `R.DELAY` variable.

The value of `R.DELAY` is `'RAMBDAX_DELAY'`.

```
const result = R.delay(1000)
// `result` resolves to `'RAMBDAX_DELAY'`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/delay.js)

#### findInObject

> findInObject(fn: Function, obj: object): object

It will return object with properties `prop` and `value` if predicate function returns `true` for a pair of property and value within `obj`.

If predicate cannot be satisfied, it returns `{fallback: true}`.

```
const fn = (x, key) => x > 1 && key.length > 1
const obj = {
  a   : 1,
  b   : 2,
  foo : 3,
}

const result = R.findInObject(fn, obj)
// => { prop  : 'foo',value : 3}
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/findInObject.js)

#### setter

> setter(key: string|object, value?: any): void

It provides access to the cache object.

You either set individual key-value pairs with `R.setter(key, value)` or you pass directly object, which will be merged with the cache object

```
R.setter({a: 1,b: 'bar'})
R.getter('b')
// => 'bar'
```

#### getter

> getter(key: undefined|string|string[]): any

It provides access to the cache object.

If `undefined` is used as a key, this method will return the whole cache object.

If `string` is passed, then it will return cache value for this key.

If array of `string` is passed, then it assume that this is array of keys and it will return the corresponding cache values for these keys.

```
R.setter('foo','bar')
R.setter('a', 1)
R.getter(['foo','a'])
// => {foo:'baz', a:1}
```

#### reset

> reset(): void

It resets the cache object.

```
R.setter({a: 1,b: 'bar'})
R.getter('b') // => 'bar'
R.reset()
R.getter('b') // => undefined
```

#### glue

> glue(input: string, glueString?: string): string

It transforms multiline string to single line by gluing together the separate lines with the `glueString` and removing the empty spaces. By default `glueString` is equal to single space, so if that is what you need, then you can just pass a single argument.

```
const result = R.glue(`
  foo
  bar
  baz
`)

const expectedResult = 'foo bar baz'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/glue.js)

#### hasPath

> hasPath(input: string|string[], input: object): boolean

It will return true, if `input` object has truthy `path`(calculated with `R.path`).

```
const path = 'a.b'
const obj = {a: {b:[]}}

const result = hasPath(path,obj)

expect(result).toBe(true)
```

#### headObject

> headObject(input: object): {prop: string, value: T}

It must be used with object that has only one key, i.e. `{foo:1}`.

It is build for the use case, when we want to pass object and its name.

```
const foo = x => x + 2
const bar = x => x * 8

[{foo}, {bar}]
  .map(method => {
    const {prop, value: fn} = R.headObject(method)
    console.log(prop, `result ${fn(1)}`)
  })
```

#### includesAny(targets:any[], source: string|any[]): boolean

It returns `true` if any of the `targets` is part of `source`. Note that you can pass objects as part of both `targets` ans `source` list and it will work as you expected, because it uses `R.equals` for equality comparison.

```
R.includesAny(
  ['foo','baz', {a:1}]
)([1,2,{a:1}])
// => true
```

#### includesType

> includesType(targetType: string, list: any[]): boolean

It returns `true` if any member of `list` array has the same type as the `targetType`.

```
const result = R.includesType(
  'String',
  [1,2,'foo']
)
// => true
```

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

#### isAttach

> isAttach(): boolean

It attaches `is` method to object-like variables. This `is` method acts like `R.pass`.

It returns `true` when it is called initially and it returns `false` for sequential calls.

```
R.isAttach()
const foo = [1,2,3]

const result = foo.is(['number'])
// => true
```

#### isFalsy

> isFalsy(x: any): boolean

It returns `true` if `x` is falsy.

```
const result = R.map(
  R.isFalsy
)([null, '', [], {}])
// => [ true, true, true, true ]
```

#### isFunction

> isFunction(x: any): boolean

It returns `true` if type of `x` is one among `Promise`, `Async` or `Function`.

```
const result = R.isFunction(
  x => x
)
// => true
```

#### isNil

> isNil(x: any): boolean

It returns `true` is `x` is either `null` or `undefined`.

```
R.isNil(null)  // => true
R.isNil(1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/isNil.js)

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

#### isValid

> isValid({ input: object: schema: object }): boolean

It checks if `input` is following `schema` specifications.

If validation fails, it returns `false`.

Please [check the detailed explanation](https://github.com/selfrefactor/rambdax/blob/master/files/isValid.md) as it is hard to write a short description of this method.

```
const result = R.isValid({
  input:{ a: ['foo','bar'] },
  schema: {a: ['string'] }
})
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isValid.js)

#### log

> log(...inputs: any[]): void

It conditionally logs to `console.log` depending on the input of `R.logInit`

```
logInit()

R.log(1,2,3)  // => 1,2,3

logInit({logFlag: false})

R.log(1,2,3)  // => void

logInit({pushFlag: true})

R.log(1,2,3) // => 1,2,3
R.log(null)  // => null
R.logHolder  // => [ [1,2,3], [null] ]
```

#### maybe

> maybe<T>(ifRule: Boolean, whenIf: T, whenElse: T): T

It acts as ternary operator and it is helpful when we have nested ternaries.

```
const x = 4
const y = 8
const result = R.maybe(
  x > 2,
  y > 10 ? 3 : 7,
  5
)
// `result` is `7`
```

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

#### mergeDeep

> mergeDeep(slave: object, master: object): object

It is best explained with the test example:

```
const slave = {
  name: 'evilMe',
  age: 10,
  contact: {
    a: 1,
    email: 'foo@example.com'
  }
}
const master = {
  age: 40,
  contact: { email: 'baz@example.com' },
}
const result = mergeDeep(aBase,bBase)

const expected = {
  "age": 40,
  "name": "evilMe",
  "contact": {
    "a": 1,
    "email": "baz@example.com"
  },
}
expect(result).toEqual(expected)
```

#### mergeRight

> mergeRight(master: object, slave:object)

Same as `R.merge` but in opposite direction.

#### nextIndex

> nextIndex(index: number, list: any[]): number

It returns the next index of the list, i.e. it increments unless we have reached the end of the list(in this case `0` is returned).

#### ok

> ok(...inputs: any[]): (schemas: any[]) => true | Error

It checks if `inputs` are following `schemas` specifications.

It uses underneath [R.isValid](#isvalid).

If validation fails, it throws. If you don't want that, then you can use `R.is`. It is the same as `R.ok` method, but it returns `false` upon failed validation.

```
const result = R.ok(
  1, [ 'foo', 'bar' ]
)('number', [ 'string' ])
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/ok.js)

#### once

> once(fn: Function): Function

It returns a function, which invokes only once`fn`.

```
const addOneOnce = R.once((a, b, c) => a + b + c)

console.log(addOneOnce(10, 20, 30)) //=> 60
console.log(addOneOnce(1, 2, 3)) //=> 60
```

#### opposite

> opposite(fn: Function): Function

Same as `R.complement`

#### otherwise

> otherwise(fallback: Function, toResolve: Promise): Promise

It is meant to be used inside **pipe** or **compose** methods. It allows to catch the error inside the incoming promise and perform `fallback` in case of error. If no error occurs, it will act as **identity**, i.e. pass the input as a result.

```
test('with promise', async () => {
  const fetch = x =>
    new Promise((res, rej) => rej(new Error('FOO_ERROR')))

  const getMemberName = pipe(
    email => ({ query : email }),
    fetch,
    R.otherwise(e => {
      expect(e.message).toBe('FOO_ERROR')

      return { firstName : 'BAR' }
    }),
    R.then(R.pick('firstName,lastName'))
  )

  const result = await getMemberName('FOO')

  expect(result).toEqual({ firstName : 'BAR' })
})
```

#### pathEq

> pathEq(path:string|string[], target: any, obj: object): boolean

```
const result = R.pathEq(
  'a.b',
  1,
  {a: {b:1} }
)
// => true
```

#### pass

> pass(...inputs: any[]): (schemas: any[]) => boolean

It checks if `inputs` are following `schemas` specifications.

It uses underneath [R.isValid](#isvalid)

If validation fails, it returns `false`.

```
const result = R.pass(1,['foo','bar'])('number',['string'])
// => true
```

#### partition

> partition<T>(rule: Function,input: T): [T, T]

It is similar to `R.filter` but it will return also the instances that are not passing the predicate function.

In regards to the typing definition above, `T` can be either array of object.

```
import { partition } from './partition'

test('with list', () =>{
  const rule = (x, i) => {
    expect(
      typeof i
    ).toBe('number')

    return x > 2
  }
  const list = [1,2,3,4]

  const result = partition(rule,list)
  const expectedResult = [[3,4], [1,2]]

  expect(
    result
  ).toEqual(expectedResult)
})

```

#### piped

> piped(...fnList: any[]): any

It is basically `R.pipe` but instead of passing the input argument as `(input)`, you pass it as the first argument. It is easier to understand with the following example:

```
const result = piped(
  [1,2,3],
  R.filter(x => x > 1),
  R.map(x => x*10),
)
// => [20, 30]
```

#### pipedAsync

> pipedAsync(input: any, ...fns: Array<Function|Async>): Promise

It accepts input as first argument and series of functions as next arguments. It is same as `R.pipe` but with support for asynchronous functions.
Also functions that returns `Promise` will be handled as regular function not asynchronous. Such example is `const foo = input => new Promise(...)`.

```
const result = await pipedAsync(
  100,
  async x => {
    await delay(100)
    return x + 2
  },
  add(2),
  async x => {
    const delayed = await delay(100)
    return delayed + x
  }
)
const expected = 'RAMBDAX_DELAY104'
// result === expected
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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/produce.js)

#### promiseAllObject

> promiseAllObject(promises: Object): Promise

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

const result = R.promiseAllObject(promises)
const expectedResult = { a:1, b:2 }
// `result` resolves to `expectedResult`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/promiseAllObject.js)

#### random

> random(min: number, max: number): number

It returns a random number between `min` inclusive and `max` inclusive.

#### remove

> remove(inputs: string|RegExp[], text: string): string

It will remove all inputs from `text` sequentially.

```
const result = remove(
  ['foo','bar'],
  'foo bar baz foo'
)
// => 'baz foo'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/remove.js)

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

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/promiseAllSecure.js)

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
let counter = 0
const inc = () => {
  counter++
}

const throttledInc = R.throttle(inc, 800)

const replWrap = async x => {
  throttledInc()
  await R.delay(500)
  throttledInc()

  const a = await R.delay(1000)
  console.log(counter)
}

const result = R.tapAsync(replWrap, "foo")
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

const result = R.template(input,templateInput)
const expectedResult = 'foo is BAR even 1 more'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/template.js)

#### then

> then(afterResolve: Function, toResolve: Promise): Promise

Its purpose is to be used with **pipe** or **compose** methods in order to turn the composition to asynchronous.

The example should explain it better:

```
const expected = {
  firstName : 'FIRST_NAME_FOO',
  lastName  : 'LAST_NAME_FOO',
}

const fetchMember = async x => {
  await R.delay(200)

  return {
    a         : 1,
    firstName : `FIRST_NAME_${ x.query }`,
    lastName  : `LAST_NAME_${ x.query }`,
  }
}

const getMemberName = pipe(
  email => ({ query : email }),
  fetchMember,
  then(pick('firstName,lastName'))
)
const result = await getMemberName('FOO')
// result === expected
```

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

#### tryCatch

> tryCatch(fn: Async|Function, fallback: any): Function

It returns function that runs `fn` in `try/catch` block. If there was an error, then `fallback` is used to return the result. Note that `fn` can be value, function or promise-like.

Please check the tests below in order to fully understand this method, as it doesn't match the behaviour of the same method in `Ramda`.

```
import { delay } from './delay'
import { prop } from './rambda/prop'
import { tryCatch } from './tryCatch'

test('throws when fn is not function', () => {
  const fn = 'foo'

  expect(
    () => tryCatch(fn, false)(null)
  ).toThrow(`R.tryCatch | fn 'foo'`)
})

test('when fallback is used', () => {
  const fn = prop('x')

  expect(tryCatch(fn, false)(null)).toBe(false)
})

test('when fallback is function', () => {
  const fn = prop('x')

  expect(tryCatch(fn, x => x)(null)).toBe(null)
})

test('when fn is used', () => {
  const fn = prop('x')

  expect(tryCatch(fn, false)({})).toBe(undefined)

  expect(tryCatch(fn, false)({ x: 1 })).toBe(1)
})

test('when async + fallback', async () => {
  let called = false

  const fn = async input => {
    await delay(input)
    called = true

    return JSON.parse('{a:')
  }

  expect(await tryCatch(fn, 'fallback')(100)).toBe('fallback')
  expect(called).toBe(true)
})

test('when async + fallback is function', async () => {
  let called = false

  const fn = async input => {
    await delay(input)
    called = true

    return JSON.parse('{a:')
  }

  expect(await tryCatch(fn, x => x + 1)(100)).toBe(101)
  expect(called).toBe(true)
})

test('when async + fallback is async', async () => {
  let called = false
  const fn = async input => {
    await delay(input)
    called = true

    return JSON.parse('{a:')
  }
  const fallback = async input => {
    return input + 1
  }

  expect(await tryCatch(fn, fallback)(100)).toBe(101)
  expect(called).toBe(true)
})

test('when async + fn', async () => {
  let called = false

  const fn = async input => {
    await delay(input)
    called = true

    return input + 1
  }

  expect(await tryCatch(fn, 'fallback')(100)).toBe(101)
  expect(called).toBe(true)
})
```

#### underscore

> _ : object

A proxy object which always returns the target property parsed to constant case
 
```
console.log(_.foo) // => 'FOO'
console.log(_.BAR) // => 'BAR'
console.log(_.fooBar) // => 'FOO_BAR'
```

#### unless

> unless(rule: Function|boolean, whenFalse: Function|any): Function

The method returns function that will be called with argument `input`.

If `rule` with `input` as argument returns false, then the end result will be the outcome of `whenFalse` function with `input` as argument. In the other case, the final output will be the `input` itself.

Please note that unlike **Ramda**'s `unless`, this method accept also plain values as `rule`(boolean values) and `whenFalse`(any values) arguments.

```
const result = R.unless(
  R.isNil,
  R.inc
)(1)
// => 2
```

#### wait

> wait(fn: Async): Promise<[any, Error]>

It provides `Golang`-like interface for handling promises.

```
void async function wait(){
  const [err, ok] = await R.wait(R.delay(1000))
  // => err is undefined
  // => ok is `RAMBDAX_DELAY`
}()
```

#### waitFor

> waitFor(condition: any, ms: number): Promise

It returns `true`, if `condition` returns `true` within `ms` milisececonds time period.

Best description of this method are the actual tests:

```
import { waitFor } from './waitFor'

const howLong = 1000

test('true', async () => {
  let counter = 0
  const condition = x => {
    counter++
    return counter > x
  }

  const result = await waitFor(condition, howLong)(6)
  expect(result).toEqual(true)
})

test('false', async () => {
  let counter = 0
  const condition = x => {
    counter++
    return counter > x
  }

  const result = await waitFor(condition, howLong)(12)
  expect(result).toEqual(false)
})

test('async condition | true', async () => {
  let counter = 0
  const condition = async x => {
    counter++
    return counter > x
  }

  const result = await waitFor(condition, howLong)(6)
  expect(result).toEqual(true)
})

test('async condition | false', async () => {
  let counter = 0
  const condition = async x => {
    counter++
    return counter > x
  }

  const result = await waitFor(condition, howLong)(12)
  expect(result).toEqual(false)
})

test('throws when fn is not function', () => {
  const fn = 'foo'

  expect(() => waitFor(fn, howLong)()).toThrow('R.waitFor')
})
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

const result = condition({
  a : "foo",
  b : 4,
  c : 11,
}) //=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/where.js)

#### whereEq

> whereEq(rule: object, input: any): boolean

It will return `true` if all of `input` object fully or partially include `rule` object.

The definition for `input` is `any` as the method perform type check on it and if it is not an object, it will return `false`. Note that **Ramda** will throw in this case.

```
const rule = { a : { b : 1 } }
const input = {
  a : { b : 1 },
  c : 2,
}

const result = whereEq(rule, input)
//=> true
```

#### when

> when(rule: Function|boolean, whenTrue: Function|any): Function

Note that unlike **Ramda**'s `when`, this method accept values as `whenTrue` argument.

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
const replWrap = async input => {

  const wrapResult = await R.whenAsync(
    async x => {
      await R.delay(x*100)
      return x > 2
    },
    async x => {
      await R.delay(x*100)
      return x * 5
    }
  )(input)

  return wrapResult
}

const result = replWrap(5)
// => 25
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/whenAsync.js)

#### add

> add(a: number, b: number): number

```
R.add(2, 3) // =>  5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/add.js)

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

#### assoc

> assoc(prop: any, value: any, obj: object): object

Makes a shallow clone of `obj`, setting or overriding the property `prop` with
the value `value`. Note that this copies and flattens prototype properties
onto the new object as well. All non-primitive properties are copied by
reference.

```
R.assoc('c', 3, {a: 1, b: 2})
//=> {a: 1, b: 2, c: 3}
```

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

> defaultTo(defaultValue: T, ...inputArguments: any[]): T

It either returns `defaultValue`, if all of `inputArguments` are `undefined`, `null` or `NaN`.

Or it returns the first truthy `inputArguments` instance(from left to right).

```
R.defaultTo('foo', undefined) // => 'foo'
R.defaultTo('foo', undefined, null, NaN) // => 'foo'
R.defaultTo('foo', undefined, 'bar', NaN, 'baz') // => 'bar'
R.defaultTo('foo', undefined, null, NaN, 'baz') // => 'baz'
R.defaultTo('foo', 'bar') // => 'bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/defaultTo.js)

#### dissoc

> dissoc(prop: any, obj: object): object

It returns a new object that does not contain a `prop` property.

```
R.dissoc('b', {a: 1, b: 2, c: 3})
//=> {a: 1, c: 3}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/dissoc.js)

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

> either(firstCondition: Function, secondCondition: Function): Function

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

#### groupBy

> groupBy(fn: Function, arr: Array): Object

It groups array `arr` by provided selector function `fn`.

```
R.groupBy(
  x => x.length,
  [ 'a', 'b', 'aa', 'bb' ]
)
// => { '1': ['a', 'b'], '2': ['aa', 'bb'] }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/groupBy.js)

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

#### indexBy

> indexBy(fn: Function, arr: T[]): Object

It indexes array `arr` as an object with provided selector function `fn`.

```
R.indexBy(
  x => x.id,
  [ {id: 1}, {id: 2} ]
)
// => { 1: {id: 1}, 2: {id: 2} }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/indexBy.js)

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

#### keys

> keys(x: Object): string[]

```
R.keys({a:1, b:2})  // => ['a', 'b']
```

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
  return `${prop}-${val}`
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

#### max

> max(x: Number|String, y: Number|String): Number|String

```
R.max(5,7) // => 7
```

#### maxBy

> maxBy(fn: Function, x: Number|String, y: Number|String): Number|String

```
R.maxBy(Math.abs, 5, -7) // => -7
```

#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/merge.js)

#### min

> min(x: Number|String, y: Number|String): Number|String

```
R.max(5,7) // => 5
```

#### minBy

> minBy(fn: Function, x: Number|String, y: Number|String): Number|String

```
R.minBy(Math.abs, -5, -7) // => -5
```

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

- You can read my argumentation for creating _partialCurry_ [here](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

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
R.take(2, 'foo') // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/take.js)

#### takeLast

> takeLast(num: number, arrOrStr: T[]|string): T[]|string

- It returns the last `num` elements of `arrOrStr`.

```
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, 'foo') // => 'oo'
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

#### zip

> zip(a: K[], b: V[]): Array

It will return a new array containing tuples of equally positions items from both lists. The returned list will be truncated to match the length of the shortest supplied list.

```
R.zip([1, 2], ['A', 'B'])
// => [[1, 'A'], [2, 'B']]

// truncates to shortest list
R.zip([1, 2, 3, 4], ['A', 'B'])
// => [[1, 'A'], [2, 'B']]
```

#### zipObj

> zipObj(a: K[], b: V[]): Object

It will return a new object with keys of `a` array and values of `b` array.

```
R.zipObj(['a', 'b', 'c'], [1, 2, 3])
//=> {a: 1, b: 2, c: 3}

// truncates to shortest list
R.zipObj(['a', 'b', 'c'], [1, 2])
//=> {a: 1, b: 2}
```
