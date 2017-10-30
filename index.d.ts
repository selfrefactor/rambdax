declare namespace R {
  type Ord = number | string | boolean

  type Path = Array<number | string>

  interface KeyValuePair<K, V> extends Array<K | V> {
    0: K
    1: V
  }

  type Arity1Fn = (a: any) => any

  type Pred = (...a: any[]) => boolean

  type Evolver<T> =
    | ((x: T) => T)
    | { [K in keyof T]?: Evolver<T[K]> };

  interface CurriedTypeGuard2<T1, T2, R extends T2> {
    (t1: T1): (t2: T2) => t2 is R
    (t1: T1, t2: T2): t2 is R
  }

  interface CurriedTypeGuard3<T1, T2, T3, R extends T3> {
    (t1: T1): CurriedTypeGuard2<T2, T3, R>
    (t1: T1, t2: T2): (t3: T3) => t3 is R
    (t1: T1, t2: T2, t3: T3): t3 is R
  }

  interface CurriedTypeGuard4<T1, T2, T3, T4, R extends T4> {
    (t1: T1): CurriedTypeGuard3<T2, T3, T4, R>
    (t1: T1, t2: T2): CurriedTypeGuard2<T3, T4, R>
    (t1: T1, t2: T2, t3: T3): (t4: T4) => t4 is R
    (t1: T1, t2: T2, t3: T3, t4: T4): t4 is R
  }

  interface CurriedTypeGuard5<T1, T2, T3, T4, T5, R extends T5> {
    (t1: T1): CurriedTypeGuard4<T2, T3, T4, T5, R>
    (t1: T1, t2: T2): CurriedTypeGuard3<T3, T4, T5, R>
    (t1: T1, t2: T2, t3: T3): CurriedTypeGuard2<T4, T5, R>
    (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => t5 is R
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): t5 is R
  }

  interface CurriedTypeGuard6<T1, T2, T3, T4, T5, T6, R extends T6> {
    (t1: T1): CurriedTypeGuard5<T2, T3, T4, T5, T6, R>
    (t1: T1, t2: T2): CurriedTypeGuard4<T3, T4, T5, T6, R>
    (t1: T1, t2: T2, t3: T3): CurriedTypeGuard3<T4, T5, T6, R>
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedTypeGuard2<T5, T6, R>
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => t6 is R
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): t6 is R
  }

  interface CurriedFunction2<T1, T2, R> {
    (t1: T1): (t2: T2) => R
    (t1: T1, t2: T2): R
  }

  interface CurriedFunction3<T1, T2, T3, R> {
    (t1: T1): CurriedFunction2<T2, T3, R>
    (t1: T1, t2: T2): (t3: T3) => R
    (t1: T1, t2: T2, t3: T3): R
  }

  interface CurriedFunction4<T1, T2, T3, T4, R> {
    (t1: T1): CurriedFunction3<T2, T3, T4, R>
    (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>
    (t1: T1, t2: T2, t3: T3): (t4: T4) => R
    (t1: T1, t2: T2, t3: T3, t4: T4): R
  }

  interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
    (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>
    (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>
    (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>
    (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R
  }

  interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
    (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>
    (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>
    (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R
  }

  interface Reduced {
    [index: number]: any
    [index: string]: any
  }

  interface ProduceConditions {
    [key: string]: Function | Promise<any>
  }

  interface ObjectWithPromises {
    [key: string]: Promise<any>
  }

  interface ResolveSecureResult {
    type: "RESULT" | "ERROR"
    payload: any
  }

  type SchemaStringTypes =
    | "array"
    | "string"
    | "number"
    | "boolean"
    | RegExp
    | Function

  interface Schema {
    [key: string]: SchemaStringTypes | Array<SchemaStringTypes> | Array<Schema>
  }

  interface IsValid {
    input: object
    schema: Schema
  }

  type RambdaTypes = "Async"
    | "Promise"
    | "Object"
    | "Boolean"
    | "String"
    | "Null"
    | "Array"
    | "RegExp"
    | "Function"


  type Async = (x: any) => Promise<any>

  interface X {
    // Rambdax types
    compact(x: any[]): any[]

    composeAsync(
      ...fns: Array<Promise<any> | Function>
    ): (input: any) => Promise<any>

    debounce(fn: Function, ms: number): any

    delay(ms: Number): Promise<string>
    debug(...input: Array<any>): never

    evolve<V>(transformations: Evolver<V>, obj: V): V
    evolve<V>(transformations: Evolver<V>): <W extends V>(obj: W) => W

    greater(x: string, y: string): boolean
    greater(x: string) : (y: string) => boolean
    less(x: string, y: string): boolean
    less(x: string) : (y: string) => boolean

    ifElseAsync(condition: Async|Function, ifFn: Async|Function, elseFn: Async|Function): Async

    intersection<T>(list1: T[], list2: T[]): T[]
    intersection<T>(list1: T[]): (list2: T[]) => T[]

    isType(xType: RambdaTypes, x: any): boolean
    isArray(x: any): boolean
    isString(x: any): boolean
    isObject(x: any): boolean
    isPromiseLike(x: any): boolean

    isValid(input: IsValid): boolean

    mapAsync(fn: Async, x: any[]): Promise<Array<any>>
    mapAsync(fn: Async): (x: any[]) => Promise<Array<any>>

    mapFastAsync(fn: Async, x: any[]): Promise<Array<any>>
    mapFastAsync(fn: Async): (x: any[]) => Promise<Array<any>>

    memoize(fn: Function | Promise<any>): any

    mergeAll(input: object[]): object

    omitBy(fn: Function, input: object): object

    once(fn: Function): Function

    pickBy(fn: Function, input: object): object
    pickBy(fn: Function): (input: object) => object

    produce<T extends ProduceConditions, U extends { [key in keyof T]: any }>(conditions: T, input: any): Promise<U> | U

    produce<T extends ProduceConditions, U extends { [key in keyof T]: any }>(conditions: T) :(input: any) => Promise<U> | U

    random(min: number, max: number): number

    rangeBy(start: number, end: number, step: number): number[]

    renameProps(rules: object, input: object): object
    renameProps(rules: object): (input: object) => object

    resolve(input: ObjectWithPromises): Promise<object>

    resolveSecure(input: Array<Promise<any>>): Array<ResolveSecureResult>

    shuffle(arr: any[]): any[]

    tapAsync<T>(fn: Function | Promise<any>, input: T): T
    tapAsync<T>(fn: Function | Promise<any>): (input: T) => T

    throttle(fn: Function, ms: number): Function
    
    tryCatch<T>(fn: Function|Async, input?: any): T|Promise<T>
    
    where(conditions: object, input: object): boolean

    when(rule: Function, fn: Function): Function

    // Rambda types
    add(a: number, b: number): number
    add(a: string, b: string): string
    add(a: number): (b: number) => number
    add(a: string): (b: string) => string

    addIndex<T, U>(fn: (f: (item: T) => U, list: T[]) => U[]): CurriedFunction2<(item: T, idx: number, list?: T[]) => U, T[], U[]>

    adjust<T>(fn: (a: T) => T, index: number, list: T[]): T[]
    adjust<T>(fn: (a: T) => T, index: number): (list: T[]) => T[]

    all<T>(fn: (a: T) => boolean, list: T[]): boolean
    all<T>(fn: (a: T) => boolean): (list: T[]) => boolean

    allPass(preds: Pred[]): Pred

    always<T>(val: T): () => T

    any<T>(fn: (a: T) => boolean, list: T[]): boolean
    any<T>(fn: (a: T) => boolean): (list: T[]) => boolean

    anyPass(preds: Pred[]): Pred

    append<T, U>(el: U, list: T[]): Array<(T & U)>
    append<U>(el: U): <T>(list: T[]) => Array<(T & U)>
    append<U>(el: U): <T>(list: T[]) => Array<(T & U)>

    both(pred1: Pred, pred2: Pred): Pred
    both(pred1: Pred): (pred2: Pred) => Pred

    complement(pred: (...args: any[]) => boolean): (...args: any[]) => boolean

    compose<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1
    compose<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1
    compose<V0, V1, V2, T1>(fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T1

    compose<V0, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T2
    compose<V0, V1, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T2
    compose<V0, V1, V2, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T2

    compose<V0, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T3
    compose<V0, V1, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T3
    compose<V0, V1, V2, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T3

    compose<V0, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T4
    compose<V0, V1, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T4
    compose<V0, V1, V2, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T4

    compose<V0, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T5
    compose<V0, V1, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T5
    compose<V0, V1, V2, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T5

    compose<V0, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T6
    compose<V0, V1, T1, T2, T3, T4, T5, T6>(
        fn5: (x: T5) => T6,
        fn4: (x: T4) => T5,
        fn3: (x: T3) => T4,
        fn2: (x: T2) => T3,
        fn1: (x: T1) => T2,
        fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T6
    compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
        fn5: (x: T5) => T6,
        fn4: (x: T4) => T5,
        fn3: (x: T3) => T4,
        fn2: (x: T2) => T3,
        fn1: (x: T1) => T2,
        fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T6

    concat<T>(list1: T[], list2: T[]): T[]
    concat<T>(list1: T[]): (list2: T[]) => T[]
    concat(list1: string, list2: string): string
    concat(list1: string): (list2: string) => string

    contains(a: string, list: string): boolean
    contains<T>(a: T, list: T[]): boolean
    contains(a: string): (list: string) => boolean
    contains<T>(a: T): (list: T[]) => boolean

    curry<T1, T2, TResult extends T2>(fn: (a: T1, b: T2) => b is TResult): CurriedTypeGuard2<T1, T2, TResult>
    curry<T1, T2, T3, TResult extends T3>(fn: (a: T1, b: T2, c: T3) => c is TResult): CurriedTypeGuard3<T1, T2, T3, TResult>
    curry<T1, T2, T3, T4, TResult extends T4>(fn: (a: T1, b: T2, c: T3, d: T4) => d is TResult): CurriedTypeGuard4<T1, T2, T3, T4, TResult>
    curry<T1, T2, T3, T4, T5, TResult extends T5>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => e is TResult): CurriedTypeGuard5<T1, T2, T3, T4, T5, TResult>
    curry<T1, T2, T3, T4, T5, T6, TResult extends T6>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => f is TResult): CurriedTypeGuard6<T1, T2, T3, T4, T5, T6, TResult>
    curry<T1, T2, TResult>(fn: (a: T1, b: T2) => TResult): CurriedFunction2<T1, T2, TResult>
    curry<T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult): CurriedFunction3<T1, T2, T3, TResult>
    curry<T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult): CurriedFunction4<T1, T2, T3, T4, TResult>
    curry<T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult): CurriedFunction5<T1, T2, T3, T4, T5, TResult>
    curry<T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult): CurriedFunction6<T1, T2, T3, T4, T5, T6, TResult>
    curry(fn: (...a: any[]) => any): (...a: any[]) => any

    dec(n: number): number

    defaultTo<T, U>(a: T, b: U): T | U
    defaultTo<T>(a: T): <U>(b: U) => T | U

    divide(a: number, b: number): number
    divide(a: number): (b: number) => number

    drop<T>(n: number, xs: T[]): T[]
    drop(n: number, xs: string): string
    drop<T>(n: number): {
        (xs: string): string
        (xs: T[]): T[]
    }

    dropLast<T>(n: number, xs: T[]): T[]
    dropLast(n: number, xs: string): string
    dropLast<T>(n: number): {
        (xs: T[]): T[]
        (xs: string): string
    }

    either(pred1: Pred, pred2: Pred): Pred
    either(pred1: Pred): (pred2: Pred) => Pred

    endsWith(x: string, str: string): boolean
    endsWith(x: string) :(str: string) => boolean

    equals<T>(a: T, b: T): boolean
    equals<T>(a: T): (b: T) => boolean

    F(): boolean

    filter<T>(fn: (value: T) => boolean): (list: T[]) => T[]
    filter<T>(fn: (value: T) => boolean, list: T[]): T[]

    find<T>(fn: (a: T) => boolean, list: T[]): T | undefined
    find<T>(fn: (a: T) => boolean): (list: T[]) => T | undefined

    findIndex<T>(fn: (a: T) => boolean, list: T[]): number
    findIndex<T>(fn: (a: T) => boolean): (list: T[]) => number

    flatten<T>(x: T[] | T[][]): T[]

    flip<T, U, TResult>(fn: (arg0: T, arg1: U) => TResult): (arg1: U, arg0: T) => TResult

    forEach<T>(fn: (x: T) => void, list: T[]): T[]
    forEach<T>(fn: (x: T) => void): (list: T[]) => T[]

    has<T>(s: string, obj: T): boolean
    has(s: string): <T>(obj: T) => boolean

    head(list: any[]): any
    head(list: string): string

    identity<T>(a: T): T

    ifElse(fn: Pred|boolean, onTrue: Arity1Fn, onFalse: Arity1Fn): Arity1Fn

    init<T>(list: T[]): T[]
    init(list: string): string

    is(xPrototype: any, x: any): boolean
    is(xPrototype: any): (x: any) => boolean

    isNil(value: any): value is null | undefined

    join(x: string, xs: any[]): string
    join(x: string): (xs: any[]) => string

    last<T>(list: T[]): T
    last(list: string): string

    length(list: any[]): number

    map<T, U>(fn: (x: T) => U, list: T[]): U[]
    map<T, U>(fn: (x: T) => U): (list: T[]) => U[]
    map<T extends object, U extends {[P in keyof T]: U[P]}>(fn: (x: T[keyof T]) => U[keyof T], obj: T): U
    map<T extends object, U extends {[P in keyof T]: U[P]}>(fn: (x: T[keyof T]) => U[keyof T]): (obj: T) => U

    match(regexp: RegExp, str: string): any[]
    match(regexp: RegExp): (str: string) => any[]

    merge<T1, T2>(a: T1, b: T2): T1 & T2
    merge<T1>(a: T1): <T2>(b: T2) => T1 & T2

    modulo(a: number, b: number): number
    modulo(a: number): (b: number) => number

    multiply(a: number, b: number): number
    multiply(a: number): (b: number) => number

    none<T>(fn: (a: T) => boolean, list: T[]): boolean;
    none<T>(fn: (a: T) => boolean): (list: T[]) => boolean;

    not(value: any): boolean

    omit<T>(names: string[]|string, obj: T): T
    omit(names: string[]|string): <T>(obj: T) => T

    once(fn: (...a: any[]) => any): (...a: any[]) => any

    partialCurry(fn: (input: object) => any,input: object): any

    path<T>(path: Path|string, obj: any): T
    path<T>(path: Path|string): (obj: any) => T

    pathOr<T>(d: T, p: Path, obj: any): T | any
    pathOr<T>(d: T, p: Path): (obj: any) => T | any
    pathOr<T>(d: T): CurriedFunction2<Path, any, T | any>

    pick<T, K extends keyof T>(names: Array<K | string>|string, obj: T): Pick<T, K>
    pick(names: string[]|string): <T, U>(obj: T) => U

    pickAll<T, U>(names: string[], obj: T): U;
    pickAll(names: string[]): <T, U>(obj: T) => U;

    pluck<T>(p: string | number, list: any[]): T[]
    pluck(p: string | number): <T>(list: any[]) => T[]

    prepend<T>(el: T, list: T[]): T[]
    prepend<T>(el: T): (list: T[]) => T[]

    prop<T>(p: string, obj: any): T
    prop<T>(p: string): <T>(obj: any) => T

    propEq<T>(name: string, val: T, obj: any): boolean
    propEq<T>(name: string, val: T): (obj: any) => boolean
    propEq(name: string): <T>(val: T, obj: any) => boolean

    range(from: number, to: number): number[]
    range(from: number): (to: number) => number[]

    reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult | Reduced, acc: TResult, list: T[]): TResult
    reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult | Reduced): (acc: TResult, list: T[]) => TResult
    reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult | Reduced, acc: TResult): (list: T[]) => TResult

    reject<T>(fn: (value: T) => boolean): (list: T[]) => T[]
    reject<T>(fn: (value: T) => boolean, list: T[]): T[]

    replace(pattern: RegExp | string, replacement: string, str: string): string
    replace(pattern: RegExp | string, replacement: string): (str: string) => string
    replace(pattern: RegExp | string): (replacement: string) => (str: string) => string

    reverse<T>(list: T[]): T[]

    sort<T>(fn: (a: T, b: T) => number, list: T[]): T[]
    sort<T>(fn: (a: T, b: T) => number): (list: T[]) => T[]

    sortBy<T>(fn: (a: T) => Ord, list: T[]): T[]
    sortBy(fn: (a: any) => Ord): <T>(list: T[]) => T[]

    split(sep: string | RegExp): (str: string) => string[]
    split(sep: string | RegExp, str: string): string[]

    splitEvery<T>(a: number, list: T[]): T[][]
    splitEvery(a: number): <T>(list: T[]) => T[][]

    startsWith(x: string, str: string): boolean
    startsWith(x: string) :(str: string) => boolean

    subtract(a: number, b: number): number
    subtract(a: number): (b: number) => number

    tail(list: any[]): any
    tail(list: string): string

    take<T>(n: number, xs: T[]): T[]
    take(n: number, xs: string): string
    take<T>(n: number): {
        (xs: string): string
        (xs: T[]): T[]
    }

    takeLast<T>(n: number, xs: T[]): T[]
    takeLast(n: number, xs: string): string
    takeLast(n: number): {
        <T>(xs: T[]): T[]
        (xs: string): string
    }

    tap<T>(fn: (a: T) => any, value: T): T
    tap<T>(fn: (a: T) => any): (value: T) => T

    test(regexp: RegExp, str: string): boolean
    test(regexp: RegExp): (str: string) => boolean

    times<T>(fn: (i: number) => T, n: number): T[]
    times<T>(fn: (i: number) => T): (n: number) => T[]

    toLower(str: string): string

    toString<T>(val: T): string

    toUpper(str: string): string

    trim(str: string): string

    type(val: any): RambdaTypes

    typedDefaultTo<T>(defaultValue: T, x: any): T
    typedDefaultTo<T>(defaultValue: T): (x: any) => T

    typedPathOr<T>(d: T, p: Path|string, obj: any): T
    typedPathOr<T>(d: T, p: Path|string): (obj: any) => T
    typedPathOr<T>(d: T): CurriedFunction2<Path|string, any, T>

    uniq<T>(list: T[]): T[]

    update<T>(index: number, value: T, list: T[]): T[]
    update<T>(index: number, value: T): (list: T[]) => T[]

    values<T extends object, K extends keyof T>(obj: T): Array<T[K]>

    without<T>(list1: T[], list2: T[]): T[]
    without<T>(list1: T[]): (list2: T[]) => T[]
  }
}

declare let Rambdax: R.X

export = Rambdax
export as namespace R
