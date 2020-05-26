[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/rambdax.svg)](https://circleci.com/gh/selfrefactor/rambdax)
[![codecov](https://codecov.io/gh/selfrefactor/rambdax/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/rambdax)
![Normal size](https://img.badgesize.io/selfrefactor/rambdax/master/dist/rambdax.js)
![Gzip size](https://img.badgesize.io/selfrefactor/rambdax/master/dist/rambdax.js?compression=gzip)

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

## Differences between Rambda and Ramdax

Rambdax passthrough all [Rambda](https://github.com/selfrefactor/rambda) methods and introduce some new functions.

The idea of **Rambdax** is to extend **Rambda** without worring for **Ramda** compatibility.

## Typescript

You will need at least version `3.0.0` for `Rambdax` versions after `0.12.0`.

## API

Methods between `allFalse` and `whenAsync` belong to **Rambdax**, while methods between `add` and `without` are inherited from **Rambda**.

---
#### allFalse

> allFalse(...inputs: any|predicate[]): boolean

It returns `true` if all passed elements return `false` when passed to `Boolean`.

If single input element is a function, then it will be evaluated.

```
R.allFalse(null, undefined, '', () => false)
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allFalse.js)

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/allFalse.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/allTrue.spec.js)



---
#### allType

> allType(targetType: string): (...inputs: any[]) => boolean

It returns a function, which will return `true` if all passed elements has the same type as the `targetType`. The example below explains it better:

```
const result = R.allType('String')('foo','bar','baz')
//=> true
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/allType.spec.js)

---
#### anyFalse

> anyFalse(...inputs: any|predicate[]): boolean

It returns `true` if any of the passed elements returns `false` when passed to `Boolean`.
If argument is function, it will be evaluated.

```
R.anyFalse(1, {a:1}, 'foo', () => false)
//=> true
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/anyFalse.spec.js)

---
#### anyTrue

> anyTrue(...inputs:  any|predicate[]): boolean

It returns `true` if any of the passed elements returns `true` when passed to `Boolean`.
If argument is function, it will be evaluated.

```
R.anyTrue(0, {}, '', () => true)
//=> true
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/anyTrue.spec.js)

---
#### anyType

> anyType(targetType: string): (...inputs: any[]) => boolean

It returns a function, which will return `true` if at least one of the passed elements has the same type as the `targetType`. The example below explains it better:

```
R.anyType('String')(1, {},'baz')
//=> true
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/anyType.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/change.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/composeAsync.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/composed.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/debounce.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/defaultToStrict.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/defaultToWhen.spec.js)

---
#### delay

> delay(ms: number): Promise

`setTimeout` as a promise that resolves to `R.DELAY` variable.

The value of `R.DELAY` is `'RAMBDAX_DELAY'`.

```
const result = R.delay(1000)
// `result` resolves to `'RAMBDAX_DELAY'`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/delay.js)

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/delay.spec.js)



---
#### filterAsync

> findAsync(predicate: Async, iterateOver: object|array): Promise

It will return object or array `iterateOver` filtered according to asynchronous function `predicate`

```
const predicate = async x => {
  await delay(100)
  return x%2 === 1
}
const result = await filterAsync(predicate, [ 1, 2, 3 ])
// => [ 1, 3 ]
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/filterAsync.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/findInObject.spec.js)



---
#### setter

> setter(key: string|object, value?: any): void

It provides access to the cache object.

You either set individual key-value pairs with `R.setter(key, value)` or you pass directly object, which will be merged with the cache object

```
R.setter({a: 1,b: 'bar'})
R.getter('b')
// => 'bar'
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/setter.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/getter.spec.js)

---
#### reset

> reset(): void

It resets the cache object.

```
R.setter({a: 1,b: 'bar'})
R.getter('b') // => 'bar'
R.reset()
R.getter('b') // => undefined
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/reset.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/glue.spec.js)



---
#### hasPath

> hasPath(input: string|string[], input: object): boolean

It will return true, if `input` object has truthy `path`(calculated with `R.path`).

```
const path = 'a.b'
const obj = {a: {b:[]}}

const result = hasPath(path,obj)

expect(result).toBe(true)
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/hasPath.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/headObject.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/includesType.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/inject.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isAttach.spec.js)

---
#### isFalsy

> isFalsy(x: any): boolean

It returns `true` if `x` is falsy.

```
const result = R.map(
  R.isFalsy
)([null, '', [], {}])
// => [ true, true, true, true ]
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isFalsy.spec.js)

---
#### isFunction

> isFunction(x: any): boolean

It returns `true` if type of `x` is one among `Promise`, `Async` or `Function`.

```
const result = R.isFunction(
  x => x
)
// => true
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isFunction.spec.js)

---
#### isNil

> isNil(x: any): boolean

It returns `true` is `x` is either `null` or `undefined`.

```
R.isNil(null)  // => true
R.isNil(1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/isNil.js)

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isNil.spec.js)



---
#### isPromise

> isPromise(x: any): boolean

It returns true if `x` is either async function or unresolved promise.

```
R.isPromise(R.delay)
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isPromise.js)

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isPromise.spec.js)



---
#### isType

> isType(xType: string, x: any): boolean

It returns true if `x` matches the type returned from `R.type`.

```
R.isType('Async',async () => {})
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isType.js)

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isType.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/isValid.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/maybe.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/mapAsync.spec.js)



---
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


> mapAsyncLimit(iterable: Promise, limit: Number, list: Array): Promise

It is similar to `mapFastAsync` in that it uses `Promise.all` but not over the whole list, rathar than with only slice from `list` with length `limit`.

The result is a promise resolvable to an array of type matching the return type of `iterable`.


```
const limit = 3
const startTime = new Date().getTime()
const list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const iterable = async x => {
  await delay(500)
  return x + 1
}
const result = await mapAsyncLimit(iterable, limit, list)
const endTime = new Date().getTime()
const diffTime = endTime - startTime

const startTime2 = new Date().getTime()
await mapAsync(iterable, list)
const endTime2 = new Date().getTime()
const diffTime2 = endTime2 - startTime2

const methodScale = toDecimal((diffTime2 - diffTime)/1000,0)
expect(result).toEqual([2,3,4,5,6,7,8,9,10])
expect(methodScale).toBe(limit)
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mapAsyncLimit.js)

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/mapFastAsync.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/memoize.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/mergeAll.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/mergeDeep.spec.js)

---
#### mergeRight

> mergeRight(master: object, slave:object)

Same as `R.merge` but in opposite direction.

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/mergeRight.spec.js)

---
#### nextIndex

> nextIndex(index: number, list: any[]): number

It returns the next index of the list, i.e. it increments unless we have reached the end of the list(in this case `0` is returned).

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/nextIndex.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/ok.spec.js)



---
#### once

> once(fn: Function): Function

It returns a function, which invokes only once`fn`.

```
const addOneOnce = R.once((a, b, c) => a + b + c)

console.log(addOneOnce(10, 20, 30)) //=> 60
console.log(addOneOnce(1, 2, 3)) //=> 60
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/once.spec.js)

---
#### opposite

> opposite(fn: Function): Function

Same as `R.complement`

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/opposite.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/otherwise.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/pathEq.spec.js)

---
#### pass

> pass(...inputs: any[]): (schemas: any[]) => boolean

It checks if `inputs` are following `schemas` specifications.

It uses underneath [R.isValid](#isvalid)

If validation fails, it returns `false`.

```
const result = R.pass(1,['foo','bar'])('number',['string'])
// => true
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/pass.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/partition.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/piped.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/pipedAsync.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/produce.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/promiseAllObject.spec.js)



---
#### random

> random(min: number, max: number): number

It returns a random number between `min` inclusive and `max` inclusive.

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/random.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/remove.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/renameProps.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/resolve.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/s.spec.js)



---
#### sortObject

> sortObject(predicate: Function, obj: Object): Object

It returns sorted version of an object.

```
const predicate = (propA, propB, valueA, valueB) => valueA > valueB ? -1 : 1

const sorted = R.sortObject(predicate, {a:1, b: 4, c: 2})
// => {b:4, c: 2, a:1}
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/sortObject.spec.js)

---
#### shuffle

> shuffle(arr: T[]): T[]

It returns randomized copy of array.

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/shuffle.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/switcher.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/tapAsync.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/template.spec.js)



---
#### toDecimal

> toDecimal(num: number, charsAfterDecimalPoint: number): number

```
R.toDecimal(2.45464,2) // => 2.45
```

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/toDecimal.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/throttle.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/tryCatch.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/unless.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/wait.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/waitFor.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/where.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/whereEq.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/when.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambdax/blob/master/src/whenAsync.spec.js)



---
#### add

> add(a: number, b: number): number

```
R.add(2, 3) // =>  5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/add.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/add.spec.js)



---
#### adjust

> adjust(i: number, replaceFn: Function, arr: T[]): T[]

It replaces `i` index in `arr` with the result of `replaceFn(arr[i])`.

```
R.adjust(
  0,
  a => a + 1,
  [0, 100]
) // => [1, 100]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/adjust.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/adjust.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/all.spec.js)



---
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
const result = R.allPass(rules)(input) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/allPass.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/allPass.spec.js)



---
#### always

> always(x: any): Function

It returns function that always returns `x`.

```
const fn = R.always(7)

console.log(fn())// => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/always.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/always.spec.js)



---
#### and

Returns `true` if both arguments are `true`; `false` otherwise.

```
R.and(true, true); // => true
R.and(true, false); // => false
R.and(false, true); // => false
R.and(false, false); // => false
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/and.spec.js)

---
#### any

> any(condition: Function, arr: T[]): boolean

It returns `true`, if at least one member of `arr` returns true, when passed to the `condition` function.

```
R.any(a => a * a > 8)([1, 2, 3])
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/any.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/any.spec.js)



---
#### anyPass

> anyPass(predicates: Function[]): Function

It returns `true`, if any of `predicates` return `true` with `input` is their argument.

```
const isBig = a => a > 20
const isOdd = a => a % 2 === 1

const result = R.anyPass(
  [isBig, isOdd]
)(11)
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/anyPass.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/anyPass.spec.js)



---
#### append

> append(valueToAppend: T, arr: T[]): T[]

```
R.append(
  'foo',
  ['bar', 'baz']
) // => ['bar', 'baz', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/append.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/append.spec.js)



---
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

[Source](https://github.com/selfrefactor/rambda/tree/master/src/assoc.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/assoc.spec.js)



---
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

[Source](https://github.com/selfrefactor/rambda/tree/master/src/both.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/both.spec.js)



---
#### clamp

> clamp(min: number, max: number, input:number): number

Restrict a number `input` to be withing `min` and `max` limits.
If `input` is bigger than `max`, then result is `max`.
If `input` is smaller than `min`, then result is `min`.

```
R.clamp(0, 10, 5) //=> 5
R.clamp(0, 10, -1) //=> 0
R.clamp(0, 10, 11) //=> 10
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/clamp.spec.js)

---
#### clone

> clone(objOrArr: T|T[]): T|T[]

Creates a deep copy of the value which may contain (nested) Arrays and Objects, Numbers, Strings, Booleans and Dates.

```
const objects = [{}, {}, {}];
const objectsClone = R.clone(objects);
objects === objectsClone; //=> false
objects[0] === objectsClone[0]; //=> false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/clone.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/clone.spec.js)



---
#### compose

> compose(fn1: Function, ... , fnN: Function): any

It performs right-to-left function composition.

```
const result = R.compose(
  R.map(x => x * 2),both
  R.filter(x => x > 2)
)([1, 2, 3, 4])

// => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/compose.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/compose.spec.js)



---
#### complement

> complement(fn: Function): Function

It returns `complemented` function that accept `input` as argument.

The return value of `complemented` is the negative boolean value of `fn(input)`.

```
const fn = R.complement(x => !x)

const result = fn(false) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/complement.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/complement.spec.js)



---
#### concat

> concat(x: T[]|string, y: T[]|string): T[]|string

It returns a new string or array, which is the result of merging `x` and `y`.

```
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo')('bar') // => 'foobar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/concat.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/concat.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/curry.spec.js)



---
#### dec

> dec(x: number): number

It decrements a number.

```
R.dec(2) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/dec.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/dec.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/defaultTo.spec.js)



---
#### dissoc

> dissoc(prop: any, obj: object): object

It returns a new object that does not contain a `prop` property.

```
R.dissoc('b', {a: 1, b: 2, c: 3})
//=> {a: 1, c: 3}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/dissoc.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/dissoc.spec.js)



---
#### divide

```
R.divide(71, 100) // => 0.71
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/divide.spec.js)

---
#### drop

> drop(howManyToDrop: number, arrOrStr: T[]|string): T[]|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the left.

```
R.drop(1, ['foo', 'bar', 'baz']) // => ['bar', 'baz']
R.drop(1, 'foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/drop.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/drop.spec.js)



---
#### dropLast

> dropLast(howManyToDrop: number, arrOrStr: T[]|String): T[]|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the right.

```
R.dropLast(1, ['foo', 'bar', 'baz']) // => ['foo', 'bar']
R.dropLast(1, 'foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/dropLast.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/dropLast.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/endsWith.spec.js)



---
#### either

> either(firstCondition: Function, secondCondition: Function): Function

```
R.either(
  a => a > 10,
  a => a % 2 === 0
)(15) //=> true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/either.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/either.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/equals.spec.js)



---
#### F

`R.F() // => false`

[Source](https://github.com/selfrefactor/rambda/tree/master/src/F.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/F.spec.js)

---
#### filter

> filter(filterFn: Function, x: Array|Object): Array|Object

It filters `x` iterable over boolean returning `filterFn`.

```
const filterFn = a => a % 2 === 0

const result = R.filter(filterFn, [1, 2, 3, 4])
// => [2, 4]

const objResult = R.filter(filterFn, {a: 1, b: 2})
// => {b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/filter.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/filter.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/find.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/findIndex.spec.js)



---
#### findLast

> findLast(findFn: Function, arr: T[]): T|undefined

It returns `undefined` or the last element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === 'Number'
const arr = [{foo: 'bar'}, {foo: 1}]

const result = R.findLast(findFn, arr)
// => {foo: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/find.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/findLast.spec.js)



---
#### findLastIndex

> findLastIndex(findFn: Function, arr: T[]): number

It returns `-1` or the last index of the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === 'Number'
const arr = [{foo: 'bar'}, {foo: 1}]

const result = R.findLastIndex(findFn, arr)
// => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/findIndex.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/findLastIndex.spec.js)



---
#### flatten

> flatten(arr: any[]): any[]

```
R.flatten([ 1, [ 2, [ 3 ] ] ])
// => [ 1, 2, 3 ]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/flatten.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/flatten.spec.js)



---
#### flip

> flip(fn: Function): Function

It returns function which calls `fn` with exchanged first and second argument.

```
const subtractFlip = R.flip(R.subtract)

const result = subtractFlip(1,7)
// => 6
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/flip.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/flip.spec.js)



---
#### forEach

> forEach(fn: Function, x: Array|Object): Array|Object

It applies function `fn` over all members of iterable `x` and returns `x`.

```
const sideEffect = {}
const result = R.forEach(
  x => sideEffect[`foo${x}`] = x
)([1, 2])

console.log(sideEffect) //=> {foo1 : 1, foo2 : 2}
console.log(result) //=> [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/forEach.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/forEach.spec.js)



---
#### fromPairs

> fromPairs(list: any[]): object

It transforms a list to an object.

```
const list = [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', [ 3, 4 ] ] ]
const expected = {
  a : 1,
  b : 2,
  c : [ 3, 4 ],
}

const result = R.fromPairs(list)
// expected === result
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/fromPairs.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/fromPairs.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/groupBy.spec.js)

---
#### groupWith

> groupWith(fn: Function, arr: Array): Object

It creates a groups of array members defined by equality function `fn`.

```
const list = [ 4, 3, 6, 2, 2, 1 ]
const result = R.groupWith(
  (a,b) => a - b === 0,
  list
)
const expected = [
  [ 4, 3 ],
  [ 6 ],
  [ 2 ],
  [ 2, 1 ],
]
// result === expected
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/groupWith.spec.js)

---
#### has

> has(prop: string, obj: Object): boolean

- It returns `true` if `obj` has property `prop`.

```
R.has('a', {a: 1}) // => true
R.has('b', {a: 1}) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/has.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/has.spec.js)



---
#### head

> head(arrOrStr: T[]|string): T|string

It returns the first element of `arrOrStr`.

```
R.head([1, 2, 3]) // => 1
R.head('foo') // => 'f'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/head.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/head.spec.js)



---
#### identical

> identical(a: any, b: any): boolean

Returns true if its arguments are identical, false otherwise. Values are identical if they reference the same memory. NaN is identical to NaN; 0 and -0 are not identical.

```
const o = {};
R.identical(o, o); //=> true
R.identical(1, 1); //=> true
R.identical(1, '1'); //=> false
R.identical([], []); //=> false
R.identical(0, -0); //=> false
R.identical(NaN, NaN); //=> true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/identical.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/identical.spec.js)



---
#### identity

> identity(x: T): T

It just passes back the supplied arguments.

```
R.identity(7) // => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/identity.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/identity.spec.js)



---
#### ifElse

> ifElse(condition: Function|boolean, ifFn: Function, elseFn: Function): Function

It returns another function. When this new function is called with `input` argument, it will return either `ifFn(input)` or `elseFn(input)` depending on `condition(input)` evaluation.

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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/ifElse.spec.js)



---
#### inc

> inc(x: number): number

It increments a number.

```
R.inc(1) // => 2
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/inc.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/inc.spec.js)



---
#### includes

> includes(valueToFind: T|string, input: T[]|string): boolean

If `input` is string, then this method work as native `includes`.
If `input` is array, then `R.equals` is used to define if `valueToFind` belongs to the list.

```
R.includes('oo', 'foo') // => true
R.includes({a: 1}, [{a: 1}]) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/includes.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/includes.spec.js)



---
#### indexBy

> indexBy(condition: Function|String, arr: T[]): Object

Generates object with properties provided by `condition` and values provided by `arr`. If `condition` is a string, then it is passed to `R.path`.

```
const arr = [ {id: 1}, {id: 2} ]
const result = R.indexBy(
  x => x.id,
  arr
)
const pathResult = R.indexBy(
  'id',
  arr
)
// => { 1: {id: 1}, 2: {id: 2} }
// pathResult === result
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/indexBy.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/indexBy.spec.js)



---
#### indexOf

> indexOf(valueToFind: any, arr: T[]): number

It returns `-1` or the index of the first element of `arr` equal of `valueToFind`.

```
R.indexOf(1, [1, 2]) // => 0
R.indexOf(0, [1, 2]) // => -1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/indexOf.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/indexOf.spec.js)



---
#### init

> init(arrOrStr: T[]|string): T[]|string

- It returns all but the last element of `arrOrStr`.

```
R.init([1, 2, 3])  // => [1, 2]
R.init('foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/init.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/init.spec.js)



---
#### is

> is(xPrototype: any, x: any): boolean

It returns `true` is `x` is instance of `xPrototype`.

```
R.is(String, 'foo')  // => true
R.is(Array, 1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/is.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/is.spec.js)



---
#### isNil

> isNil(x: any): boolean

It returns `true` is `x` is either `null` or `undefined`.

```
R.isNil(null)  // => true
R.isNil(1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/isNil.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/isNil.spec.js)



---
#### isEmpty

> isEmpty(x: any): boolean

It returns `true` is `x` is `empty`.

```
R.isEmpty('')  // => true
R.isEmpty({ x : 0 })  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/isEmpty.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/isEmpty.spec.js)



---
#### join

> join(separator: string, arr: T[]): string

```
R.join('-', [1, 2, 3])  // => '1-2-3'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/join.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/join.spec.js)



---
#### keys

> keys(x: Object): string[]

```
R.keys({a:1, b:2})  // => ['a', 'b']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/keys.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/keys.spec.js)



---
#### last

> last(arrOrStr: T[]|string): T|string

It returns the last element of `arrOrStr`.

```
R.last(['foo', 'bar', 'baz']) // => 'baz'
R.last('foo') // => 'o'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/last.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/last.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/lastIndexOf.spec.js)



---
#### length

> length(arrOrStr: Array|String): Number

```
R.length([1, 2, 3]) // => 3
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/length.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/length.spec.js)



---
#### lens

> lens(getter: Function, setter: Function): Lens

Returns a `lens` for the given `getter` and `setter` functions. 

The `getter` "gets" the value of the focus; the `setter` "sets" the value of the focus. 

The setter should not mutate the data structure.

```
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, {x: 1, y: 2}) //=> 1
R.set(xLens, 4, {x: 1, y: 2}) //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2}) //=> {x: -1, y: 2}
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/lens.spec.js)

---
#### lensIndex

> lensIndex(index: Number): Lens

Returns a lens that focuses on the specified index

```
const headLens = R.lensIndex(0)

R.view(headLens, ['a', 'b', 'c']) //=> 'a'
R.set(headLens, 'x', ['a', 'b', 'c']) //=> ['x', 'b', 'c']
R.over(headLens, R.toUpper, ['a', 'b', 'c']) //=> ['A', 'b', 'c']
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/lensIndex.spec.js)

---
#### lensPath

> lensPath(path: Array|String): Lens

Returns a lens that focuses on the specified path

```
const xHeadYLens = R.lensPath(['x', 0, 'y'])

R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]}) //=> 2
R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]}) //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]}) //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/lensPath.spec.js)

---
#### lensProp

> lensProp(prop: String): Lens

Returns a lens that focuses on the specified property

```
const xLens = R.lensProp('x');

R.view(xLens, {x: 1, y: 2}) //=> 1
R.set(xLens, 4, {x: 1, y: 2}) //=> {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2}) //=> {x: -1, y: 2}
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/lensProp.spec.js)

---
#### map

> map(mapFn: Function, x: Array|Object): Array|Object

It returns the result of looping through iterable `x` with `mapFn`.

The method works with objects as well.

Note that unlike Ramda's `map`, here array keys are passed as second argument to `mapFn`.

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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/map.spec.js)



---
#### match

> match(regExpression: Regex, str: string): string[]

```
R.match(/([a-z]a)/g, 'bananas') // => ['ba', 'na', 'na']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/match.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/match.spec.js)



---
#### max

> max(x: Number|String, y: Number|String): Number|String

```
R.max(5,7) // => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/max.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/max.spec.js)



---
#### maxBy

> maxBy(fn: Function, x: Number|String, y: Number|String): Number|String

```
R.maxBy(Math.abs, 5, -7) // => -7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/maxBy.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/maxBy.spec.js)



---
#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/merge.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/merge.spec.js)



---
#### min

> min(x: Number|String, y: Number|String): Number|String

```
R.min(5,7) // => 5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/min.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/min.spec.js)



---
#### minBy

> minBy(fn: Function, x: Number|String, y: Number|String): Number|String

```
R.minBy(Math.abs, -5, -7) // => -5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/minBy.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/minBy.spec.js)



---
#### modulo

> modulo(a: number, b: number):numberNumber

It returns the remainder of operation `a/b`.

```
R.module(14, 3) // => 2
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/modulo.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/modulo.spec.js)



---
#### multiply

> multiply(a: number, b: number): number

It returns the result of operation `a*b`.

```
R.multiply(4, 3) // => 12
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/multiply.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/multiply.spec.js)



---
#### not

> not(x: any): boolean

It returns inverted boolean version of input `x`.

```
R.not(true) //=> false
R.not(false) //=> true
R.not(0) //=> true
R.not(1) //=> false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/not.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/not.spec.js)



---
#### omit

> omit(propsToOmit: string[]|string, obj: Object): Object

It returns a partial copy of an `obj` with omitting `propsToOmit`

```
R.omit('a,c,d', {a: 1, b: 2, c: 3}) // => {b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/omit.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/omit.spec.js)



---
#### over

> over(lens: Lens, f: Function, target: Array|Object): Array|Object

Returns a copied `Object` or `Array` with the modified value resulting from the function applying to the lenses focus.

```
const headLens = R.lensIndex(0)
 
R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']) //=> ['FOO', 'bar', 'baz']
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/over.spec.js)

---
#### path

> path(pathToSearch: string[]|string, obj: Object): any

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

```
R.path('a.b', {a: {b: 1}}) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/path.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/path.spec.js)



---
#### paths

> paths(paths: string[][]|string[], obj: Object): Array

Similar to `R.path`, but for multiple object's path queries. 

```
const obj = {
  foo: {
    bar: [10,20],
    baz: '123'
  },
  a: 90
}
R.paths(['a.b', 'foo.bar.1', 'foo.baz'])
// => [ undefined, 20, 90]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/paths.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/paths.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/pathOr.spec.js)



---
#### partial

> partial(fn: Function, ...inputs: any[]): Function | any

It is very similar to `R.curry`, but you can pass initial arguments when you create the curried function.

`R.partial` will keep returning a function until all the arguments that the function `fn` expects are passed.
The name comes from the fact that you partially inject the inputs.

```
const fn = (salutation, title, firstName, lastName) => salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!'

const canPassAnyNumberOfArguments = partial(fn, 'Hello', 'Ms.')
const finalFn = canPassAnyNumberOfArguments('foo')

finalFn('bar') // =>  'Hello, Ms. foo bar!'
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/partial.spec.js)

---
#### partialCurry

> partialCurry(fn: Function|Async, partialInput: Object, input: Object): Function|Promise

When called with function `fn` and first set of input `partialInput`, it will return a function.

This function will wait to be called with second set of input `input` and it will invoke `fn` with the merged object of `partialInput` over `input`.

`fn` can be asynchronous function. In that case a `Promise` holding the result of `fn` is returned.

```
const fn = ({a, b, c}) => {
  return (a * b) + c
}
const curried = R.partialCurry(fn, {a: 2})
const result = curried({b: 3, c: 10})
// => 16
```

- Note that `partialCurry` is method specific for **Rambda** and the method is not part of **Ramda**'s API

- You can read my argumentation for creating _partialCurry_ [here](https://ilearnsmarter.wordpress.com/2018/12/20/argumentation-of-rambdas-partialcurry-method/)

[Source](https://github.com/selfrefactor/rambda/tree/master/src/partialCurry.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/partialCurry.spec.js)



---
#### pick

> pick(propsToPick: string[], obj: Object): Object

It returns a partial copy of an `obj` containing only `propsToPick` properties.

```
R.pick(['a', 'c'], {a: 1, b: 2}) // => {a: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pick.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/pick.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/pipe.spec.js)



---
#### pluck

> pluck(property: string, arr: Object[]): any[]

It returns list of the values of `property` taken from the objects in array of objects `arr`.

```
R.pluck('a')([{a: 1}, {a: 2}, {b: 3}]) // => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pluck.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/pluck.spec.js)



---
#### prepend

> prepend(x: T, arr: T[]): T[]

It adds `x` to the start of the array `arr`.

```
R.prepend('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/prepend.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/prepend.spec.js)



---
#### prop

> prop(propToFind: string, obj: Object): any

It returns `undefined` or the value of property `propToFind` in `obj`

```
R.prop('x', {x: 100}) // => 100
R.prop('x', {a: 1}) // => undefined
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/prop.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/prop.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/propEq.spec.js)



---
#### propIs

> propIs(type: any, name: string, obj: Object): boolean

It Returns `true` if the specified object property is of the given type.

```
R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
R.propIs(Number, 'x', {x: 'foo'});    //=> false
R.propIs(Number, 'x', {});            //=> false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/propIs.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/propIs.spec.js)



---
#### propOr

> propOr(defaultValue: any, param: string, obj: Object): any

If the given, non-null object has an own property with the specified name, returns the value of that property. Otherwise returns the provided default value.

```
const theWall = { mother: 'Waters', comfortablyNumb: 'Gilmour/Waters' }
const authorOfWishYouWereHere = R.prop('wishYouWereHere')
const authorOfAtomHeartMotherWhenDefault = R.propOr('Pink Floyd', 'atomHeartMother')

authorOfWishYouWereHere(theWall)  //=> undefined
authorOfAtomHeartMotherWhenDefault(theWall) //=> 'Pink Floyd'
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/propOr.spec.js)

---
#### range

> range(start: number, end: number): number[]

It returns a array of numbers from `start`(inclusive) to `end`(exclusive).

```
R.range(0, 3)   // => [0, 1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/range.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/range.spec.js)



---
#### reduce

> reduce(iteratorFn: Function, accumulator: any, array: T[]): any

```
const iteratorFn = (acc, val) => acc + val
const result = R.reduce(iteratorFn, 1, [1, 2, 3])
// => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reduce.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/reduce.spec.js)



---
#### reject

> reject(filterFn: Function, arr: T[]): T[]

It has the opposite effect of `R.filter`.

It will return those members of `arr` that return `false` when applied to function `filterFn`.

```
const filterFn = x => x % 2 === 1

const result = R.reject(filterFn, [1, 2, 3, 4])
// => [2, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reject.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/reject.spec.js)



---
#### repeat

> repeat(valueToRepeat: T, num: number): T[]

```
R.repeat('foo', 2) // => ['foo', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/repeat.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/repeat.spec.js)



---
#### replace

> replace(strOrRegex: string|Regex, replacer: string, str: string): string

It replaces `strOrRegex` found in `str` with `replacer`.

```
R.replace('foo', 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/, 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/g, 'bar', 'foo foo') // => 'bar bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/replace.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/replace.spec.js)



---
#### reverse

> reverse(str: T[]): T[]

```
const arr = [1, 2]

const result = R.reverse(arr)
// => [2, 1]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reverse.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/reverse.spec.js)



---
#### set

> set(lens: Lens, x: any, target: Array|Object): Array|Object

Returns a copied `Object` or `Array` with the modified value resulting from the input value replacing that of the lenses focus.

```
const xLens = R.lensProp('x')

R.set(xLens, 4, {x: 1, y: 2}) //=> {x: 4, y: 2}
R.set(xLens, 8, {x: 1, y: 2}) //=> {x: 8, y: 2}
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/set.spec.js)

---
#### slice

> slice(list: T[], from: Number, to: Number)

Returns the elements of the given list or string (or object with a `slice`
method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
Dispatches to the `slice` method of the third argument, if present.

```
R.slice(1, 3, ['a', 'b', 'c', 'd'])
//=> ['b', 'c']
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/slice.spec.js)

---
#### sort

> sort(sortFn: Function, arr: T[]): T[]

It returns copy of `arr` sorted by `sortFn`.

Note that `sortFn` must return a number type.

```
const sortFn = (a, b) => a - b

const result = R.sort(sortFn, [3, 1, 2])
// => [1, 2, 3]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/sort.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/sort.spec.js)



---
#### sortBy

> sortBy(sortFn: Function, arr: T[]): T[]

It returns copy of `arr` sorted by `sortFn`.

Note that `sortFn` must return value for comparison.

```
const sortFn = obj => obj.foo

const result = R.sortBy(sortFn, [
  {foo: 1},
  {foo: 0}
])

const expectedResult = [ {foo: 0}, {foo: 1} ]
console.log(R.equals(result, expectedResult))
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/sortBy.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/sortBy.spec.js)



---
#### split

> split(separator: string, str: string): string[]

```
R.split('-', 'a-b-c') // => ['a', 'b', 'c']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/split.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/split.spec.js)



---
#### splitEvery

> splitEvery(sliceLength: number, arrOrString: T[]|string): T[T[]]|string[]

It splits `arrOrStr` into slices of `sliceLength`.

```
R.splitEvery(2, [1, 2, 3]) // => [[1, 2], [3]]
R.splitEvery(3, 'foobar') // => ['foo', 'bar']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/splitEvery.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/splitEvery.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/startsWith.spec.js)



---
#### subtract

> subtract(a: number, b: number): number

```
R.subtract(3, 1) // => 2
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/subtract.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/subtract.spec.js)



---
#### sum

> sum(listOfNumbers: number[]): number

```
R.sum([1,2,3,4,5]) // => 15
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/sum.spec.js)

---
#### T

`R.T() // => true`

[Source](https://github.com/selfrefactor/rambda/tree/master/src/T.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/T.spec.js)

---
#### tail

> tail(arrOrStr: T[]|string): T[]|string

- It returns all but the first element of `arrOrStr`

```
R.tail([1, 2, 3])  // => [2, 3]
R.tail('foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/tail.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/tail.spec.js)



---
#### take

> take(num: number, arrOrStr: T[]|string): T[]|string

It returns the first `num` elements of `arrOrStr`.

```
R.take(1, ['foo', 'bar']) // => ['foo']
R.take(2, 'foo') // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/take.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/take.spec.js)



---
#### takeLast

> takeLast(num: number, arrOrStr: T[]|string): T[]|string

It returns the last `num` elements of `arrOrStr`.

```
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, 'foo') // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/takeLast.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/takeLast.spec.js)



---
#### tap

> tap(fn: Function, input: T): T

It applies function to input and pass the input back. Use case is debuging in the middle of `R.compose`.

```
let a = 1
const sayX = x => (a = x)

const result = R.tap(sayX, 100)
// both `a` and `result` are `100`
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/tap.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/tap.spec.js)



---
#### test

> test(regExpression: Regex, str: string): boolean

Determines whether `str` matches `regExpression`

```
R.test(/^f/, 'foo')
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/test.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/test.spec.js)



---
#### times

> times(fn: Function, n: number): T[]

It returns the result of applying function `fn` over members of range array.
The range array includes numbers between `0` and `n`(exclusive).

```
R.times(R.identity, 5)
//=> [0, 1, 2, 3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/times.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/times.spec.js)



---
#### toLower

> toLower(str: string): string

```
R.toLower('FOO') // => 'foo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/toLower.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/toLower.spec.js)



---
#### toPairs

> toPairs(obj: object): any[]

It transforms an object to a list.

```
const list = {
  a : 1,
  b : 2,
  c : [ 3, 4 ],
}
const expected = [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', [ 3, 4 ] ] ]

const result = R.toPairs(list)
// expected === result
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/toPairs.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/toPairs.spec.js)



---
#### toString

> toString(x: any): string

```
R.toString([1, 2]) // => '1,2'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/toString.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/toString.spec.js)



---
#### toUpper

> toUpper(str: string): string

```
R.toUpper('foo') // => 'FOO'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/toUpper.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/toUpper.spec.js)



---
#### transpose

> transpose(input: Array): Array

```
const input = [[10, 11], [20], [], [30, 31, 32]]
const expected = [[10, 20, 30], [11, 31], [32]]

const result = R.transpose(input)
// result === expected
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/transpose.spec.js)

---
#### trim

> trim(str: string): string

```
R.trim('  foo  ') // => 'foo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/trim.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/trim.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/type.spec.js)



---
#### uniq

> uniq(arr: T[]): T[]

It returns a new array containing only one copy of each element in `arr`.

```
R.uniq([1, 1, 2, 1])
// => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/uniq.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/uniq.spec.js)



---
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

console.log(R.equals(result, expectedResult)) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/uniqWith.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/uniqWith.spec.js)



---
#### update

> update(i: number, replaceValue: T, arr: T[]): T[]

It returns a new copy of the `arr` with the element at `i` index
replaced with `replaceValue`.

```
R.update(0, 'foo', ['bar', 'baz'])
// => ['foo', baz]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/update.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/update.spec.js)



---
#### values

> values(obj: Object): Array

It returns array with of all values in `obj`.

```
R.values({a: 1, b: 2})
// => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/values.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/values.spec.js)



---
#### view

> view(lens: Lens, target: Array|Object): any

Returns the value at the lenses focus on the target object.

```
const xLens = R.lensProp('x')

R.view(xLens, {x: 1, y: 2}) //=> 1
R.view(xLens, {x: 4, y: 2}) //=> 4
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/view.spec.js)

---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/without.spec.js)



---
#### xor

> xor(a: boolean, b: boolean): boolean

Logical xor function

```
R.xor(false, true)
// => true

R.xor(true, true)
// => false
```

[Test](https://github.com/selfrefactor/rambda/blob/master/src/xor.spec.js)

---
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

[Source](https://github.com/selfrefactor/rambda/tree/master/src/zip.js)

[Test](https://github.com/selfrefactor/rambda/blob/master/src/zip.spec.js)



---
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

[Test](https://github.com/selfrefactor/rambda/blob/master/src/zipObj.spec.js)

