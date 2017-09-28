'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var R = require('rambda');
var R__default = _interopDefault(R);

function isType$1(xType, x) {
  if (arguments.length === 1) {
    return xHolder => isType$1(xType, xHolder);
  }

  return R.type(x) === xType;
}

const types = ['Null', 'Undefined', 'RegExp'];

function compact(arr) {

  return R.filter(a => {
    const currentType = R.type(a);
    if (types.includes(currentType)) {
      return false;
    }
    if (currentType === 'Object') {
      return !R.equals(a, {});
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
        if (R.type(fn) === 'Async' || R.type(fn) === 'Promise') {
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

  return R.filter(val => b.includes(val))(a);
}

const { type: type$3 } = require('rambda');

function isPromiseLike(x) {
  return ['Async', 'Promise'].includes(type$3(x));
}

function isValid({ input, schema }) {
  if (R.type(input) === 'Object' && R.type(schema) === 'Object') {
    let flag = true;
    for (const requirement in schema) {
      if (flag) {
        const rule = schema[requirement];
        const ruleType = R.type(rule);
        const inputProp = input[requirement];
        const inputPropType = R.type(input[requirement]);

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
            if (R.toLower(inputPropType) !== rule) {
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
          if (!R.contains(inputProp, rule)) {
            flag = false;
          }
        } else if (ruleType === 'Array' && inputPropType === 'Array' && rule.length === 1 && inputProp.length > 0) {
          const arrayRuleType = R.type(rule[0]);

          if (arrayRuleType === 'String') {
            const result = R.any(val => R.toLower(R.type(val)) !== rule[0], inputProp);

            if (result) {
              flag = false;
            }
          } else if (arrayRuleType === 'Object') {
            const result = R.any(val => !isValid(val, rule[0]))(inputProp);
            if (result) {
              flag = false;
            }
          }
        } else if (ruleType === 'RegExp' && inputPropType === 'String') {
          if (!R.test(rule, inputProp)) {
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
  R.compose(R.map(prop => willReturn[prop] = obj[prop]), R.sort(sortFn))(Object.keys(obj));

  return willReturn;
};

const stringify = a => {
  if (R.type(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(R.type(a))) {
    const compacted = R.replace(/\s{1,}/g, ' ', a.toString());

    return R.replace(/\s/g, '_', R.take(15, compacted));
  } else if (R.type(a) === 'Object') {
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
  if (R.type(fn) === 'Async') {
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
  R.map(val => {
    willReturn = R.merge(willReturn, val);
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

    return R.curry(wrap);
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
    if (!(R.type(condition) === 'Async')) {
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
    if (asyncConditionsFlag === false && R.type(conditions[prop]) === 'Async') {
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

      R.map(result => willReturn[result.type] = result.payload, results);

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
    const loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance));
    for (const i of loopIndexes) {
      valueToPush += distance;
      willReturn.push(valueToPush);
    }
  } else {
    const decimalLength = R.compose(R.length, R.last, R.split('.'))(distance.toString());
    const loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance));
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

  return R.merge(renamed, R.omit(Object.keys(conditions), inputObject));
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
    const promised = R.map(a => resolveSecureWrapper(a), input);

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
const add = R__default.add;
const always = R__default.always;
const complement = R__default.complement;
const concat = R__default.concat;
const divide = R__default.divide;
const endsWith = R__default.endsWith;
const F = R__default.F;
const identity = R__default.identity;
const includes = R__default.includes;
const join = R__default.join;
const lastIndexOf = R__default.lastIndexOf;
const length$1 = R__default.length;
const modulo = R__default.modulo;
const multiply = R__default.multiply;
const not = R__default.not;
const padEnd = R__default.padEnd;
const padStart = R__default.padStart;
const reverse = R__default.reverse;
const startsWith = R__default.startsWith;
const subtract = R__default.subtract;
const T = R__default.T;
const toLower$1 = R__default.toLower;
const toString = R__default.toString;
const toUpper = R__default.toUpper;
const trim = R__default.trim;
const addIndex = R__default.addIndex;
const adjust = R__default.adjust;
const all = R__default.all;
const allPass = R__default.allPass;
const anyPass = R__default.anyPass;
const any$1 = R__default.any;
const append = R__default.append;
const both = R__default.both;
const compose$1 = R__default.compose;
const contains$1 = R__default.contains;
const curry$1 = R__default.curry;
const dec = R__default.dec;
const defaultTo = R__default.defaultTo;
const drop = R__default.drop;
const dropLast = R__default.dropLast;
const either = R__default.either;
const inc = R__default.inc;
const equals$1 = R__default.equals;
const filter$1 = R__default.filter;
const find = R__default.find;
const findIndex = R__default.findIndex;
const flatten = R__default.flatten;
const flip = R__default.flip;
const has = R__default.has;
const head = R__default.head;
const ifElse = R__default.ifElse;
const isNil = R__default.isNil;
const indexOf = R__default.indexOf;
const init = R__default.init;
const last$1 = R__default.last;
const map$1 = R__default.map;
const match = R__default.match;
const merge$1 = R__default.merge;
const omit$1 = R__default.omit;
const partialCurry = R__default.partialCurry;
const path = R__default.path;
const pathOr = R__default.pathOr;
const pick = R__default.pick;
const pipe = R__default.pipe;
const pluck = R__default.pluck;
const prepend = R__default.prepend;
const prop = R__default.prop;
const propEq = R__default.propEq;
const range$1 = R__default.range;
const reduce = R__default.reduce;
const repeat = R__default.repeat;
const replace$1 = R__default.replace;
const sort$1 = R__default.sort;
const sortBy = R__default.sortBy;
const split$1 = R__default.split;
const splitEvery = R__default.splitEvery;
const tap = R__default.tap;
const tail = R__default.tail;
const take$1 = R__default.take;
const takeLast = R__default.takeLast;
const test$1 = R__default.test;
const type$1 = R__default.type;
const typedPathOr = R__default.typedPathOr;
const typedDefaultTo = R__default.typedDefaultTo;
const uniq = R__default.uniq;
const update = R__default.update;
const values = R__default.values;

exports.DELAY = DELAY;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isString = isString;
exports.isType = isType;
exports.add = add;
exports.always = always;
exports.complement = complement;
exports.concat = concat;
exports.divide = divide;
exports.endsWith = endsWith;
exports.F = F;
exports.identity = identity;
exports.includes = includes;
exports.join = join;
exports.lastIndexOf = lastIndexOf;
exports.length = length$1;
exports.modulo = modulo;
exports.multiply = multiply;
exports.not = not;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.reverse = reverse;
exports.startsWith = startsWith;
exports.subtract = subtract;
exports.T = T;
exports.toLower = toLower$1;
exports.toString = toString;
exports.toUpper = toUpper;
exports.trim = trim;
exports.addIndex = addIndex;
exports.adjust = adjust;
exports.all = all;
exports.allPass = allPass;
exports.anyPass = anyPass;
exports.any = any$1;
exports.append = append;
exports.both = both;
exports.compose = compose$1;
exports.contains = contains$1;
exports.curry = curry$1;
exports.dec = dec;
exports.defaultTo = defaultTo;
exports.drop = drop;
exports.dropLast = dropLast;
exports.either = either;
exports.inc = inc;
exports.equals = equals$1;
exports.filter = filter$1;
exports.find = find;
exports.findIndex = findIndex;
exports.flatten = flatten;
exports.flip = flip;
exports.has = has;
exports.head = head;
exports.ifElse = ifElse;
exports.isNil = isNil;
exports.indexOf = indexOf;
exports.init = init;
exports.last = last$1;
exports.map = map$1;
exports.match = match;
exports.merge = merge$1;
exports.omit = omit$1;
exports.partialCurry = partialCurry;
exports.path = path;
exports.pathOr = pathOr;
exports.pick = pick;
exports.pipe = pipe;
exports.pluck = pluck;
exports.prepend = prepend;
exports.prop = prop;
exports.propEq = propEq;
exports.range = range$1;
exports.reduce = reduce;
exports.repeat = repeat;
exports.replace = replace$1;
exports.sort = sort$1;
exports.sortBy = sortBy;
exports.split = split$1;
exports.splitEvery = splitEvery;
exports.tap = tap;
exports.tail = tail;
exports.take = take$1;
exports.takeLast = takeLast;
exports.test = test$1;
exports.type = type$1;
exports.typedPathOr = typedPathOr;
exports.typedDefaultTo = typedDefaultTo;
exports.uniq = uniq;
exports.update = update;
exports.values = values;
exports.compact = compact;
exports.composeAsync = composeAsync;
exports.debounce = debounce;
exports.delay = delay;
exports.evolve = evolve$1;
exports.ifElseAsync = ifElseAsync;
exports.intersection = intersection;
exports.isPromiseLike = isPromiseLike;
exports.isValid = isValid;
exports.mapAsync = mapAsync;
exports.mapFastAsync = mapFastAsync;
exports.memoize = memoize;
exports.mergeAll = mergeAll;
exports.omitBy = omitBy;
exports.once = once;
exports.pickBy = pickBy;
exports.produce = produce;
exports.random = random;
exports.rangeBy = rangeBy;
exports.renameProps = renameProps;
exports.resolve = resolveMethod;
exports.resolveSecure = resolveSecure;
exports.shuffle = shuffle;
exports.tapAsync = tapAsync;
exports.throttle = throttle;
exports.when = when;
exports.where = where;
//# sourceMappingURL=rambdax.cjs.js.map
