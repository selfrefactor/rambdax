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

    composeAsync<Out>(
      ...fns: Array<Async<any> | Func<any>>
    ): (input: any) => Promise<Out>

    composed<T>(...fnList: any[]): T

    count<T>(target: T, list: any[]): number
    count<T>(target: T) : (list: any[]) => number
    
    debounce<T>(fn: T, ms: number): ReplaceReturnType<T, void>

    defaultToStrict<T>(
      fallback: T, 
      ...inputs: Array<T>
    ): T

    delay(ms: number): Promise<'RAMBDAX_DELAY'>

    DELAY: 'RAMBDAX_DELAY'

    glue(input: string, glueString?: string): string

    getter<T>(keyOrKeys: string|string[]|undefined): T
    setter(keyOrobject: string|object, value?: any): void
    reset(): void
    
    headobject<T>(input: object) :Headobject<T>   
    
    hasPath<T>(
      path: string|string[], 
      input: object
    ): boolean  
    hasPath<T>(
      path: string|string[]
    ) : (input: object) => boolean

    ifElseAsync<T>(
      condition: Async<any> | Func<any>,
      ifFn: Async<any> | Func<any>,
      elseFn: Async<any> | Func<any>
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
    isobject(input: any): boolean
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

    mapToobject<T, U>(fn: (input: T) => object, list: T[]): U  
    mapToobject<T, U>(fn: (input: T) => object): (list: T[]) => U  

    memoize<T>(fn: Func<any> | Async<any>): T

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

    once(fn: Func<any>): Func<any>

    otherwise<T>(fallback: Func<any>, toResolve: Promise<any>): Promise<T>
    otherwise<T>(fallback: Func<any>) : (toResolve: Promise<any>) => Promise<T>
    
    // It was originally R.then, but changed due to Ramda export issue 
    // ============================================
    resolve<T>(afterResolve: Func<any>, toResolve: Promise<any>): Promise<T>
    resolve<T>(toResolve: Func<any>) : (toResolve: Promise<any>) => Promise<T>

    partition<T>(
      rule: PartitionPredicate<T>,
      input: {[key: string]: T}
    ): [object, object]
    partition<T>(
      rule: PartitionPredicate<T>
    ): (input: {[key: string]: T}) => [object, object]
    
    partition<T>(
      rule: Predicate<T>,
      input: Array<T>
    ): [Array<T>, Array<T>]
    partition<T>(
      rule: Predicate<T>
    ): (input: Array<T>) => [Array<T>, Array<T>]

    pathEq(path:string|string[], target: any, obj: object): boolean
    pathEq(path:string|string[], target: any): (obj: object) => boolean

    piped<T>(input: any, ...fnList: Array<Func<any>>): T

    pipedAsync<T>(
      input: any, 
      ...fns: Array< Func<any> | Async<any> >
    ): Promise<T>  

    produce<T>(
      conditions: any,
      input: any
    ): T
    produce<T>(
      conditions: any,
    ): (input: any) => T

    promiseAllobject<T>(
      input: objectWithPromises
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

    tapAsync<T>(fn: Func<any> | Promise<any>, input: T): T
    tapAsync<T>(fn: Func<any> | Promise<any>): (input: T) => T

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
      waitForTrueCondition: () => any|Promise<any>, 
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

    whereEq(rule: object, input: any): boolean  
    whereEq(rule: object) : (input: any) => boolean  

    whenAsync<T>(
      rule: Async<boolean> | Func<boolean> | boolean,
      ruleTrueFn: Async<T> | Func<T>
    ): Async<T>;