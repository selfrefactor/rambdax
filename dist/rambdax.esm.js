import R, { any, compose, contains, curry, equals, filter, last, length, map, merge, omit, range, replace, sort, split, take, test, toLower, type } from 'rambda';

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

const { type: type$2, curry: curry$2, filter: filter$2 } = require('rambda');

function evolve(rules, input) {
  const clone = Object.assign({}, input);
  const propRules = filter$2(x => clone[x] !== undefined)(Object.keys(rules));

  if (propRules.length === 0) {
    return input;
  }

  propRules.map(prop => {
    const fn = rules[prop];
    if (type$2(fn) === 'Function') {
      clone[prop] = fn(clone[prop]);
    } else if (type$2(fn) === 'Object') {
      clone[prop] = evolve(fn, clone[prop]);
    }
  });

  return clone;
}

var evolve$1 = curry$2(evolve);

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

  return input => new Promise((resolve, reject) => {
    const conditionPromise = createThenable(condition);
    const ifFnPromise = createThenable(ifFn);
    const elseFnPromise = createThenable(elseFn);

    conditionPromise(input).then(conditionResult => {
      const promised = conditionResult === true ? ifFnPromise : elseFnPromise;

      promised(input).then(resolve).catch(reject);
    }).catch(reject);
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

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, arr).then(resolve).catch(reject);
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

  return new Promise((resolve, reject) => {
    mapFastAsyncFn(fn, arr).then(resolve).catch(reject);
  });
}

const cache = {};

const normalizeObject = obj => {
  const sortFn = (a, b) => a > b;
  const willReturn = {};
  compose(map(prop => willReturn[prop] = obj[prop]), sort(sortFn))(Object.keys(obj));

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
  const prop = generateProp(fn, ...inputArguments);
  if (prop in cache) {
    return cache[prop];
  }
  if (type(fn) === 'Async') {
    return new Promise(resolve => {
      fn(...inputArguments).then(result => {
        cache[prop] = result;
        resolve(result);
      });
    });
  }
  const result = fn(...inputArguments);
  cache[prop] = result;

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
  for (const prop in obj) {
    if (!fn(prop, obj[prop])) {
      willReturn[prop] = obj[prop];
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
  for (const prop in obj) {
    if (fn(prop, obj[prop])) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}

function helper({ condition, inputArgument, prop }) {
  return new Promise((resolve, reject) => {
    if (!(type(condition) === 'Async')) {
      return resolve({
        type: prop,
        payload: condition(inputArgument)
      });
    }

    condition(inputArgument).then(result => {
      resolve({
        type: prop,
        payload: result
      });
    }).catch(err => reject(err));
  });
}

function produce(conditions, inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder => produce(conditions, inputArgumentHolder);
  }
  let asyncConditionsFlag = false;
  for (const prop in conditions) {
    if (asyncConditionsFlag === false && type(conditions[prop]) === 'Async') {
      asyncConditionsFlag = true;
    }
  }

  if (asyncConditionsFlag === false) {
    const willReturn = {};
    for (const prop in conditions) {
      willReturn[prop] = conditions[prop](inputArgument);
    }

    return willReturn;
  }
  const promised = [];
  for (const prop in conditions) {
    const condition = conditions[prop];
    promised.push(helper({
      inputArgument,
      condition,
      prop
    }));
  }

  return new Promise((resolve, reject) => {
    Promise.all(promised).then(results => {
      const willReturn = {};

      map(result => willReturn[result.type] = result.payload, results);

      resolve(willReturn);
    }).catch(err => reject(err));
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
    for (const prop in promises) {
      props[counter] = prop;
      promisedArr.push(promises[prop]);
      counter++;
    }
    Promise.all(promisedArr).then(result => {
      const willReturn = {};
      result.map((val, key) => {
        const prop = props[key];
        willReturn[prop] = val;
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
    return new Promise((resolve, reject) => {
      fn(input).then(() => {
        resolve(input);
      }).catch(reject);
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
  for (const prop in conditions) {
    const result = conditions[prop](obj[prop]);
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
const add = R.add;
const always = R.always;
const complement = R.complement;
const concat = R.concat;
const divide = R.divide;
const endsWith = R.endsWith;
const F = R.F;
const identity = R.identity;
const includes = R.includes;
const join = R.join;
const lastIndexOf = R.lastIndexOf;
const length$1 = R.length;
const modulo = R.modulo;
const multiply = R.multiply;
const not = R.not;
const padEnd = R.padEnd;
const padStart = R.padStart;
const reverse = R.reverse;
const startsWith = R.startsWith;
const subtract = R.subtract;
const T = R.T;
const toLower$1 = R.toLower;
const toString = R.toString;
const toUpper = R.toUpper;
const trim = R.trim;
const addIndex = R.addIndex;
const adjust = R.adjust;
const all = R.all;
const allPass = R.allPass;
const anyPass = R.anyPass;
const any$1 = R.any;
const append = R.append;
const both = R.both;
const compose$1 = R.compose;
const contains$1 = R.contains;
const curry$1 = R.curry;
const dec = R.dec;
const defaultTo = R.defaultTo;
const drop = R.drop;
const dropLast = R.dropLast;
const either = R.either;
const inc = R.inc;
const equals$1 = R.equals;
const filter$1 = R.filter;
const find = R.find;
const findIndex = R.findIndex;
const flatten = R.flatten;
const flip = R.flip;
const has = R.has;
const head = R.head;
const ifElse = R.ifElse;
const isNil = R.isNil;
const indexOf = R.indexOf;
const init = R.init;
const last$1 = R.last;
const map$1 = R.map;
const match = R.match;
const merge$1 = R.merge;
const omit$1 = R.omit;
const partialCurry = R.partialCurry;
const path = R.path;
const pathOr = R.pathOr;
const pick = R.pick;
const pipe = R.pipe;
const pluck = R.pluck;
const prepend = R.prepend;
const prop = R.prop;
const propEq = R.propEq;
const range$1 = R.range;
const reduce = R.reduce;
const repeat = R.repeat;
const replace$1 = R.replace;
const sort$1 = R.sort;
const sortBy = R.sortBy;
const split$1 = R.split;
const splitEvery = R.splitEvery;
const tap = R.tap;
const tail = R.tail;
const take$1 = R.take;
const takeLast = R.takeLast;
const test$1 = R.test;
const type$1 = R.type;
const typedPathOr = R.typedPathOr;
const typedDefaultTo = R.typedDefaultTo;
const uniq = R.uniq;
const update = R.update;
const values = R.values;

export { DELAY, isArray, isObject, isString, isType, add, always, complement, concat, divide, endsWith, F, identity, includes, join, lastIndexOf, length$1 as length, modulo, multiply, not, padEnd, padStart, reverse, startsWith, subtract, T, toLower$1 as toLower, toString, toUpper, trim, addIndex, adjust, all, allPass, anyPass, any$1 as any, append, both, compose$1 as compose, contains$1 as contains, curry$1 as curry, dec, defaultTo, drop, dropLast, either, inc, equals$1 as equals, filter$1 as filter, find, findIndex, flatten, flip, has, head, ifElse, isNil, indexOf, init, last$1 as last, map$1 as map, match, merge$1 as merge, omit$1 as omit, partialCurry, path, pathOr, pick, pipe, pluck, prepend, prop, propEq, range$1 as range, reduce, repeat, replace$1 as replace, sort$1 as sort, sortBy, split$1 as split, splitEvery, tap, tail, take$1 as take, takeLast, test$1 as test, type$1 as type, typedPathOr, typedDefaultTo, uniq, update, values, compact, composeAsync, debounce, delay, evolve$1 as evolve, ifElseAsync, intersection, isPromiseLike, isValid, mapAsync, mapFastAsync, memoize, mergeAll, omitBy, once, pickBy, produce, random, rangeBy, renameProps, resolveMethod as resolve, resolveSecure, shuffle, tapAsync, throttle, when, where };
//# sourceMappingURL=rambdax.esm.js.map
