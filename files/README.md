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

> allFalse(...inputs: any|predicate[]): boolean

It returns `true` if all passed elements return `false` when passed to `Boolean`.

If single input element is a function, then it will be evaluated.

```
R.allFalse(null, undefined, '', () => false)
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allFalse.js)

#### allTrue

> allTrue(...inputs:  any|predicate[]): boolean

It returns `true` if all passed elements return `true` when passed to `Boolean`.
If argument is function, it will be evaluated.

```
const x = 2

const result = R.allTrue([1,2], x > 1, {}, () => true)
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

> anyFalse(...inputs: any|predicate[]): boolean

It returns `true` if any of the passed elements returns `false` when passed to `Boolean`.
If argument is function, it will be evaluated.

```
R.anyFalse(1, {a:1}, 'foo', () => false)
//=> true
```

#### anyTrue

> anyTrue(...inputs:  any|predicate[]): boolean

It returns `true` if any of the passed elements returns `true` when passed to `Boolean`.
If argument is function, it will be evaluated.

```
R.anyTrue(0, {}, '', () => true)
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

Note that it doesn't work with promises or function returning promises such as `const foo = input => new Promise(...)`.

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
- It is neither empty object or empty array

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

> inject(injection: string, marker: string, str: string, beforeFlag: boolean): string

```
const resultDefault = R.inject(
  ' INJECTION',
  'MARKER',
  'foo bar MARKER baz'
)
const expectedResultDefault = 'foo bar MARKER INJECTION baz'

const resultWithBeforeFlag = R.inject(
  'INJECTION ',
  'MARKER',
  'foo bar MARKER baz',
  true
)
const expectedResultWithBeforeFlag = 'foo bar INJECTION MARKER baz'

const result = [
  resultDefault,
  resultWithBeforeFlag
]
const expectedResult = [
  expectedResultDefault,
  expectedResultWithBeforeFlag
]
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

Independently, somebody else came with very similar idea called [superstruct](https://github.com/ianstormtaylor/superstruct)

```
const result = R.isValid({
  input:{ a: ['foo','bar'] },
  schema: {a: ['string'] }
})
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isValid.js)

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
const result = mergeDeep(slave,master)

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

> partition<T>(predicate: Function, input: Array|Object): [Array|Object, Array|Object]

It is similar to `R.filter` but it will return also the instances that are not passing the predicate function.

It works also with object as input. Please check the example below:

```
import { partition } from 'rambdax'

test('with object', () => {
  const predicate = (value, prop) => {
    expect(
      typeof prop
    ).toBe('string')

    return value > 2
  }
  const input = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
  }

  const result = partition(predicate, input)
  const expectedResult = [
    {
      c : 3,
      d : 4,
    },
    {
      a : 1,
      b : 2,
    },
  ]

  expect(
    result
  ).toEqual(expectedResult)
})

test('with array', () =>{
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

It is very similar to [Ramda's 'applySpec' method](https://ramdajs.com/docs/#applySpec)

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

#### resolve

> resolve(afterResolve: Function, toResolve: Promise): Promise

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
  resolve(pick('firstName,lastName'))
)
const result = await getMemberName('FOO')
// result === expected
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

#### toDecimal

> toDecimal(num: number, charsAfterDecimalPoint: number): number

```
R.toDecimal(2.45464,2) // => 2.45
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
  const [result, err] = await R.wait(R.delay(1000))
  // => err is undefined
  // => result is `RAMBDAX_DELAY`
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

### RAMBDA_DOCS_MARKER