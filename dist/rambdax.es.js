import { type, filter, equals, curry, replace, toLower, contains, test as test$1, any, all, init, compose, map, sort, take, merge, range, length, last, split, omit, add, addIndex, adjust, allPass, always, anyPass, append, assoc, both, complement, concat, dec, defaultTo, dissoc, divide, drop, dropLast, either, endsWith, F, find, findIndex, flatten, flip, forEach, groupBy, has, head, identity, ifElse, inc, includes, indexBy, indexOf, isNil, join, keys, lastIndexOf, match, max, maxBy, min, minBy, modulo, multiply, none, not, nth, partialCurry, path, pathOr, pick, pickAll, pipe, pluck, prepend, prop, propEq, reduce, reject, repeat, reverse, sortBy, splitEvery, startsWith, subtract, T, tail, takeLast, tap, times, toString, toUpper, trim, uniq, uniqWith, update, values, without, zip, zipObj } from 'rambda';

function allFalse(...inputs) {
  let counter = 0;

  while (counter < inputs.length) {
    const x = inputs[counter];

    if (type(x) === 'Function') {
      if (inputs[counter]()) {

        return false;
      }
    } else if (inputs[counter]) {
      return false;
    }

    counter++;
  }

  return true;
}

function allTrue(...inputs) {
  let counter = 0;
  while (counter < inputs.length) {
    const x = inputs[counter];

    if (type(x) === 'Function') {
      if (!inputs[counter]()) {
        return false;
      }
    } else if (!inputs[counter]) {
      return false;
    }

    counter++;
  }

  return true;
}

/**Used as the `TypeError` message for "Functions" methods. */
const FUNC_ERROR_TEXT = 'Expected a function';

/**Used to stand-in for `undefined` hash values. */
const HASH_UNDEFINED = '__lodash_hash_undefined__';

/**Used as references for various `Number` constants. */
let INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/**`Object#toString` result references. */
let funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**Used to match property names within property paths. */
let reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/**Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g;

/**Used to detect host constructors (Safari). */
const reIsHostCtor = /^\[object .+?Constructor\]$/;

/**Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/;

/**Detect free variable `global` from Node.js. */
const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;

/**Detect free variable `self`. */
const freeSelf = typeof self === 'object' && self && self.Object === Object && self;

/**Used as a reference to the global object. */
const root = freeGlobal || freeSelf || /*#__PURE__*/Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  //Many host objects are `Object` objects that can coerce to strings
  //despite having improperly defined `toString` methods.
  let result = false;
  if (value != null && typeof value.toString !== 'function') {
    try {
      result = Boolean(String(value));
    } catch (e) {}
  }

  return result;
}

/**Used for built-in method references. */
let arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/**Used to detect overreaching core-js shims. */
const coreJsData = root['__core-js_shared__'];

/**Used to detect methods masquerading as native. */
const maskSrcKey = /*#__PURE__*/function () {
  const uid = /*#__PURE__*//[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');

  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**Used to resolve the decompiled source of functions. */
const funcToString = funcProto.toString;

/**Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
const objectToString = objectProto.toString;

/**Used to detect if a method is native. */
const reIsNative = /*#__PURE__*/RegExp('^' + /*#__PURE__*/funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**Built-in value references. */
let Symbol$1 = root.Symbol,
    splice = arrayProto.splice;

/*Built-in method references that are verified to be native. */
let Map = /*#__PURE__*/getNative(root, 'Map'),
    nativeCreate = /*#__PURE__*/getNative(Object, 'create');

/**Used to convert symbols to primitives and strings. */
let symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  let index = -1,
      length$$1 = entries ? entries.length : 0;

  this.clear();
  while (++index < length$$1) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  const data = this.__data__;
  if (nativeCreate) {
    const result = data[key];

    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  const data = this.__data__;

  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  const data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;

  return this;
}

//Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  let index = -1,
      length$$1 = entries ? entries.length : 0;

  this.clear();
  while (++index < length$$1) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  let data = this.__data__,
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

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  let data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  let data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

//Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  let index = -1,
      length$$1 = entries ? entries.length : 0;

  this.clear();
  while (++index < length$$1) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key).delete(key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);

  return this;
}

//Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  const objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  let length$$1 = array.length;
  while (length$$1--) {
    if (eq(array[length$$1][0], key)) {
      return length$$1;
    }
  }

  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  const pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;

  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path$$1, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path$$1 = isKey(path$$1, object) ? [path$$1] : castPath(path$$1);

  let index = -1,
      length$$1 = path$$1.length,
      lastIndex = length$$1 - 1,
      nested = object;

  while (nested != null && ++index < length$$1) {
    let key = toKey(path$$1[index]),
        newValue = value;

    if (index != lastIndex) {
      const objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path$$1[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return object;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  //Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  const result = String(value);

  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map$$1, key) {
  const data = map$$1.__data__;

  return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  const value = getValue(object, key);

  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length$$1) {
  length$$1 = length$$1 == null ? MAX_SAFE_INTEGER : length$$1;

  return Boolean(length$$1) && (typeof value === 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length$$1;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  const type$$1 = typeof value;
  if (type$$1 == 'number' || type$$1 == 'symbol' || type$$1 == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  const type$$1 = typeof value;

  return type$$1 == 'string' || type$$1 == 'number' || type$$1 == 'symbol' || type$$1 == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return Boolean(maskSrcKey) && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = /*#__PURE__*/memoize(string => {
  string = toString$1(string);

  const result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, (match$$1, number, quote, string) => {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match$$1);
  });

  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }
  const result = String(value);

  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
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

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function () {
    let args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

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

//Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  //The use of `Object#toString` avoids issues with the `typeof` operator
  //in Safari 8-9 which returns 'object' for typed array and other constructors.
  const tag = isObject(value) ? objectToString.call(value) : '';

  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  const type$$1 = typeof value;

  return Boolean(value) && (type$$1 == 'object' || type$$1 == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return Boolean(value) && typeof value === 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path$$1, value) {
  return object == null ? object : baseSet(object, path$$1, value);
}

//Its lodash's set method taken from

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
  const path$$1 = pathRaw === '' ? '' : `${pathRaw}.`;

  for (const ruleKey of Object.keys(rules)) {
    const rule = rules[ruleKey];
    if (!isObject$1(rule)) {
      set(willReturn, `${path$$1}${ruleKey}`, rule);
      continue;
    }
    Object.keys(rule).filter(subruleKey => !isObject$1(rule[subruleKey])).map(subruleKey => {
      const subrule = rule[subruleKey];
      set(willReturn, `${path$$1}${ruleKey}.${subruleKey}`, subrule);
    });
    Object.keys(rule).filter(subruleKey => isObject$1(rule[subruleKey])).map(subruleKey => {
      const subrule = rule[subruleKey];
      Object.keys(subrule).map(deepKey => {
        const deep = rule[subruleKey][deepKey];
        set(willReturn, `${path$$1}${ruleKey}.${subruleKey}.${deepKey}`, deep);
      });
    });
  }

  return willReturn;
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
  return async function (startArgument) {
    let argumentsToPass = startArgument;

    while (inputArguments.length !== 0) {
      const fn = inputArguments.pop();
      const typeFn = type(fn);

      if (typeFn === 'Async' || typeFn === 'Promise') {
        argumentsToPass = await fn(argumentsToPass);
      } else {
        argumentsToPass = fn(argumentsToPass);
      }
    }

    return argumentsToPass;
  };
}

function defaultWhen(fn, fallback, input) {
  if (arguments.length === 2) {
    return inputHolder => defaultWhen(fn, fallback, inputHolder);
  }

  return fn(input) ? input : fallback;
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

function evolveFn(rules, input) {
  const clone = Object.assign({}, input);
  const propRules = filter(x => clone[x] !== undefined)(Object.keys(rules));

  if (propRules.length === 0) {
    return input;
  }

  propRules.map(prop$$1 => {
    const fn = rules[prop$$1];
    if (type(fn) === 'Function') {
      clone[prop$$1] = fn(clone[prop$$1]);
    } else if (type(fn) === 'Object') {
      clone[prop$$1] = evolve(fn, clone[prop$$1]);
    }
  });

  return clone;
}

const evolve = /*#__PURE__*/curry(evolveFn);

function findInObject(fn, obj) {
  let willReturn = { fallback: true };

  Object.entries(obj).map(([prop$$1, value]) => {
    if (willReturn.fallback) {
      if (fn(value, prop$$1)) {
        willReturn = {
          prop: prop$$1,
          value
        };
      }
    }
  });

  return willReturn;
}

function greater(x, y) {
  if (y === undefined) {
    return yHolder => greater(x, yHolder);
  }

  return y > x;
}

function headObject(x) {
  if (type(x) !== 'Object') throw new Error('R.headObject.type');
  const [tag, no] = Object.keys(x);
  if (tag === undefined) throw new Error('R.headObject.less');
  if (no !== undefined) throw new Error('R.headObject.more');

  return {
    prop: tag,
    value: x[tag]
  };
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

function inject(injection, marker, content) {
  return replace(marker, `${marker}${injection}`, content);
}

function intersection(a, b) {
  if (b === undefined) {
    return bHolder => intersection(a, bHolder);
  }

  return filter(val => b.includes(val))(a);
}

function isValid({ input, schema }) {
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

      const rule = schema[requirementRaw];
      const ruleType = type(rule);
      const inputProp = input[requirement];
      const inputPropType = type(input[requirement]);
      const ok = isOptional && inputProp !== undefined || !isOptional;

      if (!ok || rule === 'any' && inputProp != null) continue;

      if (ruleType === 'Object') {
        /**
         * This rule is standalone schema, so we recursevly call `isValid`
         */
        const isValidResult = isValid({
          input: inputProp,
          schema: rule
        });
        boom(isValidResult);
      } else if (ruleType === 'String') {
        /**
         * rule is actual rule such as 'number', so the two types are compared
         */
        boom(toLower(inputPropType) === rule);
      } else if (typeof rule === 'function') {
        /**
         * rule is function so we pass to it the input
         */
        boom(rule(inputProp));
      } else if (ruleType === 'Array' && inputPropType === 'String') {
        /**
         * enum case | rule is like a: ['foo', 'bar']
         */
        boom(contains(inputProp, rule));
      } else if (ruleType === 'Array' && rule.length === 1 && inputPropType === 'Array') {
        /**
         * 1. array of type | rule is like a: ['number']
         * 2. rule is like a: [{from: 'string'}]
         */
        const currentRule = rule[0];
        const currentRuleType = type(rule[0]);
        //Check if rule is invalid
        boom(currentRuleType === 'String' || currentRuleType === 'Object');

        if (currentRuleType === 'String') {
          /**
           * 1. array of type
           */
          const isInvalidResult = any(inputPropInstance => type(inputPropInstance).toLowerCase() !== currentRule, inputProp);
          boom(!isInvalidResult);
        }

        if (currentRuleType === 'Object') {
          /**
           * 2. rule is like a: [{from: 'string'}]
           */
          const isValidResult = all(inputPropInstance => isValid({
            input: inputPropInstance,
            schema: currentRule
          }), inputProp);
          boom(isValidResult);
        }
      } else if (ruleType === 'RegExp' && inputPropType === 'String') {
        boom(test$1(rule, inputProp));
      } else {
        boom(false);
      }
    }
  }

  return flag;
}

function any$1(fn, arr) {
  let counter = 0;
  while (counter < arr.length) {
    if (fn(arr[counter], counter)) {
      return true;
    }
    counter++;
  }

  return false;
}

function check(singleInput, schema) {
  return isValid({
    input: { singleInput },
    schema: { singleInput: schema }
  });
}

function is(...inputs) {
  return (...schemas) => {
    if (inputs.length !== schemas.length) throw new Error('inputs.length !== schemas.length');

    let reason;
    const wrong = any$1((singleInput, i) => {
      const ok = check(singleInput, schemas[i]);

      if (!ok) {
        reason = {
          singleInput,
          schema: schemas[i]
        };
      }

      return !ok;
    }, inputs);

    if (wrong) throw new Error(JSON.stringify(reason));

    return true;
  };
}

function isInit() {
  if (Object.prototype.is !== undefined) {
    return false;
  }

  Object.defineProperty(Object.prototype, 'is', {
    value: function (schema) {
      return isValid({
        input: { isProp: this },
        schema: { isProp: schema }
      });
    },
    writable: true,
    configurable: true
  });

  return true;
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

function less(x, y) {
  if (y === undefined) {
    return yHolder => less(x, yHolder);
  }

  return y < x;
}

async function mapAsyncFn(fn, arr) {
  try {
    if (Array.isArray(arr)) {
      const willReturn = [];
      for (const a of arr) {
        willReturn.push((await fn(a)));
      }

      return willReturn;
    }

    const willReturn = {};
    for (const prop$$1 in arr) {
      willReturn[prop$$1] = await fn(arr[prop$$1], prop$$1);
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

function memoize$1(fn, ...inputArguments) {
  if (arguments.length === 1) {
    return (...inputArgumentsHolder) => memoize$1(fn, ...inputArgumentsHolder);
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

function mergeRight(x, y) {
  return merge(y, x);
}

function multiline(input, glue) {

  return input.split('\n').filter(x => x.trim().length > 0).map(x => x.trim()).join(glue ? glue : ' ');
}

function any$2(fn, arr) {
  let counter = 0;
  while (counter < arr.length) {
    if (fn(arr[counter], counter)) {
      return true;
    }
    counter++;
  }

  return false;
}

function check$1(singleInput, schema) {
  return isValid({
    input: { singleInput },
    schema: { singleInput: schema }
  });
}

function ok(...inputs) {
  return (...schemas) => {
    if (inputs.length !== schemas.length) return false;

    return any$2((singleInput, i) => !check$1(singleInput, schemas[i]), inputs) === false;
  };
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

function promiseAllObject(promises) {
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

const promiseAllSecureWrapper = promise => new Promise(res => {
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

async function promiseAllSecure(input) {
  try {
    const promised = map(a => promiseAllSecureWrapper(a), input);

    return await Promise.all(promised);
  } catch (err) {
    console.log(err);
  }
}

function random(min$$1, max$$1) {
  return Math.floor(Math.random() * (max$$1 - min$$1 + 1)) + min$$1;
}

function rangeBy(startNum, endNum, distance) {
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

function remove(inputs, text) {
  if (type(inputs) !== 'Array') {
    return replace(inputs, '', text).trim();
  }

  let textCopy = text;

  inputs.forEach(singleInput => {
    textCopy = replace(singleInput, '', textCopy).trim();
  });

  return textCopy;
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

const getOccurances = input => input.match(/{{[_a-zA-Z0-9]+}}/g);

const getOccuranceProp = occurance => occurance.replace(/{{|}}/g, '');

const replace$1 = ({ inputHolder, prop: prop$$1, replacer }) => inputHolder.replace(`{{${prop$$1}}}`, replacer);

function template(input, templateInput) {
  const occurances = getOccurances(input);
  if (occurances === null) return input;

  let inputHolder = input;
  for (const occurance of occurances) {
    const prop$$1 = getOccuranceProp(occurance);
    const replacer = templateInput[prop$$1];

    if (replacer === undefined) continue;
    inputHolder = replace$1({
      inputHolder,
      prop: prop$$1,
      replacer
    });
  }

  return inputHolder;
}

const evaluationsSchema = { label: 'string' };

function runTests(input) {
  const pass = ok(input)({
    testSuite: 'string',
    evaluations: [evaluationsSchema]
  });

  if (describe === undefined || !pass) {
    throw new Error('R.runTests.init');
  }
  try {
    const {
      testSuite,
      evaluations,
      data
    } = input;
    describe(testSuite, () => {
      evaluations.forEach(singleEvaluation => {
        data.forEach(dataInstance => {
          const {
            prop: tag,
            value: x
          } = headObject(dataInstance);
          const { value: evaluationFunction } = headObject(omit('label', singleEvaluation));

          const label = template(singleEvaluation.label, { tag });

          test(label, () => {
            evaluationFunction(x);
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error('R.runTestsCatch');
  }
}

//https://github.com/staltz/zii

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

const NO_MATCH_FOUND = Symbol ? /*#__PURE__*/Symbol('NO_MATCH_FOUND') : undefined;

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

const is$1 = (testValue, matchResult = true) => ({
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
    return new Switchem(this.defaultValue, [...this.cases, is$1(testValue, matchResult)], this.willMatch);
  }

  match(matchValue) {
    return getMatchingKeyValuePair(this.cases, matchValue, this.defaultValue);
  }

}

function switcher(input) {
  return new Switchem(input);
}

function tapAsync(fn, input) {
  if (arguments.length === 1) {
    return inputHolder => tapAsync(fn, inputHolder);
  }
  if (isPromise(fn) === true) {
    return new Promise((resolve, reject$$1) => {
      fn(input).then(() => {
        resolve(input);
      }).catch(reject$$1);
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

function validate(input, schema) {
  if (arguments.length === 2) {
    return isValid({
      input,
      schema
    });
  }

  return schemaHolder => isValid({
    input,
    schema: schemaHolder
  });
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

function createThenable$1(x) {
  return async function (input) {
    return x(input);
  };
}

function whenAsync(condition, whenTrueFn) {
  if (whenTrueFn === undefined) {
    return (condition, whenTrueFnHolder) => whenAsync(condition, whenTrueFnHolder);
  }

  return input => new Promise((resolve, reject$$1) => {

    if (typeof condition === 'boolean') {
      if (condition === false) {
        return resolve(input);
      }

      whenTrueFn(input).then(resolve).catch(reject$$1);
    } else {
      const conditionPromise = createThenable$1(condition);

      conditionPromise(input).then(conditionResult => {
        if (conditionResult === false) {
          return resolve(input);
        }

        whenTrueFn(input).then(resolve).catch(reject$$1);
      }).catch(reject$$1);
    }
  });
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
//Follows code generated by `run rambda`
const add$1 = add;
const addIndex$1 = addIndex;
const adjust$1 = adjust;
const all$1 = all;
const allPass$1 = allPass;
const always$1 = always;
const any$3 = any;
const anyPass$1 = anyPass;
const append$1 = append;
const assoc$1 = assoc;
const both$1 = both;
const complement$1 = complement;
const compose$1 = compose;
const concat$1 = concat;
const contains$1 = contains;
const curry$1 = curry;
const dec$1 = dec;
const defaultTo$1 = defaultTo;
const dissoc$1 = dissoc;
const divide$1 = divide;
const drop$1 = drop;
const dropLast$1 = dropLast;
const either$1 = either;
const endsWith$1 = endsWith;
const equals$1 = equals;
const F$1 = F;
const filter$1 = filter;
const find$1 = find;
const findIndex$1 = findIndex;
const flatten$1 = flatten;
const flip$1 = flip;
const forEach$1 = forEach;
const groupBy$1 = groupBy;
const has$1 = has;
const head$1 = head;
const identity$1 = identity;
const ifElse$1 = ifElse;
const inc$1 = inc;
const includes$1 = includes;
const indexBy$1 = indexBy;
const indexOf$1 = indexOf;
const init$1 = init;
const isNil$1 = isNil;
const join$1 = join;
const keys$1 = keys;
const last$1 = last;
const lastIndexOf$1 = lastIndexOf;
const length$1 = length;
const map$1 = map;
const match$1 = match;
const merge$1 = merge;
const max$1 = max;
const maxBy$1 = maxBy;
const min$1 = min;
const minBy$1 = minBy;
const modulo$1 = modulo;
const multiply$1 = multiply;
const none$1 = none;
const not$1 = not;
const nth$1 = nth;
const omit$1 = omit;
const partialCurry$1 = partialCurry;
const path$1 = path;
const pathOr$1 = pathOr;
const pick$1 = pick;
const pickAll$1 = pickAll;
const pipe$1 = pipe;
const pluck$1 = pluck;
const prepend$1 = prepend;
const prop$1 = prop;
const propEq$1 = propEq;
const range$1 = range;
const reduce$1 = reduce;
const reject$1 = reject;
const repeat$1 = repeat;
const replace$2 = replace;
const reverse$1 = reverse;
const sort$1 = sort;
const sortBy$1 = sortBy;
const split$1 = split;
const splitEvery$1 = splitEvery;
const startsWith$1 = startsWith;
const subtract$1 = subtract;
const T$1 = T;
const tail$1 = tail;
const take$1 = take;
const takeLast$1 = takeLast;
const tap$1 = tap;
const test$2 = test$1;
const times$1 = times;
const toLower$1 = toLower;
const toString$2 = toString;
const toUpper$1 = toUpper;
const trim$1 = trim;
const type$1 = type;
const uniq$1 = uniq;
const uniqWith$1 = uniqWith;
const update$1 = update;
const values$1 = values;
const without$1 = without;
const zip$1 = zip;
const zipObj$1 = zipObj;

export { DELAY, add$1 as add, addIndex$1 as addIndex, adjust$1 as adjust, all$1 as all, allPass$1 as allPass, always$1 as always, any$3 as any, anyPass$1 as anyPass, append$1 as append, assoc$1 as assoc, both$1 as both, complement$1 as complement, compose$1 as compose, concat$1 as concat, contains$1 as contains, curry$1 as curry, dec$1 as dec, defaultTo$1 as defaultTo, dissoc$1 as dissoc, divide$1 as divide, drop$1 as drop, dropLast$1 as dropLast, either$1 as either, endsWith$1 as endsWith, equals$1 as equals, F$1 as F, filter$1 as filter, find$1 as find, findIndex$1 as findIndex, flatten$1 as flatten, flip$1 as flip, forEach$1 as forEach, groupBy$1 as groupBy, has$1 as has, head$1 as head, identity$1 as identity, ifElse$1 as ifElse, inc$1 as inc, includes$1 as includes, indexBy$1 as indexBy, indexOf$1 as indexOf, init$1 as init, isNil$1 as isNil, join$1 as join, keys$1 as keys, last$1 as last, lastIndexOf$1 as lastIndexOf, length$1 as length, map$1 as map, match$1 as match, merge$1 as merge, max$1 as max, maxBy$1 as maxBy, min$1 as min, minBy$1 as minBy, modulo$1 as modulo, multiply$1 as multiply, none$1 as none, not$1 as not, nth$1 as nth, omit$1 as omit, partialCurry$1 as partialCurry, path$1 as path, pathOr$1 as pathOr, pick$1 as pick, pickAll$1 as pickAll, pipe$1 as pipe, pluck$1 as pluck, prepend$1 as prepend, prop$1 as prop, propEq$1 as propEq, range$1 as range, reduce$1 as reduce, reject$1 as reject, repeat$1 as repeat, replace$2 as replace, reverse$1 as reverse, sort$1 as sort, sortBy$1 as sortBy, split$1 as split, splitEvery$1 as splitEvery, startsWith$1 as startsWith, subtract$1 as subtract, T$1 as T, tail$1 as tail, take$1 as take, takeLast$1 as takeLast, tap$1 as tap, test$2 as test, times$1 as times, toLower$1 as toLower, toString$2 as toString, toUpper$1 as toUpper, trim$1 as trim, type$1 as type, uniq$1 as uniq, uniqWith$1 as uniqWith, update$1 as update, values$1 as values, without$1 as without, zip$1 as zip, zipObj$1 as zipObj, allFalse, allTrue, change, compact, composeAsync, defaultWhen, debounce, delay, evolve, findInObject, greater, headObject, ifElseAsync, inject, intersection, is, isInit, isPromise, isType, isValid, less, mapAsync, mapFastAsync, memoize$1 as memoize, mergeAll, mergeRight, multiline, ok, omitBy, once, pickBy, produce, promiseAllObject, promiseAllSecure, random, rangeBy, remove, renameProps, runTests, s, shuffle, switcher, tapAsync, template, throttle, validate, when, whenAsync, where };
