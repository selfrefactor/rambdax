(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.R = {})));
}(this, (function (exports) { 'use strict';

function add$1(x, y) {
  if (y === undefined) {
    return yHolder => add$1(x, yHolder);
  }

  return x + y;
}

function addIndex$1(functor) {
  return function (fn, ...rest) {
    let cnt = 0;
    const newFn = (...args) => fn.apply(null, [...args, cnt++]);

    return functor.apply(null, [newFn, ...rest]);
  };
}

function adjust$1(fn, index, arr) {
  if (index === undefined) {
    return (indexHolder, arrHolder) => adjust$1(fn, indexHolder, arrHolder);
  } else if (arr === undefined) {
    return arrHolder => adjust$1(fn, index, arrHolder);
  }

  const clone = arr.concat();

  return clone.map((val, key) => {
    if (key === index) {
      return fn(arr[index]);
    }

    return val;
  });
}

function filterObject(fn, obj) {
  const willReturn = {};

  for (const prop in obj) {
    if (fn(obj[prop], prop)) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}

function filter$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => filter$1(fn, arrHolder);
  }

  if (arr.length === undefined) {
    return filterObject(fn, arr);
  }
  let index = -1;
  let resIndex = 0;
  const len = arr.length;
  const willReturn = [];

  while (++index < len) {
    const value = arr[index];

    if (fn(value)) {
      willReturn[resIndex++] = value;
    }
  }

  return willReturn;
}

function all$1(condition, arr) {
  if (arr === undefined) {
    return arrHolder => all$1(condition, arrHolder);
  }

  return filter$1(condition, arr).length === arr.length;
}

function any$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => any$1(fn, arrHolder);
  }
  let counter = 0;

  while (counter < arr.length) {
    if (fn(arr[counter])) {
      return true;
    }
    counter++;
  }

  return false;
}

function allPass$1(conditions, x) {
  if (arguments.length === 1) {
    return xHolder => allPass$1(conditions, xHolder);
  }

  return !any$1(condition => !condition(x), conditions);
}

function anyPass$1(conditions, x) {
  if (arguments.length === 1) {
    return xHolder => anyPass$1(conditions, xHolder);
  }

  return any$1(condition => condition(x))(conditions);
}

function append$1(x, arr) {
  if (arr === undefined) {
    return arrHolder => append$1(x, arrHolder);
  }
  if (typeof arr === 'string') {
    return `${arr}${x}`;
  }
  const clone = arr.concat();

  clone.push(x);

  return clone;
}

function both$1(x, y) {
  if (y === undefined) {
    return yHolder => both$1(x, yHolder);
  }

  return input => x(input) && y(input);
}

//Taken from https://github.com/getify/Functional-Light-JS/blob/master/ch4.md
function compose$1(...fns) {
  return result => {
    const list = fns.slice();

    while (list.length > 0) {
      result = list.pop()(result);
    }

    return result;
  };
}

function concat$1(x, y) {
  if (y === undefined) {
    return yHolder => concat$1(x, yHolder);
  }

  return typeof x === 'string' ? `${x}${y}` : [...x, ...y];
}

function type$1(a) {
  const typeOf = typeof a;

  if (a === null) {
    return 'Null';
  } else if (a === undefined) {
    return 'Undefined';
  } else if (typeOf === 'boolean') {
    return 'Boolean';
  } else if (typeOf === 'number') {
    return 'Number';
  } else if (typeOf === 'string') {
    return 'String';
  } else if (Array.isArray(a)) {
    return 'Array';
  } else if (a instanceof RegExp) {
    return 'RegExp';
  }

  const asStr = a.toString();

  if (asStr.startsWith('async')) {
    return 'Async';
  } else if (asStr === '[object Promise]') {
    return 'Promise';
  } else if (asStr.includes('function') || asStr.includes('=>')) {
    return 'Function';
  }

  return 'Object';
}

function equals$1(a, b) {
  if (arguments.length === 1) {
    return bHolder => equals$1(a, bHolder);
  }

  if (a === b) {
    return true;
  }
  const aType = type$1(a);

  if (aType !== type$1(b)) {
    return false;
  }

  if (aType === 'Array') {
    const aClone = Array.from(a);
    const bClone = Array.from(b);

    return aClone.sort().toString() === bClone.sort().toString();
  }

  if (aType === 'Object') {
    const aKeys = Object.keys(a);

    if (aKeys.length === Object.keys(b).length) {
      if (aKeys.length === 0) {
        return true;
      }
      let flag = true;

      aKeys.forEach(val => {
        if (flag) {
          const aValType = type$1(a[val]);
          const bValType = type$1(b[val]);

          if (aValType === bValType) {
            if (aValType === 'Object') {
              if (Object.keys(a[val]).length === Object.keys(b[val]).length) {
                if (Object.keys(a[val]).length !== 0) {
                  if (!equals$1(a[val], b[val])) {
                    flag = false;
                  }
                }
              } else {
                flag = false;
              }
            } else if (!equals$1(a[val], b[val])) {
              flag = false;
            }
          } else {
            flag = false;
          }
        }
      });

      return flag;
    }
  }

  return false;
}

function contains$1(x, arr) {
  if (arr === undefined) {
    return arrHolder => contains$1(x, arrHolder);
  }
  let index = -1;
  let flag = false;

  while (++index < arr.length && !flag) {
    if (equals$1(arr[index], x)) {
      flag = true;
    }
  }

  return flag;
}

//taken from the last comment of https://gist.github.com/mkuklis/5294248

function curry$1(f, a = []) {
  return (...p) => (o => o.length >= f.length ? f(...o) : curry$1(f, o))([...a, ...p]);
}

var dec$1 = (x => x - 1);

function defaultTo$1(defaultArgument, inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder => defaultTo$1(defaultArgument, inputArgumentHolder);
  }

  return inputArgument === undefined || inputArgument === null || Number.isNaN(inputArgument) === true ? defaultArgument : inputArgument;
}

function divide$1(x, y) {
  if (y === undefined) {
    return yHolder => divide$1(x, yHolder);
  }

  return x / y;
}

function drop$1(dropNumber, x) {
  if (x === undefined) {
    return xHolder => drop$1(dropNumber, xHolder);
  }

  return x.slice(dropNumber);
}

function dropLast$1(dropNumber, x) {
  if (x === undefined) {
    return xHolder => dropLast$1(dropNumber, xHolder);
  }

  return x.slice(0, -dropNumber);
}

function either$1(x, y) {
  if (y === undefined) {
    return yHolder => either$1(x, yHolder);
  }

  return input => x(input) || y(input);
}

function endsWith$1(x, y) {
  if (y === undefined) {
    return yHolder => endsWith$1(x, yHolder);
  }

  return y.endsWith(x);
}

var inc$1 = (x => x + 1);

function find$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => find$1(fn, arrHolder);
  }

  return arr.find(fn);
}

function findIndex$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => findIndex$1(fn, arrHolder);
  }
  const len = arr.length;
  let index = -1;

  while (++index < len) {
    if (fn(arr[index])) {
      return index;
    }
  }

  return -1;
}

function flatten$1(arr, willReturn) {
  willReturn = willReturn === undefined ? [] : willReturn;

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten$1(arr[i], willReturn);
    } else {
      willReturn.push(arr[i]);
    }
  }

  return willReturn;
}

function flipExport(fn) {
  return (...input) => {
    if (input.length === 1) {
      return holder => fn(holder, input[0]);
    } else if (input.length === 2) {
      return fn(input[1], input[0]);
    }

    return undefined;
  };
}

function flip$1(fn, ...input) {
  return flipExport(fn);
}

function tap$1(fn, x) {
  if (x === undefined) {
    return xHolder => tap$1(fn, xHolder);
  }

  fn(x);

  return x;
}

function mapObject(fn, obj) {
  const willReturn = {};

  for (const prop in obj) {
    willReturn[prop] = fn(obj[prop], prop);
  }

  return willReturn;
}

function map$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => map$1(fn, arrHolder);
  }
  if (arr.length === undefined) {
    return mapObject(fn, arr);
  }
  let index = -1;
  const len = arr.length;
  const willReturn = Array(len);

  while (++index < len) {
    willReturn[index] = fn(arr[index]);
  }

  return willReturn;
}

function forEach$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => forEach$1(fn, arrHolder);
  }

  return map$1(tap$1(fn), arr);
}

function has$1(prop, obj) {
  if (obj === undefined) {
    return objHolder => has$1(prop, objHolder);
  }

  return obj[prop] !== undefined;
}

function head$1(a) {
  if (typeof a === 'string') {
    return a[0] || '';
  }

  return a[0];
}

function ifElse$1(condition, ifFn, elseFn) {
  if (ifFn === undefined) {
    return (ifFnHolder, elseFnHolder) => ifElse$1(condition, ifFnHolder, elseFnHolder);
  } else if (elseFn === undefined) {
    return elseFnHolder => ifElse$1(condition, ifFn, elseFnHolder);
  }

  return input => {
    const conditionResult = typeof condition === 'boolean' ? condition : condition(input);

    if (conditionResult === true) {
      return ifFn(input);
    }

    return elseFn(input);
  };
}

function is$1(xPrototype, x) {
  if (x === undefined) {
    return xHolder => is$1(xPrototype, xHolder);
  }

  return x instanceof xPrototype || x.constructor === xPrototype;
}

function isNil$1(x) {
  return x === undefined || x === null;
}

function includes$1(x, y) {
  if (y === undefined) {
    return yHolder => includes$1(x, yHolder);
  }

  return y.includes(x);
}

function indexOf$1(x, arr) {
  if (arr === undefined) {
    return arrHolder => indexOf$1(x, arrHolder);
  }
  let index = -1;
  const length = arr.length;

  while (++index < length) {
    if (arr[index] === x) {
      return index;
    }
  }

  return -1;
}

function baseSlice(array, start, end) {
  let index = -1;
  let length = array.length;

  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  const result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

function init$1(a) {
  if (typeof a === 'string') {
    return a.slice(0, -1);
  }

  return a.length ? baseSlice(a, 0, -1) : [];
}

function join$1(glue, arr) {
  if (arr === undefined) {
    return arrHolder => join$1(glue, arrHolder);
  }

  return arr.join(glue);
}

function lastIndexOf$1(x, arr) {
  if (arr === undefined) {
    return arrHolder => lastIndexOf$1(x, arrHolder);
  }
  let willReturn = -1;

  arr.map((value, key) => {
    if (equals$1(value, x)) {
      willReturn = key;
    }
  });

  return willReturn;
}

function last$1(a) {
  if (typeof a === 'string') {
    return a[a.length - 1] || '';
  }

  return a[a.length - 1];
}

function length$1(x) {
  return x.length;
}

function match$1(regex, x) {
  if (x === undefined) {
    return xHolder => match$1(regex, xHolder);
  }
  const willReturn = x.match(regex);

  return willReturn === null ? [] : willReturn;
}

function merge$1(obj, newProps) {
  if (newProps === undefined) {
    return newPropsHolder => merge$1(obj, newPropsHolder);
  }

  return Object.assign({}, obj, newProps);
}

function modulo$1(x, y) {
  if (y === undefined) {
    return yHolder => modulo$1(x, yHolder);
  }

  return x % y;
}

function multiply$1(x, y) {
  if (y === undefined) {
    return yHolder => multiply$1(x, yHolder);
  }

  return x * y;
}

function none$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => none$1(fn, arr);
  }

  return arr.filter(fn).length === 0;
}

function omit$1(keys, obj) {
  if (arguments.length === 1) {
    return objHolder => omit$1(keys, objHolder);
  }
  if (obj === null || obj === undefined) {
    return undefined;
  }

  const keysValue = typeof keys === 'string' ? keys = keys.split(',') : keys;

  const willReturn = {};

  for (const key in obj) {
    if (!keysValue.includes(key)) {
      willReturn[key] = obj[key];
    }
  }

  return willReturn;
}

function partialCurry$1(fn, inputArguments = {}) {
  return inputArgumentsHolder => {
    if (type$1(fn) === 'Async' || type$1(fn) === 'Promise') {
      return new Promise((resolve, reject) => {
        fn(merge$1(inputArgumentsHolder, inputArguments)).then(resolve).catch(reject);
      });
    }

    return fn(merge$1(inputArgumentsHolder, inputArguments));
  };
}

function path$1(pathArr, obj) {
  if (arguments.length === 1) {
    return objHolder => path$1(pathArr, objHolder);
  }
  if (obj === null || obj === undefined) {
    return undefined;
  }
  let willReturn = obj;
  let counter = 0;

  const pathArrValue = typeof pathArr === 'string' ? pathArr = pathArr.split('.') : pathArr;

  while (counter < pathArrValue.length) {
    if (willReturn === null || willReturn === undefined) {
      return undefined;
    }
    willReturn = willReturn[pathArrValue[counter]];
    counter++;
  }

  return willReturn;
}

function pathOr$1(defaultValue, inputPath, inputObject) {
  return defaultTo$1(defaultValue, path$1(inputPath, inputObject));
}

var pathOr$1$1 = curry$1(pathOr$1);

function pick$1(keys, obj) {
  if (arguments.length === 1) {
    return objHolder => pick$1(keys, objHolder);
  }
  if (obj === null || obj === undefined) {
    return undefined;
  }
  const keysValue = typeof keys === 'string' ? keys.split(',') : keys;

  const willReturn = {};
  let counter = 0;

  while (counter < keysValue.length) {
    if (keysValue[counter] in obj) {
      willReturn[keysValue[counter]] = obj[keysValue[counter]];
    }
    counter++;
  }

  return willReturn;
}

function pickAll$1(keys, obj) {
  if (arguments.length === 1) {
    return objHolder => pickAll$1(keys, objHolder);
  }
  if (obj === null || obj === undefined) {
    return undefined;
  }
  const keysValue = typeof keys === 'string' ? keys.split(',') : keys;

  const willReturn = {};
  let counter = 0;

  while (counter < keysValue.length) {
    if (keysValue[counter] in obj) {
      willReturn[keysValue[counter]] = obj[keysValue[counter]];
    } else {
      willReturn[keysValue[counter]] = undefined;
    }
    counter++;
  }

  return willReturn;
}

function pipe$1(...fns) {
  return compose$1(...fns.reverse());
}

function pluck$1(keyToPluck, arr) {
  if (arr === undefined) {
    return arrHolder => pluck$1(keyToPluck, arrHolder);
  }
  const willReturn = [];

  map$1(val => {
    if (!(val[keyToPluck] === undefined)) {
      willReturn.push(val[keyToPluck]);
    }
  }, arr);

  return willReturn;
}

function prepend$1(x, arr) {
  if (arr === undefined) {
    return arrHolder => prepend$1(x, arrHolder);
  }
  if (typeof arr === 'string') {
    return `${x}${arr}`;
  }
  const clone = arr.concat();

  clone.unshift(x);

  return clone;
}

function prop$1(key, obj) {
  if (obj === undefined) {
    return objHolder => prop$1(key, objHolder);
  }

  return obj[key];
}

function propEq$1(key, x, obj) {
  if (x === undefined) {
    return (xHolder, objHolder) => propEq$1(key, xHolder, objHolder);
  } else if (obj === undefined) {
    return objHolder => propEq$1(key, x, objHolder);
  }

  return obj[key] === x;
}

function range$1(start, end) {
  if (end === undefined) {
    return endHolder => range$1(start, endHolder);
  }
  const willReturn = [];

  for (let i = start; i < end; i++) {
    willReturn.push(i);
  }

  return willReturn;
}

function reduce$1(fn, initialValue, arr) {
  if (initialValue === undefined) {
    return (initialValueHolder, arrHolder) => reduce$1(fn, initialValueHolder, arrHolder);
  } else if (arr === undefined) {
    return arrHolder => reduce$1(fn, initialValue, arrHolder);
  }

  return arr.reduce(fn, initialValue);
}

function reject$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => reject$1(fn, arrHolder);
  }

  return filter$1(x => !fn(x), arr);
}

function repeat$1(x, num) {
  if (num === undefined) {
    return numHolder => repeat$1(x, numHolder);
  }
  const willReturn = Array(num);

  return willReturn.fill(x);
}

function replace$1(regex, replacer, str) {
  if (replacer === undefined) {
    return (replacerHolder, strHolder) => replace$1(regex, replacerHolder, strHolder);
  } else if (str === undefined) {
    return strHolder => replace$1(regex, replacer, strHolder);
  }

  return str.replace(regex, replacer);
}

function reverse$1(arr) {
  const clone = arr.concat();

  return clone.reverse();
}

function sort$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => sort$1(fn, arrHolder);
  }
  const arrClone = arr.concat();

  return arrClone.sort(fn);
}

function sortBy$1(fn, arr) {
  if (arr === undefined) {
    return arrHolder => sortBy$1(fn, arrHolder);
  }
  const arrClone = arr.concat();

  return arrClone.sort((a, b) => {
    const fnA = fn(a);
    const fnB = fn(b);

    return fnA < fnB ? -1 : fnA > fnB ? 1 : 0;
  });
}

function split$1(glue, str) {
  if (str === undefined) {
    return strHolder => split$1(glue, strHolder);
  }

  return str.split(glue);
}

function splitEvery$1(num, x) {
  if (x === undefined) {
    return xHolder => splitEvery$1(num, xHolder);
  }

  const numValue = num > 1 ? num : 1;

  const willReturn = [];
  let counter = 0;

  while (counter < x.length) {
    willReturn.push(x.slice(counter, counter += numValue));
  }

  return willReturn;
}

function startsWith$1(x, y) {
  if (y === undefined) {
    return yHolder => startsWith$1(x, yHolder);
  }

  return y.startsWith(x);
}

function subtract$1(x, y) {
  if (y === undefined) {
    return yHolder => subtract$1(x, yHolder);
  }

  return x - y;
}

function tail$1(arr) {
  return drop$1(1, arr);
}

function take$1(num, x) {
  if (x === undefined) {
    return xHolder => take$1(num, xHolder);
  }
  if (typeof x === 'string') {
    return x.slice(0, num);
  }

  return baseSlice(x, 0, num);
}

function takeLast$1(num, x) {
  if (x === undefined) {
    return xHolder => takeLast$1(num, xHolder);
  }
  const len = x.length;

  let numValue = num > len ? len : num;

  if (typeof x === 'string') {
    return x.slice(len - numValue);
  }
  numValue = len - numValue;

  return baseSlice(x, numValue, len);
}

function test$1(regex, str) {
  if (str === undefined) {
    return strHolder => test$1(regex, strHolder);
  }

  return str.search(regex) !== -1;
}

function times$1(fn, num) {
  if (num === undefined) {
    return numHolder => times$1(fn, numHolder);
  }

  return map$1(fn, range$1(0, num));
}

function toLower$1(x) {
  return x.toLowerCase();
}

function toUpper$1(x) {
  return x.toUpperCase();
}

function toString$1(x) {
  return x.toString();
}

function uniq$1(arr) {
  let index = -1;
  const willReturn = [];

  while (++index < arr.length) {
    const value = arr[index];

    if (!contains$1(value, willReturn)) {
      willReturn.push(value);
    }
  }

  return willReturn;
}

function uniqWith$1(fn, arr) {
  if (arguments.length === 1) {
    return arrHolder => uniqWith$1(fn, arrHolder);
  }

  let index = -1;
  const willReturn = [];

  while (++index < arr.length) {
    const value = arr[index];
    const flag = any$1(willReturnInstance => fn(value, willReturnInstance), willReturn);

    if (!flag) {
      willReturn.push(value);
    }
  }

  return willReturn;
}

function update$1(index, newValue, arr) {
  if (newValue === undefined) {
    return (newValueHolder, arrHolder) => update$1(index, newValueHolder, arrHolder);
  } else if (arr === undefined) {
    return arrHolder => update$1(index, newValue, arrHolder);
  }
  const arrClone = arr.concat();

  return arrClone.fill(newValue, index, index + 1);
}

function values$1(obj) {
  const willReturn = [];

  for (const key in obj) {
    willReturn.push(obj[key]);
  }

  return willReturn;
}

function without$1(itemsToOmit, collection) {
  return reduce$1((accum, item) => !contains$1(item, itemsToOmit) ? accum.concat(item) : accum, [], collection);
}

const always$1 = x => () => x;
const complement$1 = fn => input => !fn(input);
const F$1 = () => false;
const identity$1 = x => x;
const not$1 = x => !x;
const T$1 = () => true;
const trim$1 = x => x.trim();

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

var assocPath$1 = curry$1(assocPath);

const types = ['Null', 'Undefined', 'RegExp'];

function compact(arr) {
  return filter$1(a => {
    const currentType = type$1(a);
    if (types.includes(currentType)) {
      return false;
    }
    if (currentType === 'Object') {
      return !equals$1(a, {});
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
        if (type$1(fn) === 'Async' || type$1(fn) === 'Promise') {
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

function intersection(a, b) {
  if (b === undefined) {
    return bHolder => intersection(a, bHolder);
  }

  return filter$1(val => b.includes(val))(a);
}

const { type: type$3 } = require('rambda');

function isPromiseLike(x) {
  return ['Async', 'Promise'].includes(type$3(x));
}

function isValid({ input, schema }) {
  if (type$1(input) === 'Object' && type$1(schema) === 'Object') {
    let flag = true;
    for (const requirement in schema) {
      if (flag) {
        const rule = schema[requirement];
        const ruleType = type$1(rule);
        const inputProp = input[requirement];
        const inputPropType = type$1(input[requirement]);

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
            if (toLower$1(inputPropType) !== rule) {
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
          if (!contains$1(inputProp, rule)) {
            flag = false;
          }
        } else if (ruleType === 'Array' && inputPropType === 'Array' && rule.length === 1 && inputProp.length > 0) {
          const arrayRuleType = type$1(rule[0]);

          if (arrayRuleType === 'String') {
            const result = any$1(val => toLower$1(type$1(val)) !== rule[0], inputProp);

            if (result) {
              flag = false;
            }
          } else if (arrayRuleType === 'Object') {
            const result = any$1(val => !isValid(val, rule[0]))(inputProp);
            if (result) {
              flag = false;
            }
          }
        } else if (ruleType === 'RegExp' && inputPropType === 'String') {
          if (!test$1(rule, inputProp)) {
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
  compose$1(map$1(prop => willReturn[prop] = obj[prop]), sort$1(sortFn))(Object.keys(obj));

  return willReturn;
};

const stringify = a => {
  if (type$1(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(type$1(a))) {
    const compacted = replace$1(/\s{1,}/g, ' ', a.toString());

    return replace$1(/\s/g, '_', take$1(15, compacted));
  } else if (type$1(a) === 'Object') {
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
  if (type$1(fn) === 'Async') {
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
  map$1(val => {
    willReturn = merge$1(willReturn, val);
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

    return curry$1(wrap);
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
    if (!(type$1(condition) === 'Async')) {
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
    if (asyncConditionsFlag === false && type$1(conditions[prop]) === 'Async') {
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

      map$1(result => willReturn[result.type] = result.payload, results);

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
    const loopIndexes = range$1(0, Math.floor((endNum - startNum) / distance));
    for (const i of loopIndexes) {
      valueToPush += distance;
      willReturn.push(valueToPush);
    }
  } else {
    const decimalLength = compose$1(length$1, last$1, split$1('.'))(distance.toString());
    const loopIndexes = range$1(0, Math.floor((endNum - startNum) / distance));
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

  return merge$1(renamed, omit$1(Object.keys(conditions), inputObject));
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
    const promised = map$1(a => resolveSecureWrapper(a), input);

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
  const willReturn = typeof testValue === 'function' ? testValue(matchValue) : equals$1(testValue, matchValue);

  return willReturn;
};

const is$2 = (testValue, matchResult = true) => ({
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
    return new Switchem(this.defaultValue, [...this.cases, is$2(testValue, matchResult)], this.willMatch);
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

function tryCatch(fn, input) {
  const fnType = type$1(fn);
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
const always = always$1;
const complement = complement$1;
const F = F$1;
const identity = identity$1;
const not = not$1;
const T = T$1;
const trim = trim$1;
const add = add$1;
const addIndex = addIndex$1;
const adjust = adjust$1;
const all = all$1;
const allPass = allPass$1;
const anyPass = anyPass$1;
const any = any$1;
const append = append$1;
const both = both$1;
const compose = compose$1;
const concat = concat$1;
const contains = contains$1;
const curry = curry$1;
const dec = dec$1;
const defaultTo = defaultTo$1;
const divide = divide$1;
const drop = drop$1;
const dropLast = dropLast$1;
const either = either$1;
const endsWith = endsWith$1;
const inc = inc$1;
const equals = equals$1;
const filter = filter$1;
const find = find$1;
const findIndex = findIndex$1;
const flatten = flatten$1;
const flip = flip$1;
const forEach = forEach$1;
const has = has$1;
const head = head$1;
const ifElse = ifElse$1;
const is = is$1;
const isNil = isNil$1;
const includes = includes$1;
const indexOf = indexOf$1;
const init = init$1;
const join = join$1;
const lastIndexOf = lastIndexOf$1;
const last = last$1;
const length = length$1;
const map = map$1;
const match = match$1;
const merge = merge$1;
const modulo = modulo$1;
const multiply = multiply$1;
const none = none$1;
const omit = omit$1;
const partialCurry = partialCurry$1;
const path = path$1;
const pathOr = pathOr$1$1;
const pick = pick$1;
const pickAll = pickAll$1;
const pipe = pipe$1;
const pluck = pluck$1;
const prepend = prepend$1;
const prop = prop$1;
const propEq = propEq$1;
const range = range$1;
const reduce = reduce$1;
const reject = reject$1;
const repeat = repeat$1;
const replace = replace$1;
const reverse = reverse$1;
const sort = sort$1;
const sortBy = sortBy$1;
const split = split$1;
const splitEvery = splitEvery$1;
const startsWith = startsWith$1;
const subtract = subtract$1;
const tap = tap$1;
const tail = tail$1;
const take = take$1;
const takeLast = takeLast$1;
const test = test$1;
const times = times$1;
const toLower = toLower$1;
const toUpper = toUpper$1;
const toString = toString$1;
const type = type$1;
const uniq = uniq$1;
const uniqWith = uniqWith$1;
const update = update$1;
const values = values$1;
const without = without$1;

exports.DELAY = DELAY;
exports.always = always;
exports.complement = complement;
exports.F = F;
exports.identity = identity;
exports.not = not;
exports.T = T;
exports.trim = trim;
exports.add = add;
exports.addIndex = addIndex;
exports.adjust = adjust;
exports.all = all;
exports.allPass = allPass;
exports.anyPass = anyPass;
exports.any = any;
exports.append = append;
exports.both = both;
exports.compose = compose;
exports.concat = concat;
exports.contains = contains;
exports.curry = curry;
exports.dec = dec;
exports.defaultTo = defaultTo;
exports.divide = divide;
exports.drop = drop;
exports.dropLast = dropLast;
exports.either = either;
exports.endsWith = endsWith;
exports.inc = inc;
exports.equals = equals;
exports.filter = filter;
exports.find = find;
exports.findIndex = findIndex;
exports.flatten = flatten;
exports.flip = flip;
exports.forEach = forEach;
exports.has = has;
exports.head = head;
exports.ifElse = ifElse;
exports.is = is;
exports.isNil = isNil;
exports.includes = includes;
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
exports.tap = tap;
exports.tail = tail;
exports.take = take;
exports.takeLast = takeLast;
exports.test = test;
exports.times = times;
exports.toLower = toLower;
exports.toUpper = toUpper;
exports.toString = toString;
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
exports.switcher = switcher;
exports.tapAsync = tapAsync;
exports.throttle = throttle;
exports.tryCatch = tryCatch;
exports.when = when;
exports.where = where;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rambdax.umd.js.map
