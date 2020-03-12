type Func<T> = (input: any) => T  
type Predicatex<T> = (input: T, index: number) => boolean
type Fn<In, Out> = (x: In) => Out
type FnTwo<In, Out> = (x: In, y: In) => Out
type MapFn<In, Out> = (x: In, index: number) => Out  
  
type FilterFunction<T> = (x: T, prop?: string, inputObj?: object) => boolean
type PartitionPredicate<T> = (x: T, prop?: string) => boolean
type MapFunction<In, Out> = (x: In, prop?: string, inputObj?: object) => Out
type SortObjectPredicate<T> = (aProp:string,bProp:string, aValue?:T, bValue?:T) => number

interface MapInterface<T> {
  (list: T[]): T[]
  (obj: Dictionary<T>): Dictionary<T>
}

interface HeadObject<T>{
  prop: string
  value: T
}

type IdentityFunction<T> = (x: T) => T

interface Filter<T> {
  (list: T[]): T[]
  (obj: Dictionary<T>): Dictionary<T>
}

type ArgumentTypes<T> = T extends (... args: infer U ) => infer R ? U: never;

type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

type isfn<T> = (x: any, y: any) => T

interface Switchem<T> {
  is: isfn<Switchem<T>>
  default: IdentityFunction<T>
}
interface HeadObject<T>{
  prop: string
  value: T
}
interface Reduced {
  [index: number]: any
  [index: string]: any
}

interface ObjectWithPromises {
  [key: string]: Promise<any>
}

interface Schema {
  [key: string]: any
}
interface SchemaAsync {
  [key: string]: Promise<boolean>
}

interface IsValid {
  input: object
  schema: Schema
}

interface IsValidAsync {
  input: object
  schema: Schema | SchemaAsync 
}

type Async<T> = (x: any) => Promise<T>
type AsyncWithMap<T> = (x: any, i?: number) => Promise<T>
type AsyncWithProp<T> = (x: any, prop?: string) => Promise<T>

export function allFalse(...input: Array<any>): boolean
export function anyFalse(...input: Array<any>): boolean

export function allTrue(...input: Array<any>): boolean
export function anyTrue(...input: Array<any>): boolean

export function allType(targetType: RambdaTypes): (...input: Array<any>) => boolean
export function anyType(targetType: RambdaTypes): (...input: Array<any>) => boolean

export function change<T>(
  origin: object, 
  path: string, 
  changeData: any
): T

export function change<Input, Output>(
  origin: Input, 
  path: string, 
  changeData: any
): Output

export function compact<T>(x: any[]): T[]

export function composeAsync<Out>(
  ...fns: Array<Async<any> | Func<any>>
): (input: any) => Promise<Out>
export function pipeAsync<Out>(
  ...fns: Array<Async<any> | Func<any>>
): (input: any) => Promise<Out>

  //  export function composed<T>(...fnList: any[]): T

export function count<T>(target: T, list: any[]): number
export function count<T>(target: T) : (list: any[]) => number
   
export function debounce<T>(fn: T, ms: number): ReplaceReturnType<T, void>

export function defaultToStrict<T>(
  fallback: T, 
  ...inputs: Array<T>
): T

export function  delay(ms: number): Promise<'RAMBDAX_DELAY'>

  //  export const DELAY: 'RAMBDAX_DELAY'

export function glue(input: string, glueString?: string): string

export function getter<T>(keyOrKeys: string|string[]|undefined): T
export function setter(keyOrobject: string|object, value?: any): void
export function reset(): void
   
export function headObject<T>(input: object) :HeadObject<T>   
   
export function hasPath<T>(
  path: string|string[], 
  input: object
): boolean  
export function hasPath<T>(
  path: string|string[]
   ) : (input: object) => boolean

export function ifElseAsync<T>(
  condition: Async<any> | Func<any>,
  ifFn: Async<any> | Func<any>,
  elseFn: Async<any> | Func<any>
): Async<T>


export function includesType(
  targetType: RambdaTypes, 
): (list: any[]) => boolean
export function includesType(
  targetType: RambdaTypes, 
  list: any[]
): boolean

export function isFalsy(input: any): boolean
export function isType(targetType: RambdaTypes, input: any): boolean

export function isPromise(
  maybePromiseOrAsync: any
): boolean

export function isFunction(
  maybePromiseFunctionOrAsync: any
): boolean
   
export function maybe<T>(ifRule: any, whenIf: any, whenElse: any, maybeInput?: any): T


export function filterAsync<T>(fn: (x: T) => Promise<boolean>, list: T[]): Promise<Array<T>>
export function filterAsync<T>(fn: (x: T) => Promise<boolean>, obj: object): Promise<{
  [prop: string]: T
}>

export function mapAsync<T>(fn: AsyncWithMap<any>, list: any[]): Promise<Array<T>>
export function mapAsync<T>(fn: AsyncWithProp<any>, obj: object): Promise<Array<T>>
export function mapAsync<T>(fn: AsyncWithMap<any>): (list: any[]) => Promise<Array<T>>
export function mapAsync<T>(fn: AsyncWithProp<any>): (obj: object) => Promise<Array<T>>

export function mapFastAsync<T>(fn: AsyncWithMap<any>, list: any[]): Promise<Array<T>>
export function mapFastAsync<T>(fn: AsyncWithProp<any>, obj: object): Promise<Array<T>>
export function mapFastAsync<T>(fn: AsyncWithMap<any>): (list: any[]) => Promise<Array<T>>
export function mapFastAsync<T>(fn: AsyncWithProp<any>): (obj: object) => Promise<Array<T>>

export function mapAsyncLimit<T, U>(iterable: (x: T) => Promise<U>, limit: number, list: Array<T>): Promise<Array<U>>
export function mapAsyncLimit<T, U>(iterable: (x: T) => Promise<U>, limit: number) : ( list: Array<T>) => Promise<Array<U>>

export function mapToObject<T, U>(fn: (input: T) => object, list: T[]): U  
export function mapToObject<T, U>(fn: (input: T) => object): (list: T[]) => U  

export function memoize<T>(fn: Func<any> | Async<any>): T

export function mergeRight(x: object, y: object): object
export function mergeRight(x: object): (y: object) => object
   
export function mergeAll(input: object[]): object
export function mergeDeep<T>(slave: object, master: object): T

export function nextIndex(index: number, list: any[]): number
export function nextIndex(index: number, list: number): number
export function prevIndex(index: number, list: any[]): number
export function prevIndex(index: number, list: number): number

export function ok(...inputs: any[]): (...rules: any[]) => true | never 
export function pass(...inputs: any[]): (...rules: any[]) => boolean 
export function isValid(x: IsValid): boolean 
export function isValidAsync(x: IsValidAsync): Promise<boolean> 

export function once(fn: Func<any>): Func<any>

export function partition<T>(
  rule: PartitionPredicate<T>,
  input: {[key: string]: T}
): [object, object]
export function partition<T>(
  rule: PartitionPredicate<T>
): (input: {[key: string]: T}) => [object, object]
   
export function partition<T>(
  rule: Predicatex<T>,
  input: Array<T>
): [Array<T>, Array<T>]
export function partition<T>(
  rule: Predicatex<T>
): (input: Array<T>) => [Array<T>, Array<T>]

export function pathEq(path:string|string[], target: any, obj: object): boolean
export function pathEq(path:string|string[], target: any): (obj: object) => boolean

export function piped<T>(input: any, ...fnList: Array<Func<any>>): T

export function pipedAsync<T>(
  input: any, 
  ...fns: Array< Func<any> | Async<any> >
): Promise<T>  

export function produce<T>(
  conditions: any,
  input: any
): T
export function produce<T>(
  conditions: any,
): (input: any) => T

export function promiseAllObject<T>(
  input: ObjectWithPromises
): Promise<T>

export function random(minInclusive: number, maxInclusive: number): number

export function remove(
  inputs: string|RegExp|Array<string|RegExp>,
  text: string
): string

export function remove(
  inputs: string|RegExp|Array<string|RegExp>
): (text: string) => string

export function renameProps(fromKeyToProp: object, input: object): object
export function renameProps(fromKeyToProp: object): (input: object) => object

export function s(): boolean

export function shuffle<T>(arr: T[]): T[]
   
export function sortObject<T>(predicate: SortObjectPredicate<T>, obj: { [key: string]: T}): { [keyOutput: string]: T}
export function sortObject<T>(predicate: SortObjectPredicate<T>): (obj : { [key: string] : T }) => { [keyOutput: string] : T }

export function switcher<T>(valueToMatch: any): Switchem<T>

export function tapAsync<T>(fn: Func<any> | Promise<any>, input: T): T
export function tapAsync<T>(fn: Func<any> | Promise<any>): (input: T) => T

export function throttle<T>(fn: T, ms: number): ReplaceReturnType<T, void>
   
export function toDecimal(num: number, charsAfterDecimalPoint?: number): number    
   
export function template(inputWithTags: string, templateArguments: object): string
export function template(inputWithTags: string): (templateArguments: object) => string

export function tryCatch<T>(
  fn:  any, 
  fallback: any
): Async<T> | T
   
export function where(conditions: object, input: object): boolean

export function wait<T>(fn: Async<T>): Promise<[T, Error]>

export function waitFor(
  waitForTrueCondition: () => any|Promise<any>, 
  msHowLong: number
): (input?: any) => Promise<boolean>

export function when<T>(
  rule: Func<boolean> | boolean, ruleTrue: any
): IdentityFunction<T>
export function when<T>(
  rule: Func<boolean> | boolean
): (ruleTrue: any) => IdentityFunction<T>
   
export function unless<T>(
  rule: Func<boolean> | boolean, ruleFalse: any
): IdentityFunction<T>
export function unless<T>(
  ruleFalse: Func<boolean> | boolean
): (ruleTrue: any) => IdentityFunction<T>

export function randomString(length?: number, stringOnlyFlag?: boolean): string;

export function whereEq(rule: object, input: any): boolean  
export function whereEq(rule: object) : (input: any) => boolean  

