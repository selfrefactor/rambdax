# Rambdax

Extended version of Rambda(utility library) - [Documentation](https://selfrefactor.github.io/rambdax/#/)

`Rambda` is smaller and faster  alternative to the popular functional programming library **Ramda**. - [Documentation](https://selfrefactor.github.io/rambda/#/)

[![CircleCI](https://circleci.com/gh/selfrefactor/rambda/tree/master.svg?style=svg)](https://circleci.com/gh/selfrefactor/rambda/tree/master)
[![codecov](https://codecov.io/gh/selfrefactor/rambda/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/rambda)
[![dependencies Status](https://david-dm.org/selfrefactor/rambdax/status.svg)](https://david-dm.org/selfrefactor/rambdax)
![Library size](https://img.shields.io/bundlephobia/minzip/rambdax)

## ❯ Differences between Rambda and Rambdax

Rambdax passthrough all [Rambda](https://github.com/selfrefactor/rambda) methods and introduce some new functions.

The idea of **Rambdax** is to extend **Rambda** without worring for **Ramda** compatibility.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-differences-between-rambda-and-rambdax)

## ❯ Example use

```javascript
import { composeAsync, filter, delay, mapAsync } from 'rambdax'

const result = await composeAsync(
  mapAsync(async x => {
    await delay(100)
    return x + 1
  }),
  filter(x => x > 1)
)([1, 2, 3])
// => [3, 4]
```

You can test this example in <a href="https://rambda.now.sh?const%20result%20%3D%20await%20R.composeAsync(%0A%20%20R.mapAsync(async%20x%20%3D%3E%20%7B%0A%20%20%20%20await%20R.delay(100)%0A%20%20%20%20return%20x%20%2B%201%0A%20%20%7D)%2C%0A%20%20R.filter(x%20%3D%3E%20x%20%3E%201)%0A)(%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%3D%3E%20%5B3%2C%204%5D">Rambda's REPL</a>

* [Differences between Rambda and Ramda](#differences-between-rambda-and-ramda)
* [API](#api)
* [Changelog](#-changelog)

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-example-use)

## ❯ Rambdax's advantages

### Dot notation for `R.path`, `R.paths`, `R.assocPath` and `R.lensPath`

Standard usage of `R.path` is `R.path(['a', 'b'], {a: {b: 1} })`.

In **Rambda** you have the choice to use dot notation(which is arguably more readable):

```
R.path('a.b', {a: {b: 1} })
```

### Comma notation for `R.pick` and `R.omit`

Similar to dot notation, but the separator is comma(`,`) instead of dot(`.`).

```
R.pick('a,b', {a: 1 , b: 2, c: 3} })
// No space allowed between properties
```

### Extendable with Ramda community projects

`Rambdax` implements some methods from `Ramda` community projects, such as `R.lensSatisfies`, `R.lensEq` and `R.viewOr`.

### Alternative TS definitions

Alternative TS definitions are available as `rambdax/immutable`. These are Rambdax definitions linted with ESLint `functional/prefer-readonly-type` plugin.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-rambdaxs-advantages)

## ❯ Missing Ramda methods

<details>
<summary>
  Click to see the full list of 88 Ramda methods not implemented in Rambda 
</summary>

- __
- addIndex
- ap
- aperture
- apply
- applyTo
- ascend
- binary
- bind
- call
- comparator
- composeK
- composeP
- composeWith
- construct
- constructN
- contains
- countBy
- descend
- differenceWith
- dissocPath
- empty
- eqBy
- forEachObjIndexed
- gt
- gte
- hasIn
- innerJoin
- insert
- insertAll
- into
- invert
- invertObj
- invoker
- juxt
- keysIn
- lift
- liftN
- lt
- lte
- mapAccum
- mapAccumRight
- memoizeWith
- mergeDeepLeft
- mergeDeepWith
- mergeDeepWithKey
- mergeRight
- mergeWith
- mergeWithKey
- nAry
- nthArg
- o
- otherwise
- pair
- partialRight
- pathSatisfies
- pickBy
- pipeK
- pipeP
- pipeWith
- project
- propSatisfies
- reduceBy
- reduceRight
- reduceWhile
- reduced
- remove
- scan
- sequence
- sortWith
- symmetricDifferenceWith
- andThen
- toPairsIn
- transduce
- traverse
- unapply
- unary
- uncurryN
- unfold
- unionWith
- uniqBy
- unnest
- until
- useWith
- valuesIn
- xprod
- thunkify
- default

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-missing-ramda-methods)
  
## ❯ Install

- **yarn add rambdax**

- For UMD usage either use `./dist/rambdax.umd.js` or the following CDN link:

```
https://unpkg.com/rambdax@CURRENT_VERSION/dist/rambdax.umd.js
```

- with deno

```
import {compose, add} from 'https://raw.githubusercontent.com/selfrefactor/rambdax/master/dist/rambdax.esm.js'
```

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-install)

## Differences between Rambda and Ramda

- Rambda's **type** detects async functions and unresolved `Promises`. The returned values are `'Async'` and `'Promise'`.

- Rambda's **type** handles *NaN* input, in which case it returns `NaN`.

- Rambda's **forEach** can iterate over objects not only arrays.

- Rambda's **map**, **filter**, **partition** when they iterate over objects, they pass property and input object as predicate's argument.

- Rambda's **filter** returns empty array with bad input(`null` or `undefined`), while Ramda throws.

- Ramda's **clamp** work with strings, while Rambda's method work only with numbers.

- Error handling, when wrong inputs are provided, may not be the same. This difference will be better documented once all brute force tests are completed.

- Typescript definitions between `rambda` and `@types/ramda` may vary.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-differences-between-rambda-and-ramda)

## ❯ Benchmarks

<details>

<summary>
Click to expand all benchmark results

There are methods which are benchmarked only with `Ramda` and `Rambda`(i.e. no `Lodash`).

Note that some of these methods, are called with and without curring. This is done in order to give more detailed performance feedback.

The benchmarks results are produced from latest versions of *Rambda*, *Lodash*(4.17.20) and *Ramda*(0.27.1).

</summary>

method | Rambda | Ramda | Lodash
--- |--- | --- | ---
 *add* | 96.25% slower | 96.24% slower | 🚀 Fastest
 *adjust* | 🚀 Fastest | 5.52% slower | 🔳
 *all* | 🚀 Fastest | 94.95% slower | 🔳
 *allPass* | 🚀 Fastest | 98.95% slower | 🔳
 *any* | 🚀 Fastest | 98.18% slower | 6.18% slower
 *anyPass* | 🚀 Fastest | 99.09% slower | 🔳
 *append* | 🚀 Fastest | 84.09% slower | 🔳
 *applySpec* | 🚀 Fastest | 75.73% slower | 🔳
 *assoc* | 87.98% slower | 57.39% slower | 🚀 Fastest
 *clone* | 🚀 Fastest | 96.03% slower | 91.75% slower
 *compose* | 🚀 Fastest | 96.45% slower | 77.83% slower
 *converge* | 49.12% slower | 🚀 Fastest | 🔳
 *curry* | 🚀 Fastest | 34.9% slower | 🔳
 *curryN* | 63.32% slower | 🚀 Fastest | 🔳
 *defaultTo* | 🚀 Fastest | 50.3% slower | 🔳
 *drop* | 🚀 Fastest | 97.45% slower | 🔳
 *dropLast* | 🚀 Fastest | 97.07% slower | 🔳
 *equals* | 72.11% slower | 79.48% slower | 🚀 Fastest
 *filter* | 🚀 Fastest | 94.74% slower | 58.18% slower
 *find* | 🚀 Fastest | 98.2% slower | 88.96% slower
 *findIndex* | 🚀 Fastest | 97.97% slower | 79.39% slower
 *flatten* | 6.56% slower | 95.38% slower | 🚀 Fastest
 *ifElse* | 🚀 Fastest | 70.97% slower | 🔳
 *includes* | 🚀 Fastest | 71.7% slower | 🔳
 *indexOf* | 🚀 Fastest | 84.08% slower | 7.86% slower
 *init* | 94.42% slower | 97.55% slower | 🚀 Fastest
 *is* | 🚀 Fastest | 11.72% slower | 🔳
 *isEmpty* | 51.68% slower | 93.82% slower | 🚀 Fastest
 *last* | 🚀 Fastest | 99.64% slower | 1.05% slower
 *lastIndexOf* | 🚀 Fastest | 42.38% slower | 🔳
 *map* | 🚀 Fastest | 69.63% slower | 4.68% slower
 *match* | 🚀 Fastest | 46.75% slower | 🔳
 *merge* | 63.55% slower | 🚀 Fastest | 55.25% slower
 *none* | 🚀 Fastest | 98.22% slower | 🔳
 *omit* | 🚀 Fastest | 70.66% slower | 97.56% slower
 *over* | 🚀 Fastest | 50.77% slower | 🔳
 *path* | 🚀 Fastest | 74.94% slower | 5.72% slower
 *pick* | 🚀 Fastest | 26.29% slower | 86.82% slower
 *prop* | 🚀 Fastest | 89.89% slower | 🔳
 *propEq* | 🚀 Fastest | 95.26% slower | 🔳
 *range* | 95.17% slower | 90.22% slower | 🚀 Fastest
 *reduce* | 52.76% slower | 74.02% slower | 🚀 Fastest
 *repeat* | 85.91% slower | 95.31% slower | 🚀 Fastest
 *replace* | 0.47% slower | 28.13% slower | 🚀 Fastest
 *set* | 🚀 Fastest | 36.26% slower | 🔳
 *sort* | 🚀 Fastest | 63.15% slower | 🔳
 *sortBy* | 🚀 Fastest | 61.57% slower | 88.88% slower
 *split* | 🚀 Fastest | 85.34% slower | 33.69% slower
 *splitEvery* | 🚀 Fastest | 90.18% slower | 🔳
 *take* | 93.44% slower | 98.04% slower | 🚀 Fastest
 *takeLast* | 92.61% slower | 98.83% slower | 🚀 Fastest
 *test* | 🚀 Fastest | 94.42% slower | 🔳
 *type* | 18.91% slower | 🚀 Fastest | 🔳
 *uniq* | 98.98% slower | 96.58% slower | 🚀 Fastest
 *update* | 🚀 Fastest | 38.88% slower | 🔳
 *view* | 🚀 Fastest | 82.21% slower | 🔳

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-benchmarks)

## ❯ Used by

- [WatermelonDB](https://github.com/Nozbe/WatermelonDB)

- [Walmart Canada](https://www.walmart.ca) reported by [w-b-dev](https://github.com/w-b-dev) 

- [VSCode Slack intergration](https://github.com/verydanny/vcslack)

- [Webpack PostCSS](https://github.com/sectsect/webpack-postcss)

- [MobX-State-Tree decorators](https://github.com/farwayer/mst-decorators)

- [Rewrite of the Betaflight configurator](https://github.com/freshollie/fresh-configurator)

- [MineFlayer plugin](https://github.com/G07cha/MineflayerArmorManager)

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-used-by)

## API

### add

```typescript

add(a: number, b: number): number
```

It adds `a` and `b`.

> :boom: It doesn't work with strings, as the inputs are parsed to numbers before calculation.

```javascript
R.add(2, 3) // =>  5
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.add(2%2C%203)%20%2F%2F%20%3D%3E%20%205">Try this <strong>R.add</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.add</strong> source</summary>

```javascript
export function add(a, b){
  if (arguments.length === 1) return _b => add(a, _b)

  return Number(a) + Number(b)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'

test('with number', () => {
  expect(add(2, 3)).toEqual(5)
  expect(add(7)(10)).toEqual(17)
})

test('string is bad input', () => {
  expect(add('foo', 'bar')).toBeNaN()
})

test('ramda specs', () => {
  expect(add('1', '2')).toEqual(3)
  expect(add(1, '2')).toEqual(3)
  expect(add(true, false)).toEqual(1)
  expect(add(null, null)).toEqual(0)
  expect(add(undefined, undefined)).toEqual(NaN)
  expect(add(new Date(1), new Date(2))).toEqual(3)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#add)

### adjust

```typescript

adjust<T>(index: number, replaceFn: (x: T) => T, list: T[]): T[]
```

It replaces `index` in array `list` with the result of `replaceFn(list[i])`.

```javascript
R.adjust(
  0,
  a => a + 1,
  [0, 100]
) // => [1, 100]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.adjust(%0A%20%200%2C%0A%20%20a%20%3D%3E%20a%20%2B%201%2C%0A%20%20%5B0%2C%20100%5D%0A)%20%2F%2F%20%3D%3E%20%5B1%2C%20100%5D">Try this <strong>R.adjust</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.adjust</strong> source</summary>

```javascript
import { curry } from './curry'

function adjustFn(
  index, replaceFn, list
){
  const actualIndex = index < 0 ? list.length + index : index
  if (index >= list.length || actualIndex < 0) return list

  const clone = list.slice()
  clone[ actualIndex ] = replaceFn(clone[ actualIndex ])

  return clone
}

export const adjust = curry(adjustFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { adjust } from './adjust'
import { pipe } from './pipe'

const list = [ 0, 1, 2 ]
const expected = [ 0, 11, 2 ]

test('happy', () => {})

test('happy', () => {
  expect(adjust(
    1, add(10), list
  )).toEqual(expected)
})

test('with curring type 1 1 1', () => {
  expect(adjust(1)(add(10))(list)).toEqual(expected)
})

test('with curring type 1 2', () => {
  expect(adjust(1)(add(10), list)).toEqual(expected)
})

test('with curring type 2 1', () => {
  expect(adjust(1, add(10))(list)).toEqual(expected)
})

test('with negative index', () => {
  expect(adjust(
    -2, add(10), list
  )).toEqual(expected)
})

test('when index is out of bounds', () => {
  const list = [ 0, 1, 2, 3 ]
  expect(adjust(
    4, add(1), list
  )).toEqual(list)
  expect(adjust(
    -5, add(1), list
  )).toEqual(list)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#adjust)

### all

```typescript

all<T>(predicate: (x: T) => boolean, list: T[]): boolean
```

It returns `true`, if all members of array `list` returns `true`, when applied as argument to `predicate` function.

```javascript
const list = [ 0, 1, 2, 3, 4 ]
const predicate = x => x > -1

const result = R.all(predicate, list)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%200%2C%201%2C%202%2C%203%2C%204%20%5D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3E%20-1%0A%0Aconst%20result%20%3D%20R.all(predicate%2C%20list)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.all</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.all</strong> source</summary>

```javascript
export function all(predicate, list){
  if (arguments.length === 1) return _list => all(predicate, _list)

  for (let i = 0; i < list.length; i++){
    if (!predicate(list[ i ])) return false
  }

  return true
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { all } from './all'

const list = [ 0, 1, 2, 3, 4 ]

test('when true', () => {
  const fn = x => x > -1

  expect(all(fn)(list)).toBeTrue()
})

test('when false', () => {
  const fn = x => x > 2

  expect(all(fn, list)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#all)

### allFalse

```typescript

allFalse(...inputs: any[]): boolean
```

It returns `true` if all `inputs` arguments are falsy(empty objects and empty arrays are considered falsy).

Functions are valid inputs, but these functions cannot have their own arguments.

This method is very similar to `R.anyFalse`, `R.anyTrue` and `R.allTrue`

```javascript
R.allFalse(0, null, [], {}, '', () => false)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.allFalse(0%2C%20null%2C%20%5B%5D%2C%20%7B%7D%2C%20''%2C%20()%20%3D%3E%20false)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.allFalse</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.allFalse</strong> source</summary>

```javascript
import { isTruthy } from './_internals/isTruthy'
import { type } from './type'

export function allFalse(...inputs){
  let counter = 0
  while (counter < inputs.length){
    const x = inputs[ counter ]

    if (type(x) === 'Function'){
      if (isTruthy(x())){
        return false
      }
    } else if (isTruthy(x)){
      return false
    }

    counter++
  }

  return true
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { runTests } from 'helpers-fn'

import { allFalse } from './allFalse'

const happy = { ok : [ () => false, () => [], () => {}, null, false, [] ] }
const withArray = { fail : [ ...happy.ok, [ 1 ] ] }
const withObject = { fail : [ ...happy.ok, { a : 1 } ] }
const withFunction = { fail : [ ...happy.ok, () => ({ a : 1 }) ] }
const withBoolean = { fail : [ ...happy.ok, true ] }

const testData = {
  label : 'R.allFalse',
  data  : [ happy, withArray, withObject, withFunction, withBoolean ],
  fn    : input => allFalse(...input),
}
runTests(testData)
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#allFalse)

### allPass

```typescript

allPass<T>(predicates: ((x: T) => boolean)[]): (input: T) => boolean
```

It returns `true`, if all functions of `predicates` return `true`, when `input` is their argument.

```javascript
const input = {
  a : 1,
  b : 2,
}
const predicates = [
  x => x.a === 1,
  x => x.b === 2,
]
const result = R.allPass(predicates)(input) // => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20input%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%202%2C%0A%7D%0Aconst%20predicates%20%3D%20%5B%0A%20%20x%20%3D%3E%20x.a%20%3D%3D%3D%201%2C%0A%20%20x%20%3D%3E%20x.b%20%3D%3D%3D%202%2C%0A%5D%0Aconst%20result%20%3D%20R.allPass(predicates)(input)%20%2F%2F%20%3D%3E%20true">Try this <strong>R.allPass</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.allPass</strong> source</summary>

```javascript
export function allPass(predicates){
  return input => {
    let counter = 0
    while (counter < predicates.length){
      if (!predicates[ counter ](input)){
        return false
      }
      counter++
    }

    return true
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { allPass } from './allPass'

test('happy', () => {
  const rules = [ x => typeof x === 'number', x => x > 10, x => x * 7 < 100 ]

  expect(allPass(rules)(11)).toBeTrue()

  expect(allPass(rules)(undefined)).toBeFalse()
})

test('when returns true', () => {
  const conditionArr = [ val => val.a === 1, val => val.b === 2 ]

  expect(allPass(conditionArr)({
    a : 1,
    b : 2,
  })).toBeTrue()
})

test('when returns false', () => {
  const conditionArr = [ val => val.a === 1, val => val.b === 3 ]

  expect(allPass(conditionArr)({
    a : 1,
    b : 2,
  })).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#allPass)

### allTrue

```typescript

allTrue(...input: any[]): boolean
```

It returns `true` if all `inputs` arguments are truthy(empty objects and empty arrays are considered falsy).

```javascript
R.allTrue(1, true, {a: 1}, [1], 'foo', () => true)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.allTrue(1%2C%20true%2C%20%7Ba%3A%201%7D%2C%20%5B1%5D%2C%20'foo'%2C%20()%20%3D%3E%20true)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.allTrue</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.allTrue</strong> source</summary>

```javascript
import { isFalsy } from './_internals/isFalsy'
import { type } from './type'

export function allTrue(...inputs){
  let counter = 0
  while (counter < inputs.length){
    const x = inputs[ counter ]

    if (type(x) === 'Function'){
      if (isFalsy(x())){
        return false
      }
    } else if (isFalsy(x)){
      return false
    }

    counter++
  }

  return true
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { allTrue } from './allTrue'

test('with functions', () => {
  const foo = () => 1
  const bar = () => false
  const baz = () => JSON.parse('{sda')
  const result = allTrue(
    foo, bar, baz
  )
  expect(result).toBeFalse()
})

test('usage with non boolean', () => {
  const foo = { a : 1 }
  const baz = [ 1, 2, 3 ]

  const result = allTrue(
    foo, foo, baz
  )
  expect(result).toBeTrue()
})

test('usage with boolean', () => {
  const foo = 4
  const baz = [ 1, 2, 3 ]

  const result = allTrue(foo > 2, baz.length === 3)
  expect(result).toBeTrue()
})

test('escapes early - case 0', () => {
  const foo = undefined
  const result = allTrue(foo, () => foo.a)
  expect(result).toBeFalse()
})

test('escapes early - case 1', () => {
  const foo = null
  const result = allTrue(foo, () => foo.a)
  expect(result).toBeFalse()
})

test('escapes early - case 2', () => {
  const foo = { a : 'bar' }
  const result = allTrue(
    foo, foo.a, foo.a.b
  )
  expect(result).toBeFalse()
})

test('escapes early - case 3', () => {
  const foo = { a : { b : 'foo' } }
  const result = allTrue(
    foo,
    () => foo.a,
    () => foo.a.b
  )
  expect(result).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#allTrue)

### allType

```typescript

allType(targetType: RambdaTypes): (...input: any[]) => boolean
```

It returns a function which will return `true` if all of its `inputs` arguments belong to `targetType`.

> :boom: `targetType` is one of the possible returns of `R.type`

```javascript
const targetType = 'String'

const result = R.allType(
  targetType
)('foo', 'bar', 'baz')
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20targetType%20%3D%20'String'%0A%0Aconst%20result%20%3D%20R.allType(%0A%20%20targetType%0A)('foo'%2C%20'bar'%2C%20'baz')%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.allType</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.allType</strong> source</summary>

```javascript
import { type } from './type'

export function allType(targetType){
  return (...inputs) => {
    let counter = 0

    while (counter < inputs.length){
      if (type(inputs[ counter ]) !== targetType){
        return false
      }
      counter++
    }

    return true
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { allType } from './allType'

test('when true', () => {
  const result = allType('Array')(
    [ 1, 2, 3 ], [], [ null ]
  )

  expect(result).toBeTrue()
})

test('when false', () => {
  const result = allType('String')(
    1, undefined, null, []
  )

  expect(result).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#allType)

### always

```typescript

always<T>(x: T): () => T
```

It returns function that always returns `x`.

```javascript
const fn = R.always(7)

console.log(fn())// => 7
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20R.always(7)%0A%0Aconsole.log(fn())%2F%2F%20%3D%3E%207">Try this <strong>R.always</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.always</strong> source</summary>

```javascript
export function always(x){
  return () => x
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { always } from './always'
import { F } from './F'

test('happy', () => {
  const fn = always(7)

  expect(fn()).toEqual(7)
  expect(fn()).toEqual(7)
})

test('f', () => {
  const fn = always(F())

  expect(fn()).toBeFalse()
  expect(fn()).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#always)

### and

```typescript

and<T, U>(x: T, y: U): T | U
```

Logical AND

```javascript
R.and(true, true); // => true
R.and(false, true); // => false
R.and(true, 'foo'); // => 'foo'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.and(true%2C%20true)%3B%20%2F%2F%20%3D%3E%20true%0AR.and(false%2C%20true)%3B%20%2F%2F%20%3D%3E%20false%0AR.and(true%2C%20'foo')%3B%20%2F%2F%20%3D%3E%20'foo'">Try this <strong>R.and</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.and</strong> source</summary>

```javascript
export function and(a, b){
  if (arguments.length === 1) return _b => and(a, _b)

  return a && b
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { and } from './and'

test('happy', () => {
  expect(and(1, 'foo')).toBe('foo')
  expect(and(true, true)).toBeTrue()
  expect(and(true)(true)).toBeTrue()
  expect(and(true, false)).toBeFalse()
  expect(and(false, true)).toBeFalse()
  expect(and(false, false)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#and)

### any

```typescript

any<T>(predicate: (x: T) => boolean, list: T[]): boolean
```

It returns `true`, if at least one member of `list` returns true, when passed to a `predicate` function.

```javascript
const list = [1, 2, 3]
const predicate = x => x * x > 8
R.any(fn, list)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20*%20x%20%3E%208%0AR.any(fn%2C%20list)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.any</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.any</strong> source</summary>

```javascript
export function any(predicate, list){
  if (arguments.length === 1) return _list => any(predicate, _list)

  let counter = 0
  while (counter < list.length){
    if (predicate(list[ counter ], counter)){
      return true
    }
    counter++
  }

  return false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { any } from './any'

const list = [ 1, 2, 3 ]

test('happy', () => {
  expect(any(x => x < 0, list)).toBeFalse()
})

test('with curry', () => {
  expect(any(x => x > 2)(list)).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#any)

### anyFalse

```typescript

anyFalse(...input: any[]): boolean
```

It returns `true` if any of `inputs` is falsy(empty objects and empty arrays are considered falsy).

```javascript
R.anyFalse(1, {a: 1}, [1], () => false)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.anyFalse(1%2C%20%7Ba%3A%201%7D%2C%20%5B1%5D%2C%20()%20%3D%3E%20false)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.anyFalse</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.anyFalse</strong> source</summary>

```javascript
import { isFalsy } from './_internals/isFalsy'
import { type } from './type'

export function anyFalse(...inputs){
  let counter = 0
  while (counter < inputs.length){
    const x = inputs[ counter ]

    if (type(x) === 'Function'){
      if (isFalsy(x())){
        return true
      }
    } else if (isFalsy(x)){
      return true
    }

    counter++
  }

  return false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { anyFalse } from './anyFalse'

test('when true', () => {
  expect(anyFalse(
    true, true, false
  )).toBeTruthy()
})

test('when false', () => {
  expect(anyFalse(true, true)).toBeFalsy()
})

test('supports function', () => {
  expect(anyFalse(
    true,
    () => true,
    () => false
  )).toBeTruthy()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#anyFalse)

### anyPass

```typescript

anyPass<T>(predicates: SafePred<T>[]): SafePred<T>
```

It accepts list of `predicates` and returns a function. This function with its `input` will return `true`, if any of `predicates` returns `true` for this `input`.

```javascript
const isBig = x => x > 20
const isOdd = x => x % 2 === 1
const input = 11

const fn = R.anyPass(
  [isBig, isOdd]
)

const result = fn(input) 
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20isBig%20%3D%20x%20%3D%3E%20x%20%3E%2020%0Aconst%20isOdd%20%3D%20x%20%3D%3E%20x%20%25%202%20%3D%3D%3D%201%0Aconst%20input%20%3D%2011%0A%0Aconst%20fn%20%3D%20R.anyPass(%0A%20%20%5BisBig%2C%20isOdd%5D%0A)%0A%0Aconst%20result%20%3D%20fn(input)%20%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.anyPass</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.anyPass</strong> source</summary>

```javascript
export function anyPass(predicates){
  return input => {
    let counter = 0
    while (counter < predicates.length){
      if (predicates[ counter ](input)){
        return true
      }
      counter++
    }

    return false
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { anyPass } from './anyPass'

test('happy', () => {
  const rules = [ x => typeof x === 'string', x => x > 10 ]
  const predicate = anyPass(rules)
  expect(predicate('foo')).toBeTrue()
  expect(predicate(6)).toBeFalse()
})

test('happy', () => {
  const rules = [ x => typeof x === 'string', x => x > 10 ]

  expect(anyPass(rules)(11)).toBeTrue()

  expect(anyPass(rules)(undefined)).toBeFalse()
})

const obj = {
  a : 1,
  b : 2,
}

test('when returns true', () => {
  const conditionArr = [ val => val.a === 1, val => val.a === 2 ]

  expect(anyPass(conditionArr)(obj)).toBeTrue()
})

test('when returns false + curry', () => {
  const conditionArr = [ val => val.a === 2, val => val.b === 3 ]

  expect(anyPass(conditionArr)(obj)).toBeFalse()
})

test('happy', () => {
  expect(anyPass([])(3)).toEqual(false)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#anyPass)

### anyTrue

```typescript

anyTrue(...input: any[]): boolean
```

It returns `true` if any of `inputs` arguments are truthy(empty objects and empty arrays are considered falsy).

```javascript
R.anyTrue(0, null, [], {}, '', () => true)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.anyTrue(0%2C%20null%2C%20%5B%5D%2C%20%7B%7D%2C%20''%2C%20()%20%3D%3E%20true)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.anyTrue</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.anyTrue</strong> source</summary>

```javascript
import { isTruthy } from './_internals/isTruthy'
import { type } from './type'

export function anyTrue(...inputs){
  let counter = 0
  while (counter < inputs.length){
    const x = inputs[ counter ]

    if (type(x) === 'Function'){
      if (isTruthy(x())){
        return true
      }
    } else if (isTruthy(x)){
      return true
    }

    counter++
  }

  return false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { anyTrue } from './anyTrue'

test('when true', () => {
  expect(anyTrue(
    true, true, false
  )).toBeTruthy()
})

test('when false', () => {
  expect(anyTrue(
    false, false, false
  )).toBeFalsy()
})

test('supports function', () => {
  expect(anyTrue(
    false,
    false,
    false,
    () => false,
    () => true
  )).toBeTruthy()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#anyTrue)

### anyType

```typescript

anyType(targetType: RambdaTypes): (...input: any[]) => boolean
```

It returns a function which will return `true` if at least one of its `inputs` arguments belongs to `targetType`.

`targetType` is one of the possible returns of `R.type`

> :boom: `targetType` is one of the possible returns of `R.type`

```javascript
const targetType = 'String'

const result = R.anyType(
  targetType
)(1, {}, 'foo')
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20targetType%20%3D%20'String'%0A%0Aconst%20result%20%3D%20R.anyType(%0A%20%20targetType%0A)(1%2C%20%7B%7D%2C%20'foo')%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.anyType</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.anyType</strong> source</summary>

```javascript
import { type } from './type'

export function anyType(targetType){
  return (...inputs) => {
    let counter = 0

    while (counter < inputs.length){
      if (type(inputs[ counter ]) === targetType){
        return true
      }
      counter++
    }

    return false
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { anyType } from './anyType'

test('when true', () => {
  const result = anyType('Array')(
    1, undefined, null, []
  )

  expect(result).toBeTrue()
})

test('when false', () => {
  const result = anyType('String')(
    1, undefined, null, []
  )

  expect(result).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#anyType)

### append

```typescript

append<T>(x: T, list: T[]): T[]
```

It adds element `x` at the end of `list`.

```javascript
const x = 'foo'

const result = R.append(x, ['bar', 'baz'])
// => ['bar', 'baz', 'foo']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20x%20%3D%20'foo'%0A%0Aconst%20result%20%3D%20R.append(x%2C%20%5B'bar'%2C%20'baz'%5D)%0A%2F%2F%20%3D%3E%20%5B'bar'%2C%20'baz'%2C%20'foo'%5D">Try this <strong>R.append</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.append</strong> source</summary>

```javascript
export function append(x, input){
  if (arguments.length === 1) return _input => append(x, _input)

  if (typeof input === 'string') return input.split('').concat(x)

  const clone = input.slice()
  clone.push(x)

  return clone
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { append } from './append'

test('happy', () => {
  expect(append('tests', [ 'write', 'more' ])).toEqual([
    'write',
    'more',
    'tests',
  ])
})

test('append to empty array', () => {
  expect(append('tests')([])).toEqual([ 'tests' ])
})

test('with strings', () => {
  expect(append('o', 'fo')).toEqual([ 'f', 'o', 'o' ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#append)

### applyDiff

```typescript

applyDiff<Output>(rules: ApplyDiffRule[], obj: object): Output
```

It changes paths in an object according to a list of operations. Valid operations are `add`, `update` and `delete`. Its use-case is while writing tests and you need to change the test data.

Note, that you cannot use `update` operation, if the object path is missing in the input object.
Also, you cannot use `add` operation, if the object path has a value.

```javascript
const obj = {a: {b:1, c:2}}
const rules = [
  {op: 'remove', path: 'a.c'},
  {op: 'add', path: 'a.d', value: 4},
  {op: 'update', path: 'a.b', value: 2},
]
const result = R.applyDiff(rules, obj)
const expected = {a: {b: 2, d: 4}}

// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%20%7Bb%3A1%2C%20c%3A2%7D%7D%0Aconst%20rules%20%3D%20%5B%0A%20%20%7Bop%3A%20'remove'%2C%20path%3A%20'a.c'%7D%2C%0A%20%20%7Bop%3A%20'add'%2C%20path%3A%20'a.d'%2C%20value%3A%204%7D%2C%0A%20%20%7Bop%3A%20'update'%2C%20path%3A%20'a.b'%2C%20value%3A%202%7D%2C%0A%5D%0Aconst%20result%20%3D%20R.applyDiff(rules%2C%20obj)%0Aconst%20expected%20%3D%20%7Ba%3A%20%7Bb%3A%202%2C%20d%3A%204%7D%7D%0A%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.applyDiff</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.applyDiff</strong> source</summary>

```javascript
import { assocPath } from './assocPath'
import { path as pathModule } from './path'
const ALLOWED_OPERATIONS = [ 'remove', 'add', 'update' ]

export function removeAtPath(path, obj){
  const p = typeof path === 'string' ? path.split('.') : path

  const len = p.length
  if (len === 0) return
  if (len === 1) return delete obj[ p[ 0 ] ]
  if (len === 2) return delete obj[ p[ 0 ] ][ p[ 1 ] ]
  if (len === 3) return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ]
  if (len === 4) return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ]
  if (len === 5) return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ][ p[ 4 ] ]
  if (len === 6){
    return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ][ p[ 4 ] ][ p[ 5 ] ]
  }
  if (len === 7){
    return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ][ p[ 4 ] ][ p[ 5 ] ][ p[ 6 ] ]
  }
  if (len === 8){
    return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ][ p[ 4 ] ][ p[ 5 ] ][ p[ 6 ] ][ p[ 7 ] ]
  }
  if (len === 9){
    return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ][ p[ 4 ] ][ p[ 5 ] ][ p[ 6 ] ][ p[ 7 ] ][ p[ 8 ] ]
  }
  if (len === 10){
    return delete obj[ p[ 0 ] ][ p[ 1 ] ][ p[ 2 ] ][ p[ 3 ] ][ p[ 4 ] ][ p[ 5 ] ][ p[ 6 ] ][ p[ 7 ] ][ p[ 8 ] ][
      p[ 9 ]
    ]
  }
}

export function applyDiff(rules, obj){
  if (arguments.length === 1) return _obj => applyDiff(rules, _obj)

  let clone = { ...obj }

  rules.forEach(({ op, path, value }) => {
    if (!ALLOWED_OPERATIONS.includes(op)) return
    if (op === 'add' && path && value !== undefined){
      if (pathModule(path, obj)) return

      return clone = assocPath(
        path, value, clone
      )
    }

    if (op === 'remove'){
      if (pathModule(path, obj) === undefined) return

      return removeAtPath(path, clone)
    }
    if (op === 'update' && path && value !== undefined){
      if (pathModule(path, obj) === undefined) return

      return clone = assocPath(
        path, value, clone
      )
    }
  })

  return clone
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { applyDiff } from './applyDiff'

test('remove operation', () => {
  const rules = [
    {
      op   : 'remove',
      path : 'a.b',
    },
  ]
  const result = applyDiff(rules, {
    a : {
      b : 1,
      c : 2,
    },
  })
  expect(result).toEqual({ a : { c : 2 } })
})

test('update operation', () => {
  const rules = [
    {
      op    : 'update',
      path  : 'a.b',
      value : 3,
    },
    {
      op    : 'update',
      path  : 'a.c.1',
      value : 3,
    },
    {
      op    : 'update',
      path  : 'a.d',
      value : 3,
    },
  ]
  const result = applyDiff(rules, {
    a : {
      b : 1,
      c : [ 1, 2 ],
    },
  })
  expect(result).toEqual({
    a : {
      b : 3,
      c : [ 1, 3 ],
    },
  })
})

test('add operation', () => {
  const rules = [
    {
      op    : 'add',
      path  : 'a.b',
      value : 3,
    },
    {
      op    : 'add',
      path  : 'a.d',
      value : 3,
    },
  ]
  const result = applyDiff(rules, {
    a : {
      b : 1,
      c : 2,
    },
  })

  expect(result).toEqual({
    a : {
      b : 1,
      c : 2,
      d : 3,
    },
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#applyDiff)

### applySpec

```typescript

applySpec<Spec extends Record<string, (...args: any[]) => any>>(
  spec: Spec
): (
  ...args: Parameters<ValueOfRecord<Spec>>
) => { [Key in keyof Spec]: ReturnType<Spec[Key]> }
```

> :boom: The currying in this function works best with functions with 4 arguments or less. (arity of 4)

```javascript
const fn = R.applySpec({
  sum: R.add,
  nested: { mul: R.multiply }
})
const result = fn(2, 4) 
// => { sum: 6, nested: { mul: 8 } }
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20R.applySpec(%7B%0A%20%20sum%3A%20R.add%2C%0A%20%20nested%3A%20%7B%20mul%3A%20R.multiply%20%7D%0A%7D)%0Aconst%20result%20%3D%20fn(2%2C%204)%20%0A%2F%2F%20%3D%3E%20%7B%20sum%3A%206%2C%20nested%3A%20%7B%20mul%3A%208%20%7D%20%7D">Try this <strong>R.applySpec</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.applySpec</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

// recursively traverse the given spec object to find the highest arity function
function __findHighestArity(spec, max = 0){
  for (const key in spec){
    if (spec.hasOwnProperty(key) === false || key === 'constructor') continue

    if (typeof spec[ key ] === 'object'){
      max = Math.max(max, __findHighestArity(spec[ key ]))
    }

    if (typeof spec[ key ] === 'function'){
      max = Math.max(max, spec[ key ].length)
    }
  }

  return max
}

function __filterUndefined(){
  const defined = []
  let i = 0
  const l = arguments.length
  while (i < l){
    if (typeof arguments[ i ] === 'undefined') break
    defined[ i ] = arguments[ i ]
    i++
  }

  return defined
}

function __applySpecWithArity(
  spec, arity, cache
){
  const remaining = arity - cache.length

  if (remaining === 1)
    return x =>
      __applySpecWithArity(
        spec, arity, __filterUndefined(...cache, x)
      )
  if (remaining === 2)
    return (x, y) =>
      __applySpecWithArity(
        spec, arity, __filterUndefined(
          ...cache, x, y
        )
      )
  if (remaining === 3)
    return (
      x, y, z
    ) =>
      __applySpecWithArity(
        spec, arity, __filterUndefined(
          ...cache, x, y, z
        )
      )
  if (remaining === 4)
    return (
      x, y, z, a
    ) =>
      __applySpecWithArity(
        spec,
        arity,
        __filterUndefined(
          ...cache, x, y, z, a
        )
      )
  if (remaining > 4)
    return (...args) =>
      __applySpecWithArity(
        spec, arity, __filterUndefined(...cache, ...args)
      )

  // handle spec as Array
  if (_isArray(spec)){
    const ret = []
    let i = 0
    const l = spec.length
    for (; i < l; i++){
      // handle recursive spec inside array
      if (typeof spec[ i ] === 'object' || _isArray(spec[ i ])){
        ret[ i ] = __applySpecWithArity(
          spec[ i ], arity, cache
        )
      }
      // apply spec to the key
      if (typeof spec[ i ] === 'function'){
        ret[ i ] = spec[ i ](...cache)
      }
    }

    return ret
  }

  // handle spec as Object
  const ret = {}
  // apply callbacks to each property in the spec object
  for (const key in spec){
    if (spec.hasOwnProperty(key) === false || key === 'constructor') continue

    // apply the spec recursively
    if (typeof spec[ key ] === 'object'){
      ret[ key ] = __applySpecWithArity(
        spec[ key ], arity, cache
      )
      continue
    }

    // apply spec to the key
    if (typeof spec[ key ] === 'function'){
      ret[ key ] = spec[ key ](...cache)
    }
  }

  return ret
}

export function applySpec(spec, ...args){
  // get the highest arity spec function, cache the result and pass to __applySpecWithArity
  const arity = __findHighestArity(spec)

  if (arity === 0){
    return () => ({})
  }
  const toReturn = __applySpecWithArity(
    spec, arity, args
  )

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { applySpec as applySpecRamda, nAry } from 'ramda'

import { add, always, compose, dec, inc, map, path, prop, T } from '../rambda'
import { applySpec } from './applySpec'

test('different than Ramda when bad spec', () => {
  const result = applySpec({ sum : { a : 1 } })(1, 2)
  const ramdaResult = applySpecRamda({ sum : { a : 1 } })(1, 2)
  expect(result).toEqual({})
  expect(ramdaResult).toEqual({ sum : { a : {} } })
})

test('works with empty spec', () => {
  expect(applySpec({})()).toEqual({})
  expect(applySpec([])(1, 2)).toEqual({})
  expect(applySpec(null)(1, 2)).toEqual({})
})

test('works with unary functions', () => {
  const result = applySpec({
    v : inc,
    u : dec,
  })(1)
  const expected = {
    v : 2,
    u : 0,
  }
  expect(result).toEqual(expected)
})

test('works with binary functions', () => {
  const result = applySpec({ sum : add })(1, 2)
  expect(result).toEqual({ sum : 3 })
})

test('works with nested specs', () => {
  const result = applySpec({
    unnested : always(0),
    nested   : { sum : add },
  })(1, 2)
  const expected = {
    unnested : 0,
    nested   : { sum : 3 },
  }
  expect(result).toEqual(expected)
})

test('works with arrays of nested specs', () => {
  const result = applySpec({
    unnested : always(0),
    nested   : [ { sum : add } ],
  })(1, 2)

  expect(result).toEqual({
    unnested : 0,
    nested   : [ { sum : 3 } ],
  })
})

test('works with arrays of spec objects', () => {
  const result = applySpec([ { sum : add } ])(1, 2)

  expect(result).toEqual([ { sum : 3 } ])
})

test('works with arrays of functions', () => {
  const result = applySpec([ map(prop('a')), map(prop('b')) ])([
    {
      a : 'a1',
      b : 'b1',
    },
    {
      a : 'a2',
      b : 'b2',
    },
  ])
  const expected = [
    [ 'a1', 'a2' ],
    [ 'b1', 'b2' ],
  ]
  expect(result).toEqual(expected)
})

test('works with a spec defining a map key', () => {
  expect(applySpec({ map : prop('a') })({ a : 1 })).toEqual({ map : 1 })
})

test('cannot retains the highest arity', () => {
  const f = applySpec({
    f1 : nAry(2, T),
    f2 : nAry(5, T),
  })
  const fRamda = applySpecRamda({
    f1 : nAry(2, T),
    f2 : nAry(5, T),
  })
  expect(f.length).toBe(0)
  expect(fRamda.length).toBe(5)
})

test('returns a curried function', () => {
  expect(applySpec({ sum : add })(1)(2)).toEqual({ sum : 3 })
})

// Additional tests
// ============================================
test('arity', () => {
  const spec = {
    one   : x1 => x1,
    two   : (x1, x2) => x1 + x2,
    three : (
      x1, x2, x3
    ) => x1 + x2 + x3,
  }
  expect(applySpec(
    spec, 1, 2, 3
  )).toEqual({
    one   : 1,
    two   : 3,
    three : 6,
  })
})

test('arity over 5 arguments', () => {
  const spec = {
    one   : x1 => x1,
    two   : (x1, x2) => x1 + x2,
    three : (
      x1, x2, x3
    ) => x1 + x2 + x3,
    four : (
      x1, x2, x3, x4
    ) => x1 + x2 + x3 + x4,
    five : (
      x1, x2, x3, x4, x5
    ) => x1 + x2 + x3 + x4 + x5,
  }
  expect(applySpec(
    spec, 1, 2, 3, 4, 5
  )).toEqual({
    one   : 1,
    two   : 3,
    three : 6,
    four  : 10,
    five  : 15,
  })
})

test('curried', () => {
  const spec = {
    one   : x1 => x1,
    two   : (x1, x2) => x1 + x2,
    three : (
      x1, x2, x3
    ) => x1 + x2 + x3,
  }
  expect(applySpec(spec)(1)(2)(3)).toEqual({
    one   : 1,
    two   : 3,
    three : 6,
  })
})

test('curried over 5 arguments', () => {
  const spec = {
    one   : x1 => x1,
    two   : (x1, x2) => x1 + x2,
    three : (
      x1, x2, x3
    ) => x1 + x2 + x3,
    four : (
      x1, x2, x3, x4
    ) => x1 + x2 + x3 + x4,
    five : (
      x1, x2, x3, x4, x5
    ) => x1 + x2 + x3 + x4 + x5,
  }
  expect(applySpec(spec)(1)(2)(3)(4)(5)).toEqual({
    one   : 1,
    two   : 3,
    three : 6,
    four  : 10,
    five  : 15,
  })
})

test('undefined property', () => {
  const spec = { prop : path([ 'property', 'doesnt', 'exist' ]) }
  expect(applySpec(spec, {})).toEqual({ prop : undefined })
})

test('restructure json object', () => {
  const spec = {
    id          : path('user.id'),
    name        : path('user.firstname'),
    profile     : path('user.profile'),
    doesntExist : path('user.profile.doesntExist'),
    info        : { views : compose(inc, prop('views')) },
    type        : always('playa'),
  }

  const data = {
    user : {
      id        : 1337,
      firstname : 'john',
      lastname  : 'shaft',
      profile   : 'shaft69',
    },
    views : 42,
  }

  expect(applySpec(spec, data)).toEqual({
    id          : 1337,
    name        : 'john',
    profile     : 'shaft69',
    doesntExist : undefined,
    info        : { views : 43 },
    type        : 'playa',
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#applySpec)

### assoc

```typescript

assoc<T, U, K extends string>(prop: K, val: T, obj: U): Record<K, T> & U
```

It makes a shallow clone of `obj` with setting or overriding the property `prop` with `newValue`.

> :boom: This copies and flattens prototype properties
onto the new object as well. All non-primitive properties are copied by
reference.

```javascript
R.assoc('c', 3, {a: 1, b: 2})
// => {a: 1, b: 2, c: 3}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.assoc('c'%2C%203%2C%20%7Ba%3A%201%2C%20b%3A%202%7D)%0A%2F%2F%20%3D%3E%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D">Try this <strong>R.assoc</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.assoc</strong> source</summary>

```javascript
import { curry } from './curry'

function assocFn(
  prop, newValue, obj
){
  return Object.assign(
    {}, obj, { [ prop ] : newValue }
  )
}

export const assoc = curry(assocFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { assoc } from './assoc'

test('adds a key to an empty object', () => {
  expect(assoc(
    'a', 1, {}
  )).toEqual({ a : 1 })
})

test('adds a key to a non-empty object', () => {
  expect(assoc(
    'b', 2, { a : 1 }
  )).toEqual({
    a : 1,
    b : 2,
  })
})

test('adds a key to a non-empty object - curry case 1', () => {
  expect(assoc('b', 2)({ a : 1 })).toEqual({
    a : 1,
    b : 2,
  })
})

test('adds a key to a non-empty object - curry case 2', () => {
  expect(assoc('b')(2, { a : 1 })).toEqual({
    a : 1,
    b : 2,
  })
})

test('adds a key to a non-empty object - curry case 3', () => {
  const result = assoc('b')(2)({ a : 1 })

  expect(result).toEqual({
    a : 1,
    b : 2,
  })
})

test('changes an existing key', () => {
  expect(assoc(
    'a', 2, { a : 1 }
  )).toEqual({ a : 2 })
})

test('undefined is considered an empty object', () => {
  expect(assoc(
    'a', 1, undefined
  )).toEqual({ a : 1 })
})

test('null is considered an empty object', () => {
  expect(assoc(
    'a', 1, null
  )).toEqual({ a : 1 })
})

test('value can be null', () => {
  expect(assoc(
    'a', null, null
  )).toEqual({ a : null })
})

test('value can be undefined', () => {
  expect(assoc(
    'a', undefined, null
  )).toEqual({ a : undefined })
})

test('assignment is shallow', () => {
  expect(assoc(
    'a', { b : 2 }, { a : { c : 3 } }
  )).toEqual({ a : { b : 2 } })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#assoc)

### assocPath

```typescript

assocPath<Output>(path: Path, newValue: any, obj: object): Output
```

It makes a shallow clone of `obj` with setting or overriding with `newValue` the property found with `path`.

```javascript
const path = 'b.c'
const newValue = 2
const obj = { a: 1 }

R.assocPath(path, newValue, obj)
// => { a : 1, b : { c : 2 }}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20path%20%3D%20'b.c'%0Aconst%20newValue%20%3D%202%0Aconst%20obj%20%3D%20%7B%20a%3A%201%20%7D%0A%0AR.assocPath(path%2C%20newValue%2C%20obj)%0A%2F%2F%20%3D%3E%20%7B%20a%20%3A%201%2C%20b%20%3A%20%7B%20c%20%3A%202%20%7D%7D">Try this <strong>R.assocPath</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.assocPath</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { _isInteger } from './_internals/_isInteger'
import { assoc } from './assoc'
import { curry } from './curry'

function assocPathFn(
  path, newValue, input
){
  const pathArrValue =
    typeof path === 'string' ?
      path.split('.').map(x => _isInteger(Number(x)) ? Number(x) : x) :
      path
  if (pathArrValue.length === 0){
    return newValue
  }

  const index = pathArrValue[ 0 ]
  if (pathArrValue.length > 1){
    const condition =
      typeof input !== 'object' ||
      input === null ||
      !input.hasOwnProperty(index)

    const nextinput = condition ?
      _isInteger(pathArrValue[ 1 ]) ?
        [] :
        {} :
      input[ index ]

    newValue = assocPathFn(
      Array.prototype.slice.call(pathArrValue, 1),
      newValue,
      nextinput
    )
  }

  if (_isInteger(index) && _isArray(input)){
    const arr = input.slice()
    arr[ index ] = newValue

    return arr
  }

  return assoc(
    index, newValue, input
  )
}

export const assocPath = curry(assocPathFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { assocPath } from './assocPath'

test('string can be used as path input', () => {
  const testObj = {
    a : [ { b : 1 }, { b : 2 } ],
    d : 3,
  }
  const result = assocPath(
    'a.0.b', 10, testObj
  )
  const expected = {
    a : [ { b : 10 }, { b : 2 } ],
    d : 3,
  }
  expect(result).toEqual(expected)
})

test('bug', () => {
  /*
    https://github.com/selfrefactor/rambda/issues/524
  */
  const state = {}

  const withDateLike = assocPath(
    [ 'outerProp', '2020-03-10' ],
    { prop : 2 },
    state
  )
  const withNumber = assocPath(
    [ 'outerProp', '5' ], { prop : 2 }, state
  )

  const withDateLikeExpected = { outerProp : { '2020-03-10' : { prop : 2 } } }
  const withNumberExpected = { outerProp : { 5 : { prop : 2 } } }
  expect(withDateLike).toEqual(withDateLikeExpected)
  expect(withNumber).toEqual(withNumberExpected)
})

test('adds a key to an empty object', () => {
  expect(assocPath(
    [ 'a' ], 1, {}
  )).toEqual({ a : 1 })
})

test('adds a key to a non-empty object', () => {
  expect(assocPath(
    'b', 2, { a : 1 }
  )).toEqual({
    a : 1,
    b : 2,
  })
})

test('adds a nested key to a non-empty object', () => {
  expect(assocPath(
    'b.c', 2, { a : 1 }
  )).toEqual({
    a : 1,
    b : { c : 2 },
  })
})

test('adds a nested key to a nested non-empty object - curry case 1', () => {
  expect(assocPath('b.d',
    3)({
    a : 1,
    b : { c : 2 },
  })).toEqual({
    a : 1,
    b : {
      c : 2,
      d : 3,
    },
  })
})

test('adds a key to a non-empty object - curry case 1', () => {
  expect(assocPath('b', 2)({ a : 1 })).toEqual({
    a : 1,
    b : 2,
  })
})

test('adds a nested key to a non-empty object - curry case 1', () => {
  expect(assocPath('b.c', 2)({ a : 1 })).toEqual({
    a : 1,
    b : { c : 2 },
  })
})

test('adds a key to a non-empty object - curry case 2', () => {
  expect(assocPath('b')(2, { a : 1 })).toEqual({
    a : 1,
    b : 2,
  })
})

test('adds a key to a non-empty object - curry case 3', () => {
  const result = assocPath('b')(2)({ a : 1 })

  expect(result).toEqual({
    a : 1,
    b : 2,
  })
})

test('changes an existing key', () => {
  expect(assocPath(
    'a', 2, { a : 1 }
  )).toEqual({ a : 2 })
})

test('undefined is considered an empty object', () => {
  expect(assocPath(
    'a', 1, undefined
  )).toEqual({ a : 1 })
})

test('null is considered an empty object', () => {
  expect(assocPath(
    'a', 1, null
  )).toEqual({ a : 1 })
})

test('value can be null', () => {
  expect(assocPath(
    'a', null, null
  )).toEqual({ a : null })
})

test('value can be undefined', () => {
  expect(assocPath(
    'a', undefined, null
  )).toEqual({ a : undefined })
})

test('assignment is shallow', () => {
  expect(assocPath(
    'a', { b : 2 }, { a : { c : 3 } }
  )).toEqual({ a : { b : 2 } })
})

test('empty array as path', () => {
  const result = assocPath(
    [], 3, {
      a : 1,
      b : 2,
    }
  )
  expect(result).toEqual(3)
})

test('happy', () => {
  const expected = { foo : { bar : { baz : 42 } } }
  const result = assocPath(
    [ 'foo', 'bar', 'baz' ], 42, { foo : null }
  )
  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#assocPath)

### both

```typescript

both(pred1: Pred, pred2: Pred): Pred
```

It returns a function with `input` argument. 

This function will return `true`, if both `firstCondition` and `secondCondition` return `true` when `input` is passed as their argument.

```javascript
const firstCondition = x => x > 10
const secondCondition = x => x < 20
const fn = R.both(secondCondition)

const result = [fn(15), fn(30)]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20firstCondition%20%3D%20x%20%3D%3E%20x%20%3E%2010%0Aconst%20secondCondition%20%3D%20x%20%3D%3E%20x%20%3C%2020%0Aconst%20fn%20%3D%20R.both(secondCondition)%0A%0Aconst%20result%20%3D%20%5Bfn(15)%2C%20fn(30)%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.both</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.both</strong> source</summary>

```javascript
export function both(f, g){
  if (arguments.length === 1) return _g => both(f, _g)

  return (...input) => f(...input) && g(...input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { both } from './both'

const firstFn = val => val > 0
const secondFn = val => val < 10

test('with curry', () => {
  expect(both(firstFn)(secondFn)(17)).toBeFalse()
})

test('without curry', () => {
  expect(both(firstFn, secondFn)(7)).toBeTrue()
})

test('with multiple inputs', () => {
  const between = function (
    a, b, c
  ){
    return a < b && b < c
  }
  const total20 = function (
    a, b, c
  ){
    return a + b + c === 20
  }
  const fn = both(between, total20)
  expect(fn(
    5, 7, 8
  )).toBeTrue()
})

test('skip evaluation of the second expression', () => {
  let effect = 'not evaluated'
  const F = function (){
    return false
  }
  const Z = function (){
    effect = 'Z got evaluated'
  }
  both(F, Z)()

  expect(effect).toBe('not evaluated')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#both)

### chain

```typescript

chain<T, U>(fn: (n: T) => U[], list: T[]): U[]
```

The method is also known as `flatMap`.

```javascript
const duplicate = n => [ n, n ]
const list = [ 1, 2, 3 ]

const result = chain(duplicate, list)
// => [ 1, 1, 2, 2, 3, 3 ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20duplicate%20%3D%20n%20%3D%3E%20%5B%20n%2C%20n%20%5D%0Aconst%20list%20%3D%20%5B%201%2C%202%2C%203%20%5D%0A%0Aconst%20result%20%3D%20chain(duplicate%2C%20list)%0A%2F%2F%20%3D%3E%20%5B%201%2C%201%2C%202%2C%202%2C%203%2C%203%20%5D">Try this <strong>R.chain</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.chain</strong> source</summary>

```javascript
export function chain(fn, list){
  if (arguments.length === 1){
    return _list => chain(fn, _list)
  }

  return [].concat(...list.map(fn))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { chain } from './chain'

const duplicate = n => [ n, n ]

test('happy', () => {
  const fn = x => [ x * 2 ]
  const list = [ 1, 2, 3 ]

  const result = chain(fn, list)

  expect(result).toEqual([ 2, 4, 6 ])
})

test('maps then flattens one level', () => {
  expect(chain(duplicate, [ 1, 2, 3 ])).toEqual([ 1, 1, 2, 2, 3, 3 ])
})

test('maps then flattens one level - curry', () => {
  expect(chain(duplicate)([ 1, 2, 3 ])).toEqual([ 1, 1, 2, 2, 3, 3 ])
})

test('flattens only one level', () => {
  const nest = n => [ [ n ] ]
  expect(chain(nest, [ 1, 2, 3 ])).toEqual([ [ 1 ], [ 2 ], [ 3 ] ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#chain)

### clamp

```typescript

clamp(min: number, max: number, input: number): number
```

Restrict a number `input` to be within `min` and `max` limits.

If `input` is bigger than `max`, then the result is `max`.

If `input` is smaller than `min`, then the result is `min`.

```javascript
const result = [
  R.clamp(0, 10, 5), 
  R.clamp(0, 10, -1),
  R.clamp(0, 10, 11)
]
// => [5, 0, 10]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.clamp(0%2C%2010%2C%205)%2C%20%0A%20%20R.clamp(0%2C%2010%2C%20-1)%2C%0A%20%20R.clamp(0%2C%2010%2C%2011)%0A%5D%0A%2F%2F%20%3D%3E%20%5B5%2C%200%2C%2010%5D">Try this <strong>R.clamp</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.clamp</strong> source</summary>

```javascript
import { curry } from './curry'

function clampFn(
  min, max, input
){
  if (min > max){
    throw new Error('min must not be greater than max in clamp(min, max, value)')
  }
  if (input >= min && input <= max) return input

  if (input > max) return max
  if (input < min) return min
}

export const clamp = curry(clampFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { clamp } from './clamp'

test('when min is greater than max', () => {
  expect(() => clamp(
    -5, -10, 5
  )).toThrowWithMessage(Error,
    'min must not be greater than max in clamp(min, max, value)')
})

test('rambda specs', () => {
  expect(clamp(
    1, 10, 0
  )).toEqual(1)
  expect(clamp(
    3, 12, 1
  )).toEqual(3)
  expect(clamp(
    -15, 3, -100
  )).toEqual(-15)
  expect(clamp(
    1, 10, 20
  )).toEqual(10)
  expect(clamp(
    3, 12, 23
  )).toEqual(12)
  expect(clamp(
    -15, 3, 16
  )).toEqual(3)
  expect(clamp(
    1, 10, 4
  )).toEqual(4)
  expect(clamp(
    3, 12, 6
  )).toEqual(6)
  expect(clamp(
    -15, 3, 0
  )).toEqual(0)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#clamp)

### clone

```typescript

clone<T>(input: T): T
```

It creates a deep copy of the `input`, which may contain (nested) Arrays and Objects, Numbers, Strings, Booleans and Dates.

```javascript
const objects = [{a: 1}, {b: 2}];
const objectsClone = R.clone(objects);

const result = [
  R.equals(objects, objectsClone),
  R.equals(objects[0], objectsClone[0]),
] // => [ true, true ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20objects%20%3D%20%5B%7Ba%3A%201%7D%2C%20%7Bb%3A%202%7D%5D%3B%0Aconst%20objectsClone%20%3D%20R.clone(objects)%3B%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.equals(objects%2C%20objectsClone)%2C%0A%20%20R.equals(objects%5B0%5D%2C%20objectsClone%5B0%5D)%2C%0A%5D%20%2F%2F%20%3D%3E%20%5B%20true%2C%20true%20%5D">Try this <strong>R.clone</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.clone</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function clone(input){
  const out = _isArray(input) ? Array(input.length) : {}
  if (input && input.getTime) return new Date(input.getTime())

  for (const key in input){
    const v = input[ key ]
    out[ key ] =
      typeof v === 'object' && v !== null ?
        v.getTime ?
          new Date(v.getTime()) :
          clone(v) :
        v
  }

  return out
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import assert from 'assert'

import { clone } from './clone'
import { equals } from './equals'

test('with array', () => {
  const arr = [
    {
      b : 2,
      c : 'foo',
      d : [ 1, 2, 3 ],
    },
    1,
    new Date(),
    null,
  ]
  expect(clone(arr)).toEqual(arr)
})

test('with object', () => {
  const obj = {
    a : 1,
    b : 2,
    c : 3,
    d : [ 1, 2, 3 ],
    e : new Date(),
  }
  expect(clone(obj)).toEqual(obj)
})

test('with date', () => {
  const date = new Date(
    2014, 10, 14, 23, 59, 59, 999
  )

  const cloned = clone(date)
  assert.notStrictEqual(date, cloned)
  expect(cloned).toEqual(new Date(
    2014, 10, 14, 23, 59, 59, 999
  ))

  expect(cloned.getDay()).toEqual(5)
})

test('with R.equals', () => {
  const objects = [ { a : 1 }, { b : 2 } ]

  const objectsClone = clone(objects)

  const result = [
    equals(objects, objectsClone),
    equals(objects[ 0 ], objectsClone[ 0 ]),
  ]
  expect(result).toEqual([ true, true ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#clone)

### complement

```typescript

complement<T extends any[]>(pred: (...args: T) => boolean): (...args: T) => boolean
```

It returns `inverted` version of `origin` function that accept `input` as argument.

The return value of `inverted` is the negative boolean value of `origin(input)`.

```javascript
const origin = x => x > 5
const inverted = complement(origin)

const result = [
  origin(7),
  inverted(7)
] => [ true, false ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20origin%20%3D%20x%20%3D%3E%20x%20%3E%205%0Aconst%20inverted%20%3D%20complement(origin)%0A%0Aconst%20result%20%3D%20%5B%0A%20%20origin(7)%2C%0A%20%20inverted(7)%0A%5D%20%3D%3E%20%5B%20true%2C%20false%20%5D">Try this <strong>R.complement</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.complement</strong> source</summary>

```javascript
export function complement(fn){
  return (...input) => !fn(...input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { complement } from './complement'

test('happy', () => {
  const fn = complement(x => x.length === 0)

  expect(fn([ 1, 2, 3 ])).toBeTrue()
})

test('with multiple parameters', () => {
  const between = function (
    a, b, c
  ){
    return a < b && b < c
  }
  const f = complement(between)
  expect(f(
    4, 5, 11
  )).toEqual(false)
  expect(f(
    12, 2, 6
  )).toEqual(true)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#complement)

### compose

It performs right-to-left function composition.

```javascript
const result = R.compose(
  R.map(x => x * 2),
  R.filter(x => x > 2)
)([1, 2, 3, 4])

// => [6, 8]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.compose(%0A%20%20R.map(x%20%3D%3E%20x%20*%202)%2C%0A%20%20R.filter(x%20%3D%3E%20x%20%3E%202)%0A)(%5B1%2C%202%2C%203%2C%204%5D)%0A%0A%2F%2F%20%3D%3E%20%5B6%2C%208%5D">Try this <strong>R.compose</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#compose)

### composeAsync

```typescript

composeAsync<Out>(
  ...fns: (Async<any> | Func<any>)[]
): (input: any) => Promise<Out>
```

Asynchronous version of `R.compose`

> :boom: It doesn't work with promises or function returning promises such as `const foo = input => new Promise(...)`.

```javascript
const add = async x => {
  await R.delay(100)
  return x + 1
}
const multiply = async x => {
  await R.delay(100)
  return x * 2 
}

const result = await R.composeAsync(
  add,
  multiply
)(1)
// `result` resolves to `3`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20add%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20%2B%201%0A%7D%0Aconst%20multiply%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20*%202%20%0A%7D%0A%0Aconst%20result%20%3D%20await%20R.composeAsync(%0A%20%20add%2C%0A%20%20multiply%0A)(1)%0A%2F%2F%20%60result%60%20resolves%20to%20%603%60">Try this <strong>R.composeAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.composeAsync</strong> source</summary>

```javascript
import { type } from './type'

export function composeAsync(...inputArguments){
  return async function (startArgument){
    let argumentsToPass = startArgument

    while (inputArguments.length !== 0){
      const fn = inputArguments.pop()
      const typeFn = type(fn)

      if (typeFn === 'Async'){
        argumentsToPass = await fn(argumentsToPass)
      } else {
        argumentsToPass = fn(argumentsToPass)
        if (type(argumentsToPass) === 'Promise'){
          argumentsToPass = await argumentsToPass
        }
      }
    }

    return argumentsToPass
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { composeAsync } from './composeAsync'
import { delay } from './delay'

async function identity(x){
  await delay(100)

  return x
}

test('happy', async () => {
  const fn1 = async x => {
    await delay(100)

    return x.map(xx => xx + 1)
  }
  const fn2 = async x => {
    await delay(100)

    return x.map(xx => xx * 2)
  }
  const result = await composeAsync(fn1,
    fn2)(await Promise.all([ identity(1), identity(2), identity(3) ]))

  expect(result).toEqual([ 3, 5, 7 ])
})

const delayFn = ms =>
  new Promise(resolve => {
    resolve(ms + 1)
  })

test('with function returning promise', async () => {
  const result = await composeAsync(
    x => x,
    x => x + 1,
    delayFn,
    x => x
  )(1)

  expect(result).toEqual(3)
})

test('throw error', async () => {
  const fn = async () => {
    await delay(1)
    JSON.parse('{foo')
  }

  let didThrow = false
  try {
    await composeAsync(fn, x => x + 1)(20)
  } catch (e){
    didThrow = true
  }

  expect(didThrow).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#composeAsync)

### concat

```typescript

concat<T>(x: T[], y: T[]): T[]
```

It returns a new string or array, which is the result of merging `x` and `y`.

```javascript
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo', 'bar') // => 'foobar'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.concat(%5B1%2C%202%5D)(%5B3%2C%204%5D)%20%2F%2F%20%3D%3E%20%5B1%2C%202%2C%203%2C%204%5D%0AR.concat('foo'%2C%20'bar')%20%2F%2F%20%3D%3E%20'foobar'">Try this <strong>R.concat</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.concat</strong> source</summary>

```javascript
export function concat(x, y){
  if (arguments.length === 1) return _y => concat(x, _y)

  return typeof x === 'string' ? `${ x }${ y }` : [ ...x, ...y ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { concat } from './concat'

test('happy', () => {
  const arr1 = [ 'a', 'b', 'c' ]
  const arr2 = [ 'd', 'e', 'f' ]

  const a = concat(arr1, arr2)
  const b = concat(arr1)(arr2)
  const expectedResult = [ 'a', 'b', 'c', 'd', 'e', 'f' ]

  expect(a).toEqual(expectedResult)
  expect(b).toEqual(expectedResult)
})

test('with strings', () => {
  expect(concat('ABC', 'DEF')).toEqual('ABCDEF')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#concat)

### cond

```typescript

cond(conditions: ([Pred, (...a: any[]) => any])[]): (...x: any[]) => any
```

It takes list with `conditions` and returns a new function `fn` that expects `input` as argument. 

This function will start evaluating the `conditions` in order to find the first winner(order of conditions matter). 

The winner is this condition, which left side returns `true` when `input` is its argument. Then the evaluation of the right side of the winner will be the final result.

If no winner is found, then `fn` returns `undefined`.

```javascript
const fn = R.cond([
  [ x => x > 25, R.always('more than 25') ],
  [ x => x > 15, R.always('more than 15') ],
  [ R.T, x => `${x} is nothing special` ],
])

const result = [
  fn(30),
  fn(20),
  fn(10),
] 
// => ['more than 25', 'more than 15', '10 is nothing special']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20R.cond(%5B%0A%20%20%5B%20x%20%3D%3E%20x%20%3E%2025%2C%20R.always('more%20than%2025')%20%5D%2C%0A%20%20%5B%20x%20%3D%3E%20x%20%3E%2015%2C%20R.always('more%20than%2015')%20%5D%2C%0A%20%20%5B%20R.T%2C%20x%20%3D%3E%20%60%24%7Bx%7D%20is%20nothing%20special%60%20%5D%2C%0A%5D)%0A%0Aconst%20result%20%3D%20%5B%0A%20%20fn(30)%2C%0A%20%20fn(20)%2C%0A%20%20fn(10)%2C%0A%5D%20%0A%2F%2F%20%3D%3E%20%5B'more%20than%2025'%2C%20'more%20than%2015'%2C%20'10%20is%20nothing%20special'%5D">Try this <strong>R.cond</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.cond</strong> source</summary>

```javascript
export function cond(conditions){
  return input => {
    let done = false
    let toReturn
    conditions.forEach(([ predicate, resultClosure ]) => {
      if (!done && predicate(input)){
        done = true
        toReturn = resultClosure(input)
      }
    })

    return toReturn
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { always } from './always'
import { cond } from './cond'
import { equals } from './equals'
import { T } from './T'

test('returns a function', () => {
  expect(typeof cond([])).toEqual('function')
})

test('returns a conditional function', () => {
  const fn = cond([
    [ equals(0), always('water freezes at 0°C') ],
    [ equals(100), always('water boils at 100°C') ],
    [
      T,
      function (temp){
        return 'nothing special happens at ' + temp + '°C'
      },
    ],
  ])
  expect(fn(0)).toEqual('water freezes at 0°C')
  expect(fn(50)).toEqual('nothing special happens at 50°C')
  expect(fn(100)).toEqual('water boils at 100°C')
})

test('no winner', () => {
  const fn = cond([
    [ equals('foo'), always(1) ],
    [ equals('bar'), always(2) ],
  ])
  expect(fn('quux')).toEqual(undefined)
})

test('predicates are tested in order', () => {
  const fn = cond([
    [ T, always('foo') ],
    [ T, always('bar') ],
    [ T, always('baz') ],
  ])
  expect(fn()).toEqual('foo')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#cond)

### converge

```typescript

converge(after: ((...a: any[]) => any), fns: ((...x: any[]) => any)[]): (...y: any[]) => any
```

Accepts a converging function and a list of branching functions and returns a new function. When invoked, this new function is applied to some arguments, each branching function is applied to those same arguments. The results of each branching function are passed as arguments to the converging function to produce the return value.

> :boom: Explanation is taken from `Ramda` documentation

```javascript
const result = R.converge(R.multiply)([ R.add(1), R.add(3) ])(2)
// => 15
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.converge(R.multiply)(%5B%20R.add(1)%2C%20R.add(3)%20%5D)(2)%0A%2F%2F%20%3D%3E%2015">Try this <strong>R.converge</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.converge</strong> source</summary>

```javascript
import { curryN } from './curryN'
import { map } from './map'
import { max } from './max'
import { reduce } from './reduce'

export function converge(fn, transformers){
  if (arguments.length === 1)
    return _transformers => converge(fn, _transformers)

  const highestArity = reduce(
    (a, b) => max(a, b.length), 0, transformers
  )

  return curryN(highestArity, function (){
    return fn.apply(this,
      map(g => g.apply(this, arguments), transformers))
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { converge } from './converge'
import { multiply } from './multiply'

const f1 = converge(multiply, [ a => a + 1, a => a + 10 ])
const f2 = converge(multiply, [ a => a + 1, (a, b) => a + b + 10 ])
const f3 = converge(multiply, [ a => a + 1, (
  a, b, c
) => a + b + c + 10 ])

test('happy', () => {
  expect(f2(6, 7)).toEqual(161)
})

test('passes the results of applying the arguments individually', () => {
  const result = converge(multiply)([ add(1), add(3) ])(2)
  expect(result).toEqual(15)
})

test('returns a function with the length of the longest argument', () => {
  expect(f1.length).toEqual(1)
  expect(f2.length).toEqual(2)
  expect(f3.length).toEqual(3)
})

test('passes context to its functions', () => {
  const a = function (x){
    return this.f1(x)
  }
  const b = function (x){
    return this.f2(x)
  }
  const c = function (x, y){
    return this.f3(x, y)
  }
  const d = converge(c, [ a, b ])
  const context = {
    f1 : add(1),
    f2 : add(2),
    f3 : add,
  }
  expect(a.call(context, 1)).toEqual(2)
  expect(b.call(context, 1)).toEqual(3)
  expect(d.call(context, 1)).toEqual(5)
})

test('works with empty functions list', () => {
  const fn = converge(function (){
    return arguments.length
  }, [])
  expect(fn.length).toEqual(0)
  expect(fn()).toEqual(0)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#converge)

### count

```typescript

count<T>(searchFor: T, list: any[]): number
```

It counts how many times `searchFor` is within `list` according to `R.equals`.

```javascript
const list = [1, {a:1}, 1, 'foo']
const searchFor = 1

const result = R.count(searchFor, list)
// => 2
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%20%7Ba%3A1%7D%2C%201%2C%20'foo'%5D%0Aconst%20searchFor%20%3D%201%0A%0Aconst%20result%20%3D%20R.count(searchFor%2C%20list)%0A%2F%2F%20%3D%3E%202">Try this <strong>R.count</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.count</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { equals } from './equals'

export function count(searchFor, list){
  if (arguments.length === 1){
    return _list => count(searchFor, _list)
  }
  if (!_isArray(list)) return 0

  return list.filter(x => equals(x, searchFor)).length
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { count } from './count'

test('when 0', () => {
  const target = { a : 1 }
  const list = []

  const result = count(target, list)
  const expectedResult = 0

  expect(result).toEqual(expectedResult)
})

test('when 2', () => {
  const target = { a : 1 }
  const list = [ 2, 1, 2, { a : 1 }, 22, { a : 1 } ]

  const result = count(target)(list)
  const expectedResult = 2

  expect(result).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#count)

### curry

It expects a function as input and returns its curried version.

```javascript
const fn = (a, b, c) => a + b + c
const curried = R.curry(fn)
const sum = curried(1,2)

const result = sum(3) // => 6
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20(a%2C%20b%2C%20c)%20%3D%3E%20a%20%2B%20b%20%2B%20c%0Aconst%20curried%20%3D%20R.curry(fn)%0Aconst%20sum%20%3D%20curried(1%2C2)%0A%0Aconst%20result%20%3D%20sum(3)%20%2F%2F%20%3D%3E%206">Try this <strong>R.curry</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#curry)

### curryN

It returns a curried equivalent of the provided function, with the specified arity.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#curryN)

### debounce

```typescript

debounce<T, U>(fn: (input: T) => U, ms: number): (input: T) => U
```

It creates a debounced function that delays invoking `fn` until after wait milliseconds `ms` have elapsed since the last time the debounced function was invoked.

> :boom: Description is taken from `Lodash` docs

```javascript
let counter = 0
const increment = () => {
  counter++
}

const debounced = R.debounce(increment, 1000)

const result = async function(){
  debounced()
  await R.delay(500)
  debounced()
  await R.delay(800)
  console.log(counter) // => 0

  await R.delay(1200)
  console.log(counter) // => 1

  return counter
}
// `result` resolves to `1`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?let%20counter%20%3D%200%0Aconst%20increment%20%3D%20()%20%3D%3E%20%7B%0A%20%20counter%2B%2B%0A%7D%0A%0Aconst%20debounced%20%3D%20R.debounce(increment%2C%201000)%0A%0Aconst%20result%20%3D%20async%20function()%7B%0A%20%20debounced()%0A%20%20await%20R.delay(500)%0A%20%20debounced()%0A%20%20await%20R.delay(800)%0A%20%20console.log(counter)%20%2F%2F%20%3D%3E%200%0A%0A%20%20await%20R.delay(1200)%0A%20%20console.log(counter)%20%2F%2F%20%3D%3E%201%0A%0A%20%20return%20counter%0A%7D%0A%2F%2F%20%60result%60%20resolves%20to%20%601%60">Try this <strong>R.debounce</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.debounce</strong> source</summary>

```javascript
export function debounce(
  func, ms, immediate = false
){
  let timeout

  return function (...input){
    const later = function (){
      timeout = null
      if (!immediate){
        func.apply(null, input)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
    if (callNow){
      func.apply(null, input)
    }
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { debounce } from './debounce'
import { delay } from './delay'

test('happy', async () => {
  let counter = 0
  let aHolder
  let bHolder

  const inc = (a, b) => {
    aHolder = a
    bHolder = b
    counter++
  }
  const incWrapped = debounce(inc, 500)

  incWrapped(1, 2)
  expect(counter).toBe(0)
  expect(aHolder).toBe(undefined)
  expect(bHolder).toBe(undefined)

  await delay(200)

  incWrapped(2, 3)
  expect(counter).toBe(0)

  await delay(200)

  incWrapped(3, 4)
  expect(counter).toBe(0)
  expect(aHolder).toBe(undefined)
  expect(bHolder).toBe(undefined)

  await delay(200)
  incWrapped(5, 6)
  expect(counter).toBe(0)

  await delay(700)
  expect(counter).toBe(1)
  expect(aHolder).toBe(5)
  expect(bHolder).toBe(6)
})

test('immediate debounce', async () => {
  let counter = 0
  const inc = () => {
    counter++
  }

  const incWrapped = debounce(
    inc, 500, true
  )
  incWrapped()
  expect(counter).toBe(1)
  await delay(200)
  incWrapped()
  expect(counter).toBe(1)
  await delay(200)
  incWrapped()
  expect(counter).toBe(1)
  await delay(700)
  incWrapped()
  expect(counter).toBe(2)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#debounce)

### dec

It decrements a number.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dec)

### defaultTo

```typescript

defaultTo<T>(defaultValue: T, input: T | null | undefined): T
```

It returns `defaultValue`, if all of `inputArguments` are `undefined`, `null` or `NaN`.

Else, it returns the first truthy `inputArguments` instance(from left to right).

> :boom: Rambda's **defaultTo** accept indefinite number of arguments when non curried, i.e. `R.defaultTo(2, foo, bar, baz)`.

```javascript
R.defaultTo('foo', 'bar') // => 'bar'
R.defaultTo('foo', undefined) // => 'foo'

// Important - emtpy string is not falsy value(same as Ramda)
R.defaultTo('foo', '') // => 'foo'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.defaultTo('foo'%2C%20'bar')%20%2F%2F%20%3D%3E%20'bar'%0AR.defaultTo('foo'%2C%20undefined)%20%2F%2F%20%3D%3E%20'foo'%0A%0A%2F%2F%20Important%20-%20emtpy%20string%20is%20not%20falsy%20value(same%20as%20Ramda)%0AR.defaultTo('foo'%2C%20'')%20%2F%2F%20%3D%3E%20'foo'">Try this <strong>R.defaultTo</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.defaultTo</strong> source</summary>

```javascript
function isFalsy(input){
  return (
    input === undefined ||
    input === null ||
    Number.isNaN(input) === true
  )
}

export function defaultTo(defaultArgument, input){
  if (arguments.length === 1){
    return _input =>
      defaultTo(defaultArgument, _input)
  }

  return isFalsy(input) ? defaultArgument : input
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { defaultTo } from './defaultTo'

test('with undefined', () => {
  expect(defaultTo('foo')(undefined)).toEqual('foo')
})

test('with null', () => {
  expect(defaultTo('foo')(null)).toEqual('foo')
})

test('with NaN', () => {
  expect(defaultTo('foo')(NaN)).toEqual('foo')
})

test('with empty string', () => {
  expect(defaultTo('foo', '')).toEqual('')
})

test('with false', () => {
  expect(defaultTo('foo', false)).toEqual(false)
})

test('when inputArgument passes initial check', () => {
  expect(defaultTo('foo', 'bar')).toEqual('bar')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#defaultTo)

### delay

```typescript

delay(ms: number): Promise<'RAMBDAX_DELAY'>
```

`setTimeout` as a promise that resolves to `R.DELAY` variable after `ms` milliseconds.

```javascript
const result = R.delay(1000)
// `result` resolves to `RAMBDAX_DELAY`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.delay(1000)%0A%2F%2F%20%60result%60%20resolves%20to%20%60RAMBDAX_DELAY%60">Try this <strong>R.delay</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.delay</strong> source</summary>

```javascript
export const DELAY = 'RAMBDAX_DELAY'

export function delay(ms){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(DELAY)
    }, ms)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { DELAY, delay } from './delay'

test('usage with variables', async () => {
  expect(await delay(500)).toBe(DELAY)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#delay)

### difference

```typescript

difference<T>(a: T[], b: T[]): T[]
```

It returns the uniq set of all elements in the first list `a` not contained in the second list `b`.

`R.equals` is used to determine equality.

```javascript
const a = [ 1, 2, 3, 4 ]
const b = [ 3, 4, 5, 6 ]

const result = difference(a, b)
// => [ 1, 2 ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20a%20%3D%20%5B%201%2C%202%2C%203%2C%204%20%5D%0Aconst%20b%20%3D%20%5B%203%2C%204%2C%205%2C%206%20%5D%0A%0Aconst%20result%20%3D%20difference(a%2C%20b)%0A%2F%2F%20%3D%3E%20%5B%201%2C%202%20%5D">Try this <strong>R.difference</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.difference</strong> source</summary>

```javascript
import { includes } from './includes'
import { uniq } from './uniq'

export function difference(a, b){
  if (arguments.length === 1) return _b => difference(a, _b)

  return uniq(a).filter(aInstance => !includes(aInstance, b))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { difference } from './difference'

test('difference', () => {
  const a = [ 1, 2, 3, 4 ]
  const b = [ 3, 4, 5, 6 ]
  expect(difference(a)(b)).toEqual([ 1, 2 ])

  expect(difference([], [])).toEqual([])
})

test('difference with objects', () => {
  const a = [ { id : 1 }, { id : 2 }, { id : 3 }, { id : 4 } ]
  const b = [ { id : 3 }, { id : 4 }, { id : 5 }, { id : 6 } ]
  expect(difference(a, b)).toEqual([ { id : 1 }, { id : 2 } ])
})

test('no duplicates in first list', () => {
  const M2 = [ 1, 2, 3, 4, 1, 2, 3, 4 ]
  const N2 = [ 3, 3, 4, 4, 5, 5, 6, 6 ]
  expect(difference(M2, N2)).toEqual([ 1, 2 ])
})

test('should use R.equals', () => {
  expect(difference([ NaN ], [ NaN ]).length).toEqual(0)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#difference)

### dissoc

It returns a new object that does not contain property `prop`.

```javascript
R.dissoc('b', {a: 1, b: 2, c: 3})
// => {a: 1, c: 3}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.dissoc('b'%2C%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D)%0A%2F%2F%20%3D%3E%20%7Ba%3A%201%2C%20c%3A%203%7D">Try this <strong>R.dissoc</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dissoc)

### divide

```javascript
R.divide(71, 100) // => 0.71
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.divide(71%2C%20100)%20%2F%2F%20%3D%3E%200.71">Try this <strong>R.divide</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#divide)

### drop

```typescript

drop<T>(howMany: number, input: T[]): T[]
```

It returns `howMany` items dropped from beginning of list or string `input`.

```javascript
R.drop(2, ['foo', 'bar', 'baz']) // => ['baz']
R.drop(2, 'foobar')  // => 'obar'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.drop(2%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'baz'%5D%0AR.drop(2%2C%20'foobar')%20%20%2F%2F%20%3D%3E%20'obar'">Try this <strong>R.drop</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.drop</strong> source</summary>

```javascript
export function drop(howManyToDrop, listOrString){
  if (arguments.length === 1) return _list => drop(howManyToDrop, _list)

  return listOrString.slice(howManyToDrop > 0 ? howManyToDrop : 0)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import assert from 'assert'

import { drop } from './drop'

test('with array', () => {
  expect(drop(2)([ 'foo', 'bar', 'baz' ])).toEqual([ 'baz' ])
  expect(drop(3, [ 'foo', 'bar', 'baz' ])).toEqual([])
  expect(drop(4, [ 'foo', 'bar', 'baz' ])).toEqual([])
})

test('with string', () => {
  expect(drop(3, 'rambda')).toEqual('bda')
})

test('with non-positive count', () => {
  expect(drop(0, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
  expect(drop(-1, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
  expect(drop(-Infinity, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
})

test('should return copy', () => {
  const xs = [ 1, 2, 3 ]

  assert.notStrictEqual(drop(0, xs), xs)
  assert.notStrictEqual(drop(-1, xs), xs)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#drop)

### dropLast

```typescript

dropLast<T>(howMany: number, input: T[]): T[]
```

It returns `howMany` items dropped from the end of list or string `input`.

```javascript
R.dropLast(2, ['foo', 'bar', 'baz']) // => ['foo']
R.dropLast(2, 'foobar')  // => 'foob'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.dropLast(2%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%5D%0AR.dropLast(2%2C%20'foobar')%20%20%2F%2F%20%3D%3E%20'foob'">Try this <strong>R.dropLast</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.dropLast</strong> source</summary>

```javascript
export function dropLast(howManyToDrop, listOrString){
  if (arguments.length === 1){
    return _listOrString => dropLast(howManyToDrop, _listOrString)
  }

  return howManyToDrop > 0 ?
    listOrString.slice(0, -howManyToDrop) :
    listOrString.slice()
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import assert from 'assert'

import { dropLast } from './dropLast'

test('with array', () => {
  expect(dropLast(2)([ 'foo', 'bar', 'baz' ])).toEqual([ 'foo' ])
  expect(dropLast(3, [ 'foo', 'bar', 'baz' ])).toEqual([])
  expect(dropLast(4, [ 'foo', 'bar', 'baz' ])).toEqual([])
})

test('with string', () => {
  expect(dropLast(3, 'rambda')).toEqual('ram')
})

test('with non-positive count', () => {
  expect(dropLast(0, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
  expect(dropLast(-1, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
  expect(dropLast(-Infinity, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
})

test('should return copy', () => {
  const xs = [ 1, 2, 3 ]

  assert.notStrictEqual(dropLast(0, xs), xs)
  assert.notStrictEqual(dropLast(-1, xs), xs)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dropLast)

### dropLastWhile

```javascript
const list = [1, 2, 3, 4, 5];
const predicate = x => x >= 3

const result = dropLastWhile(predicate, list);
// => [1, 2]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%3B%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3E%3D%203%0A%0Aconst%20result%20%3D%20dropLastWhile(predicate%2C%20list)%3B%0A%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try this <strong>R.dropLastWhile</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dropLastWhile)

### dropRepeats

```typescript

dropRepeats<T>(list: T[]): T[]
```

It removes any successive duplicates according to `R.equals`.

```javascript
const result = R.dropRepeats([
  1, 
  1, 
  {a: 1}, 
  {a:1}, 
  1
])
// => [1, {a: 1}, 1]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.dropRepeats(%5B%0A%20%201%2C%20%0A%20%201%2C%20%0A%20%20%7Ba%3A%201%7D%2C%20%0A%20%20%7Ba%3A1%7D%2C%20%0A%20%201%0A%5D)%0A%2F%2F%20%3D%3E%20%5B1%2C%20%7Ba%3A%201%7D%2C%201%5D">Try this <strong>R.dropRepeats</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.dropRepeats</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { equals } from './equals'

export function dropRepeats(list){
  if (!_isArray(list)){
    throw new Error(`${ list } is not a list`)
  }

  const toReturn = []

  list.reduce((prev, current) => {
    if (!equals(prev, current)){
      toReturn.push(current)
    }

    return current
  }, undefined)

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { dropRepeats as dropRepeatsRamda } from 'ramda'

import { compareCombinations } from './_internals/testUtils'
import { add } from './add'
import { dropRepeats } from './dropRepeats'

const list = [ 1, 2, 2, 2, 3, 4, 4, 5, 5, 3, 2, 2, { a : 1 }, { a : 1 } ]
const listClean = [ 1, 2, 3, 4, 5, 3, 2, { a : 1 } ]

test('happy', () => {
  const result = dropRepeats(list)
  expect(result).toEqual(listClean)
})

const possibleLists = [
  [ add(1), async () => {}, [ 1 ], [ 1 ], [ 2 ], [ 2 ] ],
  [ add(1), add(1), add(2) ],
  [],
  1,
  /foo/g,
  Promise.resolve(1),
]

describe('brute force', () => {
  compareCombinations({
    firstInput : possibleLists,
    callback   : errorsCounters => {
      expect(errorsCounters).toMatchInlineSnapshot(`
        Object {
          "ERRORS_MESSAGE_MISMATCH": 0,
          "ERRORS_TYPE_MISMATCH": 0,
          "RESULTS_MISMATCH": 1,
          "SHOULD_NOT_THROW": 3,
          "SHOULD_THROW": 0,
        }
      `)
    },
    fn      : dropRepeats,
    fnRamda : dropRepeatsRamda,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dropRepeats)

### dropRepeatsWith

```javascript
const list = [{a:1,b:2}, {a:1,b:3}, {a:2, b:4}]
const result = R.dropRepeatsWith(R.prop('a'))

// => [{a:1,b:2}, {a:2, b:4}]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%7Ba%3A1%2Cb%3A2%7D%2C%20%7Ba%3A1%2Cb%3A3%7D%2C%20%7Ba%3A2%2C%20b%3A4%7D%5D%0Aconst%20result%20%3D%20R.dropRepeatsWith(R.prop('a'))%0A%0A%2F%2F%20%3D%3E%20%5B%7Ba%3A1%2Cb%3A2%7D%2C%20%7Ba%3A2%2C%20b%3A4%7D%5D">Try this <strong>R.dropRepeatsWith</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dropRepeatsWith)

### dropWhile

```javascript
const list = [1, 2, 3, 4]
const predicate = x => x < 3
const result = R.dropWhile(predicate, list)
// => [3, 4]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3C%203%0Aconst%20result%20%3D%20R.dropWhile(predicate%2C%20list)%0A%2F%2F%20%3D%3E%20%5B3%2C%204%5D">Try this <strong>R.dropWhile</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#dropWhile)

### either

```typescript

either(firstPredicate: Pred, secondPredicate: Pred): Pred
```

It returns a new `predicate` function from `firstPredicate` and `secondPredicate` inputs.

This `predicate` function will return `true`, if any of the two input predicates return `true`.

```javascript
const firstPredicate = x => x > 10
const secondPredicate = x => x % 2 === 0
const predicate = R.either(firstPredicate, secondPredicate)

const result = [
  predicate(15),
  predicate(8),
  predicate(7),
]
// => [true, true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20firstPredicate%20%3D%20x%20%3D%3E%20x%20%3E%2010%0Aconst%20secondPredicate%20%3D%20x%20%3D%3E%20x%20%25%202%20%3D%3D%3D%200%0Aconst%20predicate%20%3D%20R.either(firstPredicate%2C%20secondPredicate)%0A%0Aconst%20result%20%3D%20%5B%0A%20%20predicate(15)%2C%0A%20%20predicate(8)%2C%0A%20%20predicate(7)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20true%2C%20false%5D">Try this <strong>R.either</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.either</strong> source</summary>

```javascript
export function either(firstPredicate, secondPredicate){
  if (arguments.length === 1){
    return _secondPredicate => either(firstPredicate, _secondPredicate)
  }

  return (...input) =>
    Boolean(firstPredicate(...input) || secondPredicate(...input))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { either } from './either'

test('with multiple inputs', () => {
  const between = function (
    a, b, c
  ){
    return a < b && b < c
  }
  const total20 = function (
    a, b, c
  ){
    return a + b + c === 20
  }
  const fn = either(between, total20)
  expect(fn(
    7, 8, 5
  )).toBeTrue()
})

test('skip evaluation of the second expression', () => {
  let effect = 'not evaluated'
  const F = function (){
    return true
  }
  const Z = function (){
    effect = 'Z got evaluated'
  }
  either(F, Z)()

  expect(effect).toBe('not evaluated')
})

test('case 1', () => {
  const firstFn = val => val > 0
  const secondFn = val => val * 5 > 10

  expect(either(firstFn, secondFn)(1)).toBeTrue()
})

test('case 2', () => {
  const firstFn = val => val > 0
  const secondFn = val => val === -10
  const fn = either(firstFn)(secondFn)

  expect(fn(-10)).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#either)

### endsWith

```typescript

endsWith(target: string, str: string): boolean
```

Curried version of `String.prototype.endsWith`

> :boom: It doesn't work with arrays unlike its corresponding **Ramda** method.

```javascript
const str = 'foo-bar'
const target = '-bar'

const result = R.endsWith(target, str)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20str%20%3D%20'foo-bar'%0Aconst%20target%20%3D%20'-bar'%0A%0Aconst%20result%20%3D%20R.endsWith(target%2C%20str)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.endsWith</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.endsWith</strong> source</summary>

```javascript
export function endsWith(target, str){
  if (arguments.length === 1) return _str => endsWith(target, _str)

  return str.endsWith(target)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { endsWith } from './endsWith'

test('happy', () => {
  expect(endsWith('bar', 'foo-bar')).toBeTrue()
  expect(endsWith('baz')('foo-bar')).toBeFalse()
})

test('does not work with arrays', () => {
  expect(() => endsWith([ 'c' ], [ 'a', 'b', 'c' ])).toThrowWithMessage(Error,
    'str.endsWith is not a function')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#endsWith)

### eqProps

It returns `true` if property `prop` in `obj1` is equal to property `prop` in `obj2` according to `R.equals`.

```javascript
const obj1 = {a: 1, b:2}
const obj2 = {a: 1, b:3}
const result = R.eqProps('a', obj1, obj2)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj1%20%3D%20%7Ba%3A%201%2C%20b%3A2%7D%0Aconst%20obj2%20%3D%20%7Ba%3A%201%2C%20b%3A3%7D%0Aconst%20result%20%3D%20R.eqProps('a'%2C%20obj1%2C%20obj2)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.eqProps</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#eqProps)

### equals

```typescript

equals<T>(x: T, y: T): boolean
```

It deeply compares `x` and `y` and returns `true` if they are equal.

> :boom: It doesn't handle cyclical data structures and functions

```javascript
R.equals(
  [1, {a:2}, [{b: 3}]],
  [1, {a:2}, [{b: 3}]]
) // => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.equals(%0A%20%20%5B1%2C%20%7Ba%3A2%7D%2C%20%5B%7Bb%3A%203%7D%5D%5D%2C%0A%20%20%5B1%2C%20%7Ba%3A2%7D%2C%20%5B%7Bb%3A%203%7D%5D%5D%0A)%20%2F%2F%20%3D%3E%20true">Try this <strong>R.equals</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.equals</strong> source</summary>

```javascript
import { type } from './type'

function parseError(maybeError){
  const typeofError = maybeError.__proto__.toString()
  if (![ 'Error', 'TypeError' ].includes(typeofError)) return []

  return [ typeofError, maybeError.message ]
}

function parseDate(maybeDate){
  if (!maybeDate.toDateString) return [ false ]

  return [ true, maybeDate.getTime() ]
}

function parseRegex(maybeRegex){
  if (maybeRegex.constructor !== RegExp) return [ false ]

  return [ true, maybeRegex.toString() ]
}

export function equals(a, b){
  if (arguments.length === 1) return _b => equals(a, _b)

  const aType = type(a)
  if (aType !== type(b)) return false
  if (aType === 'Function'){
    return a.name === undefined ? false : a.name === b.name
  }

  if ([ 'NaN', 'Undefined', 'Null' ].includes(aType)) return true

  if (aType === 'Number'){
    if (Object.is(-0, a) !== Object.is(-0, b)) return false

    return a.toString() === b.toString()
  }

  if ([ 'String', 'Boolean' ].includes(aType)){
    return a.toString() === b.toString()
  }

  if (aType === 'Array'){
    const aClone = Array.from(a)
    const bClone = Array.from(b)

    if (aClone.toString() !== bClone.toString()){
      return false
    }

    let loopArrayFlag = true
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag){
        if (
          aCloneInstance !== bClone[ aCloneIndex ] &&
          !equals(aCloneInstance, bClone[ aCloneIndex ])
        ){
          loopArrayFlag = false
        }
      }
    })

    return loopArrayFlag
  }

  const aRegex = parseRegex(a)
  const bRegex = parseRegex(b)

  if (aRegex[ 0 ]){
    return bRegex[ 0 ] ? aRegex[ 1 ] === bRegex[ 1 ] : false
  } else if (bRegex[ 0 ]) return false

  const aDate = parseDate(a)
  const bDate = parseDate(b)

  if (aDate[ 0 ]){
    return bDate[ 0 ] ? aDate[ 1 ] === bDate[ 1 ] : false
  } else if (bDate[ 0 ]) return false

  const aError = parseError(a)
  const bError = parseError(b)

  if (aError[ 0 ]){
    return bError[ 0 ] ?
      aError[ 0 ] === bError[ 0 ] && aError[ 1 ] === bError[ 1 ] :
      false
  }

  if (aType === 'Object'){
    const aKeys = Object.keys(a)

    if (aKeys.length !== Object.keys(b).length){
      return false
    }

    let loopObjectFlag = true
    aKeys.forEach(aKeyInstance => {
      if (loopObjectFlag){
        const aValue = a[ aKeyInstance ]
        const bValue = b[ aKeyInstance ]

        if (aValue !== bValue && !equals(aValue, bValue)){
          loopObjectFlag = false
        }
      }
    })

    return loopObjectFlag
  }

  return false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { equals } from './equals'

test('compare functions', () => {
  function foo(){}
  function bar(){}
  const baz = () => {}

  const expectTrue = equals(foo, foo)
  const expectFalseFirst = equals(foo, bar)
  const expectFalseSecond = equals(foo, baz)

  expect(expectTrue).toBeTrue()
  expect(expectFalseFirst).toBeFalse()
  expect(expectFalseSecond).toBeFalse()
})

test('with array of objects', () => {
  const list1 = [ { a : 1 }, [ { b : 2 } ] ]
  const list2 = [ { a : 1 }, [ { b : 2 } ] ]
  const list3 = [ { a : 1 }, [ { b : 3 } ] ]

  expect(equals(list1, list2)).toBeTrue()
  expect(equals(list1, list3)).toBeFalse()
})

test('with regex', () => {
  expect(equals(/s/, /s/)).toEqual(true)
  expect(equals(/s/, /d/)).toEqual(false)
  expect(equals(/a/gi, /a/gi)).toEqual(true)
  expect(equals(/a/gim, /a/gim)).toEqual(true)
  expect(equals(/a/gi, /a/i)).toEqual(false)
})

test('not a number', () => {
  expect(equals([ NaN ], [ NaN ])).toBeTrue()
})

test('new number', () => {
  expect(equals(new Number(0), new Number(0))).toEqual(true)
  expect(equals(new Number(0), new Number(1))).toEqual(false)
  expect(equals(new Number(1), new Number(0))).toEqual(false)
})

test('new string', () => {
  expect(equals(new String(''), new String(''))).toEqual(true)
  expect(equals(new String(''), new String('x'))).toEqual(false)
  expect(equals(new String('x'), new String(''))).toEqual(false)
  expect(equals(new String('foo'), new String('foo'))).toEqual(true)
  expect(equals(new String('foo'), new String('bar'))).toEqual(false)
  expect(equals(new String('bar'), new String('foo'))).toEqual(false)
})

test('new Boolean', () => {
  expect(equals(new Boolean(true), new Boolean(true))).toEqual(true)
  expect(equals(new Boolean(false), new Boolean(false))).toEqual(true)
  expect(equals(new Boolean(true), new Boolean(false))).toEqual(false)
  expect(equals(new Boolean(false), new Boolean(true))).toEqual(false)
})

test('new Error', () => {
  expect(equals(new Error('XXX'), {})).toEqual(false)
  expect(equals(new Error('XXX'), new TypeError('XXX'))).toEqual(false)
  expect(equals(new Error('XXX'), new Error('YYY'))).toEqual(false)
  expect(equals(new Error('XXX'), new Error('XXX'))).toEqual(true)
  expect(equals(new Error('XXX'), new TypeError('YYY'))).toEqual(false)
})

test('with dates', () => {
  expect(equals(new Date(0), new Date(0))).toEqual(true)
  expect(equals(new Date(1), new Date(1))).toEqual(true)
  expect(equals(new Date(0), new Date(1))).toEqual(false)
  expect(equals(new Date(1), new Date(0))).toEqual(false)
  expect(equals(new Date(0), {})).toEqual(false)
  expect(equals({}, new Date(0))).toEqual(false)
})

test('ramda spec', () => {
  expect(equals({}, {})).toEqual(true)

  expect(equals({
    a : 1,
    b : 2,
  },
  {
    a : 1,
    b : 2,
  })).toEqual(true)

  expect(equals({
    a : 2,
    b : 3,
  },
  {
    b : 3,
    a : 2,
  })).toEqual(true)

  expect(equals({
    a : 2,
    b : 3,
  },
  {
    a : 3,
    b : 3,
  })).toEqual(false)

  expect(equals({
    a : 2,
    b : 3,
    c : 1,
  },
  {
    a : 2,
    b : 3,
  })).toEqual(false)
})

test('works with boolean tuple', () => {
  expect(equals([ true, false ], [ true, false ])).toBeTrue()
  expect(equals([ true, false ], [ true, true ])).toBeFalse()
})

test('works with equal objects within array', () => {
  const objFirst = {
    a : {
      b : 1,
      c : 2,
      d : [ 1 ],
    },
  }
  const objSecond = {
    a : {
      b : 1,
      c : 2,
      d : [ 1 ],
    },
  }

  const x = [ 1, 2, objFirst, null, '', [] ]
  const y = [ 1, 2, objSecond, null, '', [] ]
  expect(equals(x, y)).toBeTrue()
})

test('works with different objects within array', () => {
  const objFirst = { a : { b : 1 } }
  const objSecond = { a : { b : 2 } }

  const x = [ 1, 2, objFirst, null, '', [] ]
  const y = [ 1, 2, objSecond, null, '', [] ]
  expect(equals(x, y)).toBeFalse()
})

test('works with undefined as second argument', () => {
  expect(equals(1, undefined)).toBeFalse()

  expect(equals(undefined, undefined)).toBeTrue()
})

test('various examples', () => {
  expect(equals([ 1, 2, 3 ])([ 1, 2, 3 ])).toBeTrue()

  expect(equals([ 1, 2, 3 ], [ 1, 2 ])).toBeFalse()

  expect(equals(1, 1)).toBeTrue()

  expect(equals(1, '1')).toBeFalse()

  expect(equals({}, {})).toBeTrue()

  expect(equals({
    a : 1,
    b : 2,
  },
  {
    b : 2,
    a : 1,
  })).toBeTrue()

  expect(equals({
    a : 1,
    b : 2,
  },
  {
    a : 1,
    b : 1,
  })).toBeFalse()

  expect(equals({
    a : 1,
    b : false,
  },
  {
    a : 1,
    b : 1,
  })).toBeFalse()

  expect(equals({
    a : 1,
    b : 2,
  },
  {
    b : 2,
    a : 1,
    c : 3,
  })).toBeFalse()

  expect(equals({
    x : {
      a : 1,
      b : 2,
    },
  },
  {
    x : {
      b : 2,
      a : 1,
      c : 3,
    },
  })).toBeFalse()

  expect(equals({
    a : 1,
    b : 2,
  },
  {
    b : 3,
    a : 1,
  })).toBeFalse()

  expect(equals({ a : { b : { c : 1 } } }, { a : { b : { c : 1 } } })).toBeTrue()

  expect(equals({ a : { b : { c : 1 } } }, { a : { b : { c : 2 } } })).toBeFalse()

  expect(equals({ a : {} }, { a : {} })).toBeTrue()

  expect(equals('', '')).toBeTrue()

  expect(equals('foo', 'foo')).toBeTrue()

  expect(equals('foo', 'bar')).toBeFalse()

  expect(equals(0, false)).toBeFalse()

  expect(equals(/\s/g, null)).toBeFalse()

  expect(equals(null, null)).toBeTrue()

  expect(equals(false)(null)).toBeFalse()
})

test('with custom functions', () => {
  function foo(){
    return 1
  }
  foo.prototype.toString = () => ''
  const result = equals(foo, foo)

  expect(result).toBeTrue()
})

test('with classes', () => {
  class Foo{}
  const foo = new Foo()
  const result = equals(foo, foo)

  expect(result).toBeTrue()
})

test('with negative zero', () => {
  expect(equals(-0, -0)).toBeTrue()
  expect(equals(-0, 0)).toBeFalse()
  expect(equals(0, 0)).toBeTrue()
  expect(equals(-0, 1)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#equals)

### evolve

```typescript

evolve<T, U>(rules: ((x: T) => U)[], list: T[]): U[]
```

It takes object or array of functions as set of rules. These `rules` are applied to the `iterable` input to produce the result.

> :boom: Error handling of this method differs between Ramda and Rambda. Ramda for some wrong inputs returns result and for other - it returns one of the inputs. Rambda simply throws when inputs are not correct. Full details for this mismatch are listed in `source/_snapshots/evolve.spec.js.snap` file.

```javascript
const rules = {
  foo : add(1),
  bar : add(-1),
}
const input = {
  a   : 1,
  foo : 2,
  bar : 3,
}
const result = evolve(rules, input)
const expected = {
  a   : 1,
  foo : 3,
  bar : 2,
})
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20rules%20%3D%20%7B%0A%20%20foo%20%3A%20add(1)%2C%0A%20%20bar%20%3A%20add(-1)%2C%0A%7D%0Aconst%20input%20%3D%20%7B%0A%20%20a%20%20%20%3A%201%2C%0A%20%20foo%20%3A%202%2C%0A%20%20bar%20%3A%203%2C%0A%7D%0Aconst%20result%20%3D%20evolve(rules%2C%20input)%0Aconst%20expected%20%3D%20%7B%0A%20%20a%20%20%20%3A%201%2C%0A%20%20foo%20%3A%203%2C%0A%20%20bar%20%3A%202%2C%0A%7D)%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.evolve</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.evolve</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { mapArray, mapObject } from './map'
import { type } from './type'

export function evolveArray(rules, list){
  return mapArray(
    (x, i) => {
      if (type(rules[ i ]) === 'Function'){
        return rules[ i ](x)
      }

      return x
    },
    list,
    true
  )
}

export function evolveObject(rules, iterable){
  return mapObject((x, prop) => {
    if (type(x) === 'Object'){
      const typeRule = type(rules[ prop ])
      if (typeRule === 'Function'){
        return rules[ prop ](x)
      }
      if (typeRule === 'Object'){
        return evolve(rules[ prop ], x)
      }

      return x
    }
    if (type(rules[ prop ]) === 'Function'){
      return rules[ prop ](x)
    }

    return x
  }, iterable)
}

export function evolve(rules, iterable){
  if (arguments.length === 1){
    return _iterable => evolve(rules, _iterable)
  }
  const rulesType = type(rules)
  const iterableType = type(iterable)

  if (iterableType !== rulesType){
    throw new Error('iterableType !== rulesType')
  }

  if (![ 'Object', 'Array' ].includes(rulesType)){
    throw new Error(`'iterable' and 'rules' are from wrong type ${ rulesType }`)
  }

  if (iterableType === 'Object'){
    return evolveObject(rules, iterable)
  }

  return evolveArray(rules, iterable)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { evolve as evolveRamda } from 'ramda'

import { add } from '../rambda'
import { compareCombinations, compareToRamda } from './_internals/testUtils'
import { evolve } from './evolve'

test('happy', () => {
  const rules = {
    foo    : add(1),
    nested : { bar : x => Object.keys(x).length },
  }
  const input = {
    a      : 1,
    foo    : 2,
    nested : { bar : { z : 3 } },
  }
  const result = evolve(rules, input)
  expect(result).toEqual({
    a      : 1,
    foo    : 3,
    nested : { bar : 1 },
  })
})

test('nested rule is wrong', () => {
  const rules = {
    foo    : add(1),
    nested : { bar : 10 },
  }
  const input = {
    a      : 1,
    foo    : 2,
    nested : { bar : { z : 3 } },
  }
  const result = evolve(rules)(input)
  expect(result).toEqual({
    a      : 1,
    foo    : 3,
    nested : { bar : { z : 3 } },
  })
})

test('is recursive', () => {
  const rules = {
    nested : {
      second : add(-1),
      third  : add(1),
    },
  }
  const object = {
    first  : 1,
    nested : {
      second : 2,
      third  : 3,
    },
  }
  const expected = {
    first  : 1,
    nested : {
      second : 1,
      third  : 4,
    },
  }
  const result = evolve(rules, object)
  expect(result).toEqual(expected)
})

test('ignores primitive values', () => {
  const rules = {
    n : 2,
    m : 'foo',
  }
  const object = {
    n : 0,
    m : 1,
  }
  const expected = {
    n : 0,
    m : 1,
  }
  const result = evolve(rules, object)
  expect(result).toEqual(expected)
})

test('with array', () => {
  const rules = [ add(1), add(-1) ]
  const list = [ 100, 1400 ]
  const expected = [ 101, 1399 ]
  const result = evolve(rules, list)
  expect(result).toEqual(expected)
})

const rulesObject = { a : add(1) }
const rulesList = [ add(1) ]
const possibleIterables = [ null, undefined, '', 42, [], [ 1 ], { a : 1 } ]
const possibleRules = [ ...possibleIterables, rulesList, rulesObject ]

describe('brute force', () => {
  compareCombinations({
    firstInput : possibleRules,
    callback   : errorsCounters => {
      expect(errorsCounters).toMatchInlineSnapshot(`
        Object {
          "ERRORS_MESSAGE_MISMATCH": 0,
          "ERRORS_TYPE_MISMATCH": 4,
          "RESULTS_MISMATCH": 0,
          "SHOULD_NOT_THROW": 51,
          "SHOULD_THROW": 0,
        }
      `)
    },
    secondInput : possibleIterables,
    fn          : evolve,
    fnRamda     : evolveRamda,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#evolve)

### excludes

```typescript

excludes(valueToFind: string, input: string[] | string): boolean
```

Opposite of `R.includes`

`R.equals` is used to determine equality.

```javascript
const result = [
  R.excludes('ar', 'foo'),
  R.excludes({a: 2}, [{a: 1}])
]
// => [true, true ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.excludes('ar'%2C%20'foo')%2C%0A%20%20R.excludes(%7Ba%3A%202%7D%2C%20%5B%7Ba%3A%201%7D%5D)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20true%20%5D">Try this <strong>R.excludes</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.excludes</strong> source</summary>

```javascript
import { includes } from './includes'

export function excludes(valueToFind, input){
  if (arguments.length === 1) return _input => excludes(valueToFind, _input)

  return includes(valueToFind, input) === false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { excludes } from './excludes'

test('excludes with string', () => {
  const str = 'more is less'

  expect(excludes('less')(str)).toBeFalse()
  expect(excludes('never', str)).toBeTrue()
})

test('excludes with array', () => {
  const arr = [ 1, 2, 3 ]

  expect(excludes(2)(arr)).toBeFalse()
  expect(excludes(4, arr)).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#excludes)

### F

```typescript

F(): boolean
```

```javascript
F() // => false
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20F()%20%2F%2F%20%3D%3E%20false">Try this <strong>R.F</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.F</strong> source</summary>

```javascript
export function F(){
  return false
}
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#F)

### filter

```typescript

filter<T>(predicate: Predicate<T>): (input: T[]) => T[]
```

It filters list or object `input` using a `predicate` function.

```javascript
const list = [3, 4, 3, 2]
const listPredicate = x => x > 2

const object = {abc: 'fo', xyz: 'bar', baz: 'foo'}
const objectPredicate = (x, prop) => x.length + prop.length > 5

const result = [
  R.filter(listPredicate, list),
  R.filter(objectPredicate, object)
]
// => [ [3, 4], { xyz: 'bar', baz: 'foo'} ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B3%2C%204%2C%203%2C%202%5D%0Aconst%20listPredicate%20%3D%20x%20%3D%3E%20x%20%3E%202%0A%0Aconst%20object%20%3D%20%7Babc%3A%20'fo'%2C%20xyz%3A%20'bar'%2C%20baz%3A%20'foo'%7D%0Aconst%20objectPredicate%20%3D%20(x%2C%20prop)%20%3D%3E%20x.length%20%2B%20prop.length%20%3E%205%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.filter(listPredicate%2C%20list)%2C%0A%20%20R.filter(objectPredicate%2C%20object)%0A%5D%0A%2F%2F%20%3D%3E%20%5B%20%5B3%2C%204%5D%2C%20%7B%20xyz%3A%20'bar'%2C%20baz%3A%20'foo'%7D%20%5D">Try this <strong>R.filter</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.filter</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function filterObject(predicate, obj){
  const willReturn = {}

  for (const prop in obj){
    if (predicate(obj[ prop ], prop, obj)){
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

export function filterArray(
  predicate, list, indexed = false
){
  let index = 0
  const len = list.length
  const willReturn = []

  while (index < len){
    const predicateResult = indexed ?
      predicate(list[ index ], index) :
      predicate(list[ index ])
    if (predicateResult){
      willReturn.push(list[ index ])
    }

    index++
  }

  return willReturn
}

export function filter(predicate, iterable){
  if (arguments.length === 1){
    return _iterable => filter(predicate, _iterable)
  }
  if (!iterable) return []
  if (_isArray(iterable)) return filterArray(predicate, iterable)

  return filterObject(predicate, iterable)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import Ramda from 'ramda'

import { F } from './F'
import { filter } from './filter'
import { T } from './T'

const sampleObject = {
  a : 1,
  b : 2,
  c : 3,
  d : 4,
}

test('happy', () => {
  const isEven = n => n % 2 === 0

  expect(filter(isEven, [ 1, 2, 3, 4 ])).toEqual([ 2, 4 ])
  expect(filter(isEven, {
    a : 1,
    b : 2,
    d : 3,
  })).toEqual({ b : 2 })
})

test('bad inputs difference between Ramda and Rambda', () => {
  expect(filter(T)(undefined)).toEqual([])
  expect(filter(F, null)).toEqual([])
  expect(() => Ramda.filter(T, null)).toThrowWithMessage(TypeError,
    'Cannot read property \'filter\' of null')
  expect(() => Ramda.filter(T, undefined)).toThrowWithMessage(TypeError,
    'Cannot read property \'filter\' of undefined')
})

test.only('predicate when input is object', () => {
  const obj = {
    a : 1,
    b : 2,
  }
  const predicate = (
    val, prop, inputObject
  ) => {
    expect(inputObject).toEqual(obj)
    expect(typeof prop).toEqual('string')

    return val < 2
  }
  expect(filter(predicate, obj)).toEqual({ a : 1 })
})

test('with object', () => {
  const isEven = n => n % 2 === 0
  const result = filter(isEven, sampleObject)
  const expectedResult = {
    b : 2,
    d : 4,
  }

  expect(result).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#filter)

### filterArray

```typescript

filterArray<T>(predicate: Predicate<T>): (input: T[]) => T[]
```

```javascript
const result = R.filterArray(
  x => x > 1,
  [1, 2, 3]
)
// => [1, 3]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.filterArray(%0A%20%20x%20%3D%3E%20x%20%3E%201%2C%0A%20%20%5B1%2C%202%2C%203%5D%0A)%0A%2F%2F%20%3D%3E%20%5B1%2C%203%5D">Try this <strong>R.filterArray</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#filterArray)

### filterAsync

```typescript

filterAsync<T>(fn: AsyncPredicate<T>, list: T[]): Promise<T[]>
```

Asynchronous version of `R.filter`

```javascript
const predicate = async x => {
  await R.delay(100)
  return x % 2 === 1
}
const result = await R.filterAsync(predicate, [ 1, 2, 3 ])
// => [ 1, 3 ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20predicate%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20%25%202%20%3D%3D%3D%201%0A%7D%0Aconst%20result%20%3D%20await%20R.filterAsync(predicate%2C%20%5B%201%2C%202%2C%203%20%5D)%0A%2F%2F%20%3D%3E%20%5B%201%2C%203%20%5D">Try this <strong>R.filterAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.filterAsync</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { filter } from './filter'
import { mapAsync } from './mapAsync'

export function filterAsyncFn(predicate, listOrObject){
  return new Promise((resolve, reject) => {
    mapAsync(predicate, listOrObject)
      .then(predicateResult => {
        if (_isArray(predicateResult)){
          const filtered = listOrObject.filter((_, i) => predicateResult[ i ])

          return resolve(filtered)
        }
        const filtered = filter((_, prop) => predicateResult[ prop ],
          listOrObject)

        return resolve(filtered)
      })
      .catch(reject)
  })
}

export function filterAsync(predicate, listOrObject){
  if (arguments.length === 1){
    return async _listOrObject => filterAsyncFn(predicate, _listOrObject)
  }

  return new Promise((resolve, reject) => {
    filterAsyncFn(predicate, listOrObject).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { filterAsync } from './filterAsync'

test('happy', async () => {
  const predicate = async (x, i) => {
    expect(i).toBeNumber()
    await delay(100)

    return x % 2 === 1
  }
  const result = await filterAsync(predicate)([ 1, 2, 3 ])
  expect(result).toEqual([ 1, 3 ])
})

test('with object', async () => {
  const predicate = async (x, prop) => {
    expect(prop).toBeString()
    await delay(100)

    return x % 2 === 1
  }
  const result = await filterAsync(predicate, {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
    e : 5,
  })

  expect(result).toEqual({
    a : 1,
    c : 3,
    e : 5,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#filterAsync)

### filterIndexed

Same as `R.filter`, but it passes index/property as second argument to the predicate, when looping over arrays/objects.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#filterIndexed)

### filterObject

```typescript

filterObject<T>(predicate: ObjectPredicate<T>): (x: Dictionary<T>) => Dictionary<T>
```

```javascript
const obj = {a: 1, b:2}
const result = R.filterObject(
  x => x > 1,
  obj
)
// => {b: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A2%7D%0Aconst%20result%20%3D%20R.filterObject(%0A%20%20x%20%3D%3E%20x%20%3E%201%2C%0A%20%20obj%0A)%0A%2F%2F%20%3D%3E%20%7Bb%3A%202%7D">Try this <strong>R.filterObject</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#filterObject)

### find

```typescript

find<T>(predicate: (x: T) => boolean, list: T[]): T | undefined
```

It returns the first element of `list` that satisfy the `predicate`.

If there is no such element, it returns `undefined`.

```javascript
const predicate = x => R.type(x.foo) === 'Number'
const list = [{foo: 'bar'}, {foo: 1}]

const result = R.find(predicate, list)
// => {foo: 1}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20predicate%20%3D%20x%20%3D%3E%20R.type(x.foo)%20%3D%3D%3D%20'Number'%0Aconst%20list%20%3D%20%5B%7Bfoo%3A%20'bar'%7D%2C%20%7Bfoo%3A%201%7D%5D%0A%0Aconst%20result%20%3D%20R.find(predicate%2C%20list)%0A%2F%2F%20%3D%3E%20%7Bfoo%3A%201%7D">Try this <strong>R.find</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.find</strong> source</summary>

```javascript
export function find(predicate, list){
  if (arguments.length === 1) return _list => find(predicate, _list)

  let index = 0
  const len = list.length

  while (index < len){
    const x = list[ index ]
    if (predicate(x)){
      return x
    }

    index++
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { find } from './find'
import { propEq } from './propEq'

const list = [ { a : 1 }, { a : 2 }, { a : 3 } ]

test('happy', () => {
  const fn = propEq('a', 2)
  expect(find(fn, list)).toEqual({ a : 2 })
})

test('with curry', () => {
  const fn = propEq('a', 4)
  expect(find(fn)(list)).toBeUndefined()
})

test('with empty list', () => {
  expect(find(() => true, [])).toBeUndefined()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#find)

### findIndex

```typescript

findIndex<T>(predicate: (x: T) => boolean, list: T[]): number
```

It returns the index of the first element of `list` satisfying the `predicate` function.

If there is no such element, then `-1` is returned.

```javascript
const predicate = x => R.type(x.foo) === 'Number'
const list = [{foo: 'bar'}, {foo: 1}]

const result = R.findIndex(predicate, list)
// => 1
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20predicate%20%3D%20x%20%3D%3E%20R.type(x.foo)%20%3D%3D%3D%20'Number'%0Aconst%20list%20%3D%20%5B%7Bfoo%3A%20'bar'%7D%2C%20%7Bfoo%3A%201%7D%5D%0A%0Aconst%20result%20%3D%20R.findIndex(predicate%2C%20list)%0A%2F%2F%20%3D%3E%201">Try this <strong>R.findIndex</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.findIndex</strong> source</summary>

```javascript
export function findIndex(predicate, list){
  if (arguments.length === 1) return _list => findIndex(predicate, _list)

  const len = list.length
  let index = -1

  while (++index < len){
    if (predicate(list[ index ])){
      return index
    }
  }

  return -1
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { findIndex } from './findIndex'
import { propEq } from './propEq'

const list = [ { a : 1 }, { a : 2 }, { a : 3 } ]

test('happy', () => {
  expect(findIndex(propEq('a', 2), list)).toEqual(1)

  expect(findIndex(propEq('a', 1))(list)).toEqual(0)

  expect(findIndex(propEq('a', 4))(list)).toEqual(-1)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#findIndex)

### findLast

```typescript

findLast<T>(fn: (x: T) => boolean, list: T[]): T | undefined
```

It returns the last element of `list` satisfying the `predicate` function.

If there is no such element, then `undefined` is returned.

```javascript
const predicate = x => R.type(x.foo) === 'Number'
const list = [{foo: 0}, {foo: 1}]

const result = R.findLast(predicate, list)
// => {foo: 1}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20predicate%20%3D%20x%20%3D%3E%20R.type(x.foo)%20%3D%3D%3D%20'Number'%0Aconst%20list%20%3D%20%5B%7Bfoo%3A%200%7D%2C%20%7Bfoo%3A%201%7D%5D%0A%0Aconst%20result%20%3D%20R.findLast(predicate%2C%20list)%0A%2F%2F%20%3D%3E%20%7Bfoo%3A%201%7D">Try this <strong>R.findLast</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.findLast</strong> source</summary>

```javascript
export function findLast(predicate, list){
  if (arguments.length === 1) return _list => findLast(predicate, _list)

  let index = list.length

  while (--index >= 0){
    if (predicate(list[ index ])){
      return list[ index ]
    }
  }

  return undefined
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { findLast } from './findLast'

test('happy', () => {
  const result = findLast(x => x > 1,
    [ 1, 1, 1, 2, 3, 4, 1 ])
  expect(result).toEqual(4)

  expect(findLast(x => x === 0, [ 0, 1, 1, 2, 3, 4, 1 ])).toEqual(0)
})

test('with curry', () => {
  expect(findLast(x => x > 1)([ 1, 1, 1, 2, 3, 4, 1 ])).toEqual(4)
})

const obj1 = { x : 100 }
const obj2 = { x : 200 }
const a = [ 11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0 ]
const even = function (x){
  return x % 2 === 0
}
const gt100 = function (x){
  return x > 100
}
const isStr = function (x){
  return typeof x === 'string'
}
const xGt100 = function (o){
  return o && o.x > 100
}

test('ramda 1', () => {
  expect(findLast(even, a)).toEqual(0)
  expect(findLast(gt100, a)).toEqual(300)
  expect(findLast(isStr, a)).toEqual('cow')
  expect(findLast(xGt100, a)).toEqual(obj2)
})

test('ramda 2', () => {
  expect(findLast(even, [ 'zing' ])).toEqual(undefined)
})

test('ramda 3', () => {
  expect(findLast(even, [ 2, 3, 5 ])).toEqual(2)
})

test('ramda 4', () => {
  expect(findLast(even, [])).toEqual(undefined)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#findLast)

### findLastIndex

```typescript

findLastIndex<T>(predicate: (x: T) => boolean, list: T[]): number
```

It returns the index of the last element of `list` satisfying the `predicate` function.

If there is no such element, then `-1` is returned.

```javascript
const predicate = x => R.type(x.foo) === 'Number'
const list = [{foo: 0}, {foo: 1}]

const result = R.findLastIndex(predicate, list)
// => 1
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20predicate%20%3D%20x%20%3D%3E%20R.type(x.foo)%20%3D%3D%3D%20'Number'%0Aconst%20list%20%3D%20%5B%7Bfoo%3A%200%7D%2C%20%7Bfoo%3A%201%7D%5D%0A%0Aconst%20result%20%3D%20R.findLastIndex(predicate%2C%20list)%0A%2F%2F%20%3D%3E%201">Try this <strong>R.findLastIndex</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.findLastIndex</strong> source</summary>

```javascript
export function findLastIndex(fn, list){
  if (arguments.length === 1) return _list => findLastIndex(fn, _list)

  let index = list.length

  while (--index >= 0){
    if (fn(list[ index ])){
      return index
    }
  }

  return -1
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { findLastIndex } from './findLastIndex'

test('happy', () => {
  const result = findLastIndex(x => x > 1,
    [ 1, 1, 1, 2, 3, 4, 1 ])

  expect(result).toEqual(5)

  expect(findLastIndex(x => x === 0, [ 0, 1, 1, 2, 3, 4, 1 ])).toEqual(0)
})

test('with curry', () => {
  expect(findLastIndex(x => x > 1)([ 1, 1, 1, 2, 3, 4, 1 ])).toEqual(5)
})

const obj1 = { x : 100 }
const obj2 = { x : 200 }
const a = [ 11, 10, 9, 'cow', obj1, 8, 7, 100, 200, 300, obj2, 4, 3, 2, 1, 0 ]
const even = function (x){
  return x % 2 === 0
}
const gt100 = function (x){
  return x > 100
}
const isStr = function (x){
  return typeof x === 'string'
}
const xGt100 = function (o){
  return o && o.x > 100
}

test('ramda 1', () => {
  expect(findLastIndex(even, a)).toEqual(15)
  expect(findLastIndex(gt100, a)).toEqual(9)
  expect(findLastIndex(isStr, a)).toEqual(3)
  expect(findLastIndex(xGt100, a)).toEqual(10)
})

test('ramda 2', () => {
  expect(findLastIndex(even, [ 'zing' ])).toEqual(-1)
})

test('ramda 3', () => {
  expect(findLastIndex(even, [ 2, 3, 5 ])).toEqual(0)
})

test('ramda 4', () => {
  expect(findLastIndex(even, [])).toEqual(-1)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#findLastIndex)

### flatten

```typescript

flatten<T>(list: any[]): T[]
```

It deeply flattens an array.

```javascript
const result = R.flatten([
  1, 
  2, 
  [3, 30, [300]], 
  [4]
])
// => [ 1, 2, 3, 30, 300, 4 ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.flatten(%5B%0A%20%201%2C%20%0A%20%202%2C%20%0A%20%20%5B3%2C%2030%2C%20%5B300%5D%5D%2C%20%0A%20%20%5B4%5D%0A%5D)%0A%2F%2F%20%3D%3E%20%5B%201%2C%202%2C%203%2C%2030%2C%20300%2C%204%20%5D">Try this <strong>R.flatten</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.flatten</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function flatten(list, input){
  const willReturn = input === undefined ? [] : input

  for (let i = 0; i < list.length; i++){
    if (_isArray(list[ i ])){
      flatten(list[ i ], willReturn)
    } else {
      willReturn.push(list[ i ])
    }
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { flatten } from './flatten'

test('happy', () => {
  expect(flatten([ 1, 2, 3, [ [ [ [ [ 4 ] ] ] ] ] ])).toEqual([ 1, 2, 3, 4 ])

  expect(flatten([ 1, [ 2, [ [ 3 ] ] ], [ 4 ] ])).toEqual([ 1, 2, 3, 4 ])

  expect(flatten([ 1, [ 2, [ [ [ 3 ] ] ] ], [ 4 ] ])).toEqual([ 1, 2, 3, 4 ])

  expect(flatten([ 1, 2, [ 3, 4 ], 5, [ 6, [ 7, 8, [ 9, [ 10, 11 ], 12 ] ] ] ])).toEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ])
})

test('readme example', () => {
  const result = flatten([ 1, 2, [ 3, 30, [ 300 ] ], [ 4 ] ])
  expect(result).toEqual([ 1, 2, 3, 30, 300, 4 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#flatten)

### flip

It returns function which calls `fn` with exchanged first and second argument.

> :boom: Rambda's **flip** will throw if the arity of the input function is greater or equal to 5.

```javascript
const subtractFlip = R.flip(R.subtract)

const result = [
  subtractFlip(1,7),
  R.subtract(1, 6)
]  
// => [6, -6]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20subtractFlip%20%3D%20R.flip(R.subtract)%0A%0Aconst%20result%20%3D%20%5B%0A%20%20subtractFlip(1%2C7)%2C%0A%20%20R.subtract(1%2C%206)%0A%5D%20%20%0A%2F%2F%20%3D%3E%20%5B6%2C%20-6%5D">Try this <strong>R.flip</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#flip)

### forEach

```typescript

forEach<T>(fn: Iterator<T, void>, list: T[]): T[]
```

It applies `iterable` function over all members of `list` and returns `list`.

> :boom: It works with objects, unlike `Ramda`.

```javascript
const sideEffect = {}
const result = R.forEach(
  x => sideEffect[`foo${x}`] = x
)([1, 2])

sideEffect // => {foo1: 1, foo2: 2}
result // => [1, 2]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20sideEffect%20%3D%20%7B%7D%0Aconst%20result%20%3D%20R.forEach(%0A%20%20x%20%3D%3E%20sideEffect%5B%60foo%24%7Bx%7D%60%5D%20%3D%20x%0A)(%5B1%2C%202%5D)%0A%0AsideEffect%20%2F%2F%20%3D%3E%20%7Bfoo1%3A%201%2C%20foo2%3A%202%7D%0Aresult%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try this <strong>R.forEach</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.forEach</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { _keys } from './_internals/_keys'

export function forEach(fn, list){
  if (arguments.length === 1) return _list => forEach(fn, _list)

  if (list === undefined){
    return
  }

  if (_isArray(list)){
    let index = 0
    const len = list.length

    while (index < len){
      fn(list[ index ])
      index++
    }
  } else {
    let index = 0
    const keys = _keys(list)
    const len = keys.length

    while (index < len){
      const key = keys[ index ]
      fn(
        list[ key ], key, list
      )
      index++
    }
  }

  return list
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { forEach } from './forEach'
import { type } from './type'

test('happy', () => {
  const sideEffect = {}
  forEach(x => sideEffect[ `foo${ x }` ] = x + 10)([ 1, 2 ])

  expect(sideEffect).toEqual({
    foo1 : 11,
    foo2 : 12,
  })
})

test('iterate over object', () => {
  const obj = {
    a : 1,
    b : [ 1, 2 ],
    c : { d : 7 },
    f : 'foo',
  }
  const result = {}
  const returned = forEach((
    val, prop, inputObj
  ) => {
    expect(type(inputObj)).toBe('Object')
    result[ prop ] = `${ prop }-${ type(val) }`
  })(obj)

  const expected = {
    a : 'a-Number',
    b : 'b-Array',
    c : 'c-Object',
    f : 'f-String',
  }

  expect(result).toEqual(expected)
  expect(returned).toEqual(obj)
})

test('with empty list', () => {
  const list = []
  const result = forEach(x => x * x)(list)

  expect(result).toEqual(list)
})

test('with wrong input', () => {
  const list = undefined
  const result = forEach(x => x * x)(list)

  expect(result).toBeUndefined()
})

test('returns the input', () => {
  const list = [ 1, 2, 3 ]
  const result = forEach(x => x * x)(list)

  expect(result).toEqual(list)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#forEach)

### forEachIndexed

```typescript

forEachIndexed<T>(fn: IndexedIterator<T, void>, list: T[]): T[]
```

<details>

<summary><strong>R.forEachIndexed</strong> source</summary>

```javascript
import { mapIndexed } from './mapIndexed'

export function forEachIndexed(fn, iterable){
  if (arguments.length === 1){
    return _iterable => forEachIndexed(fn, _iterable)
  }

  mapIndexed(fn, iterable)

  return iterable
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { forEachIndexed } from './forEachIndexed'

const list = [ 1, 2, 3 ]
const iterator = (x, i) => {
  expect(x).toBeNumber()
  expect(i).toBeNumber()
}

test('happy', () => {
  const result = forEachIndexed(iterator, list)

  expect(result).toEqual(list)
})

test('curried', () => {
  const result = forEachIndexed(iterator)(list)

  expect(result).toEqual(list)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#forEachIndexed)

### fromPairs

It transforms a `listOfPairs` to an object.

```javascript
const listOfPairs = [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', [ 3, 4 ] ] ]
const expected = {
  a : 1,
  b : 2,
  c : [ 3, 4 ],
}

const result = R.fromPairs(listOfPairs)
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20listOfPairs%20%3D%20%5B%20%5B%20'a'%2C%201%20%5D%2C%20%5B%20'b'%2C%202%20%5D%2C%20%5B%20'c'%2C%20%5B%203%2C%204%20%5D%20%5D%20%5D%0Aconst%20expected%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%202%2C%0A%20%20c%20%3A%20%5B%203%2C%204%20%5D%2C%0A%7D%0A%0Aconst%20result%20%3D%20R.fromPairs(listOfPairs)%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.fromPairs</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#fromPairs)

### getter

```typescript

getter<T>(keyOrKeys: string | string[] | undefined): T
```

The set of methods `R.setter`, `R.getter` and `R.reset` allow different parts of your logic to access comminicate indirectly via shared cache object. 

Usually these methods show that you might need to refactor to classes. Still, they can be helpful meanwhile.

`R.getter`: It provides access to the cache object. If `undefined` is used as a key, this method will return the whole cache object. If `string` is passed, then it will return cache value for this key. If array of `string` is passed, then it assume that this is array of keys and it will return the corresponding cache values for these keys.

`R.setter`: It allows cache object's keys to be changed. You can either set individual key-value pairs with `R.setter(key, value)` or you pass directly object, which will be merged with the cache object.

`R.reset`: It resets the cache object.

```javascript
R.setter('foo','bar')
R.setter('a', 1)
R.getter(['foo','a']) // => {foo: 'bar', a: 1}

R.setter('a', 2)
R.getter('a') // => 2
R.reset()
R.getter('a') // => undefined
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.setter('foo'%2C'bar')%0AR.setter('a'%2C%201)%0AR.getter(%5B'foo'%2C'a'%5D)%20%2F%2F%20%3D%3E%20%7Bfoo%3A%20'bar'%2C%20a%3A%201%7D%0A%0AR.setter('a'%2C%202)%0AR.getter('a')%20%2F%2F%20%3D%3E%202%0AR.reset()%0AR.getter('a')%20%2F%2F%20%3D%3E%20undefined">Try this <strong>R.getter</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.getter</strong> source</summary>

```javascript
import { merge } from './merge'
import { pick } from './pick'
import { type } from './type'

let holder = {}

/**
 * Pass string to get value
 * Pass array to get object of values
 * Pass undefined to get all data
 */
export function getter(key){
  const typeKey = type(key)

  if (typeKey === 'String') return holder[ key ]

  if (typeKey === 'Array') return pick(key, holder)

  return holder
}

export function setter(maybeKey, maybeValue){
  const typeKey = type(maybeKey)
  const typeValue = type(maybeValue)

  if (typeKey === 'String'){
    if (typeValue === 'Function'){
      return holder[ maybeKey ] = maybeValue(holder[ maybeKey ])
    }

    return holder[ maybeKey ] = maybeValue
  }

  if (typeKey !== 'Object') return

  holder = merge(holder, maybeKey)
}

export function reset(){
  holder = {}
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { getter, reset, setter } from './getter'

afterEach(() => {
  reset()
})

test('happy', () => {
  const key = 'foo'
  setter(key, 1)

  expect(getter(key)).toBe(1)
})

test('docs example', () => {
  setter('foo', 'bar')
  setter('a', 1)
  expect(getter([ 'foo', 'a' ])).toEqual({
    foo : 'bar',
    a   : 1,
  })

  setter('a', 2)
  expect(getter('a')).toBe(2)
  reset()
  expect(getter('a')).toBeUndefined()
})

test('when array is key in getter', () => {
  setter({
    a : 1,
    b : 2,
    c : 3,
  })

  expect(getter([ 'a', 'b' ])).toEqual({
    a : 1,
    b : 2,
  })
})

test('getter with undefined as key returns all', () => {
  const data = {
    a : 1,
    b : 2,
    c : 3,
  }

  setter(data)

  expect(getter()).toEqual(data)
})

test('function as setter value', () => {
  const data = {
    a : 1,
    b : 2,
    c : 3,
  }

  setter(data)
  setter('a', add(10))

  expect(getter()).toEqual({
    a : 11,
    b : 2,
    c : 3,
  })
})

test('setter fallbacks to undefined', () => {
  expect(setter()).toBeUndefined
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#getter)

### glue

```typescript

glue(input: string, glueString?: string): string
```

It transforms multiline string to single line by gluing together the separate lines with the `glueString` and removing the empty spaces. By default `glueString` is equal to single space, so if that is what you need, then you can just pass a single argument.

```javascript
const result = R.glue(`
  foo
  bar
  baz
`)
// => 'foo bar baz'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.glue(%60%0A%20%20foo%0A%20%20bar%0A%20%20baz%0A%60)%0A%2F%2F%20%3D%3E%20'foo%20bar%20baz'">Try this <strong>R.glue</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.glue</strong> source</summary>

```javascript
export function glue(input, glueChar){
  return input
    .split('\n')
    .filter(x => x.trim().length > 0)
    .map(x => x.trim())
    .join(glueChar === undefined ? ' ' : glueChar)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { glue } from './glue'

test('empty string as a glue', () => {
  const result = glue(`
    foo
    bar
    baz
  `,
  '')

  const expectedResult = 'foobarbaz'

  expect(result).toBe(expectedResult)
})

test('case 0', () => {
  const zero = 'node node_modules/jest'
  const first = '--runInBand'
  const last = '-- src/a.spec.js'
  const flag = false
  const result = glue(`
    ${ zero }
    ${ first }
    ${ flag ? '--env=node' : '' }
    ${ last }
  `)

  const expectedResult = `${ zero } ${ first } ${ last }`

  expect(result).toBe(expectedResult)
})

test('case 1', () => {
  const zero = 'node node_modules/jest'
  const first = '--runInBand'
  const last = '-- src/a.spec.js'
  const flag = true
  const result = glue(`
    ${ zero }
    ${ first }
    ${ flag ? '--env=node' : '' }
    ${ last }
  `)

  const expectedResult = `${ zero } ${ first } --env=node ${ last }`

  expect(result).toBe(expectedResult)
})

test('case 2', () => {
  const first = '--runInBand'
  const result = glue(`
    zero
    ${ first }
    last
  `)
  const expectedResult = `zero ${ first } last`

  expect(result).toBe(expectedResult)
})

test('case 3', () => {
  const result = glue(`
    foo
    bar
    baz
  `)

  const expectedResult = 'foo bar baz'

  expect(result).toBe(expectedResult)
})

test('with glue', () => {
  const result = glue(`
    foo
    bar
    baz
  `,
  '==')

  const expectedResult = 'foo==bar==baz'

  expect(result).toBe(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#glue)

### groupBy

It splits `list` according to a provided `groupFn` function and returns an object.

```javascript
const list = [ 'a', 'b', 'aa', 'bb' ]
const groupFn = x => x.length

const result = R.groupBy(groupFn, list)
// => { '1': ['a', 'b'], '2': ['aa', 'bb'] }
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%20'a'%2C%20'b'%2C%20'aa'%2C%20'bb'%20%5D%0Aconst%20groupFn%20%3D%20x%20%3D%3E%20x.length%0A%0Aconst%20result%20%3D%20R.groupBy(groupFn%2C%20list)%0A%2F%2F%20%3D%3E%20%7B%20'1'%3A%20%5B'a'%2C%20'b'%5D%2C%20'2'%3A%20%5B'aa'%2C%20'bb'%5D%20%7D">Try this <strong>R.groupBy</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#groupBy)

### groupWith

```typescript

groupWith<T>(compareFn: (x: T, y: T) => boolean): (input: T[]) => (T[])[]
```

It returns separated version of list or string `input`, where separation is done with equality `compareFn` function.

```javascript
const compareFn = (x, y) => x === y
const list = [1, 2, 2, 1, 1, 2]

const result = R.groupWith(isConsecutive, list)
// => [[1], [2,2], [1,1], [2]]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20compareFn%20%3D%20(x%2C%20y)%20%3D%3E%20x%20%3D%3D%3D%20y%0Aconst%20list%20%3D%20%5B1%2C%202%2C%202%2C%201%2C%201%2C%202%5D%0A%0Aconst%20result%20%3D%20R.groupWith(isConsecutive%2C%20list)%0A%2F%2F%20%3D%3E%20%5B%5B1%5D%2C%20%5B2%2C2%5D%2C%20%5B1%2C1%5D%2C%20%5B2%5D%5D">Try this <strong>R.groupWith</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.groupWith</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function groupWith(compareFn, list){
  if (!_isArray(list)) throw new TypeError('list.reduce is not a function')

  const clone = list.slice()

  if (list.length === 1) return [ clone ]

  const toReturn = []
  let holder = []

  clone.reduce((
    prev, current, i
  ) => {
    if (i === 0) return current

    const okCompare = compareFn(prev, current)
    const holderIsEmpty = holder.length === 0
    const lastCall = i === list.length - 1

    if (okCompare){
      if (holderIsEmpty) holder.push(prev)
      holder.push(current)
      if (lastCall) toReturn.push(holder)

      return current
    }

    if (holderIsEmpty){
      toReturn.push([ prev ])
      if (lastCall) toReturn.push([ current ])

      return current
    }

    toReturn.push(holder)
    if (lastCall) toReturn.push([ current ])
    holder = []

    return current
  }, undefined)

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { equals } from './equals'
import { groupWith } from './groupWith'

test('issue is fixed', () => {
  const result = groupWith(equals, [ 1, 2, 2, 3 ])
  const expected = [ [ 1 ], [ 2, 2 ], [ 3 ] ]
  expect(result).toEqual(expected)
})

test('long list', () => {
  const result = groupWith(equals, [
    0,
    1,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    21,
    21,
    1,
    2,
  ])

  const expected = [
    [ 0 ],
    [ 1, 1 ],
    [ 2 ],
    [ 3 ],
    [ 5 ],
    [ 8 ],
    [ 13 ],
    [ 21, 21, 21 ],
    [ 1 ],
    [ 2 ],
  ]
  expect(result).toEqual(expected)
})

test('readme example', () => {
  const list = [ 4, 3, 6, 2, 2, 1 ]

  const result = groupWith((a, b) => a - b === 1, list)
  const expected = [ [ 4, 3 ], [ 6 ], [ 2 ], [ 2, 1 ] ]
  expect(result).toEqual(expected)
})

test('throw with string as input', () => {
  expect(() => groupWith(equals, 'Mississippi')).toThrowWithMessage(TypeError,
    'list.reduce is not a function')
})

const isConsecutive = function (a, b){
  return a + 1 === b
}

test('fix coverage', () => {
  expect(groupWith(isConsecutive, [ 1, 2, 3, 0 ])).toEqual([ [ 1, 2, 3 ], [ 0 ] ])
})

test('from ramda 0', () => {
  expect(groupWith(equals, [])).toEqual([])
  expect(groupWith(isConsecutive, [])).toEqual([])
})

test('from ramda 1', () => {
  expect(groupWith(isConsecutive, [ 4, 3, 2, 1 ])).toEqual([
    [ 4 ],
    [ 3 ],
    [ 2 ],
    [ 1 ],
  ])
})

test('from ramda 2', () => {
  expect(groupWith(isConsecutive, [ 1, 2, 3, 4 ])).toEqual([ [ 1, 2, 3, 4 ] ])
})

test('from ramda 3', () => {
  expect(groupWith(isConsecutive, [ 1, 2, 2, 3 ])).toEqual([
    [ 1, 2 ],
    [ 2, 3 ],
  ])
  expect(groupWith(isConsecutive, [ 1, 2, 9, 3, 4 ])).toEqual([
    [ 1, 2 ],
    [ 9 ],
    [ 3, 4 ],
  ])
})

test('list with single item', () => {
  const result = groupWith(equals, [ 0 ])

  const expected = [ [ 0 ] ]
  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#groupWith)

### has

```typescript

has<T>(prop: string, obj: T): boolean
```

It returns `true` if `obj` has property `prop`.

```javascript
const obj = {a: 1}

const result = [
  R.has('a', obj),
  R.has('b', obj)
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%201%7D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.has('a'%2C%20obj)%2C%0A%20%20R.has('b'%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.has</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.has</strong> source</summary>

```javascript
export function has(prop, obj) {
  if (arguments.length === 1) return _obj => has(prop, _obj)

  if (!obj) return false

  return obj.hasOwnProperty(prop)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { has } from './has'

test('happy', () => {
  expect(has('a')({ a : 1 })).toBeTrue()
  expect(has('b', { a : 1 })).toBeFalse()
})

test('with non-object', () => {
  expect(has('a', undefined)).toEqual(false)
  expect(has('a', null)).toEqual(false)
  expect(has('a', true)).toEqual(false)
  expect(has('a', '')).toEqual(false)
  expect(has('a', /a/)).toEqual(false)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#has)

### hasPath

```typescript

hasPath<T>(
  path: string | string[],
  input: object
): boolean
```

It will return true, if `input` object has truthy `path`(calculated with `R.path`).

```javascript
const path = 'a.b'
const pathAsArray = ['a', 'b']
const obj = {a: {b: []}}

const result = [
  R.hasPath(path, obj),
  R.hasPath(pathAsArray, obj),
  R.hasPath('a.c', obj),
]
// => [true, true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20path%20%3D%20'a.b'%0Aconst%20pathAsArray%20%3D%20%5B'a'%2C%20'b'%5D%0Aconst%20obj%20%3D%20%7Ba%3A%20%7Bb%3A%20%5B%5D%7D%7D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.hasPath(path%2C%20obj)%2C%0A%20%20R.hasPath(pathAsArray%2C%20obj)%2C%0A%20%20R.hasPath('a.c'%2C%20obj)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20true%2C%20false%5D">Try this <strong>R.hasPath</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.hasPath</strong> source</summary>

```javascript
import { path } from './path'

export function hasPath(maybePath, obj){
  if (arguments.length === 1){
    return objHolder => hasPath(maybePath, objHolder)
  }

  return path(maybePath, obj) !== undefined
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { hasPath } from './hasPath'

test('when true', () => {
  const path = 'a.b'
  const obj = { a : { b : [] } }

  const result = hasPath(path)(obj)
  const expectedResult = true

  expect(result).toEqual(expectedResult)
})

test('when false', () => {
  const path = 'a.b'
  const obj = {}

  const result = hasPath(path, obj)
  const expectedResult = false

  expect(result).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#hasPath)

### head

```typescript

head<T>(input: T[]): T | undefined
```

It returns the first element of list or string `input`.

```javascript
const result = [
  R.head([1, 2, 3]),
  R.head('foo') 
]
// => [1, 'f']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.head(%5B1%2C%202%2C%203%5D)%2C%0A%20%20R.head('foo')%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B1%2C%20'f'%5D">Try this <strong>R.head</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.head</strong> source</summary>

```javascript
export function head(listOrString){
  if (typeof listOrString === 'string') return listOrString[ 0 ] || ''

  return listOrString[ 0 ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { head } from './head'

test('head', () => {
  expect(head([ 'fi', 'fo', 'fum' ])).toEqual('fi')
  expect(head([])).toEqual(undefined)
  expect(head('foo')).toEqual('f')
  expect(head('')).toEqual('')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#head)

### identical

It returns `true` if its arguments `a` and `b` are identical.

Otherwise, it returns `false`.

> :boom: Values are identical if they reference the same memory. `NaN` is identical to `NaN`; `0` and `-0` are not identical.

```javascript
const obj = {a: 1};
R.identical(obj, obj); // => true
R.identical(1, 1); // => true
R.identical(1, '1'); // => false
R.identical([], []); // => false
R.identical(0, -0); // => false
R.identical(NaN, NaN); // => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20obj%20%3D%20%7Ba%3A%201%7D%3B%0AR.identical(obj%2C%20obj)%3B%20%2F%2F%20%3D%3E%20true%0AR.identical(1%2C%201)%3B%20%2F%2F%20%3D%3E%20true%0AR.identical(1%2C%20'1')%3B%20%2F%2F%20%3D%3E%20false%0AR.identical(%5B%5D%2C%20%5B%5D)%3B%20%2F%2F%20%3D%3E%20false%0AR.identical(0%2C%20-0)%3B%20%2F%2F%20%3D%3E%20false%0AR.identical(NaN%2C%20NaN)%3B%20%2F%2F%20%3D%3E%20true">Try this <strong>R.identical</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#identical)

### identity

```typescript

identity<T>(input: T): T
```

It just passes back the supplied `input` argument.

> :boom: Logic

```javascript
R.identity(7) // => 7
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.identity(7)%20%2F%2F%20%3D%3E%207">Try this <strong>R.identity</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.identity</strong> source</summary>

```javascript
export function identity(input){
  return input
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { identity } from './identity'

test('happy', () => {
  expect(identity(7)).toEqual(7)
  expect(identity(true)).toEqual(true)
  expect(identity({ a : 1 })).toEqual({ a : 1 })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#identity)

### ifElse

```typescript

ifElse<T, U>(
  condition: (x: T) => boolean, 
  onTrue: (x: T) => U, 
  onFalse: (x: T) => U, 
): (x: T) => U
```

It expects `condition`, `onTrue` and `onFalse` functions as inputs and it returns a new function with example name of `fn`. 

When `fn`` is called with `input` argument, it will return either `onTrue(input)` or `onFalse(input)` depending on `condition(input)` evaluation.

```javascript
const fn = R.ifElse(
 x => x>10,
 x => x*2,
 x => x*10
)

const result = [ fn(8), fn(18) ]
// => [80, 36]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20R.ifElse(%0A%20x%20%3D%3E%20x%3E10%2C%0A%20x%20%3D%3E%20x*2%2C%0A%20x%20%3D%3E%20x*10%0A)%0A%0Aconst%20result%20%3D%20%5B%20fn(8)%2C%20fn(18)%20%5D%0A%2F%2F%20%3D%3E%20%5B80%2C%2036%5D">Try this <strong>R.ifElse</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.ifElse</strong> source</summary>

```javascript
import { curry } from './curry'

function ifElseFn(
  condition, onTrue, onFalse
){
  return (...input) => {
    const conditionResult =
      typeof condition === 'boolean' ? condition : condition(...input)

    if (conditionResult === true){
      return onTrue(...input)
    }

    return onFalse(...input)
  }
}

export const ifElse = curry(ifElseFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { always } from './always'
import { has } from './has'
import { identity } from './identity'
import { ifElse } from './ifElse'
import { prop } from './prop'

const condition = has('foo')
const v = function (a){
  return typeof a === 'number'
}
const t = function (a){
  return a + 1
}
const ifFn = x => prop('foo', x).length
const elseFn = () => false

test('happy', () => {
  const fn = ifElse(condition, ifFn)(elseFn)

  expect(fn({ foo : 'bar' })).toEqual(3)
  expect(fn({ fo : 'bar' })).toEqual(false)
})

test('ramda spec', () => {
  const ifIsNumber = ifElse(v)
  expect(ifIsNumber(t, identity)(15)).toEqual(16)
  expect(ifIsNumber(t, identity)('hello')).toEqual('hello')
})

test('pass all arguments', () => {
  const identity = function (a){
    return a
  }
  const v = function (){
    return true
  }
  const onTrue = function (a, b){
    expect(a).toEqual(123)
    expect(b).toEqual('abc')
  }
  ifElse(
    v, onTrue, identity
  )(123, 'abc')
})

test('accept constant as condition', () => {
  const fn = ifElse(true)(always(true))(always(false))

  expect(fn()).toEqual(true)
})

test('accept constant as condition - case 2', () => {
  const fn = ifElse(
    false, always(true), always(false)
  )

  expect(fn()).toEqual(false)
})

test('curry 1', () => {
  const fn = ifElse(condition, ifFn)(elseFn)

  expect(fn({ foo : 'bar' })).toEqual(3)
  expect(fn({ fo : 'bar' })).toEqual(false)
})

test('curry 2', () => {
  const fn = ifElse(condition)(ifFn)(elseFn)

  expect(fn({ foo : 'bar' })).toEqual(3)
  expect(fn({ fo : 'bar' })).toEqual(false)
})

test('simple arity of 1', () => {
  const condition = x => x > 5
  const onTrue = x => x + 1
  const onFalse = x => x + 10
  const result = ifElse(
    condition, onTrue, onFalse
  )(1)
  expect(result).toBe(11)
})

test('simple arity of 2', () => {
  const condition = (x, y) => x + y > 5
  const onTrue = (x, y) => x + y + 1
  const onFalse = (x, y) => x + y + 10
  const result = ifElse(
    condition, onTrue, onFalse
  )(1, 10)
  expect(result).toBe(12)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#ifElse)

### ifElseAsync

```typescript

ifElseAsync<T, U>(
  condition: (x: T) => Promise<boolean>, 
  onTrue: (x: T) => U, 
  onFalse: (x: T) => U, 
  ): (x: T) => Promise<U>
```

Asynchronous version of `R.ifElse`. Any of `condition`, `ifFn` and `elseFn` can be either asynchronous or synchronous function.

```javascript
const condition = async x => {
  await R.delay(100)
  return x > 1
}
const ifFn = async x => {
  await R.delay(100)
  return x + 1
}
const elseFn = async x => {
  await R.delay(100)
  return x - 1
}

const result = await R.ifElseAsync(
  condition,
  ifFn,
  elseFn  
)(1)
// => 0
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20condition%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20%3E%201%0A%7D%0Aconst%20ifFn%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20%2B%201%0A%7D%0Aconst%20elseFn%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20-%201%0A%7D%0A%0Aconst%20result%20%3D%20await%20R.ifElseAsync(%0A%20%20condition%2C%0A%20%20ifFn%2C%0A%20%20elseFn%20%20%0A)(1)%0A%2F%2F%20%3D%3E%200">Try this <strong>R.ifElseAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.ifElseAsync</strong> source</summary>

```javascript
function createThenable(fn){
  return async function (...input){
    return fn(...input)
  }
}

export function ifElseAsync(
  condition, ifFn, elseFn
){
  return (...inputs) =>
    new Promise((resolve, reject) => {
      const conditionPromise = createThenable(condition)
      const ifFnPromise = createThenable(ifFn)
      const elseFnPromise = createThenable(elseFn)

      conditionPromise(...inputs)
        .then(conditionResult => {
          const promised =
            conditionResult === true ? ifFnPromise : elseFnPromise

          promised(...inputs)
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { ifElseAsync } from './ifElseAsync'

test('arity of 1 - condition is async', async () => {
  const condition = async x => {
    await delay(100)

    return x > 4
  }
  const whenTrue = x => x + 1
  const whenFalse = x => x + 10
  const fn = ifElseAsync(
    condition, whenTrue, whenFalse
  )
  const result = await Promise.all([ fn(5), fn(1) ])
  expect(result).toEqual([ 6, 11 ])
})

test('arity of 1 - condition is sync', async () => {
  const condition = x => x > 4
  const whenTrue = async x => {
    await delay(100)

    return x + 1
  }
  const whenFalse = async x => {
    await delay(100)

    return x + 10
  }
  const fn = ifElseAsync(
    condition, whenTrue, whenFalse
  )
  const result = await Promise.all([ fn(5), fn(1) ])
  expect(result).toEqual([ 6, 11 ])
})

test('arity of 1 - all inputs are async', async () => {
  const condition = async x => {
    await delay(100)

    return x > 4
  }
  const whenTrue = async x => {
    await delay(100)

    return x + 1
  }
  const whenFalse = async x => {
    await delay(100)

    return x + 10
  }
  const fn = ifElseAsync(
    condition, whenTrue, whenFalse
  )
  const result = await Promise.all([ fn(5), fn(1) ])
  expect(result).toEqual([ 6, 11 ])
})

test('arity of 2 - condition is async', async () => {
  const condition = async (x, y) => {
    await delay(100)

    return x + y > 4
  }
  const whenTrue = (x, y) => x + y + 1
  const whenFalse = (x, y) => x + y + 10
  const fn = ifElseAsync(
    condition, whenTrue, whenFalse
  )
  const result = await Promise.all([ fn(14, 20), fn(1, 3) ])
  expect(result).toEqual([ 35, 14 ])
})

test('arity of 2 - condition is sync', async () => {
  const condition = (x, y) => x + y > 4
  const whenTrue = async (x, y) => {
    await delay(100)

    return x + y + 1
  }
  const whenFalse = async (x, y) => {
    await delay(100)

    return x + y + 10
  }
  const fn = ifElseAsync(
    condition, whenTrue, whenFalse
  )
  const result = await Promise.all([ fn(14, 20), fn(1, 3) ])
  expect(result).toEqual([ 35, 14 ])
})

test('arity of 2 - all inputs are async', async () => {
  const condition = async (x, y) => {
    await delay(100)

    return x + y > 4
  }
  const whenTrue = async (x, y) => {
    await delay(100)

    return x + y + 1
  }
  const whenFalse = async (x, y) => {
    await delay(100)

    return x + y + 10
  }
  const fn = ifElseAsync(
    condition, whenTrue, whenFalse
  )
  const result = await Promise.all([ fn(14, 20), fn(1, 3) ])
  expect(result).toEqual([ 35, 14 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#ifElseAsync)

### inc

It increments a number.

```javascript
R.inc(1) // => 2
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.inc(1)%20%2F%2F%20%3D%3E%202">Try this <strong>R.inc</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#inc)

### includes

```typescript

includes(valueToFind: string, input: string[] | string): boolean
```

If `input` is string, then this method work as native `String.includes`.

If `input` is array, then `R.equals` is used to define if `valueToFind` belongs to the list.

```javascript
const result = [
  R.includes('oo', 'foo'),
  R.includes({a: 1}, [{a: 1}])
]
// => [true, true ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.includes('oo'%2C%20'foo')%2C%0A%20%20R.includes(%7Ba%3A%201%7D%2C%20%5B%7Ba%3A%201%7D%5D)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20true%20%5D">Try this <strong>R.includes</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.includes</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { equals } from './equals'

export function includesArray(valueToFind, input){
  let index = -1

  while (++index < input.length){
    if (equals(input[ index ], valueToFind)){
      return true
    }
  }

  return false
}

export function includes(valueToFind, input){
  if (arguments.length === 1) return _input => includes(valueToFind, _input)
  if (typeof input === 'string'){
    return input.includes(valueToFind)
  }
  if (!input){
    throw new TypeError(`Cannot read property \'indexOf\' of ${ input }`)
  }
  if (!_isArray(input)) return false

  return includesArray(valueToFind, input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import R from 'ramda'

import { includes } from './includes'

test('includes with string', () => {
  const str = 'foo bar'

  expect(includes('bar')(str)).toBeTrue()
  expect(R.includes('bar')(str)).toBeTrue()
  expect(includes('never', str)).toBeFalse()
  expect(R.includes('never', str)).toBeFalse()
})

test('includes with array', () => {
  const arr = [ 1, 2, 3 ]

  expect(includes(2)(arr)).toBeTrue()
  expect(R.includes(2)(arr)).toBeTrue()

  expect(includes(4, arr)).toBeFalse()
  expect(R.includes(4, arr)).toBeFalse()
})

test('with wrong input that does not throw', () => {
  const result = includes(1, /foo/g)
  const ramdaResult = R.includes(1, /foo/g)
  expect(result).toBeFalse()
  expect(ramdaResult).toBeFalse()
})

test('throws on wrong input - match ramda behaviour', () => {
  expect(() => includes(2, null)).toThrowWithMessage(TypeError,
    'Cannot read property \'indexOf\' of null')
  expect(() => R.includes(2, null)).toThrowWithMessage(TypeError,
    'Cannot read property \'indexOf\' of null')
  expect(() => includes(2, undefined)).toThrowWithMessage(TypeError,
    'Cannot read property \'indexOf\' of undefined')
  expect(() => R.includes(2, undefined)).toThrowWithMessage(TypeError,
    'Cannot read property \'indexOf\' of undefined')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#includes)

### indexBy

It generates object with properties provided by `condition` and values provided by `list` array.

If `condition` is a function, then all list members are passed through it.

If `condition` is a string, then all list members are passed through `R.path(condition)`.

```javascript
const list = [ {id: 10}, {id: 20} ]

const withFunction = R.indexBy(
  x => x.id,
  list
)
const withString = R.indexBy(
  'id',
  list
)
const result = [
  withFunction, 
  R.equals(withFunction, withString)
]
// => [ { 10: {id: 10}, 20: {id: 20} }, true ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%20%7Bid%3A%2010%7D%2C%20%7Bid%3A%2020%7D%20%5D%0A%0Aconst%20withFunction%20%3D%20R.indexBy(%0A%20%20x%20%3D%3E%20x.id%2C%0A%20%20list%0A)%0Aconst%20withString%20%3D%20R.indexBy(%0A%20%20'id'%2C%0A%20%20list%0A)%0Aconst%20result%20%3D%20%5B%0A%20%20withFunction%2C%20%0A%20%20R.equals(withFunction%2C%20withString)%0A%5D%0A%2F%2F%20%3D%3E%20%5B%20%7B%2010%3A%20%7Bid%3A%2010%7D%2C%2020%3A%20%7Bid%3A%2020%7D%20%7D%2C%20true%20%5D">Try this <strong>R.indexBy</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#indexBy)

### indexOf

It returns the index of the first element of `list` equals to `valueToFind`.

If there is no such element, it returns `-1`.

```javascript
const list = [0, 1, 2, 3]

const result = [
  R.indexOf(2, list),
  R.indexOf(0, list)
]
// => [2, -1]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B0%2C%201%2C%202%2C%203%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.indexOf(2%2C%20list)%2C%0A%20%20R.indexOf(0%2C%20list)%0A%5D%0A%2F%2F%20%3D%3E%20%5B2%2C%20-1%5D">Try this <strong>R.indexOf</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#indexOf)

### init

```typescript

init<T>(input: T[]): T[]
```

It returns all but the last element of list or string `input`.

```javascript
const result = [
  R.init([1, 2, 3]) , 
  R.init('foo')  // => 'fo'
]
// => [[1, 2], 'fo']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.init(%5B1%2C%202%2C%203%5D)%20%2C%20%0A%20%20R.init('foo')%20%20%2F%2F%20%3D%3E%20'fo'%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B1%2C%202%5D%2C%20'fo'%5D">Try this <strong>R.init</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.init</strong> source</summary>

```javascript
import baseSlice from './_internals/baseSlice'

export function init(listOrString){
  if (typeof listOrString === 'string') return listOrString.slice(0, -1)

  return listOrString.length ? baseSlice(
    listOrString, 0, -1
  ) : []
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { init } from './init'

test('with array', () => {
  expect(init([ 1, 2, 3 ])).toEqual([ 1, 2 ])
  expect(init([ 1, 2 ])).toEqual([ 1 ])
  expect(init([ 1 ])).toEqual([])
  expect(init([])).toEqual([])
  expect(init([])).toEqual([])
  expect(init([ 1 ])).toEqual([])
})

test('with string', () => {
  expect(init('foo')).toEqual('fo')
  expect(init('f')).toEqual('')
  expect(init('')).toEqual('')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#init)

### interpolate

```typescript

interpolate(inputWithTags: string, templateArguments: object): string
```

It generages a new string from `inputWithTags` by replacing all `{{x}}` occurances with values provided by `templateArguments`.

```javascript
const inputWithTags = 'foo is {{bar}} even {{a}} more'
const templateArguments = {"bar":"BAR", a: 1}

const result = R.interpolate(inputWithTags, templateArguments)
const expected = 'foo is BAR even 1 more'
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20inputWithTags%20%3D%20'foo%20is%20%7B%7Bbar%7D%7D%20even%20%7B%7Ba%7D%7D%20more'%0Aconst%20templateArguments%20%3D%20%7B%22bar%22%3A%22BAR%22%2C%20a%3A%201%7D%0A%0Aconst%20result%20%3D%20R.interpolate(inputWithTags%2C%20templateArguments)%0Aconst%20expected%20%3D%20'foo%20is%20BAR%20even%201%20more'%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.interpolate</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.interpolate</strong> source</summary>

```javascript
const getOccurances = input => input.match(/{{\s*.+?\s*}}/g)

const getOccuranceProp = occurance => occurance.replace(/{{\s*|\s*}}/g, '')

const replace = ({ inputHolder, prop, replacer }) => {
  const regexBase = `{{${ prop }}}`
  const regex = new RegExp(regexBase, 'g')

  return inputHolder.replace(regex, replacer)
}

export function interpolate(input, templateInput){
  if (arguments.length === 1){
    return _templateInput => interpolate(input, _templateInput)
  }

  const occurances = getOccurances(input)
  if (occurances === null) return input
  let inputHolder = input

  for (const occurance of occurances){
    const prop = getOccuranceProp(occurance)

    inputHolder = replace({
      inputHolder,
      prop,
      replacer : templateInput[ prop ],
    })
  }

  return inputHolder
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { interpolate } from './interpolate'

test('within bracets', () => {
  const input = 'foo is { {{bar}} } even {{a}} more'
  const templateInput = {
    bar : 'BAR',
    a   : 1,
  }

  const result = interpolate(input, templateInput)
  const expectedResult = 'foo is { BAR } even 1 more'

  expect(result).toEqual(expectedResult)
})

test('happy', () => {
  const input = 'foo is {{bar}} even {{a}} more'
  const templateInput = {
    bar : 'BAR',
    a   : 1,
  }

  const result = interpolate(input, templateInput)
  const expectedResult = 'foo is BAR even 1 more'

  expect(result).toEqual(expectedResult)
})

test('no interpolation + curry', () => {
  const input = 'foo is bar even more'
  const templateInput = { bar : 'BAR' }

  const result = interpolate(input)(templateInput)
  const expectedResult = 'foo is bar even more'

  expect(result).toEqual(expectedResult)
})

test('with missing template input', () => {
  const input = 'foo is {{bar}} even {{a}} more'
  const templateInput = {
    baz : 'BAR',
    a   : 1,
  }

  const result = interpolate(input, templateInput)
  const expectedResult = 'foo is undefined even 1 more'

  expect(result).toEqual(expectedResult)
})

test('with arbitrary expression', () => {
  const input = '1 + 2 = {{ 1 + 2 }}'
  const templateInput = {}

  const result = interpolate(input, templateInput)

  expect(result).toEqual(input)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#interpolate)

### intersection

It loops throw `listA` and `listB` and returns the intersection of the two according to `R.equals`.

```javascript
const listA = [ { id : 1 }, { id : 2 }, { id : 3 }, { id : 4 } ]
const listB = [ { id : 3 }, { id : 4 }, { id : 5 }, { id : 6 } ]

const result = intersection(listA, listB)
// => [{ id : 3 }, { id : 4 }]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20listA%20%3D%20%5B%20%7B%20id%20%3A%201%20%7D%2C%20%7B%20id%20%3A%202%20%7D%2C%20%7B%20id%20%3A%203%20%7D%2C%20%7B%20id%20%3A%204%20%7D%20%5D%0Aconst%20listB%20%3D%20%5B%20%7B%20id%20%3A%203%20%7D%2C%20%7B%20id%20%3A%204%20%7D%2C%20%7B%20id%20%3A%205%20%7D%2C%20%7B%20id%20%3A%206%20%7D%20%5D%0A%0Aconst%20result%20%3D%20intersection(listA%2C%20listB)%0A%2F%2F%20%3D%3E%20%5B%7B%20id%20%3A%203%20%7D%2C%20%7B%20id%20%3A%204%20%7D%5D">Try this <strong>R.intersection</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#intersection)

### intersperse

It adds a `separator` between members of `list`.

```javascript
const list = [ 0, 1, 2, 3 ]
const separator = '|'
const result = intersperse(separator, list)
// => [0, '|', 1, '|', 2, '|', 3]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%200%2C%201%2C%202%2C%203%20%5D%0Aconst%20separator%20%3D%20'%7C'%0Aconst%20result%20%3D%20intersperse(separator%2C%20list)%0A%2F%2F%20%3D%3E%20%5B0%2C%20'%7C'%2C%201%2C%20'%7C'%2C%202%2C%20'%7C'%2C%203%5D">Try this <strong>R.intersperse</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#intersperse)

### is

It returns `true` if `x` is instance of `targetPrototype`.

```javascript
const result = [
  R.is(String, 'foo'),  
  R.is(Array, 1)
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.is(String%2C%20'foo')%2C%20%20%0A%20%20R.is(Array%2C%201)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.is</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#is)

### isEmpty

```typescript

isEmpty<T>(x: T): boolean
```

It returns `true` if `x` is `empty`.

```javascript
const result = [
  R.isEmpty(''),
  R.isEmpty({ x : 0 })
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.isEmpty('')%2C%0A%20%20R.isEmpty(%7B%20x%20%3A%200%20%7D)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.isEmpty</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.isEmpty</strong> source</summary>

```javascript
import { type } from './type'

export function isEmpty(input){
  const inputType = type(input)
  if ([ 'Undefined', 'NaN', 'Number', 'Null' ].includes(inputType))
    return false
  if (!input) return true

  if (inputType === 'Object'){
    return Object.keys(input).length === 0
  }

  if (inputType === 'Array'){
    return input.length === 0
  }

  return false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { isEmpty } from './isEmpty'

test('happy', () => {
  expect(isEmpty(undefined)).toEqual(false)
  expect(isEmpty('')).toEqual(true)
  expect(isEmpty(null)).toEqual(false)
  expect(isEmpty(' ')).toEqual(false)
  expect(isEmpty(new RegExp(''))).toEqual(false)
  expect(isEmpty([])).toEqual(true)
  expect(isEmpty([ [] ])).toEqual(false)
  expect(isEmpty({})).toEqual(true)
  expect(isEmpty({ x : 0 })).toEqual(false)
  expect(isEmpty(0)).toEqual(false)
  expect(isEmpty(NaN)).toEqual(false)
  expect(isEmpty([ '' ])).toEqual(false)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isEmpty)

### isFunction

```typescript

isFunction(input: any): boolean
```

It returns `true` if **R.type** of `input` is `Async` or `Function`.

```javascript
const result = [
  R.isFunction(R.mapAsync),
  R.isFunction(R.add),
]
// => [true, true]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.isFunction(R.mapAsync)%2C%0A%20%20R.isFunction(R.add)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20true%5D">Try this <strong>R.isFunction</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.isFunction</strong> source</summary>

```javascript
import { type } from './type'

export function isFunction(fn){
  return [ 'Async', 'Function' ].includes(type(fn))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { isFunction } from './isFunction'

test('when function', () => {
  const fn = () => {}

  expect(isFunction(fn)).toEqual(true)
})

test('when promise', () => {
  const fn = Promise.resolve(2)

  expect(isFunction(fn)).toBeFalse()
})

test('when async', () => {
  const fn = async x => x

  expect(isFunction(fn)).toEqual(true)
})

test('when false', () => {
  expect(isFunction(null)).toEqual(false)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isFunction)

### isNil

```typescript

isNil(x: any): x is null | undefined
```

It returns `true` if `x` is either `null` or `undefined`.

```javascript
const result = [
  R.isNil(null),
  R.isNil(1),
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.isNil(null)%2C%0A%20%20R.isNil(1)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.isNil</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.isNil</strong> source</summary>

```javascript
export function isNil(x){
  return x === undefined || x === null
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { isNil } from './isNil'

test('happy', () => {
  expect(isNil(null)).toBeTrue()

  expect(isNil(undefined)).toBeTrue()

  expect(isNil([])).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isNil)

### isPromise

```typescript

isPromise(input: any): boolean
```

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isPromise)

### isType

```typescript

isType(targetType: RambdaTypes, input: any): boolean
```

It returns true if `targetType` is equal to type of `input` according to `R.type`.

```javascript
R.isType('Async',R.delay(1000))
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.isType('Async'%2CR.delay(1000))%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.isType</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.isType</strong> source</summary>

```javascript
import { type } from './type'

export function isType(xType, x){
  if (arguments.length === 1){
    return xHolder => isType(xType, xHolder)
  }

  return type(x) === xType
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { isType } from './isType'

const list = [ 1, 2, 3 ]

test('array', () => {
  expect(isType('Array', list)).toBeTruthy()
  expect(isType('Array')([])).toBeTruthy()
})

test('promise', () => {
  expect(isType('Promise', Promise.resolve(1))).toBeTruthy()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isType)

### isValid

```typescript

isValid({input: object, schema: Schema}: IsValid): boolean
```

It checks if `input` is following `schema` specifications.

If validation fails, it returns `false`.

Please [check the detailed explanation](https://github.com/selfrefactor/rambdax/blob/master/files/isValid.md) as it is hard to write a short description for this method.

> :boom: Independently, somebody else came with very similar idea called [superstruct](https://github.com/ianstormtaylor/superstruct)

```javascript
const input = {a: ['foo', 'bar']}
const invalidInput = {a: ['foo', 'bar', 1]}
const schema = {a: [String]}
const result = [
  R.isValid({schema, input}),
  R.isValid({schema, input: invalidInput})
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20input%20%3D%20%7Ba%3A%20%5B'foo'%2C%20'bar'%5D%7D%0Aconst%20invalidInput%20%3D%20%7Ba%3A%20%5B'foo'%2C%20'bar'%2C%201%5D%7D%0Aconst%20schema%20%3D%20%7Ba%3A%20%5BString%5D%7D%0Aconst%20result%20%3D%20%5B%0A%20%20R.isValid(%7Bschema%2C%20input%7D)%2C%0A%20%20R.isValid(%7Bschema%2C%20input%3A%20invalidInput%7D)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.isValid</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.isValid</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { all } from './all'
import { any } from './any'
import { includes } from './includes'
import { init } from './init'
import { test } from './test'
import { toLower } from './toLower'
import { type } from './type'

export function isPrototype(input){
  const currentPrototype = input.prototype
  const list = [ Number, String, Boolean, Promise ]
  let toReturn = false
  let counter = -1
  while (++counter < list.length && !toReturn){
    if (currentPrototype === list[ counter ].prototype) toReturn = true
  }

  return toReturn
}

export function prototypeToString(input){
  const currentPrototype = input.prototype
  const list = [ Number, String, Boolean, Promise ]
  const translatedList = [ 'Number', 'String', 'Boolean', 'Promise' ]
  let found
  let counter = -1

  while (++counter < list.length){
    if (currentPrototype === list[ counter ].prototype) found = counter
  }

  return translatedList[ found ]
}

const typesWithoutPrototype = [ 'any', 'promise', 'async', 'function' ]

export function fromPrototypeToString(rule){
  if (
    _isArray(rule) ||
    rule === undefined ||
    rule === null ||
    rule.prototype === undefined ||
    typesWithoutPrototype.includes(rule)
  ){
    return {
      rule,
      parsed : false,
    }
  }
  if (String.prototype === rule.prototype){
    return {
      rule   : 'string',
      parsed : true,
    }
  }
  if (Boolean.prototype === rule.prototype){
    return {
      rule   : 'boolean',
      parsed : true,
    }
  }
  if (Number.prototype === rule.prototype){
    return {
      rule   : 'number',
      parsed : true,
    }
  }

  return {
    rule   : type(rule.prototype).toLowerCase(),
    parsed : true,
  }
}

function getRuleAndType(schema, requirementRaw){
  const ruleRaw = schema[ requirementRaw ]
  const typeIs = type(ruleRaw)
  const { rule, parsed } = fromPrototypeToString(ruleRaw)

  return {
    rule     : rule,
    ruleType : parsed ? 'String' : typeIs,
  }
}

export function isValid({ input, schema }){
  if (input === undefined || schema === undefined) return false

  let flag = true
  const boom = boomFlag => {
    if (!boomFlag){
      flag = false
    }
  }

  for (const requirementRaw in schema){
    if (flag){
      const isOptional = requirementRaw.endsWith('?')
      const requirement = isOptional ? init(requirementRaw) : requirementRaw

      const { rule, ruleType } = getRuleAndType(schema, requirementRaw)
      const inputProp = input[ requirement ]
      const inputPropType = type(input[ requirement ])

      const ok = isOptional && inputProp !== undefined || !isOptional

      if (!ok || rule === 'any' && inputProp != null || rule === inputProp)
        continue

      if (ruleType === 'Object'){
        /**
         * This rule is standalone schema, so we recursevly call `isValid`
         */
        const isValidResult = isValid({
          input  : inputProp,
          schema : rule,
        })
        boom(isValidResult)
      } else if (ruleType === 'String'){
        /**
         * Rule is actual rule such as 'number', so the two types are compared
         */
        boom(toLower(inputPropType) === rule)
      } else if (typeof rule === 'function'){
        /**
         * Rule is function so we pass to it the input
         */
        boom(rule(inputProp))
      } else if (ruleType === 'Array' && inputPropType === 'String'){
        /**
         * Enum case | rule is like a: ['foo', 'bar']
         */
        boom(includes(inputProp, rule))
      } else if (
        ruleType === 'Array' &&
        rule.length === 1 &&
        inputPropType === 'Array'
      ){
        /**
         * 1. array of type | rule is like a: ['number']
         * 2. rule is like a: [{foo: 'string', bar: 'number'}]
         */
        const [ currentRule ] = rule
        const currentRuleType = type(currentRule)

        //Check if rule is invalid
        boom(currentRuleType === 'String' ||
            currentRuleType === 'Object' ||
            isPrototype(currentRule))

        if (currentRuleType === 'Object' && flag){
          /**
           * 2. rule is like a: [{from: 'string'}]
           */
          const isValidResult = all(inputPropInstance =>
            isValid({
              input  : inputPropInstance,
              schema : currentRule,
            }),
          inputProp)
          boom(isValidResult)
        } else if (flag){
          /**
           * 1. array of type
           */

          const actualRule =
            currentRuleType === 'String' ?
              currentRule :
              prototypeToString(currentRule)
          const isInvalidResult = any(inputPropInstance =>
            type(inputPropInstance).toLowerCase() !==
              actualRule.toLowerCase(),
          inputProp)
          boom(!isInvalidResult)
        }
      } else if (ruleType === 'RegExp' && inputPropType === 'String'){
        boom(test(rule, inputProp))
      } else {
        boom(false)
      }
    }
  }

  return flag
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { isPrototype, isValid } from './isValid'

test('is prototype', () => {
  expect(isPrototype(Promise)).toBeTrue()
  expect(isPrototype(Number)).toBeTrue()
  expect(isPrototype(Boolean)).toBeTrue()
  expect(isPrototype(String)).toBeTrue()
  expect(isPrototype(0)).toBeFalse()
})

test('prototype inside array', () => {
  const input = { a : [ 1, 2, 3, 4 ] }
  const schema = { a : [ Number ] }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('with Promise prototype', () => {
  const input = { a : [ delay(1), delay(2) ] }
  const schema = { a : [ Promise ] }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('object prototype as rule - true', () => {
  const input = { a : {} }
  const schema = { a : Object }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('list of functions', () => {
  const input = { a : [ () => {}, delay ] }
  const schema = { a : [ 'function' ] }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('function schema type can be only string', () => {
  const input = { a : [ () => {}, delay ] }
  const schema = { a : [ Function ] }

  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('object prototype as rule - false', () => {
  const input = { a : null }
  const schema = { a : Object }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('number prototype as rule - true', () => {
  const input = { a : 1 }
  const schema = { a : Number }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('array prototype as rule - true', () => {
  const input = { a : [ 1, 2, 3 ] }
  const schema = { a : Array }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('array prototype as rule - false', () => {
  const input = { a : null }
  const schema = { a : Array }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('string prototype as rule - true', () => {
  const input = { a : 'foo' }
  const schema = { a : String }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('string prototype as rule - false', () => {
  const input = { a : null }
  const schema = { a : String }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('boolean prototype as rule - true', () => {
  const input = { a : true }
  const schema = { a : Boolean }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('boolean prototype as rule - false', () => {
  const input = { a : null }
  const schema = { a : Boolean }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('regex prototype cannot be rule - true', () => {
  const input = { a : /foo/g }
  const schema = { a : new RegExp('foo') }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('undefined as a rule - true', () => {
  const input = { a : undefined }
  const schema = { a : undefined }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('undefined as a rule - false', () => {
  const input = { a : null }
  const schema = { a : undefined }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('null as a rule - true', () => {
  const input = { a : null }
  const schema = { a : null }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('null as a rule - false', () => {
  const input = { a : undefined }
  const schema = { a : null }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('`any` safeguard against `null`', () => {
  const input = { a : null }
  const schema = { a : 'any' }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('`any` safeguard against `undefined`', () => {
  const input = { a : undefined }
  const schema = { a : 'any' }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('type can be `"any"`', () => {
  const input = { a : () => {} }
  const schema = { a : 'any' }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('type can be `"function"`', () => {
  const input = { a : () => {} }
  const schema = { a : 'function' }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('type can be `async`', () => {
  const input = { a : async () => {} }
  const schema = { a : 'async' }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('type can be `promise`', () => {
  const input = { a : delay(1999) }
  const schema = { a : 'promise' }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('type can be `promise` list', () => {
  const input = { a : [ delay(1999) ] }
  const schema = { a : [ 'promise' ] }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('function as schema - false', () => {
  const input = {
    a : {
      ab : () => true,
      ac : 3,
    },
    c : [ 1, 2 ],
  }
  const schema = {
    'a' : {
      ab : /fo/,
      ac : 'number',
    },
    'b?' : 'string',
    'c'  : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('regex ok', () => {
  const input = {
    a : {
      ab : 'foo',
      ac : 3,
    },
    c : [ 1, 2 ],
  }
  const schema = {
    'a' : {
      ab : /fo/,
      ac : 'number',
    },
    'b?' : 'string',
    'c'  : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('regex !ok', () => {
  const input = {
    a : {
      ab : 'foo',
      ac : 3,
    },
    c : [ 1, 2 ],
  }
  const schema = {
    'a' : {
      ab : /ba/,
      ac : 'number',
    },
    'b?' : 'string',
    'c'  : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('optional props is missing', () => {
  const input = {
    a : {
      ab : 'foo',
      ac : 3,
    },
    c : [ 1, 2 ],
  }
  const schema = {
    'a' : {
      ab : 'string',
      ac : 'number',
    },
    'b?' : 'string',
    'c'  : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('optional props is wrong type', () => {
  const input = {
    a : {
      ab : 'foo',
      ac : 3,
    },
    b : [],
    c : [ 1, 2 ],
  }
  const schema = {
    'a' : {
      ab : 'string',
      ac : 'number',
    },
    'b?' : 'string',
    'c'  : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('optional props - nested', () => {
  const input = {
    a : {
      ab : 'foo',
      ac : 3,
    },
    b : [],
    c : [ 1, 2 ],
  }
  const schema = {
    a : {
      'ab'  : 'string',
      'ac?' : 'number',
    },
    b : 'array',
    c : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('optional props is missing - nested', () => {
  const input = {
    a : { ab : 'foo' },
    b : [],
    c : [ 1, 2 ],
  }
  const schema = {
    a : {
      'ab'  : 'string',
      'ac?' : 'number',
    },
    b : 'array',
    c : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('optional props is wrong type - nested', () => {
  const input = {
    a : {
      ab : 'foo',
      ac : 'bar',
    },
    b : [],
    c : [ 1, 2 ],
  }
  const schema = {
    a : {
      'ab'  : 'string',
      'ac?' : 'number',
    },
    b : 'array',
    c : [ 'number' ],
  }
  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('nested schema', () => {
  const input = {
    a : {
      b : 'str',
      c : 3,
      d : 'str',
    },
    b : 'foo',
  }
  const schema = {
    a : {
      b : 'string',
      c : 'number',
      d : 'string',
    },
    b : 'string',
  }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()

  const invalidInputFirst = {
    a : {
      b : 'str',
      c : 3,
      d : 'str',
    },
    b : 5,
  }

  expect(isValid({
    input : invalidInputFirst,
    schema,
  })).toBeFalsy()

  const invalidInputSecond = {
    a : {
      b : 'str',
      c : 'str',
      d : 'str',
    },
    b : 5,
  }

  expect(isValid({
    input : invalidInputSecond,
    schema,
  })).toBeFalsy()

  const invalidInputThird = {
    a : { b : 'str' },
    b : 5,
  }

  expect(isValid({
    input : invalidInputThird,
    schema,
  })).toBeFalsy()
})

test('array of type', () => {
  const input = {
    a : [ 1, 2 ],
    b : 'foo',
  }
  const schema = {
    a : [ 'number' ],
    b : 'string',
  }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()

  const invalidInput = {
    a : [ 1, '1' ],
    b : 'foo',
  }

  expect(isValid({
    input : invalidInput,
    schema,
  })).toBeFalsy()
})

test('function as rule', () => {
  const input = {
    a : [ 1, 2, 3, 4 ],
    b : 'foo',
  }
  const invalidInput = {
    a : [ 4 ],
    b : 'foo',
  }

  const schema = {
    a : x => x.length > 2,
    b : 'string',
  }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()

  expect(isValid({
    input : invalidInput,
    schema,
  })).toBeFalsy()
})

test('input prop is undefined', () => {
  const input = { b : 3 }
  const schema = { a : 'number' }

  expect(isValid({
    input,
    schema,
  })).toBeFalsy()
})

test('enum', () => {
  const input = { a : 'foo' }
  const invalidInput = { a : '' }

  const schema = { a : [ 'foo', 'bar', 'baz' ] }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()

  expect(isValid({
    input : invalidInput,
    schema,
  })).toBeFalsy()
})

test('readme example', () => {
  const basicSchema = { a : [ 'string' ] }
  const schema = {
    b : [ basicSchema ],
    c : {
      d : { e : 'boolean' },
      f : 'array',
    },
    g : [ 'foo', 'bar', 'baz' ],
  }
  const input = {
    b : [ { a : [ 'led', 'zeppelin' ] } ],
    c : {
      d : { e : true },
      f : [ 'any', 1, null, 'value' ],
    },
    g : 'foo',
  }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('should allow additional properties', () => {
  const input = {
    title : 'You shook me',
    year  : 1969,
  }

  expect(isValid({
    input,
    schema : { title : 'string' },
  })).toBeTruthy()
})

test('accepts values as schemas', () => {
  const input = {
    title : 'You shook me',
    genre : 'Blues',
    year  : 1969,
  }
  const schema = {
    title : 'You shook me',
    year  : 1969,
  }
  expect(isValid({
    input,
    schema,
  })).toBeTruthy()
})

test('compatible schemas with nested object', () => {
  const input = {
    foo : 'bar',
    baz : { a : { b : 'c' } },
  }
  const invalidInputFirst = {
    foo : 'bar',
    baz : { a : { b : 1 } },
  }
  const invalidInputSecond = {
    foo : 'bar',
    baz : { a : { b : [] } },
  }
  const invalidInputThird = {
    foo : 'bar',
    baz : { a : { b : null } },
  }
  const schema = {
    foo : 'string',
    baz : { a : { b : 'string' } },
  }

  expect(isValid({
    input,
    schema,
  })).toBeTruthy()

  expect(isValid({
    input : invalidInputFirst,
    schema,
  })).toBeFalsy()
  expect(isValid({
    input : invalidInputSecond,
    schema,
  })).toBeFalsy()
  expect(isValid({
    input : invalidInputThird,
    schema,
  })).toBeFalsy()
})

test('should return true when schema is empty object', () => {
  expect(isValid({
    input  : { a : 1 },
    schema : {},
  })).toBeTruthy()
})

test('when schema is undefined', () => {
  expect(isValid({
    input  : { a : 1 },
    schema : undefined,
  })).toBeFalsy()
})

test('should return false with invalid schema rule', () => {
  const input = {
    foo : 'bar',
    a   : {},
  }
  const inputSecond = { foo : 'bar' }

  const schema = {
    foo : 'string',
    baz : { a : {} },
  }

  expect(isValid({
    input,
    schema,
  })).toBeFalsy()

  expect(isValid({
    input : inputSecond,
    schema,
  })).toBeFalsy()
})

test('array of schemas', () => {
  const input = {
    b : [
      {
        a : 'led',
        b : 1,
      },
      {
        a : 'dancing',
        b : 1,
      },
    ],
  }
  const basicSchema = {
    a : String,
    b : Number,
  }
  const schema = { b : [ basicSchema ] }
  const result = isValid({
    input,
    schema,
  })

  expect(result).toBeTruthy()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isValid)

### isValidAsync

```typescript

isValidAsync(x: IsValidAsync): Promise<boolean>
```

Asynchronous version of `R.isValid`

```javascript
const input = {a: 1, b: 2}
const invalidInput = {a: 1, b: 'foo'}
const schema = {a: Number, b: async x => {
  await R.delay(100)
  return typeof x === 'number'
}}

const result = await Promise.all([
  R.isValidAsync({schema, input}),
  R.isValidAsync({schema, input: invalidInput})
])
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20input%20%3D%20%7Ba%3A%201%2C%20b%3A%202%7D%0Aconst%20invalidInput%20%3D%20%7Ba%3A%201%2C%20b%3A%20'foo'%7D%0Aconst%20schema%20%3D%20%7Ba%3A%20Number%2C%20b%3A%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20typeof%20x%20%3D%3D%3D%20'number'%0A%7D%7D%0A%0Aconst%20result%20%3D%20await%20Promise.all(%5B%0A%20%20R.isValidAsync(%7Bschema%2C%20input%7D)%2C%0A%20%20R.isValidAsync(%7Bschema%2C%20input%3A%20invalidInput%7D)%0A%5D)%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.isValidAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.isValidAsync</strong> source</summary>

```javascript
import { forEach } from './forEach'
import { isPromise } from './isPromise'
import { isValid } from './isValid'

export async function isValidAsync({ schema, input }){
  const asyncSchema = {}
  const simpleSchema = {}
  forEach((rule, prop) => {
    if (isPromise(rule)){
      asyncSchema[ prop ] = rule
    } else {
      simpleSchema[ prop ] = rule
    }
  }, schema)

  if (Object.keys(asyncSchema).length === 0)
    return isValid({
      input,
      schema,
    })

  if (
    !isValid({
      input,
      schema : simpleSchema,
    })
  )
    return false

  let toReturn = true

  for (const singleRuleProp in asyncSchema){
    if (toReturn){
      const validated = await asyncSchema[ singleRuleProp ](input[ singleRuleProp ])
      if (!validated) toReturn = false
    }
  }

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { result } from 'lodash'

import { delay } from './delay'
import { isValidAsync } from './isValidAsync'

const simplePredicate = async x => {
  await delay(100)

  return x > 5
}

test('happy', async () => {
  const input = {
    a          : 1,
    b          : 7,
    c          : 9,
    additional : 'foo',
  }
  const invalidInput = {
    a : 1,
    b : 2,
    c : 9,
  }
  const schema = {
    a : Number,
    b : simplePredicate,
    c : simplePredicate,
  }
  const invalidSchema = {
    a : Boolean,
    b : simplePredicate,
    c : simplePredicate,
  }
  const result = await isValidAsync({
    input,
    schema,
  })
  const invalidResult = await isValidAsync({
    input,
    schema : invalidSchema,
  })
  const withInvalidInput = await isValidAsync({
    input : invalidInput,
    schema,
  })
  expect(result).toBeTruthy()
  expect(invalidResult).toBeFalsy()
  expect(withInvalidInput).toBeFalsy()
})

test('without async rules', async () => {
  const input = {
    a : 1,
    b : 7,
  }
  const schema = {
    a : Number,
    b : x => x > 2,
  }
  const invalidSchema = {
    a : Number,
    b : Boolean,
  }
  const result = await isValidAsync({
    input,
    schema,
  })
  const invalidResult = await isValidAsync({
    input,
    schema : invalidSchema,
  })

  expect(result).toBeTruthy()
  expect(invalidResult).toBeFalsy()
})

test('readme example', async () => {
  const input = {
    a : 1,
    b : 2,
  }
  const invalidInput = {
    a : 1,
    b : 'foo',
  }
  const schema = {
    a : Number,
    b : async x => {
      await delay(100)

      return typeof x === 'number'
    },
  }
  const result = await Promise.all([
    isValidAsync({
      schema,
      input,
    }),
    isValidAsync({
      schema,
      input : invalidInput,
    }),
  ])
  expect(result).toEqual([ true, false ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#isValidAsync)

### join

```typescript

join<T>(glue: string, list: T[]): string
```

It returns a string of all `list` instances joined with a `glue`.

```javascript
R.join('-', [1, 2, 3])  // => '1-2-3'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.join('-'%2C%20%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20'1-2-3'">Try this <strong>R.join</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.join</strong> source</summary>

```javascript
export function join(glue, list){
  if (arguments.length === 1) return _list => join(glue, _list)

  return list.join(glue)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { join } from './join'

test('curry', () => {
  expect(join('|')([ 'foo', 'bar', 'baz' ])).toEqual('foo|bar|baz')

  expect(join('|', [ 1, 2, 3 ])).toEqual('1|2|3')

  const spacer = join(' ')

  expect(spacer([ 'a', 2, 3.4 ])).toEqual('a 2 3.4')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#join)

### keys

```typescript

keys<T extends object>(x: T): (keyof T)[]
```

It applies `Object.keys` over `x` and returns its keys.

```javascript
R.keys({a:1, b:2})  // => ['a', 'b']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.keys(%7Ba%3A1%2C%20b%3A2%7D)%20%20%2F%2F%20%3D%3E%20%5B'a'%2C%20'b'%5D">Try this <strong>R.keys</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.keys</strong> source</summary>

```javascript
export function keys(x){
  return Object.keys(x)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { keys } from './keys'

test('happy', () => {
  expect(keys({ a : 1 })).toEqual([ 'a' ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#keys)

### last

```typescript

last(str: string): string
```

It returns the last element of `input`, as the `input` can be either a string or an array.

```javascript
const result = [
  R.last([1, 2, 3]),
  R.last('foo'),
]
// => [3, 'o']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.last(%5B1%2C%202%2C%203%5D)%2C%0A%20%20R.last('foo')%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B3%2C%20'o'%5D">Try this <strong>R.last</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.last</strong> source</summary>

```javascript
export function last(listOrString){
  if (typeof listOrString === 'string'){
    return listOrString[ listOrString.length - 1 ] || ''
  }

  return listOrString[ listOrString.length - 1 ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { last } from './last'

test('with list', () => {
  expect(last([ 1, 2, 3 ])).toBe(3)
  expect(last([])).toBeUndefined()
})

test('with string', () => {
  expect(last('abc')).toEqual('c')
  expect(last('')).toEqual('')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#last)

### lastIndexOf

```typescript

lastIndexOf<T>(target: T, list: T[]): number
```

It returns the last index of `target` in `list` array.

`R.equals` is used to determine equality between `target` and members of `list`.

If there is no such index, then `-1` is returned.

```javascript
const list = [1, 2, 3, 1, 2, 3]
const result = [
  R.lastIndexOf(2, list),
  R.lastIndexOf(4, list),
]
// => [4, -1]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%201%2C%202%2C%203%5D%0Aconst%20result%20%3D%20%5B%0A%20%20R.lastIndexOf(2%2C%20list)%2C%0A%20%20R.lastIndexOf(4%2C%20list)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B4%2C%20-1%5D">Try this <strong>R.lastIndexOf</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lastIndexOf</strong> source</summary>

```javascript
import { equals } from './equals'

export function lastIndexOf(target, list){
  if (arguments.length === 1) return _list => lastIndexOf(target, _list)

  let index = list.length

  while (--index > 0){
    if (equals(list[ index ], target)){
      return index
    }
  }

  return -1
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { lastIndexOf } from './lastIndexOf'

test('happy', () => {
  const a = lastIndexOf(1, [ 1, 2, 3, 1, 2 ])
  const b = lastIndexOf(1)([ 1, 2, 3, 1, 2 ])

  expect(a).toEqual(3)
  expect(b).toEqual(3)
})

test('false', () => {
  const a = lastIndexOf(10, [ 1, 2, 3, 1, 2 ])

  expect(a).toEqual(-1)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lastIndexOf)

### length

```typescript

length<T>(input: T[]): number
```

It returns the `length` property of list or string `input`.

```javascript
const result = [
  R.length([1, 2, 3, 4]),
  R.length('foo'),
]
// => [4, 3]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.length(%5B1%2C%202%2C%203%2C%204%5D)%2C%0A%20%20R.length('foo')%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B4%2C%203%5D">Try this <strong>R.length</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.length</strong> source</summary>

```javascript
export function length(x){
  if (!x && x !== '' || x.length === undefined){
    return NaN
  }

  return x.length
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { length } from './length'

test('happy', () => {
  expect(length('foo')).toEqual(3)
  expect(length([ 1, 2, 3 ])).toEqual(3)
  expect(length([])).toEqual(0)
})

test('with empty string', () => {
  expect(length('')).toEqual(0)
})

test('with bad input returns NaN', () => {
  expect(length(0)).toBeNaN()
  expect(length({})).toBeNaN()
  expect(length(null)).toBeNaN()
  expect(length(undefined)).toBeNaN()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#length)

### lens

```typescript

lens<T, U, V>(getter: (s: T) => U, setter: (a: U, s: T) => V): Lens
```

It returns a `lens` for the given `getter` and `setter` functions. 

The `getter` **gets** the value of the focus; the `setter` **sets** the value of the focus. 

The setter should not mutate the data structure.

```javascript
const xLens = R.lens(R.prop('x'), R.assoc('x'));

R.view(xLens, {x: 1, y: 2}) // => 1
R.set(xLens, 4, {x: 1, y: 2}) // => {x: 4, y: 2}
R.over(xLens, R.negate, {x: 1, y: 2}) // => {x: -1, y: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20xLens%20%3D%20R.lens(R.prop('x')%2C%20R.assoc('x'))%3B%0A%0AR.view(xLens%2C%20%7Bx%3A%201%2C%20y%3A%202%7D)%20%2F%2F%20%3D%3E%201%0AR.set(xLens%2C%204%2C%20%7Bx%3A%201%2C%20y%3A%202%7D)%20%2F%2F%20%3D%3E%20%7Bx%3A%204%2C%20y%3A%202%7D%0AR.over(xLens%2C%20R.negate%2C%20%7Bx%3A%201%2C%20y%3A%202%7D)%20%2F%2F%20%3D%3E%20%7Bx%3A%20-1%2C%20y%3A%202%7D">Try this <strong>R.lens</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lens</strong> source</summary>

```javascript
export function lens(getter, setter){
  return function (functor){
    return function (target){
      return functor(getter(target)).map(focus => setter(focus, target))
    }
  }
}
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lens)

### lensEq

```typescript

lensEq<T, U>(lens: Lens, target: T, input: U): boolean
```

It returns `true` if data structure focused by the given lens equals to the `target` value.

`R.equals` is used to determine equality.

> :boom: Idea for this method comes from `ramda-adjunct` library

```javascript
const list = [ 1, 2, 3 ]
const lens = R.lensIndex(0)
const result = R.lensEq(
  lens, 1, list
)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%201%2C%202%2C%203%20%5D%0Aconst%20lens%20%3D%20R.lensIndex(0)%0Aconst%20result%20%3D%20R.lensEq(%0A%20%20lens%2C%201%2C%20list%0A)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.lensEq</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lensEq</strong> source</summary>

```javascript
import { curry } from './curry'
import { equals } from './equals'
import { view } from './view'

function lensEqFn(
  lens, target, input
){
  return equals(view(lens, input), target)
}

export const lensEq = curry(lensEqFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { lensEq } from './lensEq'
import { lensIndex } from './lensIndex'
import { lensPath } from './lensPath'

test('with list', () => {
  const list = [ 1, 2, 3 ]
  const lens = lensIndex(0)
  expect(lensEq(
    lens, 1, list
  )).toBeTrue()
  expect(lensEq(lens, 2)(list)).toBeFalse()
})

test('with R.lensPath', () => {
  const input = { a : { b : { c : 1 } } }
  const target = { c : 1 }
  const lens = lensPath('a.b')

  expect(lensEq(lens)(target)(input)).toBeTrue()
  expect(lensEq(
    lens, target, { c : 2 }
  )).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lensEq)

### lensIndex

```typescript

lensIndex(index: number): Lens
```

It returns a lens that focuses on specified `index`.

```javascript
const list = ['a', 'b', 'c']
const headLens = R.lensIndex(0)

R.view(headLens, list) // => 'a'
R.set(headLens, 'x', list) // => ['x', 'b', 'c']
R.over(headLens, R.toUpper, list) // => ['A', 'b', 'c']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20list%20%3D%20%5B'a'%2C%20'b'%2C%20'c'%5D%0Aconst%20headLens%20%3D%20R.lensIndex(0)%0A%0AR.view(headLens%2C%20list)%20%2F%2F%20%3D%3E%20'a'%0AR.set(headLens%2C%20'x'%2C%20list)%20%2F%2F%20%3D%3E%20%5B'x'%2C%20'b'%2C%20'c'%5D%0AR.over(headLens%2C%20R.toUpper%2C%20list)%20%2F%2F%20%3D%3E%20%5B'A'%2C%20'b'%2C%20'c'%5D">Try this <strong>R.lensIndex</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lensIndex</strong> source</summary>

```javascript
import { lens } from './lens'
import { nth } from './nth'
import { update } from './update'

export function lensIndex(index){
  return lens(nth(index), update(index))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { compose } from './compose'
import { keys } from './keys'
import { lensIndex } from './lensIndex'
import { over } from './over'
import { set } from './set'
import { view } from './view'

const testList = [ { a : 1 }, { b : 2 }, { c : 3 } ]

test('focuses list element at the specified index', () => {
  expect(view(lensIndex(0), testList)).toEqual({ a : 1 })
})

test('returns undefined if the specified index does not exist', () => {
  expect(view(lensIndex(10), testList)).toEqual(undefined)
})

test('sets the list value at the specified index', () => {
  expect(set(
    lensIndex(0), 0, testList
  )).toEqual([ 0, { b : 2 }, { c : 3 } ])
})

test('applies function to the value at the specified list index', () => {
  expect(over(
    lensIndex(2), keys, testList
  )).toEqual([ { a : 1 }, { b : 2 }, [ 'c' ] ])
})

test('can be composed', () => {
  const nestedList = [ 0, [ 10, 11, 12 ], 1, 2 ]
  const composedLens = compose(lensIndex(1), lensIndex(0))

  expect(view(composedLens, nestedList)).toEqual(10)
})

test('set s (get s) === s', () => {
  expect(set(
    lensIndex(0), view(lensIndex(0), testList), testList
  )).toEqual(testList)
})

test('get (set s v) === v', () => {
  expect(view(lensIndex(0), set(
    lensIndex(0), 0, testList
  ))).toEqual(0)
})

test('get (set(set s v1) v2) === v2', () => {
  expect(view(lensIndex(0),
    set(
      lensIndex(0), 11, set(
        lensIndex(0), 10, testList
      )
    ))).toEqual(11)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lensIndex)

### lensPath

```typescript

lensPath(path: RamdaPath): Lens
```

It returns a lens that focuses on specified `path`.

```javascript
const lensPath = R.lensPath(['x', 0, 'y'])
const input = {x: [{y: 2, z: 3}, {y: 4, z: 5}]}

R.view(lensPath, input) // => 2

R.set(lensPath, 1, input) 
// => {x: [{y: 1, z: 3}, {y: 4, z: 5}]}

R.over(xHeadYLens, R.negate, input) 
// => {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20lensPath%20%3D%20R.lensPath(%5B'x'%2C%200%2C%20'y'%5D)%0Aconst%20input%20%3D%20%7Bx%3A%20%5B%7By%3A%202%2C%20z%3A%203%7D%2C%20%7By%3A%204%2C%20z%3A%205%7D%5D%7D%0A%0AR.view(lensPath%2C%20input)%20%2F%2F%20%3D%3E%202%0A%0AR.set(lensPath%2C%201%2C%20input)%20%0A%2F%2F%20%3D%3E%20%7Bx%3A%20%5B%7By%3A%201%2C%20z%3A%203%7D%2C%20%7By%3A%204%2C%20z%3A%205%7D%5D%7D%0A%0AR.over(xHeadYLens%2C%20R.negate%2C%20input)%20%0A%2F%2F%20%3D%3E%20%7Bx%3A%20%5B%7By%3A%20-2%2C%20z%3A%203%7D%2C%20%7By%3A%204%2C%20z%3A%205%7D%5D%7D">Try this <strong>R.lensPath</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lensPath</strong> source</summary>

```javascript
import {assocPath} from './assocPath'
import {lens} from './lens'
import {path} from './path'

export function lensPath(key) {
  return lens(path(key), assocPath(key))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { compose } from './compose'
import { identity } from './identity'
import { inc } from './inc'
import { lensPath } from './lensPath'
import { lensProp } from './lensProp'
import { over } from './over'
import { set } from './set'
import { view } from './view'

const testObj = {
  a : [ { b : 1 }, { b : 2 } ],
  d : 3,
}

test('view', () => {
  expect(view(lensPath('d'), testObj)).toEqual(3)
  expect(view(lensPath('a.0.b'), testObj)).toEqual(1)
  // this is different to ramda, as ramda will return a clone of the input object
  expect(view(lensPath(''), testObj)).toEqual(undefined)
})

test('set', () => {
  expect(set(
    lensProp('d'), 0, testObj
  )).toEqual({
    a : [ { b : 1 }, { b : 2 } ],
    d : 0,
  })
  expect(set(
    lensPath('a.0.b'), 0, testObj
  )).toEqual({
    a : [ { b : 0 }, { b : 2 } ],
    d : 3,
  })
  expect(set(
    lensPath('a.0.X'), 0, testObj
  )).toEqual({
    a : [
      {
        b : 1,
        X : 0,
      },
      { b : 2 },
    ],
    d : 3,
  })
  expect(set(
    lensPath([]), 0, testObj
  )).toEqual(0)
})

test('over', () => {
  expect(over(
    lensPath('d'), inc, testObj
  )).toEqual({
    a : [ { b : 1 }, { b : 2 } ],
    d : 4,
  })
  expect(over(
    lensPath('a.1.b'), inc, testObj
  )).toEqual({
    a : [ { b : 1 }, { b : 3 } ],
    d : 3,
  })
  expect(over(
    lensProp('X'), identity, testObj
  )).toEqual({
    a : [ { b : 1 }, { b : 2 } ],
    d : 3,
    X : undefined,
  })
  expect(over(
    lensPath('a.0.X'), identity, testObj
  )).toEqual({
    a : [
      {
        b : 1,
        X : undefined,
      },
      { b : 2 },
    ],
    d : 3,
  })
})

test('compose', () => {
  const composedLens = compose(lensPath('a'), lensPath('1.b'))
  expect(view(composedLens, testObj)).toEqual(2)
})

test('set s (get s) === s', () => {
  expect(set(
    lensPath([ 'd' ]), view(lensPath([ 'd' ]), testObj), testObj
  )).toEqual(testObj)
  expect(set(
    lensPath([ 'a', 0, 'b' ]),
    view(lensPath([ 'a', 0, 'b' ]), testObj),
    testObj
  )).toEqual(testObj)
})

test('get (set s v) === v', () => {
  expect(view(lensPath([ 'd' ]), set(
    lensPath([ 'd' ]), 0, testObj
  ))).toEqual(0)
  expect(view(lensPath([ 'a', 0, 'b' ]), set(
    lensPath([ 'a', 0, 'b' ]), 0, testObj
  ))).toEqual(0)
})

test('get (set(set s v1) v2) === v2', () => {
  const p = [ 'd' ]
  const q = [ 'a', 0, 'b' ]
  expect(view(lensPath(p), set(
    lensPath(p), 11, set(
      lensPath(p), 10, testObj
    )
  ))).toEqual(11)
  expect(view(lensPath(q), set(
    lensPath(q), 11, set(
      lensPath(q), 10, testObj
    )
  ))).toEqual(11)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lensPath)

### lensProp

```typescript

lensProp(prop: string): {
  <T, U>(obj: T): U
```

It returns a lens that focuses on specified property `prop`.

```javascript
const xLens = R.lensProp('x');
const input = {x: 1, y: 2}

R.view(xLens, input) // => 1

R.set(xLens, 4, input) 
// => {x: 4, y: 2}

R.over(xLens, R.negate, input) 
// => {x: -1, y: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20xLens%20%3D%20R.lensProp('x')%3B%0Aconst%20input%20%3D%20%7Bx%3A%201%2C%20y%3A%202%7D%0A%0AR.view(xLens%2C%20input)%20%2F%2F%20%3D%3E%201%0A%0AR.set(xLens%2C%204%2C%20input)%20%0A%2F%2F%20%3D%3E%20%7Bx%3A%204%2C%20y%3A%202%7D%0A%0AR.over(xLens%2C%20R.negate%2C%20input)%20%0A%2F%2F%20%3D%3E%20%7Bx%3A%20-1%2C%20y%3A%202%7D">Try this <strong>R.lensProp</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lensProp</strong> source</summary>

```javascript
import { assoc } from './assoc'
import { lens } from './lens'
import { prop } from './prop'

export function lensProp(key){
  return lens(prop(key), assoc(key))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { compose } from './compose'
import { identity } from './identity'
import { inc } from './inc'
import { lensProp } from './lensProp'
import { over } from './over'
import { set } from './set'
import { view } from './view'

const testObj = {
  a : 1,
  b : 2,
  c : 3,
}

test('focuses object the specified object property', () => {
  expect(view(lensProp('a'), testObj)).toEqual(1)
})

test('returns undefined if the specified property does not exist', () => {
  expect(view(lensProp('X'), testObj)).toEqual(undefined)
})

test('sets the value of the object property specified', () => {
  expect(set(
    lensProp('a'), 0, testObj
  )).toEqual({
    a : 0,
    b : 2,
    c : 3,
  })
})

test('adds the property to the object if it doesn\'t exist', () => {
  expect(set(
    lensProp('d'), 4, testObj
  )).toEqual({
    a : 1,
    b : 2,
    c : 3,
    d : 4,
  })
})

test('applies function to the value of the specified object property', () => {
  expect(over(
    lensProp('a'), inc, testObj
  )).toEqual({
    a : 2,
    b : 2,
    c : 3,
  })
})

test('applies function to undefined and adds the property if it doesn\'t exist', () => {
  expect(over(
    lensProp('X'), identity, testObj
  )).toEqual({
    a : 1,
    b : 2,
    c : 3,
    X : undefined,
  })
})

test('can be composed', () => {
  const nestedObj = {
    a : { b : 1 },
    c : 2,
  }
  const composedLens = compose(lensProp('a'), lensProp('b'))

  expect(view(composedLens, nestedObj)).toEqual(1)
})

test('set s (get s) === s', () => {
  expect(set(
    lensProp('a'), view(lensProp('a'), testObj), testObj
  )).toEqual(testObj)
})

test('get (set s v) === v', () => {
  expect(view(lensProp('a'), set(
    lensProp('a'), 0, testObj
  ))).toEqual(0)
})

test('get (set(set s v1) v2) === v2', () => {
  expect(view(lensProp('a'),
    set(
      lensProp('a'), 11, set(
        lensProp('a'), 10, testObj
      )
    ))).toEqual(11)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lensProp)

### lensSatisfies

```typescript

lensSatisfies<T, U>(predicate: (x: T) => boolean, lens: Lens, input: U): boolean
```

It returns `true` if data structure focused by the given lens satisfies the predicate.

> :boom: Idea for this method comes from `ramda-adjunct` library

```javascript
const fn = R.lensSatisfies(x => x > 5, R.lensIndex(0))
const result = [
  fn([10, 20, 30]),
  fn([1, 2, 3]),
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20R.lensSatisfies(x%20%3D%3E%20x%20%3E%205%2C%20R.lensIndex(0))%0Aconst%20result%20%3D%20%5B%0A%20%20fn(%5B10%2C%2020%2C%2030%5D)%2C%0A%20%20fn(%5B1%2C%202%2C%203%5D)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.lensSatisfies</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.lensSatisfies</strong> source</summary>

```javascript
import { curry } from './curry'
import { view } from './view'

function lensSatisfiesFn(
  predicate, lens, input
){
  return Boolean(predicate(view(lens, input)))
}

export const lensSatisfies = curry(lensSatisfiesFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { lensIndex } from './lensIndex'
import { lensPath } from './lensPath'
import { lensSatisfies } from './lensSatisfies'

const predicate = x => x > 1

test('with list', () => {
  const lens = lensIndex(0)
  const fn = lensSatisfies(predicate, lens)
  expect(fn([ 10, 20, 30 ])).toBeTrue()
  expect(fn([ 1, 2, 3 ])).toBeFalse()
})

test('with R.lensPath', () => {
  const input1 = { a : { b : 10 } }
  const input2 = { a : { b : 1 } }
  const lens = lensPath('a.b')
  const fn = lensSatisfies(predicate, lens)

  expect(fn(input1)).toBeTrue()
  expect(fn(input2)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#lensSatisfies)

### map

```typescript

map<T, U>(fn: ObjectIterator<T, U>, iterable: Dictionary<T>): Dictionary<U>
```

It returns the result of looping through `iterable` with `fn`.

It works with both array and object.

> :boom: Unlike Ramda's `map`, here property and input object are passed as arguments to `fn`, when `iterable` is an object.

```javascript
const fn = x => x * 2
const fnWhenObject = (val, prop)=>{
  return `${prop}-${val}`
}

const iterable = [1, 2]
const obj = {a: 1, b: 2}

const result = [ 
  R.map(fn, list),
  R.map(fnWhenObject, obj)
]
// => [ [1, 4], {a: 'a-1', b: 'b-2'}]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20x%20%3D%3E%20x%20*%202%0Aconst%20fnWhenObject%20%3D%20(val%2C%20prop)%3D%3E%7B%0A%20%20return%20%60%24%7Bprop%7D-%24%7Bval%7D%60%0A%7D%0A%0Aconst%20iterable%20%3D%20%5B1%2C%202%5D%0Aconst%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%7D%0A%0Aconst%20result%20%3D%20%5B%20%0A%20%20R.map(fn%2C%20list)%2C%0A%20%20R.map(fnWhenObject%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5B%20%5B1%2C%204%5D%2C%20%7Ba%3A%20'a-1'%2C%20b%3A%20'b-2'%7D%5D">Try this <strong>R.map</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.map</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { _keys } from './_internals/_keys'

export function mapArray(
  fn, list, isIndexed = false
){
  let index = 0
  const willReturn = Array(list.length)

  while (index < list.length){
    willReturn[ index ] = isIndexed ? fn(list[ index ], index) : fn(list[ index ])

    index++
  }

  return willReturn
}

export function mapObject(fn, obj){
  let index = 0
  const keys = _keys(obj)
  const len = keys.length
  const willReturn = {}

  while (index < len){
    const key = keys[ index ]
    willReturn[ key ] = fn(
      obj[ key ], key, obj
    )
    index++
  }

  return willReturn
}

export const mapObjIndexed = mapObject

export function map(fn, list){
  if (arguments.length === 1) return _list => map(fn, _list)
  if (list === undefined) return []
  if (_isArray(list)) return mapArray(fn, list)

  return mapObject(fn, list)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { map } from './map'

const double = x => x * 2

describe(`with array`, () => {
  test('happy', () => {
    expect(map(double, [ 1, 2, 3 ])).toEqual([ 2, 4, 6 ])
  })

  test('when undefined instead of array', () => {
    /**
     * https://github.com/selfrefactor/rambda/issues/77
     */
    expect(map(double)(undefined)).toEqual([])
  })
})

describe(`with object`, () => {
  const obj = {
    a : 1,
    b : 2,
  }

  test('happy', () => {
    expect(map(double, obj)).toEqual({
      a : 2,
      b : 4,
    })
  })
  test('property as second and input object as third argument', () => {
    const obj = {
      a : 1,
      b : 2,
    }
    const iterator = (
      val, prop, inputObject
    ) => {
      expect(prop).toBeString()
      expect(inputObject).toEqual(obj)
  
      return val * 2
    }
  
    expect(map(iterator)(obj)).toEqual({
      a : 2,
      b : 4,
    })
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#map)

### mapArray

```typescript

mapArray<T>(fn: Iterator<T, T>, iterable: T[]): T[]
```

```javascript
const result = R.mapArray(x => x + 1, [1, 2])
// => [2, 3]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.mapArray(x%20%3D%3E%20x%20%2B%201%2C%20%5B1%2C%202%5D)%0A%2F%2F%20%3D%3E%20%5B2%2C%203%5D">Try this <strong>R.mapArray</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapArray)

### mapAsync

```typescript

mapAsync<T, K>(fn: AsyncIterable<T, K>, list: T[]): Promise<K[]>
```

Sequential asynchronous mapping with `fn` over members of `list`.

```javascript
async function fn(x){
  await R.delay(1000)

  return x+1
}

const result = R.mapAsync(fn, [1, 2, 3])
// `result` resolves after 3 seconds to `[2, 3, 4]`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?async%20function%20fn(x)%7B%0A%20%20await%20R.delay(1000)%0A%0A%20%20return%20x%2B1%0A%7D%0A%0Aconst%20result%20%3D%20R.mapAsync(fn%2C%20%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%60result%60%20resolves%20after%203%20seconds%20to%20%60%5B2%2C%203%2C%204%5D%60">Try this <strong>R.mapAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mapAsync</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

async function mapAsyncFn(fn, listOrObject){
  if (_isArray(listOrObject)){
    const willReturn = []
    let i = 0
    for (const a of listOrObject){
      willReturn.push(await fn(a, i++))
    }

    return willReturn
  }

  const willReturn = {}
  for (const prop in listOrObject){
    willReturn[ prop ] = await fn(listOrObject[ prop ], prop)
  }

  return willReturn
}

export function mapAsync(fn, listOrObject){
  if (arguments.length === 1){
    return async _listOrObject => mapAsyncFn(fn, _listOrObject)
  }

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, listOrObject).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { composeAsync } from './composeAsync'
import { delay } from './delay'
import { map } from './map'
import { mapAsync } from './mapAsync'

const rejectDelay = a =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(a + 20)
    }, 100)
  })

test('happy', async () => {
  const fn = async (x, prop) => {
    await delay(100)
    expect(prop).toBeNumber()

    return x + 1
  }
  const result = await mapAsync(fn, [ 1, 2, 3 ])
  expect(result).toEqual([ 2, 3, 4 ])
})

test('with object', async () => {
  const fn = async (x, prop) => {
    expect(prop).toBeString()

    return x + 1
  }
  const result = await mapAsync(fn, {
    a : 1,
    b : 2,
  })
  expect(result).toEqual({
    a : 2,
    b : 3,
  })
})

test('with R.composeAsync', async () => {
  const result = await composeAsync(
    map(x => x + 1),
    mapAsync(async x => {
      delay(x)

      return x
    }),
    map(x => x * 10)
  )([ 1, 2, 3 ])
  expect(result).toEqual([ 11, 21, 31 ])
})

test('error', async () => {
  try {
    await mapAsync(rejectDelay)([ 1, 2, 3 ])
  } catch (err){
    expect(err).toBe(21)
  }
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapAsync)

### mapAsyncLimit

```typescript

mapAsyncLimit<T, K>(fn: AsyncIterable<T, K>, limit: number, list: T[]): Promise<K[]>
```

It is similar to `R.mapFastAsync` in that it uses `Promise.all` but not over the whole list, rather than with only slice from `list` with length `limit`.

> :boom: For example usage, please check `R.mapAsyncLimit` tests.

<details>

<summary><strong>R.mapAsyncLimit</strong> source</summary>

```javascript
import { mapFastAsync, mapFastAsyncFn } from './mapFastAsync'
import { splitEvery } from './splitEvery'

async function mapAsyncLimitFn(
  iterable, limit, list
){
  if (list.length < limit) return mapFastAsync(iterable, list)

  const slices = splitEvery(limit, list)

  let toReturn = []
  for (const slice of slices){
    const iterableResult = await mapFastAsyncFn(iterable, slice)
    toReturn = [ ...toReturn, ...iterableResult ]
  }

  return toReturn
}

export function mapAsyncLimit(
  iterable, limit, list
){
  if (arguments.length === 2){
    return async _list => mapAsyncLimitFn(
      iterable, limit, _list
    )
  }

  return new Promise((resolve, reject) => {
    mapAsyncLimitFn(
      iterable, limit, list
    ).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import isCI from 'is-ci'

import { composeAsync } from './composeAsync'
import { delay } from './delay'
import { mapAsync } from './mapAsync'
import { mapAsyncLimit } from './mapAsyncLimit'
import { toDecimal } from './toDecimal'

jest.setTimeout(30000)

test('happy', async () => {
  const limit = 3
  const startTime = new Date().getTime()
  const list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  const iterable = async x => {
    await delay(500)

    return x + 1
  }
  const result = await mapAsyncLimit(
    iterable, limit, list
  )
  const endTime = new Date().getTime()
  const diffTime = endTime - startTime

  const startTime2 = new Date().getTime()
  await mapAsync(iterable, list)
  const endTime2 = new Date().getTime()
  const diffTime2 = endTime2 - startTime2

  const methodScale = toDecimal((diffTime2 - diffTime) / 1000, 0)
  expect(result).toEqual([ 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
  if (!isCI) expect(methodScale).toBe(limit)
})

const fn = async x => {
  await delay(100)

  return x + 1
}

test('with R.composeAsync', async () => {
  const result = await composeAsync(mapAsyncLimit(fn, 2), x =>
    x.map(xx => xx + 1))([ 1, 2, 3, 4, 5, 6 ])
  expect(result).toEqual([ 3, 4, 5, 6, 7, 8 ])
})

test('fallback to R.mapFastAsync', async () => {
  const result = await mapAsyncLimit(
    fn, 4, [ 1, 2, 3 ]
  )
  expect(result).toEqual([ 2, 3, 4 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapAsyncLimit)

### mapFastAsync

```typescript

mapFastAsync<T, K>(fn: AsyncIterable<T, K>, list: T[]): Promise<K[]>
```

Parrallel asynchronous mapping with `fn` over members of `list`.

```javascript
async function fn(x){
  await R.delay(1000)

  return x+1
}

const result = R.mapFastAsync(fn, [1, 2, 3])
// `result` resolves after 1 second to `[2, 3, 4]`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?async%20function%20fn(x)%7B%0A%20%20await%20R.delay(1000)%0A%0A%20%20return%20x%2B1%0A%7D%0A%0Aconst%20result%20%3D%20R.mapFastAsync(fn%2C%20%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%60result%60%20resolves%20after%201%20second%20to%20%60%5B2%2C%203%2C%204%5D%60">Try this <strong>R.mapFastAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mapFastAsync</strong> source</summary>

```javascript
export async function mapFastAsyncFn(fn, arr){
  const promised = arr.map((a, i) => fn(a, i))

  return Promise.all(promised)
}

export function mapFastAsync(fn, arr){
  if (arguments.length === 1){
    return async holder => mapFastAsyncFn(fn, holder)
  }

  return new Promise((resolve, reject) => {
    mapFastAsyncFn(fn, arr).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { composeAsync } from './composeAsync'
import { delay } from './delay'
import { map } from './map'
import { mapFastAsync } from './mapFastAsync'

test('happy', async () => {
  const fn = async x => {
    await delay(100)

    return x + 10
  }
  const result = await mapFastAsync(fn, [ 1, 2, 3 ])
  const curriedResult = await mapFastAsync(fn)([ 1, 2, 3 ])
  expect(result).toEqual([ 11, 12, 13 ])
  expect(curriedResult).toEqual([ 11, 12, 13 ])
})

test('composeAsync', async () => {
  const result = await composeAsync(
    mapFastAsync(async x => {
      await delay(100)

      return x + 1
    }),
    mapFastAsync(async x => {
      await delay(100)

      return x + 10
    }),
    map(x => x * 10)
  )([ 1, 2, 3 ])
  expect(result).toEqual([ 21, 31, 41 ])
})

test('error', async () => {
  try {
    const fn = async x => {
      JSON.parse('{:')
    }
    const result = await mapFastAsync(fn, [ 1, 2, 3 ])
  } catch (err){
    expect(err.message).toBe('Unexpected token : in JSON at position 1')
  }
})

test('pass index as second argument', async () => {
  await mapFastAsync((x, i) => {
    expect(x % 10).toBe(0)
    expect(typeof i).toBe('number')
  },
  [ 10, 20, 30 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapFastAsync)

### mapIndexed

Same as `R.map`, but it passes index as second argument to the iterator, when looping over arrays.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapIndexed)

### mapKeys

```typescript

mapKeys<T, U>(changeKeyFn: (x: string) => string, obj: { [key: string]: T}): U
```

It takes an object and returns a new object with changed keys according to `changeKeyFn` function.

```javascript
const obj = {a: 1, b: 2}
const changeKeyFn = prop => `{prop}_foo`
const result = R.mapKeys(changeKeyFn, obj)
// => {a_foo: 1, b_foo: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%7D%0Aconst%20changeKeyFn%20%3D%20prop%20%3D%3E%20%60%7Bprop%7D_foo%60%0Aconst%20result%20%3D%20R.mapKeys(changeKeyFn%2C%20obj)%0A%2F%2F%20%3D%3E%20%7Ba_foo%3A%201%2C%20b_foo%3A%202%7D">Try this <strong>R.mapKeys</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mapKeys</strong> source</summary>

```javascript
export function mapKeys(changeKeyFn, obj){
  if (arguments.length === 1) return _obj => mapKeys(changeKeyFn, _obj)
  const toReturn = {}

  Object.keys(obj).forEach(prop => toReturn[ changeKeyFn(prop) ] = obj[ prop ])

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { mapKeys } from './mapKeys'

const obj = {
  a : 1,
  b : 2,
}
const changeKeyFn = prop => `${ prop }_foo`
const expected = {
  a_foo : 1,
  b_foo : 2,
}

test('happy', () => {
  const result = mapKeys(changeKeyFn, obj)

  expect(result).toEqual(expected)
})

test('curried', () => {
  const result = mapKeys(changeKeyFn)(obj)

  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapKeys)

### mapObject

```typescript

mapObject<T>(fn: ObjectIterator<T, T>, iterable: Dictionary<T>): Dictionary<T>
```

```javascript
const result = R.mapObject(x => x + 1, {a:1, b:2})
// => {a:2, b:3}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.mapObject(x%20%3D%3E%20x%20%2B%201%2C%20%7Ba%3A1%2C%20b%3A2%7D)%0A%2F%2F%20%3D%3E%20%7Ba%3A2%2C%20b%3A3%7D">Try this <strong>R.mapObject</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapObject)

### mapObjIndexed

It works the same way as `R.map` does for objects. It is added as Ramda also has this method.

```javascript
const fn = (val, prop) => {
  return `${prop}-${val}`
}

const obj = {a: 1, b: 2}

const result = R.map(mapObjIndexed, obj)
// => {a: 'a-1', b: 'b-2'}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20(val%2C%20prop)%20%3D%3E%20%7B%0A%20%20return%20%60%24%7Bprop%7D-%24%7Bval%7D%60%0A%7D%0A%0Aconst%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%7D%0A%0Aconst%20result%20%3D%20R.map(mapObjIndexed%2C%20obj)%0A%2F%2F%20%3D%3E%20%7Ba%3A%20'a-1'%2C%20b%3A%20'b-2'%7D">Try this <strong>R.mapObjIndexed</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapObjIndexed)

### mapToObject

```typescript

mapToObject<T, U>(fn: (input: T) => object|false, list: T[]): U
```

This method allows to generate an object from a list using input function `fn`.

This function must return either an object or `false` for every member of `list` input. 

If `false` is returned, then this element of `list` will be skipped in the calculation of the result.

All of returned objects will be merged to generate the final result.

```javascript
const list = [1, 2, 3, 12]
const fn = x => {
  if(x > 10) return false
  return x % 2 ? {[x]: x + 1}: {[x]: x + 10}
}

const result = mapToObject(fn, list)
const expected = {'1': 2, '2': 12, '3': 4}
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%2012%5D%0Aconst%20fn%20%3D%20x%20%3D%3E%20%7B%0A%20%20if(x%20%3E%2010)%20return%20false%0A%20%20return%20x%20%25%202%20%3F%20%7B%5Bx%5D%3A%20x%20%2B%201%7D%3A%20%7B%5Bx%5D%3A%20x%20%2B%2010%7D%0A%7D%0A%0Aconst%20result%20%3D%20mapToObject(fn%2C%20list)%0Aconst%20expected%20%3D%20%7B'1'%3A%202%2C%20'2'%3A%2012%2C%20'3'%3A%204%7D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.mapToObject</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mapToObject</strong> source</summary>

```javascript
import { map } from './map'
import { mergeAll } from './mergeAll'
import { ok } from './ok'
import { type } from './type'

export function mapToObject(fn, list){
  if (arguments.length === 1){
    return listHolder => mapToObject(fn, listHolder)
  }
  ok(type(fn), type(list))('Function', 'Array')

  return mergeAll(map(fn, list))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { mapToObject } from './mapToObject'

const list = [ 1, 2, 3 ]
const fn = x => x % 2 ? { [ x ] : x + 1 } : { [ x ] : x + 10 }
const expected = {
  1 : 2,
  2 : 12,
  3 : 4,
}

test('happy', () => {
  const result = mapToObject(fn, list)
  expect(result).toEqual(expected)
})

test('curried', () => {
  const result = mapToObject(fn)(list)
  expect(result).toEqual(expected)
})

test('string.fn test', () => {
  const list = [ 'auto', 'bar=false', 'foo', 'baz=1.5', 's=more', 'k=2' ]
  const fn = x => {
    const [ key, value ] = x.split('=')
    if (value === undefined || value === 'true'){
      return { [ key ] : true }
    }
    if (value === 'false'){
      return { [ key ] : false }
    }

    if (Number.isNaN(Number(value))){
      return { [ key ] : value }
    }

    return { [ key ] : Number(value) }
  }

  const expectedResult = {
    auto : true,
    foo  : true,
    bar  : false,
    baz  : 1.5,
    s    : 'more',
    k    : 2,
  }
  const result = mapToObject(fn, list)

  expect(result).toEqual(expectedResult)
})

test('bad path', () => {
  expect(() => mapToObject(1, null)).toThrow()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapToObject)

### mapToObjectAsync

```typescript

mapToObjectAsync<T, U>(fn: (input: T) => Promise<object|false>, list: T[]): Promise<U>
```

Asynchronous version of `R.mapToObject`

<details>

<summary><strong>R.mapToObjectAsync</strong> source</summary>

```javascript
import { mapAsync } from './mapAsync'

export async function mapToObjectAsyncFn(fn, list){
  let toReturn = {}

  const innerIterable = async x => {
    const intermediateResult = await fn(x)
    if (intermediateResult === false) return
    toReturn = {
      ...toReturn,
      ...intermediateResult,
    }
  }

  await mapAsync(innerIterable, list)

  return toReturn
}

export function mapToObjectAsync(fn, list){
  if (arguments.length === 1){
    return async _list => mapToObjectAsyncFn(fn, _list)
  }

  return new Promise((resolve, reject) => {
    mapToObjectAsyncFn(fn, list).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { composeAsync } from './composeAsync'
import { delay } from './delay'
import { mapToObjectAsync } from './mapToObjectAsync'

const list = [ 1, 2, 3, 12 ]
const fn = async x => {
  await delay(100)
  if (x > 10) return false

  return x % 2 ? { [ `key${ x }` ] : x + 1 } : { [ `key${ x }` ] : x + 10 }
}

const expected = {
  key1 : 2,
  key2 : 12,
  key3 : 4,
}

test('happy', async () => {
  const result = await mapToObjectAsync(fn, list)
  expect(result).toEqual(expected)
})

test('with R.composeAsync', async () => {
  const result = await composeAsync(mapToObjectAsync(fn), x =>
    x.filter(xx => xx > 1))(list)

  expect(result).toEqual({
    key2 : 12,
    key3 : 4,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mapToObjectAsync)

### match

```typescript

match(regExpression: RegExp, str: string): string[]
```

Curried version of `String.prototype.match` which returns empty array, when there is no match.

```javascript
const result = [
  R.match('a', 'foo'),
  R.match(/([a-z]a)/g, 'bananas')
]
// => [[], ['ba', 'na', 'na']]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.match('a'%2C%20'foo')%2C%0A%20%20R.match(%2F(%5Ba-z%5Da)%2Fg%2C%20'bananas')%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B%5D%2C%20%5B'ba'%2C%20'na'%2C%20'na'%5D%5D">Try this <strong>R.match</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.match</strong> source</summary>

```javascript
export function match(pattern, input){
  if (arguments.length === 1) return _input => match(pattern, _input)

  const willReturn = input.match(pattern)

  return willReturn === null ? [] : willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { equals } from './equals'
import { match } from './match'

test('happy', () => {
  expect(match(/a./g)('foo bar baz')).toEqual([ 'ar', 'az' ])
})

test('fallback', () => {
  expect(match(/a./g)('foo')).toEqual([])
})

test('with string', () => {
  expect(match('a', 'foo')).toEqual([])
  expect(equals(match('o', 'foo'), [ 'o' ])).toBeTrue()
})

test('throwing', () => {
  expect(() => {
    match(/a./g, null)
  }).toThrowWithMessage(TypeError, 'Cannot read property \'match\' of null')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#match)

### mathMod

`R.mathMod` behaves like the modulo operator should mathematically, unlike the `%` operator (and by extension, `R.modulo`). So while `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`.

> :boom: Explanation is taken from `Ramda` documentation site.

```javascript
const result = [
  R.mathMod(-17, 5),
  R.mathMod(17, 5),
  R.mathMod(17, -5),  
  R.mathMod(17, 0)   
]
// => [3, 2, NaN, NaN]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.mathMod(-17%2C%205)%2C%0A%20%20R.mathMod(17%2C%205)%2C%0A%20%20R.mathMod(17%2C%20-5)%2C%20%20%0A%20%20R.mathMod(17%2C%200)%20%20%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B3%2C%202%2C%20NaN%2C%20NaN%5D">Try this <strong>R.mathMod</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mathMod)

### max

```typescript

max<T extends Ord>(x: T, y: T): T
```

It returns the greater value between `x` and `y`.

```javascript
const result = [
  R.max(5, 7),  
  R.max('bar', 'foo'),  
]
// => [7, 'foo']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.max(5%2C%207)%2C%20%20%0A%20%20R.max('bar'%2C%20'foo')%2C%20%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B7%2C%20'foo'%5D">Try this <strong>R.max</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.max</strong> source</summary>

```javascript
export function max(x, y){
  if (arguments.length === 1) return _y => max(x, _y)

  return y > x ? y : x
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { max } from './max'

test('with number', () => {
  expect(max(2, 1)).toBe(2)
})

test('with string', () => {
  expect(max('foo')('bar')).toBe('foo')
  expect(max('bar')('baz')).toBe('baz')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#max)

### maxBy

```typescript

maxBy<T>(compareFn: (input: T) => Ord, x: T, y: T): T
```

It returns the greater value between `x` and `y` according to `compareFn` function.

```javascript
const compareFn = Math.abs

R.maxBy(compareFn, 5, -7) // => -7
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20compareFn%20%3D%20Math.abs%0A%0AR.maxBy(compareFn%2C%205%2C%20-7)%20%2F%2F%20%3D%3E%20-7">Try this <strong>R.maxBy</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.maxBy</strong> source</summary>

```javascript
import { curry } from './curry'

export function maxByFn(
  compareFn, x, y
){
  return compareFn(y) > compareFn(x) ? y : x
}

export const maxBy = curry(maxByFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { maxBy } from './maxBy'

test('happy', () => {
  expect(maxBy(
    Math.abs, -5, 2
  )).toEqual(-5)
})

test('curried', () => {
  expect(maxBy(Math.abs)(2, -5)).toEqual(-5)
  expect(maxBy(Math.abs)(2)(-5)).toEqual(-5)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#maxBy)

### maybe

```typescript

maybe<T>(ifRule: boolean, whenIf: T | Func<T>, whenElse: T | Func<T>): T
```

It acts as ternary operator and it is helpful when we have nested ternaries. 

All of the inputs can be either direct values or anonymous functions. This is helpful if we don't want to evaluate certain paths as we can wrap this logic in a function.

```javascript
const x = 4
const y = 8

const ifRule = x > 2
const whenIf = y > 10 ? 3 : 7
const whenElse = () => {
  // just to show that it won't be evaluated
  return JSON.parse('{a:')
}

const result = R.maybe(
  ifRule,
  whenIf,
  whenElse,
)
// `result` is `7`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20x%20%3D%204%0Aconst%20y%20%3D%208%0A%0Aconst%20ifRule%20%3D%20x%20%3E%202%0Aconst%20whenIf%20%3D%20y%20%3E%2010%20%3F%203%20%3A%207%0Aconst%20whenElse%20%3D%20()%20%3D%3E%20%7B%0A%20%20%2F%2F%20just%20to%20show%20that%20it%20won't%20be%20evaluated%0A%20%20return%20JSON.parse('%7Ba%3A')%0A%7D%0A%0Aconst%20result%20%3D%20R.maybe(%0A%20%20ifRule%2C%0A%20%20whenIf%2C%0A%20%20whenElse%2C%0A)%0A%2F%2F%20%60result%60%20is%20%607%60">Try this <strong>R.maybe</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.maybe</strong> source</summary>

```javascript
import { type } from './type'

export function maybe(
  ifRule, whenIf, whenElse
){
  const whenIfInput =
    ifRule && type(whenIf) === 'Function' ? whenIf() : whenIf

  const whenElseInput =
    !ifRule && type(whenElse) === 'Function' ? whenElse() : whenElse

  return ifRule ? whenIfInput : whenElseInput
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { maybe } from './maybe'

const WHEN_IF = 'WHEN_IF'
const WHEN_ELSE = 'WHEN_ELSE'

test('prevent type error', () => {
  const x = 5
  const y = null
  const ifRule = x > 3

  const result = maybe(
    ifRule, WHEN_IF, () => y.a === 'foo'
  )

  expect(result).toBe(WHEN_IF)
})

test('whenElse is a function', () => {
  const x = 2
  const y = { a : 1 }
  const ifRule = x > 3

  const result = maybe(
    ifRule, WHEN_IF, () => y.a === 'foo'
  )

  expect(result).toBeFalse()
})

test('whenIf', () => {
  const x = 5
  const ifRule = x > 3

  const result = maybe(
    ifRule, WHEN_IF, WHEN_ELSE
  )

  expect(result).toBe(WHEN_IF)
})

test('whenIf is a function', () => {
  const x = 5
  const ifRule = () => x > 3

  const result = maybe(
    ifRule, () => WHEN_IF, WHEN_ELSE
  )

  expect(result).toBe(WHEN_IF)
})

test('whenElse', () => {
  const x = 1
  const ifRule = x > 3

  const result = maybe(
    ifRule, WHEN_IF, WHEN_ELSE
  )

  expect(result).toBe(WHEN_ELSE)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#maybe)

### mean

```typescript

mean(list: number[]): number
```

It returns the mean value of `list` input.

```javascript
R.mean([ 2, 7 ])
// => 4.5
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.mean(%5B%202%2C%207%20%5D)%0A%2F%2F%20%3D%3E%204.5">Try this <strong>R.mean</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mean</strong> source</summary>

```javascript
import { sum } from './sum'

export function mean(list){
  return sum(list) / list.length
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { mean } from './mean'

test('happy', () => {
  expect(mean([ 2, 7 ])).toBe(4.5)
})

test('with NaN', () => {
  expect(mean([])).toBeNaN()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mean)

### median

```typescript

median(list: number[]): number
```

It returns the median value of `list` input.

```javascript
R.median([ 7, 2, 10, 9 ]) // => 8
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.median(%5B%207%2C%202%2C%2010%2C%209%20%5D)%20%2F%2F%20%3D%3E%208">Try this <strong>R.median</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.median</strong> source</summary>

```javascript
import { mean } from './mean'

export function median(list){
  const len = list.length
  if (len === 0) return NaN
  const width = 2 - len % 2
  const idx = (len - width) / 2

  return mean(Array.prototype.slice
    .call(list, 0)
    .sort((a, b) => {
      if (a === b) return 0

      return a < b ? -1 : 1
    })
    .slice(idx, idx + width))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { median } from './median'

test('happy', () => {
  expect(median([ 2 ])).toEqual(2)
  expect(median([ 7, 2, 10, 2, 9 ])).toEqual(7)
})

test('with empty array', () => {
  expect(median([])).toBeNaN()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#median)

### memoize

```typescript

memoize<T, K extends any[]>(fn: (...inputs: K) => T): (...inputs: K) => T
```

When `fn` is called for a second time with the same input, then the cache result is returned instead of calling again `fn`.

```javascript
let result = 0
const fn = (a,b) =>{
  result++

  return a + b
}
const memoized = R.memoize(fn)
memoized(1, 2)
memoized(1, 2)

// => `result` is equal to `1`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20let%20result%20%3D%200%0Aconst%20fn%20%3D%20(a%2Cb)%20%3D%3E%7B%0A%20%20result%2B%2B%0A%0A%20%20return%20a%20%2B%20b%0A%7D%0Aconst%20memoized%20%3D%20R.memoize(fn)%0Amemoized(1%2C%202)%0Amemoized(1%2C%202)%0A%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%601%60">Try this <strong>R.memoize</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.memoize</strong> source</summary>

```javascript
import { compose } from './compose'
import { map } from './map'
import { replace } from './replace'
import { sort } from './sort'
import { take } from './take'
import { type } from './type'

const cache = {}

const normalizeObject = obj => {
  const sortFn = (a, b) => a > b ? 1 : -1
  const willReturn = {}
  compose(map(prop => willReturn[ prop ] = obj[ prop ]),
    sort(sortFn))(Object.keys(obj))

  return willReturn
}

const stringify = a => {
  if (type(a) === 'String'){
    return a
  } else if ([ 'Function', 'Async' ].includes(type(a))){
    const compacted = replace(
      /\s{1,}/g, ' ', a.toString()
    )

    return replace(
      /\s/g, '_', take(15, compacted)
    )
  } else if (type(a) === 'Object'){
    return JSON.stringify(normalizeObject(a))
  }

  return JSON.stringify(a)
}

const generateProp = (fn, ...inputArguments) => {
  let propString = ''
  inputArguments.forEach(inputArgument => {
    propString += `${ stringify(inputArgument) }_`
  })

  return `${ propString }${ stringify(fn) }`
}
// with weakmaps
export function memoize(fn, ...inputArguments){
  if (arguments.length === 1){
    return (...inputArgumentsHolder) => memoize(fn, ...inputArgumentsHolder)
  }

  const prop = generateProp(fn, ...inputArguments)
  if (prop in cache) return cache[ prop ]

  if (type(fn) === 'Async'){
    return new Promise(resolve => {
      fn(...inputArguments).then(result => {
        cache[ prop ] = result
        resolve(result)
      })
    })
  }

  const result = fn(...inputArguments)
  cache[ prop ] = result

  return result
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { memoize } from './memoize'

test('memoize function without input arguments', () => {
  const fn = () => 4
  const memoized = memoize(fn)
  expect(typeof memoized()).toBe('function')
})

test('happy', () => {
  let counter = 0

  const fn = ({ a, b, c }) => {
    counter++

    return a + b - c
  }
  const memoized = memoize(fn)
  expect(memoized({
    a : 1,
    c : 3,
    b : 2,
  })).toBe(0)
  expect(counter).toBe(1)
  expect(memoized({
    c : 3,
    a : 1,
    b : 2,
  })).toBe(0)
  expect(counter).toBe(1)
})

test('normal function', () => {
  let counter = 0
  const fn = (a, b) => {
    counter++

    return a + b
  }
  const memoized = memoize(fn)
  expect(memoized(1, 2)).toBe(3)
  expect(memoized(1, 2)).toBe(3)
  expect(memoized(1, 2)).toBe(3)
  expect(counter).toBe(1)
  expect(memoized(2, 2)).toBe(4)
  expect(counter).toBe(2)
  expect(memoized(1, 2)).toBe(3)
  expect(counter).toBe(2)
})

test('async function', async () => {
  let counter = 0
  const delay = ms =>
    new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  const fn = async (
    ms, a, b
  ) => {
    await delay(ms)
    counter++

    return a + b
  }

  const memoized = memoize(fn)
  expect(await memoized(
    100, 1, 2
  )).toBe(3)
  expect(await memoized(
    100, 1, 2
  )).toBe(3)
  expect(await memoized(
    100, 1, 2
  )).toBe(3)
  expect(counter).toBe(1)
  expect(await memoized(
    100, 2, 2
  )).toBe(4)
  expect(counter).toBe(2)
  expect(await memoized(
    100, 1, 2
  )).toBe(3)
  expect(counter).toBe(2)
})

test('string as argument', () => {
  let count = 0
  const foo = 'foo'
  const tester = memoize(n => {
    count++

    return `${ n }bar`
  })
  tester(foo)
  tester(foo)
  tester(foo)

  expect(tester(foo)).toEqual('foobar')

  expect(count).toEqual(1)

  tester('baz')

  expect(tester('baz')).toEqual('bazbar')

  expect(count).toEqual(2)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#memoize)

### merge

```typescript

merge<Output>(target: object, newProps: object): Output
```

It creates a copy of `target` object with overidden `newProps` properties.

```javascript
const target = { 'foo': 0, 'bar': 1 }
const newProps = { 'foo': 7 }

const result = R.merge(target, newProps)
// => { 'foo': 7, 'bar': 1 }
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20target%20%3D%20%7B%20'foo'%3A%200%2C%20'bar'%3A%201%20%7D%0Aconst%20newProps%20%3D%20%7B%20'foo'%3A%207%20%7D%0A%0Aconst%20result%20%3D%20R.merge(target%2C%20newProps)%0A%2F%2F%20%3D%3E%20%7B%20'foo'%3A%207%2C%20'bar'%3A%201%20%7D">Try this <strong>R.merge</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.merge</strong> source</summary>

```javascript
export function merge(target, newProps){
  if (arguments.length === 1) return _newProps => merge(target, _newProps)

  return Object.assign(
    {}, target || {}, newProps || {}
  )
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { merge } from './merge'

const obj = {
  foo : 1,
  bar : 2,
}

test('happy', () => {
  expect(merge(obj, { bar : 20 })).toEqual({
    foo : 1,
    bar : 20,
  })
})

test('curry', () => {
  expect(merge(obj)({ baz : 3 })).toEqual({
    foo : 1,
    bar : 2,
    baz : 3,
  })
})

/**
 * https://github.com/selfrefactor/rambda/issues/77
 */
test('when undefined or null instead of object', () => {
  expect(merge(null, undefined)).toEqual({})
  expect(merge(obj, null)).toEqual(obj)
  expect(merge(obj, undefined)).toEqual(obj)
  expect(merge(undefined, obj)).toEqual(obj)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#merge)

### mergeAll

```typescript

mergeAll<T>(list: object[]): T
```

It merges all objects of `list` array sequentially and returns the result.

```javascript
const list = [
  {a: 1},
  {b: 2},
  {c: 3}
]
const result = R.mergeAll(list)
const expected = {
  a: 1,
  b: 2,
  c: 3
}
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%0A%20%20%7Ba%3A%201%7D%2C%0A%20%20%7Bb%3A%202%7D%2C%0A%20%20%7Bc%3A%203%7D%0A%5D%0Aconst%20result%20%3D%20R.mergeAll(list)%0Aconst%20expected%20%3D%20%7B%0A%20%20a%3A%201%2C%0A%20%20b%3A%202%2C%0A%20%20c%3A%203%0A%7D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.mergeAll</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mergeAll</strong> source</summary>

```javascript
import { map } from './map'
import { merge } from './merge'

export function mergeAll(arr){
  let willReturn = {}
  map(val => {
    willReturn = merge(willReturn, val)
  }, arr)

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { mergeAll } from './mergeAll'

test('case 1', () => {
  const arr = [ { a : 1 }, { b : 2 }, { c : 3 } ]
  const expectedResult = {
    a : 1,
    b : 2,
    c : 3,
  }
  expect(mergeAll(arr)).toEqual(expectedResult)
})

test('case 2', () => {
  expect(mergeAll([ { foo : 1 }, { bar : 2 }, { baz : 3 } ])).toEqual({
    foo : 1,
    bar : 2,
    baz : 3,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mergeAll)

### mergeDeepRight

```typescript

mergeDeepRight<Output>(target: object, newProps: object): Output
```

Creates a new object with the own properties of the first object merged with the own properties of the second object. If a key exists in both objects:

  - and both values are objects, the two values will be recursively merged
  - otherwise the value from the second object will be used.

<details>

<summary><strong>R.mergeDeepRight</strong> source</summary>

```javascript
import { type } from './type'

export function mergeDeepRight(target, source){
  if (arguments.length === 1){
    return sourceHolder => mergeDeepRight(target, sourceHolder)
  }

  const willReturn = JSON.parse(JSON.stringify(target))

  Object.keys(source).forEach(key => {
    if (type(source[ key ]) === 'Object'){
      if (type(target[ key ]) === 'Object'){
        willReturn[ key ] = mergeDeepRight(target[ key ], source[ key ])
      } else {
        willReturn[ key ] = source[ key ]
      }
    } else {
      willReturn[ key ] = source[ key ]
    }
  })

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
// import { mergeDeepRight } from 'ramda'
import { mergeDeepRight } from './mergeDeepRight'

const slave = {
  name    : 'evilMe',
  age     : 10,
  contact : {
    a     : 1,
    email : 'foo@example.com',
  },
}
const master = {
  age     : 40,
  contact : { email : 'baz@example.com' },
  songs   : { title : 'Remains the same' },
}

test('happy', () => {
  const result = mergeDeepRight(slave, master)
  const curryResult = mergeDeepRight(slave)(master)
  const expected = {
    age     : 40,
    name    : 'evilMe',
    contact : {
      a     : 1,
      email : 'baz@example.com',
    },
    songs : { title : 'Remains the same' },
  }

  expect(result).toEqual(expected)
  expect(curryResult).toEqual(expected)
})

test('ramda compatible test 1', () => {
  const a = {
    w : 1,
    x : 2,
    y : { z : 3 },
  }
  const b = {
    a : 4,
    b : 5,
    c : { d : 6 },
  }
  const result = mergeDeepRight(a, b)
  const expected = {
    w : 1,
    x : 2,
    y : { z : 3 },
    a : 4,
    b : 5,
    c : { d : 6 },
  }

  expect(result).toEqual(expected)
})

test('ramda compatible test 2', () => {
  const a = {
    a : {
      b : 1,
      c : 2,
    },
    y : 0,
  }
  const b = {
    a : {
      b : 3,
      d : 4,
    },
    z : 0,
  }
  const result = mergeDeepRight(a, b)
  const expected = {
    a : {
      b : 3,
      c : 2,
      d : 4,
    },
    y : 0,
    z : 0,
  }

  expect(result).toEqual(expected)
})

test('ramda compatible test 3', () => {
  const a = {
    w : 1,
    x : { y : 2 },
  }
  const result = mergeDeepRight(a, { x : { y : 3 } })
  const expected = {
    w : 1,
    x : { y : 3 },
  }
  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mergeDeepRight)

### mergeLeft

```typescript

mergeLeft<Output>(newProps: object, target: object): Output
```

Same as `R.merge`, but in opposite direction.

```javascript
const result = R.mergeLeft(
  {a: 10},
  {a: 1, b: 2}
)
// => {a:10, b: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.mergeLeft(%0A%20%20%7Ba%3A%2010%7D%2C%0A%20%20%7Ba%3A%201%2C%20b%3A%202%7D%0A)%0A%2F%2F%20%3D%3E%20%7Ba%3A10%2C%20b%3A%202%7D">Try this <strong>R.mergeLeft</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.mergeLeft</strong> source</summary>

```javascript
import { merge } from './merge'

export function mergeLeft(x, y){
  if (arguments.length === 1) return _y => mergeLeft(x, _y)

  return merge(y, x)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { mergeLeft } from './mergeLeft'

const obj = {
  foo : 1,
  bar : 2,
}

test('happy', () => {
  expect(mergeLeft({ bar : 20 }, obj)).toEqual({
    foo : 1,
    bar : 20,
  })
})

test('curry', () => {
  expect(mergeLeft({ baz : 3 })(obj)).toEqual({
    foo : 1,
    bar : 2,
    baz : 3,
  })
})

test('when undefined or null instead of object', () => {
  expect(mergeLeft(null, undefined)).toEqual({})
  expect(mergeLeft(obj, null)).toEqual(obj)
  expect(mergeLeft(obj, undefined)).toEqual(obj)
  expect(mergeLeft(undefined, obj)).toEqual(obj)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#mergeLeft)

### min

```typescript

min<T extends Ord>(x: T, y: T): T
```

It returns the lesser value between `x` and `y`.

```javascript
const result = [
  R.min(5, 7),  
  R.min('bar', 'foo'),  
]
// => [5, 'bar']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.min(5%2C%207)%2C%20%20%0A%20%20R.min('bar'%2C%20'foo')%2C%20%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B5%2C%20'bar'%5D">Try this <strong>R.min</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.min</strong> source</summary>

```javascript
export function min(x, y){
  if (arguments.length === 1) return _y => min(x, _y)

  return y < x ? y : x
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { min } from './min'

test('happy', () => {
  expect(min(2, 1)).toBe(1)
  expect(min(1)(2)).toBe(1)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#min)

### minBy

```typescript

minBy<T>(compareFn: (input: T) => Ord, x: T, y: T): T
```

It returns the lesser value between `x` and `y` according to `compareFn` function.

```javascript
const compareFn = Math.abs

R.minBy(compareFn, -5, 2) // => -5
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20compareFn%20%3D%20Math.abs%0A%0AR.minBy(compareFn%2C%20-5%2C%202)%20%2F%2F%20%3D%3E%20-5">Try this <strong>R.minBy</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.minBy</strong> source</summary>

```javascript
import { curry } from './curry'

export function minByFn(
  compareFn, x, y
){
  return compareFn(y) < compareFn(x) ? y : x
}

export const minBy = curry(minByFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { minBy } from './minBy'

test('happy', () => {
  expect(minBy(
    Math.abs, -5, 2
  )).toEqual(2)
})

test('curried', () => {
  expect(minBy(Math.abs)(2, -5)).toEqual(2)
  expect(minBy(Math.abs)(2)(-5)).toEqual(2)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#minBy)

### modulo

Curried version of `x%y`.

```javascript
R.modulo(17, 3) // => 2
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.modulo(17%2C%203)%20%2F%2F%20%3D%3E%202">Try this <strong>R.modulo</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#modulo)

### move

```typescript

move<T>(fromIndex: number, toIndex: number, list: T[]): T[]
```

It returns a copy of `list` with exchanged `fromIndex` and `toIndex` elements.

> :boom: Rambda.move doesn't support negative indexes - it throws an error.

```javascript
const list = [1, 2, 3]
const result = R.move(0, 1, list)
// => [2, 1, 3]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0Aconst%20result%20%3D%20R.move(0%2C%201%2C%20list)%0A%2F%2F%20%3D%3E%20%5B2%2C%201%2C%203%5D">Try this <strong>R.move</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.move</strong> source</summary>

```javascript
import { curry } from './curry'

function moveFn(
  fromIndex, toIndex, list
){
  if (fromIndex < 0 || toIndex < 0){
    throw new Error('Rambda.move does not support negative indexes')
  }
  if (fromIndex > list.length - 1 || toIndex > list.length - 1) return list

  const clone = list.slice()
  clone[ fromIndex ] = list[ toIndex ]
  clone[ toIndex ] = list[ fromIndex ]

  return clone
}

export const move = curry(moveFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { move } from './move'
const list = [ 1, 2, 3, 4 ]

test('happy', () => {
  const result = move(
    0, 1, list
  )

  expect(result).toEqual([ 2, 1, 3, 4 ])
})

test('with negative index', () => {
  const errorMessage = 'Rambda.move does not support negative indexes'
  expect(() => move(
    0, -1, list
  )).toThrowWithMessage(Error, errorMessage)
  expect(() => move(
    -1, 0, list
  )).toThrowWithMessage(Error, errorMessage)
})

test('when indexes are outside the list outbounds', () => {
  const result1 = move(
    10, 1, list
  )
  const result2 = move(
    1, 10, list
  )

  expect(result1).toEqual(list)
  expect(result2).toEqual(list)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#move)

### multiply

Curried version of `x*y`.

```javascript
R.multiply(2, 4) // => 8
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.multiply(2%2C%204)%20%2F%2F%20%3D%3E%208">Try this <strong>R.multiply</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#multiply)

### negate

```javascript
R.negate(420)// => -420
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.negate(420)%2F%2F%20%3D%3E%20-420">Try this <strong>R.negate</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#negate)

### nextIndex

```typescript

nextIndex(index: number, list: any[]): number
```

It returns the next index of the list.

If we have reached the end of the list, then it will return `0`.

```javascript
const list = [1, 2, 3]

const result = [
  R.nextIndex(0, list),
  R.nextIndex(1, list),
  R.nextIndex(2, list),
  R.nextIndex(10, list)
]
// => [1, 2, 0, 0]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.nextIndex(0%2C%20list)%2C%0A%20%20R.nextIndex(1%2C%20list)%2C%0A%20%20R.nextIndex(2%2C%20list)%2C%0A%20%20R.nextIndex(10%2C%20list)%0A%5D%0A%2F%2F%20%3D%3E%20%5B1%2C%202%2C%200%2C%200%5D">Try this <strong>R.nextIndex</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.nextIndex</strong> source</summary>

```javascript
export function nextIndex(index, list){
  return index >= list.length - 1 ? 0 : index + 1
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { nextIndex } from './nextIndex'

const list = [ 1, 2, 3, 4 ]

test('happy path', () => {
  expect(nextIndex(2, list)).toEqual(3)
})

test('go back to the start', () => {
  expect(nextIndex(3, list)).toEqual(0)
})

test('current index is too big', () => {
  expect(nextIndex(32, list)).toEqual(0)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#nextIndex)

### none

```typescript

none<T>(predicate: (x: T) => boolean, list: T[]): boolean
```

It returns `true`, if all members of array `list` returns `false`, when applied as argument to `predicate` function.

```javascript
const list = [ 0, 1, 2, 3, 4 ]
const predicate = x => x > 6

const result = R.none(predicate, arr)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%200%2C%201%2C%202%2C%203%2C%204%20%5D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3E%206%0A%0Aconst%20result%20%3D%20R.none(predicate%2C%20arr)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.none</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.none</strong> source</summary>

```javascript
export function none(predicate, list){
  if (arguments.length === 1) return _list => none(predicate, _list)

  for (let i = 0; i < list.length; i++){
    if (!predicate(list[ i ])) return true
  }

  return false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { none } from './none'

const isEven = n => n % 2 === 0
const isOdd = n => n % 2 === 1
const arr = [ 1, 3, 5, 7, 9, 11 ]

test('when true', () => {
  expect(none(isEven, arr)).toBeTrue()
})

test('when false curried', () => {
  expect(none(isOdd)(arr)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#none)

### not

```typescript

not(input: any): boolean
```

It returns a boolean negated version of `input`.

```javascript
R.not(false) // true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.not(false)%20%2F%2F%20true">Try this <strong>R.not</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.not</strong> source</summary>

```javascript
export function not(input){
  return !input
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { not } from './not'

test('not', () => {
  expect(not(false)).toEqual(true)
  expect(not(true)).toEqual(false)
  expect(not(0)).toEqual(true)
  expect(not(1)).toEqual(false)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#not)

### nth

```typescript

nth<T>(index: number, list: T[]): T | undefined
```

Curried version of `list[index]`.

```javascript
const list = [1, 2, 3]
const str = 'foo'

const result = [
  R.nth(2, list),
  R.nth(6, list),
  R.nth(0, str),
]
// => [3, undefined, 'f']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0Aconst%20str%20%3D%20'foo'%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.nth(2%2C%20list)%2C%0A%20%20R.nth(6%2C%20list)%2C%0A%20%20R.nth(0%2C%20str)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B3%2C%20undefined%2C%20'f'%5D">Try this <strong>R.nth</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.nth</strong> source</summary>

```javascript
export function nth(index, list){
  if (arguments.length === 1) return _list => nth(index, _list)

  const idx = index < 0 ? list.length + index : index

  return Object.prototype.toString.call(list) === '[object String]' ?
    list.charAt(idx) :
    list[ idx ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { nth } from './nth'

test('happy', () => {
  expect(nth(2, [ 1, 2, 3, 4 ])).toEqual(3)
})

test('with curry', () => {
  expect(nth(2)([ 1, 2, 3, 4 ])).toEqual(3)
})

test('with string', () => {
  expect(nth(2)('foo')).toEqual('o')
})

test('with negative index', () => {
  expect(nth(-3)([ 1, 2, 3, 4 ])).toEqual(2)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#nth)

### objOf

It creates an object with a single key-value pair.

```javascript
const result = R.objOf('foo', 'bar')
// => {foo: 'bar'}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.objOf('foo'%2C%20'bar')%0A%2F%2F%20%3D%3E%20%7Bfoo%3A%20'bar'%7D">Try this <strong>R.objOf</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#objOf)

### of

```typescript

of<T>(x: T): T[]
```

```javascript
R.of(null); // => [null]
R.of([42]); // => [[42]]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.of(null)%3B%20%2F%2F%20%3D%3E%20%5Bnull%5D%0AR.of(%5B42%5D)%3B%20%2F%2F%20%3D%3E%20%5B%5B42%5D%5D">Try this <strong>R.of</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.of</strong> source</summary>

```javascript
export function of(value){
  return [ value ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { of } from './of'

test('happy', () => {
  expect(of(3)).toEqual([ 3 ])

  expect(of(null)).toEqual([ null ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#of)

### ok

```typescript

ok(...inputs: any[]): (...schemas: any[]) => void | never
```

It checks if `inputs` are following `schemas` specifications according to `R.isValid`.

If validation fails, it throws.

> :boom: It is same as `R.pass` but instead of returning `false`, it throws an error.

```javascript
const result = R.ok(
  1,
  ['foo', 'bar']
)(
  Number,
  [String]
)
// => undefined
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.ok(%0A%20%201%2C%0A%20%20%5B'foo'%2C%20'bar'%5D%0A)(%0A%20%20Number%2C%0A%20%20%5BString%5D%0A)%0A%2F%2F%20%3D%3E%20undefined">Try this <strong>R.ok</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.ok</strong> source</summary>

```javascript
import { any } from './any'
import { glue } from './glue'
import { fromPrototypeToString, isValid } from './isValid'
import { map } from './map'
import { type } from './type'

export function schemaToString(schema){
  if (type(schema) !== 'Object'){
    return fromPrototypeToString(schema).rule
  }

  return map(x => {
    const { rule, parsed } = fromPrototypeToString(x)
    const xType = type(x)

    if (xType === 'Function' && !parsed) return 'Function'

    return parsed ? rule : xType
  }, schema)
}

export function check(singleInput, schema){
  return isValid({
    input  : { singleInput },
    schema : { singleInput : schema },
  })
}

export function ok(...inputs){
  return (...schemas) => {
    let failedSchema

    const anyError = any((singleInput, i) => {
      const schema = schemas[ i ] === undefined ? schemas[ 0 ] : schemas[ i ]

      const checked = check(singleInput, schema)
      if (!checked){
        failedSchema = JSON.stringify({
          input  : singleInput,
          schema : schemaToString(schema),
        })
      }

      return !checked
    }, inputs)

    if (anyError){
      const errorMessage =
        inputs.length > 1 ?
          glue(`
        Failed R.ok -
        reason: ${ failedSchema }
        all inputs: ${ JSON.stringify(inputs) }
        all schemas: ${ JSON.stringify(schemas.map(schemaToString)) }
      `,
          '\n') :
          `Failed R.ok - ${ failedSchema }`

      throw new Error(errorMessage)
    }
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { ok, schemaToString } from './ok'

test('happy', () => {
  expect(() => {
    ok(
      1, 'foo', {}
    )(
      'number', 'string', 'object'
    )
  }).not.toThrow()
})

test('when validation fails', () => {
  const errorMessage = `Failed R.ok -
reason: {"input":{},"schema":"string"}
all inputs: [1,"foo",{}]
all schemas: ["number","string","string"]`

  expect(() =>
    ok(
      1, 'foo', {}
    )(
      'number', 'string', 'string'
    )).toThrowWithMessage(Error, errorMessage)
})

/*
  TODO
  What about
  {a: Function}
*/
test('schema in error message', () => {
  const result = schemaToString({
    _a : [ Number ],
    a  : Number,
    b  : x => x > 2,
    c  : [ 'foo', 'bar' ],
    d  : [ { a : String } ],
    e  : 'boolean',
    f  : Array,
    h  : Object,
  })

  expect(result).toMatchInlineSnapshot(`
    Object {
      "_a": "Array",
      "a": "number",
      "b": "Function",
      "c": "Array",
      "d": "Array",
      "e": "String",
      "f": "array",
      "h": "object",
    }
  `)
})

test('error contains schema', () => {
  try {
    ok(
      1, 'foo', {}
    )(
      { a : Number }, String, String
    )
    expect(false).toBeTrue()
  } catch (e){
    expect(e.message.startsWith('Failed R.ok -')).toBeTruthy()
    expect(e).toBeInstanceOf(Error)
  }
})

test('when not throws with single schema', () => {
  expect(() => ok(
    1, 2, 3
  )('number')).not.toThrow()
})

test('when throws with single schema', () => {
  expect(() => ok(
    1, 2, '3'
  )('number')).toThrow()
})

test('when throws with single input', () => {
  expect(() => ok('3')('number')).toThrow()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#ok)

### omit

```typescript

omit<T, K extends string>(propsToOmit: K[], obj: T): Omit<T, K>
```

It returns a partial copy of an `obj` without `propsToOmit` properties.

> :boom: When using this method with `TypeScript`, it is much easier to pass `propsToOmit` as an array. If passing a string, you will need to explicitly declare the output type.

```javascript
const obj = {a: 1, b: 2, c: 3}
const propsToOmit = 'a,c,d'
const propsToOmitList = ['a', 'c', 'd']

const result = [
  R.omit(propsToOmit, obj), 
  R.omit(propsToOmitList, obj) 
]
// => [{b: 2}, {b: 2}]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D%0Aconst%20propsToOmit%20%3D%20'a%2Cc%2Cd'%0Aconst%20propsToOmitList%20%3D%20%5B'a'%2C%20'c'%2C%20'd'%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.omit(propsToOmit%2C%20obj)%2C%20%0A%20%20R.omit(propsToOmitList%2C%20obj)%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B%7Bb%3A%202%7D%2C%20%7Bb%3A%202%7D%5D">Try this <strong>R.omit</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.omit</strong> source</summary>

```javascript
export function omit(propsToOmit, obj){
  if (arguments.length === 1) return _obj => omit(propsToOmit, _obj)

  if (obj === null || obj === undefined){
    return undefined
  }

  const propsToOmitValue =
    typeof propsToOmit === 'string' ? propsToOmit.split(',') : propsToOmit

  const willReturn = {}

  for (const key in obj){
    if (!propsToOmitValue.includes(key)){
      willReturn[ key ] = obj[ key ]
    }
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { omit } from './omit'

test('with string as condition', () => {
  const obj = {
    a : 1,
    b : 2,
    c : 3,
  }
  const result = omit('a,c', obj)
  const resultCurry = omit('a,c')(obj)
  const expectedResult = { b : 2 }

  expect(result).toEqual(expectedResult)
  expect(resultCurry).toEqual(expectedResult)
})

test('with null', () => {
  expect(omit('a,b', null)).toEqual(undefined)
})

test('doesn\'t work with number as property', () => {
  expect(omit([ 42 ], {
    a  : 1,
    42 : 2,
  })).toEqual({
    42 : 2,
    a  : 1,
  })
})

test('happy', () => {
  expect(omit([ 'a', 'c' ])({
    a : 'foo',
    b : 'bar',
    c : 'baz',
  })).toEqual({ b : 'bar' })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#omit)

### once

```typescript

once<T extends (...args: any[]) => any>(func: T): T
```

It returns a function, which invokes only once `fn` function.

```javascript
let result = 0
const addOnce = R.once((x) => result = result + x)

addOnce(1)
addOnce(1)
// => 1
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20let%20result%20%3D%200%0Aconst%20addOnce%20%3D%20R.once((x)%20%3D%3E%20result%20%3D%20result%20%2B%20x)%0A%0AaddOnce(1)%0AaddOnce(1)%0A%2F%2F%20%3D%3E%201">Try this <strong>R.once</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.once</strong> source</summary>

```javascript
import { curry } from './curry'

function onceFn(fn, context){
  let result

  return function (){
    if (fn){
      result = fn.apply(context || this, arguments)
      fn = null
    }

    return result
  }
}

export function once(fn, context){
  if (arguments.length === 1){
    const wrap = onceFn(fn, context)

    return curry(wrap)
  }

  return onceFn(fn, context)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { once } from './once'

test('with counter', () => {
  let counter = 0
  const runOnce = once(x => {
    counter++

    return x + 2
  })
  expect(runOnce(1)).toEqual(3)
  runOnce(1)
  runOnce(1)
  runOnce(1)
  expect(counter).toEqual(1)
})

test('happy path', () => {
  const addOneOnce = once((
    a, b, c
  ) => a + b + c, 1)

  expect(addOneOnce(
    10, 20, 30
  )).toBe(60)
  expect(addOneOnce(40)).toEqual(60)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#once)

### or

```typescript

or<T, U>(a: T, b: U): T | U
```

Logical OR

```javascript
R.or(false, true); // => true
R.or(false, false); // => false
R.or(false, 'foo'); // => 'foo'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.or(false%2C%20true)%3B%20%2F%2F%20%3D%3E%20true%0AR.or(false%2C%20false)%3B%20%2F%2F%20%3D%3E%20false%0AR.or(false%2C%20'foo')%3B%20%2F%2F%20%3D%3E%20'foo'">Try this <strong>R.or</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.or</strong> source</summary>

```javascript
export function or(a, b){
  if (arguments.length === 1) return _b => or(a, _b)

  return a || b
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { or } from './or'

test('happy', () => {
  expect(or(0, 'foo')).toBe('foo')
  expect(or(true, true)).toBeTrue()
  expect(or(false)(true)).toBeTrue()
  expect(or(false, false)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#or)

### over

```typescript

over<T>(lens: Lens, fn: Arity1Fn, value: T): T
```

It returns a copied **Object** or **Array** with modified value received by applying function `fn` to `lens` focus.

```javascript
const headLens = R.lensIndex(0)
 
R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']) // => ['FOO', 'bar', 'baz']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20headLens%20%3D%20R.lensIndex(0)%0A%20%0AR.over(headLens%2C%20R.toUpper%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'FOO'%2C%20'bar'%2C%20'baz'%5D">Try this <strong>R.over</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.over</strong> source</summary>

```javascript
import { curry } from './curry'

const Identity = x => ({
  x,
  map : fn => Identity(fn(x)),
})

function overFn(
  lens, fn, object
){
  return lens(x => Identity(fn(x)))(object).x
}

export const over = curry(overFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { assoc } from './assoc'
import { lens } from './lens'
import { lensIndex } from './lensIndex'
import { lensPath } from './lensPath'
import { over } from './over'
import { prop } from './prop'
import { toUpper } from './toUpper'

const testObject = {
  foo : 'bar',
  baz : {
    a : 'x',
    b : 'y',
  },
}

test('assoc lens', () => {
  const assocLens = lens(prop('foo'), assoc('foo'))
  const result = over(
    assocLens, toUpper, testObject
  )
  const expected = {
    ...testObject,
    foo : 'BAR',
  }
  expect(result).toEqual(expected)
})

test('path lens', () => {
  const pathLens = lensPath('baz.a')
  const result = over(
    pathLens, toUpper, testObject
  )
  const expected = {
    ...testObject,
    baz : {
      a : 'X',
      b : 'y',
    },
  }
  expect(result).toEqual(expected)
})

test('index lens', () => {
  const indexLens = lensIndex(0)
  const result = over(indexLens, toUpper)([ 'foo', 'bar' ])
  expect(result).toEqual([ 'FOO', 'bar' ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#over)

### partial

```typescript

partial<V0, V1, T>(fn: (x0: V0, x1: V1) => T, args: [V0]): (x1: V1) => T
```

It is very similar to `R.curry`, but you can pass initial arguments when you create the curried function.

`R.partial` will keep returning a function until all the arguments that the function `fn` expects are passed.
The name comes from the fact that you partially inject the inputs.

> :boom: Rambda's partial doesn't need the input arguments to be wrapped as array.

```javascript
const fn = (title, firstName, lastName) => {
  return title + ' ' + firstName + ' ' + lastName + '!'
}

const canPassAnyNumberOfArguments = R.partial(fn, 'Hello')
const ramdaStyle = R.partial(fn, ['Hello'])

const finalFn = canPassAnyNumberOfArguments('Foo')

finalFn('Bar') // =>  'Hello, Foo Bar!'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20fn%20%3D%20(title%2C%20firstName%2C%20lastName)%20%3D%3E%20%7B%0A%20%20return%20title%20%2B%20'%20'%20%2B%20firstName%20%2B%20'%20'%20%2B%20lastName%20%2B%20'!'%0A%7D%0A%0Aconst%20canPassAnyNumberOfArguments%20%3D%20R.partial(fn%2C%20'Hello')%0Aconst%20ramdaStyle%20%3D%20R.partial(fn%2C%20%5B'Hello'%5D)%0A%0Aconst%20finalFn%20%3D%20canPassAnyNumberOfArguments('Foo')%0A%0AfinalFn('Bar')%20%2F%2F%20%3D%3E%20%20'Hello%2C%20Foo%20Bar!'">Try this <strong>R.partial</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.partial</strong> source</summary>

```javascript
export function partial(fn, ...args){
  const len = fn.length

  return (...rest) => {
    if (args.length + rest.length >= len){
      return fn(...args, ...rest)
    }

    return partial(fn, ...[ ...args, ...rest ])
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { partial } from './partial'
import { type } from './type'

const greet = (
  salutation, title, firstName, lastName
) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!'

test('happy', () => {
  const canPassAnyNumberOfArguments = partial(
    greet, 'Hello', 'Ms.'
  )
  const fn = canPassAnyNumberOfArguments('foo')
  const sayHello = partial(greet, [ 'Hello' ])
  const sayHelloRamda = partial(sayHello, [ 'Ms.' ])

  expect(type(fn)).toBe('Function')

  expect(fn('bar')).toBe('Hello, Ms. foo bar!')
  expect(sayHelloRamda('foo', 'bar')).toBe('Hello, Ms. foo bar!')
})

test('extra arguments are ignored', () => {
  const canPassAnyNumberOfArguments = partial(
    greet, 'Hello', 'Ms.'
  )
  const fn = canPassAnyNumberOfArguments('foo')

  expect(type(fn)).toBe('Function')

  expect(fn(
    'bar', 1, 2
  )).toBe('Hello, Ms. foo bar!')
})

test('when array is input', () => {
  const fooFn = (
    a, b, c, d
  ) => ({
    a,
    b,
    c,
    d,
  })
  const barFn = partial(
    fooFn, [ 1, 2 ], []
  )

  expect(barFn(1, 2)).toEqual({
    a : [ 1, 2 ],
    b : [],
    c : 1,
    d : 2,
  })
})

test('ramda spec', () => {
  const sayHello = partial(greet, 'Hello')
  const sayHelloToMs = partial(sayHello, 'Ms.')

  expect(sayHelloToMs('Jane', 'Jones')).toBe('Hello, Ms. Jane Jones!')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#partial)

### partialCurry

```typescript

partialCurry<Input, PartialInput, Output>(
  fn: (input: Input) => Output, 
  partialInput: PartialInput,
): (input: Pick<Input, Exclude<keyof Input, keyof PartialInput>>) => Output
```

`R.partialCurry` is a curry helper designed specifically for functions accepting object as a single argument.

Initially the function knows only a part from the whole input object and then `R.partialCurry` helps in preparing the function for the second part, when it receives the rest of the input.

> :boom: Curried function can be asynchronous

```javascript
const fn = ({ a, b, c }) => a + b + c
const curried = partialCurry(fn, { a : 1 })
const result = curried({
  b : 2,
  c : 3,
})
// => 6
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20(%7B%20a%2C%20b%2C%20c%20%7D)%20%3D%3E%20a%20%2B%20b%20%2B%20c%0Aconst%20curried%20%3D%20partialCurry(fn%2C%20%7B%20a%20%3A%201%20%7D)%0Aconst%20result%20%3D%20curried(%7B%0A%20%20b%20%3A%202%2C%0A%20%20c%20%3A%203%2C%0A%7D)%0A%2F%2F%20%3D%3E%206">Try this <strong>R.partialCurry</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.partialCurry</strong> source</summary>

```javascript
import { merge } from './merge'
import { type } from './type'

export function partialCurry(fn, input){
  return rest => {
    if (type(fn) === 'Async'){
      return new Promise((resolve, reject) => {
        fn(merge(rest, input)).then(resolve)
          .catch(reject)
      })
    }

    return fn(merge(rest, input))
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { partialCurry } from './partialCurry'
import { type } from './type'

test('with plain function', () => {
  const fn = ({ a, b, c }) => a + b + c
  const curried = partialCurry(fn, { a : 1 })

  expect(type(curried)).toEqual('Function')
  expect(curried({
    b : 2,
    c : 3,
  })).toEqual(6)
})

test('with function that throws an error', () => {
  const fn = ({ a, b, c }) => {
    throw new Error('foo')
  }
  const curried = partialCurry(fn, { a : 1 })

  expect(type(curried)).toEqual('Function')
  expect(() =>
    curried({
      b : 2,
      c : 3,
    })).toThrowWithMessage(Error, 'foo')
})

test('with async', async () => {
  const fn = async ({ a, b, c }) => {
    await delay(100)

    return a + b + c
  }

  const curried = partialCurry(fn, { a : 1 })

  const result = await curried({
    b : 2,
    c : 3,
  })

  expect(result).toEqual(6)
})

test('async function throwing an error', async () => {
  const fn = async ({ a, b, c }) => {
    await delay(100)
    throw new Error('foo')
  }

  const curried = partialCurry(fn, { a : 1 })

  try {
    await curried({
      b : 2,
      c : 3,
    })
    expect(true).toBeFalsy()
  } catch (e){
    expect(e.message).toBe('foo')
  }
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#partialCurry)

### partition

```typescript

partition<T>(
  predicate: Predicate<T>,
  input: T[]
): [T[], T[]]
```

It will return array of two objects/arrays according to `predicate` function. The first member holds all instances of `input` that pass the `predicate` function, while the second member - those who doesn't.

```javascript
const list = [1, 2, 3]
const obj = {a: 1, b: 2, c: 3}
const predicate = x => x > 2

const result = [
  R.partition(predicate, list),
  R.partition(predicate, obj)
]
const expected = [
  [[3], [1, 2]],
  [{c: 3},  {a: 1, b: 2}],
]
// `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0Aconst%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3E%202%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.partition(predicate%2C%20list)%2C%0A%20%20R.partition(predicate%2C%20obj)%0A%5D%0Aconst%20expected%20%3D%20%5B%0A%20%20%5B%5B3%5D%2C%20%5B1%2C%202%5D%5D%2C%0A%20%20%5B%7Bc%3A%203%7D%2C%20%20%7Ba%3A%201%2C%20b%3A%202%7D%5D%2C%0A%5D%0A%2F%2F%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.partition</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.partition</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function partitionObject(predicate, iterable){
  const yes = {}
  const no = {}
  Object.entries(iterable).forEach(([ prop, value ]) => {
    if (predicate(value, prop)){
      yes[ prop ] = value
    } else {
      no[ prop ] = value
    }
  })

  return [ yes, no ]
}

export function partitionArray(predicate, list, indexed = false){
  const yes = []
  const no = []
  let counter = -1

  while (counter++ < list.length - 1){
    if (indexed ? predicate(list[ counter ], counter) : predicate(list[ counter ])){
      yes.push(list[ counter ])
    } else {
      no.push(list[ counter ])
    }
  }

  return [ yes, no ]
}

export function partition(predicate, iterable){
  if (arguments.length === 1){
    return listHolder => partition(predicate, listHolder)
  }
  if (!_isArray(iterable)) return partitionObject(predicate, iterable)

  return partitionArray(predicate, iterable)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { partition } from './partition'

test('with array', () => {
  const predicate = x => x > 2
  const list = [ 1, 2, 3, 4 ]

  const result = partition(predicate, list)
  const expectedResult = [
    [ 3, 4 ],
    [ 1, 2 ],
  ]

  expect(result).toEqual(expectedResult)
})

test('with object', () => {
  const predicate = (value, prop) => {
    expect(typeof prop).toBe('string')

    return value > 2
  }
  const hash = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
  }

  const result = partition(predicate)(hash)
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

  expect(result).toEqual(expectedResult)
})

test('readme example', () => {
  const list = [ 1, 2, 3 ]
  const obj = {
    a : 1,
    b : 2,
    c : 3,
  }
  const predicate = x => x > 2

  const result = [ partition(predicate, list), partition(predicate, obj) ]
  const expected = [
    [ [ 3 ], [ 1, 2 ] ],
    [
      { c : 3 },
      {
        a : 1,
        b : 2,
      },
    ],
  ]
  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#partition)

### partitionIndexed

```typescript

partitionIndexed<T>(
  predicate: IndexedPredicate<T>,
  input: T[]
): [T[], T[]]
```

<details>

<summary><strong>R.partitionIndexed</strong> source</summary>

```javascript
import { partitionObject, partitionArray } from './partition'
import { _isArray } from './_internals/_isArray'

export function partitionIndexed(predicate, iterable){
  if (arguments.length === 1){
    return listHolder => partitionIndexed(predicate, listHolder)
  }
  if (!_isArray(iterable)) return partitionObject(predicate, iterable)

  return partitionArray(predicate, iterable, true)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { partitionIndexed } from './partitionIndexed'

test('with array', () => {
  const predicate = (x, i) => {
    expect(x).toBeNumber()
    return x > 2
  }
    const list = [ 1, 2, 3, 4 ]

  const result = partitionIndexed(predicate, list)
  const curried = partitionIndexed(predicate)(list)
  const expectedResult = [
    [ 3, 4 ],
    [ 1, 2 ],
  ]

  expect(result).toEqual(expectedResult)
  expect(curried).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#partitionIndexed)

### pass

```typescript

pass(...inputs: any[]): (...rules: any[]) => boolean
```

It checks if `inputs` are following `schemas` specifications according to `R.isValid`.

```javascript
const result = R.pass(
  1,
  ['foo','bar']
)(
  Number,
  [String]
)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.pass(%0A%20%201%2C%0A%20%20%5B'foo'%2C'bar'%5D%0A)(%0A%20%20Number%2C%0A%20%20%5BString%5D%0A)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.pass</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pass</strong> source</summary>

```javascript
import { any } from './any'
import { check } from './ok'

export function pass(...inputs){
  return (...schemas) =>
    any((x, i) => {
      const schema = schemas[ i ] === undefined ? schemas[ 0 ] : schemas[ i ]

      return !check(x, schema)
    }, inputs) === false
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { pass } from './pass'

test('true on success', () => {
  const result = pass(
    1, 'foo', {}
  )(
    'number', 'string', 'object'
  )

  expect(result).toBeTrue()
})

test('false on failure', () => {
  expect(pass(
    1, 'foo', {}
  )(
    'number', 'string', 'string'
  )).toBeFalse()
})

test('true when single schema', () => {
  expect(pass(
    1, 2, 3
  )('number')).toBeTrue()
})

test('false when single schema', () => {
  expect(pass(
    1, 'foo', {}
  )('number')).toBeFalse()
})

test('array of schemas', () => {
  const result = pass([ { a : 1 }, { a : 2 }, { a : 3 } ])([ { a : Number } ])
  expect(result).toBeTruthy()
})

test('reame example', () => {
  const result = pass(1, [ 'foo', 'bar' ])(Number, [ String ])
  expect(result).toBeTruthy()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pass)

### path

```typescript

path<Input, T>(pathToSearch: Path, obj: Input): T | undefined
```

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

> :boom: String anotation of `pathToSearch` is one of the differences between `Rambda` and `Ramda`.

```javascript
const obj = {a: {b: 1}}
const pathToSearch = 'a.b'
const pathToSearchList = ['a', 'b']

const result = [
  R.path(pathToSearch, obj),
  R.path(pathToSearchList, obj),
  R.path('a.b.c.d', obj)
]
// => [1, 1, undefined]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%20%7Bb%3A%201%7D%7D%0Aconst%20pathToSearch%20%3D%20'a.b'%0Aconst%20pathToSearchList%20%3D%20%5B'a'%2C%20'b'%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.path(pathToSearch%2C%20obj)%2C%0A%20%20R.path(pathToSearchList%2C%20obj)%2C%0A%20%20R.path('a.b.c.d'%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5B1%2C%201%2C%20undefined%5D">Try this <strong>R.path</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.path</strong> source</summary>

```javascript
export function path(pathInput, obj){
  if (arguments.length === 1) return _obj => path(pathInput, _obj)

  if (obj === null || obj === undefined){
    return undefined
  }
  let willReturn = obj
  let counter = 0

  const pathArrValue =
    typeof pathInput === 'string' ? pathInput.split('.') : pathInput

  while (counter < pathArrValue.length){
    if (willReturn === null || willReturn === undefined){
      return undefined
    }
    if(willReturn[ pathArrValue[ counter ] ] === null) return undefined

    willReturn = willReturn[ pathArrValue[ counter ] ]
    counter++
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { path } from './path'

test('with array inside object', () => {
  const obj = { a : { b : [ 1, { c : 1 } ] } }

  expect(path('a.b.1.c', obj)).toBe(1)
})

test('works with undefined', () => {
  const obj = { a : { b : { c : 1 } } }

  expect(path('a.b.c.d.f', obj)).toBeUndefined()
  expect(path('foo.babaz', undefined)).toBeUndefined()
  expect(path('foo.babaz')(undefined)).toBeUndefined()
})

test('works with string instead of array', () => {
  expect(path('foo.bar.baz')({ foo : { bar : { baz : 'yes' } } })).toEqual('yes')
})

test('path', () => {
  expect(path([ 'foo', 'bar', 'baz' ])({ foo : { bar : { baz : 'yes' } } })).toEqual('yes')

  expect(path([ 'foo', 'bar', 'baz' ])(null)).toBeUndefined()

  expect(path([ 'foo', 'bar', 'baz' ])({ foo : { bar : 'baz' } })).toBeUndefined()
})

test("null is not a valid path", () => {
  expect(
    path('audio_tracks', {a: 1, audio_tracks: null})
  ).toBeUndefined()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#path)

### pathEq

```typescript

pathEq(pathToSearch: Path, target: any, input: any): boolean
```

It returns `true` if `pathToSearch` of `input` object is equal to `target` value.

`pathToSearch` is passed to `R.path`, which means that it can be either a string or an array. Also equality between `target` and the found value is determined by `R.equals`.

```javascript
const path = 'a.b'
const target = {c: 1}
const input = {a: {b: {c: 1}}}

const result = R.pathEq(
  path,
  target,
  input
)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20path%20%3D%20'a.b'%0Aconst%20target%20%3D%20%7Bc%3A%201%7D%0Aconst%20input%20%3D%20%7Ba%3A%20%7Bb%3A%20%7Bc%3A%201%7D%7D%7D%0A%0Aconst%20result%20%3D%20R.pathEq(%0A%20%20path%2C%0A%20%20target%2C%0A%20%20input%0A)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.pathEq</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pathEq</strong> source</summary>

```javascript
import { curry } from './curry'
import { equals } from './equals'
import { path } from './path'

function pathEqFn(
  pathToSearch, target, input
){
  return equals(path(pathToSearch, input), target)
}

export const pathEq = curry(pathEqFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { pathEq } from './pathEq'

test('when true', () => {
  const path = 'a.b'
  const obj = { a : { b : { c : 1 } } }
  const target = { c : 1 }

  expect(pathEq(
    path, target, obj
  )).toBeTrue()
})

test('when false', () => {
  const path = 'a.b'
  const obj = { a : { b : 1 } }
  const target = 2

  expect(pathEq(path, target)(obj)).toBeFalse()
})

test('when wrong path', () => {
  const path = 'foo.bar'
  const obj = { a : { b : 1 } }
  const target = 2

  expect(pathEq(
    path, target, obj
  )).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pathEq)

### pathOr

```typescript

pathOr<T>(defaultValue: T, pathToSearch: Path, obj: any): T
```

It reads `obj` input and returns either `R.path(pathToSearch, obj)` result or `defaultValue` input.

```javascript
const defaultValue = 'DEFAULT_VALUE'
const pathToSearch = 'a.b'
const pathToSearchList = ['a', 'b']

const obj = {
  a : {
    b : 1
  }
}

const result = [
  R.pathOr(DEFAULT_VALUE, pathToSearch, obj) 
  R.pathOr(DEFAULT_VALUE, pathToSearchList, obj) 
  R.pathOr(DEFAULT_VALUE, 'a.b.c', obj) 
]
// => [1, 1, 'DEFAULT_VALUE']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20defaultValue%20%3D%20'DEFAULT_VALUE'%0Aconst%20pathToSearch%20%3D%20'a.b'%0Aconst%20pathToSearchList%20%3D%20%5B'a'%2C%20'b'%5D%0A%0Aconst%20obj%20%3D%20%7B%0A%20%20a%20%3A%20%7B%0A%20%20%20%20b%20%3A%201%0A%20%20%7D%0A%7D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.pathOr(DEFAULT_VALUE%2C%20pathToSearch%2C%20obj)%20%0A%20%20R.pathOr(DEFAULT_VALUE%2C%20pathToSearchList%2C%20obj)%20%0A%20%20R.pathOr(DEFAULT_VALUE%2C%20'a.b.c'%2C%20obj)%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B1%2C%201%2C%20'DEFAULT_VALUE'%5D">Try this <strong>R.pathOr</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pathOr</strong> source</summary>

```javascript
import { curry } from './curry'
import { defaultTo } from './defaultTo'
import { path } from './path'

function pathOrFn(
  defaultValue, list, obj
){
  return defaultTo(defaultValue, path(list, obj))
}

export const pathOr = curry(pathOrFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { pathOr } from './pathOr'

test('with undefined', () => {
  const result = pathOr(
    'foo', 'x.y', { x : { y : 1 } }
  )

  expect(result).toEqual(1)
})

test('with null', () => {
  const result = pathOr(
    'foo', 'x.y', null
  )

  expect(result).toEqual('foo')
})

test('with NaN', () => {
  const result = pathOr(
    'foo', 'x.y', NaN
  )

  expect(result).toEqual('foo')
})

test('curry case (x)(y)(z)', () => {
  const result = pathOr('foo')('x.y.z')({ x : { y : { a : 1 } } })

  expect(result).toEqual('foo')
})

test('curry case (x)(y,z)', () => {
  const result = pathOr('foo', 'x.y.z')({ x : { y : { a : 1 } } })

  expect(result).toEqual('foo')
})

test('curry case (x,y)(z)', () => {
  const result = pathOr('foo')('x.y.z', { x : { y : { a : 1 } } })

  expect(result).toEqual('foo')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pathOr)

### paths

```typescript

paths<Input, T>(pathsToSearch: Path[], obj: Input): (T | undefined)[]
```

It loops over members of `pathsToSearch` as `singlePath` and returns the array produced by `R.path(singlePath, obj)`.

Because it calls `R.path`, then `singlePath` can be either string or a list.

```javascript
const obj = {
  a : {
    b : {
      c : 1,
      d : 2
    }
  }
}

const result = R.paths([
  'a.b.c',
  'a.b.c.d',
  'a.b.c.d.e',
], obj)
// => [1, 2, undefined]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7B%0A%20%20a%20%3A%20%7B%0A%20%20%20%20b%20%3A%20%7B%0A%20%20%20%20%20%20c%20%3A%201%2C%0A%20%20%20%20%20%20d%20%3A%202%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aconst%20result%20%3D%20R.paths(%5B%0A%20%20'a.b.c'%2C%0A%20%20'a.b.c.d'%2C%0A%20%20'a.b.c.d.e'%2C%0A%5D%2C%20obj)%0A%2F%2F%20%3D%3E%20%5B1%2C%202%2C%20undefined%5D">Try this <strong>R.paths</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.paths</strong> source</summary>

```javascript
import { path } from './path'

export function paths(pathsToSearch, obj){
  if (arguments.length === 1){
    return _obj => paths(pathsToSearch, _obj)
  }

  return pathsToSearch.map(singlePath => path(singlePath, obj))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { paths } from './paths'

const obj = {
  a : {
    b : {
      c : 1,
      d : 2,
    },
  },
  p : [ { q : 3 } ],
  x : {
    y : 'FOO',
    z : [ [ {} ] ],
  },
}

test('with string path + curry', () => {
  const pathsInput = [ 'a.b.d', 'p.q' ]
  const expected = [ 2, undefined ]
  const result = paths(pathsInput, obj)
  const curriedResult = paths(pathsInput)(obj)

  expect(result).toEqual(expected)
  expect(curriedResult).toEqual(expected)
})

test('with array path', () => {
  const result = paths([
    [ 'a', 'b', 'c' ],
    [ 'x', 'y' ],
  ],
  obj)

  expect(result).toEqual([ 1, 'FOO' ])
})

test('takes a paths that contains indices into arrays', () => {
  expect(paths([
    [ 'p', 0, 'q' ],
    [ 'x', 'z', 0, 0 ],
  ],
  obj)).toEqual([ 3, {} ])
  expect(paths([
    [ 'p', 0, 'q' ],
    [ 'x', 'z', 2, 1 ],
  ],
  obj)).toEqual([ 3, undefined ])
})

test('gets a deep property\'s value from objects', () => {
  expect(paths([ [ 'a', 'b' ] ], obj)).toEqual([ obj.a.b ])
  expect(paths([ [ 'p', 0 ] ], obj)).toEqual([ obj.p[ 0 ] ])
})

test('returns undefined for items not found', () => {
  expect(paths([ [ 'a', 'x', 'y' ] ], obj)).toEqual([ undefined ])
  expect(paths([ [ 'p', 2 ] ], obj)).toEqual([ undefined ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#paths)

### pick

```typescript

pick<T, K extends string | number | symbol>(propsToPick: K[], input: T): Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>
```

It returns a partial copy of an `input` containing only `propsToPick` properties.

`input` can be either an object or an array.

String anotation of `propsToPick` is one of the differences between `Rambda` and `Ramda`.

> :boom: When using this method with `TypeScript`, it is much easier to pass `propsToPick` as an array. If passing a string, you will need to explicitly declare the output type.

```javascript
const obj = {
  a : 1,
  b : false,
  foo: 'cherry'
}
const list = [1, 2, 3, 4]
const propsToPick = 'a,foo'
const propsToPickList = ['a', 'foo']

const result = [
  R.pick(propsToPick, obj),
  R.pick(propsToPickList, obj),
  R.pick('a,bar', obj),
  R.pick('bar', obj),
  R.pick([0, 3], list),
  R.pick('0,3', list),
]

const expected = [
  {a:1, foo: 'cherry'},
  {a:1, foo: 'cherry'},
  {a:1},
  {},
  [1,4],
  [1,4]
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%20false%2C%0A%20%20foo%3A%20'cherry'%0A%7D%0Aconst%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20propsToPick%20%3D%20'a%2Cfoo'%0Aconst%20propsToPickList%20%3D%20%5B'a'%2C%20'foo'%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.pick(propsToPick%2C%20obj)%2C%0A%20%20R.pick(propsToPickList%2C%20obj)%2C%0A%20%20R.pick('a%2Cbar'%2C%20obj)%2C%0A%20%20R.pick('bar'%2C%20obj)%2C%0A%20%20R.pick(%5B0%2C%203%5D%2C%20list)%2C%0A%20%20R.pick('0%2C3'%2C%20list)%2C%0A%5D%0A%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Ba%3A1%2C%20foo%3A%20'cherry'%7D%2C%0A%20%20%7Ba%3A1%2C%20foo%3A%20'cherry'%7D%2C%0A%20%20%7Ba%3A1%7D%2C%0A%20%20%7B%7D%2C%0A%20%20%5B1%2C4%5D%2C%0A%20%20%5B1%2C4%5D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.pick</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pick</strong> source</summary>

```javascript
export function pick(propsToPick, input){
  if (arguments.length === 1) return _input => pick(propsToPick, _input)

  if (input === null || input === undefined){
    return undefined
  }
  const keys =
    typeof propsToPick === 'string' ? propsToPick.split(',') : propsToPick

  const willReturn = {}
  let counter = 0

  while (counter < keys.length){
    if (keys[ counter ] in input){
      willReturn[ keys[ counter ] ] = input[ keys[ counter ] ]
    }
    counter++
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { pick } from './pick'

const obj = {
  a : 1,
  b : 2,
  c : 3,
}

test('props to pick is a string', () => {
  const result = pick('a,c', obj)
  const resultCurry = pick('a,c')(obj)
  const expectedResult = {
    a : 1,
    c : 3,
  }

  expect(result).toEqual(expectedResult)
  expect(resultCurry).toEqual(expectedResult)
})

test('when prop is missing', () => {
  const result = pick('a,d,f', obj)
  expect(result).toEqual({ a : 1 })
})

test('props to pick is an array', () => {
  expect(pick([ 'a', 'c' ])({
    a : 'foo',
    b : 'bar',
    c : 'baz',
  })).toEqual({
    a : 'foo',
    c : 'baz',
  })

  expect(pick([ 'a', 'd', 'e', 'f' ])({
    a : 'foo',
    b : 'bar',
    c : 'baz',
  })).toEqual({ a : 'foo' })

  expect(pick('a,d,e,f')(null)).toEqual(undefined)
})

test('works with list as input and number as props - props to pick is an array', () => {
  const result = pick([ 1, 2 ], [ 'a', 'b', 'c', 'd' ])
  expect(result).toEqual({
    1 : 'b',
    2 : 'c',
  })
})

test('works with list as input and number as props - props to pick is a string', () => {
  const result = pick('1,2', [ 'a', 'b', 'c', 'd' ])
  expect(result).toEqual({
    1 : 'b',
    2 : 'c',
  })
})

test('with symbol', () => {
  const symbolProp = Symbol('s')
  expect(pick([ symbolProp ], { [ symbolProp ] : 'a' })).toMatchInlineSnapshot(`
    Object {
      Symbol(s): "a",
    }
  `)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pick)

### pickAll

```typescript

pickAll<T, U>(propsToPick: string[], input: T): U
```

Same as `R.pick` but it won't skip the missing props, i.e. it will assign them to `undefined`.

> :boom: When using this method with `TypeScript`, it is much easier to pass `propsToPick` as an array. If passing a string, you will need to explicitly declare the output type.

```javascript
const obj = {
  a : 1,
  b : false,
  foo: 'cherry'
}
const propsToPick = 'a,foo,bar'
const propsToPickList = ['a', 'foo', 'bar']

const result = [
  R.pickAll(propsToPick, obj),
  R.pickAll(propsToPickList, obj),
  R.pickAll('a,bar', obj),
  R.pickAll('bar', obj),
]
const expected = [
  {a:1, foo: 'cherry', bar: undefined},
  {a:1, foo: 'cherry', bar: undefined},
  {a:1, bar: undefined},
  {bar: undefined}
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%20false%2C%0A%20%20foo%3A%20'cherry'%0A%7D%0Aconst%20propsToPick%20%3D%20'a%2Cfoo%2Cbar'%0Aconst%20propsToPickList%20%3D%20%5B'a'%2C%20'foo'%2C%20'bar'%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.pickAll(propsToPick%2C%20obj)%2C%0A%20%20R.pickAll(propsToPickList%2C%20obj)%2C%0A%20%20R.pickAll('a%2Cbar'%2C%20obj)%2C%0A%20%20R.pickAll('bar'%2C%20obj)%2C%0A%5D%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Ba%3A1%2C%20foo%3A%20'cherry'%2C%20bar%3A%20undefined%7D%2C%0A%20%20%7Ba%3A1%2C%20foo%3A%20'cherry'%2C%20bar%3A%20undefined%7D%2C%0A%20%20%7Ba%3A1%2C%20bar%3A%20undefined%7D%2C%0A%20%20%7Bbar%3A%20undefined%7D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.pickAll</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pickAll</strong> source</summary>

```javascript
export function pickAll(propsToPick, obj){
  if (arguments.length === 1) return _obj => pickAll(propsToPick, _obj)

  if (obj === null || obj === undefined){
    return undefined
  }
  const keysValue =
    typeof propsToPick === 'string' ? propsToPick.split(',') : propsToPick

  const willReturn = {}
  let counter = 0

  while (counter < keysValue.length){
    if (keysValue[ counter ] in obj){
      willReturn[ keysValue[ counter ] ] = obj[ keysValue[ counter ] ]
    } else {
      willReturn[ keysValue[ counter ] ] = undefined
    }
    counter++
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { pickAll } from './pickAll'

test('when input is undefined or null', () => {
  expect(pickAll('a', null)).toBe(undefined)
  expect(pickAll('a', undefined)).toBe(undefined)
})

test('with string as condition', () => {
  const obj = {
    a : 1,
    b : 2,
    c : 3,
  }
  const result = pickAll('a,c', obj)
  const resultCurry = pickAll('a,c')(obj)
  const expectedResult = {
    a : 1,
    b : undefined,
    c : 3,
  }

  expect(result).toEqual(expectedResult)
  expect(resultCurry).toEqual(expectedResult)
})

test('with array as condition', () => {
  expect(pickAll([ 'a', 'b', 'c' ], {
    a : 'foo',
    c : 'baz',
  })).toEqual({
    a : 'foo',
    b : undefined,
    c : 'baz',
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pickAll)

### pipe

It performs left-to-right function composition.

```javascript
const result = R.pipe(
  R.filter(val => val > 2),
  R.map(a => a * 2)
)([1, 2, 3, 4])

// => [6, 8]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.pipe(%0A%20%20R.filter(val%20%3D%3E%20val%20%3E%202)%2C%0A%20%20R.map(a%20%3D%3E%20a%20*%202)%0A)(%5B1%2C%202%2C%203%2C%204%5D)%0A%0A%2F%2F%20%3D%3E%20%5B6%2C%208%5D">Try this <strong>R.pipe</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pipe)

### pipeAsync

```typescript

pipeAsync<Out>(
  ...fns: (Async<any> | Func<any>)[]
): (input: any) => Promise<Out>
```

Asynchronous version of `R.pipe`

> :boom: It doesn't work with promises or function returning promises such as `const foo = input => new Promise(...)`.

```javascript
const add = async x => {
  await R.delay(100)
  return x + 1
}
const multiply = async x => {
  await R.delay(100)
  return x * 2 
}

const result = await R.pipeAsync(
  add,
  multiply
)(1)
// `result` resolves to `4`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20add%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20%2B%201%0A%7D%0Aconst%20multiply%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20return%20x%20*%202%20%0A%7D%0A%0Aconst%20result%20%3D%20await%20R.pipeAsync(%0A%20%20add%2C%0A%20%20multiply%0A)(1)%0A%2F%2F%20%60result%60%20resolves%20to%20%604%60">Try this <strong>R.pipeAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pipeAsync</strong> source</summary>

```javascript
import { type } from './type'

export function pipeAsync(...inputArguments){
  return async function (startArgument){
    let argumentsToPass = startArgument

    while (inputArguments.length !== 0){
      const fn = inputArguments.shift()
      const typeFn = type(fn)

      if (typeFn === 'Async'){
        argumentsToPass = await fn(argumentsToPass)
      } else {
        argumentsToPass = fn(argumentsToPass)
        if (type(argumentsToPass) === 'Promise'){
          argumentsToPass = await argumentsToPass
        }
      }
    }

    return argumentsToPass
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { equals } from './equals'
import { map } from './map'
import { pipeAsync } from './pipeAsync'

async function identity(x){
  await delay(100)

  return x
}

test('happy', async () => {
  const fn1 = async x => {
    await delay(100)

    return x.map(xx => xx + 1)
  }
  const fn2 = async x => {
    await delay(100)

    return x.map(xx => xx * 2)
  }
  const result = await pipeAsync(fn1,
    fn2)(await Promise.all([ identity(1), identity(2), identity(3) ]))

  expect(result).toEqual([ 4, 6, 8 ])
})

const delayFn = ms =>
  new Promise(resolve => {
    resolve(ms + 1)
  })

test('with function returning promise', async () => {
  const result = await pipeAsync(
    x => x,
    x => x + 1,
    delayFn,
    x => x
  )(1)

  expect(result).toEqual(3)
})

test('throw error', async () => {
  const fn = async () => {
    await delay(1)
    JSON.parse('{foo')
  }

  let didThrow = false
  try {
    await pipeAsync(x => x, fn)(20)
  } catch (e){
    didThrow = true
  }

  expect(didThrow).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pipeAsync)

### piped

```typescript

piped<A, B>(input: A, fn0: (x: A) => B) : B
```

It is basically `R.pipe`, but instead of passing `input` argument as `R.pipe(...)(input)`, you pass it as the first argument.

> :boom: Independently, similar method is implemented in `Ramada` library, but there the name of the method is `pipe` - [Remeda.pipe](https://remedajs.com/docs#pipe)

```javascript
const result = piped(
  [1, 2, 3],
  R.filter(x => x > 1),
  R.map(x => x*10),
)
// => [20, 30]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20piped(%0A%20%20%5B1%2C%202%2C%203%5D%2C%0A%20%20R.filter(x%20%3D%3E%20x%20%3E%201)%2C%0A%20%20R.map(x%20%3D%3E%20x*10)%2C%0A)%0A%2F%2F%20%3D%3E%20%5B20%2C%2030%5D">Try this <strong>R.piped</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.piped</strong> source</summary>

```javascript
import { pipe } from './pipe'

export function piped(...inputs){
  const [ input, ...fnList ] = inputs

  return pipe(...fnList)(input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { filter } from './filter'
import { map } from './map'
import { piped } from './piped'

test('happy', () => {
  const result = piped(
    [ 1, 2, 3 ],
    filter(x => x > 1),
    map(x => x * 10),
    map(add(1))
  )
  const expectedResult = [ 21, 31 ]

  expect(result).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#piped)

### pipedAsync

```typescript

pipedAsync<T>(
  input: any,
  ...fns: (Func<any> | Async<any>)[]
): Promise<T>
```

It accepts input as first argument and series of functions as next arguments. It is same as `R.pipe` but with support for asynchronous functions.

> :boom: Functions that return `Promise` will be handled as regular function not asynchronous. Such example is `const foo = input => new Promise(...)`.

```javascript
const result = R.pipedAsync(
  100,
  async x => {
    await R.delay(100)
    return x + 2
  },
  R.add(2),
  async x => {
    const delayed = await R.delay(100)
    return delayed + x
  }
)
const expected = 'RAMBDAX_DELAY104'
// `result` resolves to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.pipedAsync(%0A%20%20100%2C%0A%20%20async%20x%20%3D%3E%20%7B%0A%20%20%20%20await%20R.delay(100)%0A%20%20%20%20return%20x%20%2B%202%0A%20%20%7D%2C%0A%20%20R.add(2)%2C%0A%20%20async%20x%20%3D%3E%20%7B%0A%20%20%20%20const%20delayed%20%3D%20await%20R.delay(100)%0A%20%20%20%20return%20delayed%20%2B%20x%0A%20%20%7D%0A)%0Aconst%20expected%20%3D%20'RAMBDAX_DELAY104'%0A%2F%2F%20%60result%60%20resolves%20to%20%60expected%60">Try this <strong>R.pipedAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pipedAsync</strong> source</summary>

```javascript
import { type } from './type'

export async function pipedAsync(...inputs){
  const [ input, ...fnList ] = inputs

  let argumentsToPass = input

  while (fnList.length !== 0){
    const fn = fnList.shift()
    const typeFn = type(fn)

    if (typeFn === 'Async'){
      argumentsToPass = await fn(argumentsToPass)
    } else {
      argumentsToPass = fn(argumentsToPass)
    }
  }

  return argumentsToPass
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { delay } from './delay'
import { pipedAsync } from './pipedAsync'

const fn1 = async x => {
  await delay(100)

  return x + 2
}
const fn2 = async x => {
  await delay(100)

  return x + 3
}

test('happy', async () => {
  const result = await pipedAsync(
    1, fn1, add(2), fn2
  )

  expect(result).toBe(8)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pipedAsync)

### pluck

```typescript

pluck<K extends keyof T, T>(property: K, list: T[]): T[K][]
```

It returns list of the values of `property` taken from the all objects inside `list`.

```javascript
const list = [{a: 1}, {a: 2}, {b: 3}]
const property = 'a'

R.pluck(property, list) 
// => [1, 2]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20list%20%3D%20%5B%7Ba%3A%201%7D%2C%20%7Ba%3A%202%7D%2C%20%7Bb%3A%203%7D%5D%0Aconst%20property%20%3D%20'a'%0A%0AR.pluck(property%2C%20list)%20%0A%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try this <strong>R.pluck</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.pluck</strong> source</summary>

```javascript
import { map } from './map'

export function pluck(property, list){
  if (arguments.length === 1) return _list => pluck(property, _list)

  const willReturn = []

  map(x => {
    if (x[ property ] !== undefined){
      willReturn.push(x[ property ])
    }
  }, list)

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { pluck } from './pluck'

test('happy', () => {
  expect(pluck('a')([ { a : 1 }, { a : 2 }, { b : 1 } ])).toEqual([ 1, 2 ])
})

test('with number', () => {
  const input = [
    [ 1, 2 ],
    [ 3, 4 ],
  ]

  expect(pluck(0, input)).toEqual([ 1, 3 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#pluck)

### prepend

```typescript

prepend<T>(x: T, input: T[]): T[]
```

It adds element `x` at the beginning of `list`.

```javascript
const result = R.prepend('foo', ['bar', 'baz'])
// => ['foo', 'bar', 'baz']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.prepend('foo'%2C%20%5B'bar'%2C%20'baz'%5D)%0A%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D">Try this <strong>R.prepend</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.prepend</strong> source</summary>

```javascript
export function prepend(x, input){
  if (arguments.length === 1) return _input => prepend(x, _input)

  if (typeof input === 'string') return [ x ].concat(input.split(''))

  return [ x ].concat(input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { prepend } from './prepend'

test('happy', () => {
  expect(prepend('yes', [ 'foo', 'bar', 'baz' ])).toEqual([
    'yes',
    'foo',
    'bar',
    'baz',
  ])
})

test('with empty list', () => {
  expect(prepend('foo')([])).toEqual([ 'foo' ])
})

test('with string instead of array', () => {
  expect(prepend('foo')('bar')).toEqual([ 'foo', 'b', 'a', 'r' ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#prepend)

### prevIndex

```typescript

prevIndex(index: number, list: any[]): number
```

It returns the next index of the list when the order is descending.

If we have reached the beginning of the list, then it will return the last index of the list.

> :boom: Unlike `R.nextIndex`, which safeguards against index out of bounds, this method does not.

```javascript
const list = [1, 2, 3]

const result = [
  R.prevIndex(0, list),
  R.prevIndex(1, list),
  R.prevIndex(2, list),
]
// => [2, 0, 1]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.prevIndex(0%2C%20list)%2C%0A%20%20R.prevIndex(1%2C%20list)%2C%0A%20%20R.prevIndex(2%2C%20list)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B2%2C%200%2C%201%5D">Try this <strong>R.prevIndex</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.prevIndex</strong> source</summary>

```javascript
export function prevIndex(index, list){
  return index === 0 ? list.length - 1 : index - 1
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { prevIndex } from './prevIndex'

const list = [ 1, 2, 3, 4 ]

test('happy path 1', () => {
  expect(prevIndex(2, list)).toEqual(1)
})

test('happy path 2', () => {
  expect(prevIndex(0, list)).toEqual(3)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#prevIndex)

### produce

```typescript

produce<Input extends any, Output>(
  rules: ProduceRules<Output, keyof Output, Input>,
  input: Input
): Output
```

It returns an object created by applying each value of `rules` to `input` argument.

> :boom: In Typescript context, `rules` functions can be only 1 level deep. In Javascript context, there is no such restriction.

```javascript
const rules = {
  foo: R.pipe(R.add(1), R.add(2)),
  a: {b: add(3)}
}
const input = i
const result = R.produce(rules, input)

const expected = {
  foo: 4,
  a: {b: 4}
}
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20rules%20%3D%20%7B%0A%20%20foo%3A%20R.pipe(R.add(1)%2C%20R.add(2))%2C%0A%20%20a%3A%20%7Bb%3A%20add(3)%7D%0A%7D%0Aconst%20input%20%3D%20i%0Aconst%20result%20%3D%20R.produce(rules%2C%20input)%0A%0Aconst%20expected%20%3D%20%7B%0A%20%20foo%3A%204%2C%0A%20%20a%3A%20%7Bb%3A%204%7D%0A%7D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.produce</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.produce</strong> source</summary>

```javascript
import { map } from './map'
import { type } from './type'

export function produce(rules, input){
  if (arguments.length === 1){
    return _input => produce(rules, _input)
  }

  return map(singleRule =>
    type(singleRule) === 'Object' ?
      produce(singleRule, input) :
      singleRule(input),
  rules)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add, pipe } from '../rambda'
import { produce } from './produce'

const rules = {
  a : pipe(add(2), add(3)),
  b : x => ({ foo : x }),
  c : {
    d : add(2),
    e : add(10),
  },
}

const expected = {
  a : 6,
  b : { foo : 1 },
  c : {
    d : 3,
    e : 11,
  },
}

test('happy', () => {
  const result = produce(rules, 1)
  expect(result).toEqual(expected)
})

test('curried', () => {
  const result = produce(rules)(1)
  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#produce)

### produceAsync

```typescript

produceAsync<Input extends any, Output>(
  rules: ProduceAsyncRules<Output, keyof Output, Input>,
  input: Input
): Promise<Output>
```

It returns an object created by applying each value of `rules` to `input` argument.

`rules` input is an object with synchronous or asynchronous functions as values.

The return value is wrapped in a promise, even if all `rules` are synchronous functions.

```javascript
const rules = {
  foo: async x => {
    await R.delay(100)
    return x > 1
  },
  bar: x => ({baz: x})
}
const input = 2
const result = await R.produceAsync(rules, input)

const expected = {
  foo: true,
  bar: {baz: 2}
}
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20rules%20%3D%20%7B%0A%20%20foo%3A%20async%20x%20%3D%3E%20%7B%0A%20%20%20%20await%20R.delay(100)%0A%20%20%20%20return%20x%20%3E%201%0A%20%20%7D%2C%0A%20%20bar%3A%20x%20%3D%3E%20(%7Bbaz%3A%20x%7D)%0A%7D%0Aconst%20input%20%3D%202%0Aconst%20result%20%3D%20await%20R.produceAsync(rules%2C%20input)%0A%0Aconst%20expected%20%3D%20%7B%0A%20%20foo%3A%20true%2C%0A%20%20bar%3A%20%7Bbaz%3A%202%7D%0A%7D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.produceAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.produceAsync</strong> source</summary>

```javascript
import { map } from './map'
import { type } from './type'

function promisify({ condition, input, prop }){
  return new Promise((resolve, reject) => {
    if (type(condition) !== 'Async'){
      return resolve({
        type    : prop,
        payload : condition(input),
      })
    }

    condition(input)
      .then(result => {
        resolve({
          type    : prop,
          payload : result,
        })
      })
      .catch(err => reject(err))
  })
}

function produceFn(conditions, input){
  let asyncConditionsFlag = false
  for (const prop in conditions){
    if (
      asyncConditionsFlag === false &&
      type(conditions[ prop ]) === 'Async'
    ){
      asyncConditionsFlag = true
    }
  }

  if (asyncConditionsFlag === false){
    const willReturn = {}
    for (const prop in conditions){
      willReturn[ prop ] = conditions[ prop ](input)
    }

    return Promise.resolve(willReturn)
  }

  const promised = []
  for (const prop in conditions){
    const condition = conditions[ prop ]
    promised.push(promisify({
      input,
      condition,
      prop,
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(promised)
      .then(results => {
        const willReturn = {}

        map(result => willReturn[ result.type ] = result.payload, results)

        resolve(willReturn)
      })
      .catch(err => reject(err))
  })
}

export function produceAsync(conditions, input){
  if (arguments.length === 1){
    return async _input => produceFn(conditions, _input)
  }

  return new Promise((resolve, reject) => {
    produceFn(conditions, input).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { produceAsync } from './produceAsync'

test('happy', async () => {
  const result = await produceAsync({
    foo : async x => {
      await delay(100)

      return `${ x }_ZEPPELIN`
    },
    bar : x => x.length === 3,
  },
  'LED')
  const expected = {
    foo : 'LED_ZEPPELIN',
    bar : true,
  }

  expect(result).toEqual(expected)
})

test('when all rules are synchronous', async () => {
  const result = await produceAsync({
    foo : x => `${ x }_ZEPPELIN`,
    bar : x => x.length === 3,
  },
  'LED')
  const expected = {
    foo : 'LED_ZEPPELIN',
    bar : true,
  }

  expect(result).toEqual(expected)
})

test('with error', async () => {
  const fn = produceAsync({
    foo : async x => {
      await delay(100)
      throw new Error(`${ x }_ZEPPELIN`)
    },
    bar : inputArgument => inputArgument === 5,
  })

  await expect(fn('LED')).rejects.toThrow('LED_ZEPPELIN')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#produceAsync)

### product

```typescript

product(list: number[]): number
```

```javascript
R.product([ 2, 3, 4 ])
// => 24)
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.product(%5B%202%2C%203%2C%204%20%5D)%0A%2F%2F%20%3D%3E%2024)">Try this <strong>R.product</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.product</strong> source</summary>

```javascript
import { multiply } from './multiply'
import { reduce } from './reduce'

export const product = reduce(multiply, 1)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { product } from './product'

test('happy', () => {
  expect(product([ 2, 3, 4 ])).toEqual(24)
})

test('bad input', () => {
  expect(product([ null ])).toEqual(0)
  expect(product([])).toEqual(1)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#product)

### prop

```typescript

prop<P extends keyof T, T>(propToFind: P, obj: T): T[P]
```

It returns the value of property `propToFind` in `obj`.

If there is no such property, it returns `undefined`.

```javascript
const result = [
  R.prop('x', {x: 100}), 
  R.prop('x', {a: 1}) 
]
// => [100, undefined]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.prop('x'%2C%20%7Bx%3A%20100%7D)%2C%20%0A%20%20R.prop('x'%2C%20%7Ba%3A%201%7D)%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B100%2C%20undefined%5D">Try this <strong>R.prop</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.prop</strong> source</summary>

```javascript
export function prop(propToFind, obj){
  if (arguments.length === 1) return _obj => prop(propToFind, _obj)

  if (!obj) return undefined

  return obj[ propToFind ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { prop } from './prop'

test('prop', () => {
  expect(prop('foo')({ foo : 'baz' })).toEqual('baz')

  expect(prop('bar')({ foo : 'baz' })).toEqual(undefined)

  expect(prop('bar')(null)).toEqual(undefined)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#prop)

### propEq

```typescript

propEq<K extends string | number>(propToFind: K, valueToMatch: any, obj: Record<K, any>): boolean
```

It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`.

```javascript
const obj = { foo: 'bar' }
const secondObj = { foo: 1 }

const propToFind = 'foo'
const valueToMatch = 'bar'

const result = [
  R.propEq(propToFind, valueToMatch, obj),
  R.propEq(propToFind, valueToMatch, secondObj)
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7B%20foo%3A%20'bar'%20%7D%0Aconst%20secondObj%20%3D%20%7B%20foo%3A%201%20%7D%0A%0Aconst%20propToFind%20%3D%20'foo'%0Aconst%20valueToMatch%20%3D%20'bar'%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.propEq(propToFind%2C%20valueToMatch%2C%20obj)%2C%0A%20%20R.propEq(propToFind%2C%20valueToMatch%2C%20secondObj)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.propEq</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.propEq</strong> source</summary>

```javascript
import { curry } from './curry'

function propEqFn(
  propToFind, valueToMatch, obj
){
  if (!obj) return false

  return obj[ propToFind ] === valueToMatch
}

export const propEq = curry(propEqFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { propEq } from './propEq'

test('happy', () => {
  expect(propEq('foo', 'bar')({ foo : 'bar' })).toBeTrue()
  expect(propEq('foo', 'bar')({ foo : 'baz' })).toBeFalse()
  expect(propEq('foo')('bar')({ foo : 'baz' })).toBeFalse()
  expect(propEq(
    'foo', 'bar', null
  )).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#propEq)

### propIs

```typescript

propIs(type: any, name: string, obj: any): boolean
```

It returns `true` if `property` of `obj` is from `target` type.

```javascript
const obj = {a:1, b: 'foo'}
const property = 'foo'

const result = [
  R.propIs(String, property, obj),
  R.propIs(Number, property, obj)
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A1%2C%20b%3A%20'foo'%7D%0Aconst%20property%20%3D%20'foo'%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.propIs(String%2C%20property%2C%20obj)%2C%0A%20%20R.propIs(Number%2C%20property%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.propIs</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.propIs</strong> source</summary>

```javascript
import { curry } from './curry'
import { is } from './is'

function propIsFn(
  targetPrototype, property, obj
){
  return is(targetPrototype, obj[ property ])
}

export const propIs = curry(propIsFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { propIs } from './propIs'

const obj = { value : 1 }
const property = 'value'

test('when true', () => {
  expect(propIs(
    Number, property, obj
  )).toBeTrue()
})

test('when false', () => {
  expect(propIs(
    String, property, obj
  )).toBeFalse()
  expect(propIs(
    String, property, {}
  )).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#propIs)

### propOr

```typescript

propOr<T, P extends string>(defaultValue: T, property: P, obj: Partial<Record<P, T>> | undefined): T
```

It returns either `defaultValue` or the value of `property` in `obj`.

```javascript
const obj = {a: 1}
const defaultValue = 'DEFAULT_VALUE'
const property = 'a'

const result = [
  R.propOr(defaultValue, property, obj),
  R.propOr(defaultValue, 'foo', obj)
]
// => [1, 'DEFAULT_VALUE']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7Ba%3A%201%7D%0Aconst%20defaultValue%20%3D%20'DEFAULT_VALUE'%0Aconst%20property%20%3D%20'a'%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.propOr(defaultValue%2C%20property%2C%20obj)%2C%0A%20%20R.propOr(defaultValue%2C%20'foo'%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5B1%2C%20'DEFAULT_VALUE'%5D">Try this <strong>R.propOr</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.propOr</strong> source</summary>

```javascript
import { curry } from './curry'
import { defaultTo } from './defaultTo'

function propOrFn(
  defaultValue, property, obj
){
  if (!obj) return defaultValue

  return defaultTo(defaultValue, obj[ property ])
}

export const propOr = curry(propOrFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { propOr } from './propOr'

test('propOr (result)', () => {
  const obj = { a : 1 }
  expect(propOr(
    'default', 'a', obj
  )).toEqual(1)
  expect(propOr(
    'default', 'notExist', obj
  )).toEqual('default')
  expect(propOr(
    'default', 'notExist', null
  )).toEqual('default')
})

test('propOr (currying)', () => {
  const obj = { a : 1 }
  expect(propOr('default')('a', obj)).toEqual(1)
  expect(propOr('default', 'a')(obj)).toEqual(1)
  expect(propOr('default')('notExist', obj)).toEqual('default')
  expect(propOr('default', 'notExist')(obj)).toEqual('default')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#propOr)

### props

```typescript

props<P extends string, T>(propsToPick: P[], obj: Record<P, T>): T[]
```

It takes list with properties `propsToPick` and returns a list with property values in `obj`.

```javascript
const result = [
  R.props(['a', 'b'], {a:1, c:3})
// => [1, undefined]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.props(%5B'a'%2C%20'b'%5D%2C%20%7Ba%3A1%2C%20c%3A3%7D)%0A%2F%2F%20%3D%3E%20%5B1%2C%20undefined%5D">Try this <strong>R.props</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.props</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { mapArray } from './map'

export function props(propsToPick, obj){
  if (arguments.length === 1){
    return _obj => props(propsToPick, _obj)
  }
  if (!_isArray(propsToPick)){
    throw new Error('propsToPick is not a list')
  }

  return mapArray(prop => obj[ prop ], propsToPick)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { props } from './props'

const obj = {
  a : 1,
  b : 2,
}
const propsToPick = [ 'a', 'c' ]

test('happy', () => {
  const result = props(propsToPick, obj)
  expect(result).toEqual([ 1, undefined ])
})

test('curried', () => {
  const result = props(propsToPick)(obj)
  expect(result).toEqual([ 1, undefined ])
})

test('wrong input', () => {
  expect(() => props(null)(obj)).toThrow()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#props)

### random

```typescript

random(minInclusive: number, maxInclusive: number): number
```

It returns a random number between `min` inclusive and `max` inclusive.

<details>

<summary><strong>R.random</strong> source</summary>

```javascript
export function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { random } from './random'
import { range } from './range'

test('when returns true', () => {
  range(0, 100).map(() => {
    const randomResult = random(1, 10)
    expect(randomResult).toBeLessThanOrEqual(10)
    expect(randomResult).toBeGreaterThanOrEqual(1)
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#random)

### range

```typescript

range(startInclusive: number, endExclusive: number): number[]
```

It returns list of numbers between `startInclusive` to `endExclusive` markers.

```javascript
R.range(0, 5)
// => [0, 1, 2, 3, 4]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.range(0%2C%205)%0A%2F%2F%20%3D%3E%20%5B0%2C%201%2C%202%2C%203%2C%204%5D">Try this <strong>R.range</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.range</strong> source</summary>

```javascript
export function range(start, end){
  if (arguments.length === 1) return _end => range(start, _end)

  if (Number.isNaN(Number(start)) || Number.isNaN(Number(end))){
    throw new TypeError('Both arguments to range must be numbers')
  }

  if (end < start) return []

  const len = end - start
  const willReturn = Array(len)

  for (let i = 0; i < len; i++){
    willReturn[ i ] = start + i
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { range } from './range'

test('happy', () => {
  expect(range(0, 10)).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
})

test('end range is bigger than start range', () => {
  expect(range(7, 3)).toEqual([])
  expect(range(5, 5)).toEqual([])
})

test('with bad input', () => {
  const throwMessage = 'Both arguments to range must be numbers'
  expect(() => range('a', 6)).toThrowWithMessage(Error, throwMessage)
  expect(() => range(6, 'z')).toThrowWithMessage(Error, throwMessage)
})

test('curry', () => {
  expect(range(0)(10)).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#range)

### reduce

```typescript

reduce<T, TResult>(reducer: (prev: TResult, current: T, i: number) => TResult, initialValue: TResult, list: T[]): TResult
```

> :boom: It passes index of the list as third argument to `reducer` function.

```javascript
const list = [1, 2, 3]
const initialValue = 10
const reducer = (prev, current) => prev * current

const result = R.reduce(reducer, initialValue, list)
// => 60
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0Aconst%20initialValue%20%3D%2010%0Aconst%20reducer%20%3D%20(prev%2C%20current)%20%3D%3E%20prev%20*%20current%0A%0Aconst%20result%20%3D%20R.reduce(reducer%2C%20initialValue%2C%20list)%0A%2F%2F%20%3D%3E%2060">Try this <strong>R.reduce</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.reduce</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { _keys } from './_internals/_keys'
import { curry } from './curry'

function reduceFn(
  reducer, acc, list
){
  if (!_isArray(list)){
    throw new TypeError('reduce: list must be array or iterable')
  }
  let index = 0
  const len = list.length

  while (index < len){
    acc = reducer(
      acc, list[ index ], index, list
    )
    index++
  }

  return acc
}

export const reduce = curry(reduceFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { reduce } from './reduce'

const reducer = (
  prev, current, i
) => {
  expect(i).toBeNumber()

  return prev + current
}
const initialValue = 1
const list = [ 1, 2, 3 ]

test('happy', () => {
  expect(reduce(
    reducer, initialValue, list
  )).toEqual(7)
})

test('with object as iterable', () => {
  expect(() =>
    reduce(
      reducer, initialValue, {
        a : 1,
        b : 2,
      }
    )).toThrowWithMessage(TypeError, 'reduce: list must be array or iterable')
})

test('with undefined as iterable', () => {
  expect(() => reduce(
    reducer, initialValue, undefined
  )).toThrowWithMessage(TypeError,
    'reduce: list must be array or iterable')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#reduce)

### reject

```typescript

reject<T>(predicate: Predicate<T>, list: T[]): T[]
```

It has the opposite effect of `R.filter`.

```javascript
const list = [1, 2, 3, 4]
const obj = {a: 1, b: 2}
const predicate = x => x > 1

const result = [
  R.reject(predicate, list)
  R.reject(predicate, obj)
]
// => [[1, 2], {a: 1}]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%7D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3E%201%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.reject(predicate%2C%20list)%0A%20%20R.reject(predicate%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B1%2C%202%5D%2C%20%7Ba%3A%201%7D%5D">Try this <strong>R.reject</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.reject</strong> source</summary>

```javascript
import { filter } from './filter'

export function reject(predicate, list){
  if (arguments.length === 1) return _list => reject(predicate, _list)

  return filter(x => !predicate(x), list)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { reject } from './reject'

const isOdd = n => n % 2 === 1

test('with array', () => {
  expect(reject(isOdd)([ 1, 2, 3, 4 ])).toEqual([ 2, 4 ])
})

test('with object', () => {
  const obj = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
  }
  expect(reject(isOdd, obj)).toEqual({
    b : 2,
    d : 4,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#reject)

### rejectIndexed

```typescript

rejectIndexed<T>(predicate: IndexedPredicate<T>): (x: T[]) => T[]
```

Same as `R.reject`, but it passes index/property as second argument to the predicate, when looping over arrays/objects.

```javascript
const list = [1, 2, 3, 4]
const obj = {a: 1, b: 2}

const result = [
  R.reject((x, index) => x > 1, list)
  R.reject((x, property) => x > 1, obj)
]
// => [[1], {a: 1}]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20obj%20%3D%20%7Ba%3A%201%2C%20b%3A%202%7D%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.reject((x%2C%20index)%20%3D%3E%20x%20%3E%201%2C%20list)%0A%20%20R.reject((x%2C%20property)%20%3D%3E%20x%20%3E%201%2C%20obj)%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B1%5D%2C%20%7Ba%3A%201%7D%5D">Try this <strong>R.rejectIndexed</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.rejectIndexed</strong> source</summary>

```javascript
import { filterArray, filterObject } from './filter'
import { _isArray } from './_internals/_isArray'

export function rejectIndexed(predicate, iterable){
  if (arguments.length === 1) return _iterable => rejectIndexed(predicate, _iterable)

  if (!iterable) throw new Error(`"${iterable}" is not iterable`)
  if (_isArray(iterable)) return filterArray((x, i) => !predicate(x, i), iterable, true)

  return filterObject((x, prop) => !predicate(x, prop), iterable, true)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { rejectIndexed } from './rejectIndexed'

test('with array', () => {
  expect(rejectIndexed((x, i) => {
    expect(x).toBeNumber()
    expect(i).toBeNumber()
  
    return x % 2 === 1
  })([ 1, 2, 3, 4 ])).toEqual([ 2, 4 ])
})

test('with object', () => {
  const obj = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
  }
  expect(rejectIndexed((x, prop) => {
    expect(x).toBeNumber()
    expect(prop).toBeString()
  
    return x % 2 === 1
  }, obj)).toEqual({
    b : 2,
    d : 4,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#rejectIndexed)

### remove

```typescript

remove(
  toRemove: string | RegExp | (string | RegExp)[],
  text: string
): string
```

It will remove all `toRemove` entries from `text` sequentially. 

`toRemove` argument can be either a list of strings/regular expressions or a single string/regular expression.

> :boom: This is the only case where Rambdax exports clashes with Ramda API, as Ramda has `remove` method. If `Rambda.remove` is introduced, then this method will be renamed.

```javascript
const result = remove(
  ['foo','bar'],
  'foo bar baz foo'
)
// => 'baz foo'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20remove(%0A%20%20%5B'foo'%2C'bar'%5D%2C%0A%20%20'foo%20bar%20baz%20foo'%0A)%0A%2F%2F%20%3D%3E%20'baz%20foo'">Try this <strong>R.remove</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.remove</strong> source</summary>

```javascript
import { replace } from './replace'
import { type } from './type'

export function remove(inputs, text){
  if (arguments.length === 1){
    return textHolder => remove(inputs, textHolder)
  }

  if (type(text) !== 'String'){
    throw new Error(`R.remove requires string not ${ type(text) }`)
  }

  if (type(inputs) !== 'Array'){
    return replace(
      inputs, '', text
    )
  }

  let textCopy = text

  inputs.forEach(singleInput => {
    textCopy = replace(
      singleInput, '', textCopy
    ).trim()
  })

  return textCopy
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { remove } from './remove'

test('happy', () => {
  const inputs = [ /foo/, /not\shere/, /also/, 'bar' ]
  const text = 'foo bar baz foo'

  const result = remove(inputs)(text)
  const expectedResult = 'baz foo'

  expect(result).toEqual(expectedResult)
})

test('with strings + curry', () => {
  const inputs = [ 'foo', 'bar' ]
  const text = 'foo bar baz foo'

  const result = remove(inputs)(text)
  const expectedResult = 'baz foo'

  expect(result).toEqual(expectedResult)
})

test('with strings and regex', () => {
  const inputs = [ /foo/g, 'bar' ]
  const text = 'foo bar baz foo'

  const result = remove(inputs, text)
  const expectedResult = 'baz'

  expect(result).toEqual(expectedResult)
})

test('text is not string', () => {
  const inputs = [ /foo/g, 'bar' ]
  const text = null

  expect(() => remove(inputs, text)).toThrowWithMessage(Error,
    'R.remove requires string not Null')
})

test('with regexes', () => {
  const inputs = [ /foo/g, /bar/ ]
  const text = 'foo bar baz foo'

  const result = remove(inputs, text)
  const expectedResult = 'baz'

  expect(result).toEqual(expectedResult)
})

test('with single rule', () => {
  const inputs = /foo/g
  const text = 'foo bar baz foo'

  const result = remove(inputs, text)
  const expectedResult = ' bar baz '

  expect(result).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#remove)

### removeIndex

```typescript

removeIndex<T>(index: number, list: T[]): T[]
```

It returns a copy of `list` input with removed `index`.

```javascript
const list = [1, 2, 3, 4]
const result = R.removeIndex(1, list)
// => [1, 3, 4]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20result%20%3D%20R.removeIndex(1%2C%20list)%0A%2F%2F%20%3D%3E%20%5B1%2C%203%2C%204%5D">Try this <strong>R.removeIndex</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.removeIndex</strong> source</summary>

```javascript
export function removeIndex(index, list){
  if (arguments.length === 1) return _list => removeIndex(index, _list)
  if (index <= 0) return list.slice(1)
  if (index >= list.length - 1) return list.slice(0, list.length - 1)

  return [ ...list.slice(0, index), ...list.slice(index + 1) ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import {removeIndex} from './removeIndex'

const list = [1, 2, 3, 4]

test('first or before first index', () => {
  expect(removeIndex(-2, list)).toEqual([2, 3, 4])
  expect(removeIndex(-2)(list)).toEqual([2, 3, 4])
})

test('last or after last index', () => {
  expect(removeIndex(4, list)).toEqual([1, 2, 3])
  expect(removeIndex(10, list)).toEqual([1, 2, 3])
})

test('middle index', () => {
  expect(removeIndex(1, list)).toEqual([1, 3, 4])
  expect(removeIndex(2, list)).toEqual([1, 2, 4])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#removeIndex)

### renameProps

```typescript

renameProps(rules: object, input: object): object
```

If property `prop` of `rules` is also a property in `input`, then rename `input` property to `rules[prop]`.

<details>

<summary><strong>R.renameProps</strong> source</summary>

```javascript
import { merge } from './merge'
import { omit } from './omit'

export function renameProps(conditions, inputObject){
  if (arguments.length === 1){
    return inputObjectHolder => renameProps(conditions, inputObjectHolder)
  }
  const renamed = {}
  Object.keys(conditions).forEach(condition => {
    if (Object.keys(inputObject).includes(condition)){
      renamed[ conditions[ condition ] ] = inputObject[ condition ]
    }
  })

  return merge(renamed, omit(Object.keys(conditions), inputObject))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { renameProps } from './renameProps'

test('renameProps', () => {
  const rules = {
    f : 'foo',
    b : 'bar',
    q : 'x',
  }
  const input = {
    f : 1,
    b : 2,
    a : 3,
  }
  const result = renameProps(rules, input)
  const expectedResult = {
    foo : 1,
    bar : 2,
    a   : 3,
  }
  expect(result).toEqual(expectedResult)
})

test('curry', () => {
  const rules = {
    f : 'foo',
    b : 'bar',
  }
  const input = {
    f : 1,
    b : 2,
  }
  const result = renameProps(rules)(input)
  const expectedResult = {
    foo : 1,
    bar : 2,
  }
  expect(result).toEqual(expectedResult)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#renameProps)

### repeat

```typescript

repeat<T>(x: T): (timesToRepeat: number) => T[]
```

```javascript
R.repeat('foo', 3)
// => ['foo', 'foo', 'foo']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.repeat('foo'%2C%203)%0A%2F%2F%20%3D%3E%20%5B'foo'%2C%20'foo'%2C%20'foo'%5D">Try this <strong>R.repeat</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.repeat</strong> source</summary>

```javascript
export function repeat(x, timesToRepeat){
  if (arguments.length === 1){
    return _timesToRepeat => repeat(x, _timesToRepeat)
  }

  return Array(timesToRepeat).fill(x)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { repeat } from './repeat'

test('repeat', () => {
  expect(repeat('')(3)).toEqual([ '', '', '' ])
  expect(repeat('foo', 3)).toEqual([ 'foo', 'foo', 'foo' ])

  const obj = {}
  const arr = repeat(obj, 3)

  expect(arr).toEqual([ {}, {}, {} ])

  expect(arr[ 0 ] === arr[ 1 ]).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#repeat)

### replace

```typescript

replace(strOrRegex: RegExp | string, replacer: string, str: string): string
```

It replaces `strOrRegex` found in `str` with `replacer`.

```javascript
const strOrRegex = /o/g

const result = R.replace(strOrRegex, '|0|', 'foo')
// => 'f|0||0|'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20strOrRegex%20%3D%20%2Fo%2Fg%0A%0Aconst%20result%20%3D%20R.replace(strOrRegex%2C%20'%7C0%7C'%2C%20'foo')%0A%2F%2F%20%3D%3E%20'f%7C0%7C%7C0%7C'">Try this <strong>R.replace</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.replace</strong> source</summary>

```javascript
import { curry } from './curry'

function replaceFn(
  pattern, replacer, str
){
  return str.replace(pattern, replacer)
}

export const replace = curry(replaceFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { replace } from './replace'

test('happy', () => {
  expect(replace(
    'foo', 'yes', 'foo bar baz'
  )).toEqual('yes bar baz')
})

test('1', () => {
  expect(replace(/\s/g)('|')('foo bar baz')).toEqual('foo|bar|baz')
})

test('2', () => {
  expect(replace(/\s/g)('|', 'foo bar baz')).toEqual('foo|bar|baz')
})

test('3', () => {
  expect(replace(/\s/g, '|')('foo bar baz')).toEqual('foo|bar|baz')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#replace)

### replaceAll

```typescript

replaceAll(patterns: (RegExp | string)[], replacer: string, input: string): string
```

Same as `R.replace` but it accepts array of string and regular expressions instead of a single value.

```javascript
const replacer = '|'
const patterns = [ /foo/g, 'bar' ]
const input = 'foo bar baz foo bar'

const result = replaceAll(patterns, replacer, input)
// => '| | baz | bar'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20replacer%20%3D%20'%7C'%0Aconst%20patterns%20%3D%20%5B%20%2Ffoo%2Fg%2C%20'bar'%20%5D%0Aconst%20input%20%3D%20'foo%20bar%20baz%20foo%20bar'%0A%0Aconst%20result%20%3D%20replaceAll(patterns%2C%20replacer%2C%20input)%0A%2F%2F%20%3D%3E%20'%7C%20%7C%20baz%20%7C%20bar'">Try this <strong>R.replaceAll</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.replaceAll</strong> source</summary>

```javascript
import { curry } from './curry'
import { ok } from './ok'

function replaceAllFn(
  patterns, replacer, input
){
  ok(
    patterns, replacer, input
  )(
    Array, String, String
  )

  let text = input
  patterns.forEach(singlePattern => {
    text = text.replace(singlePattern, replacer)
  })

  return text
}

export const replaceAll = curry(replaceAllFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { replaceAll } from './replaceAll'

const replacer = '|'
const patterns = [ /foo/g, 'bar' ]
const input = 'foo bar baz foo bar'

test('happy', () => {
  const result = replaceAll(
    patterns, replacer, input
  )
  const expected = '| | baz | bar'

  expect(result).toEqual(expected)
})

test('throws when wrong patterns', () => {
  expect(() => replaceAll(
    {}, replacer, input
  )).toThrow()
})

test('throws when wrong input', () => {
  expect(() => replaceAll(
    patterns, replacer, []
  )).toThrow()
})

test('throws when wrong replacer', () => {
  expect(() => replaceAll(
    patterns, null, input
  )).toThrow()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#replaceAll)

### reset

```typescript

reset(): void
```

> :boom: `R.getter` method contains explanations, tests and source information of `R.reset`, `R.setter` and `R.getter` methods.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#reset)

### reverse

```typescript

reverse<T>(input: T[]): T[]
```

It returns a reversed copy of list or string `input`.

```javascript
const result = [
  R.reverse('foo'),
  R.reverse([1, 2, 3])
]
// => ['oof', [3, 2, 1]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.reverse('foo')%2C%0A%20%20R.reverse(%5B1%2C%202%2C%203%5D)%0A%5D%0A%2F%2F%20%3D%3E%20%5B'oof'%2C%20%5B3%2C%202%2C%201%5D">Try this <strong>R.reverse</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.reverse</strong> source</summary>

```javascript
export function reverse(listOrString){
  if (typeof listOrString === 'string'){
    return listOrString.split('').reverse()
      .join('')
  }

  const clone = listOrString.slice()

  return clone.reverse()
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { reverse } from './reverse'

test('happy', () => {
  expect(reverse([ 1, 2, 3 ])).toEqual([ 3, 2, 1 ])
})

test('with string', () => {
  expect(reverse('baz')).toEqual('zab')
})

test('it doesn\'t mutate', () => {
  const arr = [ 1, 2, 3 ]

  expect(reverse(arr)).toEqual([ 3, 2, 1 ])

  expect(arr).toEqual([ 1, 2, 3 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#reverse)

### set

```typescript

set<T, U>(lens: Lens, replacer: U, obj: T): T
```

It returns a copied **Object** or **Array** with modified `lens` focus set to `replacer` value.

```javascript
const input = {x: 1, y: 2}
const xLens = R.lensProp('x')

R.set(xLens, 4, input) // => {x: 4, y: 2}
R.set(xLens, 8, input) // => {x: 8, y: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20input%20%3D%20%7Bx%3A%201%2C%20y%3A%202%7D%0Aconst%20xLens%20%3D%20R.lensProp('x')%0A%0AR.set(xLens%2C%204%2C%20input)%20%2F%2F%20%3D%3E%20%7Bx%3A%204%2C%20y%3A%202%7D%0AR.set(xLens%2C%208%2C%20input)%20%2F%2F%20%3D%3E%20%7Bx%3A%208%2C%20y%3A%202%7D">Try this <strong>R.set</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.set</strong> source</summary>

```javascript
import { always } from './always'
import { curry } from './curry'
import { over } from './over'

function setFn(
  lens, replacer, x
){
  return over(
    lens, always(replacer), x
  )
}

export const set = curry(setFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { assoc } from './assoc'
import { lens } from './lens'
import { lensIndex } from './lensIndex'
import { lensPath } from './lensPath'
import { prop } from './prop'
import { set } from './set'

const testObject = {
  foo : 'bar',
  baz : {
    a : 'x',
    b : 'y',
  },
}

test('assoc lens', () => {
  const assocLens = lens(prop('foo'), assoc('foo'))
  const result = set(
    assocLens, 'FOO', testObject
  )
  const expected = {
    ...testObject,
    foo : 'FOO',
  }
  expect(result).toEqual(expected)
})

test('path lens', () => {
  const pathLens = lensPath('baz.a')
  const result = set(
    pathLens, 'z', testObject
  )
  const expected = {
    ...testObject,
    baz : {
      a : 'z',
      b : 'y',
    },
  }
  expect(result).toEqual(expected)
})

test('index lens', () => {
  const indexLens = lensIndex(0)

  const result = set(
    indexLens, 3, [ 1, 2 ]
  )
  expect(result).toEqual([ 3, 2 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#set)

### setter

```typescript

setter(keyOrObject: string | object, value?: any): void
```

> :boom: `R.getter` method contains explanations, tests and source information of `R.reset`, `R.setter` and `R.getter` methods.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#setter)

### shuffle

```typescript

shuffle<T>(list: T[]): T[]
```

It returns a randomized copy of array.

<details>

<summary><strong>R.shuffle</strong> source</summary>

```javascript
export function shuffle(arrayRaw){
  const array = arrayRaw.concat()
  let counter = array.length
  while (counter > 0){
    const index = Math.floor(Math.random() * counter)
    counter--
    const temp = array[ counter ]
    array[ counter ] = array[ index ]
    array[ index ] = temp
  }

  return array
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { range } from './range'
import { shuffle } from './shuffle'
import { uniq } from './uniq'

test('happy', () => {
  const list = range(0, 7)
  const result = range(0, 300).map(() => shuffle(list))
  const allUniq = uniq(result)
  expect(allUniq.length > 150).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#shuffle)

### slice

```typescript

slice(from: number, to: number, input: string): string
```

```javascript
const list = [0, 1, 2, 3, 4, 5]
const str = 'FOO_BAR'
const from = 1
const to = 4

const result = [
  R.slice(str, to, list),
  R.slice(from, to, list)
]
// => ['OO_', [1, 2, 3]]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B0%2C%201%2C%202%2C%203%2C%204%2C%205%5D%0Aconst%20str%20%3D%20'FOO_BAR'%0Aconst%20from%20%3D%201%0Aconst%20to%20%3D%204%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.slice(str%2C%20to%2C%20list)%2C%0A%20%20R.slice(from%2C%20to%2C%20list)%0A%5D%0A%2F%2F%20%3D%3E%20%5B'OO_'%2C%20%5B1%2C%202%2C%203%5D%5D">Try this <strong>R.slice</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.slice</strong> source</summary>

```javascript
import { curry } from './curry'

function sliceFn(
  from, to, list
){
  return list.slice(from, to)
}

export const slice = curry(sliceFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { slice } from './slice'

test('slice', () => {
  expect(slice(
    1, 3, [ 'a', 'b', 'c', 'd' ]
  )).toEqual([ 'b', 'c' ])
  expect(slice(
    1, Infinity, [ 'a', 'b', 'c', 'd' ]
  )).toEqual([ 'b', 'c', 'd' ])
  expect(slice(
    0, -1, [ 'a', 'b', 'c', 'd' ]
  )).toEqual([ 'a', 'b', 'c' ])
  expect(slice(
    -3, -1, [ 'a', 'b', 'c', 'd' ]
  )).toEqual([ 'b', 'c' ])
  expect(slice(
    0, 3, 'ramda'
  )).toEqual('ram')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#slice)

### sort

```typescript

sort<T>(sortFn: (a: T, b: T) => number, list: T[]): T[]
```

It returns copy of `list` sorted by `sortFn` function.

> :boom: `sortFn` function must return a number.

```javascript
const list = [
  {a: 2},
  {a: 3},
  {a: 1}
]
const sortFn = (x, y) => {
  return x.a > y.a ? 1 : -1
}

const result = R.sort(sortFn, list)
const expected = [
  {a: 1},
  {a: 2},
  {a: 3}
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%0A%20%20%7Ba%3A%202%7D%2C%0A%20%20%7Ba%3A%203%7D%2C%0A%20%20%7Ba%3A%201%7D%0A%5D%0Aconst%20sortFn%20%3D%20(x%2C%20y)%20%3D%3E%20%7B%0A%20%20return%20x.a%20%3E%20y.a%20%3F%201%20%3A%20-1%0A%7D%0A%0Aconst%20result%20%3D%20R.sort(sortFn%2C%20list)%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Ba%3A%201%7D%2C%0A%20%20%7Ba%3A%202%7D%2C%0A%20%20%7Ba%3A%203%7D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.sort</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.sort</strong> source</summary>

```javascript
export function sort(sortFn, list){
  if (arguments.length === 1) return _list => sort(sortFn, _list)

  const clone = list.slice()

  return clone.sort(sortFn)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { sort } from './sort'

const fn = (a, b) => a > b ? 1 : -1

test('sort', () => {
  expect(sort((a, b) => a - b)([ 2, 3, 1 ])).toEqual([ 1, 2, 3 ])
})

test('it doesn\'t mutate', () => {
  const list = [ 'foo', 'bar', 'baz' ]

  expect(sort(fn, list)).toEqual([ 'bar', 'baz', 'foo' ])

  expect(list[ 0 ]).toBe('foo')
  expect(list[ 1 ]).toBe('bar')
  expect(list[ 2 ]).toBe('baz')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#sort)

### sortBy

```typescript

sortBy<T>(sortFn: (a: T) => Ord, list: T[]): T[]
```

It returns copy of `list` sorted by `sortFn` function.

> :boom: `sortFn` function must return a value to compare.

```javascript
const list = [
  {a: 2},
  {a: 3},
  {a: 1}
]
const sortFn = x => x.a

const result = R.sortBy(sortFn, list)
const expected = [
  {a: 1},
  {a: 2},
  {a: 3}
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%0A%20%20%7Ba%3A%202%7D%2C%0A%20%20%7Ba%3A%203%7D%2C%0A%20%20%7Ba%3A%201%7D%0A%5D%0Aconst%20sortFn%20%3D%20x%20%3D%3E%20x.a%0A%0Aconst%20result%20%3D%20R.sortBy(sortFn%2C%20list)%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Ba%3A%201%7D%2C%0A%20%20%7Ba%3A%202%7D%2C%0A%20%20%7Ba%3A%203%7D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.sortBy</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.sortBy</strong> source</summary>

```javascript
export function sortBy(sortFn, list){
  if (arguments.length === 1) return _list => sortBy(sortFn, _list)

  const clone = list.slice()

  return clone.sort((a, b) => {
    const aSortResult = sortFn(a)
    const bSortResult = sortFn(b)

    if (aSortResult === bSortResult) return 0

    return aSortResult < bSortResult ? -1 : 1
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { compose } from './compose'
import { prop } from './prop'
import { sortBy } from './sortBy'
import { toLower } from './toLower'

test('happy', () => {
  const input = [ { a : 2 }, { a : 1 }, { a : 1 }, { a : 3 } ]
  const expected = [ { a : 1 }, { a : 1 }, { a : 2 }, { a : 3 } ]

  const result = sortBy(x => x.a)(input)
  expect(result).toEqual(expected)
})

test('with compose', () => {
  const alice = {
    name : 'ALICE',
    age  : 101,
  }
  const bob = {
    name : 'Bob',
    age  : -10,
  }
  const clara = {
    name : 'clara',
    age  : 314.159,
  }
  const people = [ clara, bob, alice ]
  const sortByNameCaseInsensitive = sortBy(compose(toLower, prop('name')))

  expect(sortByNameCaseInsensitive(people)).toEqual([ alice, bob, clara ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#sortBy)

### sortByPath

```typescript

sortByPath<T>(sortPath: Path, list: T[]): T[]
```

It returns copy of `list` sorted by `sortPath` value. 

As `sortPath` is passed to `R.path`, it can be either a string or an array of strings.

```javascript
const list = [
  {a: {b: 2}},
  {a: {b: 1}},
  {a: {b: 3}}
]
const result = R.sortByPath('a.b', list)
const expected = [
  {a: {b: 1}},
  {a: {b: 2}},
  {a: {b: 3}}
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%0A%20%20%7Ba%3A%20%7Bb%3A%202%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%201%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%203%7D%7D%0A%5D%0Aconst%20result%20%3D%20R.sortByPath('a.b'%2C%20list)%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Ba%3A%20%7Bb%3A%201%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%202%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%203%7D%7D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.sortByPath</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.sortByPath</strong> source</summary>

```javascript
import { path } from './path'
import { sortBy } from './sortBy'

export function sortByPath(sortPath, list){
  if (arguments.length === 1) return _list => sortByPath(sortPath, _list)

  return sortBy(path(sortPath), list)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { sortByPath } from './sortByPath'

const list = [ { a : { b : 3 } }, { a : { b : 1 } }, { a : { b : 2 } } ]
const sorted = [ { a : { b : 1 } }, { a : { b : 2 } }, { a : { b : 3 } } ]

test('with string as path', () => {
  expect(sortByPath('a.b', list)).toEqual(sorted)
})

test('with list of strings as path', () => {
  expect(sortByPath([ 'a', 'b' ], list)).toEqual(sorted)
})

test('with string as path - curried', () => {
  expect(sortByPath('a.b')(list)).toEqual(sorted)
})

test('with list of strings as path - curried', () => {
  expect(sortByPath([ 'a', 'b' ])(list)).toEqual(sorted)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#sortByPath)

### sortByProps

```typescript

sortByProps<T>(sortPaths: string[], list: T[]): T[]
```

It returns sorted copy of `list` of objects.

Sorting is done using a list of strings, each representing a path. Two members `a` and `b` from `list` can be sorted if both return a value for a given path. If the value is equal, then the next member of `sortPaths`(if there is such) will be used in order to find difference between `a` and `b`.

```javascript
const list = [
  {a: {b: 2}},
  {a: {b: 1}},
  {a: {b: 3}}
]
const result = R.sortByPath('a.b', list)
const expected = [
  {a: {b: 1}},
  {a: {b: 2}},
  {a: {b: 3}}
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%0A%20%20%7Ba%3A%20%7Bb%3A%202%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%201%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%203%7D%7D%0A%5D%0Aconst%20result%20%3D%20R.sortByPath('a.b'%2C%20list)%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Ba%3A%20%7Bb%3A%201%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%202%7D%7D%2C%0A%20%20%7Ba%3A%20%7Bb%3A%203%7D%7D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.sortByProps</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.sortByProps</strong> source</summary>

```javascript
import { path } from './path'

function singleSort(
  a, b, sortPaths
){
  let toReturn = 0
  sortPaths.forEach(singlePath => {
    if (toReturn !== 0) return
    const aResult = path(singlePath, a)
    const bResult = path(singlePath, b)
    if ([ aResult, bResult ].includes(undefined)) return
    if (aResult === bResult) return

    toReturn = aResult > bResult ? 1 : -1
  })

  return toReturn
}

export function sortByProps(sortPaths, list){
  if (arguments.length === 1) return _list => sortByProps(sortPaths, _list)
  const clone = list.slice()

  clone.sort((a, b) => singleSort(
    a, b, sortPaths
  ))

  return clone
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { sortByProps } from './sortByProps'

const list = [ { a : { b : 3 } }, { a : { b : 2 } }, { a : { b : 1 } } ]
const sorted = [ { a : { b : 1 } }, { a : { b : 2 } }, { a : { b : 3 } } ]

test('wrong paths are ignored', () => {
  expect(sortByProps([ 'foo.bar', 'a.c', 'a.b', 'a.d' ], list)).toEqual(sorted)
})

test('skip sort when path results are equal', () => {
  const input = [
    {
      a : {
        b : 0,
        c : 2,
      },
    },
    {
      a : {
        b : 0,
        c : 1,
      },
    },
  ]
  expect(sortByProps([ 'a.b', 'a.d' ], input)).toEqual(input)
})

test('when list is already sorted', () => {
  const input = [
    {
      a : {
        b : 0,
        c : 1,
      },
    },
    {
      a : {
        b : 0,
        c : 2,
      },
    },
  ]
  expect(sortByProps([ 'a.b', 'a.c' ])(input)).toEqual(input)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#sortByProps)

### sortObject

```typescript

sortObject<T>(predicate: SortObjectPredicate<T>, input: { [key: string]: T }): { [keyOutput: string]: T }
```

It returns a sorted version of `input` object.

```javascript
const predicate = (propA, propB, valueA, valueB) => valueA > valueB ? -1 : 1

const result = R.sortObject(predicate, {a:1, b: 4, c: 2})
// => {b: 4, c: 2, a: 1}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20predicate%20%3D%20(propA%2C%20propB%2C%20valueA%2C%20valueB)%20%3D%3E%20valueA%20%3E%20valueB%20%3F%20-1%20%3A%201%0A%0Aconst%20result%20%3D%20R.sortObject(predicate%2C%20%7Ba%3A1%2C%20b%3A%204%2C%20c%3A%202%7D)%0A%2F%2F%20%3D%3E%20%7Bb%3A%204%2C%20c%3A%202%2C%20a%3A%201%7D">Try this <strong>R.sortObject</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.sortObject</strong> source</summary>

```javascript
import { sort } from './sort'

export function sortObject(predicate, obj){
  if (arguments.length === 1){
    return _obj => sortObject(predicate, _obj)
  }
  const keys = Object.keys(obj)
  const sortedKeys = sort((a, b) => predicate(
    a, b, obj[ a ], obj[ b ]
  ), keys)

  const toReturn = {}
  sortedKeys.forEach(singleKey => {
    toReturn[ singleKey ] = obj[ singleKey ]
  })

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { runTests } from 'helpers-fn'

import { allTrue } from './allTrue'
import { equals } from './equals'
import { sortObject } from './sortObject'

const obj = {
  c : 1,
  a : 2,
  b : 3,
}

const predicateA = (
  propA, propB, valueA, valueB
) => propA > propB ? -1 : 1

const expectationA = [ 'c', 'b', 'a' ]

const predicateB = (
  propA, propB, valueA, valueB
) => propA < propB ? -1 : 1
const expectationB = [ 'a', 'b', 'c' ]
const predicateC = (
  propA, propB, valueA, valueB
) =>
  valueA > valueB ? -1 : 1
const expectationC = [ 'b', 'a', 'c' ]

const fn = ([ predicate, expectation ]) => {
  const result = sortObject(predicate, obj)
  const curriedResult = sortObject(predicate)(obj)
  const sortedKeys = Object.keys(result)
  const sortedKeysCurried = Object.keys(curriedResult)
  const isSameObject = equals(obj, result)
  const isSameObjectCurried = equals(obj, curriedResult)

  return allTrue(
    isSameObject,
    isSameObjectCurried,
    equals(sortedKeys, expectation),
    equals(sortedKeysCurried, expectation)
  )
}

const testData = {
  label : 'foo',
  data  : [
    { ok : [ predicateA, expectationA ] },
    { ok : [ predicateB, expectationB ] },
    { ok : [ predicateC, expectationC ] },
  ],
  fn,
}

runTests(testData)
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#sortObject)

### split

```typescript

split(separator: string | RegExp): (str: string) => string[]
```

Curried version of `String.prototype.split`

```javascript
const str = 'foo|bar|baz'
const separator = |'
const result = R.split(separator, str))
// => [ 'foo', 'bar', 'baz' ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20str%20%3D%20'foo%7Cbar%7Cbaz'%0Aconst%20separator%20%3D%20%7C'%0Aconst%20result%20%3D%20R.split(separator%2C%20str))%0A%2F%2F%20%3D%3E%20%5B%20'foo'%2C%20'bar'%2C%20'baz'%20%5D">Try this <strong>R.split</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.split</strong> source</summary>

```javascript
export function split(separator, str){
  if (arguments.length === 1) return _str => split(separator, _str)

  return str.split(separator)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { split } from './split'

const str = 'foo|bar|baz'
const splitChar = '|'
const expected = [ 'foo', 'bar', 'baz' ]

test('happy', () => {
  expect(split(splitChar, str)).toEqual(expected)
})

test('curried', () => {
  expect(split(splitChar)(str)).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#split)

### splitAt

```typescript

splitAt<T>(index: number, input: T[]): [T[], T[]]
```

It splits string or array at a given index.

```javascript
const list = [ 1, 2, 3 ]
const result = splitAt(2, list)
// => [[ 1, 2 ], [ 3 ]]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%201%2C%202%2C%203%20%5D%0Aconst%20result%20%3D%20splitAt(2%2C%20list)%0A%2F%2F%20%3D%3E%20%5B%5B%201%2C%202%20%5D%2C%20%5B%203%20%5D%5D">Try this <strong>R.splitAt</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.splitAt</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'
import { drop } from './drop'
import { maybe } from './maybe'
import { take } from './take'

export function splitAt(index, input){
  if (arguments.length === 1){
    return _list => splitAt(index, _list)
  }
  if (!input) throw new TypeError(`Cannot read property 'slice' of ${ input }`)

  if (!_isArray(input) && typeof input !== 'string') return [ [], [] ]

  const correctIndex = maybe(
    index < 0,
    input.length + index < 0 ? 0 : input.length + index,
    index
  )

  return [ take(correctIndex, input), drop(correctIndex, input) ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { splitAt as splitAtRamda } from 'ramda'

import { splitAt } from './splitAt'

const list = [ 1, 2, 3 ]
const str = 'foo bar'

test('with array', () => {
  const result = splitAt(2, list)
  expect(result).toEqual([ [ 1, 2 ], [ 3 ] ])
})

test('with array - index is negative number', () => {
  const result = splitAt(-6, list)
  expect(result).toEqual([ [], list ])
})

test('with array - index is out of scope', () => {
  const result = splitAt(4, list)
  expect(result).toEqual([ [ 1, 2, 3 ], [] ])
})

test('with string', () => {
  const result = splitAt(4, str)
  expect(result).toEqual([ 'foo ', 'bar' ])
})

test('with string - index is negative number', () => {
  const result = splitAt(-2, str)
  expect(result).toEqual([ 'foo b', 'ar' ])
})

test('with string - index is out of scope', () => {
  const result = splitAt(10, str)
  expect(result).toEqual([ str, '' ])
})

test('with array - index is out of scope', () => {
  const result = splitAt(4)(list)
  expect(result).toEqual([ [ 1, 2, 3 ], [] ])
})

const badInputs = [ 1, true, /foo/g, {} ]
const throwingBadInputs = [ null, undefined ]

test('with bad inputs', () => {
  throwingBadInputs.forEach(badInput => {
    expect(() => splitAt(1, badInput)).toThrowWithMessage(TypeError,
      `Cannot read property 'slice' of ${ badInput }`)
    expect(() => splitAtRamda(1, badInput)).toThrowWithMessage(TypeError,
      `Cannot read property 'slice' of ${ badInput }`)
  })

  badInputs.forEach(badInput => {
    const result = splitAt(1, badInput)
    const ramdaResult = splitAtRamda(1, badInput)
    expect(result).toEqual(ramdaResult)
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#splitAt)

### splitEvery

```typescript

splitEvery<T>(sliceLength: number, input: T[]): (T[])[]
```

It splits `input` into slices of `sliceLength`.

```javascript
const result = [
  R.splitEvery(2, [1, 2, 3]), 
  R.splitEvery(3, 'foobar') 
]

const expected = [
  [[1, 2], [3]],
  ['foo', 'bar']
]
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.splitEvery(2%2C%20%5B1%2C%202%2C%203%5D)%2C%20%0A%20%20R.splitEvery(3%2C%20'foobar')%20%0A%5D%0A%0Aconst%20expected%20%3D%20%5B%0A%20%20%5B%5B1%2C%202%5D%2C%20%5B3%5D%5D%2C%0A%20%20%5B'foo'%2C%20'bar'%5D%0A%5D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.splitEvery</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.splitEvery</strong> source</summary>

```javascript
export function splitEvery(sliceLength, listOrString){
  if (arguments.length === 1){
    return _listOrString => splitEvery(sliceLength, _listOrString)
  }

  if (sliceLength < 1){
    throw new Error('First argument to splitEvery must be a positive integer')
  }

  const willReturn = []
  let counter = 0

  while (counter < listOrString.length){
    willReturn.push(listOrString.slice(counter, counter += sliceLength))
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { splitEvery } from './splitEvery'

test('happy', () => {
  expect(splitEvery(3, [ 1, 2, 3, 4, 5, 6, 7 ])).toEqual([
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7 ],
  ])

  expect(splitEvery(3)('foobarbaz')).toEqual([ 'foo', 'bar', 'baz' ])
})

test('with bad input', () => {
  expect(() =>
    expect(splitEvery(0)('foo')).toEqual([ 'f', 'o', 'o' ])).toThrowWithMessage(Error,
    'First argument to splitEvery must be a positive integer')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#splitEvery)

### splitWhen

```typescript

splitWhen<T, U>(predicate: Predicate<T>, list: U[]): (U[])[]
```

It splits `list` to two arrays according to a `predicate` function. 

The first array contains all members of `list` before `predicate` returns `true`.

```javascript
const list = [1, 2, 1, 2]
const result = R.splitWhen(R.equals(2), list)
// => [[1], [2, 1, 2]]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%201%2C%202%5D%0Aconst%20result%20%3D%20R.splitWhen(R.equals(2)%2C%20list)%0A%2F%2F%20%3D%3E%20%5B%5B1%5D%2C%20%5B2%2C%201%2C%202%5D%5D">Try this <strong>R.splitWhen</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.splitWhen</strong> source</summary>

```javascript
export function splitWhen(predicate, input){
  if (arguments.length === 1){
    return _input => splitWhen(predicate, _input)
  }
  if (!input)
    throw new TypeError(`Cannot read property 'length' of ${ input }`)

  const preFound = []
  const postFound = []
  let found = false
  let counter = -1

  while (counter++ < input.length - 1){
    if (found){
      postFound.push(input[ counter ])
    } else if (predicate(input[ counter ])){
      postFound.push(input[ counter ])
      found = true
    } else {
      preFound.push(input[ counter ])
    }
  }

  return [ preFound, postFound ]
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { splitWhen as splitWhenRamda } from 'ramda'

import { equals } from './equals'
import { splitWhen } from './splitWhen'

const list = [ 1, 2, 1, 2 ]

test('happy', () => {
  const result = splitWhen(equals(2), list)
  expect(result).toEqual([ [ 1 ], [ 2, 1, 2 ] ])
})

test('when predicate returns false', () => {
  const result = splitWhen(equals(3))(list)
  expect(result).toEqual([ list, [] ])
})

const badInputs = [ 1, true, /foo/g, {} ]
const throwingBadInputs = [ null, undefined ]

test('with bad inputs', () => {
  throwingBadInputs.forEach(badInput => {
    expect(() => splitWhen(equals(2), badInput)).toThrowWithMessage(TypeError,
      `Cannot read property 'length' of ${ badInput }`)
    expect(() => splitWhenRamda(equals(2), badInput)).toThrowWithMessage(TypeError,
      `Cannot read property 'length' of ${ badInput }`)
  })

  badInputs.forEach(badInput => {
    const result = splitWhen(equals(2), badInput)
    const ramdaResult = splitWhenRamda(equals(2), badInput)
    expect(result).toEqual(ramdaResult)
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#splitWhen)

### startsWith

```typescript

startsWith(target: string, str: string): boolean
```

Curried version of `String.prototype.startsWith`

> :boom: It doesn't work with arrays unlike its corresponding **Ramda** method.

```javascript
const str = 'foo-bar'

const result = [
  R.startsWith('foo', str),
  R.startsWith('bar', str)
]
// => [true, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20str%20%3D%20'foo-bar'%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.startsWith('foo'%2C%20str)%2C%0A%20%20R.startsWith('bar'%2C%20str)%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%5D">Try this <strong>R.startsWith</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.startsWith</strong> source</summary>

```javascript
export function startsWith(target, str){
  if (arguments.length === 1) return _str => startsWith(target, _str)

  return str.startsWith(target)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { startsWith } from './startsWith'

test('true', () => {
  const result = startsWith('foo', 'foo-bar')

  expect(result).toBeTrue()
})

test('false', () => {
  const result = startsWith('baz')('foo-bar')

  expect(result).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#startsWith)

### subtract

Curried version of `x - y`

```javascript
const x = 3
const y = 1

R.subtract(x, y) 
// => 2
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20x%20%3D%203%0Aconst%20y%20%3D%201%0A%0AR.subtract(x%2C%20y)%20%0A%2F%2F%20%3D%3E%202">Try this <strong>R.subtract</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#subtract)

### sum

```typescript

sum(list: number[]): number
```

```javascript
R.sum([1, 2, 3, 4, 5]) 
// => 15
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.sum(%5B1%2C%202%2C%203%2C%204%2C%205%5D)%20%0A%2F%2F%20%3D%3E%2015">Try this <strong>R.sum</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.sum</strong> source</summary>

```javascript
export function sum(list){
  return list.reduce((prev, current) => prev + current, 0)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { sum } from './sum'

test('happy', () => {
  expect(sum([ 1, 2, 3, 4, 5 ])).toBe(15)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#sum)

### switcher

```typescript

switcher<T>(valueToMatch: any): Switchem<T>
```

Edited fork of [Switchem](https://github.com/planttheidea/switchem) library.

The method return a value if the matched option is a value.

If the matched option is a function, then `R.switcher` returns a function which expects input. Tests of the method explain it better than this short description.

`R.equals` is used to determine equality.

```javascript
const valueToMatch = {foo: 1}

const result = R.switcher(valueToMatch)
  .is('baz', 'is baz')
  .is(x => typeof x === 'boolean', 'is boolean')
  .is({foo: 1}, 'Property foo is 1')
  .default('is bar')

// => 'Property foo is 1'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20valueToMatch%20%3D%20%7Bfoo%3A%201%7D%0A%0Aconst%20result%20%3D%20R.switcher(valueToMatch)%0A%20%20.is('baz'%2C%20'is%20baz')%0A%20%20.is(x%20%3D%3E%20typeof%20x%20%3D%3D%3D%20'boolean'%2C%20'is%20boolean')%0A%20%20.is(%7Bfoo%3A%201%7D%2C%20'Property%20foo%20is%201')%0A%20%20.default('is%20bar')%0A%0A%2F%2F%20%3D%3E%20'Property%20foo%20is%201'">Try this <strong>R.switcher</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.switcher</strong> source</summary>

```javascript
import { equals } from './equals'

const NO_MATCH_FOUND = Symbol ? Symbol('NO_MATCH_FOUND') : undefined

const getMatchingKeyValuePair = (
  cases, testValue, defaultValue
) => {
  let iterationValue

  for (let index = 0; index < cases.length; index++){
    iterationValue = cases[ index ].test(testValue)

    if (iterationValue !== NO_MATCH_FOUND){
      return iterationValue
    }
  }

  return defaultValue
}

const isEqual = (testValue, matchValue) => {
  const willReturn =
    typeof testValue === 'function' ?
      testValue(matchValue) :
      equals(testValue, matchValue)

  return willReturn
}

const is = (testValue, matchResult = true) => ({
  key  : testValue,
  test : matchValue =>
    isEqual(testValue, matchValue) ? matchResult : NO_MATCH_FOUND,
})

class Switchem{
  constructor(
    defaultValue, cases, willMatch
  ){
    if (cases === undefined && willMatch === undefined){
      this.cases = []
      this.defaultValue = undefined
      this.willMatch = defaultValue
    } else {
      this.cases = cases
      this.defaultValue = defaultValue
      this.willMatch = willMatch
    }

    return this
  }

  default(defaultValue){
    const holder = new Switchem(
      defaultValue, this.cases, this.willMatch
    )

    return holder.match(this.willMatch)
  }

  is(testValue, matchResult){
    return new Switchem(
      this.defaultValue,
      [ ...this.cases, is(testValue, matchResult) ],
      this.willMatch
    )
  }

  match(matchValue){
    return getMatchingKeyValuePair(
      this.cases, matchValue, this.defaultValue
    )
  }
}

export function switcher(input){
  return new Switchem(input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { switcher } from './switcher'
import { tap } from './tap'
import { trim } from './trim'

test('with undefined', () => {
  const result = switcher(undefined)
    .is(x => x === 0, '0')
    .is(x => x === undefined, 'UNDEFINED')
    .default('3')

  expect(result).toEqual('UNDEFINED')
})

test('happy', () => {
  const a = true
  const b = false
  const result = switcher([ a, b ])
    .is([ false, false ], '0')
    .is([ false, true ], '1')
    .is([ true, true ], '2')
    .default('3')

  expect(result).toEqual('3')
})

test('can compare objects', () => {
  const result = switcher({ a : 1 })
    .is({ a : 1 }, 'it is object')
    .is('baz', 'it is baz')
    .default('it is default')

  expect(result).toEqual('it is object')
})

test('options are mixture of functions and values - input match function', () => {
  const fn = switcher('foo').is('bar', 1)
    .is('foo', add(1))
    .default(1000)

  expect(fn(2)).toEqual(3)
})

test('options are mixture of functions and values - input match value', () => {
  const result = switcher('bar').is('bar', 1)
    .is('foo', add(1))
    .default(1000)

  expect(result).toBe(1)
})

test('return function if all options are functions', () => {
  const fn = switcher('foo').is('bar', tap)
    .is('foo', add(1))
    .default(trim)

  expect(fn(2)).toEqual(3)
})

const switchFn = input =>
  switcher(input)
    .is(x => x.length && x.length === 7, 'has length of 7')
    .is('baz', 'it is baz')
    .default('it is default')

test('works with function as condition', () => {
  expect(switchFn([ 0, 1, 2, 3, 4, 5, 6 ])).toEqual('has length of 7')
})

test('works with string as condition', () => {
  expect(switchFn('baz')).toEqual('it is baz')
})

test('fallback to default input when no matches', () => {
  expect(switchFn(1)).toEqual('it is default')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#switcher)

### symmetricDifference

```typescript

symmetricDifference<T>(x: T[], y: T[]): T[]
```

It returns a merged list of `x` and `y` with all equal elements removed.

`R.equals` is used to determine equality.

```javascript
const x = [ 1, 2, 3, 4 ]
const y = [ 3, 4, 5, 6 ]

const result = symmetricDifference(x, y)
// => [ 1, 2, 5, 6 ]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20x%20%3D%20%5B%201%2C%202%2C%203%2C%204%20%5D%0Aconst%20y%20%3D%20%5B%203%2C%204%2C%205%2C%206%20%5D%0A%0Aconst%20result%20%3D%20symmetricDifference(x%2C%20y)%0A%2F%2F%20%3D%3E%20%5B%201%2C%202%2C%205%2C%206%20%5D">Try this <strong>R.symmetricDifference</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.symmetricDifference</strong> source</summary>

```javascript
import { concat } from './concat'
import { filter } from './filter'
import { includes } from './includes'

export function symmetricDifference(x, y){
  if (arguments.length === 1){
    return _y => symmetricDifference(x, _y)
  }

  return concat(filter(value => !includes(value, y), x),
    filter(value => !includes(value, x), y))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { symmetricDifference } from './symmetricDifference'

test('symmetricDifference', () => {
  const list1 = [ 1, 2, 3, 4 ]
  const list2 = [ 3, 4, 5, 6 ]
  expect(symmetricDifference(list1)(list2)).toEqual([ 1, 2, 5, 6 ])

  expect(symmetricDifference([], [])).toEqual([])
})

test('symmetricDifference with objects', () => {
  const list1 = [ { id : 1 }, { id : 2 }, { id : 3 }, { id : 4 } ]
  const list2 = [ { id : 3 }, { id : 4 }, { id : 5 }, { id : 6 } ]
  expect(symmetricDifference(list1)(list2)).toEqual([
    { id : 1 },
    { id : 2 },
    { id : 5 },
    { id : 6 },
  ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#symmetricDifference)

### T

```typescript

T(): boolean
```

```javascript
R.T() 
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.T()%20%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.T</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.T</strong> source</summary>

```javascript
export function T(){
  return true
}
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#T)

### tail

```typescript

tail<T>(input: T[]): T[]
```

It returns all but the first element of `input`.

```javascript
const result = [
  R.tail([1, 2, 3]),  
  R.tail('foo') 
]
// => [[2, 3], 'oo']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.tail(%5B1%2C%202%2C%203%5D)%2C%20%20%0A%20%20R.tail('foo')%20%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B2%2C%203%5D%2C%20'oo'%5D">Try this <strong>R.tail</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.tail</strong> source</summary>

```javascript
import { drop } from './drop'

export function tail(listOrString){
  return drop(1, listOrString)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { tail } from './tail'

test('tail', () => {
  expect(tail([ 1, 2, 3 ])).toEqual([ 2, 3 ])
  expect(tail([ 1, 2 ])).toEqual([ 2 ])
  expect(tail([ 1 ])).toEqual([])
  expect(tail([])).toEqual([])

  expect(tail('abc')).toEqual('bc')
  expect(tail('ab')).toEqual('b')
  expect(tail('a')).toEqual('')
  expect(tail('')).toEqual('')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#tail)

### take

```typescript

take<T>(howMany: number, input: T[]): T[]
```

It returns the first `howMany` elements of `input`.

```javascript
const howMany = 2

const result = [
  R.take(howMany, [1, 2, 3]),
  R.take(howMany, 'foobar'),
]
// => [[1, 2], 'fo']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20howMany%20%3D%202%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.take(howMany%2C%20%5B1%2C%202%2C%203%5D)%2C%0A%20%20R.take(howMany%2C%20'foobar')%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B1%2C%202%5D%2C%20'fo'%5D">Try this <strong>R.take</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.take</strong> source</summary>

```javascript
import baseSlice from './_internals/baseSlice'

export function take(howMany, listOrString){
  if (arguments.length === 1)
    return _listOrString => take(howMany, _listOrString)
  if (howMany < 0) return listOrString.slice()
  if (typeof listOrString === 'string') return listOrString.slice(0, howMany)

  return baseSlice(
    listOrString, 0, howMany
  )
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { take } from './take'

test('happy', () => {
  const arr = [ 'foo', 'bar', 'baz' ]

  expect(take(1, arr)).toEqual([ 'foo' ])

  expect(arr).toEqual([ 'foo', 'bar', 'baz' ])

  expect(take(2)([ 'foo', 'bar', 'baz' ])).toEqual([ 'foo', 'bar' ])
  expect(take(3, [ 'foo', 'bar', 'baz' ])).toEqual([ 'foo', 'bar', 'baz' ])
  expect(take(4, [ 'foo', 'bar', 'baz' ])).toEqual([ 'foo', 'bar', 'baz' ])
  expect(take(3)('rambda')).toEqual('ram')
})

test('with negative index', () => {
  expect(take(-1, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
  expect(take(-Infinity, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
})

test('with zero index', () => {
  expect(take(0, [ 1, 2, 3 ])).toEqual([])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#take)

### takeLast

```typescript

takeLast<T>(howMany: number, input: T[]): T[]
```

It returns the last `howMany` elements of `input`.

```javascript
const howMany = 2

const result = [
  R.takeLast(howMany, [1, 2, 3]),
  R.takeLast(howMany, 'foobar'),
]
// => [[2, 3], 'ar']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20howMany%20%3D%202%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.takeLast(howMany%2C%20%5B1%2C%202%2C%203%5D)%2C%0A%20%20R.takeLast(howMany%2C%20'foobar')%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5B%5B2%2C%203%5D%2C%20'ar'%5D">Try this <strong>R.takeLast</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.takeLast</strong> source</summary>

```javascript
import baseSlice from './_internals/baseSlice'

export function takeLast(howMany, listOrString){
  if (arguments.length === 1)
    return _listOrString => takeLast(howMany, _listOrString)

  const len = listOrString.length
  if (howMany < 0) return listOrString.slice()
  let numValue = howMany > len ? len : howMany

  if (typeof listOrString === 'string')
    return listOrString.slice(len - numValue)

  numValue = len - numValue

  return baseSlice(
    listOrString, numValue, len
  )
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { takeLast } from './takeLast'

test('with arrays', () => {
  expect(takeLast(1, [ 'foo', 'bar', 'baz' ])).toEqual([ 'baz' ])

  expect(takeLast(2)([ 'foo', 'bar', 'baz' ])).toEqual([ 'bar', 'baz' ])

  expect(takeLast(3, [ 'foo', 'bar', 'baz' ])).toEqual([ 'foo', 'bar', 'baz' ])

  expect(takeLast(4, [ 'foo', 'bar', 'baz' ])).toEqual([ 'foo', 'bar', 'baz' ])

  expect(takeLast(10, [ 'foo', 'bar', 'baz' ])).toEqual([ 'foo', 'bar', 'baz' ])
})

test('with strings', () => {
  expect(takeLast(3, 'rambda')).toEqual('bda')

  expect(takeLast(7, 'rambda')).toEqual('rambda')
})

test('with negative index', () => {
  expect(takeLast(-1, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
  expect(takeLast(-Infinity, [ 1, 2, 3 ])).toEqual([ 1, 2, 3 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#takeLast)

### takeLastWhile

```typescript

takeLastWhile(predicate: (x: string) => boolean, input: string): string
```

```javascript
const result = R.takeLastWhile(
  x => x > 2,
  [1, 2, 3, 4]
)
// => [3, 4]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.takeLastWhile(%0A%20%20x%20%3D%3E%20x%20%3E%202%2C%0A%20%20%5B1%2C%202%2C%203%2C%204%5D%0A)%0A%2F%2F%20%3D%3E%20%5B3%2C%204%5D">Try this <strong>R.takeLastWhile</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.takeLastWhile</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function takeLastWhile(predicate, input){
  if (arguments.length === 1){
    return _input => takeLastWhile(predicate, _input)
  }
  if (input.length === 0) return input
  let found = false
  const toReturn = []
  let counter = input.length

  while (!found || counter === 0){
    counter--
    if (predicate(input[ counter ]) === false){
      found = true
    } else if (!found){
      toReturn.push(input[ counter ])
    }
  }

  return _isArray(input) ? toReturn.reverse() : toReturn.reverse().join('')
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { takeLastWhile } from './takeLastWhile'
const assert = require('assert')

const list = [ 1, 2, 3, 4 ]

test('happy', () => {
  const predicate = x => x > 2
  const result = takeLastWhile(predicate, list)
  expect(result).toEqual([ 3, 4 ])
})

test('predicate is always true', () => {
  const predicate = x => x > 0
  const result = takeLastWhile(predicate)(list)
  expect(result).toEqual(list)
})

test('predicate is always false', () => {
  const predicate = x => x < 0
  const result = takeLastWhile(predicate, list)
  expect(result).toEqual([])
})

test('with string', () => {
  const result = takeLastWhile(x => x !== 'F', 'FOOBAR')
  expect(result).toEqual('OOBAR')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#takeLastWhile)

### takeUntil

```typescript

takeUntil<T>(predicate: (x: T) => boolean, list: T[]): T[]
```

```javascript
const list = [1, 2, 3, 4, 5]
const predicate = x => x > 3
const result = R.takeUntil(predicate, list)

// => [1, 2, 3]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3E%203%0Aconst%20result%20%3D%20R.takeUntil(predicate%2C%20list)%0A%0A%2F%2F%20%3D%3E%20%5B1%2C%202%2C%203%5D">Try this <strong>R.takeUntil</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.takeUntil</strong> source</summary>

```javascript
export function takeUntil(predicate, list){
  const toReturn = []
  let stopFlag = false
  let counter = -1

  while (stopFlag === false && counter++ < list.length - 1){
    if (predicate(list[ counter ])){
      stopFlag = true
    } else {
      toReturn.push(list[ counter ])
    }
  }

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { takeUntil } from './takeUntil'

const list = [ 1, 2, 3, 4, 5, 6 ]

test('happy', () => {
  const result = takeUntil(x => x > 3, list)
  expect(result).toEqual([ 1, 2, 3 ])
})

test('predicate always returns true', () => {
  const result = takeUntil(x => x < 10, list)
  expect(result).toEqual([])
})

test('predicate always returns false', () => {
  const result = takeUntil(x => x > 10, list)
  expect(result).toEqual(list)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#takeUntil)

### takeWhile

```javascript
const list = [1, 2, 3, 4]
const predicate = x => x < 3

const result = R.takeWhile(predicate, list)
// => [1, 2]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20predicate%20%3D%20x%20%3D%3E%20x%20%3C%203%0A%0Aconst%20result%20%3D%20R.takeWhile(predicate%2C%20list)%0A%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try this <strong>R.takeWhile</strong> example in Rambda REPL</a>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#takeWhile)

### tap

```typescript

tap<T>(fn: (x: T) => void, input: T): T
```

It applies function `fn` to input `x` and returns `x`. 

One use case is debuging in the middle of `R.compose`.

```javascript
const list = [1, 2, 3]

R.compose(
  R.map(x => x * 2)
  R.tap(console.log),
  R.filter(x => x > 1)
)(list)
// => `2` and `3` will be logged
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B1%2C%202%2C%203%5D%0A%0AR.compose(%0A%20%20R.map(x%20%3D%3E%20x%20*%202)%0A%20%20R.tap(console.log)%2C%0A%20%20R.filter(x%20%3D%3E%20x%20%3E%201)%0A)(list)%0A%2F%2F%20%3D%3E%20%602%60%20and%20%603%60%20will%20be%20logged">Try this <strong>R.tap</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.tap</strong> source</summary>

```javascript
export function tap(fn, x){
  if (arguments.length === 1) return _x => tap(fn, _x)

  fn(x)

  return x
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { tap } from './tap'

test('tap', () => {
  let a = 1
  const sayX = x => a = x

  expect(tap(sayX, 100)).toEqual(100)
  expect(tap(sayX)(100)).toEqual(100)
  expect(a).toEqual(100)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#tap)

### tapAsync

```typescript

tapAsync<T>(fn: Func<any> | Promise<any>, input: T): T
```

Asynchronous version of `R.tap`.

<details>

<summary><strong>R.tapAsync</strong> source</summary>

```javascript
async function tapAsyncFn(fn, input){
  await fn(input)

  return input
}

export function tapAsync(fn, input){
  if (arguments.length === 1){
    return async _input => tapAsyncFn(fn, _input)
  }

  return new Promise((resolve, reject) => {
    tapAsyncFn(fn, input).then(resolve)
      .catch(reject)
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { pipedAsync } from './pipedAsync'
import { tapAsync } from './tapAsync'

test('happy', async () => {
  const result = await tapAsync(delay, 1)
  expect(result).toEqual(1)
})

test('complex', async () => {
  let marker = false
  const fn = () => marker = true
  const result = await pipedAsync(
    1,
    async x => {
      await delay(100)

      return x + 1
    },
    tapAsync(fn),
    x => x + 1
  )
  expect(marker).toBeTrue()
  expect(result).toEqual(3)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#tapAsync)

### test

```typescript

test(regExpression: RegExp): (str: string) => boolean
```

It determines whether `str` matches `regExpression`.

```javascript
R.test(/^f/, 'foo')
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.test(%2F%5Ef%2F%2C%20'foo')%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.test</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.test</strong> source</summary>

```javascript
export function test(pattern, str){
  if (arguments.length === 1) return _str => test(pattern, _str)

  if (typeof pattern === 'string'){
    throw new TypeError(`‘test’ requires a value of type RegExp as its first argument; received "${ pattern }"`)
  }

  return str.search(pattern) !== -1
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { test as testMethod } from './test'

test('happy', () => {
  expect(testMethod(/^x/, 'xyz')).toBeTrue()

  expect(testMethod(/^y/)('xyz')).toBeFalse()
})

test('throws if first argument is not regex', () => {
  expect(() => testMethod('foo', 'bar')).toThrowWithMessage(TypeError,
    '‘test’ requires a value of type RegExp as its first argument; received "foo"')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#test)

### throttle

```typescript

throttle<T, U>(fn: (input: T) => U, ms: number): (input: T) => U
```

It creates a throttled function that invokes `fn` maximum once for a `period` of milliseconds.

```javascript
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

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?let%20counter%20%3D%200%0Aconst%20inc%20%3D%20()%20%3D%3E%20%7B%0A%20%20counter%2B%2B%0A%7D%0A%0Aconst%20throttledInc%20%3D%20R.throttle(inc%2C%20800)%0A%0Aconst%20result%20%3D%20async%20()%20%3D%3E%20%7B%0A%20%20throttledInc()%0A%20%20await%20R.delay(500)%0A%20%20throttledInc()%0A%0A%20%20return%20counter%0A%7D%0A%2F%2F%20%60result%60%20resolves%20to%20%601%60">Try this <strong>R.throttle</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.throttle</strong> source</summary>

```javascript
export function throttle(fn, ms){
  let wait = false

  return function (...input){
    if (!wait){
      fn.apply(null, input)
      wait = true
      setTimeout(() => {
        wait = false
      }, ms)
    }
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { throttle } from './throttle'

test('', async () => {
  let counter = 0
  let aHolder
  let bHolder

  const inc = (a, b) => {
    aHolder = a
    bHolder = b
    counter++
  }

  const incWrapped = throttle(inc, 1000)

  incWrapped(1, 2)

  await delay(500)

  incWrapped(2, 3)
  incWrapped(3, 4)

  expect(counter).toBe(1)
  expect(aHolder).toBe(1)
  expect(bHolder).toBe(2)

  await delay(1000)

  incWrapped(5, 6)

  expect(counter).toBe(2)
  expect(aHolder).toBe(5)
  expect(bHolder).toBe(6)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#throttle)

### times

```typescript

times<T>(fn: (i: number) => T, howMany: number): T[]
```

It returns the result of applying function `fn` over members of range array.

The range array includes numbers between `0` and `howMany`(exclusive).

```javascript
const fn = x => x * 2
const howMany = 5

R.times(fn, howMany)
// => [0, 2, 4, 6, 8]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20fn%20%3D%20x%20%3D%3E%20x%20*%202%0Aconst%20howMany%20%3D%205%0A%0AR.times(fn%2C%20howMany)%0A%2F%2F%20%3D%3E%20%5B0%2C%202%2C%204%2C%206%2C%208%5D">Try this <strong>R.times</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.times</strong> source</summary>

```javascript
import { map } from './map'
import { range } from './range'

export function times(fn, howMany){
  if (arguments.length === 1) return _howMany => times(fn, _howMany)
  if (!Number.isInteger(howMany) || howMany < 0){
    throw new RangeError('n must be an integer')
  }

  return map(fn, range(0, howMany))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import assert from 'assert'

import { identity } from './identity'
import { times } from './times'

test('happy', () => {
  const result = times(identity, 5)

  expect(result).toEqual([ 0, 1, 2, 3, 4 ])
})

test('with bad input', () => {
  assert.throws(() => {
    times(3)('cheers!')
  }, RangeError)
  assert.throws(() => {
    times(identity, -1)
  }, RangeError)
})

test('curry', () => {
  const result = times(identity)(5)

  expect(result).toEqual([ 0, 1, 2, 3, 4 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#times)

### toDecimal

```typescript

toDecimal(num: number, charsAfterDecimalPoint?: number): number
```

```javascript
R.toDecimal(2.45464,2) // => 2.45
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.toDecimal(2.45464%2C2)%20%2F%2F%20%3D%3E%202.45">Try this <strong>R.toDecimal</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.toDecimal</strong> source</summary>

```javascript
export function toDecimal(number, charsAfterDecimalPoint = 2){
  return Number(parseFloat(String(number)).toFixed(charsAfterDecimalPoint))
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { toDecimal } from './toDecimal'

test('happy', () => {
  expect(toDecimal(2.2789, 1)).toBe(2.3)
  expect(toDecimal(2.2789, 3)).toBe(2.279)
  expect(toDecimal(2, 3)).toBe(2)
  expect(toDecimal(2.2789)).toBe(2.28)
  expect(toDecimal(2.45464)).toBe(2.45)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#toDecimal)

### toLower

```typescript

toLower(str: string): string
```

```javascript
R.toLower('FOO')
// => 'foo'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.toLower('FOO')%0A%2F%2F%20%3D%3E%20'foo'">Try this <strong>R.toLower</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.toLower</strong> source</summary>

```javascript
export function toLower(str){
  return str.toLowerCase()
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { toLower } from './toLower'

test('toLower', () => {
  expect(toLower('FOO|BAR|BAZ')).toEqual('foo|bar|baz')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#toLower)

### toPairs

```typescript

toPairs<S>(obj: { [k: string]: S } | { [k: number]: S }): ([string, S])[]
```

It transforms an object to a list.

```javascript
const list = {
  a : 1,
  b : 2,
  c : [ 3, 4 ],
}
const expected = [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', [ 3, 4 ] ] ]

const result = R.toPairs(list)
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%202%2C%0A%20%20c%20%3A%20%5B%203%2C%204%20%5D%2C%0A%7D%0Aconst%20expected%20%3D%20%5B%20%5B%20'a'%2C%201%20%5D%2C%20%5B%20'b'%2C%202%20%5D%2C%20%5B%20'c'%2C%20%5B%203%2C%204%20%5D%20%5D%20%5D%0A%0Aconst%20result%20%3D%20R.toPairs(list)%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.toPairs</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.toPairs</strong> source</summary>

```javascript
export function toPairs(obj){
  return Object.entries(obj)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { toPairs } from './toPairs'

const obj = {
  a : 1,
  b : 2,
  c : [ 3, 4 ],
}
const expected = [
  [ 'a', 1 ],
  [ 'b', 2 ],
  [ 'c', [ 3, 4 ] ],
]

test('happy', () => {
  expect(toPairs(obj)).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#toPairs)

### toString

```typescript

toString<T>(x: T): string
```

```javascript
R.toString([1, 2]) 
// => '1,2'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.toString(%5B1%2C%202%5D)%20%0A%2F%2F%20%3D%3E%20'1%2C2'">Try this <strong>R.toString</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.toString</strong> source</summary>

```javascript
export function toString(x){
  return x.toString()
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { toString } from './toString'

test('happy', () => {
  expect(toString([ 1, 2, 3 ])).toEqual('1,2,3')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#toString)

### toUpper

```typescript

toUpper(str: string): string
```

```javascript
R.toUpper('foo')
// => 'FOO'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.toUpper('foo')%0A%2F%2F%20%3D%3E%20'FOO'">Try this <strong>R.toUpper</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.toUpper</strong> source</summary>

```javascript
export function toUpper(str){
  return str.toUpperCase()
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { toUpper } from './toUpper'

test('toUpper', () => {
  expect(toUpper('foo|bar|baz')).toEqual('FOO|BAR|BAZ')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#toUpper)

### transpose

```typescript

transpose<T>(list: (T[])[]): (T[])[]
```

```javascript
const list = [[10, 11], [20], [], [30, 31, 32]]
const expected = [[10, 20, 30], [11, 31], [32]]

const result = R.transpose(list)
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%5B10%2C%2011%5D%2C%20%5B20%5D%2C%20%5B%5D%2C%20%5B30%2C%2031%2C%2032%5D%5D%0Aconst%20expected%20%3D%20%5B%5B10%2C%2020%2C%2030%5D%2C%20%5B11%2C%2031%5D%2C%20%5B32%5D%5D%0A%0Aconst%20result%20%3D%20R.transpose(list)%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.transpose</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.transpose</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function transpose(array){
  return array.reduce((acc, el) => {
    el.forEach((nestedEl, i) =>
      _isArray(acc[ i ]) ? acc[ i ].push(nestedEl) : acc.push([ nestedEl ]))

    return acc
  }, [])
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { transpose } from './transpose'

test('happy', () => {
  const input = [
    [ 'a', 1 ],
    [ 'b', 2 ],
    [ 'c', 3 ],
  ]

  expect(transpose(input)).toEqual([
    [ 'a', 'b', 'c' ],
    [ 1, 2, 3 ],
  ])
})

test('when rows are shorter', () => {
  const actual = transpose([ [ 10, 11 ], [ 20 ], [], [ 30, 31, 32 ] ])
  const expected = [ [ 10, 20, 30 ], [ 11, 31 ], [ 32 ] ]
  expect(actual).toEqual(expected)
})

test('with empty array', () => {
  expect(transpose([])).toEqual([])
})

test('array with falsy values', () => {
  const actual = transpose([
    [ true, false, undefined, null ],
    [ null, undefined, false, true ],
  ])
  const expected = [
    [ true, null ],
    [ false, undefined ],
    [ undefined, false ],
    [ null, true ],
  ]
  expect(actual).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#transpose)

### trim

```typescript

trim(str: string): string
```

```javascript
R.trim('  foo  ') 
// => 'foo'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.trim('%20%20foo%20%20')%20%0A%2F%2F%20%3D%3E%20'foo'">Try this <strong>R.trim</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.trim</strong> source</summary>

```javascript
export function trim(str){
  return str.trim()
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { trim } from './trim'

test('trim', () => {
  expect(trim(' foo ')).toEqual('foo')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#trim)

### tryCatch

```typescript

tryCatch<T, U>(
  fn: (input: T) => U,
  fallback: U
): (input: T) => U
```

It returns function that runs `fn` in `try/catch` block. If there was an error, then `fallback` is used to return the result. Note that `fn` can be value or asynchronous/synchronous function(unlike `Ramda` where fallback can only be a synchronous function).

> :boom: Please check the tests of `R.tryCatch` to fully understand how this method works.

```javascript
const fn = x => x.foo

const result = [
  R.tryCatch(fn, false)(null),
  R.tryCatch(fn, false)({foo: 'bar'})
]
// => [false, 'bar']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20x%20%3D%3E%20x.foo%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.tryCatch(fn%2C%20false)(null)%2C%0A%20%20R.tryCatch(fn%2C%20false)(%7Bfoo%3A%20'bar'%7D)%0A%5D%0A%2F%2F%20%3D%3E%20%5Bfalse%2C%20'bar'%5D">Try this <strong>R.tryCatch</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.tryCatch</strong> source</summary>

```javascript
import { isFunction } from './isFunction'

export function tryCatch(fn, fallback){
  if (!isFunction(fn)){
    throw new Error(`R.tryCatch | fn '${ fn }'`)
  }
  const passFallback = isFunction(fallback)

  return (...inputs) => {
    try {
      return fn(...inputs)
    } catch (e){
      return passFallback ? fallback(e, ...inputs) : fallback
    }
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { tryCatch as tryCatchRamda } from 'ramda'

import { compareCombinations } from './_internals/testUtils'
import { prop } from './prop'
import { tryCatch } from './tryCatch'

test('happy', () => {
  const fn = () => {
    throw new Error('foo')
  }
  const result = tryCatch(fn, () => true)()
  expect(result).toBeTrue()
})

test('when fallback is used', () => {
  const fn = x => x.x

  expect(tryCatch(fn, false)(null)).toBeFalse()
})

test('with json parse', () => {
  const good = () => JSON.parse(JSON.stringify({ a : 1 }))
  const bad = () => JSON.parse('a{a')

  expect(tryCatch(good, 1)()).toEqual({ a : 1 })
  expect(tryCatch(bad, 1)()).toBe(1)
})

test('when fallback is function', () => {
  const fn = x => x.x

  expect(tryCatch(fn, () => 1)(null)).toBe(1)
})

test('when fn is used', () => {
  const fn = prop('x')

  expect(tryCatch(fn, false)({})).toBe(undefined)
  expect(tryCatch(fn, false)({ x : 1 })).toBe(1)
})

test('fallback receives error object and all initial inputs', () => {
  function thrower(
    a, b, c
  ){
    void c
    throw new Error('throwerError')
  }

  function catchFn(
    e, a, b, c
  ){
    return [ e.message, a, b, c ].join('|')
  }

  const willThrow = tryCatch(thrower, catchFn)
  const result = willThrow(
    'A', 'B', 'C'
  )
  expect(result).toBe('throwerError|A|B|C')
})

test('fallback receives error object', () => {
  function throwFn(){
    throw new Error(10)
  }

  function eCatcher(
    e, a, b
  ){
    return e.message
  }

  const willThrow = tryCatch(throwFn, eCatcher)
  expect(willThrow([])).toBe('10')
  expect(willThrow([ {}, {}, {} ])).toBe('10')
})

const possibleFns = [
  null,
  () => 1,
  () => 0,
  () => JSON.parse('{a:1'),
  () => {
    const x = {}

    return x.x
  },
  x => x.foo,
  () => {
    throw new Error('foo')
  },
]

const possibleCatchers = [
  null,
  e => e.message.length,
  (e, ...inputs) => `${ e.message.length } ${ inputs.length }`,
  () => {
    throw new Error('bar')
  },
]

const possibleInputs = [ null, {}, { foo : 1 } ]

describe('brute force', () => {
  compareCombinations({
    returnsFunctionFlag : true,
    firstInput          : possibleFns,
    callback            : errorsCounters => {
      expect(errorsCounters).toMatchInlineSnapshot(`
        Object {
          "ERRORS_MESSAGE_MISMATCH": 0,
          "ERRORS_TYPE_MISMATCH": 12,
          "RESULTS_MISMATCH": 0,
          "SHOULD_NOT_THROW": 0,
          "SHOULD_THROW": 7,
        }
      `)
    },
    secondInput : possibleCatchers,
    thirdInput  : possibleInputs,
    fn          : tryCatch,
    fnRamda     : tryCatchRamda,
  })
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#tryCatch)

### tryCatchAsync

```typescript

tryCatchAsync<T>(
  fn: (input: any) => Promise<T>,
  fallback: T
): (input: any) => Promise<T>
```

It returns function that runs `fn` in `try/catch` block. If there was an error, then `fallback` is used to return the result.

```javascript
const x = {foo: 1}
const fnFoo = async () => x.foo
const fnBar = async () => x.bar

const result = await Promise.all([
  R.tryCatchAsync (fnFoo, false)(),
  R.tryCatchAsync(fnBar, false)()
])
// => [1, false]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20x%20%3D%20%7Bfoo%3A%201%7D%0Aconst%20fnFoo%20%3D%20async%20()%20%3D%3E%20x.foo%0Aconst%20fnBar%20%3D%20async%20()%20%3D%3E%20x.bar%0A%0Aconst%20result%20%3D%20await%20Promise.all(%5B%0A%20%20R.tryCatchAsync%20(fnFoo%2C%20false)()%2C%0A%20%20R.tryCatchAsync(fnBar%2C%20false)()%0A%5D)%0A%2F%2F%20%3D%3E%20%5B1%2C%20false%5D">Try this <strong>R.tryCatchAsync</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.tryCatchAsync</strong> source</summary>

```javascript
import { isFunction } from './isFunction'
import { isPromise } from './isPromise'

export function tryCatchAsync(fn, fallback){
  return (...inputs) =>
    new Promise(resolve => {
      fn(...inputs)
        .then(resolve)
        .catch(err => {
          if (!isFunction(fallback)){
            return resolve(fallback)
          }
          if (!isPromise(fallback)){
            return resolve(fallback(err, ...inputs))
          }

          fallback(err, ...inputs).then(resolve)
            .catch(resolve)
        })
    })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
import { tryCatchAsync } from './tryCatchAsync'

test('when fallback is function', async () => {
  const fn = async x => x.x

  const result = await tryCatchAsync(fn, () => 1)(null)
  expect(result).toBe(1)
})

test('when fallback throws', async () => {
  const fn = async x => x.x
  const fallback = async (err, xx) => xx.y

  const result = await tryCatchAsync(fn, fallback)(null)
  expect(result.message).toMatchInlineSnapshot('"Cannot read property \'y\' of null"')
})

test('fallback is not used', async () => {
  const fn = async x => x.x

  expect(tryCatchAsync(fn, false)({ x : 1 })).resolves.toBe(1)
})

test('fallback receives error object and all initial inputs', async () => {
  async function thrower(
    a, b, c
  ){
    void c
    throw new Error('throwerError')
  }

  function catchFn(
    e, a, b, c
  ){
    return [ e.message, a, b, c ].join('|')
  }

  const willThrow = tryCatchAsync(thrower, catchFn)
  const result = await willThrow(
    'A', 'B', 'C'
  )
  expect(result).toBe('throwerError|A|B|C')
})

test('when async + value fallback', async () => {
  const fn = async () => {
    await delay(100)

    return JSON.parse('{a:')
  }

  const result = await tryCatchAsync(fn, 'fallback')(100)
  expect(result).toBe('fallback')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#tryCatchAsync)

### type

```typescript

type(x: any): RambdaTypes
```

It accepts any input and it returns its type.

> :boom: `NaN`, `Promise` and `Async` are types specific for **Rambda**.

```javascript
R.type(() => {}) // => 'Function'
R.type(async () => {}) // => 'Async'
R.type([]) // => 'Array'
R.type({}) // => 'Object'
R.type('foo') // => 'String'
R.type(1) // => 'Number'
R.type(true) // => 'Boolean'
R.type(null) // => 'Null'
R.type(/[A-z]/) // => 'RegExp'
R.type('foo'*1) // => 'NaN'

const delay = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve()
  }, ms)
})
R.type(delay) // => 'Promise'
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.type(()%20%3D%3E%20%7B%7D)%20%2F%2F%20%3D%3E%20'Function'%0AR.type(async%20()%20%3D%3E%20%7B%7D)%20%2F%2F%20%3D%3E%20'Async'%0AR.type(%5B%5D)%20%2F%2F%20%3D%3E%20'Array'%0AR.type(%7B%7D)%20%2F%2F%20%3D%3E%20'Object'%0AR.type('foo')%20%2F%2F%20%3D%3E%20'String'%0AR.type(1)%20%2F%2F%20%3D%3E%20'Number'%0AR.type(true)%20%2F%2F%20%3D%3E%20'Boolean'%0AR.type(null)%20%2F%2F%20%3D%3E%20'Null'%0AR.type(%2F%5BA-z%5D%2F)%20%2F%2F%20%3D%3E%20'RegExp'%0AR.type('foo'*1)%20%2F%2F%20%3D%3E%20'NaN'%0A%0Aconst%20delay%20%3D%20ms%20%3D%3E%20new%20Promise(resolve%20%3D%3E%20%7B%0A%20%20setTimeout(function%20()%20%7B%0A%20%20%20%20resolve()%0A%20%20%7D%2C%20ms)%0A%7D)%0AR.type(delay)%20%2F%2F%20%3D%3E%20'Promise'">Try this <strong>R.type</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.type</strong> source</summary>

```javascript
import { _isArray } from './_internals/_isArray'

export function type(input){
  const typeOf = typeof input

  if (input === null){
    return 'Null'
  } else if (input === undefined){
    return 'Undefined'
  } else if (typeOf === 'boolean'){
    return 'Boolean'
  } else if (typeOf === 'number'){
    return Number.isNaN(input) ? 'NaN' : 'Number'
  } else if (typeOf === 'string'){
    return 'String'
  } else if (_isArray(input)){
    return 'Array'
  } else if (typeOf === 'symbol'){
    return 'Symbol'
  } else if (input instanceof RegExp){
    return 'RegExp'
  }

  const asStr = input && input.toString ? input.toString() : ''

  if ([ 'true', 'false' ].includes(asStr)) return 'Boolean'
  if (!Number.isNaN(Number(asStr))) return 'Number'
  if (asStr.startsWith('async')) return 'Async'
  if (asStr === '[object Promise]') return 'Promise'
  if (typeOf === 'function') return 'Function'
  if (input instanceof String) return 'String'

  return 'Object'
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { type as ramdaType } from 'ramda'

import { type } from './type'

test('with symbol', () => {
  expect(type(Symbol())).toBe('Symbol')
})

test('with simple promise', () => {
  expect(type(Promise.resolve(1))).toBe('Promise')
})

test('with new Boolean', () => {
  expect(type(new Boolean(true))).toBe('Boolean')
})

test('with new String', () => {
  expect(type(new String('I am a String object'))).toEqual('String')
})

test('with new Number', () => {
  expect(type(new Number(1))).toBe('Number')
})

test('with new promise', () => {
  const delay = ms =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(ms + 110)
      }, ms)
    })

  expect(type(delay(10))).toEqual('Promise')
})

test('async function', () => {
  expect(type(async () => {})).toEqual('Async')
})

test('async arrow', () => {
  const asyncArrow = async () => {}
  expect(type(asyncArrow)).toBe('Async')
})

test('function', () => {
  const fn1 = () => {}
  const fn2 = function (){}

  function fn3(){}

  ;[ () => {}, fn1, fn2, fn3 ].map(val => {
    expect(type(val)).toEqual('Function')
  })
})

test('object', () => {
  expect(type({})).toEqual('Object')
})

test('number', () => {
  expect(type(1)).toEqual('Number')
})

test('boolean', () => {
  expect(type(false)).toEqual('Boolean')
})

test('string', () => {
  expect(type('foo')).toEqual('String')
})

test('null', () => {
  expect(type(null)).toEqual('Null')
})

test('array', () => {
  expect(type([])).toEqual('Array')
  expect(type([ 1, 2, 3 ])).toEqual('Array')
})

test('regex', () => {
  expect(type(/\s/g)).toEqual('RegExp')
})

test('undefined', () => {
  expect(type(undefined)).toEqual('Undefined')
})

test('not a number', () => {
  expect(type(Number('s'))).toBe('NaN')
})

test('function inside object 1', () => {
  const obj = {
    f(){
      return 4
    },
  }

  expect(type(obj.f)).toBe('Function')
  expect(ramdaType(obj.f)).toBe('Function')
})

test('function inside object 2', () => {
  const name = 'f'
  const obj = {
    [ name ](){
      return 4
    },
  }
  expect(type(obj.f)).toBe('Function')
  expect(ramdaType(obj.f)).toBe('Function')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#type)

### union

```typescript

union<T>(x: T[], y: T[]): T[]
```

It takes two lists and return a new list containing a merger of both list with removed duplicates. 

`R.equals` is used to compare for duplication.

```javascript
const result = R.union([1,2,3], [3,4,5]);
// => [1, 2, 3, 4, 5]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20R.union(%5B1%2C2%2C3%5D%2C%20%5B3%2C4%2C5%5D)%3B%0A%2F%2F%20%3D%3E%20%5B1%2C%202%2C%203%2C%204%2C%205%5D">Try this <strong>R.union</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.union</strong> source</summary>

```javascript
import { includes } from './includes'

export function union(x, y){
  if (arguments.length === 1) return _y => union(x, _y)

  const toReturn = x.slice()

  y.forEach(yInstance => {
    if (!includes(yInstance, x)) toReturn.push(yInstance)
  })

  return toReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { union } from './union'

test('happy', () => {
  expect(union([ 1, 2 ], [ 2, 3 ])).toEqual([ 1, 2, 3 ])
})

test('with list of objects', () => {
  const list1 = [ { a : 1 }, { a : 2 } ]
  const list2 = [ { a : 2 }, { a : 3 } ]
  const result = union(list1)(list2)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#union)

### uniq

```typescript

uniq<T>(list: T[]): T[]
```

It returns a new array containing only one copy of each element of `list`.

`R.equals` is used to determine equality.

```javascript
const list = [1, 1, {a: 1}, {a: 2}, {a:1}]

R.uniq(list)
// => [1, {a: 1}, {a: 2}]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20list%20%3D%20%5B1%2C%201%2C%20%7Ba%3A%201%7D%2C%20%7Ba%3A%202%7D%2C%20%7Ba%3A1%7D%5D%0A%0AR.uniq(list)%0A%2F%2F%20%3D%3E%20%5B1%2C%20%7Ba%3A%201%7D%2C%20%7Ba%3A%202%7D%5D">Try this <strong>R.uniq</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.uniq</strong> source</summary>

```javascript
import { includes } from './includes'

export function uniq(list){
  let index = -1
  const willReturn = []

  while (++index < list.length){
    const value = list[ index ]

    if (!includes(value, willReturn)){
      willReturn.push(value)
    }
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import {uniq} from './uniq'

test('happy', () => {
  const list = [1, 2, 3, 3, 3, 1, 2, 0]
  expect(uniq(list)).toEqual([1, 2, 3, 0])
})

test('with object', () => {
  const list = [{a: 1}, {a: 2}, {a: 1}]
  expect(uniq(list)).toEqual([{a: 1}, {a: 2}])
})

test('with nested array', () => {
  expect(uniq([[42], [42]])).toEqual([[42]])
})

test('with falsy values', () => {
  expect(uniq([undefined, null])).toEqual([undefined, null])
})

test('can distinct between string and number', () => {
  expect(uniq([1, '1'])).toEqual([1, '1'])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#uniq)

### uniqWith

```typescript

uniqWith<T, U>(predicate: (x: T, y: T) => boolean, list: T[]): T[]
```

It returns a new array containing only one copy of each element in `list` according to `predicate` function.

This predicate should return true, if two elements are equal.

```javascript
const list = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
  {id: 3, title:'foo'},
  {id: 4, title:'bar'},
]

const expected = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
]

const predicate = (x,y) => x.title === y.title

const result = R.uniqWith(predicate, list)
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list%20%3D%20%5B%0A%20%20%7Bid%3A%200%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%201%2C%20title%3A'bar'%7D%2C%0A%20%20%7Bid%3A%202%2C%20title%3A'baz'%7D%2C%0A%20%20%7Bid%3A%203%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%204%2C%20title%3A'bar'%7D%2C%0A%5D%0A%0Aconst%20expected%20%3D%20%5B%0A%20%20%7Bid%3A%200%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%201%2C%20title%3A'bar'%7D%2C%0A%20%20%7Bid%3A%202%2C%20title%3A'baz'%7D%2C%0A%5D%0A%0Aconst%20predicate%20%3D%20(x%2Cy)%20%3D%3E%20x.title%20%3D%3D%3D%20y.title%0A%0Aconst%20result%20%3D%20R.uniqWith(predicate%2C%20list)%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.uniqWith</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.uniqWith</strong> source</summary>

```javascript
import { any } from './any'

export function uniqWith(predicate, list){
  if (arguments.length === 1) return _list => uniqWith(predicate, _list)

  let index = -1
  const willReturn = []

  while (++index < list.length){
    const value = list[ index ]
    const flag = any(x => predicate(value, x),
      willReturn)

    if (!flag){
      willReturn.push(value)
    }
  }

  return willReturn
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { uniqWith } from './uniqWith'

const list = [
  {a: 1},
  {a: 1},
]

test('happy', () => {
  const fn = (x, y) => x.a === y.a

  const result = uniqWith(fn, list)
  expect(result).toEqual([{a:1}])
})

test('curried', () => {
  const fn = (x, y) => x.a === y.a

  const result = uniqWith(fn)(list)
  expect(result).toEqual([{a:1}])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#uniqWith)

### unless

```typescript

unless<T, U>(predicate: (x: T) => boolean, whenFalseFn: (x: T) => U, obj: T): U
```

The method returns function that will be called with argument `input`.

If `predicate(input)` returns `false`, then the end result will be the outcome of `whenFalse(input)`.

In the other case, the final output will be the `input` itself.

```javascript
const fn = R.unless(
  x => x > 2,
  x => x + 10
)

const result = [
  fn(1),
  fn(5)
]
// => [11, 5]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20fn%20%3D%20R.unless(%0A%20%20x%20%3D%3E%20x%20%3E%202%2C%0A%20%20x%20%3D%3E%20x%20%2B%2010%0A)%0A%0Aconst%20result%20%3D%20%5B%0A%20%20fn(1)%2C%0A%20%20fn(5)%0A%5D%0A%2F%2F%20%3D%3E%20%5B11%2C%205%5D">Try this <strong>R.unless</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.unless</strong> source</summary>

```javascript
export function unless(predicate, whenFalse){
  if (arguments.length === 1){
    return _whenFalse => unless(predicate, _whenFalse)
  }

  return input => predicate(input) ? input : whenFalse(input)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { inc } from './inc'
import { isNil } from './isNil'
import { unless } from './unless'

test('happy', () => {
  const safeInc = unless(isNil, inc)
  expect(safeInc(null)).toBeNull()
  expect(safeInc(1)).toBe(2)
})

test('curried', () => {
  const safeIncCurried = unless(isNil)(inc)
  expect(safeIncCurried(null)).toBeNull()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#unless)

### update

```typescript

update<T>(index: number, newValue: T, list: T[]): T[]
```

It returns a copy of `list` with updated element at `index` with `newValue`.

```javascript
const index = 2
const newValue = 88
const list = [1, 2, 3, 4, 5]

const result = R.update(index, newValue, list)
// => [1, 2, 88, 4, 5]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20index%20%3D%202%0Aconst%20newValue%20%3D%2088%0Aconst%20list%20%3D%20%5B1%2C%202%2C%203%2C%204%2C%205%5D%0A%0Aconst%20result%20%3D%20R.update(index%2C%20newValue%2C%20list)%0A%2F%2F%20%3D%3E%20%5B1%2C%202%2C%2088%2C%204%2C%205%5D">Try this <strong>R.update</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.update</strong> source</summary>

```javascript
import { curry } from './curry'

function updateFn(
  index, newValue, list
){
  const arrClone = list.slice()

  return arrClone.fill(
    newValue, index, index + 1
  )
}

export const update = curry(updateFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { update } from './update'

const list = [ 1, 2, 3 ]

test('happy', () => {
  const newValue = 8
  const index = 1
  const result = update(
    index, newValue, list
  )
  const curriedResult = update(index, newValue)(list)
  const tripleCurriedResult = update(index)(newValue)(list)

  const expected = [ 1, 8, 3 ]
  expect(result).toEqual(expected)
  expect(curriedResult).toEqual(expected)
  expect(tripleCurriedResult).toEqual(expected)
})

test('list has no such index', () => {
  const newValue = 8
  const index = 10
  const result = update(
    index, newValue, list
  )

  expect(result).toEqual(list)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#update)

### updateObject

```typescript

updateObject<Output>(rules: ([string, any])[], input: object): Output
```

Very similar to `R.assocPath` but it applies list of updates instead of only a single update.

It return a copy of `obj` input with changed properties according to `rules` input.

Each instance of `rules` is a tuple of object path and the new value for this path. If such object path does not exist, then such object path is created.

As it uses `R.path` underneath, object path can be either string or array of strings(in Typescript object path can be only a string).

```javascript
const obj = {
  a: {b: 1},
  foo: {bar: 10},
}
const rules = [
  ['a.b', 2],
  ['foo.bar', 20],
  ['q.z', 300],
]
const result = R.updateObject(rules, obj)

const expected = {
  a: {b: 2},
  foo: {bar: 20},
  q: {z: 300},
}
// => `result` is equal to `expected`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20obj%20%3D%20%7B%0A%20%20a%3A%20%7Bb%3A%201%7D%2C%0A%20%20foo%3A%20%7Bbar%3A%2010%7D%2C%0A%7D%0Aconst%20rules%20%3D%20%5B%0A%20%20%5B'a.b'%2C%202%5D%2C%0A%20%20%5B'foo.bar'%2C%2020%5D%2C%0A%20%20%5B'q.z'%2C%20300%5D%2C%0A%5D%0Aconst%20result%20%3D%20R.updateObject(rules%2C%20obj)%0A%0Aconst%20expected%20%3D%20%7B%0A%20%20a%3A%20%7Bb%3A%202%7D%2C%0A%20%20foo%3A%20%7Bbar%3A%2020%7D%2C%0A%20%20q%3A%20%7Bz%3A%20300%7D%2C%0A%7D%0A%2F%2F%20%3D%3E%20%60result%60%20is%20equal%20to%20%60expected%60">Try this <strong>R.updateObject</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.updateObject</strong> source</summary>

```javascript
import { assocPath } from './assocPath'

export function updateObject(rules, obj){
  if (arguments.length === 1) return _obj => updateObject(rules, _obj)

  let clone = { ...obj } /*?.*/

  rules.forEach(([ objectPath, newValue ]) => {
    clone = assocPath(
      objectPath, newValue, clone
    )
  })

  return clone
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { updateObject } from './updateObject'

const obj = {
  a   : { b : 1 },
  foo : { bar : 10 },
}
const rules = [
  [ 'a.b', 2 ],
  [ 'foo.bar', 20 ],
  [ 'q.z', 300 ],
]
const expected = {
  a   : { b : 2 },
  foo : { bar : 20 },
  q   : { z : 300 },
}

test('happy', () => {
  const result = updateObject(rules, obj)
  expect(result).toEqual(expected)
})

test('curried', () => {
  const result = updateObject(rules)(obj)
  expect(result).toEqual(expected)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#updateObject)

### values

```typescript

values<T extends object, K extends keyof T>(obj: T): T[K][]
```

With correct input, this is nothing more than `Object.values(obj)`. If `obj` is not an object, then it returns an empty array.

```javascript
const obj = {a:1, b:2}

R.values(obj)
// => [1, 2]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20obj%20%3D%20%7Ba%3A1%2C%20b%3A2%7D%0A%0AR.values(obj)%0A%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try this <strong>R.values</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.values</strong> source</summary>

```javascript
import { type } from './type'

export function values(obj){
  if (type(obj) !== 'Object') return []

  return Object.values(obj)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { values } from './values'

test('happy', () => {
  expect(values({
    a : 1,
    b : 2,
    c : 3,
  })).toEqual([ 1, 2, 3 ])
})

test('with bad input', () => {
  expect(values(null)).toEqual([])
  expect(values(undefined)).toEqual([])
  expect(values(55)).toEqual([])
  expect(values('foo')).toEqual([])
  expect(values(true)).toEqual([])
  expect(values(false)).toEqual([])
  expect(values(NaN)).toEqual([])
  expect(values(Infinity)).toEqual([])
  expect(values([])).toEqual([])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#values)

### view

```typescript

view<T, U>(lens: Lens): (target: T) => U
```

It returns the value of `lens` focus over `target` object.

```javascript
const lens = R.lensProp('x')

R.view(lens, {x: 1, y: 2}) // => 1
R.view(lens, {x: 4, y: 2}) // => 4
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20lens%20%3D%20R.lensProp('x')%0A%0AR.view(lens%2C%20%7Bx%3A%201%2C%20y%3A%202%7D)%20%2F%2F%20%3D%3E%201%0AR.view(lens%2C%20%7Bx%3A%204%2C%20y%3A%202%7D)%20%2F%2F%20%3D%3E%204">Try this <strong>R.view</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.view</strong> source</summary>

```javascript
const Const = x => ({
  x,
  map : fn => Const(x),
})

export function view(lens, target){
  if (arguments.length === 1) return _target => view(lens, _target)

  return lens(Const)(target).x
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { assoc } from './assoc'
import { lens } from './lens'
import { prop } from './prop'
import { view } from './view'

const testObject = { foo : 'Led Zeppelin' }
const assocLens = lens(prop('foo'), assoc('foo'))

test('happy', () => {
  expect(view(assocLens, testObject)).toEqual('Led Zeppelin')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#view)

### viewOr

```typescript

viewOr<Input, Output>(fallback: Output, lens: Lens, input: Input): Output
```

A combination between `R.defaultTo` and `R.view.

```javascript
const lens = R.lensProp('a');
const input = {a: 'foo'}
const fallbackInput = {b: 'bar'}
const fallback = 'FALLBACK'

const result = [
  R.viewOr(fallback, lens, input),
  R.viewOr(fallback, lens, fallbackInput)
]
// => ['foo', 'FALLBACK']
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20lens%20%3D%20R.lensProp('a')%3B%0Aconst%20input%20%3D%20%7Ba%3A%20'foo'%7D%0Aconst%20fallbackInput%20%3D%20%7Bb%3A%20'bar'%7D%0Aconst%20fallback%20%3D%20'FALLBACK'%0A%0Aconst%20result%20%3D%20%5B%0A%20%20R.viewOr(fallback%2C%20lens%2C%20input)%2C%0A%20%20R.viewOr(fallback%2C%20lens%2C%20fallbackInput)%0A%5D%0A%2F%2F%20%3D%3E%20%5B'foo'%2C%20'FALLBACK'%5D">Try this <strong>R.viewOr</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.viewOr</strong> source</summary>

```javascript
import { curry } from './curry'
import { defaultTo } from './defaultTo'
import { view } from './view'

function viewOrFn(
  fallback, lens, input
){
  return defaultTo(fallback, view(lens, input))
}

export const viewOr = curry(viewOrFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { lensProp } from './lensProp'
import { viewOr } from './viewOr'

const lens = lensProp('a')
const input = { a : 'foo' }
const fallbackInput = { b : 'bar' }
const fallback = 'FALLBACK'

test('happy', () => {
  const result = viewOr(
    fallback, lens, fallbackInput
  )
  expect(result).toBe(fallback)
})

test('curried', () => {
  const result = viewOr(fallback, lens)(input)
  expect(result).toBe('foo')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#viewOr)

### wait

```typescript

wait<T>(fn: Promise<T>): Promise<[T, Error|undefined]>
```

It provides `Golang`-like interface for handling promises.

```javascript
const [result, err] = await R.wait(R.delay(1000))
// => err is undefined
// => result is `RAMBDAX_DELAY`
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20%5Bresult%2C%20err%5D%20%3D%20await%20R.wait(R.delay(1000))%0A%2F%2F%20%3D%3E%20err%20is%20undefined%0A%2F%2F%20%3D%3E%20result%20is%20%60RAMBDAX_DELAY%60">Try this <strong>R.wait</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.wait</strong> source</summary>

```javascript
export function wait(fn){
  return new Promise(resolve => {
    fn.then(result => resolve([ result, undefined ])).catch(e =>
      resolve([ undefined, e ]))
  })
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { wait } from './wait'

test('happy path', async () => {
  const fn = x => Promise.resolve(x + 1)
  const [ result, err ] = await wait(fn(1))

  expect(result).toBe(2)
  expect(err).toBeUndefined()
})

test('when promise is rejected', async () => {
  const fn = x => Promise.reject(Error('foo'))
  const [ result, err ] = await wait(fn(1))

  expect(result).toBeUndefined()
  expect(err).toEqual(Error('foo'))
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#wait)

### waitFor

```typescript

waitFor(
  waitForTrueCondition: () => boolean,
  howLong: number,
  loops?: number
): () => Promise<boolean>
```

It returns `true`, if `condition` returns `true` within `howLong` milisececonds time period.

The method accepts an optional third argument `loops`(default to 10), which is the number of times `waitForTrueCondition` will be evaluated for `howLong` period. Once this function returns a value different from `false`, this value will be the final result. 

Otherwise, `R.waitFor` will return `false`.

```javascript
const howLong = 1000
let counter = 0
const waitForTrueCondition = async x => {
  await R.delay(100)
  counter = counter + x

  return counter > 10
}

const result = await R.waitFor(waitForTrueCondition, howLong)(2)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20howLong%20%3D%201000%0Alet%20counter%20%3D%200%0Aconst%20waitForTrueCondition%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(100)%0A%20%20counter%20%3D%20counter%20%2B%20x%0A%0A%20%20return%20counter%20%3E%2010%0A%7D%0A%0Aconst%20result%20%3D%20await%20R.waitFor(waitForTrueCondition%2C%20howLong)(2)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.waitFor</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.waitFor</strong> source</summary>

```javascript
import { delay } from './delay'
import { range } from './range'
import { type } from './type'

export function waitFor(
  condition, howLong, loops = 10
){
  const typeCondition = type(condition)

  const passPromise = typeCondition === 'Async'
  const passFunction = typeCondition === 'Function'
  const interval = Math.floor(howLong / loops)

  if (!(passPromise || passFunction)){
    throw new Error('R.waitFor')
  }

  return async (...inputs) => {
    for (const _ of range(0, loops)){
      const resultCondition = await condition(...inputs)

      if (resultCondition === false){
        await delay(interval)
      } else {
        return resultCondition
      }
    }

    return false
  }
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { delay } from './delay'
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
    await delay(10)

    return counter > x
  }

  const result = await waitFor(condition, howLong)(6)
  expect(result).toEqual(true)
})

test('async condition | false', async () => {
  let counter = 0
  const condition = async x => {
    counter++
    await delay(10)

    return counter > x
  }

  const result = await waitFor(condition, howLong)(12)
  expect(result).toEqual(false)
})

test('throws when fn is not function', () => {
  const fn = 'foo'

  expect(() => waitFor(fn, howLong)()).toThrowWithMessage(Error, 'R.waitFor')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#waitFor)

### when

```typescript

when<T, U>(predicate: (x: T) => boolean, whenTrueFn: (a: T) => U, input: T): T | U
```

<details>

<summary><strong>R.when</strong> source</summary>

```javascript
import { curry } from './curry'

function whenFn(
  predicate, whenTrueFn, input
){
  if (!predicate(input)) return input

  return whenTrueFn(input)
}

export const when = curry(whenFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { when } from './when'

const predicate = x => typeof x === 'number'

test('happy', () => {
  const fn = when(predicate, add(11))
  expect(fn(11)).toBe(22)
  expect(fn('foo')).toBe('foo')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#when)

### where

```typescript

where<T, U>(conditions: T, input: U): boolean
```

It returns `true` if all each property in `conditions` returns `true` when applied to corresponding property in `input` object.

`R.equals` is used to determine equality.

```javascript
const condition = R.where({
  a : x => typeof x === "string",
  b : x => x === 4
})
const input = {
  a : "foo",
  b : 4,
  c : 11,
}

const result = condition(input) 
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20condition%20%3D%20R.where(%7B%0A%20%20a%20%3A%20x%20%3D%3E%20typeof%20x%20%3D%3D%3D%20%22string%22%2C%0A%20%20b%20%3A%20x%20%3D%3E%20x%20%3D%3D%3D%204%0A%7D)%0Aconst%20input%20%3D%20%7B%0A%20%20a%20%3A%20%22foo%22%2C%0A%20%20b%20%3A%204%2C%0A%20%20c%20%3A%2011%2C%0A%7D%0A%0Aconst%20result%20%3D%20condition(input)%20%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.where</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.where</strong> source</summary>

```javascript
export function where(conditions, input){
  if (input === undefined){
    return _input => where(conditions, _input)
  }
  let flag = true
  for (const prop in conditions){
    const result = conditions[ prop ](input[ prop ])
    if (flag && result === false){
      flag = false
    }
  }

  return flag
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { equals } from './equals'
import { where } from './where'

test('when true', () => {
  const predicate = where({
    a : equals('foo'),
    b : equals('bar'),
  })
  expect(predicate({
    a : 'foo',
    b : 'bar',
    x : 11,
    y : 19,
  })).toEqual(true)
})

test('when false', () => {
  const predicate = where({
    a : equals('foo'),
    b : equals('baz'),
  })
  expect(predicate({
    a : 'foo',
    b : 'bar',
    x : 11,
    y : 19,
  })).toEqual(false)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#where)

### whereEq

```typescript

whereEq<T, U>(condition: T, input: U): boolean
```

It will return `true` if all of `input` object fully or partially include `rule` object.

`R.equals` is used to determine equality.

```javascript
const condition = { a : { b : 1 } }
const input = {
  a : { b : 1 },
  c : 2
}

const result = whereEq(condition, input)
// => true
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20condition%20%3D%20%7B%20a%20%3A%20%7B%20b%20%3A%201%20%7D%20%7D%0Aconst%20input%20%3D%20%7B%0A%20%20a%20%3A%20%7B%20b%20%3A%201%20%7D%2C%0A%20%20c%20%3A%202%0A%7D%0A%0Aconst%20result%20%3D%20whereEq(condition%2C%20input)%0A%2F%2F%20%3D%3E%20true">Try this <strong>R.whereEq</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.whereEq</strong> source</summary>

```javascript
import { equals } from './equals'
import { filter } from './filter'

export function whereEq(condition, input){
  if (arguments.length === 1){
    return _input => whereEq(condition, _input)
  }

  const result = filter((conditionValue, conditionProp) =>
    equals(conditionValue, input[ conditionProp ]),
  condition)

  return Object.keys(result).length === Object.keys(condition).length
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { whereEq } from './whereEq'

test('when true', () => {
  const condition = { a : 1 }
  const input = {
    a : 1,
    b : 2,
  }

  const result = whereEq(condition, input)
  const expectedResult = true

  expect(result).toEqual(expectedResult)
})

test('when false', () => {
  const condition = { a : 1 }
  const input = { b : 2 }

  const result = whereEq(condition, input)
  const expectedResult = false

  expect(result).toEqual(expectedResult)
})

test('with nested object', () => {
  const condition = { a : { b : 1 } }
  const input = {
    a : { b : 1 },
    c : 2,
  }

  const result = whereEq(condition)(input)
  const expectedResult = true

  expect(result).toEqual(expectedResult)
})

test('with wrong input', () => {
  const condition = { a : { b : 1 } }

  expect(() => whereEq(condition, null)).toThrowWithMessage(TypeError,
    'Cannot read property \'a\' of null')
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#whereEq)

### without

```typescript

without<T>(matchAgainst: T[], source: T[]): T[]
```

It will return a new array, based on all members of `source` list that are not part of `matchAgainst` list.

`R.equals` is used to determine equality.

```javascript
const source = [1, 2, 3, 4]
const matchAgainst = [2, 3]

const result = R.without(matchAgainst, source)
// => [1, 4]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20source%20%3D%20%5B1%2C%202%2C%203%2C%204%5D%0Aconst%20matchAgainst%20%3D%20%5B2%2C%203%5D%0A%0Aconst%20result%20%3D%20R.without(matchAgainst%2C%20source)%0A%2F%2F%20%3D%3E%20%5B1%2C%204%5D">Try this <strong>R.without</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.without</strong> source</summary>

```javascript
import { includesArray } from './includes'
import { reduce } from './reduce'

export function without(matchAgainst, source){
  if (source === undefined){
    return _source => without(matchAgainst, _source)
  }

  return reduce(
    (prev, current) =>
    includesArray(current, matchAgainst) ? prev : prev.concat(current),
    [],
    source
  )
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { without } from './without'

test('should return a new list without values in the first argument ', () => {
  const itemsToOmit = [ 'A', 'B', 'C' ]
  const collection = [ 'A', 'B', 'C', 'D', 'E', 'F' ]

  expect(without(itemsToOmit, collection)).toEqual([ 'D', 'E', 'F' ])
  expect(without(itemsToOmit)(collection)).toEqual([ 'D', 'E', 'F' ])
})

test('ramda bug', () => {
  expect(
    without("0:1", ["0", "0:1"])
  ).toEqual(['0:1'])
})

test('ramda test', () => {
  expect(without([ 1, 2 ])([ 1, 2, 1, 3, 4 ])).toEqual([ 3, 4 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#without)

### xnor

```typescript

xnor(x: boolean, y: boolean): boolean
```

Logical XNOR

```javascript
const result = [
  R.xnor(1, 0),
  R.xnor(0, 1),
  R.xnor(0, 0),
  R.xnor(1, 1),
]
// => [true, false, false, true]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20R.xnor(1%2C%200)%2C%0A%20%20R.xnor(0%2C%201)%2C%0A%20%20R.xnor(0%2C%200)%2C%0A%20%20R.xnor(1%2C%201)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Btrue%2C%20false%2C%20false%2C%20true%5D">Try this <strong>R.xnor</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.xnor</strong> source</summary>

```javascript
export function xnor(x, y){
  if (arguments.length === 1){
    return _y => xnor(x, _y)
  }

  return Boolean(x && y || !x && !y)
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { xnor } from './xnor'

test('when true', () => {
  expect(xnor(1, 1)).toBeTrue()
  expect(xnor(0)(0)).toBeTrue()
})

test('when false', () => {
  expect(xnor(0, 1)).toBeFalse()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#xnor)

### xor

```typescript

xor(x: boolean, y: boolean): boolean
```

Logical XOR

```javascript
const result = [
  xor(true, true),
  xor(false, false),
  xor(false, true),
]
// => [false, false, true]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20%5B%0A%20%20xor(true%2C%20true)%2C%0A%20%20xor(false%2C%20false)%2C%0A%20%20xor(false%2C%20true)%2C%0A%5D%0A%2F%2F%20%3D%3E%20%5Bfalse%2C%20false%2C%20true%5D">Try this <strong>R.xor</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.xor</strong> source</summary>

```javascript
export function xor(a, b){
  if (arguments.length === 1) return _b => xor(a, _b)

  return Boolean(a) && !b || Boolean(b) && !a
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { xor } from './xor'

test('compares two values with exclusive or', () => {
  expect(xor(true, true)).toEqual(false)
  expect(xor(true, false)).toEqual(true)
  expect(xor(false, true)).toEqual(true)
  expect(xor(false, false)).toEqual(false)
})

test('when both values are truthy, it should return false', () => {
  expect(xor(true, 'foo')).toEqual(false)
  expect(xor(42, true)).toEqual(false)
  expect(xor('foo', 42)).toEqual(false)
  expect(xor({}, true)).toEqual(false)
  expect(xor(true, [])).toEqual(false)
  expect(xor([], {})).toEqual(false)
  expect(xor(new Date(), true)).toEqual(false)
  expect(xor(true, Infinity)).toEqual(false)
  expect(xor(Infinity, new Date())).toEqual(false)
})

test('when both values are falsy, it should return false', () => {
  expect(xor(null, false)).toEqual(false)
  expect(xor(false, undefined)).toEqual(false)
  expect(xor(undefined, null)).toEqual(false)
  expect(xor(0, false)).toEqual(false)
  expect(xor(false, NaN)).toEqual(false)
  expect(xor(NaN, 0)).toEqual(false)
  expect(xor('', false)).toEqual(false)
})

test('when one argument is truthy and the other is falsy, it should return true', () => {
  expect(xor('foo', null)).toEqual(true)
  expect(xor(null, 'foo')).toEqual(true)
  expect(xor(undefined, 42)).toEqual(true)
  expect(xor(42, undefined)).toEqual(true)
  expect(xor(Infinity, NaN)).toEqual(true)
  expect(xor(NaN, Infinity)).toEqual(true)
  expect(xor({}, '')).toEqual(true)
  expect(xor('', {})).toEqual(true)
  expect(xor(new Date(), 0)).toEqual(true)
  expect(xor(0, new Date())).toEqual(true)
  expect(xor([], null)).toEqual(true)
  expect(xor(undefined, [])).toEqual(true)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#xor)

### zip

```typescript

zip<K, V>(x: K[], y: V[]): KeyValuePair<K, V>[]
```

It will return a new array containing tuples of equally positions items from both `x` and `y` lists. 

The returned list will be truncated to match the length of the shortest supplied list.

```javascript
const x = [1, 2]
const y = ['A', 'B']
R.zip(x, y)
// => [[1, 'A'], [2, 'B']]

// truncates to shortest list
R.zip([...x, 3], ['A', 'B'])
// => [[1, 'A'], [2, 'B']]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20x%20%3D%20%5B1%2C%202%5D%0Aconst%20y%20%3D%20%5B'A'%2C%20'B'%5D%0AR.zip(x%2C%20y)%0A%2F%2F%20%3D%3E%20%5B%5B1%2C%20'A'%5D%2C%20%5B2%2C%20'B'%5D%5D%0A%0A%2F%2F%20truncates%20to%20shortest%20list%0AR.zip(%5B...x%2C%203%5D%2C%20%5B'A'%2C%20'B'%5D)%0A%2F%2F%20%3D%3E%20%5B%5B1%2C%20'A'%5D%2C%20%5B2%2C%20'B'%5D%5D">Try this <strong>R.zip</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.zip</strong> source</summary>

```javascript
export function zip(left, right){
  if (arguments.length === 1) return _right => zip(left, _right)

  const result = []
  const length = Math.min(left.length, right.length)

  for (let i = 0; i < length; i++){
    result[ i ] = [ left[ i ], right[ i ] ]
  }

  return result
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { zip } from './zip'

const array1 = [ 1, 2, 3 ]
const array2 = [ 'A', 'B', 'C' ]

test('should return an array', () => {
  const actual = zip(array1)(array2)
  expect(actual).toBeInstanceOf(Array)
})

test('should return and array or tuples', () => {
  const expected = [
    [ 1, 'A' ],
    [ 2, 'B' ],
    [ 3, 'C' ],
  ]
  const actual = zip(array1, array2)
  expect(actual).toEqual(expected)
})

test('should truncate result to length of shorted input list', () => {
  const expectedA = [
    [ 1, 'A' ],
    [ 2, 'B' ],
  ]
  const actualA = zip([ 1, 2 ], array2)
  expect(actualA).toEqual(expectedA)

  const expectedB = [
    [ 1, 'A' ],
    [ 2, 'B' ],
  ]
  const actualB = zip(array1, [ 'A', 'B' ])
  expect(actualB).toEqual(expectedB)
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#zip)

### zipObj

```typescript

zipObj<T, K extends string>(keys: K[], values: T[]): { [P in K]: T }
```

It will return a new object with keys of `keys` array and values of `values` array.

```javascript
const keys = ['a', 'b', 'c']

R.zipObj(keys, [1, 2, 3])
// => {a: 1, b: 2, c: 3}

// truncates to shortest list
R.zipObj(keys, [1, 2])
// => {a: 1, b: 2}
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20result%20%3D%20const%20keys%20%3D%20%5B'a'%2C%20'b'%2C%20'c'%5D%0A%0AR.zipObj(keys%2C%20%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%3D%3E%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D%0A%0A%2F%2F%20truncates%20to%20shortest%20list%0AR.zipObj(keys%2C%20%5B1%2C%202%5D)%0A%2F%2F%20%3D%3E%20%7Ba%3A%201%2C%20b%3A%202%7D">Try this <strong>R.zipObj</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.zipObj</strong> source</summary>

```javascript
import { take } from './take'

export function zipObj(keys, values){
  if (arguments.length === 1) return yHolder => zipObj(keys, yHolder)

  return take(values.length, keys).reduce((
    prev, xInstance, i
  ) => {
    prev[ xInstance ] = values[ i ]

    return prev
  }, {})
}
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { equals } from './equals'
import { zipObj } from './zipObj'

test('zipObj', () => {
  expect(zipObj([ 'a', 'b', 'c' ], [ 1, 2, 3 ])).toEqual({
    a : 1,
    b : 2,
    c : 3,
  })
})

test('0', () => {
  expect(zipObj([ 'a', 'b' ])([ 1, 2, 3 ])).toEqual({
    a : 1,
    b : 2,
  })
})

test('1', () => {
  expect(zipObj([ 'a', 'b', 'c' ])([ 1, 2 ])).toEqual({
    a : 1,
    b : 2,
  })
})

test('ignore extra keys', () => {
  const result = zipObj([ 'a', 'b', 'c', 'd', 'e', 'f' ], [ 1, 2, 3 ])
  const expected = {
    a : 1,
    b : 2,
    c : 3,
  }

  expect(equals(result, expected)).toBeTrue()
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#zipObj)

### zipWith

```typescript

zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult, list1: T[], list2: U[]): TResult[]
```

```javascript
const list1 = [ 10, 20, 30, 40 ]
const list2 = [ 100, 200 ]

const result = R.zipWith(
  R.add, list1, list2
)
// => [110, 220]
```

<a title="redirect to Rambda Repl site" href="https://rambda.now.sh?const%20list1%20%3D%20%5B%2010%2C%2020%2C%2030%2C%2040%20%5D%0Aconst%20list2%20%3D%20%5B%20100%2C%20200%20%5D%0A%0Aconst%20result%20%3D%20R.zipWith(%0A%20%20R.add%2C%20list1%2C%20list2%0A)%0A%2F%2F%20%3D%3E%20%5B110%2C%20220%5D">Try this <strong>R.zipWith</strong> example in Rambda REPL</a>

<details>

<summary><strong>R.zipWith</strong> source</summary>

```javascript
import { curry } from './curry'
import { take } from './take'

function zipWithFn(
  fn, x, y
){
  return take(x.length > y.length ? y.length : x.length,
    x).map((xInstance, i) => fn(xInstance, y[ i ]))
}

export const zipWith = curry(zipWithFn)
```

</details>

<details>

<summary><strong>Tests</strong></summary>

```javascript
import { add } from './add'
import { zipWith } from './zipWith'

const list1 = [ 1, 2, 3 ]
const list2 = [ 10, 20, 30, 40 ]
const list3 = [ 100, 200 ]

test('when second list is shorter', () => {
  const result = zipWith(
    add, list1, list3
  )
  expect(result).toEqual([ 101, 202 ])
})

test('when second list is longer', () => {
  const result = zipWith(
    add, list1, list2
  )
  expect(result).toEqual([ 11, 22, 33 ])
})
```

</details>

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#zipWith)

## ❯ CHANGELOG

7.4.0

- Add `R.objOf` method

- Add `R.mapObjIndexed` method

7.3.0

- Add `R.rejectIndexed` and `R.partitionIndexed` methods - [Rambdax issue #67](https://github.com/selfrefactor/rambdax/issues/67)

- Expose `R.mapObject`, `R.mapArray`, `R.filterObject` and `R.filterArray` - [Issue #578](https://github.com/selfrefactor/rambda/issues/578)

- `R.has` use `Object.prototype.hasOwnProperty`- [Issue #572](https://github.com/selfrefactor/rambda/issues/572)

- Fix `R.intersection` wrong order compared to Ramda.

- Expose `immutable.ts` typings which are Rambda typings with `readonly` statements - [Issue #565](https://github.com/selfrefactor/rambda/issues/565), [Rambdax issue #69](https://github.com/selfrefactor/rambdax/issues/69)

- `R.path` wrong return of `null` instead of `undefined` when path value is `null` - [PR #577](https://github.com/selfrefactor/rambda/pull/577)

- Wrong arguments order in `R.removeIndex` - [Issue #66](https://github.com/selfrefactor/rambdax/issues/66)

- Change `R.piped` typings to mimic that of `R.pipe`. Main difference is that `R.pipe` is focused on unary functions.

- Fix wrong logic when `R.without` use `R.includes` while it should use array version of `R.includes`.

- Use uglify plugin for UMD bundle.

- Remove `ts-toolbelt` types from Typescript definitions. Most affected are the following methods, which lose one of its curried definitions:

1. R.maxBy
2. R.minBy
3. R.pathEq
4. R.viewOr
5. R.when
6. R.merge
7. R.mergeDeepRight
8. R.mergeLeft

7.2.0

- Approve [PR #61](https://github.com/selfrefactor/rambda/pull/61) - fix wrong `R.isValid` typings

- R.produceAsync returns promise even if all rules are synchronous.

- `R.defaultTo` no longer accepts infinite inputs, thus it follows Ramda implementation.

- `R.equals` supports equality of functions.

- `R.pipe` doesn't use `R.compose`.

- Close [Issue #561](https://github.com/selfrefactor/rambda/issues/561) - export several internal TS interfaces and types

- Add `CHANGELOG.md` file in release files list

7.1.0

- Add `R.tryCatchAsync`

- Add `R.xnor`

- `R.equals` supports equality of functions.

- Close [Issue #559](https://github.com/selfrefactor/rambda/issues/559) - improve `R.propOr` typings

- Close [Issue #560](https://github.com/selfrefactor/rambda/issues/560) - apply immutable lint to Typescript definitions

- Close [Issue #553](https://github.com/selfrefactor/rambda/issues/553) - fix problem with curried typings of `R.prop`

- Fix wrong `R.last` typing

- Upgrade all `rollup` related dependencies

- `R.type` supports `Symbol` just like *Ramda*.

- Remove file extension in `main` property in `package.json` in order to allow `experimental-modules`. See also this Ramda's PR - https://github.com/ramda/ramda/pull/2678/files

- Import `R.indexBy`/`R.when`/`R.zipObj`/`R.propEq`/`R.complement` changes from recent `@types/ramda` release.

- `R.tryCatch` stop supporting asynchronous functions; the previous behaviour is exported to *Rambdax* as `R.tryCatchAsync`

7.0.1

- Fix missing `Evolved` declaration in Typescript definition

7.0.0

- Rename `R.produce` to `R.produceAsync`

- Add `R.produce` which is synchronous version of `R.produceAsync`

- Stop supporting expression inside template's props. Also, spaces are no longer allowed between `{{` and `}}`, i.e. `R.interpolate('{{ foo }}', x)` should be `R.interpolate('{{foo}}', x)`.

- Add typings for `R.takeWhile` when iterable is a string

- Add `R.takeLastWhile`

- Add `R.dropWhile`

- Add `R.eqProps`

- Add `R.dropLastWhile`

- Add `R.dropRepeats`

- Add `R.dropRepeatsWith`

- Add `R.evolve`

6.2.0

- `R.switcher` accepts `undefined` as valid input

- Add `R.props`

- Add `R.zipWith`

- Add `R.splitAt`

- Add `R.splitWhen`

- Close [Issue #547](https://github.com/selfrefactor/rambda/issues/547) - restore `readonly` declaration in Rambda Typescript definitions.

- `R.append`/`R.prepend` now work only with arrays just like Ramda. Previous behaviour was for them to work with both arrays and strings.

- Sync `R.pluck` typings with `@types/ramda` as there was a tiny difference.

6.1.0 

- Add `R.mapIndexed`

- Add `R.filterIndexed`

- Add `R.forEachIndexed`

- Fix `R.and` wrong definition, because the function doesn't convert the result to boolean. This introduce another difference with `@types/ramda`.

- Add `R.once`

- Add `R.or`
 
6.0.0

- Breaking change - `R.map`/`R.filter`/`R.reject`/`R.forEach`/`R.partition` doesn't pass index as second argument to the predicate, when looping over arrays. The old behaviour of *map*, *filter* and *forEach* can be found in Rambdax methods *R.mapIndexed*, *R.filterIndexed* and *R.forEachIndexed*(introduced in version `6.1.0`).

- Breaking change - `R.all`/`R.none`/`R.any`/`R.find`/`R.findLast`/`R.findIndex`/`R.findLastIndex` doesn't pass index as second argument to the predicate.

- Add `R.applyDiff` method

- Change `R.assocPath` typings so the user can explicitly sets type of the new object

- Typings of `R.assoc` match its `@types/ramda` counterpart.

- Simplify `R.forEach` typings

- Remove `ReadonlyArray<T>` pattern from Typescript definitions - not enough value for the noise  it adds.

- Fix typing of `R.reject` as it wrongly declares that with object, it pass property to predicate.

5.1.0

- Add `R.takeUntil` method

- Fix wrong `R.takeWhile`

5.0.0

- Deprecate `R.change` method - it does too much; partially replaced with `R.updateObject`.

- Deprecate `R.compact` method - vague use case; `R.filter` does the same job.

- `R.produce` always returns a promise

- Add `R.updateObject` method

- Add `R.takeWhile` method

- Add `R.viewOr` method

- Add `R.pipeAsync` method

- Add `R.removeIndex` method

- Add `R.excludes` method

- `R.includes` throws on wrong input, i.e. `R.includes(1, null)`

- Close [Issue #524](https://github.com/selfrefactor/rambda/issues/524) - `R.assocPath` wrong logic when number is used in array path input.

- `R.mapToObjectAsync` supports currying

- `R.mapAsyncLimit` supports currying

- Fix `R.mapAsync` to pass property to iterator, when input is an object.

- Fix currying for several async methods - `R.tapAsync`, `R.produce`, `R.filterAsync` *(extend typings)

4.2.0

- Add `R.move` method

- Add `R.union` method

- Add `R.lensSatisfies` method

- Add `R.mapKeys` method

- Add `R.sortByPath` method

- Add `R.sortByProps` method

- Close [Issue #519](https://github.com/selfrefactor/rambda/issues/519) -
`ts-toolbelt` needs other type of export with `--isolatedModules` flag

4.1.0

- `R.template` is renamed to `R.interpolate`

- `R.equals` now supports negative zero just like `Ramda.equals`

- Add `R.replaceAll` method

- Add `R.lensEq` method

4.0.1

Forgot to export `R.of` because of wrong marker in `files/index.d.ts`

4.0.0

Deprecate the following methods:

- `R.promiseAllObject` - because `R.produce` serves the same purpose
- `R.composed` - because `R.piped` makes more sense, when we want to pass the input at the start of the function
- `R.defaultToStrict` - confusing logic
- `R.findInObject` - overestimated importance
- `R.headObject` - overestimated importance
- `R.includesType` - overestimated importance
- `R.inject` - confusing logic
- `R.isAttach` - confusing logic
- `R.mergeRight` - overestimated importance
- `R.opposite` - overestimated importance
- `R.otherwise` - overestimated importance
- `R.pushUniq` - overestimated importance
- `R.resolve` - overestimated importance
- `R.s` - overestimated importance
- `R.toggle` - overestimated importance
- `R.uuid` - not suitable
- `R.whenAsync` - overestimated importance

Move the following methods to `Rambda` and change their logic to match `Ramda` implementation:

- `R.hasPath`
- `R.unless`
- `R.pathEq`
- `R.tryCatch`
- `R.where`
- `R.whereEq`

Also these changes:

- `R.flatMap` - renamed to `R.chain` and moved to `Rambda`

- `R.ifElseAsync` - accept any number of arguments for the returned function

- `R.produce`, `R.filterAsync`, `R.debounce`, `R.throttle` - fix typings

- `R.mapAsyncLimit` - drop support for curring and therefore for usage with `R.composeAsync`

- Improve `R.ok` throwed error message

- `R.ok` returns `undefined` instead of `true` when validation passes.

- `R.mergeDeep` is renamed to `R.mergeDeepLeft`

- Add `R.pipeAsync`

- Take `R.partialCurry` from `Rambda` as it is deprecated there

3.7.0

> Sync with Rambda

Add `R.lens`

Add `R.lensIndex`

Add `R.lensPath`

Add `R.lensProp`

Add `R.over`

Add `R.set`

Add `R.view`

Add `R.paths`

Add `R.xor`

Add `R.cond`

3.6.0

- Add `R.mapAsyncLimit`

- Add `R.toggle`, match Ramda upcoming method specification

- Add `R.isValidAsync`

- Extend `R.template` without introducing breaking change

3.5.0 Sync with `Rambda` - add methods descriptions to Typescript definitions

3.4.0 Sync with `Rambda` and close [Issue #42](https://github.com/selfrefactor/rambdax/pull/42)

3.3.0 Fix `R.sortObject` typing

3.3.0 Add `R.filterAsync` and `R.sortObject` methods

3.2.0 `R.uuid` accept second argument in order to return string only uuid

3.1.0 Dynamic set of exports lead to adding previously ommited Rambda exports such as `R.identical`

3.0.3 Sync with Rambda - new functionality of `R.isEmpty`

3.0.2 Add typings for `R.mapToObject`

3.0.1 Fix typings

3.0.0 Breaking change as `Rambda` also has breaking changes

Read more about it in `Rambda` changelog

Also with this versions, typings tests are provided and several definitions are changed.

- R.anyTrue, R.anyFalse, R.allTrue, R.allFalse use internal `isTruthy` and `isFalsy` methods. Empty array and object with zero length are considered falsy.

- Deprecate `R.contains`

- Deprecate `R.defaultToWhen`

- Moved `R.runTests` to `helpers` repo

2.17.0 Change in `R.runTests` logic. It will be removed from Rambdax to `helpers` repo.

2.16.0 Restore `R.runTests` but without documentation

- export `getEvaluations`, `getPositiveEvaluation`, `getNegativeEvaluation` in the context of `R.runTests`

2.15.0 Several changes

- Typescript definitions have been updated and typings tests are introduced

- `R.mapAsync` and `R.mapFastAsync` pass index as second argument

2.14.1 Restore `R.contains`

2.14.0 Several changes:

- `R.inject` accept before flag as fourth argument

- Remove `R.includesAny`

- Improve typing of `R.partition`

- `R.nextIndex` and `R.prevIndex` work also with number as second argument

2.13.1 Deprecate `R.log` and `R.runTests`

2.12.3 Add 'dist' directory to `files`

2.12.2 Add `R.mapToObject` typings

2.12.0 Sync with Rambda

2.11.1 Fix `R.waitFor`

2.11.0 Add `R.toDecimal`

2.10.2 Fix [issue 32](https://github.com/selfrefactor/rambdax/issues/32)

2.10.0 deprecate `R._`

2.9.1 R.fromPairs/toPairs typing

2.9.0 npm doesn't update version on their site

2.8.2 R.map typing

2.8.0 Sync with Rambda | no need for create types script

2.7.0 Add `R.prevIndex`

2.6.2 Sync with Rambda

2.6.0 `R.log` depends on `RAMBDAX_LOG`

2.5.0 Rambda's `partial`

2.4.0 Add `R.uuid`

2.3.0 `R._` parse to constant case

> This introduce breaking change for ie11 as noted in [issue 31](https://github.com/selfrefactor/rambdax/issues/31) which is fixed with `2.10.0` which deprecates this method

2.2.1 Add `R.log`, `R.logInit` and `R.logHolder`

2.1.0 Add `R._`

2.0.0 Add `R.toggle`

1.9.0 Add `R.pushUniq`

1.8.2 No need for sourcemaps

1.8.1 Fix building with `regeneratorRuntime`

1.8.0 Upgrade to new major Rollup release

- Restore `R.headObject`

- Add `R.hasPath` method

1.7.2 `R.memoize` contains dev console.logs

1.7.1 Forgot to build types

1.7.0 Rename `R.then` to `R.resolve` because of Ramda issue with `R.then`(they rename it to `R.andThen`)

- Add `R.isFalsy`, `R.nextIndex` and `R.mergeDeep`

1.6.3 Forgot to export `R.unless`(credit to @mobily for the PR)

1.6.0 Restore `R.compact` method

1.5.6 `R.maybe` accepts also anonymous functions as second and third argument

1.5.5 Add `R.maybe` method

- Fix errors caugth by `DeepScan` service
- Fix Typescript definitions for `R.then` and `R.otherwise`
- `R.change` increase nesting level to 4

1.4.1 `R.isValid` didn't work with `Number` prototype

1.4.0 Add multiple methods

- Add `R.defaultToStrict`
- Add `R.defaultToWhen`
- Add `R.whereEq`
- Add `R.partition`
- Add `R.negate` is renamed to `R.opposite`
- Add `R.then`
- Add `R.otherwise`
- `R.isValid` accepts prototypes as rules, i.e. `schema = {a: String}`
- The prevoious point leads to the same change applied to the methods depending on `R.isValid`, i.e. `R.ok`, `R.pass` and `R.isAttach`

  1.3.0 Add `R.unless`

- `R.when` accepts both function and value for `whenTrue` argument. The same is valid for `R.unless`

- export `R.negate` which is the same as `R.complement`

  1.2.0 Export `src` folder

  1.1.0 Restore `promiseAllObject` and `flatMap`

  1.0.1 Fix typings

  1.0.0 Deprecate the following methods:

- compact
- evolve
- flatMap
- greater
- intersection
- less
- omitBy
- pickBy
- promiseAllObject
- promiseAllSecure
- rangeBy

> Also pass deprecation of `addIndex` from `Rambda@2.0.0`

0.24.0 add `R.pipedAsync`, replace `R.multiline` with `R.glue`, remove `R.validate`

0.23.0 Add `R.count`

0.22.0 Add `R.includesAny`

0.21.0 Add `R.includesType`

0.20.1 `R.pass` and `R.ok` work with single schema.

0.20.0 Add `R.pathEq`

0.19.0 Add `R.wait`, expose already complete `R.waitFor`

0.18.0 Add`R.anyType` and `R.allType`

0.17.0 Rename `R.is` to `R.pass` and restore `R.is` original functionality.

0.16.0 getter, setter, reset methods

0.15.3 No more `prepublish` script

0.15.2 curry in `remove`

> Last version with `lib` folder exposed

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-changelog)

## ❯ Additional info

> Most influential contributors

- [@farwayer](https://github.com/farwayer) - improving performance in R.find, R.filter; give the idea how to make benchmarks more reliable;

- [@thejohnfreeman](https://github.com/thejohnfreeman) - add R.assoc, R.chain;

- [@helmuthdu](https://github.com/helmuthdu) - add R.clone; help improve code style;

- [@jpgorman](https://github.com/jpgorman) - add R.zip, R.reject, R.without, R.addIndex;

- [@ku8ar](https://github.com/ku8ar) - add R.slice, R.propOr, R.identical, R.propIs and several math related methods; introduce the idea to display missing Ramda methods;

- [@romgrk](https://github.com/romgrk) - add R.groupBy, R.indexBy, R.findLast, R.findLastIndex;

- [@squidfunk](https://github.com/squidfunk) - add R.assocPath, R.symmetricDifference, R.difference, R.intersperse;

- [@synthet1c](https://github.com/synthet1c) - add all lenses methods; add R.applySpec, R.converge;

- [@vlad-zhukov](https://github.com/vlad-zhukov) - help with configuring Rollup, Babel; change export file to use ES module exports;

> Rambda references

- [Interview with Dejan Totef at SurviveJS blog](https://survivejs.com/blog/rambda-interview/)

- [Awesome functional Javascript programming libraries](https://github.com/stoeffel/awesome-fp-js#libraries)

> Links to Rambda

- [https://mailchi.mp/webtoolsweekly/web-tools-280](Web Tools Weekly)

- [https://github.com/stoeffel/awesome-fp-js](awesome-fp-js)

- [https://github.com/docsifyjs/awesome-docsify](awesome-docsify)

> Deprecated from `Used by` section

- [SAP's Cloud SDK](https://github.com/SAP/cloud-sdk) - This repo doesn't uses `Rambda` since *October/2020* [commit that removes Rambda](https://github.com/SAP/cloud-sdk/commit/b29b4f915c4e4e9c2441e7b6b67cf83dac1fdac3)

> Releases

[Rambda's releases](https://github.com/selfrefactor/rambda/releases) before **6.4.0** were used mostly for testing purposes.

[![---------------](https://raw.githubusercontent.com/selfrefactor/rambda/master/files/separator.png)](#-additional-info)

## My other libraries

<table>
    <tbody>
        <tr valign="top">
            <td width="20%" align="center">
                <h4>Niketa theme</h4>
                <a href="https://marketplace.visualstudio.com/items?itemName=selfrefactor.Niketa-theme">Collection of 9 light VSCode themes</a>
            </td>
            <td width="20%" align="center">
                <h4>Niketa dark theme</h4>
                <a href="https://marketplace.visualstudio.com/items?itemName=selfrefactor.niketa-dark-theme">Collection of 9 dark VSCode themes</a>
            </td>
            <td width="20%" align="center">
                <h4>String-fn</h4>
                <a href="https://github.com/selfrefactor/services/tree/master/packages/string-fn">String utility library</a>
            </td>
            <td width="20%" align="center">
                <h4>Useful Javascript libraries</h4>
                <a href="https://github.com/selfrefactor/useful-javascript-libraries">Large collection of JavaScript,Typescript and Angular related repos links</a>
            </td>
            <td width="20%" align="center">
                <h4>Run-fn</h4>
                <a href="https://github.com/selfrefactor/services/tree/master/packages/run-fn">CLI commands for lint JS/TS files, commit git changes and upgrade of dependencies</a>
            </td>
        </tr>
    </tbody>
</table>