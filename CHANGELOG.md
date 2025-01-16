11.3.1

- Sync with `Rambda` version `9.4.2`

11.3.0

- Fix `deno` release

- Sync with `Rambda` version `9.4.1`

11.2.0

- `R.throttle` TS typings now support no argument case for function input.

- Sync with `Rambda` version `9.3.0`

11.1.1

Fix broken build due to changes to TypeScript definitions for lenses.

11.1.0

- Improve `R.mapToObject` types - [Issue #96](https://github.com/selfrefactor/rambdax/issues/96)

- Sync with `Rambda` version `9.2.0`

11.0.0

- Sync with `Rambda` version `9.1.0`

- Change typings of `R.lensEq` to match `Rambda-adjust` typings

10.1.0

- Simplify TypeScript logic of `R.pipeAsync/R.composeAsync/R.pipedAsync` - [MR #698](https://github.com/selfrefactor/rambda/pull/698)

- Sync with `Rambda` version `8.6.0`

10.0.0

- Sync with `Rambda` version `8.0.0`

- Add `R.omitPaths` - [Issue #681](https://github.com/selfrefactor/rambda/issues/681)

- Add `R.noop`

9.1.1

Add missing fix for `type: module` imports.

9.1.0

- Sync with `Rambda` version `7.5.0`

9.0.0

From this release, CHANGELOG will simply refer to the `Rambda` version linked to the release, instead of listing `Rambda` changes here as well. In this case, the version referring to this release is `7.3.0`.

- Breaking change due to renaming of `R.mapFastAsync` to `R.mapParallelAsync` and `R.mapAsyncLimit` to `R.mapParallelAsyncWithLimit`.

8.1.0

- Breaking change due to renaming of `R.partialCurry` to `R.partialObject`.

- Wrong `R.update` if index is `-1` - [PR #593](https://github.com/selfrefactor/rambda/pull/593)

- Wrong curried typings in `R.anyPass` - [Issue #642](https://github.com/selfrefactor/rambda/issues/642)

- `R.modifyPath` not exported - [Issue #640](https://github.com/selfrefactor/rambda/issues/640)

- Add new method `R.uniqBy`. Implementation is coming from [Ramda MR#2641](https://github.com/ramda/ramda/pull/2641)

- Apply the following changes from `@types/rambda`:

-- [https://github.com/DefinitelyTyped/DefinitelyTyped/commit/bab47272d52fc7bb81e85da36dbe9c905a04d067](add `AnyFunction` and `AnyConstructor`)

-- Improve `R.ifElse` typings - https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59291

-- Make `R.propEq` safe for `null/undefined` arguments - https://github.com/ramda/ramda/pull/2594/files

- Rambda's `pipe/compose` doesn't return proper length of composed function which leads to issue with `R.applySpec`. It was fixed by alligning Rambda's `pipe/compose` with Ramda logic - [Issue #627](https://github.com/selfrefactor/rambda/issues/627)

- Replace `Async` with `Promise` as return type of `R.type`.

- Add new types as TypeScript output for `R.type` - "Map", "WeakMap", "Generator", "GeneratorFunction", "BigInt", "ArrayBuffer"

- Add new methods after `Ramda` version upgrade to `0.28.0`:

-- R.count
-- R.modifyPath
-- R.on
-- R.whereAny

- Replace `Async` with `Promise` as return type of `R.type`. 

- Remove `isFunction` method

- Add `R.juxt` method

- Add `R.contains` method

- Add `R.mapcat` method WIP

- Add `R.flattenObject` method

- Add `R.deletePath` method WIP

- Change `R.count` logic to match the new `Ramda.count` method. Instead of counting for target value, the counting is done by predicate function.

8.0.1

- Rambdax doesn't work with `pnpm` due to wrong export configuration - [Issue #619](https://github.com/selfrefactor/rambda/issues/619)

8.0.0

- Breaking change - sync `R.compose`/`R.pipe` with `@types/ramda`. That is significant change so as safeguard, it will lead a major bump. Important - this lead to raising required TypeScript version to `4.2.2`. In other words, to use `Rambda` you'll need TypeScript version `4.2.2` or newer.

Related commit in `@types/ramda` - https://github.com/DefinitelyTyped/DefinitelyTyped/commit/286eff4f76d41eb8f091e7437eabd8a60d97fc1f#diff-4f74803fa83a81e47cb17a7d8a4e46a7e451f4d9e5ce2f1bd7a70a72d91f4bc1

There are several other changes in `@types/ramda` as stated in [this comment](https://github.com/ramda/ramda/issues/2976#issuecomment-990408945). This leads to change of typings for the following methods in **Rambda**:

-- R.unless

-- R.toString

-- R.ifElse

-- R.always

-- R.complement

-- R.cond

-- R.is

-- R.sortBy

-- R.dissoc

-- R.toPairs

-- R.assoc

-- R.toLower

-- R.toUpper

- One more reason for the breaking change is changing of export declarations in `package.json` based on [this blog post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#packagejson-exports-imports-and-self-referencing) and [this merged Ramda's PR](https://github.com/ramda/ramda/pull/2999). This also led to renaming of `babel.config.js` to `babel.config.cjs`. 

- Add `R.apply`, `R.bind` and `R.unapply`

- Fix missing return value in `R.throttle` - [Issue #76](https://github.com/selfrefactor/rambdax/issues/76)

- Add `R.findAsync` - [Issue #65](https://github.com/selfrefactor/rambdax/issues/65)

- Fix `R.debounce` typings as the method actually doesn't return a result.

- `R.startsWith/R.endsWith` now support lists as inputs. This way, it matches current Ramda behavior. 

- Remove unused typing for `R.chain`.

- `R.map`/`R.filter` no longer accept bad inputs as iterable. This way, Rambda behaves more like Ramda, which also throws.

- Make `R.lastIndexOf` follow the logic of `R.indexOf`.

- Change `R.type` logic to Ramda logic. This way, `R.type` can return `Error` and `Set` as results.

- Add missing logic in `R.equals` to compare sets - [Issue #599](https://github.com/selfrefactor/rambda/issues/599)

- Improve list cloning - [Issue #595](https://github.com/selfrefactor/rambda/issues/595)

- Handle multiple inputs with `R.allPass` and `R.anyPass` - [Issue #604](https://github.com/selfrefactor/rambda/issues/604)

- Fix `R.length` wrong logic with inputs as `{length: 123}` - [Issue #606](https://github.com/selfrefactor/rambda/issues/606).

- Improve non-curry typings of `R.merge` by using types from [mobily/ts-belt](https://github.com/mobily/ts-belt).

- Improve performance of `R.uniqWith`.

- Wrong `R.update` if index is `-1` - [PR #593](https://github.com/selfrefactor/rambda/pull/593)

- Make `R.eqProps` safe for falsy inputs - based on [this opened Ramda PR](https://github.com/ramda/ramda/pull/2943).

- Incorrect benchmarks for `R.pipe/R.compose` - [Issue #608](https://github.com/selfrefactor/rambda/issues/608)

- Fix `R.last/R.head` typings - [Issue #609](https://github.com/selfrefactor/rambda/issues/609)

7.4.1

- Fix corrupted TypeScript definitions - [Rambdax issue #72](https://github.com/selfrefactor/rambdax/issues/72)

- Fix slow `R.uniq` methods - [Issue #581](https://github.com/selfrefactor/rambda/issues/581)

Fixing `R.uniq` was done by improving `R.indexOf` which has performance implication to all methods importing `R.indexOf`:

- R.includes
- R.intersection
- R.difference
- R.excludes
- R.symmetricDifference
- R.union

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

- Remove `ts-toolbelt` types from TypeScript definitions. Most affected are the following methods, which lose one of its curried definitions:

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

- Close [Issue #560](https://github.com/selfrefactor/rambda/issues/560) - apply immutable lint to TypeScript definitions

- Close [Issue #553](https://github.com/selfrefactor/rambda/issues/553) - fix problem with curried typings of `R.prop`

- Fix wrong `R.last` typing

- Upgrade all `rollup` related dependencies

- `R.type` supports `Symbol` just like *Ramda*.

- Remove file extension in `main` property in `package.json` in order to allow `experimental-modules`. See also this Ramda's PR - https://github.com/ramda/ramda/pull/2678/files

- Import `R.indexBy`/`R.when`/`R.zipObj`/`R.propEq`/`R.complement` changes from recent `@types/ramda` release.

- `R.tryCatch` stop supporting asynchronous functions; the previous behaviour is exported to *Rambdax* as `R.tryCatchAsync`

7.0.1

- Fix missing `Evolved` declaration in TypeScript definition

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

- Close [Issue #547](https://github.com/selfrefactor/rambda/issues/547) - restore `readonly` declaration in Rambda TypeScript definitions.

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

- Remove `ReadonlyArray<T>` pattern from TypeScript definitions - not enough value for the noise  it adds.

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

3.5.0 Sync with `Rambda` - add methods descriptions to TypeScript definitions

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

- TypeScript definitions have been updated and typings tests are introduced

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
- Fix TypeScript definitions for `R.then` and `R.otherwise`
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
