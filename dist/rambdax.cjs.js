'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var R = require('rambda');

function assocPath(path, x, obj) {
  const pathValue = typeof path === 'string' ? path.split('.') : path;

  const lastProp = pathValue[pathValue.length - 1];

  let newProps = { [lastProp]: x };

  let counter = pathValue.length - 2;

  while (counter > -1) {
    const prop = pathValue[counter];
    newProps = { [prop]: newProps };

    counter--;
  }

  return Object.assign({}, obj, newProps);
}

var assocPath$1 = R.curry(assocPath);

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

  return function (...input) {
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(null, input);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
    if (callNow) {
      func.apply(null, input);
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

function evolve(rules, input) {
  const clone = Object.assign({}, input);
  const propRules = R.filter(x => clone[x] !== undefined)(Object.keys(rules));

  if (propRules.length === 0) {
    return input;
  }

  propRules.map(prop => {
    const fn = rules[prop];
    if (R.type(fn) === 'Function') {
      clone[prop] = fn(clone[prop]);
    } else if (R.type(fn) === 'Object') {
      clone[prop] = evolve(fn, clone[prop]);
    }
  });

  return clone;
}

var evolve$1 = R.curry(evolve);

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

function inject(injection, marker, content) {

  return R.replace(marker, `${marker}${injection}`, content);
}

function isPromiseLike(x) {
  return ['Async', 'Promise'].includes(R.type(x));
}

function isValid({ input, schema }) {
  if (R.type(input) === 'Object' && R.type(schema) === 'Object') {

    let flag = true;
    const boom = boomFlag => {
      if (!boomFlag) {
        flag = false;
      }
    };

    for (const requirement in schema) {

      if (flag) {
        const rule = schema[requirement];
        const ruleType = R.type(rule);
        const inputProp = input[requirement];
        const inputPropType = R.type(input[requirement]);

        if (ruleType === 'Object') {
          // This rule is standalone schema - schema = {a: {b: 'string'}}  
          const isValidResult = isValid({
            input: inputProp,
            schema: rule
          });
          boom(isValidResult);
        } else if (ruleType === 'String') {
          // rule is concrete rule such as 'number' so two types are compared
          boom(R.toLower(inputPropType) === rule);
        } else if (typeof rule === 'function') {
          // rule is function so we pass to it the input
          boom(rule(inputProp));
        } else if (ruleType === 'Array' && inputPropType === 'String') {
          // enum case | rule is like a: ['foo', 'bar']
          boom(R.contains(inputProp, rule));
        } else if (ruleType === 'Array' && rule.length === 1 && inputPropType === 'Array') {
          // 1. array of type | rule is like a: ['number']
          // 2. rule is like a: [{from: 'string'}]

          const currentRule = rule[0];
          const currentRuleType = R.type(rule[0]);
          // Check if rule is invalid
          boom(currentRuleType === 'String' || currentRuleType === 'Object');

          if (currentRuleType === 'String') {

            // 1. array of type
            const isInvalidResult = R.any(inputPropInstance => R.type(inputPropInstance).toLowerCase() !== currentRule, inputProp);
            boom(!isInvalidResult);
          }

          if (currentRuleType === 'Object') {

            // 2. rule is like a: [{from: 'string'}]
            const isValidResult = R.all(inputPropInstance => isValid({ input: inputPropInstance, schema: currentRule }), inputProp);
            boom(isValidResult);
          }
        } else if (ruleType === 'RegExp' && inputPropType === 'String') {

          boom(R.test(rule, inputProp));
        } else {

          boom(false);
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

const NO_MATCH_FOUND = Symbol('NO_MATCH_FOUND');

const getMatchingKeyValuePair = (cases, testValue, defaultValue) => {
  let iterationValue;

  for (let index = 0; index < cases.length; index++) {
    iterationValue = cases[index].test(testValue);

    if (iterationValue !== NO_MATCH_FOUND) {
      return {
        key: cases[index].key,
        value: iterationValue
      };
    }
  }

  return {
    key: 'default',
    value: defaultValue
  };
};

const isEqual = (testValue, matchValue) => {
  const willReturn = typeof testValue === 'function' ? testValue(matchValue) : R.equals(testValue, matchValue);

  return willReturn;
};

const is = (testValue, matchResult = true) => ({
  key: testValue,
  test: matchValue => isEqual(testValue, matchValue) ? matchResult : NO_MATCH_FOUND
});

class Switchem {

  constructor(defaultValue, cases, willMatch) {
    if (defaultValue !== undefined && cases === undefined && willMatch === undefined) {
      this.cases = [];
      this.defaultValue = undefined;
      this.willMatch = defaultValue;
    } else {
      this.cases = cases;
      this.defaultValue = defaultValue;
      this.willMatch = willMatch;
    }

    return this;
  }

  default(defaultValue) {
    const holder = new Switchem(defaultValue, this.cases, this.willMatch);

    return holder.match(this.willMatch);
  }

  is(testValue, matchResult) {
    return new Switchem(this.defaultValue, [...this.cases, is(testValue, matchResult)], this.willMatch);
  }

  match(matchValue) {
    const { key, value } = getMatchingKeyValuePair(this.cases, matchValue, this.defaultValue);

    return typeof value === 'function' ? value(key, matchValue) : value;
  }

}

function switcher(input) {
  return new Switchem(input);
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

function throttle(fn, ms) {
  let wait = false;

  return function (...input) {
    if (!wait) {
      fn.apply(null, input);
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
    const flag = typeof condition === 'boolean' ? condition : condition(input);

    if (flag) {
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

// Follows code generated by `run rambda`
const add = R.add;
const addIndex = R.addIndex;
const adjust = R.adjust;
const all = R.all;
const allPass = R.allPass;
const anyPass = R.anyPass;
const always = R.always;
const any = R.any;
const append = R.append;
const both = R.both;
const complement = R.complement;
const compose = R.compose;
const concat = R.concat;
const contains = R.contains;
const curry = R.curry;
const dec = R.dec;
const defaultTo = R.defaultTo;
const dissoc = R.dissoc;
const divide = R.divide;
const drop = R.drop;
const dropLast = R.dropLast;
const either = R.either;
const endsWith = R.endsWith;
const inc = R.inc;
const equals = R.equals;
const F = R.F;
const filter = R.filter;
const find = R.find;
const findIndex = R.findIndex;
const flatten = R.flatten;
const flip = R.flip;
const forEach = R.forEach;
const has = R.has;
const head = R.head;
const identity = R.identity;
const ifElse = R.ifElse;
const is$1 = R.is;
const isNil = R.isNil;
const includes = R.includes;
const indexBy = R.indexBy;
const indexOf = R.indexOf;
const init = R.init;
const join = R.join;
const lastIndexOf = R.lastIndexOf;
const last = R.last;
const length = R.length;
const map = R.map;
const match = R.match;
const merge = R.merge;
const modulo = R.modulo;
const multiply = R.multiply;
const none = R.none;
const not = R.not;
const omit = R.omit;
const partialCurry = R.partialCurry;
const path = R.path;
const pathOr = R.pathOr;
const pick = R.pick;
const pickAll = R.pickAll;
const pipe = R.pipe;
const pluck = R.pluck;
const prepend = R.prepend;
const prop = R.prop;
const propEq = R.propEq;
const range = R.range;
const reduce = R.reduce;
const reject = R.reject;
const repeat = R.repeat;
const replace = R.replace;
const reverse = R.reverse;
const sort = R.sort;
const sortBy = R.sortBy;
const split = R.split;
const splitEvery = R.splitEvery;
const startsWith = R.startsWith;
const subtract = R.subtract;
const T = R.T;
const tap = R.tap;
const tail = R.tail;
const take = R.take;
const takeLast = R.takeLast;
const test = R.test;
const times = R.times;
const toLower = R.toLower;
const toUpper = R.toUpper;
const toString = R.toString;
const trim = R.trim;
const type = R.type;
const uniq = R.uniq;
const uniqWith = R.uniqWith;
const update = R.update;
const values = R.values;
const without = R.without;

exports.DELAY = DELAY;
exports.add = add;
exports.addIndex = addIndex;
exports.adjust = adjust;
exports.all = all;
exports.allPass = allPass;
exports.anyPass = anyPass;
exports.always = always;
exports.any = any;
exports.append = append;
exports.both = both;
exports.complement = complement;
exports.compose = compose;
exports.concat = concat;
exports.contains = contains;
exports.curry = curry;
exports.dec = dec;
exports.defaultTo = defaultTo;
exports.dissoc = dissoc;
exports.divide = divide;
exports.drop = drop;
exports.dropLast = dropLast;
exports.either = either;
exports.endsWith = endsWith;
exports.inc = inc;
exports.equals = equals;
exports.F = F;
exports.filter = filter;
exports.find = find;
exports.findIndex = findIndex;
exports.flatten = flatten;
exports.flip = flip;
exports.forEach = forEach;
exports.has = has;
exports.head = head;
exports.identity = identity;
exports.ifElse = ifElse;
exports.is = is$1;
exports.isNil = isNil;
exports.includes = includes;
exports.indexBy = indexBy;
exports.indexOf = indexOf;
exports.init = init;
exports.join = join;
exports.lastIndexOf = lastIndexOf;
exports.last = last;
exports.length = length;
exports.map = map;
exports.match = match;
exports.merge = merge;
exports.modulo = modulo;
exports.multiply = multiply;
exports.none = none;
exports.not = not;
exports.omit = omit;
exports.partialCurry = partialCurry;
exports.path = path;
exports.pathOr = pathOr;
exports.pick = pick;
exports.pickAll = pickAll;
exports.pipe = pipe;
exports.pluck = pluck;
exports.prepend = prepend;
exports.prop = prop;
exports.propEq = propEq;
exports.range = range;
exports.reduce = reduce;
exports.reject = reject;
exports.repeat = repeat;
exports.replace = replace;
exports.reverse = reverse;
exports.sort = sort;
exports.sortBy = sortBy;
exports.split = split;
exports.splitEvery = splitEvery;
exports.startsWith = startsWith;
exports.subtract = subtract;
exports.T = T;
exports.tap = tap;
exports.tail = tail;
exports.take = take;
exports.takeLast = takeLast;
exports.test = test;
exports.times = times;
exports.toLower = toLower;
exports.toUpper = toUpper;
exports.toString = toString;
exports.trim = trim;
exports.type = type;
exports.uniq = uniq;
exports.uniqWith = uniqWith;
exports.update = update;
exports.values = values;
exports.without = without;
exports.assocPath = assocPath$1;
exports.compact = compact;
exports.composeAsync = composeAsync;
exports.debounce = debounce;
exports.delay = delay;
exports.debug = debug;
exports.evolve = evolve$1;
exports.greater = greater;
exports.ifElseAsync = ifElseAsync;
exports.inject = inject;
exports.isPromiseLike = isPromiseLike;
exports.isValid = isValid;
exports.less = less;
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
exports.switcher = switcher;
exports.tapAsync = tapAsync;
exports.throttle = throttle;
exports.when = when;
exports.where = where;
