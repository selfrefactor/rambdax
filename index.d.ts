export type RambdaTypes = "Object" | "Number" | "Boolean" | "String" | "Null" | "Array" | "RegExp" | "NaN" | "Function" | "Undefined" | "Async" | "Promise" | "Symbol" | "Set" | "Error";

export type IndexedIterator<T, U> = (x: T, i: number) => U;
export type Iterator<T, U> = (x: T) => U;
export type ObjectIterator<T, U> = (x: T, prop: string, inputObj: Dictionary<T>) => U;
type Ord = number | string | boolean | Date;
type Path = string | (number | string)[];
type Predicate<T> = (x: T) => boolean;
export type IndexedPredicate<T> = (x: T, i: number) => boolean;
export type ObjectPredicate<T> = (x: T, prop: string, inputObj: Dictionary<T>) => boolean;
export type RamdaPath = (number | string)[];
type CondPair<T extends any[], R> = [(...val: T) => boolean, (...val: T) => R]

type ValueOfRecord<R> =
  R extends Record<any, infer T>
  ? T
  : never;

interface KeyValuePair<K, V> extends Array<K | V> {
  0: K;
  1: V;
}

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ...0[]]

type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${"" extends P ? "" : "."}${P}`
    : never : never;

// Prev, Join, and Paths are based on discussion in SO: https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: K extends string | number ?
    `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
    : never
  }[keyof T] : ""

export interface Lens {
  <T, U>(obj: T): U;
  set<T, U>(str: string, obj: T): U;
}

type Arity1Fn = (x: any) => any;
type Arity2Fn = (x: any, y: any) => any;

type Pred = (...x: any[]) => boolean;
type SafePred<T> = (...x: T[]) => boolean;

export interface Dictionary<T> {[index: string]: T}
type Partial<T> = { [P in keyof T]?: T[P]};

type Evolvable<E extends Evolver> = {   [P in keyof E]?: Evolved<E[P]>;
};

type Evolver<T extends Evolvable<any> = any> = {   [key in keyof Partial<T>]: ((value: T[key]) => T[key]) | (T[key] extends Evolvable<any> ? Evolver<T[key]> : never);
};

type Evolve<O extends Evolvable<E>, E extends Evolver> = {   [P in keyof O]: P extends keyof E
                  ? EvolveValue<O[P], E[P]>
                  : O[P];
};

type Evolved<A> =
    A extends (value: infer V) => any
    ? V
    : A extends Evolver
      ? Evolvable<A>
      : never;

type EvolveNestedValue<O, E extends Evolver> =
    O extends object
    ? O extends Evolvable<E>
      ? Evolve<O, E>
      : never
    : never;

type EvolveValue<V, E> =
    E extends (value: V) => any
    ? ReturnType<E>
    : E extends Evolver
      ? EvolveNestedValue<V, E>
      : never;

interface AssocPartialOne<K extends keyof any> {
  <T>(val: T): <U>(obj: U) => Record<K, T> & U;
  <T, U>(val: T, obj: U): Record<K, T> & U;
}

// RAMBDAX INTERFACES
// ============================================
type Func<T> = (input: any) => T;
type VoidInputFunc<T> = () => T;
type Fn<In, Out> = (x: In) => Out;
type SortObjectPredicate<T> = (aProp: string, bProp: string, aValue: T, bValue: T) => number;

type IdentityFunction<T> = (x: T) => T;

interface Filter<T> {
  (list: T[]): T[];
  (obj: Dictionary<T>): Dictionary<T>;
}

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
type isfn<T> = (x: any, y: any) => T;

interface Switchem<T> {
  is: isfn<Switchem<T>>;
  default: IdentityFunction<T>;
}

interface Schema {
  [key: string]: any;
}

interface SchemaAsync {
  [key: string]: Promise<boolean>;
}

interface IsValid {
  input: object;
  schema: Schema;
}

interface IsValidAsync {
  input: object;
  schema: Schema | SchemaAsync;
}

type ProduceRules<Output,K extends keyof Output, Input> = {   [P in K]: (input: Input) => Output[P];
};
type ProduceAsyncRules<Output,K extends keyof Output, Input> = {   [P in K]: (input: Input) => Promise<Output[P]>;
};
type ProduceAsyncRule<Input> = (input: Input) => Promise<any>;
type Async<T> = (x: any) => Promise<T>;
type AsyncIterable<T, K> = (x: T) => Promise<K>;
type AsyncIterableIndexed<T, K> = (x: T, i: number) => Promise<K>;
type AsyncPredicate<T> = (x: T) => Promise<boolean>;
type AsyncPredicateIndexed<T> = (x: T, i: number) => Promise<boolean>;
type AsyncWithProp<T> = (x: any, prop?: string) => Promise<T>;

type ApplyDiffUpdate<T extends string = string> = {op:'update', path: T, value: any};
type ApplyDiffAdd<T extends string = string> = {op:'add', path: T, value: any};
type ApplyDiffRemove<T extends string = string> = {op:'remove', path: T};
type ApplyDiffRule<T extends string = string> = ApplyDiffUpdate<T> | ApplyDiffAdd<T> | ApplyDiffRemove<T>;


/**
 * It adds `a` and `b`.
 */
export function add(a: number, b: number): number;
export function add(a: number): (b: number) => number;

/**
 * It replaces `index` in array `list` with the result of `replaceFn(list[i])`.
 */
export function adjust<T>(index: number, replaceFn: (x: T) => T, list: T[]): T[];
export function adjust<T>(index: number, replaceFn: (x: T) => T): (list: T[]) => T[];

/**
 * It returns `true`, if all members of array `list` returns `true`, when applied as argument to `predicate` function.
 */
export function all<T>(predicate: (x: T) => boolean, list: T[]): boolean;
export function all<T>(predicate: (x: T) => boolean): (list: T[]) => boolean;

/**
 * It returns `true`, if all functions of `predicates` return `true`, when `input` is their argument.
 */
export function allPass<T>(predicates: ((x: T) => boolean)[]): (input: T) => boolean;

/**
 * It returns function that always returns `x`.
 */
export function always<T>(x: T): (...args: unknown[]) => T;

/**
 * Logical AND
 */
export function and<T, U>(x: T, y: U): T | U;
export function and<T>(x: T): <U>(y: U) => T | U;

/**
 * Logical OR
 */
export function or<T, U>(a: T, b: U): T | U;
export function or<T>(a: T): <U>(b: U) => T | U;

/**
 * It returns `true`, if at least one member of `list` returns true, when passed to a `predicate` function.
 */
export function any<T>(predicate: (x: T) => boolean, list: T[]): boolean;
export function any<T>(predicate: (x: T) => boolean): (list: T[]) => boolean;

/**
 * It accepts list of `predicates` and returns a function. This function with its `input` will return `true`, if any of `predicates` returns `true` for this `input`.
 */
export function anyPass<T>(predicates: SafePred<T>[]): SafePred<T>;

/**
 * It adds element `x` at the end of `list`.
 */
export function append<T>(x: T, list: T[]): T[];
export function append<T>(x: T): <T>(list: T[]) => T[];

export function applySpec<Spec extends Record<string, (...args: any[]) => any>>(
  spec: Spec
): (
  ...args: Parameters<ValueOfRecord<Spec>>
) => { [Key in keyof Spec]: ReturnType<Spec[Key]> };
export function applySpec<T>(spec: any): (...args: any[]) => T;

/**
 * It makes a shallow clone of `obj` with setting or overriding the property `prop` with `newValue`.
 */
export function assoc<T, U, K extends string>(prop: K, val: T, obj: U): Record<K, T> & Omit<U, K>;
export function assoc<T, K extends string>(prop: K, val: T): <U>(obj: U) => Record<K, T> & Omit<U, K>;
export function assoc<K extends string>(prop: K): AssocPartialOne<K>;

/**
 * It makes a shallow clone of `obj` with setting or overriding with `newValue` the property found with `path`.
 */
export function assocPath<Output>(path: Path, newValue: any, obj: object): Output;
export function assocPath<Output>(path: Path, newValue: any): (obj: object) => Output;
export function assocPath<Output>(path: Path): (newValue: any) => (obj: object) => Output;

/**
 * It returns a function with `input` argument.
 * 
 * This function will return `true`, if both `firstCondition` and `secondCondition` return `true` when `input` is passed as their argument.
 */
export function both(pred1: Pred, pred2: Pred): Pred;
export function both<T>(pred1: Predicate<T>, pred2: Predicate<T>): Predicate<T>;
export function both<T>(pred1: Predicate<T>): (pred2: Predicate<T>) => Predicate<T>;
export function both(pred1: Pred): (pred2: Pred) => Pred;

/**
 * The method is also known as `flatMap`.
 */
export function chain<T, U>(fn: (n: T) => U[], list: T[]): U[];
export function chain<T, U>(fn: (n: T) => U[]): (list: T[]) => U[];

/**
 * Restrict a number `input` to be within `min` and `max` limits.
 * 
 * If `input` is bigger than `max`, then the result is `max`.
 * 
 * If `input` is smaller than `min`, then the result is `min`.
 */
export function clamp(min: number, max: number, input: number): number;
export function clamp(min: number, max: number): (input: number) => number;

/**
 * It creates a deep copy of the `input`, which may contain (nested) Arrays and Objects, Numbers, Strings, Booleans and Dates.
 */
export function clone<T>(input: T): T;
export function clone<T>(input: T[]): T[];

/**
 * It returns `inverted` version of `origin` function that accept `input` as argument.
 * 
 * The return value of `inverted` is the negative boolean value of `origin(input)`.
 */
export function complement<T extends any[]>(predicate: (...args: T) => unknown): (...args: T) => boolean;

/**
 * It performs right-to-left function composition.
 */
export function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  ...func: [
      fnLast: (a: any) => TResult,
      ...func: Array<(a: any) => any>,
      f7: (a: R6) => R7,
      f6: (a: R5) => R6,
      f5: (a: R4) => R5,
      f4: (a: R3) => R4,
      f3: (a: R2) => R3,
      f2: (a: R1) => R2,
      f1: (...args: TArgs) => R1
  ]
): (...args: TArgs) => TResult; // fallback overload if number of composed functions greater than 7
export function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R7;
export function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: (a: R6) => R7,
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R7;
export function compose<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f6: (a: R5) => R6,
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R6;
export function compose<TArgs extends any[], R1, R2, R3, R4, R5>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R5;
export function compose<TArgs extends any[], R1, R2, R3, R4>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R4;
export function compose<TArgs extends any[], R1, R2, R3>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R3;
export function compose<TArgs extends any[], R1, R2>(
  f2: (a: R1) => R2,
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R2;
export function compose<TArgs extends any[], R1>(
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R1;

/**
 * It returns a new string or array, which is the result of merging `x` and `y`.
 */
export function concat<T>(x: T[], y: T[]): T[];
export function concat<T>(x: T[]): (y: T[]) => T[];
export function concat(x: string, y: string): string;
export function concat(x: string): (y: string) => string;

/**
 * It takes list with `conditions` and returns a new function `fn` that expects `input` as argument.
 * 
 * This function will start evaluating the `conditions` in order to find the first winner(order of conditions matter).
 * 
 * The winner is this condition, which left side returns `true` when `input` is its argument. Then the evaluation of the right side of the winner will be the final result.
 * 
 * If no winner is found, then `fn` returns `undefined`.
 */
export function cond<T extends any[], R>(conditions: Array<CondPair<T, R>>): (...args: T) => R;

/**
 * Accepts a converging function and a list of branching functions and returns a new function. When invoked, this new function is applied to some arguments, each branching function is applied to those same arguments. The results of each branching function are passed as arguments to the converging function to produce the return value.
 */
export function converge(after: ((...a: any[]) => any), fns: ((...x: any[]) => any)[]): (...y: any[]) => any;

/**
 * It expects a function as input and returns its curried version.
 */
export function curry(fn: (...args: any[]) => any): (...a: any[]) => any;

/**
 * It returns a curried equivalent of the provided function, with the specified arity.
 */
export function curryN(length: number, fn: (...args: any[]) => any): (...a: any[]) => any;

/**
 * It decrements a number.
 */
export function dec(x: number): number;

/**
 * It returns `defaultValue`, if all of `inputArguments` are `undefined`, `null` or `NaN`.
 * 
 * Else, it returns the first truthy `inputArguments` instance(from left to right).
 */
export function defaultTo<T>(defaultValue: T, input: T | null | undefined): T;
export function defaultTo<T>(defaultValue: T): (input: T | null | undefined) => T;

/**
 * It returns the uniq set of all elements in the first list `a` not contained in the second list `b`.
 * 
 * `R.equals` is used to determine equality.
 */
export function difference<T>(a: T[], b: T[]): T[];
export function difference<T>(a: T[]): (b: T[]) => T[];

/**
 * It returns a new object that does not contain property `prop`.
 */
export function dissoc<T extends object, K extends keyof T>(prop: K, obj: T): Omit<T, K>;
export function dissoc<K extends string | number>(prop: K): <T extends object>(obj: T) => Omit<T, K>;

export function divide(x: number, y: number): number;
export function divide(x: number): (y: number) => number;

/**
 * It returns `howMany` items dropped from beginning of list or string `input`.
 */
export function drop<T>(howMany: number, input: T[]): T[];
export function drop(howMany: number, input: string): string;
export function drop<T>(howMany: number): {
  <T>(input: T[]): T[];
  (input: string): string;
};

/**
 * It returns `howMany` items dropped from the end of list or string `input`.
 */
export function dropLast<T>(howMany: number, input: T[]): T[];
export function dropLast(howMany: number, input: string): string;
export function dropLast<T>(howMany: number): {
  <T>(input: T[]): T[];
  (input: string): string;
};

/**
 * It returns a new `predicate` function from `firstPredicate` and `secondPredicate` inputs.
 * 
 * This `predicate` function will return `true`, if any of the two input predicates return `true`.
 */
export function either(firstPredicate: Pred, secondPredicate: Pred): Pred;
export function either<T>(firstPredicate: Predicate<T>, secondPredicate: Predicate<T>): Predicate<T>;
export function either<T>(firstPredicate: Predicate<T>): (secondPredicate: Predicate<T>) => Predicate<T>;
export function either(firstPredicate: Pred): (secondPredicate: Pred) => Pred;

/**
 * When iterable is a string, then it behaves as `String.prototype.endsWith`.
 * When iterable is a list, then it uses R.equals to determine if the target list ends in the same way as the given target.
 */
export function endsWith(target: string, iterable: string): boolean;
export function endsWith(target: string): (iterable: string) => boolean;
export function endsWith<T>(target: T[], list: T[]): boolean;
export function endsWith<T>(target: T[]): (list: T[]) => boolean;

/**
 * It deeply compares `x` and `y` and returns `true` if they are equal.
 */
export function equals<T>(x: T, y: T): boolean;
export function equals<T>(x: T): (y: T) => boolean;

export function F(): boolean;

/**
 * It filters list or object `input` using a `predicate` function.
 */
export function filter<T>(predicate: Predicate<T>): (input: T[]) => T[];
export function filter<T>(predicate: Predicate<T>, input: T[]): T[];
export function filter<T, U>(predicate: ObjectPredicate<T>): (x: Dictionary<T>) => Dictionary<T>;
export function filter<T>(predicate: ObjectPredicate<T>, x: Dictionary<T>): Dictionary<T>;

/**
 * It returns the first element of `list` that satisfy the `predicate`.
 * 
 * If there is no such element, it returns `undefined`.
 */
export function find<T>(predicate: (x: T) => boolean, list: T[]): T | undefined;
export function find<T>(predicate: (x: T) => boolean): (list: T[]) => T | undefined;

/**
 * It returns the index of the first element of `list` satisfying the `predicate` function.
 * 
 * If there is no such element, then `-1` is returned.
 */
export function findIndex<T>(predicate: (x: T) => boolean, list: T[]): number;
export function findIndex<T>(predicate: (x: T) => boolean): (list: T[]) => number;

/**
 * It returns the last element of `list` satisfying the `predicate` function.
 * 
 * If there is no such element, then `undefined` is returned.
 */
export function findLast<T>(fn: (x: T) => boolean, list: T[]): T | undefined;
export function findLast<T>(fn: (x: T) => boolean): (list: T[]) => T | undefined;

/**
 * It returns the index of the last element of `list` satisfying the `predicate` function.
 * 
 * If there is no such element, then `-1` is returned.
 */
export function findLastIndex<T>(predicate: (x: T) => boolean, list: T[]): number;
export function findLastIndex<T>(predicate: (x: T) => boolean): (list: T[]) => number;

/**
 * It deeply flattens an array.
 */
export function flatten<T>(list: any[]): T[];

/**
 * It returns function which calls `fn` with exchanged first and second argument.
 */
export function flip<T, U, TResult>(fn: (arg0: T, arg1: U) => TResult): (arg1: U, arg0?: T) => TResult;

/**
 * It applies `iterable` function over all members of `list` and returns `list`.
 */
export function forEach<T>(fn: Iterator<T, void>, list: T[]): T[];
export function forEach<T>(fn: Iterator<T, void>): (list: T[]) => T[];
export function forEach<T>(fn: ObjectIterator<T, void>, list: Dictionary<T>): Dictionary<T>;
export function forEach<T, U>(fn: ObjectIterator<T, void>): (list: Dictionary<T>) => Dictionary<T>;

/**
 * It transforms a `listOfPairs` to an object.
 */
export function fromPairs<V>(listOfPairs: ([number, V])[]): { [index: number]: V };
export function fromPairs<V>(listOfPairs: ([string, V])[]): { [index: string]: V };

/**
 * It splits `list` according to a provided `groupFn` function and returns an object.
 */
export function groupBy<T>(groupFn: (x: T) => string, list: T[]): { [index: string]: T[] };
export function groupBy<T>(groupFn: (x: T) => string): (list: T[]) => { [index: string]: T[] };
export function groupBy<T, U>(groupFn: (x: T) => string, list: T[]): U;
export function groupBy<T, U>(groupFn: (x: T) => string): (list: T[]) => U;

/**
 * It returns separated version of list or string `input`, where separation is done with equality `compareFn` function.
 */
export function groupWith<T>(compareFn: (x: T, y: T) => boolean): (input: T[]) => (T[])[];
export function groupWith<T>(compareFn: (x: T, y: T) => boolean, input: T[]): (T[])[];
export function groupWith<T>(compareFn: (x: T, y: T) => boolean, input: string): string[];

/**
 * It returns `true` if `obj` has property `prop`.
 */
export function has<T>(prop: string, obj: T): boolean;
export function has(prop: string): <T>(obj: T) => boolean;

/**
 * It will return true, if `input` object has truthy `path`(calculated with `R.path`).
 */
export function hasPath<T>(
  path: string | string[],
  input: object
): boolean;
export function hasPath<T>(
  path: string | string[]
): (input: object) => boolean;

/**
 * It returns the first element of list or string `input`.
 */
export function head(input: string): string;
export function head(emptyList: []): undefined;
export function head<T>(input: T[]): T | undefined;

/**
 * It returns `true` if its arguments `a` and `b` are identical.
 * 
 * Otherwise, it returns `false`.
 */
export function identical<T>(x: T, y: T): boolean;
export function identical<T>(x: T): (y: T) => boolean;

/**
 * It just passes back the supplied `input` argument.
 */
export function identity<T>(input: T): T;

/**
 * It expects `condition`, `onTrue` and `onFalse` functions as inputs and it returns a new function with example name of `fn`.
 * 
 * When `fn`` is called with `input` argument, it will return either `onTrue(input)` or `onFalse(input)` depending on `condition(input)` evaluation.
 */
export function ifElse<TArgs extends any[], TOnTrueResult, TOnFalseResult>(fn: (...args: TArgs) => boolean, onTrue: (...args: TArgs) => TOnTrueResult, onFalse: (...args: TArgs) => TOnFalseResult): (...args: TArgs) => TOnTrueResult | TOnFalseResult;

/**
 * It increments a number.
 */
export function inc(x: number): number;

/**
 * If `input` is string, then this method work as native `String.includes`.
 * 
 * If `input` is array, then `R.equals` is used to define if `valueToFind` belongs to the list.
 */
export function includes(valueToFind: string, input: string[] | string): boolean;
export function includes(valueToFind: string): (input: string[] | string) => boolean;
export function includes<T>(valueToFind: T, input: T[]): boolean;
export function includes<T>(valueToFind: T): (input: T[]) => boolean;

/**
 * It generates object with properties provided by `condition` and values provided by `list` array.
 * 
 * If `condition` is a function, then all list members are passed through it.
 * 
 * If `condition` is a string, then all list members are passed through `R.path(condition)`.
 */
export function indexBy<T, K extends string | number = string>(condition: (key: T) => K, list: T[]): { [key in K]: T };
export function indexBy<T, K extends string | number | undefined = string>(condition: (key: T) => K, list: T[]): { [key in NonNullable<K>]?: T };
export function indexBy<T, K extends string | number = string>(condition: (key: T) => K): (list: T[]) => { [key in K]: T };
export function indexBy<T, K extends string | number | undefined = string>(condition: (key: T) => K | undefined): (list: T[]) => { [key in NonNullable<K>]?: T };
export function indexBy<T>(condition: string, list: T[]): { [key: string]: T };
export function indexBy<T>(condition: string): (list: T[]) => { [key: string]: T };

/**
 * It returns the index of the first element of `list` equals to `valueToFind`.
 * 
 * If there is no such element, it returns `-1`.
 */
export function indexOf<T>(valueToFind: T, list: T[]): number;
export function indexOf<T>(valueToFind: T): (list: T[]) => number;

/**
 * It returns all but the last element of list or string `input`.
 */
export function init<T>(input: T[]): T[];
export function init(input: string): string;

/**
 * It loops throw `listA` and `listB` and returns the intersection of the two according to `R.equals`.
 */
export function intersection<T>(listA: T[], listB: T[]): T[];
export function intersection<T>(listA: T[]): (listB: T[]) => T[];

/**
 * It adds a `separator` between members of `list`.
 */
export function intersperse<T>(separator: T, list: T[]): T[];
export function intersperse<T>(separator: T): (list: T[]) => T[];

/**
 * It returns `true` if `x` is instance of `targetPrototype`.
 */
export function is<C extends () => any>(targetPrototype: C, val: any): val is ReturnType<C>;
export function is<C extends new () => any>(targetPrototype: C, val: any): val is InstanceType<C>;
export function is<C extends () => any>(targetPrototype: C): (val: any) => val is ReturnType<C>;
export function is<C extends new () => any>(targetPrototype: C): (val: any) => val is InstanceType<C>;

/**
 * It returns `true` if `x` is `empty`.
 */
export function isEmpty<T>(x: T): boolean;

/**
 * It returns `true` if `x` is either `null` or `undefined`.
 */
export function isNil(x: any): x is null | undefined;

/**
 * It returns a string of all `list` instances joined with a `glue`.
 */
export function join<T>(glue: string, list: T[]): string;
export function join<T>(glue: string): (list: T[]) => string;

/**
 * It applies `Object.keys` over `x` and returns its keys.
 */
export function keys<T extends object>(x: T): (keyof T)[];
export function keys<T>(x: T): string[];

/**
 * It returns the last element of `input`, as the `input` can be either a string or an array.
 */
export function last(str: string): string;
export function last(emptyList: []): undefined;
export function last<T extends any>(list: T[]): T | undefined;

/**
 * It returns the last index of `target` in `list` array.
 * 
 * `R.equals` is used to determine equality between `target` and members of `list`.
 * 
 * If there is no such index, then `-1` is returned.
 */
export function lastIndexOf<T>(target: T, list: T[]): number;
export function lastIndexOf<T>(target: T): (list: T[]) => number;

/**
 * It returns the `length` property of list or string `input`.
 */
export function length<T>(input: T[]): number;

/**
 * It returns a `lens` for the given `getter` and `setter` functions.
 * 
 * The `getter` **gets** the value of the focus; the `setter` **sets** the value of the focus.
 * 
 * The setter should not mutate the data structure.
 */
export function lens<T, U, V>(getter: (s: T) => U, setter: (a: U, s: T) => V): Lens;

/**
 * It returns a lens that focuses on specified `index`.
 */
export function lensIndex(index: number): Lens;

/**
 * It returns a lens that focuses on specified `path`.
 */
export function lensPath(path: RamdaPath): Lens;
export function lensPath(path: string): Lens;

/**
 * It returns a lens that focuses on specified property `prop`.
 */
export function lensProp(prop: string): {
  <T, U>(obj: T): U;
  set<T, U, V>(val: T, obj: U): V;
};

/**
 * It returns a copied **Object** or **Array** with modified value received by applying function `fn` to `lens` focus.
 */
export function over<T>(lens: Lens, fn: Arity1Fn, value: T): T;
export function over<T>(lens: Lens, fn: Arity1Fn, value: T[]): T[];
export function over(lens: Lens, fn: Arity1Fn): <T>(value: T) => T;
export function over(lens: Lens, fn: Arity1Fn): <T>(value: T[]) => T[];
export function over(lens: Lens): <T>(fn: Arity1Fn, value: T) => T;
export function over(lens: Lens): <T>(fn: Arity1Fn, value: T[]) => T[];

/**
 * It returns a copied **Object** or **Array** with modified `lens` focus set to `replacer` value.
 */
export function set<T, U>(lens: Lens, replacer: U, obj: T): T;
export function set<U>(lens: Lens, replacer: U): <T>(obj: T) => T;
export function set(lens: Lens): <T, U>(replacer: U, obj: T) => T;

/**
 * It returns the value of `lens` focus over `target` object.
 */
export function view<T, U>(lens: Lens): (target: T) => U;
export function view<T, U>(lens: Lens, target: T): U;

/**
 * It returns the result of looping through `iterable` with `fn`.
 * 
 * It works with both array and object.
 */
export function map<T, U>(fn: ObjectIterator<T, U>, iterable: Dictionary<T>): Dictionary<U>;
export function map<T, U>(fn: Iterator<T, U>, iterable: T[]): U[];
export function map<T, U>(fn: Iterator<T, U>): (iterable: T[]) => U[];
export function map<T, U, S>(fn: ObjectIterator<T, U>): (iterable: Dictionary<T>) => Dictionary<U>;
export function map<T>(fn: Iterator<T, T>): (iterable: T[]) => T[];
export function map<T>(fn: Iterator<T, T>, iterable: T[]): T[];

/**
 * It works the same way as `R.map` does for objects. It is added as Ramda also has this method.
 */
export function mapObjIndexed<T>(fn: ObjectIterator<T, T>, iterable: Dictionary<T>): Dictionary<T>;
export function mapObjIndexed<T, U>(fn: ObjectIterator<T, U>, iterable: Dictionary<T>): Dictionary<U>;
export function mapObjIndexed<T>(fn: ObjectIterator<T, T>): (iterable: Dictionary<T>) => Dictionary<T>;
export function mapObjIndexed<T, U>(fn: ObjectIterator<T, U>): (iterable: Dictionary<T>) => Dictionary<U>;

/**
 * Curried version of `String.prototype.match` which returns empty array, when there is no match.
 */
export function match(regExpression: RegExp, str: string): string[];
export function match(regExpression: RegExp): (str: string) => string[];

/**
 * `R.mathMod` behaves like the modulo operator should mathematically, unlike the `%` operator (and by extension, `R.modulo`). So while `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`.
 */
export function mathMod(x: number, y: number): number;
export function mathMod(x: number): (y: number) => number;

/**
 * It returns the greater value between `x` and `y`.
 */
export function max<T extends Ord>(x: T, y: T): T;
export function max<T extends Ord>(x: T): (y: T) => T;

/**
 * It returns the greater value between `x` and `y` according to `compareFn` function.
 */
export function maxBy<T>(compareFn: (input: T) => Ord, x: T, y: T): T;
export function maxBy<T>(compareFn: (input: T) => Ord, x: T): (y: T) => T;
export function maxBy<T>(compareFn: (input: T) => Ord): (x: T) => (y: T) => T;

/**
 * It returns the mean value of `list` input.
 */
export function mean(list: number[]): number;

/**
 * It returns the median value of `list` input.
 */
export function median(list: number[]): number;

/**
 * It creates a copy of `target` object with overidden `newProps` properties.
 */
export function merge<A, B>(target: A, newProps: B): A & B
export function merge<Output>(target: any): (newProps: any) => Output;

/**
 * It merges all objects of `list` array sequentially and returns the result.
 */
export function mergeAll<T>(list: object[]): T;
export function mergeAll(list: object[]): object;

/**
 * Creates a new object with the own properties of the first object merged with the own properties of the second object. If a key exists in both objects:
 * 
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 */
export function mergeDeepRight<Output>(target: object, newProps: object): Output;
export function mergeDeepRight<Output>(target: object): (newProps: object) => Output;

/**
 * Same as `R.merge`, but in opposite direction.
 */
export function mergeLeft<Output>(newProps: object, target: object): Output;
export function mergeLeft<Output>(newProps: object): (target: object) => Output;

/**
 * It returns the lesser value between `x` and `y`.
 */
export function min<T extends Ord>(x: T, y: T): T;
export function min<T extends Ord>(x: T): (y: T) => T;

/**
 * It returns the lesser value between `x` and `y` according to `compareFn` function.
 */
export function minBy<T>(compareFn: (input: T) => Ord, x: T, y: T): T;
export function minBy<T>(compareFn: (input: T) => Ord, x: T): (y: T) => T;
export function minBy<T>(compareFn: (input: T) => Ord): (x: T) => (y: T) => T;

/**
 * Curried version of `x%y`.
 */
export function modulo(x: number, y: number): number;
export function modulo(x: number): (y: number) => number;

/**
 * It returns a copy of `list` with exchanged `fromIndex` and `toIndex` elements.
 */
export function move<T>(fromIndex: number, toIndex: number, list: T[]): T[];
export function move(fromIndex: number, toIndex: number): <T>(list: T[]) => T[];
export function move(fromIndex: number): {
    <T>(toIndex: number, list: T[]): T[];
    (toIndex: number): <T>(list: T[]) => T[];
};

/**
 * Curried version of `x*y`.
 */
export function multiply(x: number, y: number): number;
export function multiply(x: number): (y: number) => number;

export function negate(x: number): number;

/**
 * It returns `true`, if all members of array `list` returns `false`, when applied as argument to `predicate` function.
 */
export function none<T>(predicate: (x: T) => boolean, list: T[]): boolean;
export function none<T>(predicate: (x: T) => boolean): (list: T[]) => boolean;

/**
 * It returns a boolean negated version of `input`.
 */
export function not(input: any): boolean;

/**
 * Curried version of `list[index]`.
 */
export function nth<T>(index: number, list: T[]): T | undefined;	
export function nth(index: number): <T>(list: T[]) => T | undefined;

/**
 * It creates an object with a single key-value pair.
 */
export function objOf<T, K extends string>(key: K, value: T): Record<K, T>;
export function objOf<K extends string>(key: K): <T>(value: T) => Record<K, T>;

/**
 * It returns a function, which invokes only once `fn` function.
 */
export function once<T extends (...args: any[]) => any>(func: T): T;

/**
 * It returns a partial copy of an `obj` without `propsToOmit` properties.
 */
export function omit<T, K extends string>(propsToOmit: K[], obj: T): Omit<T, K>;
export function omit<K extends string>(propsToOmit: K[]): <T>(obj: T) => Omit<T, K>;
export function omit<T, U>(propsToOmit: string, obj: T): U;
export function omit<T, U>(propsToOmit: string): (obj: T) => U;
export function omit<T>(propsToOmit: string, obj: object): T;
export function omit<T>(propsToOmit: string): (obj: object) => T;

export function of<T>(x: T): T[];

/**
 * It is very similar to `R.curry`, but you can pass initial arguments when you create the curried function.
 * 
 * `R.partial` will keep returning a function until all the arguments that the function `fn` expects are passed.
 * The name comes from the fact that you partially inject the inputs.
 */
export function partial<V0, V1, T>(fn: (x0: V0, x1: V1) => T, args: [V0]): (x1: V1) => T;
export function partial<V0, V1, V2, T>(fn: (x0: V0, x1: V1, x2: V2) => T, args: [V0, V1]): (x2: V2) => T;
export function partial<V0, V1, V2, T>(fn: (x0: V0, x1: V1, x2: V2) => T, args: [V0]): (x1: V1, x2: V2) => T;
export function partial<V0, V1, V2, V3, T>(fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T, args: [V0, V1, V2]): (x2: V3) => T;
export function partial<V0, V1, V2, V3, T>(fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T, args: [V0, V1]): (x2: V2, x3: V3) => T;
export function partial<V0, V1, V2, V3, T>(fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T, args: [V0]): (x1: V1, x2: V2, x3: V3) => T;
export function partial<T>(fn: (...a: any[]) => T, args: any[]): (...x: any[]) => T;

/**
 * It will return array of two objects/arrays according to `predicate` function. The first member holds all instances of `input` that pass the `predicate` function, while the second member - those who doesn't.
 */
export function partition<T>(
  predicate: Predicate<T>,
  input: T[]
): [T[], T[]];
export function partition<T>(
  predicate: Predicate<T>
): (input: T[]) => [T[], T[]];
export function partition<T>(
  predicate: (x: T, prop?: string) => boolean,
  input: { [key: string]: T}
): [{ [key: string]: T}, { [key: string]: T}];
export function partition<T>(
  predicate: (x: T, prop?: string) => boolean
): (input: { [key: string]: T}) => [{ [key: string]: T}, { [key: string]: T}];

/**
 * If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.
 * 
 * It will return `undefined`, if such path is not found.
 */
export function path<Input, T>(pathToSearch: Path, obj: Input): T | undefined;
export function path<T>(pathToSearch: Path, obj: any): T | undefined;
export function path<T>(pathToSearch: Path): (obj: any) => T | undefined;
export function path<Input, T>(pathToSearch: Path): (obj: Input) => T | undefined;

/**
 * It returns `true` if `pathToSearch` of `input` object is equal to `target` value.
 * 
 * `pathToSearch` is passed to `R.path`, which means that it can be either a string or an array. Also equality between `target` and the found value is determined by `R.equals`.
 */
export function pathEq(pathToSearch: Path, target: any, input: any): boolean;
export function pathEq(pathToSearch: Path, target: any): (input: any) => boolean;
export function pathEq(pathToSearch: Path): (target: any) => (input: any) => boolean;

/**
 * It loops over members of `pathsToSearch` as `singlePath` and returns the array produced by `R.path(singlePath, obj)`.
 * 
 * Because it calls `R.path`, then `singlePath` can be either string or a list.
 */
export function paths<Input, T>(pathsToSearch: Path[], obj: Input): (T | undefined)[];
export function paths<Input, T>(pathsToSearch: Path[]): (obj: Input) => (T | undefined)[];
export function paths<T>(pathsToSearch: Path[], obj: any): (T | undefined)[];
export function paths<T>(pathsToSearch: Path[]): (obj: any) => (T | undefined)[];

/**
 * It reads `obj` input and returns either `R.path(pathToSearch, obj)` result or `defaultValue` input.
 */
export function pathOr<T>(defaultValue: T, pathToSearch: Path, obj: any): T;
export function pathOr<T>(defaultValue: T, pathToSearch: Path): (obj: any) => T;
export function pathOr<T>(defaultValue: T): (pathToSearch: Path) => (obj: any) => T;

/**
 * It returns a partial copy of an `input` containing only `propsToPick` properties.
 * 
 * `input` can be either an object or an array.
 * 
 * String anotation of `propsToPick` is one of the differences between `Rambda` and `Ramda`.
 */
export function pick<T, K extends string | number | symbol>(propsToPick: K[], input: T): Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>;
export function pick<K extends string | number | symbol>(propsToPick: K[]): <T>(input: T) => Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>;
export function pick<T, U>(propsToPick: string, input: T): U;
export function pick<T, U>(propsToPick: string): (input: T) => U;
export function pick<T>(propsToPick: string, input: object): T;
export function pick<T>(propsToPick: string): (input: object) => T;

/**
 * Same as `R.pick` but it won't skip the missing props, i.e. it will assign them to `undefined`.
 */
export function pickAll<T, U>(propsToPick: string[], input: T): U;
export function pickAll<T, U>(propsToPick: string[]): (input: T) => U;
export function pickAll<T, U>(propsToPick: string, input: T): U;
export function pickAll<T, U>(propsToPick: string): (input: T) => U;

/**
 * It performs left-to-right function composition.
 */
export function pipe<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7, TResult>(
  ...funcs: [
      f1: (...args: TArgs) => R1,
      f2: (a: R1) => R2,
      f3: (a: R2) => R3,
      f4: (a: R3) => R4,
      f5: (a: R4) => R5,
      f6: (a: R5) => R6,
      f7: (a: R6) => R7,
      ...func: Array<(a: any) => any>,
      fnLast: (a: any) => TResult
  ]
): (...args: TArgs) => TResult;  // fallback overload if number of piped functions greater than 7
export function pipe<TArgs extends any[], R1, R2, R3, R4, R5, R6, R7>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7
): (...args: TArgs) => R7;
export function pipe<TArgs extends any[], R1, R2, R3, R4, R5, R6>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6
): (...args: TArgs) => R6;
export function pipe<TArgs extends any[], R1, R2, R3, R4, R5>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5
): (...args: TArgs) => R5;
export function pipe<TArgs extends any[], R1, R2, R3, R4>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4
): (...args: TArgs) => R4;
export function pipe<TArgs extends any[], R1, R2, R3>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3
): (...args: TArgs) => R3;
export function pipe<TArgs extends any[], R1, R2>(
  f1: (...args: TArgs) => R1,
  f2: (a: R1) => R2
): (...args: TArgs) => R2;
export function pipe<TArgs extends any[], R1>(
  f1: (...args: TArgs) => R1
): (...args: TArgs) => R1;

/**
 * It returns list of the values of `property` taken from the all objects inside `list`.
 */
export function pluck<K extends keyof T, T>(property: K, list: T[]): T[K][];
export function pluck<T>(property: number, list: { [k: number]: T }[]):  T[];
export function pluck<P extends string>(property: P): <T>(list: Record<P, T>[]) => T[];
export function pluck(property: number): <T>(list: { [k: number]: T }[]) => T[];

/**
 * It adds element `x` at the beginning of `list`.
 */
export function prepend<T>(x: T, input: T[]): T[];
export function prepend<T>(x: T): (input: T[]) => T[];

export function product(list: number[]): number;

/**
 * It returns the value of property `propToFind` in `obj`.
 * 
 * If there is no such property, it returns `undefined`.
 */
export function prop<P extends keyof T, T>(propToFind: P, obj: T): T[P];
export function prop<P extends string | number>(p: P): <T>(propToFind: Record<P, T>) => T;
export function prop<P extends keyof T, T>(p: P): (propToFind: Record<P, T>) => T;

/**
 * It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`.
 */
export function propEq<K extends string | number>(propToFind: K, valueToMatch: any, obj: Record<K, any>): boolean;
export function propEq<K extends string | number>(propToFind: K, valueToMatch: any): (obj: Record<K, any>) => boolean;
export function propEq<K extends string | number>(propToFind: K): {
  (valueToMatch: any, obj: Record<K, any>): boolean;
  (valueToMatch: any): (obj: Record<K, any>) => boolean;
};

/**
 * It returns `true` if `property` of `obj` is from `target` type.
 */
export function propIs<C extends (...args: any[]) => any, K extends keyof any>(type: C, name: K, obj: any): obj is Record<K, ReturnType<C>>;
export function propIs<C extends new (...args: any[]) => any, K extends keyof any>(type: C, name: K, obj: any): obj is Record<K, InstanceType<C>>;
export function propIs<C extends (...args: any[]) => any, K extends keyof any>(type: C, name: K): (obj: any) => obj is Record<K, ReturnType<C>>;
export function propIs<C extends new (...args: any[]) => any, K extends keyof any>(type: C, name: K): (obj: any) => obj is Record<K, InstanceType<C>>;
export function propIs<C extends (...args: any[]) => any>(type: C): {
    <K extends keyof any>(name: K, obj: any): obj is Record<K, ReturnType<C>>;
    <K extends keyof any>(name: K): (obj: any) => obj is Record<K, ReturnType<C>>;
};
export function propIs<C extends new (...args: any[]) => any>(type: C): {
    <K extends keyof any>(name: K, obj: any): obj is Record<K, InstanceType<C>>;
    <K extends keyof any>(name: K): (obj: any) => obj is Record<K, InstanceType<C>>;
};

/**
 * It returns either `defaultValue` or the value of `property` in `obj`.
 */
export function propOr<T, P extends string>(defaultValue: T, property: P, obj: Partial<Record<P, T>> | undefined): T;
export function propOr<T, P extends string>(defaultValue: T, property: P): (obj: Partial<Record<P, T>> | undefined) => T;
export function propOr<T>(defaultValue: T): {
  <P extends string>(property: P, obj: Partial<Record<P, T>> | undefined): T;
  <P extends string>(property: P): (obj: Partial<Record<P, T>> | undefined) => T;
}

/**
 * It returns list of numbers between `startInclusive` to `endExclusive` markers.
 */
export function range(startInclusive: number, endExclusive: number): number[];
export function range(startInclusive: number): (endExclusive: number) => number[];

export function reduce<T, TResult>(reducer: (prev: TResult, current: T, i: number) => TResult, initialValue: TResult, list: T[]): TResult;
export function reduce<T, TResult>(reducer: (prev: TResult, current: T) => TResult, initialValue: TResult, list: T[]): TResult;
export function reduce<T, TResult>(reducer: (prev: TResult, current: T, i?: number) => TResult): (initialValue: TResult, list: T[]) => TResult;
export function reduce<T, TResult>(reducer: (prev: TResult, current: T, i?: number) => TResult, initialValue: TResult): (list: T[]) => TResult;

/**
 * It has the opposite effect of `R.filter`.
 */
export function reject<T>(predicate: Predicate<T>, list: T[]): T[];
export function reject<T>(predicate: Predicate<T>): (list: T[]) => T[];
export function reject<T>(predicate: Predicate<T>, obj: Dictionary<T>): Dictionary<T>;
export function reject<T, U>(predicate: Predicate<T>): (obj: Dictionary<T>) => Dictionary<T>;

export function repeat<T>(x: T): (timesToRepeat: number) => T[];
export function repeat<T>(x: T, timesToRepeat: number): T[];

/**
 * It replaces `strOrRegex` found in `str` with `replacer`.
 */
export function replace(strOrRegex: RegExp | string, replacer: string, str: string): string;
export function replace(strOrRegex: RegExp | string, replacer: string): (str: string) => string;
export function replace(strOrRegex: RegExp | string): (replacer: string) => (str: string) => string;

/**
 * It returns a reversed copy of list or string `input`.
 */
export function reverse<T>(input: T[]): T[];
export function reverse(input: string): string;

export function slice(from: number, to: number, input: string): string;
export function slice<T>(from: number, to: number, input: T[]): T[];
export function slice(from: number, to: number): {
  (input: string): string;
  <T>(input: T[]): T[];
};
export function slice(from: number): {
  (to: number, input: string): string;
  <T>(to: number, input: T[]): T[];
};

/**
 * It returns copy of `list` sorted by `sortFn` function, where `sortFn` needs to return only `-1`, `0` or `1`.
 */
export function sort<T>(sortFn: (a: T, b: T) => number, list: T[]): T[];
export function sort<T>(sortFn: (a: T, b: T) => number): (list: T[]) => T[];

/**
 * It returns copy of `list` sorted by `sortFn` function, where `sortFn` function returns a value to compare, i.e. it doesn't need to return only `-1`, `0` or `1`.
 */
export function sortBy<T>(sortFn: (a: T) => Ord, list: T[]): T[];
export function sortBy<T>(sortFn: (a: T) => Ord): (list: T[]) => T[];
export function sortBy(sortFn: (a: any) => Ord): <T>(list: T[]) => T[];

/**
 * Curried version of `String.prototype.split`
 */
export function split(separator: string | RegExp): (str: string) => string[];
export function split(separator: string | RegExp, str: string): string[];

/**
 * It splits `input` into slices of `sliceLength`.
 */
export function splitEvery<T>(sliceLength: number, input: T[]): (T[])[];
export function splitEvery(sliceLength: number, input: string): string[];
export function splitEvery(sliceLength: number): {
  (input: string): string[];
  <T>(input: T[]): (T[])[];
};

/**
 * When iterable is a string, then it behaves as `String.prototype.startsWith`.
 * When iterable is a list, then it uses R.equals to determine if the target list starts in the same way as the given target.
 */
export function startsWith(target: string, str: string): boolean;
export function startsWith(target: string): (str: string) => boolean;
export function startsWith<T>(target: T[], list: T[]): boolean;
export function startsWith<T>(target: T[]): (list: T[]) => boolean;

/**
 * Curried version of `x - y`
 */
export function subtract(x: number, y: number): number;
export function subtract(x: number): (y: number) => number;

export function sum(list: number[]): number;

/**
 * It returns a merged list of `x` and `y` with all equal elements removed.
 * 
 * `R.equals` is used to determine equality.
 */
export function symmetricDifference<T>(x: T[], y: T[]): T[];
export function symmetricDifference<T>(x: T[]): <T>(y: T[]) => T[];

export function T(): boolean;

/**
 * It returns all but the first element of `input`.
 */
export function tail<T>(input: T[]): T[];
export function tail(input: string): string;

/**
 * It returns the first `howMany` elements of `input`.
 */
export function take<T>(howMany: number, input: T[]): T[];
export function take(howMany: number, input: string): string;
export function take<T>(howMany: number): {
  <T>(input: T[]): T[];
  (input: string): string;
};

/**
 * It returns the last `howMany` elements of `input`.
 */
export function takeLast<T>(howMany: number, input: T[]): T[];
export function takeLast(howMany: number, input: string): string;
export function takeLast<T>(howMany: number): {
  <T>(input: T[]): T[];
  (input: string): string;
};

/**
 * It applies function `fn` to input `x` and returns `x`.
 * 
 * One use case is debuging in the middle of `R.compose`.
 */
export function tap<T>(fn: (x: T) => void, input: T): T;
export function tap<T>(fn: (x: T) => void): (input: T) => T;

/**
 * It determines whether `str` matches `regExpression`.
 */
export function test(regExpression: RegExp): (str: string) => boolean;
export function test(regExpression: RegExp, str: string): boolean;

/**
 * It returns the result of applying function `fn` over members of range array.
 * 
 * The range array includes numbers between `0` and `howMany`(exclusive).
 */
export function times<T>(fn: (i: number) => T, howMany: number): T[];
export function times<T>(fn: (i: number) => T): (howMany: number) => T[];

export function toLower<S extends string>(str: S): Lowercase<S>;
export function toLower(str: string): string;

export function toUpper<S extends string>(str: S): Uppercase<S>;
export function toUpper(str: string): string;

/**
 * It transforms an object to a list.
 */
export function toPairs<O extends object, K extends Extract<keyof O, string | number>>(obj: O): Array<{ [key in K]: [`${key}`, O[key]] }[K]>;
export function toPairs<S>(obj: Record<string | number, S>): Array<[string, S]>;

export function toString(x: unknown): string;

export function transpose<T>(list: (T[])[]): (T[])[];

export function trim(str: string): string;

/**
 * It returns function that runs `fn` in `try/catch` block. If there was an error, then `fallback` is used to return the result. Note that `fn` can be value or asynchronous/synchronous function(unlike `Ramda` where fallback can only be a synchronous function).
 */
export function tryCatch<T, U>(
  fn: (input: T) => U,
  fallback: U
): (input: T) => U;
export function tryCatch<T, U>(
  fn: (input: T) => U,
  fallback: (input: T) => U
): (input: T) => U;
export function tryCatch<T>(
  fn: (input: any) => Promise<any>,
  fallback: T
): (input: any) => Promise<T>;
export function tryCatch<T>(
  fn: (input: any) => Promise<any>,
  fallback: (input: any) => Promise<any>,
): (input: any) => Promise<T>;

/**
 * It accepts any input and it returns its type.
 */
export function type(x: any): RambdaTypes;

/**
 * It takes two lists and return a new list containing a merger of both list with removed duplicates.
 * 
 * `R.equals` is used to compare for duplication.
 */
export function union<T>(x: T[], y: T[]): T[];
export function union<T>(x: T[]): (y: T[]) => T[];

/**
 * It returns a new array containing only one copy of each element of `list`.
 * 
 * `R.equals` is used to determine equality.
 */
export function uniq<T>(list: T[]): T[];

/**
 * It returns a new array containing only one copy of each element in `list` according to `predicate` function.
 * 
 * This predicate should return true, if two elements are equal.
 */
export function uniqWith<T, U>(predicate: (x: T, y: T) => boolean, list: T[]): T[];
export function uniqWith<T, U>(predicate: (x: T, y: T) => boolean): (list: T[]) => T[];

/**
 * The method returns function that will be called with argument `input`.
 * 
 * If `predicate(input)` returns `false`, then the end result will be the outcome of `whenFalse(input)`.
 * 
 * In the other case, the final output will be the `input` itself.
 */
export function unless<T, U>(predicate: (x: T) => boolean, whenFalseFn: (x: T) => U, x: T): T | U;
export function unless<T, U>(predicate: (x: T) => boolean, whenFalseFn: (x: T) => U): (x: T) => T | U;
export function unless<T>(predicate: (x: T) => boolean, whenFalseFn: (x: T) => T, x: T): T;
export function unless<T>(predicate: (x: T) => boolean, whenFalseFn: (x: T) => T): (x: T) => T;

/**
 * It returns a copy of `list` with updated element at `index` with `newValue`.
 */
export function update<T>(index: number, newValue: T, list: T[]): T[];
export function update<T>(index: number, newValue: T): (list: T[]) => T[];

/**
 * With correct input, this is nothing more than `Object.values(obj)`. If `obj` is not an object, then it returns an empty array.
 */
export function values<T extends object, K extends keyof T>(obj: T): T[K][];

export function when<T, U>(predicate: (x: T) => boolean, whenTrueFn: (a: T) => U, input: T): T | U;
export function when<T, U>(predicate: (x: T) => boolean, whenTrueFn: (a: T) => U): (input: T) => T | U;
export function when<T, U>(predicate: (x: T) => boolean): ((whenTrueFn: (a: T) => U) => (input: T) => T | U);

/**
 * It returns `true` if all each property in `conditions` returns `true` when applied to corresponding property in `input` object.
 */
export function where<T, U>(conditions: T, input: U): boolean;
export function where<T>(conditions: T): <U>(input: U) => boolean;
export function where<ObjFunc2, U>(conditions: ObjFunc2, input: U): boolean;
export function where<ObjFunc2>(conditions: ObjFunc2): <U>(input: U) => boolean;

/**
 * It will return `true` if all of `input` object fully or partially include `rule` object.
 * 
 * `R.equals` is used to determine equality.
 */
export function whereEq<T, U>(condition: T, input: U): boolean;
export function whereEq<T>(condition: T): <U>(input: U) => boolean;

/**
 * It will return a new array, based on all members of `source` list that are not part of `matchAgainst` list.
 * 
 * `R.equals` is used to determine equality.
 */
export function without<T>(matchAgainst: T[], source: T[]): T[];
export function without<T>(matchAgainst: T[]): (source: T[]) => T[];

/**
 * Logical XOR
 */
export function xor(x: boolean, y: boolean): boolean;
export function xor(y: boolean): (y: boolean) => boolean;

/**
 * It will return a new array containing tuples of equally positions items from both `x` and `y` lists.
 * 
 * The returned list will be truncated to match the length of the shortest supplied list.
 */
export function zip<K, V>(x: K[], y: V[]): KeyValuePair<K, V>[];
export function zip<K>(x: K[]): <V>(y: V[]) => KeyValuePair<K, V>[];

/**
 * It will return a new object with keys of `keys` array and values of `values` array.
 */
export function zipObj<T, K extends string>(keys: K[], values: T[]): { [P in K]: T };
export function zipObj<K extends string>(keys: K[]): <T>(values: T[]) => { [P in K]: T };
export function zipObj<T, K extends number>(keys: K[], values: T[]): { [P in K]: T };
export function zipObj<K extends number>(keys: K[]): <T>(values: T[]) => { [P in K]: T };

/**
 * It takes list with properties `propsToPick` and returns a list with property values in `obj`.
 */
export function props<P extends string, T>(propsToPick: P[], obj: Record<P, T>): T[];
export function props<P extends string>(propsToPick: P[]): <T>(obj: Record<P, T>) => T[];
export function props<P extends string, T>(propsToPick: P[]): (obj: Record<P, T>) => T[];

export function zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult, list1: T[], list2: U[]): TResult[];
export function zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult, list1: T[]): (list2: U[]) => TResult[];
export function zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult): (list1: T[], list2: U[]) => TResult[];

/**
 * It splits string or array at a given index.
 */
export function splitAt<T>(index: number, input: T[]): [T[], T[]];
export function splitAt(index: number, input: string): [string, string];
export function splitAt(index: number): {
    <T>(input: T[]): [T[], T[]];
    (input: string): [string, string];
};

/**
 * It splits `list` to two arrays according to a `predicate` function.
 * 
 * The first array contains all members of `list` before `predicate` returns `true`.
 */
export function splitWhen<T, U>(predicate: Predicate<T>, list: U[]): (U[])[];
export function splitWhen<T>(predicate: Predicate<T>): <U>(list: U[]) => (U[])[];

export function takeLastWhile(predicate: (x: string) => boolean, input: string): string;
export function takeLastWhile(predicate: (x: string) => boolean): (input: string) => string;
export function takeLastWhile<T>(predicate: (x: T) => boolean, input: T[]): T[];
export function takeLastWhile<T>(predicate: (x: T) => boolean): <T>(input: T[]) => T[];

/**
 * It takes object or array of functions as set of rules. These `rules` are applied to the `iterable` input to produce the result.
 */
export function evolve<T, U>(rules: ((x: T) => U)[], list: T[]): U[];
export function evolve<T, U>(rules: ((x: T) => U)[]) : (list: T[]) => U[];
export function evolve<E extends Evolver, V extends Evolvable<E>>(rules: E, obj: V): Evolve<V, E>;
export function evolve<E extends Evolver>(rules: E): <V extends Evolvable<E>>(obj: V) => Evolve<V, E>;

export function dropLastWhile(predicate: (x: string) => boolean, iterable: string): string;
export function dropLastWhile(predicate: (x: string) => boolean): (iterable: string) => string;
export function dropLastWhile<T>(predicate: (x: T) => boolean, iterable: T[]): T[];
export function dropLastWhile<T>(predicate: (x: T) => boolean): <T>(iterable: T[]) => T[];

/**
 * It removes any successive duplicates according to `R.equals`.
 */
export function dropRepeats<T>(list: T[]): T[];

export function dropRepeatsWith<T>(predicate: (x: T, y: T) => boolean, list: T[]): T[];
export function dropRepeatsWith<T>(predicate: (x: T, y: T) => boolean): (list: T[]) => T[];

export function dropWhile(fn: Predicate<string>, iterable: string): string;
export function dropWhile(fn: Predicate<string>): (iterable: string) => string;
export function dropWhile<T>(fn: Predicate<T>, iterable: T[]): T[];
export function dropWhile<T>(fn: Predicate<T>): (iterable: T[]) => T[];

export function takeWhile(fn: Predicate<string>, iterable: string): string;
export function takeWhile(fn: Predicate<string>): (iterable: string) => string;
export function takeWhile<T>(fn: Predicate<T>, iterable: T[]): T[];
export function takeWhile<T>(fn: Predicate<T>): (iterable: T[]) => T[];

/**
 * It returns `true` if property `prop` in `obj1` is equal to property `prop` in `obj2` according to `R.equals`.
 */
export function eqProps<T, U>(prop: string, obj1: T, obj2: U): boolean;
export function eqProps<P extends string>(prop: P): <T, U>(obj1: Record<P, T>, obj2: Record<P, U>) => boolean;
export function eqProps<T>(prop: string, obj1: T): <U>(obj2: U) => boolean;

/**
 * It calls a function `fn` with the list of values of the returned function.
 * 
 * `R.unapply` is the opposite of `R.apply` method.
 */
export function unapply<T = any>(fn: (args: any[]) => T): (...args: any[]) => T;

/**
 * It applies function `fn` to the list of arguments.
 * 
 * This is useful for creating a fixed-arity function from a variadic function. `fn` should be a bound function if context is significant.
 */
export function apply<T = any>(fn: (...args: any[]) => T, args: any[]): T;
export function apply<T = any>(fn: (...args: any[]) => T): (args: any[]) => T;

/**
 * Creates a function that is bound to a context.
 */
export function bind<F extends (...args: any[]) => any, T>(fn: F, thisObj: T): (...args: Parameters<F>) => ReturnType<F>;
export function bind<F extends (...args: any[]) => any, T>(fn: F): (thisObj: T) => (...args: Parameters<F>) => ReturnType<F>;

// RAMBDAX_MARKER_START

/**
 * It returns `true` if all `inputs` arguments are falsy(empty objects and empty arrays are considered falsy).
 * 
 * Functions are valid inputs, but these functions cannot have their own arguments.
 * 
 * This method is very similar to `R.anyFalse`, `R.anyTrue` and `R.allTrue`
 */
export function allFalse(...inputs: any[]): boolean;

/**
 * It returns `true` if any of `inputs` is falsy(empty objects and empty arrays are considered falsy).
 */
export function anyFalse(...input: any[]): boolean;

/**
 * It returns `true` if all `inputs` arguments are truthy(empty objects and empty arrays are considered falsy).
 */
export function allTrue(...input: any[]): boolean;

/**
 * It returns `true` if any of `inputs` arguments are truthy(empty objects and empty arrays are considered falsy).
 */
export function anyTrue(...input: any[]): boolean;

/**
 * It returns a function which will return `true` if all of its `inputs` arguments belong to `targetType`.
 */
export function allType(targetType: RambdaTypes): (...input: any[]) => boolean;

/**
 * It returns a function which will return `true` if at least one of its `inputs` arguments belongs to `targetType`.
 * 
 * `targetType` is one of the possible returns of `R.type`
 */
export function anyType(targetType: RambdaTypes): (...input: any[]) => boolean;

/**
 * Asynchronous version of `R.compose`
 */
export function composeAsync<Out>(
  ...fns: (Async<any> | Func<any>)[]
): (input: any) => Promise<Out>;
export function composeAsync<Out>(
  ...fns: (Async<any> | Func<any>)[]
): (input: any) => Promise<Out>;

/**
 * Asynchronous version of `R.pipe`
 */
export function pipeAsync<Out>(
  ...fns: (Async<any> | Func<any>)[]
): (input: any) => Promise<Out>;
export function pipeAsync<Out>(
  ...fns: (Async<any> | Func<any>)[]
): (input: any) => Promise<Out>;

/**
 * It counts how many times `searchFor` is within `list` according to `R.equals`.
 */
export function count<T>(searchFor: T, list: any[]): number;
export function count<T>(searchFor: T): (list: any[]) => number;

/**
 * It creates a debounced function that delays invoking `fn` until after wait milliseconds `ms` have elapsed since the last time the debounced function was invoked.
 */
export function debounce<T, U>(fn: (input: T) => U, ms: number): (input: T) => void;
export function debounce<T, Q, U>(fn: (input1: T, input2: Q) => U, ms: number): (input1: T, input2: Q) => void;
export function debounce<T, Q, Z, U>(fn: (input1: T, input2: Q, input3: Z) => U, ms: number): (input1: T, input2: Q, input3: Z) => void;

/**
 * `setTimeout` as a promise that resolves to `R.DELAY` variable after `ms` milliseconds.
 */
export function delay(ms: number): Promise<'RAMBDAX_DELAY'>;

/**
 * Asynchronous version of `R.filter`
 */
export function filterAsync<T>(fn: AsyncPredicate<T>, list: T[]): Promise<T[]>;
export function filterAsync<T>(fn: AsyncPredicateIndexed<T>, list: T[]): Promise<T[]>;
export function filterAsync<T>(fn: AsyncPredicate<T>) : ( list: T[]) => Promise<T[]>;
export function filterAsync<T>(fn: AsyncPredicateIndexed<T>) : ( list: T[]) => Promise<T[]>;

/**
 * It transforms multiline string to single line by gluing together the separate lines with the `glueString` and removing the empty spaces. By default `glueString` is equal to single space, so if that is what you need, then you can just pass a single argument.
 */
export function glue(input: string, glueString?: string): string;

/**
 * The set of methods `R.setter`, `R.getter` and `R.reset` allow different parts of your logic to access comminicate indirectly via shared cache object.
 * 
 * Usually these methods show that you might need to refactor to classes. Still, they can be helpful meanwhile.
 * 
 * `R.getter`: It provides access to the cache object. If `undefined` is used as a key, this method will return the whole cache object. If `string` is passed, then it will return cache value for this key. If array of `string` is passed, then it assume that this is array of keys and it will return the corresponding cache values for these keys.
 * 
 * `R.setter`: It allows cache object's keys to be changed. You can either set individual key-value pairs with `R.setter(key, value)` or you pass directly object, which will be merged with the cache object.
 * 
 * `R.reset`: It resets the cache object.
 */
export function getter<T>(keyOrKeys: string | string[] | undefined): T;

export function setter(keyOrObject: string | object, value?: any): void;

export function reset(): void;

/**
 * It generages a new string from `inputWithTags` by replacing all `{{x}}` occurances with values provided by `templateArguments`.
 */
export function interpolate(inputWithTags: string, templateArguments: object): string;
export function interpolate(inputWithTags: string): (templateArguments: object) => string;

/**
 * Asynchronous version of `R.ifElse`. Any of `condition`, `ifFn` and `elseFn` can be either asynchronous or synchronous function.
 */
export function ifElseAsync<T, U>(
  condition: (x: T) => Promise<boolean>, 
  onTrue: (x: T) => U, 
  onFalse: (x: T) => U, 
  ): (x: T) => Promise<U>;
export function ifElseAsync<T, U>(
  condition: (x: T) => boolean, 
  onTrue: (x: T) => Promise<U>, 
  onFalse: (x: T) => Promise<U>, 
): (x: T) => Promise<U>;
export function ifElseAsync<T, U>(
  condition: (x: T) => Promise<boolean>, 
  onTrue: (x: T) => Promise<U>, 
  onFalse: (x: T) => Promise<U>, 
): (x: T) => Promise<U>;
export function ifElseAsync<T, K, U>(
  condition: (x: T, y: K) => Promise<boolean>, 
  onTrue: (x: T, y: K) => U, 
  onFalse: (x: T, y: K) => U, 
): (x: T, y: K) => Promise<U>;
export function ifElseAsync<T, K, U>(
  condition: (x: T, y: K) => boolean, 
  onTrue: (x: T, y: K) => Promise<U>, 
  onFalse: (x: T, y: K) => Promise<U>, 
): (x: T, y: K) => Promise<U>;
export function ifElseAsync<T, K, U>(
  condition: (x: T, y: K) => Promise<boolean>, 
  onTrue: (x: T, y: K) => Promise<U>, 
  onFalse: (x: T, y: K) => Promise<U>, 
): (x: T, y: K) => Promise<U>;

/**
 * It returns `true` if **R.type** of `input` is `Async` or `Function`.
 */
export function isFunction(input: any): boolean;

export function isPromise(input: any): boolean;

/**
 * It returns true if `targetType` is equal to type of `input` according to `R.type`.
 */
export function isType(targetType: RambdaTypes, input: any): boolean;
export function isType(targetType: RambdaTypes): (input: any) => boolean;

/**
 * It checks if `input` is following `schema` specifications.
 * 
 * If validation fails, it returns `false`.
 * 
 * Please [check the detailed explanation](https://github.com/selfrefactor/rambdax/blob/master/files/isValid.md) as it is hard to write a short description for this method.
 */
export function isValid({input: object, schema: Schema}: IsValid): boolean;

/**
 * Asynchronous version of `R.isValid`
 */
export function isValidAsync(x: IsValidAsync): Promise<boolean>;

/**
 * Sequential asynchronous mapping with `fn` over members of `list`.
 */
export function mapAsync<T, K>(fn: AsyncIterable<T, K>, list: T[]): Promise<K[]>;
export function mapAsync<T, K>(fn: AsyncIterableIndexed<T, K>, list: T[]): Promise<K[]>;
export function mapAsync<T, K>(fn: AsyncIterable<T, K>) : ( list: T[]) => Promise<K[]>;
export function mapAsync<T, K>(fn: AsyncIterableIndexed<T, K>) : ( list: T[]) => Promise<K[]>;

/**
 * Parrallel asynchronous mapping with `fn` over members of `list`.
 */
export function mapFastAsync<T, K>(fn: AsyncIterable<T, K>, list: T[]): Promise<K[]>;
export function mapFastAsync<T, K>(fn: AsyncIterableIndexed<T, K>, list: T[]): Promise<K[]>;
export function mapFastAsync<T, K>(fn: AsyncIterable<T, K>) : ( list: T[]) => Promise<K[]>;
export function mapFastAsync<T, K>(fn: AsyncIterableIndexed<T, K>) : ( list: T[]) => Promise<K[]>;

/**
 * It is similar to `R.mapFastAsync` in that it uses `Promise.all` but not over the whole list, rather than with only slice from `list` with length `limit`.
 */
export function mapAsyncLimit<T, K>(fn: AsyncIterable<T, K>, limit: number, list: T[]): Promise<K[]>;
export function mapAsyncLimit<T, K>(fn: AsyncIterable<T, K>, limit: number): (list: T[]) => Promise<K[]>;
export function mapAsyncLimit<T, K>(fn: AsyncIterableIndexed<T, K>, limit: number, list: T[]): Promise<K[]>;
export function mapAsyncLimit<T, K>(fn: AsyncIterableIndexed<T, K>, limit: number): (list: T[]) => Promise<K[]>;

/**
 * This method allows to generate an object from a list using input function `fn`.
 * 
 * This function must return either an object or `false` for every member of `list` input.
 * 
 * If `false` is returned, then this element of `list` will be skipped in the calculation of the result.
 * 
 * All of returned objects will be merged to generate the final result.
 */
export function mapToObject<T, U>(fn: (input: T) => object|false, list: T[]): U;
export function mapToObject<T, U>(fn: (input: T) => object|false): (list: T[]) => U;

/**
 * Asynchronous version of `R.mapToObject`
 */
export function mapToObjectAsync<T, U>(fn: (input: T) => Promise<object|false>, list: T[]): Promise<U>;
export function mapToObjectAsync<T, U>(fn: (input: T) => Promise<object|false>): (list: T[]) => Promise<U>;

/**
 * It takes an object and returns a new object with changed keys according to `changeKeyFn` function.
 */
export function mapKeys<T, U>(changeKeyFn: (x: string) => string, obj: { [key: string]: T}): U;
export function mapKeys<T, U>(changeKeyFn: (x: string) => string): (obj: { [key: string]: T}) => U;

/**
 * It acts as ternary operator and it is helpful when we have nested ternaries.
 * 
 * All of the inputs can be either direct values or anonymous functions. This is helpful if we don't want to evaluate certain paths as we can wrap this logic in a function.
 */
export function maybe<T>(ifRule: boolean, whenIf: T | Func<T>, whenElse: T | Func<T>): T;
export function maybe<T>(ifRule: VoidInputFunc<boolean>, whenIf: T | Func<T>, whenElse: T | Func<T>): T;

/**
 * When `fn` is called for a second time with the same input, then the cache result is returned instead of calling again `fn`.
 */
export function memoize<T, K extends any[]>(fn: (...inputs: K) => T): (...inputs: K) => T;

/**
 * It returns the next index of the list.
 * 
 * If we have reached the end of the list, then it will return `0`.
 */
export function nextIndex(index: number, list: any[]): number;

/**
 * It returns the next index of the list when the order is descending.
 * 
 * If we have reached the beginning of the list, then it will return the last index of the list.
 */
export function prevIndex(index: number, list: any[]): number;

/**
 * It checks if `inputs` are following `schemas` specifications according to `R.isValid`.
 * 
 * If validation fails, it throws.
 */
export function ok(...inputs: any[]): (...schemas: any[]) => void | never;

/**
 * It checks if `inputs` are following `schemas` specifications according to `R.isValid`.
 */
export function pass(...inputs: any[]): (...rules: any[]) => boolean;

/**
 * `R.partialCurry` is a curry helper designed specifically for functions accepting object as a single argument.
 * 
 * Initially the function knows only a part from the whole input object and then `R.partialCurry` helps in preparing the function for the second part, when it receives the rest of the input.
 */
export function partialCurry<Input, PartialInput, Output>(
  fn: (input: Input) => Output, 
  partialInput: PartialInput,
): (input: Pick<Input, Exclude<keyof Input, keyof PartialInput>>) => Output;

/**
 * It is basically `R.pipe`, but instead of passing `input` argument as `R.pipe(...)(input)`, you pass it as the first argument.
 */
export function piped<A, B>(input: A, fn0: (x: A) => B) : B;
export function piped<A, B, C>(input: A, fn0: (x: A) => B, fn1: (x: B) => C) : C;
export function piped<A, B, C, D>(input: A, fn0: (x: A) => B, fn1: (x: B) => C, fn2: (x: C) => D) : D;
export function piped<A, B, C, D, E>(input: A, fn0: (x: A) => B, fn1: (x: B) => C, fn2: (x: C) => D, fn3: (x: D) => E) : E;
export function piped<A, B, C, D, E, F>(input: A, fn0: (x: A) => B, fn1: (x: B) => C, fn2: (x: C) => D, fn3: (x: D) => E, fn4: (x: E) => F) : F;
export function piped<A, B, C, D, E, F, G>(input: A, fn0: (x: A) => B, fn1: (x: B) => C, fn2: (x: C) => D, fn3: (x: D) => E, fn4: (x: E) => F, fn5: (x: F) => G) : G;
export function piped<A, B, C, D, E, F, G, H>(input: A, fn0: (x: A) => B, fn1: (x: B) => C, fn2: (x: C) => D, fn3: (x: D) => E, fn4: (x: E) => F, fn5: (x: F) => G, fn6: (x: G) => H) : H;
export function piped<A, B, C, D, E, F, G, H, I>(input: A, fn0: (x: A) => B, fn1: (x: B) => C, fn2: (x: C) => D, fn3: (x: D) => E, fn4: (x: E) => F, fn5: (x: F) => G, fn6: (x: G) => H, fn7: (x: H) => I) : I;

/**
 * It accepts input as first argument and series of functions as next arguments. It is same as `R.pipe` but with support for asynchronous functions.
 */
export function pipedAsync<T>(
  input: any,
  ...fns: (Func<any> | Async<any>)[]
): Promise<T>;

/**
 * It returns an object created by applying each value of `rules` to `input` argument.
 */
export function produce<Input extends any, Output>(
  rules: ProduceRules<Output, keyof Output, Input>,
  input: Input
): Output;
export function produce<Input extends any, Output>(
  rules: ProduceRules<Output, keyof Output, Input>
): <Input>(
  input: Input
) => Output;

/**
 * It returns an object created by applying each value of `rules` to `input` argument.
 * 
 * `rules` input is an object with synchronous or asynchronous functions as values.
 * 
 * The return value is wrapped in a promise, even if all `rules` are synchronous functions.
 */
export function produceAsync<Input extends any, Output>(
  rules: ProduceAsyncRules<Output, keyof Output, Input>,
  input: Input
): Promise<Output>;
export function produceAsync<Input extends any, Output>(
  rules: ProduceAsyncRules<Output, keyof Output, Input>
): <Input>(
  input: Input
) => Promise<Output>;

/**
 * It returns a random number between `min` inclusive and `max` inclusive.
 */
export function random(minInclusive: number, maxInclusive: number): number;

/**
 * It will remove all `toRemove` entries from `text` sequentially.
 * 
 * `toRemove` argument can be either a list of strings/regular expressions or a single string/regular expression.
 */
export function remove(
  toRemove: string | RegExp | (string | RegExp)[],
  text: string
): string;
export function remove(
  toRemove: string | RegExp | (string | RegExp)[]
): (text: string) => string;

/**
 * If property `prop` of `rules` is also a property in `input`, then rename `input` property to `rules[prop]`.
 */
export function renameProps(rules: object, input: object): object;
export function renameProps(rules: object): (input: object) => object;
export function renameProps<Output>(rules: object, input: object): Output;
export function renameProps<Output>(rules: object): (input: object) => Output;

/**
 * Same as `R.replace` but it accepts array of string and regular expressions instead of a single value.
 */
export function replaceAll(patterns: (RegExp | string)[], replacer: string, input: string): string;
export function replaceAll(patterns: (RegExp | string)[], replacer: string): (input: string) => string;
export function replaceAll(patterns: (RegExp | string)[]): (replacer: string) => (input: string) => string;

/**
 * It returns a randomized copy of array.
 */
export function shuffle<T>(list: T[]): T[];

/**
 * It returns a sorted version of `input` object.
 */
export function sortObject<T>(predicate: SortObjectPredicate<T>, input: { [key: string]: T }): { [keyOutput: string]: T };
export function sortObject<T>(predicate: SortObjectPredicate<T>): (input: { [key: string]: T }) => { [keyOutput: string]: T };

/**
 * Edited fork of [Switchem](https://github.com/planttheidea/switchem) library.
 * 
 * The method return a value if the matched option is a value.
 * 
 * If the matched option is a function, then `R.switcher` returns a function which expects input. Tests of the method explain it better than this short description.
 * 
 * `R.equals` is used to determine equality.
 */
export function switcher<T>(valueToMatch: any): Switchem<T>;

/**
 * Asynchronous version of `R.tap`.
 */
export function tapAsync<T>(fn: Func<any> | Promise<any>, input: T): T;
export function tapAsync<T>(fn: Func<any> | Promise<any>): (input: T) => T;

/**
 * It creates a throttled function that invokes `fn` maximum once for a `period` of milliseconds.
 */
export function throttle<T, U>(fn: (input: T) => U, ms: number): (input: T) => U;
export function throttle<T, Q, U>(fn: (input1: T, input2: Q) => U, ms: number): (input1: T, input2: Q) => U;
export function throttle<T, Q, Z, U>(fn: (input1: T, input2: Q, input3: Z) => U, ms: number): (input1: T, input2: Q, input3: Z) => U;

export function toDecimal(num: number, charsAfterDecimalPoint?: number): number;

/**
 * It provides `Golang`-like interface for handling promises.
 */
export function wait<T>(fn: Promise<T>): Promise<[T, Error|undefined]>;
export function wait<T>(fn: (x: any) => Promise<T>): Promise<[T, Error|undefined]>;

/**
 * It returns `true`, if `condition` returns `true` within `howLong` milisececonds time period.
 * 
 * The method accepts an optional third argument `loops`(default to 10), which is the number of times `waitForTrueCondition` will be evaluated for `howLong` period. Once this function returns a value different from `false`, this value will be the final result.
 * 
 * Otherwise, `R.waitFor` will return `false`.
 */
export function waitFor(
  waitForTrueCondition: () => boolean,
  howLong: number,
  loops?: number
): () => Promise<boolean>;
export function waitFor(
  waitForTrueCondition: () => Promise<boolean>,
  howLong: number,
  loops?: number
): () => Promise<boolean>;
export function waitFor<T>(
  waitForTrueCondition: (input: T) => Promise<boolean>,
  howLong: number,
  loops?: number
): (input: T) => Promise<boolean>;
export function waitFor<T>(
  waitForTrueCondition: (input: T) => boolean,
  howLong: number,
  loops?: number
): (input: T) => Promise<boolean>;

/**
 * It returns `true` if data structure focused by the given lens equals to the `target` value.
 * 
 * `R.equals` is used to determine equality.
 */
export function lensEq<T, U>(lens: Lens, target: T, input: U): boolean;
export function lensEq<T, U>(lens: Lens, target: T):  (input: U) => boolean;
export function lensEq<T>(lens: Lens, target: T, input: T[]): boolean;
export function lensEq<T>(lens: Lens, target: T): (input: T[]) => boolean;

/**
 * It returns `true` if data structure focused by the given lens satisfies the predicate.
 */
export function lensSatisfies<T, U>(predicate: (x: T) => boolean, lens: Lens, input: U): boolean;
export function lensSatisfies<T, U>(predicate: (x: T) => boolean, lens: Lens): (input: U) => boolean;
export function lensSatisfies<T>(predicate: (x: T) => boolean, lens: Lens, input: T[]): boolean;
export function lensSatisfies<T>(predicate: (x: T) => boolean, lens: Lens): (input: T[]) => boolean;

/**
 * A combination between `R.defaultTo` and `R.view.
 */
export function viewOr<Input, Output>(fallback: Output, lens: Lens, input: Input): Output;
export function viewOr<Input, Output>(fallback: Output, lens: Lens): (input: Input) =>  Output;
export function viewOr<Input, Output>(fallback: Output): (lens: Lens) => (input: Input) =>  Output;

/**
 * It returns copy of `list` sorted by `sortPath` value.
 * 
 * As `sortPath` is passed to `R.path`, it can be either a string or an array of strings.
 */
export function sortByPath<T>(sortPath: Path, list: T[]): T[];
export function sortByPath(sortPath: Path): <T>(list: T[]) => T[];

/**
 * It returns sorted copy of `list` of objects.
 * 
 * Sorting is done using a list of strings, each representing a path. Two members `a` and `b` from `list` can be sorted if both return a value for a given path. If the value is equal, then the next member of `sortPaths`(if there is such) will be used in order to find difference between `a` and `b`.
 */
export function sortByProps<T>(sortPaths: string[], list: T[]): T[];
export function sortByProps(sortPaths: string[]): <T>(list: T[]) => T[];

/**
 * It returns a copy of `list` input with removed `index`.
 */
export function removeIndex<T>(index: number, list: T[]): T[];
export function removeIndex(index: number): <T>(list: T[]) => T[];

/**
 * Opposite of `R.includes`
 * 
 * `R.equals` is used to determine equality.
 */
export function excludes(valueToFind: string, input: string[] | string): boolean;
export function excludes(valueToFind: string): (input: string[] | string) => boolean;
export function excludes<T>(valueToFind: T, input: T[]): boolean;
export function excludes<T>(valueToFind: T): (input: T[]) => boolean;

/**
 * Very similar to `R.assocPath` but it applies list of updates instead of only a single update.
 * 
 * It returns a copy of `obj` input with changed properties according to `rules` input.
 * 
 * Each instance of `rules` is a tuple of object path and the new value for this path. If such object path does not exist, then such object path is created.
 * 
 * As it uses `R.path` underneath, object path can be either string or array of strings(in Typescript object path can be only a string).
 */
export function updateObject<Output>(rules: ([string, any])[], input: object): Output;
export function updateObject<Output>(rules: ([string, any])[]): (input: object) => Output;

export function takeUntil<T>(predicate: (x: T) => boolean, list: T[]): T[];
export function takeUntil<T>(predicate: (x: T) => boolean): (list: T[]) => T[];

/**
 * It changes paths in an object according to a list of operations. Valid operations are `add`, `update` and `delete`. Its use-case is while writing tests and you need to change the test data.
 * 
 * Note, that you cannot use `update` operation, if the object path is missing in the input object.
 * Also, you cannot use `add` operation, if the object path has a value.
 */
export function applyDiff<Output, Input extends object>(rules: ApplyDiffRule<Paths<Input>>[], obj: Input): Output;
export function applyDiff<Output, Input extends object>(rules: ApplyDiffRule<Paths<Input>>[]): (obj: Input) => Output;

/**
 * Same as `R.map`, but it passes index as second argument to the iterator, when looping over arrays.
 */
export function mapIndexed<T, U>(fn: ObjectIterator<T, U>, iterable: Dictionary<T>): Dictionary<U>;
export function mapIndexed<T, U>(fn: IndexedIterator<T, U>, iterable: T[]): U[];
export function mapIndexed<T, U>(fn: IndexedIterator<T, U>): (iterable: T[]) => U[];
export function mapIndexed<T, U, S>(fn: ObjectIterator<T, U>): (iterable: Dictionary<T>) => Dictionary<U>;
export function mapIndexed<T>(fn: IndexedIterator<T, T>): (iterable: T[]) => T[];
export function mapIndexed<T>(fn: IndexedIterator<T, T>, iterable: T[]): T[];

export function mapArray<T>(fn: Iterator<T, T>, iterable: T[]): T[];
export function mapArray<T, U>(fn: Iterator<T, U>, iterable: T[]): U[];
export function mapArray<T, U>(fn: Iterator<T, U>): (iterable: T[]) => U[];
export function mapArray<T>(fn: Iterator<T, T>): (iterable: T[]) => T[];

/**
 * Same as `R.filter`, but it passes index/property as second argument to the predicate, when looping over arrays/objects.
 */
export function filterIndexed<T>(predicate: IndexedPredicate<T>): (x: T[]) => T[];
export function filterIndexed<T>(predicate: IndexedPredicate<T>, x: T[]): T[];
export function filterIndexed<T, U>(predicate: ObjectPredicate<T>): (x: Dictionary<T>) => Dictionary<T>;
export function filterIndexed<T>(predicate: ObjectPredicate<T>, x: Dictionary<T>): Dictionary<T>;

/**
 * Same as `R.reject`, but it passes index/property as second argument to the predicate, when looping over arrays/objects.
 */
export function rejectIndexed<T>(predicate: IndexedPredicate<T>): (x: T[]) => T[];
export function rejectIndexed<T>(predicate: IndexedPredicate<T>, x: T[]): T[];
export function rejectIndexed<T, U>(predicate: ObjectPredicate<T>): (x: Dictionary<T>) => Dictionary<T>;
export function rejectIndexed<T>(predicate: ObjectPredicate<T>, x: Dictionary<T>): Dictionary<T>;

export function partitionIndexed<T>(
  predicate: IndexedPredicate<T>,
  input: T[]
): [T[], T[]];
export function partitionIndexed<T>(
  predicate: IndexedPredicate<T>
): (input: T[]) => [T[], T[]];
export function partitionIndexed<T>(
  predicate: (x: T, prop?: string) => boolean,
  input: { [key: string]: T}
): [{ [key: string]: T}, { [key: string]: T}];
export function partitionIndexed<T>(
  predicate: (x: T, prop?: string) => boolean
): (input: { [key: string]: T}) => [{ [key: string]: T}, { [key: string]: T}];

export function filterObject<T>(predicate: ObjectPredicate<T>): (x: Dictionary<T>) => Dictionary<T>;
export function filterObject<T>(predicate: ObjectPredicate<T>, x: Dictionary<T>): Dictionary<T>;

export function filterArray<T>(predicate: Predicate<T>): (input: T[]) => T[];
export function filterArray<T>(predicate: Predicate<T>, input: T[]): T[];

export function forEachIndexed<T>(fn: IndexedIterator<T, void>, list: T[]): T[];
export function forEachIndexed<T>(fn: IndexedIterator<T, void>): (list: T[]) => T[];
export function forEachIndexed<T>(fn: ObjectIterator<T, void>, list: Dictionary<T>): Dictionary<T>;
export function forEachIndexed<T, U>(fn: ObjectIterator<T, void>): (list: Dictionary<T>) => Dictionary<T>;

export function mapObject<T>(fn: ObjectIterator<T, T>, iterable: Dictionary<T>): Dictionary<T>;
export function mapObject<T, U>(fn: ObjectIterator<T, U>, iterable: Dictionary<T>): Dictionary<U>;
export function mapObject<T>(fn: ObjectIterator<T, T>): (iterable: Dictionary<T>) => Dictionary<T>;
export function mapObject<T, U>(fn: ObjectIterator<T, U>): (iterable: Dictionary<T>) => Dictionary<U>;

/**
 * It returns function that runs `fn` in `try/catch` block. If there was an error, then `fallback` is used to return the result.
 */
export function tryCatchAsync<T>(
  fn: (input: any) => Promise<T>,
  fallback: T
): (input: any) => Promise<T>;
export function tryCatchAsync<T>(
  fn: (input: any) => Promise<T>,
  fallback: (input: any) => Promise<T>,
): (input: any) => Promise<T>;

export const DELAY: 'RAMBDAX_DELAY';

/**
 * Asynchronous version of `R.find`.
 */
export function findAsync<T>(predicate: (x: T) => Promise<boolean>, list: T[]): T | undefined;
export function findAsync<T>(predicate: (x: T) => Promise<boolean>): (list: T[]) => T | undefined;

/**
 * Logical XNOR
 */
export function xnor(x: boolean, y: boolean): boolean;
export function xnor(y: boolean): (y: boolean) => boolean;

// RAMBDAX_MARKER_END
// ============================================

export as namespace R
