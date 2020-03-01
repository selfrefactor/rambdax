(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.R = {}));
}(this, (function (exports) { 'use strict';

  function type(input) {
    const typeOf = typeof input;

    if (input === null) {
      return 'Null';
    } else if (input === undefined) {
      return 'Undefined';
    } else if (typeOf === 'boolean') {
      return 'Boolean';
    } else if (typeOf === 'number') {
      return Number.isNaN(input) ? 'NaN' : 'Number';
    } else if (typeOf === 'string') {
      return 'String';
    } else if (Array.isArray(input)) {
      return 'Array';
    } else if (input instanceof RegExp) {
      return 'RegExp';
    }

    const asStr = input && input.toString ? input.toString() : '';
    if (['true', 'false'].includes(asStr)) return 'Boolean';
    if (!Number.isNaN(Number(asStr))) return 'Number';
    if (asStr.startsWith('async')) return 'Async';
    if (asStr === '[object Promise]') return 'Promise';
    if (typeOf === 'function') return 'Function';
    if (input instanceof String) return 'String';
    return 'Object';
  }

  function isTruthy(x) {
    if (Array.isArray(x)) {
      return x.length > 0;
    }

    if (type(x) === 'Object') {
      return Object.keys(x).length > 0;
    }

    return Boolean(x);
  }

  function allFalse(...inputs) {
    let counter = 0;

    while (counter < inputs.length) {
      const x = inputs[counter];

      if (type(x) === 'Function') {
        if (isTruthy(x())) {
          return false;
        }
      } else if (isTruthy(x)) {
        return false;
      }

      counter++;
    }

    return true;
  }

  function isFalsy(x) {
    if (Array.isArray(x)) {
      return x.length === 0;
    }

    if (type(x) === 'Object') {
      return Object.keys(x).length === 0;
    }

    return !x;
  }

  function allTrue(...inputs) {
    let counter = 0;

    while (counter < inputs.length) {
      const x = inputs[counter];

      if (type(x) === 'Function') {
        if (isFalsy(x())) {
          return false;
        }
      } else if (isFalsy(x)) {
        return false;
      }

      counter++;
    }

    return true;
  }

  function allType(targetType) {
    return (...inputs) => {
      let counter = 0;

      while (counter < inputs.length) {
        if (type(inputs[counter]) !== targetType) {
          return false;
        }

        counter++;
      }

      return true;
    };
  }

  function anyFalse(...inputs) {
    let counter = 0;

    while (counter < inputs.length) {
      if (isFalsy(inputs[counter])) {
        return true;
      }

      counter++;
    }

    return false;
  }

  function anyTrue(...inputs) {
    let counter = 0;

    while (counter < inputs.length) {
      if (isTruthy(inputs[counter])) {
        return true;
      }

      counter++;
    }

    return false;
  }

  function anyType(targetType) {
    return (...inputs) => {
      let counter = 0;

      while (counter < inputs.length) {
        if (type(inputs[counter]) === targetType) {
          return true;
        }

        counter++;
      }

      return false;
    };
  }

  const FUNC_ERROR_TEXT = 'Expected a function';
  const HASH_UNDEFINED = '__lodash_hash_undefined__';
  const INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991;
  const funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        symbolTag = '[object Symbol]';
  const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        reLeadingDot = /^\./,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  const reEscapeChar = /\\(\\)?/g;
  const reIsHostCtor = /^\[object .+?Constructor\]$/;
  const reIsUint = /^(?:0|[1-9]\d*)$/;
  const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
  const freeSelf = typeof self === 'object' && self && self.Object === Object && self;
  const root = freeGlobal || freeSelf || Function('return this')();

  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  function isHostObject(value) {
    let result = false;

    if (value != null && typeof value.toString !== 'function') {
      try {
        result = Boolean(String(value));
      } catch (e) {}
    }

    return result;
  }

  const arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
  const coreJsData = root['__core-js_shared__'];

  const maskSrcKey = function () {
    const uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();

  const funcToString = funcProto.toString;
  const {
    hasOwnProperty
  } = objectProto;
  const objectToString = objectProto.toString;
  const reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  const {
    Symbol: Symbol$1
  } = root,
        {
    splice
  } = arrayProto;
  const Map = getNative(root, 'Map'),
        nativeCreate = getNative(Object, 'create');
  const symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

  function Hash(entries) {
    let index = -1,
        length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }

  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  function hashGet(key) {
    const data = this.__data__;

    if (nativeCreate) {
      const result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  function hashHas(key) {
    const data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }

  function hashSet(key, value) {
    const data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }

  Hash.prototype.clear = hashClear;
  Hash.prototype.delete = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  function ListCache(entries) {
    let index = -1;
    const length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  function listCacheClear() {
    this.__data__ = [];
  }

  function listCacheDelete(key) {
    const data = this.__data__,
          index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    const lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    return true;
  }

  function listCacheGet(key) {
    const data = this.__data__,
          index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  function listCacheSet(key, value) {
    const data = this.__data__,
          index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype.delete = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  function MapCache(entries) {
    let index = -1;
    const length = entries ? entries.length : 0;
    this.clear();

    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map || ListCache)(),
      string: new Hash()
    };
  }

  function mapCacheDelete(key) {
    return getMapData(this, key).delete(key);
  }

  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }

  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype.delete = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  function assignValue(object, key, value) {
    const objValue = object[key];

    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
      object[key] = value;
    }
  }

  function assocIndexOf(array, key) {
    let {
      length
    } = array;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    const pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }

    path = isKey(path, object) ? [path] : castPath(path);
    let index = -1;
    let nested = object;
    const {
      length
    } = path;
    const lastIndex = length - 1;

    while (nested != null && ++index < length) {
      let key = toKey(path[index]),
          newValue = value;

      if (index != lastIndex) {
        const objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;

        if (newValue === undefined) {
          newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
        }
      }

      assignValue(nested, key, newValue);
      nested = nested[key];
    }

    return object;
  }

  function baseToString(value) {
    if (typeof value === 'string') {
      return value;
    }

    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }

    const result = String(value);
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
  }

  function getMapData(map, key) {
    const data = map.__data__;
    return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
  }

  function getNative(object, key) {
    const value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return Boolean(length) && (typeof value === 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }

    const type = typeof value;

    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
      return true;
    }

    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  function isKeyable(value) {
    const type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  function isMasked(func) {
    return Boolean(maskSrcKey) && maskSrcKey in func;
  }

  var stringToPath = memoize(string => {
    string = toString(string);
    const result = [];

    if (reLeadingDot.test(string)) {
      result.push('');
    }

    string.replace(rePropName, (match, number, quote, string) => {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });

  function toKey(value) {
    if (typeof value === 'string' || isSymbol(value)) {
      return value;
    }

    const result = String(value);
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return String(func);
      } catch (e) {}
    }

    return '';
  }

  function memoize(func, resolver) {
    if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    var memoized = function () {
      const args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            {
        cache
      } = memoized;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };

    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }

  memoize.Cache = MapCache;

  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  var {
    isArray
  } = Array;

  function isFunction(value) {
    const tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  function isObject(value) {
    const type = typeof value;
    return Boolean(value) && (type == 'object' || type == 'function');
  }

  function isObjectLike(value) {
    return Boolean(value) && typeof value === 'object';
  }

  function isSymbol(value) {
    return typeof value === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }

  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
  }

  function whenObject(predicate, input) {
    const yes = {};
    const no = {};
    Object.entries(input).forEach(([prop, value]) => {
      if (predicate(value, prop)) {
        yes[prop] = value;
      } else {
        no[prop] = value;
      }
    });
    return [yes, no];
  }

  function partition(predicate, input) {
    if (arguments.length === 1) {
      return listHolder => partition(predicate, listHolder);
    }

    if (!Array.isArray(input)) return whenObject(predicate, input);
    const yes = [];
    const no = [];
    let counter = -1;

    while (counter++ < input.length - 1) {
      if (predicate(input[counter], counter)) {
        yes.push(input[counter]);
      } else {
        no.push(input[counter]);
      }
    }

    return [yes, no];
  }

  const isObject$1 = x => {
    const ok = x !== null && !Array.isArray(x) && typeof x === 'object';

    if (!ok) {
      return false;
    }

    return Object.keys(x).length > 0;
  };

  function change(origin, pathRaw, rules) {
    const willReturn = JSON.parse(JSON.stringify(origin));

    if (!isObject$1(rules)) {
      set(willReturn, pathRaw, rules);
      return willReturn;
    }

    const path = pathRaw === '' ? '' : `${pathRaw}.`;

    for (const ruleKey of Object.keys(rules)) {
      const rule = rules[ruleKey];

      if (!isObject$1(rule)) {
        set(willReturn, `${path}${ruleKey}`, rule);
        continue;
      }

      const [withObjects, withoutObjects] = partition(subruleKey => isObject$1(rule[subruleKey]), Object.keys(rule));
      withoutObjects.forEach(subruleKey => {
        const subrule = rule[subruleKey];
        set(willReturn, `${path}${ruleKey}.${subruleKey}`, subrule);
      });
      withObjects.forEach(subruleKey => {
        const subrule = rule[subruleKey];
        Object.keys(subrule).forEach(deepKey => {
          const deep = rule[subruleKey][deepKey];

          if (!isObject$1(deep)) {
            return set(willReturn, `${path}${ruleKey}.${subruleKey}.${deepKey}`, deep);
          }

          Object.keys(deep).forEach(superDeepKey => {
            const superDeep = rule[subruleKey][deepKey][superDeepKey];
            set(willReturn, `${path}${ruleKey}.${subruleKey}.${deepKey}.${superDeepKey}`, superDeep);
          });
        });
      });
    }

    return willReturn;
  }

  function parseError(maybeError) {
    const typeofError = maybeError.__proto__.toString();

    if (!['Error', 'TypeError'].includes(typeofError)) return [];
    return [typeofError, maybeError.message];
  }

  function parseDate(maybeDate) {
    if (!maybeDate.toDateString) return [false];
    return [true, maybeDate.getTime()];
  }

  function parseRegex(maybeRegex) {
    if (maybeRegex.constructor !== RegExp) return [false];
    return [true, maybeRegex.toString()];
  }

  function equals(a, b) {
    if (arguments.length === 1) return _b => equals(a, _b);
    const aType = type(a);
    if (aType !== type(b)) return false;
    if (['NaN', 'Undefined', 'Null'].includes(aType)) return true;
    if (['Boolean', 'Number', 'String'].includes(aType)) return a.toString() === b.toString();

    if (aType === 'Array') {
      const aClone = Array.from(a);
      const bClone = Array.from(b);

      if (aClone.toString() !== bClone.toString()) {
        return false;
      }

      let loopArrayFlag = true;
      aClone.forEach((aCloneInstance, aCloneIndex) => {
        if (loopArrayFlag) {
          if (aCloneInstance !== bClone[aCloneIndex] && !equals(aCloneInstance, bClone[aCloneIndex])) {
            loopArrayFlag = false;
          }
        }
      });
      return loopArrayFlag;
    }

    const aRegex = parseRegex(a);
    const bRegex = parseRegex(b);

    if (aRegex[0]) {
      return bRegex[0] ? aRegex[1] === bRegex[1] : false;
    } else if (bRegex[0]) return false;

    const aDate = parseDate(a);
    const bDate = parseDate(b);

    if (aDate[0]) {
      return bDate[0] ? aDate[1] === bDate[1] : false;
    } else if (bDate[0]) return false;

    const aError = parseError(a);
    const bError = parseError(b);

    if (aError[0]) {
      return bError[0] ? aError[0] === bError[0] && aError[1] === bError[1] : false;
    }

    if (aType === 'Object') {
      const aKeys = Object.keys(a);

      if (aKeys.length !== Object.keys(b).length) {
        return false;
      }

      let loopObjectFlag = true;
      aKeys.forEach(aKeyInstance => {
        if (loopObjectFlag) {
          const aValue = a[aKeyInstance];
          const bValue = b[aKeyInstance];

          if (aValue !== bValue && !equals(aValue, bValue)) {
            loopObjectFlag = false;
          }
        }
      });
      return loopObjectFlag;
    }

    return false;
  }

  const forbidden = ['Null', 'Undefined', 'RegExp'];
  const allowed = ['Number', 'Boolean'];
  const notEmpty = ['Array', 'String'];
  function compact(arr) {
    const willReturn = [];
    arr.forEach(a => {
      const currentType = type(a);
      if (forbidden.includes(currentType)) return;
      if (allowed.includes(currentType)) return willReturn.push(a);

      if (currentType === 'Object') {
        if (!equals(a, {})) willReturn.push(a);
        return;
      }

      if (!notEmpty.includes(currentType)) return;
      if (a.length === 0) return;
      willReturn.push(a);
    });
    return willReturn;
  }

  function composeAsync(...inputArguments) {
    return async function (startArgument) {
      let argumentsToPass = startArgument;

      while (inputArguments.length !== 0) {
        const fn = inputArguments.pop();
        const typeFn = type(fn);

        if (typeFn === 'Async') {
          argumentsToPass = await fn(argumentsToPass);
        } else {
          argumentsToPass = fn(argumentsToPass);
        }
      }

      return argumentsToPass;
    };
  }

  function compose(...fns) {
    if (fns.length === 0) {
      throw new Error('compose requires at least one argument');
    }

    return (...args) => {
      const list = fns.slice();

      if (list.length > 0) {
        const fn = list.pop();
        let result = fn(...args);

        while (list.length > 0) {
          result = list.pop()(result);
        }

        return result;
      }
    };
  }

  function last(list) {
    if (typeof list === 'string') return list[list.length - 1] || '';
    return list[list.length - 1];
  }

  function baseSlice(array, start, end) {
    let index = -1;
    let {
      length
    } = array;
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

  function init(list) {
    if (typeof list === 'string') return list.slice(0, -1);
    return list.length ? baseSlice(list, 0, -1) : [];
  }

  function composed(...inputs) {
    return compose(...init(inputs))(last(inputs));
  }

  function count(target, list) {
    if (arguments.length === 1) {
      return listHolder => count(target, listHolder);
    }

    if (!Array.isArray(list)) return 0;
    return list.filter(x => equals(x, target)).length;
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

  function flagIs(targetType, input) {
    if (!input) return false;
    if (type(input) !== targetType) return false;
    if (targetType === 'Array') return !equals([], input);
    if (targetType === 'Object') return !equals({}, input);
    return true;
  }

  function defaultToStrict(defaultArgument, ...inputArguments) {
    if (arguments.length === 1) {
      return inputArgumentsHolder => defaultToStrict(defaultArgument, inputArgumentsHolder);
    }

    if (arguments.length === 2) {
      return flagIs(type(defaultArgument), inputArguments[0]) ? inputArguments[0] : defaultArgument;
    }

    const targetType = type(defaultArgument);
    const limit = inputArguments.length - 1;
    let len = limit + 1;
    let ready = false;
    let holder;

    while (!ready) {
      const instance = inputArguments[limit - len + 1];

      if (len === 0) {
        ready = true;
      } else if (flagIs(targetType, instance)) {
        holder = instance;
        ready = true;
      } else {
        len -= 1;
      }
    }

    return holder === undefined ? defaultArgument : holder;
  }

  function delay(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('RAMBDAX_DELAY');
      }, ms);
    });
  }

  function filterObject(fn, obj) {
    const willReturn = {};

    for (const prop in obj) {
      if (fn(obj[prop], prop, obj)) {
        willReturn[prop] = obj[prop];
      }
    }

    return willReturn;
  }

  function filter(fn, list) {
    if (arguments.length === 1) return _list => filter(fn, _list);

    if (list == undefined) {
      return [];
    }

    if (!Array.isArray(list)) {
      return filterObject(fn, list);
    }

    let index = -1;
    let resIndex = 0;
    const len = list.length;
    const willReturn = [];

    while (++index < len) {
      const value = list[index];

      if (fn(value, index)) {
        willReturn[resIndex++] = value;
      }
    }

    return willReturn;
  }

  async function mapAsyncFn(fn, arr) {
    if (Array.isArray(arr)) {
      const willReturn = [];
      let i = 0;

      for (const a of arr) {
        willReturn.push((await fn(a, i++)));
      }

      return willReturn;
    }

    const willReturn = {};

    for (const prop in arr) {
      willReturn[prop] = await fn(arr[prop], prop);
    }

    return willReturn;
  }

  function mapAsync(fn, arr) {
    if (arguments.length === 1) {
      return async holder => mapAsyncFn(fn, holder);
    }

    return new Promise((resolve, reject) => {
      mapAsyncFn(fn, arr).then(resolve).catch(reject);
    });
  }

  function filterAsync(predicate, iterateOver) {
    if (arguments.length === 1) {
      return async holder => filterAsync(predicate, holder);
    }

    return new Promise((resolve, reject) => {
      mapAsync(predicate, iterateOver).then(predicateResult => {
        if (Array.isArray(predicateResult)) {
          const filtered = iterateOver.filter((_, i) => predicateResult[i]);
          return resolve(filtered);
        }

        const filtered = filter((_, prop) => predicateResult[prop])(iterateOver);
        return resolve(filtered);
      }).catch(reject);
    });
  }

  function findInObject(fn, obj) {
    if (arguments.length === 1) {
      return objHolder => findInObject(fn, objHolder);
    }

    let willReturn = {
      fallback: true
    };
    Object.entries(obj).forEach(([prop, value]) => {
      if (willReturn.fallback) {
        if (fn(value, prop)) {
          willReturn = {
            prop,
            value
          };
        }
      }
    });
    return willReturn;
  }

  function findModify(fn, list) {
    if (arguments.length === 1) {
      return listHolder => findModify(fn, listHolder);
    }

    const len = list.length;
    if (len === 0) return false;
    let index = -1;

    while (++index < len) {
      const result = fn(list[index], index);

      if (result !== false) {
        return result;
      }
    }

    return false;
  }

  function flatMap(fn, xs) {
    if (arguments.length === 1) {
      return xsHolder => flatMap(fn, xsHolder);
    }

    return [].concat(...xs.map(fn));
  }

  function pick(keys, obj) {
    if (arguments.length === 1) return _obj => pick(keys, _obj);

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

  function merge(obj, props) {
    if (arguments.length === 1) return _props => merge(obj, _props);
    return Object.assign({}, obj || {}, props || {});
  }

  let holder = {};
  function getter(key) {
    const typeKey = type(key);
    if (typeKey === 'String') return holder[key];
    if (typeKey === 'Array') return pick(key, holder);
    return holder;
  }
  function setter(maybeKey, maybeValue) {
    const typeKey = type(maybeKey);
    const typeValue = type(maybeValue);

    if (typeKey === 'String') {
      if (typeValue === 'Function') {
        return holder[maybeKey] = maybeValue(holder[maybeKey]);
      }

      return holder[maybeKey] = maybeValue;
    }

    if (typeKey !== 'Object') return;
    holder = merge(holder, maybeKey);
  }
  function reset() {
    holder = {};
  }

  function glue(input, glueChar) {
    return input.split('\n').filter(x => x.trim().length > 0).map(x => x.trim()).join(glueChar === undefined ? ' ' : glueChar);
  }

  function path(list, obj) {
    if (arguments.length === 1) return _obj => path(list, _obj);

    if (obj === null || obj === undefined) {
      return undefined;
    }

    let willReturn = obj;
    let counter = 0;
    const pathArrValue = typeof list === 'string' ? list.split('.') : list;

    while (counter < pathArrValue.length) {
      if (willReturn === null || willReturn === undefined) {
        return undefined;
      }

      willReturn = willReturn[pathArrValue[counter]];
      counter++;
    }

    return willReturn;
  }

  function hasPath(maybePath, obj) {
    if (arguments.length === 1) {
      return objHolder => hasPath(maybePath, objHolder);
    }

    return path(maybePath, obj) !== undefined;
  }

  function headObject(input) {
    const [head, _] = Object.entries(input);
    if (!head) return {
      prop: undefined,
      value: undefined
    };
    if (_) throw new Error('R.headObject expects object with only one key');
    return {
      prop: head[0],
      value: head[1]
    };
  }

  function createThenable(x) {
    return async function (input) {
      return x(input);
    };
  }

  function ifElseAsync(condition, ifFn, elseFn) {
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

  function any(fn, list) {
    if (arguments.length === 1) return _list => any(fn, _list);
    let counter = 0;

    while (counter < list.length) {
      if (fn(list[counter], counter)) {
        return true;
      }

      counter++;
    }

    return false;
  }

  function includesType(targetType, list) {
    if (arguments.length === 1) {
      return listHolder => includesType(targetType, listHolder);
    }

    return any(x => type(x) === targetType, list);
  }

  function replace(pattern, replacer, str) {
    if (replacer === undefined) {
      return (_replacer, _str) => replace(pattern, _replacer, _str);
    } else if (str === undefined) {
      return _str => replace(pattern, replacer, _str);
    }

    return str.replace(pattern, replacer);
  }

  function inject(injection, marker, content, beforeFlag = false) {
    return replace(marker, beforeFlag ? `${injection}${marker}` : `${marker}${injection}`, content);
  }

  function range(from, to) {
    if (arguments.length === 1) return _to => range(from, _to);

    if (Number.isNaN(Number(from)) || Number.isNaN(Number(to))) {
      throw new TypeError('Both arguments to range must be numbers');
    }

    if (to < from) return [];
    const len = to - from;
    const willReturn = Array(len);

    for (let i = 0; i < len; i++) {
      willReturn[i] = from + i;
    }

    return willReturn;
  }

  function head(list) {
    if (typeof list === 'string') return list[0] || '';
    return list[0];
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

  const charCodesString = [...range(65, 90), ...range(97, 122)];
  const charCodes = [...charCodesString, ...range(49, 57)];
  function uuid(length = 8, stringTag = false) {
    const loops = range(0, length);
    const charSet = stringTag ? charCodesString : charCodes;
    return loops.map(x => String.fromCharCode(head(shuffle(charSet)))).join('');
  }

  const holder$1 = {};
  function interval({
    fn,
    ms,
    stopWhen
  }) {
    const key = uuid();
    return new Promise(resolve => {
      holder$1[key] = setInterval(() => {
        if (stopWhen() === true) {
          clearInterval(holder$1[key]);
          resolve();
        } else {
          fn();
        }
      }, ms);
    });
  }

  function toLower(str) {
    return str.toLowerCase();
  }

  function includes(target, list) {
    if (arguments.length === 1) return _input => includes(target, _input);

    if (typeof list === 'string') {
      return list.includes(target);
    }

    if (!Array.isArray(list)) return false;
    let index = -1;

    while (++index < list.length) {
      if (equals(list[index], target)) {
        return true;
      }
    }

    return false;
  }

  function test(pattern, str) {
    if (arguments.length === 1) return _str => test(pattern, _str);

    if (typeof pattern === 'string') {
      throw new TypeError(`‘test’ requires a value of type RegExp as its first argument; received "${pattern}"`);
    }

    return str.search(pattern) !== -1;
  }

  function all(fn, list) {
    if (arguments.length === 1) return _list => all(fn, _list);

    for (let i = 0; i < list.length; i++) {
      if (!fn(list[i], i)) return false;
    }

    return true;
  }

  function isPrototype(input) {
    const currentPrototype = input.prototype;
    const list = [Number, String, Boolean, Promise];
    let toReturn = false;
    let counter = -1;

    while (++counter < list.length && !toReturn) {
      if (currentPrototype === list[counter].prototype) toReturn = true;
    }

    return toReturn;
  }
  function prototypeToString(input) {
    const currentPrototype = input.prototype;
    const list = [Number, String, Boolean, Promise];
    const translatedList = ['Number', 'String', 'Boolean', 'Promise'];
    let found;
    let counter = -1;

    while (++counter < list.length) {
      if (currentPrototype === list[counter].prototype) found = counter;
    }

    return translatedList[found];
  }
  const typesWithoutPrototype = ['any', 'promise', 'async', 'function'];

  function fromPrototypeToString(rule) {
    if (Array.isArray(rule) || rule === undefined || rule === null || rule.prototype === undefined || typesWithoutPrototype.includes(rule)) {
      return {
        rule,
        parsed: false
      };
    }

    if (String.prototype === rule.prototype) {
      return {
        rule: 'string',
        parsed: true
      };
    }

    if (Boolean.prototype === rule.prototype) {
      return {
        rule: 'boolean',
        parsed: true
      };
    }

    if (Number.prototype === rule.prototype) {
      return {
        rule: 'number',
        parsed: true
      };
    }

    return {
      rule: type(rule.prototype).toLowerCase(),
      parsed: true
    };
  }

  function getRuleAndType(schema, requirementRaw) {
    const ruleRaw = schema[requirementRaw];
    const typeIs = type(ruleRaw);
    const {
      rule,
      parsed
    } = fromPrototypeToString(ruleRaw);
    return {
      rule: rule,
      ruleType: parsed ? 'String' : typeIs
    };
  }

  function isValid({
    input,
    schema
  }) {
    if (input === undefined || schema === undefined) return false;
    let flag = true;

    const boom = boomFlag => {
      if (!boomFlag) {
        flag = false;
      }
    };

    for (const requirementRaw in schema) {
      if (flag) {
        const isOptional = requirementRaw.endsWith('?');
        const requirement = isOptional ? init(requirementRaw) : requirementRaw;
        const {
          rule,
          ruleType
        } = getRuleAndType(schema, requirementRaw);
        const inputProp = input[requirement];
        const inputPropType = type(input[requirement]);
        const ok = isOptional && inputProp !== undefined || !isOptional;
        if (!ok || rule === 'any' && inputProp != null || rule === inputProp) continue;

        if (ruleType === 'Object') {
          const isValidResult = isValid({
            input: inputProp,
            schema: rule
          });
          boom(isValidResult);
        } else if (ruleType === 'String') {
          boom(toLower(inputPropType) === rule);
        } else if (typeof rule === 'function') {
          boom(rule(inputProp));
        } else if (ruleType === 'Array' && inputPropType === 'String') {
          boom(includes(inputProp, rule));
        } else if (ruleType === 'Array' && rule.length === 1 && inputPropType === 'Array') {
          const [currentRule] = rule;
          const currentRuleType = type(currentRule);
          boom(currentRuleType === 'String' || currentRuleType === 'Object' || isPrototype(currentRule));

          if (currentRuleType === 'Object' && flag) {
            const isValidResult = all(inputPropInstance => isValid({
              input: inputPropInstance,
              schema: currentRule
            }), inputProp);
            boom(isValidResult);
          } else if (flag) {
            const actualRule = currentRuleType === 'String' ? currentRule : prototypeToString(currentRule);
            const isInvalidResult = any(inputPropInstance => type(inputPropInstance).toLowerCase() !== actualRule.toLowerCase(), inputProp);
            boom(!isInvalidResult);
          }
        } else if (ruleType === 'RegExp' && inputPropType === 'String') {
          boom(test(rule, inputProp));
        } else {
          boom(false);
        }
      }
    }

    return flag;
  }

  function isAttach() {
    if (Object.prototype.is !== undefined) {
      return false;
    }

    Object.defineProperty(Object.prototype, 'is', {
      value: function (schema) {
        return isValid({
          input: {
            isProp: this
          },
          schema: {
            isProp: schema
          }
        });
      },
      writable: true,
      configurable: true
    });
    return true;
  }

  function isFunction$1(fn) {
    return ['Async', 'Promise', 'Function'].includes(type(fn));
  }

  function isFalsy$1(x) {
    const typeIs = type(x);
    if (['Array', 'String'].includes(typeIs)) return x.length === 0;
    if (typeIs === 'Object') return Object.keys(x).length === 0;
    if (['Null', 'Undefined'].includes(typeIs)) return true;
    return false;
  }

  function isPromise(x) {
    return ['Async', 'Promise'].includes(type(x));
  }

  function isType(xType, x) {
    if (arguments.length === 1) {
      return xHolder => isType(xType, xHolder);
    }

    return type(x) === xType;
  }

  function mapObject(fn, obj) {
    const willReturn = {};

    for (const prop in obj) {
      willReturn[prop] = fn(obj[prop], prop, obj);
    }

    return willReturn;
  }

  function map(fn, list) {
    if (arguments.length === 1) return _list => map(fn, _list);

    if (list === undefined) {
      return [];
    }

    if (!Array.isArray(list)) {
      return mapObject(fn, list);
    }

    let index = -1;
    const len = list.length;
    const willReturn = Array(len);

    while (++index < len) {
      willReturn[index] = fn(list[index], index);
    }

    return willReturn;
  }

  function forEach(fn, list) {
    if (arguments.length === 1) return _list => forEach(fn, _list);
    map(fn, list);
    return list;
  }

  async function isValidAsync({
    schema,
    input
  }) {
    const asyncSchema = {};
    const simpleSchema = {};
    forEach((rule, prop) => {
      if (isPromise(rule)) {
        asyncSchema[prop] = rule;
      } else {
        simpleSchema[prop] = rule;
      }
    }, schema);
    if (Object.keys(asyncSchema).length === 0) return isValid({
      input,
      schema
    });
    if (!isValid({
      input,
      schema: simpleSchema
    })) return false;
    let toReturn = true;

    for (const singleRuleProp in asyncSchema) {
      if (toReturn) {
        const validated = await asyncSchema[singleRuleProp](input[singleRuleProp]);
        if (!validated) toReturn = false;
      }
    }

    return toReturn;
  }

  async function mapFastAsyncFn(fn, arr) {
    const promised = arr.map((a, i) => fn(a, i));
    return Promise.all(promised);
  }
  function mapFastAsync(fn, arr) {
    if (arguments.length === 1) {
      return async holder => mapFastAsyncFn(fn, holder);
    }

    return new Promise((resolve, reject) => {
      mapFastAsyncFn(fn, arr).then(resolve).catch(reject);
    });
  }

  function splitEvery(n, list) {
    if (arguments.length === 1) return _list => splitEvery(n, _list);
    if (n < 1) throw new Error('First argument to splitEvery must be a positive integer');
    const willReturn = [];
    let counter = 0;

    while (counter < list.length) {
      willReturn.push(list.slice(counter, counter += n));
    }

    return willReturn;
  }

  async function mapAsyncLimit(iterable, limit, list) {
    if (arguments.length === 2) {
      return _list => mapAsyncLimit(iterable, limit, _list);
    }

    if (list.length < limit) return mapFastAsync(iterable, list);
    const slices = splitEvery(limit, list);
    let toReturn = [];

    for (const slice of slices) {
      const iterableResult = await mapFastAsyncFn(iterable, slice);
      toReturn = [...toReturn, ...iterableResult];
    }

    return toReturn;
  }

  function mergeAll(arr) {
    let willReturn = {};
    map(val => {
      willReturn = merge(willReturn, val);
    }, arr);
    return willReturn;
  }

  function check(singleInput, schema) {
    return isValid({
      input: {
        singleInput
      },
      schema: {
        singleInput: schema
      }
    });
  }
  function ok(...inputs) {
    return (...schemas) => {
      let failedSchema;
      const pass = any((singleInput, i) => {
        const schema = schemas[i] === undefined ? schemas[0] : schemas[i];
        const checked = check(singleInput, schema);

        if (!checked) {
          failedSchema = JSON.stringify({
            input: singleInput,
            schema
          });
        }

        return !checked;
      }, inputs) === false;
      if (!pass) throw new Error(`Failed R.ok with schema ${failedSchema}`);
      return true;
    };
  }

  function mapToObject(fn, list) {
    if (arguments.length === 1) {
      return listHolder => mapToObject(fn, listHolder);
    }

    ok(type(fn), type(list))('Function', 'Array');
    return mergeAll(map(fn, list));
  }

  function maybe(ifRule, whenIfRaw, whenElseRaw) {
    const whenIf = ifRule && type(whenIfRaw) === 'Function' ? whenIfRaw() : whenIfRaw;
    const whenElse = !ifRule && type(whenElseRaw) === 'Function' ? whenElseRaw() : whenElseRaw;
    return ifRule ? whenIf : whenElse;
  }

  function sort(fn, list) {
    if (arguments.length === 1) return _list => sort(fn, _list);
    const arrClone = list.slice();
    return arrClone.sort(fn);
  }

  function take(n, list) {
    if (arguments.length === 1) return _list => take(n, _list);
    if (n < 0) return list.slice();
    if (typeof list === 'string') return list.slice(0, n);
    return baseSlice(list, 0, n);
  }

  const cache = {};

  const normalizeObject = obj => {
    const sortFn = (a, b) => a > b ? 1 : -1;

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
      return JSON.stringify(normalizeObject(a));
    }

    return JSON.stringify(a);
  };

  const generateProp = (fn, ...inputArguments) => {
    let propString = '';
    inputArguments.forEach(inputArgument => {
      propString += `${stringify(inputArgument)}_`;
    });
    return `${propString}${stringify(fn)}`;
  };

  function memoize$1(fn, ...inputArguments) {
    if (arguments.length === 1) {
      return (...inputArgumentsHolder) => memoize$1(fn, ...inputArgumentsHolder);
    }

    const prop = generateProp(fn, ...inputArguments);
    if (prop in cache) return cache[prop];

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

  function mergeRight(x, y) {
    return merge(y, x);
  }

  function mergeDeep(target, source) {
    if (arguments.length === 1) {
      return sourceHolder => mergeDeep(target, sourceHolder);
    }

    const willReturn = JSON.parse(JSON.stringify(target));
    Object.keys(source).forEach(key => {
      if (type(source[key]) === 'Object') {
        if (type(target[key]) === 'Object') {
          willReturn[key] = mergeDeep(target[key], source[key]);
        } else {
          willReturn[key] = source[key];
        }
      } else {
        willReturn[key] = source[key];
      }
    });
    return willReturn;
  }

  function nextIndex(index, list) {
    const base = typeof list === 'number' ? list : list.length;
    const newIndex = index >= base - 1 ? 0 : index + 1;
    return newIndex;
  }

  function pass(...inputs) {
    return (...schemas) => any((x, i) => {
      const schema = schemas[i] === undefined ? schemas[0] : schemas[i];
      return !check(x, schema);
    }, inputs) === false;
  }

  function curry(fn, args = []) {
    return (..._args) => (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
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

  function otherwise(fallback, toResolve) {
    if (arguments.length === 1) {
      return toResolveHolder => otherwise(fallback, toResolveHolder);
    }

    return new Promise(resolve => {
      toResolve.then(resolve).catch(e => resolve(fallback(e)));
    });
  }

  function pathEq(path$1, target, obj) {
    if (arguments.length === 2) {
      return objHolder => pathEq(path$1, target, objHolder);
    }

    return path(path$1, obj) === target;
  }

  function pipe(...fns) {
    if (fns.length === 0) throw new Error('pipe requires at least one argument');
    return compose(...fns.reverse());
  }

  function piped(...inputs) {
    const [input, ...fnList] = inputs;
    return pipe(...fnList)(input);
  }

  async function pipedAsync(...inputs) {
    const [input, ...fnList] = inputs;
    let argumentsToPass = input;

    while (fnList.length !== 0) {
      const fn = fnList.shift();
      const typeFn = type(fn);

      if (typeFn === 'Async') {
        argumentsToPass = await fn(argumentsToPass);
      } else {
        argumentsToPass = fn(argumentsToPass);
      }
    }

    return argumentsToPass;
  }

  function prevIndex(index, list) {
    const base = typeof list === 'number' ? list : list.length;
    const newIndex = index === 0 ? base - 1 : index - 1;
    return newIndex;
  }

  function helper({
    condition,
    inputArgument,
    prop
  }) {
    return new Promise((resolve, reject) => {
      if (type(condition) !== 'Async') {
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

  function promiseAllObject(promises) {
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

  function pushUniq(x, list) {
    if (list.includes(x)) return;
    list.push(x);
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function remove(inputs, text) {
    if (arguments.length === 1) {
      return textHolder => remove(inputs, textHolder);
    }

    if (type(text) !== 'String') {
      throw new Error(`R.remove requires string not ${type(text)}`);
    }

    if (type(inputs) !== 'Array') {
      return replace(inputs, '', text).trim();
    }

    let textCopy = text;
    inputs.forEach(singleInput => {
      textCopy = replace(singleInput, '', textCopy).trim();
    });
    return textCopy;
  }

  function omit(keys, obj) {
    if (arguments.length === 1) return _obj => omit(keys, _obj);

    if (obj === null || obj === undefined) {
      return undefined;
    }

    const keysValue = typeof keys === 'string' ? keys.split(',') : keys;
    const willReturn = {};

    for (const key in obj) {
      if (!keysValue.includes(key)) {
        willReturn[key] = obj[key];
      }
    }

    return willReturn;
  }

  function renameProps(conditions, inputObject) {
    if (inputObject === undefined) {
      return inputObjectHolder => renameProps(conditions, inputObjectHolder);
    }

    const renamed = {};
    Object.keys(conditions).forEach(renameConditionProp => {
      if (Object.keys(inputObject).includes(renameConditionProp)) {
        renamed[conditions[renameConditionProp]] = inputObject[renameConditionProp];
      }
    });
    return merge(renamed, omit(Object.keys(conditions), inputObject));
  }

  function resolve(afterResolve, toResolve) {
    if (arguments.length === 1) {
      return toResolveHolder => resolve(afterResolve, toResolveHolder);
    }

    return new Promise(res => {
      toResolve.then(result => res(afterResolve(result)));
    });
  }

  function s() {
    if (Object.prototype.s === undefined) {
      Object.defineProperty(Object.prototype, 's', {
        value: function (f) {
          return f(this.valueOf());
        },
        writable: true,
        configurable: true
      });
      return true;
    }

    return false;
  }

  const NO_MATCH_FOUND = Symbol ? Symbol('NO_MATCH_FOUND') : undefined;

  const getMatchingKeyValuePair = (cases, testValue, defaultValue) => {
    let iterationValue;

    for (let index = 0; index < cases.length; index++) {
      iterationValue = cases[index].test(testValue);

      if (iterationValue !== NO_MATCH_FOUND) {
        return iterationValue;
      }
    }

    return defaultValue;
  };

  const isEqual = (testValue, matchValue) => {
    const willReturn = typeof testValue === 'function' ? testValue(matchValue) : equals(testValue, matchValue);
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
      return getMatchingKeyValuePair(this.cases, matchValue, this.defaultValue);
    }

  }

  function switcher(input) {
    return new Switchem(input);
  }

  function sortObject(predicate, obj) {
    if (arguments.length === 1) {
      return _obj => sortObject(predicate, _obj);
    }

    const keys = Object.keys(obj);
    const sortedKeys = sort((a, b) => predicate(a, b, obj[a], obj[b]), keys);
    const toReturn = {};
    sortedKeys.forEach(singleKey => {
      toReturn[singleKey] = obj[singleKey];
    });
    return toReturn;
  }

  function tapAsync(fn, input) {
    if (arguments.length === 1) {
      return inputHolder => tapAsync(fn, inputHolder);
    }

    if (isPromise(fn) === true) {
      return new Promise((resolve, reject) => {
        fn(input).then(() => {
          resolve(input);
        }).catch(reject);
      });
    }

    fn(input);
    return input;
  }

  const escapeSpecialCharacters = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const getOccurances = input => input.match(/{{\s*.+?\s*}}/g);

  const getOccuranceProp = occurance => occurance.replace(/{{\s*|\s*}}/g, '');

  const replace$1 = ({
    inputHolder,
    prop,
    replacer
  }) => inputHolder.replace(new RegExp(`{{\\s*${escapeSpecialCharacters(prop)}\\s*}}`), replacer);

  function template(input, templateInput) {
    if (arguments.length === 1) {
      return templateInputHolder => template(input, templateInputHolder);
    }

    const occurances = getOccurances(input);
    if (occurances === null) return input;
    let inputHolder = input;

    for (const occurance of occurances) {
      const prop = getOccuranceProp(occurance);

      try {
        const replacer = new Function('templateInput', `with(templateInput) { return ${prop} }`)(templateInput);
        inputHolder = replace$1({
          inputHolder,
          prop,
          replacer
        });
      } catch (e) {}
    }

    return inputHolder;
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

  function toDecimal(number, charsAfterDecimalPoint = 2) {
    return Number(parseFloat(String(number)).toFixed(charsAfterDecimalPoint));
  }

  function toggle(list, input) {
    const clone = take(2, list);
    if (!clone.includes(input)) return input;
    return input === clone[0] ? clone[1] : clone[0];
  }

  function tryCatch(fn, fallback) {
    if (!isFunction$1(fn)) {
      throw new Error(`R.tryCatch | fn '${fn}'`);
    }

    const passFallback = isFunction$1(fallback);

    if (!isPromise(fn)) {
      return (...inputs) => {
        try {
          return fn(...inputs);
        } catch (e) {
          return passFallback ? fallback(...inputs) : fallback;
        }
      };
    }

    return (...inputs) => new Promise(resolve => {
      fn(...inputs).then(resolve).catch(() => {
        if (!passFallback) {
          return resolve(fallback);
        }

        if (!isPromise(fallback)) {
          return resolve(fallback(...inputs));
        }

        fallback(...inputs).then(resolve);
      });
    });
  }

  function unless(condition, whenFalse) {
    if (arguments.length === 1) {
      return whenFalseHolder => unless(condition, whenFalseHolder);
    }

    return input => {
      const flag = typeof condition === 'boolean' ? condition : condition(input);
      if (flag) return input;
      if (isFunction$1(whenFalse)) return whenFalse(input);
      return whenFalse;
    };
  }

  function wait(fn) {
    return new Promise(resolve => {
      fn.then(result => resolve([result, undefined])).catch(e => resolve([undefined, e]));
    });
  }

  function waitFor(condition, howLong, loops = 10) {
    const typeCondition = type(condition);
    const passPromise = typeCondition === 'Async';
    const passFunction = typeCondition === 'Function';
    const interval = Math.floor(howLong / loops);

    if (!(passPromise || passFunction)) {
      throw new Error('R.waitFor');
    }

    return async (...inputs) => {
      for (const _ of range(0, loops)) {
        const resultCondition = await condition(...inputs);

        if (resultCondition === false) {
          await delay(interval);
        } else {
          return resultCondition;
        }
      }

      return false;
    };
  }

  function when(condition, whenTrue) {
    if (arguments.length === 1) {
      return whenTrueHolder => when(condition, whenTrueHolder);
    }

    return input => {
      const flag = typeof condition === 'boolean' ? condition : condition(input);
      if (!flag) return input;
      if (isFunction$1(whenTrue)) return whenTrue(input);
      return whenTrue;
    };
  }

  function createThenable$1(x) {
    return async function (input) {
      return x(input);
    };
  }

  function whenAsync(condition, whenTrueFn) {
    if (arguments.length === 1) {
      return whenTrueFnHolder => whenAsync(condition, whenTrueFnHolder);
    }

    return input => new Promise((resolve, reject) => {
      if (typeof condition === 'boolean') {
        if (condition === false) {
          return resolve(input);
        }

        whenTrueFn(input).then(resolve).catch(reject);
      } else {
        const conditionPromise = createThenable$1(condition);
        conditionPromise(input).then(conditionResult => {
          if (conditionResult === false) {
            return resolve(input);
          }

          whenTrueFn(input).then(resolve).catch(reject);
        }).catch(reject);
      }
    });
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

  function whereEq(rule, input) {
    if (arguments.length === 1) {
      return inputHolder => whereEq(rule, inputHolder);
    }

    if (type(input) !== 'Object') return false;
    const result = filter((ruleValue, ruleProp) => equals(ruleValue, input[ruleProp]), rule);
    return Object.keys(result).length === Object.keys(rule).length;
  }

  function F() {
    return false;
  }

  function T() {
    return true;
  }

  function add(a, b) {
    if (arguments.length === 1) return _b => add(a, _b);
    return Number(a) + Number(b);
  }

  function adjustFn(index, fn, list) {
    const actualIndex = index < 0 ? list.length + index : index;
    if (index >= list.length || actualIndex < 0) return list;
    const clone = list.slice();
    clone[actualIndex] = fn(clone[actualIndex]);
    return clone;
  }

  const adjust = curry(adjustFn);

  function allPass(predicates) {
    return input => {
      let counter = 0;

      while (counter < predicates.length) {
        if (!predicates[counter](input)) {
          return false;
        }

        counter++;
      }

      return true;
    };
  }

  function always(x) {
    return () => x;
  }

  function and(a, b) {
    if (arguments.length === 1) return _b => and(a, _b);
    return a && b;
  }

  function anyPass(predicates) {
    return input => {
      let counter = 0;

      while (counter < predicates.length) {
        if (predicates[counter](input)) {
          return true;
        }

        counter++;
      }

      return false;
    };
  }

  function append(el, list) {
    if (arguments.length === 1) return _list => append(el, _list);
    if (typeof list === 'string') return `${list}${el}`;
    const clone = list.slice();
    clone.push(el);
    return clone;
  }

  function assocFn(prop, val, obj) {
    return Object.assign({}, obj, {
      [prop]: val
    });
  }

  const assoc = curry(assocFn);

  function _isInteger(n) {
    return n << 0 === n;
  }
  var _isInteger$1 = Number.isInteger || _isInteger;

  function assocPathFn(list, val, input) {
    const pathArrValue = typeof list === 'string' ? list.split('.') : list;

    if (pathArrValue.length === 0) {
      return val;
    }

    const index = pathArrValue[0];

    if (pathArrValue.length > 1) {
      const condition = typeof input !== 'object' || input === null || !input.hasOwnProperty(index);
      const nextinput = condition ? _isInteger(parseInt(pathArrValue[1], 10)) ? [] : {} : input[index];
      val = assocPathFn(Array.prototype.slice.call(pathArrValue, 1), val, nextinput);
    }

    if (_isInteger(parseInt(index, 10)) && Array.isArray(input)) {
      const arr = input.slice();
      arr[index] = val;
      return arr;
    }

    return assoc(index, val, input);
  }

  const assocPath = curry(assocPathFn);

  function both(f, g) {
    if (arguments.length === 1) return _g => both(f, _g);
    return (...input) => f(...input) && g(...input);
  }

  function clampFn(lowLimit, highLimit, input) {
    if (input >= lowLimit && input <= highLimit) return input;
    if (input > highLimit) return highLimit;
    if (input < lowLimit) return lowLimit;
  }

  const clamp = curry(clampFn);

  function clone(val) {
    const out = Array.isArray(val) ? Array(val.length) : {};
    if (val && val.getTime) return new Date(val.getTime());

    for (const key in val) {
      const v = val[key];
      out[key] = typeof v === 'object' && v !== null ? v.getTime ? new Date(v.getTime()) : clone(v) : v;
    }

    return out;
  }

  function complement(fn) {
    return (...input) => !fn(...input);
  }

  function concat(left, right) {
    if (arguments.length === 1) return _right => concat(left, _right);
    return typeof left === 'string' ? `${left}${right}` : [...left, ...right];
  }

  function cond(conditions) {
    return input => {
      let done = false;
      let toReturn;
      conditions.forEach(([predicate, resultClosure]) => {
        if (!done && predicate(input)) {
          done = true;
          toReturn = resultClosure(input);
        }
      });
      return toReturn;
    };
  }

  const dec = n => n - 1;

  function flagIs$1(inputArguments) {
    return inputArguments === undefined || inputArguments === null || Number.isNaN(inputArguments) === true;
  }

  function defaultTo(defaultArgument, ...inputArguments) {
    if (arguments.length === 1) {
      return _inputArguments => defaultTo(defaultArgument, _inputArguments);
    } else if (arguments.length === 2) {
      return flagIs$1(inputArguments[0]) ? defaultArgument : inputArguments[0];
    }

    const limit = inputArguments.length - 1;
    let len = limit + 1;
    let ready = false;
    let holder;

    while (!ready) {
      const instance = inputArguments[limit - len + 1];

      if (len === 0) {
        ready = true;
      } else if (flagIs$1(instance)) {
        len -= 1;
      } else {
        holder = instance;
        ready = true;
      }
    }

    return holder === undefined ? defaultArgument : holder;
  }

  function uniq(list) {
    let index = -1;
    const willReturn = [];

    while (++index < list.length) {
      const value = list[index];

      if (!includes(value, willReturn)) {
        willReturn.push(value);
      }
    }

    return willReturn;
  }

  function difference(list1, list2) {
    if (arguments.length === 1) return _list => difference(list1, _list);
    return uniq(list1).filter(x1 => !includes(x1, list2));
  }

  function dissoc(prop, obj) {
    if (arguments.length === 1) return _obj => dissoc(prop, _obj);
    if (obj === null || obj === undefined) return {};
    const willReturn = {};

    for (const p in obj) {
      willReturn[p] = obj[p];
    }

    delete willReturn[prop];
    return willReturn;
  }

  function divide(a, b) {
    if (arguments.length === 1) return _b => divide(a, _b);
    return a / b;
  }

  function drop(n, listOrString) {
    if (arguments.length === 1) return _list => drop(n, _list);
    return listOrString.slice(n > 0 ? n : 0);
  }

  function dropLast(n, list) {
    if (arguments.length === 1) return _list => dropLast(n, _list);
    return n > 0 ? list.slice(0, -n) : list.slice();
  }

  function either(f, g) {
    if (arguments.length === 1) return _g => either(f, _g);
    return (...input) => f(...input) || g(...input);
  }

  function endsWith(suffix, list) {
    if (arguments.length === 1) return _list => endsWith(suffix, _list);
    return list.endsWith(suffix);
  }

  function find(fn, list) {
    if (arguments.length === 1) return _list => find(fn, _list);
    return list.find(fn);
  }

  function findIndex(fn, list) {
    if (arguments.length === 1) return _list => findIndex(fn, _list);
    const len = list.length;
    let index = -1;

    while (++index < len) {
      if (fn(list[index], index)) {
        return index;
      }
    }

    return -1;
  }

  function flatten(list, input) {
    const willReturn = input === undefined ? [] : input;

    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) {
        flatten(list[i], willReturn);
      } else {
        willReturn.push(list[i]);
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

  function flip(fn) {
    return flipExport(fn);
  }

  function fromPairs(list) {
    const toReturn = {};
    list.forEach(([prop, value]) => toReturn[prop] = value);
    return toReturn;
  }

  function groupBy(fn, list) {
    if (arguments.length === 1) return _list => groupBy(fn, _list);
    const result = {};

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const key = fn(item);

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item);
    }

    return result;
  }

  function groupWith(predicate, list) {
    const toReturn = [];
    let holder = [];
    list.reduce((prev, current, i) => {
      if (i > 0 && predicate(prev, current)) {
        if (holder.length === 0) {
          holder.push(prev);
          holder.push(current);
        } else {
          holder.push(current);
        }
      } else if (i > 0) {
        if (holder.length === 0) {
          toReturn.push([prev]);
          if (i === list.length - 1) holder.push(current);
        } else {
          toReturn.push(holder);
          holder = [];
        }
      }

      return current;
    }, undefined);
    return holder.length === 0 ? toReturn : [...toReturn, holder];
  }

  function has(prop, obj) {
    if (arguments.length === 1) return _obj => has(prop, _obj);
    if (!obj) return false;
    return obj[prop] !== undefined;
  }

  function _objectIs(a, b) {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }

    return a !== a && b !== b;
  }
  var _objectIs$1 = Object.is || _objectIs;

  function identical(a, b) {
    if (arguments.length === 1) return _b => identical(a, _b);
    return _objectIs$1(a, b);
  }

  function identity(x) {
    return x;
  }

  function ifElseFn(condition, onTrue, onFalse) {
    return (...input) => {
      const conditionResult = typeof condition === 'boolean' ? condition : condition(...input);

      if (conditionResult === true) {
        return onTrue(...input);
      }

      return onFalse(...input);
    };
  }

  const ifElse = curry(ifElseFn);

  const inc = n => n + 1;

  function indexByPath(pathInput, list) {
    const toReturn = {};

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      toReturn[path(pathInput, item)] = item;
    }

    return toReturn;
  }

  function indexBy(fnOrPath, list) {
    if (arguments.length === 1) {
      return _list => indexBy(fnOrPath, _list);
    }

    if (typeof fnOrPath === 'string') {
      return indexByPath(fnOrPath, list);
    }

    const toReturn = {};

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      toReturn[fnOrPath(item)] = item;
    }

    return toReturn;
  }

  function indexOf(target, list) {
    if (arguments.length === 1) return _list => indexOf(target, _list);
    let index = -1;
    const {
      length
    } = list;

    while (++index < length) {
      if (list[index] === target) {
        return index;
      }
    }

    return -1;
  }

  function intersection(list1, list2) {
    if (arguments.length === 1) return _list => intersection(list1, _list);
    return filter(value => includes(value, list2), list1);
  }

  function intersperse(separator, list) {
    if (arguments.length === 1) return _list => intersperse(separator, _list);
    let index = -1;
    const len = list.length;
    const willReturn = [];

    while (++index < len) {
      if (index === len - 1) {
        willReturn.push(list[index]);
      } else {
        willReturn.push(list[index], separator);
      }
    }

    return willReturn;
  }

  function is$1(ctor, val) {
    if (arguments.length === 1) return _val => is$1(ctor, _val);
    return val != null && val.constructor === ctor || val instanceof ctor;
  }

  function isEmpty(input) {
    const inputType = type(input);
    if (['Undefined', 'NaN', 'Number', 'Null'].includes(inputType)) return false;
    if (!input) return true;

    if (inputType === 'Object') {
      return Object.keys(input).length === 0;
    }

    if (inputType === 'Array') {
      return input.length === 0;
    }

    return false;
  }

  function isNil(x) {
    return x === undefined || x === null;
  }

  function join(separator, list) {
    if (arguments.length === 1) return _list => join(separator, _list);
    return list.join(separator);
  }

  function keys(obj) {
    return Object.keys(obj);
  }

  function lastIndexOf(target, list) {
    if (arguments.length === 1) return _list => lastIndexOf(target, _list);
    let index = list.length;

    while (--index > 0) {
      if (equals(list[index], target)) {
        return index;
      }
    }

    return -1;
  }

  function length(list) {
    if (list == null || list.length === undefined) return NaN;
    return list.length;
  }

  function lens(getter, setter) {
    if (arguments.length === 1) return _setter => lens(getter, _setter);
    return function (functor) {
      return function (target) {
        return functor(getter(target)).map(focus => setter(focus, target));
      };
    };
  }

  function nth(offset, list) {
    if (arguments.length === 1) return _list => nth(offset, _list);
    const idx = offset < 0 ? list.length + offset : offset;
    return Object.prototype.toString.call(list) === '[object String]' ? list.charAt(idx) : list[idx];
  }

  function update(idx, val, list) {
    if (val === undefined) {
      return (_val, _list) => update(idx, _val, _list);
    } else if (list === undefined) {
      return _list => update(idx, val, _list);
    }

    const arrClone = list.slice();
    return arrClone.fill(val, idx, idx + 1);
  }

  function lensIndex(i) {
    return lens(nth(i), update(i));
  }

  function lensPath(key) {
    return lens(path(key), assocPath(key));
  }

  function prop(key, obj) {
    if (arguments.length === 1) return _obj => prop(key, _obj);
    if (!obj) return undefined;
    return obj[key];
  }

  function lensProp(key) {
    return lens(prop(key), assoc(key));
  }

  function match(pattern, str) {
    if (arguments.length === 1) return _str => match(pattern, _str);
    const willReturn = str.match(pattern);
    return willReturn === null ? [] : willReturn;
  }

  function mathMod(m, p) {
    if (arguments.length === 1) return _p => mathMod(m, _p);
    if (!_isInteger$1(m) || !_isInteger$1(p) || p < 1) return NaN;
    return (m % p + p) % p;
  }

  function max(a, b) {
    if (arguments.length === 1) return _b => max(a, _b);
    return b > a ? b : a;
  }

  function maxBy(fn, a, b) {
    if (arguments.length === 2) {
      return _b => maxBy(fn, a, _b);
    } else if (arguments.length === 1) {
      return (_a, _b) => maxBy(fn, _a, _b);
    }

    return fn(b) > fn(a) ? b : a;
  }

  function sum(list) {
    return list.reduce((prev, current) => prev + current, 0);
  }

  function mean(list) {
    return sum(list) / list.length;
  }

  function median(list) {
    const len = list.length;
    if (len === 0) return NaN;
    const width = 2 - len % 2;
    const idx = (len - width) / 2;
    return mean(Array.prototype.slice.call(list, 0).sort((a, b) => {
      if (a === b) return 0;
      return a < b ? -1 : 1;
    }).slice(idx, idx + width));
  }

  function min(a, b) {
    if (arguments.length === 1) return _b => min(a, _b);
    return b < a ? b : a;
  }

  function minBy(fn, a, b) {
    if (arguments.length === 2) {
      return _b => minBy(fn, a, _b);
    } else if (arguments.length === 1) {
      return (_a, _b) => minBy(fn, _a, _b);
    }

    return fn(b) < fn(a) ? b : a;
  }

  function modulo(a, b) {
    if (arguments.length === 1) return _b => modulo(a, _b);
    return a % b;
  }

  function multiply(a, b) {
    if (arguments.length === 1) return _b => multiply(a, _b);
    return a * b;
  }

  function negate(n) {
    return -n;
  }

  function none(fn, list) {
    if (arguments.length === 1) return _list => none(fn, _list);
    return list.filter(fn).length === 0;
  }

  function not(a) {
    return !a;
  }

  const Identity = x => ({
    x,
    map: fn => Identity(fn(x))
  });

  function over(lens, fn, object) {
    if (arguments.length === 1) return (_fn, _object) => over(lens, _fn, _object);
    if (arguments.length === 2) return _object => over(lens, fn, _object);
    return lens(x => Identity(fn(x)))(object).x;
  }

  function partial(fn, ...args) {
    const len = fn.length;
    return (...rest) => {
      if (args.length + rest.length >= len) {
        return fn(...args, ...rest);
      }

      return partial(fn, ...[...args, ...rest]);
    };
  }

  function partialCurry(fn, args = {}) {
    return rest => {
      if (type(fn) === 'Async' || type(fn) === 'Promise') {
        return new Promise((resolve, reject) => {
          fn(merge(rest, args)).then(resolve).catch(reject);
        });
      }

      return fn(merge(rest, args));
    };
  }

  function pathOrRaw(defaultValue, list, obj) {
    return defaultTo(defaultValue, path(list, obj));
  }

  const pathOr = curry(pathOrRaw);

  function paths(pathsInput, obj) {
    return pathsInput.map(singlePath => path(singlePath, obj));
  }

  function pickAll(keys, obj) {
    if (arguments.length === 1) return _obj => pickAll(keys, _obj);

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

  function pluck(key, list) {
    if (arguments.length === 1) return _list => pluck(key, _list);
    const willReturn = [];
    map(val => {
      if (val[key] !== undefined) {
        willReturn.push(val[key]);
      }
    }, list);
    return willReturn;
  }

  function prepend(el, list) {
    if (arguments.length === 1) return _list => prepend(el, _list);
    if (typeof list === 'string') return `${el}${list}`;
    const clone = [el].concat(list);
    return clone;
  }

  function reduceFn(fn, acc, list) {
    return list.reduce(fn, acc);
  }

  const reduce = curry(reduceFn);

  const product = reduce(multiply, 1);

  function propEqFn(key, val, obj) {
    if (obj == null) return false;
    return obj[key] === val;
  }

  const propEq = curry(propEqFn);

  function propIsFn(type, name, obj) {
    return is$1(type, obj[name]);
  }

  const propIs = curry(propIsFn);

  function propOr(defaultValue, p, obj) {
    if (arguments.length === 2) return _obj => propOr(defaultValue, p, _obj);
    if (arguments.length === 1) return (_p, _obj) => propOr(defaultValue, _p, _obj);
    if (!obj) return defaultValue;
    return defaultTo(defaultValue, obj[p]);
  }

  function reject(fn, list) {
    if (arguments.length === 1) return _list => reject(fn, _list);
    return filter((x, i) => !fn(x, i), list);
  }

  function repeat(val, n) {
    if (arguments.length === 1) return _n => repeat(val, _n);
    const willReturn = Array(n);
    return willReturn.fill(val);
  }

  function reverse(input) {
    if (typeof input === 'string') {
      return input.split('').reverse().join('');
    }

    const clone = input.slice();
    return clone.reverse();
  }

  function set$1(lens, v, x) {
    if (arguments.length === 1) return (_v, _x) => set$1(lens, _v, _x);
    if (arguments.length === 2) return _x => set$1(lens, v, _x);
    return over(lens, always(v), x);
  }

  function sliceFn(fromIndex, toIndex, list) {
    return list.slice(fromIndex, toIndex);
  }

  const slice = curry(sliceFn);

  function sortBy(fn, list) {
    if (arguments.length === 1) return _list => sortBy(fn, _list);
    const arrClone = list.slice();
    return arrClone.sort((a, b) => {
      const fnA = fn(a);
      const fnB = fn(b);
      if (fnA === fnB) return 0;
      return fnA < fnB ? -1 : 1;
    });
  }

  function split(separator, str) {
    if (arguments.length === 1) return _str => split(separator, _str);
    return str.split(separator);
  }

  function startsWith(prefix, list) {
    if (arguments.length === 1) return _list => startsWith(prefix, _list);
    return list.startsWith(prefix);
  }

  function subtract(a, b) {
    if (arguments.length === 1) return _b => subtract(a, _b);
    return a - b;
  }

  function symmetricDifference(list1, list2) {
    if (arguments.length === 1) return _list => symmetricDifference(list1, _list);
    return concat(filter(value => !includes(value, list2), list1), filter(value => !includes(value, list1), list2));
  }

  function tail(list) {
    return drop(1, list);
  }

  function takeLast(n, list) {
    if (arguments.length === 1) return _list => takeLast(n, _list);
    const len = list.length;
    if (n < 0) return list.slice();
    let numValue = n > len ? len : n;
    if (typeof list === 'string') return list.slice(len - numValue);
    numValue = len - numValue;
    return baseSlice(list, numValue, len);
  }

  function tap(fn, x) {
    if (arguments.length === 1) return _x => tap(fn, _x);
    fn(x);
    return x;
  }

  function times(fn, n) {
    if (arguments.length === 1) return _n => times(fn, _n);
    if (!Number.isInteger(n) || n < 0) throw new RangeError('n must be an integer');
    return map(fn, range(0, n));
  }

  function toPairs(obj) {
    return Object.entries(obj);
  }

  function toString$1(val) {
    return val.toString();
  }

  function toUpper(str) {
    return str.toUpperCase();
  }

  function transpose(array) {
    return array.reduce((acc, el) => {
      el.forEach((nestedEl, i) => Array.isArray(acc[i]) ? acc[i].push(nestedEl) : acc.push([nestedEl]));
      return acc;
    }, []);
  }

  function trim(str) {
    return str.trim();
  }

  function uniqWith(fn, list) {
    if (arguments.length === 1) return _list => uniqWith(fn, _list);
    let index = -1;
    const len = list.length;
    const willReturn = [];

    while (++index < len) {
      const value = list[index];
      const flag = any(willReturnInstance => fn(value, willReturnInstance), willReturn);

      if (!flag) {
        willReturn.push(value);
      }
    }

    return willReturn;
  }

  function values(obj) {
    if (type(obj) !== 'Object') return [];
    return Object.values(obj);
  }

  const Const = x => ({
    x,
    map: fn => Const(x)
  });

  function view(lens, target) {
    if (arguments.length === 1) return _target => view(lens, _target);
    return lens(Const)(target).x;
  }

  function without(left, right) {
    if (right === undefined) {
      return _right => without(left, _right);
    }

    return reduce((accum, item) => includes(item, left) ? accum : accum.concat(item), [], right);
  }

  function xor(a, b) {
    if (arguments.length === 1) return _b => xor(a, _b);
    return Boolean(a) && !b || Boolean(b) && !a;
  }

  function zip(left, right) {
    if (arguments.length === 1) return _right => zip(left, _right);
    const result = [];
    const length = Math.min(left.length, right.length);

    for (let i = 0; i < length; i++) {
      result[i] = [left[i], right[i]];
    }

    return result;
  }

  function zipObj(keys, values) {
    if (arguments.length === 1) return yHolder => zipObj(keys, yHolder);
    return take(values.length, keys).reduce((prev, xInstance, i) => {
      prev[xInstance] = values[i];
      return prev;
    }, {});
  }

  const DELAY = 'RAMBDAX_DELAY';

  exports.DELAY = DELAY;
  exports.F = F;
  exports.T = T;
  exports.add = add;
  exports.adjust = adjust;
  exports.all = all;
  exports.allFalse = allFalse;
  exports.allPass = allPass;
  exports.allTrue = allTrue;
  exports.allType = allType;
  exports.always = always;
  exports.and = and;
  exports.any = any;
  exports.anyFalse = anyFalse;
  exports.anyPass = anyPass;
  exports.anyTrue = anyTrue;
  exports.anyType = anyType;
  exports.append = append;
  exports.assoc = assoc;
  exports.assocPath = assocPath;
  exports.both = both;
  exports.change = change;
  exports.clamp = clamp;
  exports.clone = clone;
  exports.compact = compact;
  exports.complement = complement;
  exports.compose = compose;
  exports.composeAsync = composeAsync;
  exports.composed = composed;
  exports.concat = concat;
  exports.cond = cond;
  exports.count = count;
  exports.curry = curry;
  exports.debounce = debounce;
  exports.dec = dec;
  exports.defaultTo = defaultTo;
  exports.defaultToStrict = defaultToStrict;
  exports.delay = delay;
  exports.difference = difference;
  exports.dissoc = dissoc;
  exports.divide = divide;
  exports.drop = drop;
  exports.dropLast = dropLast;
  exports.either = either;
  exports.endsWith = endsWith;
  exports.equals = equals;
  exports.filter = filter;
  exports.filterAsync = filterAsync;
  exports.find = find;
  exports.findInObject = findInObject;
  exports.findIndex = findIndex;
  exports.findModify = findModify;
  exports.flatMap = flatMap;
  exports.flatten = flatten;
  exports.flip = flip;
  exports.forEach = forEach;
  exports.fromPairs = fromPairs;
  exports.getter = getter;
  exports.glue = glue;
  exports.groupBy = groupBy;
  exports.groupWith = groupWith;
  exports.has = has;
  exports.hasPath = hasPath;
  exports.head = head;
  exports.headObject = headObject;
  exports.identical = identical;
  exports.identity = identity;
  exports.ifElse = ifElse;
  exports.ifElseAsync = ifElseAsync;
  exports.inc = inc;
  exports.includes = includes;
  exports.includesType = includesType;
  exports.indexBy = indexBy;
  exports.indexOf = indexOf;
  exports.init = init;
  exports.inject = inject;
  exports.intersection = intersection;
  exports.intersperse = intersperse;
  exports.interval = interval;
  exports.is = is$1;
  exports.isAttach = isAttach;
  exports.isEmpty = isEmpty;
  exports.isFalsy = isFalsy$1;
  exports.isFunction = isFunction$1;
  exports.isNil = isNil;
  exports.isPromise = isPromise;
  exports.isPrototype = isPrototype;
  exports.isType = isType;
  exports.isValid = isValid;
  exports.isValidAsync = isValidAsync;
  exports.join = join;
  exports.keys = keys;
  exports.last = last;
  exports.lastIndexOf = lastIndexOf;
  exports.length = length;
  exports.lens = lens;
  exports.lensIndex = lensIndex;
  exports.lensPath = lensPath;
  exports.lensProp = lensProp;
  exports.map = map;
  exports.mapAsync = mapAsync;
  exports.mapAsyncLimit = mapAsyncLimit;
  exports.mapFastAsync = mapFastAsync;
  exports.mapFastAsyncFn = mapFastAsyncFn;
  exports.mapToObject = mapToObject;
  exports.match = match;
  exports.mathMod = mathMod;
  exports.max = max;
  exports.maxBy = maxBy;
  exports.maybe = maybe;
  exports.mean = mean;
  exports.median = median;
  exports.memoize = memoize$1;
  exports.merge = merge;
  exports.mergeAll = mergeAll;
  exports.mergeDeep = mergeDeep;
  exports.mergeRight = mergeRight;
  exports.min = min;
  exports.minBy = minBy;
  exports.modulo = modulo;
  exports.multiply = multiply;
  exports.negate = negate;
  exports.nextIndex = nextIndex;
  exports.none = none;
  exports.not = not;
  exports.nth = nth;
  exports.ok = ok;
  exports.omit = omit;
  exports.once = once;
  exports.opposite = complement;
  exports.otherwise = otherwise;
  exports.over = over;
  exports.partial = partial;
  exports.partialCurry = partialCurry;
  exports.partition = partition;
  exports.pass = pass;
  exports.path = path;
  exports.pathEq = pathEq;
  exports.pathOr = pathOr;
  exports.paths = paths;
  exports.pick = pick;
  exports.pickAll = pickAll;
  exports.pipe = pipe;
  exports.piped = piped;
  exports.pipedAsync = pipedAsync;
  exports.pluck = pluck;
  exports.prepend = prepend;
  exports.prevIndex = prevIndex;
  exports.produce = produce;
  exports.product = product;
  exports.promiseAllObject = promiseAllObject;
  exports.prop = prop;
  exports.propEq = propEq;
  exports.propIs = propIs;
  exports.propOr = propOr;
  exports.prototypeToString = prototypeToString;
  exports.pushUniq = pushUniq;
  exports.random = random;
  exports.range = range;
  exports.reduce = reduce;
  exports.reject = reject;
  exports.remove = remove;
  exports.renameProps = renameProps;
  exports.repeat = repeat;
  exports.replace = replace;
  exports.reset = reset;
  exports.resolve = resolve;
  exports.reverse = reverse;
  exports.s = s;
  exports.set = set$1;
  exports.setter = setter;
  exports.shuffle = shuffle;
  exports.slice = slice;
  exports.sort = sort;
  exports.sortBy = sortBy;
  exports.sortObject = sortObject;
  exports.split = split;
  exports.splitEvery = splitEvery;
  exports.startsWith = startsWith;
  exports.subtract = subtract;
  exports.sum = sum;
  exports.switcher = switcher;
  exports.symmetricDifference = symmetricDifference;
  exports.tail = tail;
  exports.take = take;
  exports.takeLast = takeLast;
  exports.tap = tap;
  exports.tapAsync = tapAsync;
  exports.template = template;
  exports.test = test;
  exports.throttle = throttle;
  exports.times = times;
  exports.toDecimal = toDecimal;
  exports.toLower = toLower;
  exports.toPairs = toPairs;
  exports.toString = toString$1;
  exports.toUpper = toUpper;
  exports.toggle = toggle;
  exports.transpose = transpose;
  exports.trim = trim;
  exports.tryCatch = tryCatch;
  exports.type = type;
  exports.uniq = uniq;
  exports.uniqWith = uniqWith;
  exports.unless = unless;
  exports.update = update;
  exports.uuid = uuid;
  exports.values = values;
  exports.view = view;
  exports.wait = wait;
  exports.waitFor = waitFor;
  exports.when = when;
  exports.whenAsync = whenAsync;
  exports.where = where;
  exports.whereEq = whereEq;
  exports.without = without;
  exports.xor = xor;
  exports.zip = zip;
  exports.zipObj = zipObj;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
