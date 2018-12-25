declare namespace R {
  // RAMBDA_START
  type RambdaTypes =
    | "Async"
    | "Promise"
    | "Object"
    | "Boolean"
    | "Undefined"
    | "String"
    | "Null"
    | "Array"
    | "RegExp"
    | "Function"

  type Func<T> = (input: any) => T  
  type Pred<T> = (input: T) => boolean
  type Predicate<T> = (input: T, index: number) => boolean
  type Fn<In, Out> = (x: In) => Out
  type FnTwo<In, Out> = (x: In, y: In) => Out
  type MapFn<In, Out> = (x: In, index: number) => Out  

  type FilterFunction<T> = (x: T, prop?: string) => boolean
  type MapFunction<In, Out> = (x: In, prop?: string) => Out
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

  interface MapInterface<T> {
    (list: T[]): T[]
    (obj: Dictionary<T>): Dictionary<T>
  }

  type IdentityFunction<T> = (x: T) => T

  interface Filter<T> {
    (list: T[]): T[]
    (obj: Dictionary<T>): Dictionary<T>
  }

  interface Dictionary<T> {
    [index: string]: T
  }
  // RAMBDA_END
  // RAMBDAX_START
  type ArgumentTypes<T> = T extends (... args: infer U ) => infer R ? U: never;
  type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

  type isfn<T> = (x: any, y: any) => T

  interface Switchem<T> {
    is: isfn<Switchem<T>>
    default: IdentityFunction<T>
  }
  // RAMBDAX_END
  // RAMDA_START
  type Ord = number | string | boolean

  type Path = Array<number | string>

  interface KeyValuePair<K, V> extends Array<K | V> {
    0: K
    1: V
  }

  type Arity1Fn = (a: any) => any

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

  interface ObjectWithPromises {
    [key: string]: Promise<any>
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

  type Async<T> = (x: any) => Promise<T>
  type AsyncWithProp<T> = (x: any, prop?: string) => Promise<T>

  interface TypedObject<T> {
    [key: string]: T
  }
  // RAMDA_END
  interface X {
    // RAMBDAX_START
    allFalse(...input: Array<any>): boolean
    anyFalse(...input: Array<any>): boolean

    allTrue(...input: Array<any>): boolean
    anyTrue(...input: Array<any>): boolean

    allType(targetType: RambdaTypes): (...input: Array<any>) => boolean
    anyType(targetType: RambdaTypes): (...input: Array<any>) => boolean

    change(
      origin: object, 
      path: string, 
      changeData: any
    ): object

    composeAsync<T>(
      ...fns: Array<Async<T> | Function>
    ): (input: any) => Promise<T>

    composed<T>(...fnList: any[]): T

    count<T>(target: T, list: any[]): number
    count<T>(target: T) : (list: any[]) => number
    
    debounce<T>(fn: T, ms: number): ReplaceReturnType<T, void>

    defaultWhen<T>(
      fn: (x: T) => boolean, 
      fallback: T, 
      input: any
    ): T  

    delay(ms: Number): Promise<'RAMBDAX_DELAY'>

    DELAY: 'RAMBDAX_DELAY'

    findInObject(fn: Function, obj: object): object  
    findInObject(fn: Function) : (obj: object) => object  

    flatMap<T>(fn: Function, input: any[]): T[]
    flatMap<T>(fn: Function) : (input: any[]) => T[]  

    glue(input: string, glueString?: string): string

    getter<T>(keyOrKeys: string|string[]|undefined): T
    setter(keyOrObject: string|object, value?: any): void
    reset(): void
    
    ifElseAsync<T>(
      condition: Async<any> | Function,
      ifFn: Async<any> | Function,
      elseFn: Async<any> | Function
    ): Async<T>

    inject(
      toInjectAfterMarker: string, 
      marker: string, 
      input: string
    ): string

    isAttach() : boolean
    pass(...inputs: any[]): (...rules: any[]) => boolean

    includesAny(
      targets:any[], 
      stringOrList: string|any[]
    ): boolean
    includesAny(
      targets:any[]
    ): (stringOrList: string|any[]) => boolean

    includesType(
      targetType: RambdaTypes, 
    ): (list: any[]) => boolean
    includesType(
      targetType: RambdaTypes, 
      list: any[]
    ): boolean

    isType(targetType: RambdaTypes, input: any): boolean
    isArray(input: any): boolean
    isString(input: any): boolean
    isObject(input: any): boolean

    isPromise(
      maybePromiseOrAsync: any
    ): boolean

    isFunction(
      maybePromiseFunctionOrAsync: any
    ): boolean

    mapAsync<T>(fn: Async<any>, list: any[]): Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithProp<any>, obj: object): Promise<Array<T>>
    mapAsync<T>(fn: Async<any>): (list: any[]) => Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithProp<any>): (obj: object) => Promise<Array<T>>

    mapFastAsync<T>(fn: Async<any>, list: any[]): Promise<Array<T>>
    mapFastAsync<T>(fn: Async<any>): (list: any[]) => Promise<Array<T>>

    memoize<T>(fn: Function | Async<any>): T

    mergeRight(x: object, y: object): object
    mergeRight(x: object): (y: object) => object
    
    mergeAll(input: object[]): object

    neg<Out>(fn: Fn<any, Out>): Fn<any, Out>

    ok(...inputs: any[]): (...rules: any[]) => true | never 

    once(fn: Function): Function

    otherwise(fallback: Function, toResolve: Promise): Promise
    otherwise(fallback: Function) : (toResolve: Promise) => Promise
    
    then(fallback: Function, toResolve: Promise): Promise
    then(fallback: Function) : (toResolve: Promise) => Promise

    partition<T>(
      rule: FilterFunction<T>,
      input: Object
    ): [Object, Object]
    partition<T>(
      rule: FilterFunction<T>
    ): (input: Object) => [Object, Object]
    
    partition<T>(
      rule: Predicate<T>,
      input: Array<T>
    ): [Array<T>, Array<T>]
    partition<T>(
      rule: Predicate<T>
    ): (input: Array<T>) => [Array<T>, Array<T>]

    pathEq(path:string|string[], target: any, obj: object): boolean
    pathEq(path:string|string[], target: any): (obj: object) => boolean

    piped<T>(input: any, ...fnList: Function[]): T

    pipedAsync<T>(
      input: any, 
      ...fns: Array< Function | Async<any> >
    ): Promise<T>  

    produce<T>(
      conditions: any,
      input: any
    ): T
    produce<T>(
      conditions: any,
    ): (input: any) => T

    promiseAllObject<T>(
      input: ObjectWithPromises
    ): Promise<T>

    random(minInclusive: number, maxInclusive: number): number

    remove(
      inputs: string|RegExp|Array<string|RegExp>,
      text: string
    ): string

    remove(
      inputs: string|RegExp|Array<string|RegExp>
    ): (text: string) => string

    renameProps(fromKeyToProp: object, input: object): object
    renameProps(fromKeyToProp: object): (input: object) => object

    s(): boolean

    shuffle<T>(arr: T[]): T[]

    switcher<T>(valueToMatch: any): Switchem<T>

    tapAsync<T>(fn: Function | Promise<any>, input: T): T
    tapAsync<T>(fn: Function | Promise<any>): (input: T) => T

    then<Out>(
      createResultFn: Fn<any, Out>
    ): (createInputFn: Promise<any>) => Promise<Out>
    then<Out>(createResultFn: Fn<any, Out>, createInputFn: Promise<any>): Promise<Out>

    throttle<T>(fn: T, ms: number): ReplaceReturnType<T, void>;    
    
    template(inputWithTags: string, templateArguments: object): string
    template(inputWithTags: string): (templateArguments: object) => string

    tryCatch<T>(
      fn:  any, 
      fallback: any
    ): Async<T> | T
    
    where(conditions: object, input: object): boolean

    wait<T>(fn: Async<T>): Promise<[T, Error]>

    waitFor(
      waitForTrueCondition: Function|Promise<any>, 
      msHowLong: number
    ): (input: any) => Promise<boolean>

    when<T>(
      rule: Func<boolean> | boolean, ruleTrue: any
    ): IdentityFunction<T>
    when<T>(
      rule: Func<boolean> | boolean
    ): (ruleTrue: any) => IdentityFunction<T>
    
    unless<T>(
      rule: Func<boolean> | boolean, ruleFalse: any
    ): IdentityFunction<T>
    unless<T>(
      ruleFalse: Func<boolean> | boolean
    ): (ruleTrue: any) => IdentityFunction<T>

    whereEq(rule: Object, input: any): Boolean  
    whereEq(rule: Object) : (input: any) => Boolean  

    whenAsync<T>(
      rule: Async<boolean> | Func<boolean> | boolean,
      ruleTrueFn: Async<any> | Function
    ): Async<T>
    // RAMBDAX_END
    // RAMBDA_MARKER
  }
}

declare let Rambdax: R.X

export = Rambdax
