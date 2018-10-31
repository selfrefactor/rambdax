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

  type Pred = (...a: any[]) => boolean

  type Evolver<T> = ((x: T) => T) | { [K in keyof T]?: Evolver<T[K]> }

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

  interface PromiseAllSecureResult {
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
    anyType(targetType: RambdaTypes): (...input: Array<any>) => boolean

    allTrue(...input: Array<any>): boolean
    anyTrue(...input: Array<any>): boolean
    allType(targetType: RambdaTypes): (...input: Array<any>) => boolean

    change(
      origin: object, 
      path: string, 
      changeData: any
    ): object

    compact<T>(x: T[]): T[]

    composeAsync(
      ...fns: Array<Promise<any> | Function>
    ): (input: any) => Promise<any>

    composed<T>(...fnList: any[]): T
    debounce<T>(fn: T, ms: number): ReplaceReturnType<T, void>;

    defaultWhen<T>(
      fn: (x: T) => boolean, 
      fallback: T, 
      input: any
    ): T  

    delay(ms: Number): Promise<string>

    DELAY: string

    evolve<V>(transformations: Evolver<V>, obj: V): V
    evolve<V>(transformations: Evolver<V>): <W extends V>(obj: W) => W

    findInObject(fn: Function, obj: object): object  
    findInObject(fn: Function) : (obj: object) => object  

    flatMap<T>(fn: Function, input: any[]): T[]
    flatMap<T>(fn: Function) : (input: any[]) => T[]

    greater(x: number, y: number): boolean
    greater(x: number): (y: number) => boolean

    getter<T>(key: string|string[]|undefined): T
    setter(key: string|object, value?: any): void
    reset(): void
    
    less(x: number, y: number): boolean
    less(x: number): (y: number) => boolean

    ifElseAsync<T>(
      condition: Async<any> | Function,
      ifFn: Async<any> | Function,
      elseFn: Async<any> | Function
    ): Async<T>

    whenAsync<T>(
      condition: Async<any> | Function | boolean,
      whenFn: Async<any> | Function
    ): Async<T>

    inject(injection: string, marker: string, str: string): string

    intersection<T>(list1: T[], list2: T[]): T[]
    intersection<T>(list1: T[]): (list2: T[]) => T[]

    isAttach() : boolean
    pass(...inputs: any[]): (...rules: any[]) => boolean

    isType(xType: RambdaTypes, x: any): boolean
    isArray(x: any): boolean
    isString(x: any): boolean
    isObject(x: any): boolean
    isPromise(x: any): boolean
    isFunction(x: any): boolean

    mapAsync<T>(fn: Async<any>, x: any[]): Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithProp<any>, x: object): Promise<Array<T>>
    mapAsync<T>(fn: Async<any>): (x: any[]) => Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithProp<any>): (x: object) => Promise<Array<T>>

    mapFastAsync<T>(fn: Async<any>, x: any[]): Promise<Array<T>>
    mapFastAsync<T>(fn: Async<any>): (x: any[]) => Promise<Array<T>>

    memoize<T>(fn: Function | Async<any>): T

    mergeRight(x: object, y: object): object
    mergeRight(x: object): (y: object) => object
    
    mergeAll(input: object[]): object

    multiline(input: string, glue?: string): string

    ok(...inputs: any[]): (...rules: any[]) => true | never 

    omitBy<T,OT>(fn: Function, input: T): OT

    once(fn: Function): Function

    pickBy(fn: Function, input: object): object
    pickBy(fn: Function): (input: object) => object

    piped<T>(input: any, ...fnList: Function[]): T

    produce<Out>(
      conditions: any,
      input: any
    ): Out

    produce<Out>(
      conditions: any,
    ): (input: any) => Out
    
    promiseAllObject(
      input: ObjectWithPromises
    ): Promise<object>

    promiseAllSecure(
      input: Array<Promise<any>>
    ): Array<PromiseAllSecureResult>  

    random(min: number, max: number): number

    rangeBy(start: number, end: number, step: number): number[]
     
    
    remove(
      inputs: string|RegExp|Array<string|RegExp>,
      text: string
    ): string

    remove(
      inputs: string|RegExp|Array<string|RegExp>
    ): (text: string) => string

    renameProps(rules: object, input: object): object
    renameProps(rules: object): (input: object) => object

    s(): boolean

    shuffle<T>(arr: T[]): T[]

    switcher<T>(valueToMatch: any): Switchem<T>

    tapAsync<T>(fn: Function | Promise<any>, input: T): T
    tapAsync<T>(fn: Function | Promise<any>): (input: T) => T

    throttle<T>(fn: T, ms: number): ReplaceReturnType<T, void>;    

    template(input: string, templateInput: object): string

    tryCatch<T>(
      fn:  any, 
      fallback: any
    ): Async<T> | T
    
    where(conditions: object, input: object): boolean

    when<T>(rule: Function | boolean, fn: Function): IdentityFunction<T>
    when<T>(rule: Function | boolean): (fn: Function) => IdentityFunction<T>
    // RAMBDAX_END
    // RAMBDA_MARKER
  }
}

declare let Rambdax: R.X

export = Rambdax
