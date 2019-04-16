# CHANGELOG

2.2.1 `R.log`, `R.logInit` and `R.logHolder`

2.1.0 `R._`

2.0.0 `R.toggle`

1.9.0 `R.pushUniq`

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
