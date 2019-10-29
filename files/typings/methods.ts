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

    change<Input, Output>(
      origin: Input, 
      path: string, 
      changeData: any
    ): Output

    compact<T>(x: any[]): T[]

    composeAsync<T>(
      ...fns: Array<Async<T> | Function>
    ): (input: any) => Promise<T>

    composed<T>(...fnList: any[]): T

    count<T>(target: T, list: any[]): number
    count<T>(target: T) : (list: any[]) => number
    
    debounce<T>(fn: T, ms: number): ReplaceReturnType<T, void>

    defaultToStrict<T>(
      fallback: T, 
      ...inputs: Array<T>
    ): T

    delay(ms: Number): Promise<'RAMBDAX_DELAY'>

    DELAY: 'RAMBDAX_DELAY'

    findInObject(fn: Function, obj: object): object  
    findInObject(fn: Function) : (obj: object) => object  

    glue(input: string, glueString?: string): string

    getter<T>(keyOrKeys: string|string[]|undefined): T
    setter(keyOrObject: string|object, value?: any): void
    reset(): void
    
    headObject<T>(input: object) :HeadObject<T>   
    
    hasPath<T>(
      path: string|string[], 
      input: object
    ): boolean  
    hasPath<T>(
      path: string|string[]
    ) : (input: object) => boolean

    ifElseAsync<T>(
      condition: Async<any> | Function,
      ifFn: Async<any> | Function,
      elseFn: Async<any> | Function
    ): Async<T>

    inject(
      toInjectAfterMarker: string, 
      marker: string, 
      input: string,
      beforeFlag?: boolean
    ): string

    includesType(
      targetType: RambdaTypes, 
    ): (list: any[]) => boolean
    includesType(
      targetType: RambdaTypes, 
      list: any[]
    ): boolean

    isArray(input: any): boolean
    isFalsy(input: any): boolean
    isObject(input: any): boolean
    isString(input: any): boolean
    isType(targetType: RambdaTypes, input: any): boolean

    isPromise(
      maybePromiseOrAsync: any
    ): boolean

    isFunction(
      maybePromiseFunctionOrAsync: any
    ): boolean

    maybe<T>(ifRule: any, whenIf: any, whenElse: any, maybeInput?: any): T

    mapAsync<T>(fn: AsyncWithMap<any>, list: any[]): Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithProp<any>, obj: object): Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithMap<any>): (list: any[]) => Promise<Array<T>>
    mapAsync<T>(fn: AsyncWithProp<any>): (obj: object) => Promise<Array<T>>

    mapFastAsync<T>(fn: AsyncWithMap<any>, list: any[]): Promise<Array<T>>
    mapFastAsync<T>(fn: AsyncWithMap<any>): (list: any[]) => Promise<Array<T>>

    mapToObject<T, U>(fn: (input: T) => object, list: T[]): U  
    mapToObject<T, U>(fn: (input: T) => object): (list: T[]) => U  

    memoize<T>(fn: Function | Async<any>): T

    mergeRight(x: object, y: object): object
    mergeRight(x: object): (y: object) => object
    
    mergeAll(input: object[]): object
    mergeDeep<T>(slave: object, master: object): T

    nextIndex(index: number, list: any[]): number
    nextIndex(index: number, list: number): number
    prevIndex(index: number, list: any[]): number
    prevIndex(index: number, list: number): number

    opposite<Out>(fn: Fn<any, Out>): Fn<any, Out>
    
    ok(...inputs: any[]): (...rules: any[]) => true | never 
    pass(...inputs: any[]): (...rules: any[]) => boolean 
    isValid(x: IsValid): boolean 
    isAttach() : boolean

    once(fn: Function): Function

    otherwise<T>(fallback: Function, toResolve: Promise<any>): Promise<T>
    otherwise<T>(fallback: Function) : (toResolve: Promise<any>) => Promise<T>
    
    // It was originally R.then, but changed due to Ramda export issue 
    // ============================================
    resolve<T>(afterResolve: Function, toResolve: Promise<any>): Promise<T>
    resolve<T>(toResolve: Function) : (toResolve: Promise<any>) => Promise<T>

    partition<T>(
      rule: PartitionPredicate<T>,
      input: {[key: string]: T}
    ): [Object, Object]
    partition<T>(
      rule: PartitionPredicate<T>
    ): (input: {[key: string]: T}) => [Object, Object]
    
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

    throttle<T>(fn: T, ms: number): ReplaceReturnType<T, void>
    
    toDecimal(num: number, charsAfterDecimalPoint?: number): number    
    
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
    ): (input?: any) => Promise<boolean>

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

    uuid(length?: number) :string  

    whereEq(rule: Object, input: any): Boolean  
    whereEq(rule: Object) : (input: any) => Boolean  

    whenAsync<T>(
      rule: Async<boolean> | Func<boolean> | boolean,
      ruleTrueFn: Async<any> | Function
    ): Async<T>