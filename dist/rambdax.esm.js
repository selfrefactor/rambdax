import { F, T, add, addIndex, adjust, all, allPass, always, any, anyPass, append, both, complement, compose, concat, contains, curry, dec, defaultTo, divide, drop, dropLast, either, endsWith, equals, filter, find, findIndex, flatten, flip, forEach, has, head, identity, ifElse, inc, includes, indexOf, init, is, isNil, join, last, lastIndexOf, length, map, match, merge, modulo, multiply, not, omit, partialCurry, path, pathOr, pick, pipe, pluck, prepend, prop, propEq, range, reduce, reject, repeat, replace, reverse, sort, sortBy, split, splitEvery, startsWith, subtract, tail, take, takeLast, tap, test, times, toLower, toString, toUpper, trim, type, typedDefaultTo, typedPathOr, uniq, update, values, without } from 'rambda';

function isType$1(xType, x) {
  if (arguments.length === 1) {
    return xHolder => isType$1(xType, xHolder);
  }

  return type(x) === xType;
}

const types = ['Null', 'Undefined', 'RegExp'];

function compact(arr) {

  return filter(a => {
    const currentType = type(a);
    if (types.includes(currentType)) {
      return false;
    }
    if (currentType === 'Object') {
      return !equals(a, {});
    }

    return a.length !== 0;
  }, arr);
}

function composeAsync(...inputArguments) {
  try {
    return async function (startArgument) {
      let argumentsToPass = startArgument;

      while (inputArguments.length !== 0) {
        const fn = inputArguments.pop();
        if (type(fn) === 'Async' || type(fn) === 'Promise') {
          argumentsToPass = await fn(argumentsToPass);
        } else {
          argumentsToPass = fn(argumentsToPass);
        }
      }

      return argumentsToPass;
    };
  } catch (err) {
    throw err;
  }
}

function debounce(func, ms, immediate = false) {
  let timeout;

  return function () {
    const thisHolder = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(thisHolder, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
    if (callNow) {
      func.apply(thisHolder, args);
    }
  };
}

function delay(ms) {

  return new Promise(resolve => {
    setTimeout(() => {
      resolve('RAMBDAX_DELAY');
    }, ms);
  });
}

function debug(...input) {
  console.log(...input);
  process.exit();
}

const { type: type$2, curry: curry$2, filter: filter$2 } = require('rambda');

function evolve(rules, input) {
  const clone = Object.assign({}, input);
  const propRules = filter$2(x => clone[x] !== undefined)(Object.keys(rules));

  if (propRules.length === 0) {
    return input;
  }

  propRules.map(prop$$1 => {
    const fn = rules[prop$$1];
    if (type$2(fn) === 'Function') {
      clone[prop$$1] = fn(clone[prop$$1]);
    } else if (type$2(fn) === 'Object') {
      clone[prop$$1] = evolve(fn, clone[prop$$1]);
    }
  });

  return clone;
}

var evolve$1 = curry$2(evolve);

function greater(x, y) {
  if (y === undefined) {
    return yHolder => greater(x, yHolder);
  }

  return y > x;
}

function createThenable(x) {
  return async function (input) {
    return x(input);
  };
}

function ifElseAsync(condition, ifFn, elseFn) {
  if (ifFn === undefined) {
    return (ifFnHolder, elseFnHolder) => ifElseAsync(condition, ifFnHolder, elseFnHolder);
  } else if (elseFn === undefined) {
    return elseFnHolder => ifElseAsync(condition, ifFn, elseFnHolder);
  }

  return input => new Promise((resolve, reject$$1) => {
    const conditionPromise = createThenable(condition);
    const ifFnPromise = createThenable(ifFn);
    const elseFnPromise = createThenable(elseFn);

    conditionPromise(input).then(conditionResult => {
      const promised = conditionResult === true ? ifFnPromise : elseFnPromise;

      promised(input).then(resolve).catch(reject$$1);
    }).catch(reject$$1);
  });
}

function intersection(a, b) {
  if (b === undefined) {
    return bHolder => intersection(a, bHolder);
  }

  return filter(val => b.includes(val))(a);
}

const { type: type$3 } = require('rambda');

function isPromiseLike(x) {
  return ['Async', 'Promise'].includes(type$3(x));
}

function isValid({ input, schema }) {
  if (type(input) === 'Object' && type(schema) === 'Object') {
    let flag = true;
    for (const requirement in schema) {
      if (flag) {
        const rule = schema[requirement];
        const ruleType = type(rule);
        const inputProp = input[requirement];
        const inputPropType = type(input[requirement]);

        if (ruleType === 'Object' && rule.type === 'ArrayOfSchemas' && inputPropType === 'Array') {
          inputProp.map(val => {
            let localFlag = false;
            rule.rule.map(singleRule => {
              if (isValid(val, singleRule)) {
                localFlag = true;
              }
            });
            if (localFlag === false) {
              flag = false;
            }
          });
        } else if (ruleType === 'String') {
          if (inputProp !== undefined) {
            if (toLower(inputPropType) !== rule) {
              flag = false;
            }
          } else {
            flag = false;
          }
        } else if (typeof rule === 'function') {
          if (rule(inputProp) === false) {
            flag = false;
          }
        } else if (ruleType === 'Object' && inputPropType === 'Object') {
          if (!isValid(inputProp, rule)) {
            flag = false;
          }
        } else if (ruleType === 'Array' && inputPropType === 'String') {
          if (!contains(inputProp, rule)) {
            flag = false;
          }
        } else if (ruleType === 'Array' && inputPropType === 'Array' && rule.length === 1 && inputProp.length > 0) {
          const arrayRuleType = type(rule[0]);

          if (arrayRuleType === 'String') {
            const result = any(val => toLower(type(val)) !== rule[0], inputProp);

            if (result) {
              flag = false;
            }
          } else if (arrayRuleType === 'Object') {
            const result = any(val => !isValid(val, rule[0]))(inputProp);
            if (result) {
              flag = false;
            }
          }
        } else if (ruleType === 'RegExp' && inputPropType === 'String') {
          if (!test(rule, inputProp)) {
            flag = false;
          }
        } else {
          flag = false;
        }
      }
    }

    return flag;
  }

  return false;
}

function less(x, y) {
  if (y === undefined) {
    return yHolder => less(x, yHolder);
  }

  return y < x;
}

async function mapAsyncFn(fn, arr) {
  try {
    const willReturn = [];
    for (const a of arr) {
      willReturn.push((await fn(a)));
    }

    return willReturn;
  } catch (err) {
    throw err;
  }
}

function mapAsync(fn, arr) {
  if (arr === undefined) {
    return async holder => await mapAsyncFn(fn, holder);
  }

  return new Promise((resolve, reject$$1) => {
    mapAsyncFn(fn, arr).then(resolve).catch(reject$$1);
  });
}

async function mapFastAsyncFn(fn, arr) {
  try {
    const promised = arr.map(a => fn(a));

    return await Promise.all(promised);
  } catch (err) {
    throw err;
  }
}

function mapFastAsync(fn, arr) {
  if (arr === undefined) {
    return async holder => await mapFastAsyncFn(fn, holder);
  }

  return new Promise((resolve, reject$$1) => {
    mapFastAsyncFn(fn, arr).then(resolve).catch(reject$$1);
  });
}

const cache = {};

const normalizeObject = obj => {
  const sortFn = (a, b) => a > b;
  const willReturn = {};
  compose(map(prop$$1 => willReturn[prop$$1] = obj[prop$$1]), sort(sortFn))(Object.keys(obj));

  return willReturn;
};

const stringify = a => {
  if (type(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(type(a))) {
    const compacted = replace(/\s{1,}/g, ' ', a.toString());

    return replace(/\s/g, '_', take(15, compacted));
  } else if (type(a) === 'Object') {
    a = normalizeObject(a);
  }

  return JSON.stringify(a);
};

const generateProp = (fn, ...inputArguments) => {
  let propString = '';
  inputArguments.map(inputArgument => {
    propString += `${stringify(inputArgument)}_`;
  });

  return `${propString}${stringify(fn)}`;
};

function memoize(fn, ...inputArguments) {
  if (arguments.length === 1) {
    return (...inputArgumentsHolder) => memoize(fn, ...inputArgumentsHolder);
  }
  const prop$$1 = generateProp(fn, ...inputArguments);
  if (prop$$1 in cache) {
    return cache[prop$$1];
  }
  if (type(fn) === 'Async') {
    return new Promise(resolve => {
      fn(...inputArguments).then(result => {
        cache[prop$$1] = result;
        resolve(result);
      });
    });
  }
  const result = fn(...inputArguments);
  cache[prop$$1] = result;

  return result;
}

function mergeAll(arr) {
  let willReturn = {};
  map(val => {
    willReturn = merge(willReturn, val);
  }, arr);

  return willReturn;
}

function omitBy(fn, obj) {
  if (arguments.length === 1) {
    return holder => omitBy(fn, holder);
  }

  const willReturn = {};
  for (const prop$$1 in obj) {
    if (!fn(prop$$1, obj[prop$$1])) {
      willReturn[prop$$1] = obj[prop$$1];
    }
  }

  return willReturn;
}

function onceFn(fn, context) {
  let result;

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}

function once(fn, context) {
  if (arguments.length === 1) {
    const wrap = onceFn(fn, context);

    return curry(wrap);
  }

  return onceFn(fn, context);
}

function pickBy(fn, obj) {
  if (arguments.length === 1) {
    return holder => pickBy(fn, holder);
  }

  const willReturn = {};
  for (const prop$$1 in obj) {
    if (fn(prop$$1, obj[prop$$1])) {
      willReturn[prop$$1] = obj[prop$$1];
    }
  }

  return willReturn;
}

function helper({ condition, inputArgument, prop: prop$$1 }) {
  return new Promise((resolve, reject$$1) => {
    if (!(type(condition) === 'Async')) {
      return resolve({
        type: prop$$1,
        payload: condition(inputArgument)
      });
    }

    condition(inputArgument).then(result => {
      resolve({
        type: prop$$1,
        payload: result
      });
    }).catch(err => reject$$1(err));
  });
}

function produce(conditions, inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder => produce(conditions, inputArgumentHolder);
  }
  let asyncConditionsFlag = false;
  for (const prop$$1 in conditions) {
    if (asyncConditionsFlag === false && type(conditions[prop$$1]) === 'Async') {
      asyncConditionsFlag = true;
    }
  }

  if (asyncConditionsFlag === false) {
    const willReturn = {};
    for (const prop$$1 in conditions) {
      willReturn[prop$$1] = conditions[prop$$1](inputArgument);
    }

    return willReturn;
  }
  const promised = [];
  for (const prop$$1 in conditions) {
    const condition = conditions[prop$$1];
    promised.push(helper({
      inputArgument,
      condition,
      prop: prop$$1
    }));
  }

  return new Promise((resolve, reject$$1) => {
    Promise.all(promised).then(results => {
      const willReturn = {};

      map(result => willReturn[result.type] = result.payload, results);

      resolve(willReturn);
    }).catch(err => reject$$1(err));
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rangeBy(startNum, endNum, distance) {
  if (endNum === undefined) {
    return (endNumHolder, distanceHolder) => rangeBy(startNum, endNumHolder, distanceHolder);
  } else if (distance === undefined) {
    return distanceHolder => rangeBy(startNum, endNum, distanceHolder);
  }

  const isInteger = !distance.toString().includes('.');
  if (startNum > endNum) {
    const startNumHolder = startNum;
    startNum = endNum;
    endNum = startNumHolder;
  }
  const willReturn = [startNum];
  let valueToPush = startNum;

  if (isInteger) {
    const loopIndexes = range(0, Math.floor((endNum - startNum) / distance));
    for (const i of loopIndexes) {
      valueToPush += distance;
      willReturn.push(valueToPush);
    }
  } else {
    const decimalLength = compose(length, last, split('.'))(distance.toString());
    const loopIndexes = range(0, Math.floor((endNum - startNum) / distance));
    for (const i of loopIndexes) {
      valueToPush += distance;
      willReturn.push(Number(valueToPush.toFixed(decimalLength)));
    }
  }

  return willReturn;
}

function renameProps(conditions, inputObject) {
  if (inputObject === undefined) {
    return inputObjectHolder => renameProps(conditions, inputObjectHolder);
  }
  const renamed = {};
  Object.keys(conditions).map(renameConditionProp => {
    if (Object.keys(inputObject).includes(renameConditionProp)) {
      renamed[conditions[renameConditionProp]] = inputObject[renameConditionProp];
    }
  });

  return merge(renamed, omit(Object.keys(conditions), inputObject));
}

function resolveMethod(promises) {
  return new Promise((res, rej) => {
    let counter = 0;
    const props = {};
    const promisedArr = [];
    for (const prop$$1 in promises) {
      props[counter] = prop$$1;
      promisedArr.push(promises[prop$$1]);
      counter++;
    }
    Promise.all(promisedArr).then(result => {
      const willReturn = {};
      result.map((val, key) => {
        const prop$$1 = props[key];
        willReturn[prop$$1] = val;
      });

      res(willReturn);
    }).catch(rej);
  });
}

const resolveSecureWrapper = promise => new Promise(res => {
  promise.then(result => {
    res({
      payload: result,
      type: 'RESULT'
    });
  }).catch(err => {
    res({
      payload: err,
      type: 'ERROR'
    });
  });
});

async function resolveSecure(input) {
  try {
    const promised = map(a => resolveSecureWrapper(a), input);

    return await Promise.all(promised);
  } catch (err) {
    console.log(err);
  }
}

function shuffle(arrayRaw) {
  const array = arrayRaw.concat();
  let counter = array.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function tapAsync(fn, input) {
  if (arguments.length === 1) {
    return inputHolder => tapAsync(fn, inputHolder);
  }
  if (isPromiseLike(fn) === true) {
    return new Promise((resolve, reject$$1) => {
      fn(input).then(() => {
        resolve(input);
      }).catch(reject$$1);
    });
  }
  fn(input);

  return input;
}

function throttle(callback, ms) {
  let wait = false;

  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, ms);
    }
  };
}

function when(condition, whenTrueFn) {
  if (whenTrueFn === undefined) {
    return whenTrueFnHolder => when(condition, whenTrueFnHolder);
  }

  return input => {
    if (condition(input) === true) {
      return whenTrueFn(input);
    }
    return input;
  };
}

function where(conditions, obj) {
  if (obj === undefined) {
    return objHolder => where(conditions, objHolder);
  }
  let flag = true;
  for (const prop$$1 in conditions) {
    const result = conditions[prop$$1](obj[prop$$1]);
    if (flag && result === false) {
      flag = false;
    }
  }

  return flag;
}

const DELAY = 'RAMBDAX_DELAY';
const isArray = x => isType$1('Array', x);
const isObject = x => isType$1('Object', x);
const isString = x => isType$1('String', x);
const isType = isType$1;
// Follows code generated by `run rambda`
const always$1 = always;
const complement$1 = complement;
const F$1 = F;
const identity$1 = identity;
const not$1 = not;
const T$1 = T;
const trim$1 = trim;
const add$1 = add;
const addIndex$1 = addIndex;
const adjust$1 = adjust;
const all$1 = all;
const allPass$1 = allPass;
const anyPass$1 = anyPass;
const any$1 = any;
const append$1 = append;
const both$1 = both;
const compose$1 = compose;
const concat$1 = concat;
const contains$1 = contains;
const curry$1 = curry;
const dec$1 = dec;
const defaultTo$1 = defaultTo;
const divide$1 = divide;
const drop$1 = drop;
const dropLast$1 = dropLast;
const either$1 = either;
const endsWith$1 = endsWith;
const inc$1 = inc;
const equals$1 = equals;
const filter$1 = filter;
const find$1 = find;
const findIndex$1 = findIndex;
const flatten$1 = flatten;
const flip$1 = flip;
const forEach$1 = forEach;
const has$1 = has;
const head$1 = head;
const ifElse$1 = ifElse;
const is$1 = is;
const isNil$1 = isNil;
const includes$1 = includes;
const indexOf$1 = indexOf;
const init$1 = init;
const join$1 = join;
const lastIndexOf$1 = lastIndexOf;
const last$1 = last;
const length$1 = length;
const map$1 = map;
const match$1 = match;
const merge$1 = merge;
const modulo$1 = modulo;
const multiply$1 = multiply;
const omit$1 = omit;
const partialCurry$1 = partialCurry;
const path$1 = path;
const pathOr$1 = pathOr;
const pick$1 = pick;
const pipe$1 = pipe;
const pluck$1 = pluck;
const prepend$1 = prepend;
const prop$1 = prop;
const propEq$1 = propEq;
const range$1 = range;
const reduce$1 = reduce;
const reject$1 = reject;
const repeat$1 = repeat;
const replace$1 = replace;
const reverse$1 = reverse;
const sort$1 = sort;
const sortBy$1 = sortBy;
const split$1 = split;
const splitEvery$1 = splitEvery;
const startsWith$1 = startsWith;
const subtract$1 = subtract;
const tap$1 = tap;
const tail$1 = tail;
const take$1 = take;
const takeLast$1 = takeLast;
const test$1 = test;
const times$1 = times;
const toLower$1 = toLower;
const toUpper$1 = toUpper;
const toString$1 = toString;
const type$1 = type;
const typedPathOr$1 = typedPathOr;
const typedDefaultTo$1 = typedDefaultTo;
const uniq$1 = uniq;
const update$1 = update;
const values$1 = values;
const without$1 = without;

export { DELAY, isArray, isObject, isString, isType, always$1 as always, complement$1 as complement, F$1 as F, identity$1 as identity, not$1 as not, T$1 as T, trim$1 as trim, add$1 as add, addIndex$1 as addIndex, adjust$1 as adjust, all$1 as all, allPass$1 as allPass, anyPass$1 as anyPass, any$1 as any, append$1 as append, both$1 as both, compose$1 as compose, concat$1 as concat, contains$1 as contains, curry$1 as curry, dec$1 as dec, defaultTo$1 as defaultTo, divide$1 as divide, drop$1 as drop, dropLast$1 as dropLast, either$1 as either, endsWith$1 as endsWith, inc$1 as inc, equals$1 as equals, filter$1 as filter, find$1 as find, findIndex$1 as findIndex, flatten$1 as flatten, flip$1 as flip, forEach$1 as forEach, has$1 as has, head$1 as head, ifElse$1 as ifElse, is$1 as is, isNil$1 as isNil, includes$1 as includes, indexOf$1 as indexOf, init$1 as init, join$1 as join, lastIndexOf$1 as lastIndexOf, last$1 as last, length$1 as length, map$1 as map, match$1 as match, merge$1 as merge, modulo$1 as modulo, multiply$1 as multiply, omit$1 as omit, partialCurry$1 as partialCurry, path$1 as path, pathOr$1 as pathOr, pick$1 as pick, pipe$1 as pipe, pluck$1 as pluck, prepend$1 as prepend, prop$1 as prop, propEq$1 as propEq, range$1 as range, reduce$1 as reduce, reject$1 as reject, repeat$1 as repeat, replace$1 as replace, reverse$1 as reverse, sort$1 as sort, sortBy$1 as sortBy, split$1 as split, splitEvery$1 as splitEvery, startsWith$1 as startsWith, subtract$1 as subtract, tap$1 as tap, tail$1 as tail, take$1 as take, takeLast$1 as takeLast, test$1 as test, times$1 as times, toLower$1 as toLower, toUpper$1 as toUpper, toString$1 as toString, type$1 as type, typedPathOr$1 as typedPathOr, typedDefaultTo$1 as typedDefaultTo, uniq$1 as uniq, update$1 as update, values$1 as values, without$1 as without, compact, composeAsync, debounce, delay, debug, evolve$1 as evolve, greater, ifElseAsync, intersection, isPromiseLike, isValid, less, mapAsync, mapFastAsync, memoize, mergeAll, omitBy, once, pickBy, produce, random, rangeBy, renameProps, resolveMethod as resolve, resolveSecure, shuffle, tapAsync, throttle, when, where };
//# sourceMappingURL=rambdax.esm.js.map
