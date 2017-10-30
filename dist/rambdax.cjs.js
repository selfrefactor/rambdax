'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var R = require('rambda');

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
  R.compose(R.map(prop$$1 => willReturn[prop$$1] = obj[prop$$1]), R.sort(sortFn))(Object.keys(obj));

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
  const prop$$1 = generateProp(fn, ...inputArguments);
  if (prop$$1 in cache) {
    return cache[prop$$1];
  }
  if (R.type(fn) === 'Async') {
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

    return R.curry(wrap);
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
    if (!(R.type(condition) === 'Async')) {
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
    if (asyncConditionsFlag === false && R.type(conditions[prop$$1]) === 'Async') {
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

      R.map(result => willReturn[result.type] = result.payload, results);

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

function tryCatch(fn, input) {
  const fnType = R.type(fn);
  if (fnType === 'Async' || fnType === 'Promise') {
    return new Promise(resolve => {
      fn(input).then(resolve).catch(resolve);
    });
  }

  try {
    return fn(input);
  } catch (err) {
    return err;
  }
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
const always$1 = R.always;
const complement$1 = R.complement;
const F$1 = R.F;
const identity$1 = R.identity;
const not$1 = R.not;
const T$1 = R.T;
const trim$1 = R.trim;
const add$1 = R.add;
const addIndex$1 = R.addIndex;
const adjust$1 = R.adjust;
const all$1 = R.all;
const allPass$1 = R.allPass;
const anyPass$1 = R.anyPass;
const any$1 = R.any;
const append$1 = R.append;
const both$1 = R.both;
const compose$1 = R.compose;
const concat$1 = R.concat;
const contains$1 = R.contains;
const curry$1 = R.curry;
const dec$1 = R.dec;
const defaultTo$1 = R.defaultTo;
const divide$1 = R.divide;
const drop$1 = R.drop;
const dropLast$1 = R.dropLast;
const either$1 = R.either;
const endsWith$1 = R.endsWith;
const inc$1 = R.inc;
const equals$1 = R.equals;
const filter$1 = R.filter;
const find$1 = R.find;
const findIndex$1 = R.findIndex;
const flatten$1 = R.flatten;
const flip$1 = R.flip;
const forEach$1 = R.forEach;
const has$1 = R.has;
const head$1 = R.head;
const ifElse$1 = R.ifElse;
const is$1 = R.is;
const isNil$1 = R.isNil;
const includes$1 = R.includes;
const indexOf$1 = R.indexOf;
const init$1 = R.init;
const join$1 = R.join;
const lastIndexOf$1 = R.lastIndexOf;
const last$1 = R.last;
const length$1 = R.length;
const map$1 = R.map;
const match$1 = R.match;
const merge$1 = R.merge;
const modulo$1 = R.modulo;
const multiply$1 = R.multiply;
const none$1 = R.none;
const omit$1 = R.omit;
const partialCurry$1 = R.partialCurry;
const path$1 = R.path;
const pathOr$1 = R.pathOr;
const pick$1 = R.pick;
const pickAll$1 = R.pickAll;
const pipe$1 = R.pipe;
const pluck$1 = R.pluck;
const prepend$1 = R.prepend;
const prop$1 = R.prop;
const propEq$1 = R.propEq;
const range$1 = R.range;
const reduce$1 = R.reduce;
const reject$1 = R.reject;
const repeat$1 = R.repeat;
const replace$1 = R.replace;
const reverse$1 = R.reverse;
const sort$1 = R.sort;
const sortBy$1 = R.sortBy;
const split$1 = R.split;
const splitEvery$1 = R.splitEvery;
const startsWith$1 = R.startsWith;
const subtract$1 = R.subtract;
const tap$1 = R.tap;
const tail$1 = R.tail;
const take$1 = R.take;
const takeLast$1 = R.takeLast;
const test$1 = R.test;
const times$1 = R.times;
const toLower$1 = R.toLower;
const toUpper$1 = R.toUpper;
const toString$1 = R.toString;
const type$1 = R.type;
const uniq$1 = R.uniq;
const update$1 = R.update;
const values$1 = R.values;
const without$1 = R.without;

exports.DELAY = DELAY;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isString = isString;
exports.isType = isType;
exports.always = always$1;
exports.complement = complement$1;
exports.F = F$1;
exports.identity = identity$1;
exports.not = not$1;
exports.T = T$1;
exports.trim = trim$1;
exports.add = add$1;
exports.addIndex = addIndex$1;
exports.adjust = adjust$1;
exports.all = all$1;
exports.allPass = allPass$1;
exports.anyPass = anyPass$1;
exports.any = any$1;
exports.append = append$1;
exports.both = both$1;
exports.compose = compose$1;
exports.concat = concat$1;
exports.contains = contains$1;
exports.curry = curry$1;
exports.dec = dec$1;
exports.defaultTo = defaultTo$1;
exports.divide = divide$1;
exports.drop = drop$1;
exports.dropLast = dropLast$1;
exports.either = either$1;
exports.endsWith = endsWith$1;
exports.inc = inc$1;
exports.equals = equals$1;
exports.filter = filter$1;
exports.find = find$1;
exports.findIndex = findIndex$1;
exports.flatten = flatten$1;
exports.flip = flip$1;
exports.forEach = forEach$1;
exports.has = has$1;
exports.head = head$1;
exports.ifElse = ifElse$1;
exports.is = is$1;
exports.isNil = isNil$1;
exports.includes = includes$1;
exports.indexOf = indexOf$1;
exports.init = init$1;
exports.join = join$1;
exports.lastIndexOf = lastIndexOf$1;
exports.last = last$1;
exports.length = length$1;
exports.map = map$1;
exports.match = match$1;
exports.merge = merge$1;
exports.modulo = modulo$1;
exports.multiply = multiply$1;
exports.none = none$1;
exports.omit = omit$1;
exports.partialCurry = partialCurry$1;
exports.path = path$1;
exports.pathOr = pathOr$1;
exports.pick = pick$1;
exports.pickAll = pickAll$1;
exports.pipe = pipe$1;
exports.pluck = pluck$1;
exports.prepend = prepend$1;
exports.prop = prop$1;
exports.propEq = propEq$1;
exports.range = range$1;
exports.reduce = reduce$1;
exports.reject = reject$1;
exports.repeat = repeat$1;
exports.replace = replace$1;
exports.reverse = reverse$1;
exports.sort = sort$1;
exports.sortBy = sortBy$1;
exports.split = split$1;
exports.splitEvery = splitEvery$1;
exports.startsWith = startsWith$1;
exports.subtract = subtract$1;
exports.tap = tap$1;
exports.tail = tail$1;
exports.take = take$1;
exports.takeLast = takeLast$1;
exports.test = test$1;
exports.times = times$1;
exports.toLower = toLower$1;
exports.toUpper = toUpper$1;
exports.toString = toString$1;
exports.type = type$1;
exports.uniq = uniq$1;
exports.update = update$1;
exports.values = values$1;
exports.without = without$1;
exports.compact = compact;
exports.composeAsync = composeAsync;
exports.debounce = debounce;
exports.delay = delay;
exports.debug = debug;
exports.evolve = evolve$1;
exports.greater = greater;
exports.ifElseAsync = ifElseAsync;
exports.intersection = intersection;
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
exports.tapAsync = tapAsync;
exports.throttle = throttle;
exports.tryCatch = tryCatch;
exports.when = when;
exports.where = where;
//# sourceMappingURL=rambdax.cjs.js.map
