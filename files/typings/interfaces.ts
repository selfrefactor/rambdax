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

interface IsValid {
  input: object
  schema: Schema
}

type Async<T> = (x: any) => Promise<T>
type AsyncWithMap<T> = (x: any, i?: number) => Promise<T>
type AsyncWithProp<T> = (x: any, prop?: string) => Promise<T>
