import { F, T, add, addIndex, adjust, all, allPass, always, any, anyPass, append, both, complement, compose, concat, contains, curry, dec, defaultTo, divide, drop, dropLast, either, endsWith, equals, filter, find, findIndex, flatten, flip, forEach, has, head, identity, ifElse, inc, includes, indexOf, init, is, isNil, join, last, lastIndexOf, length, map, match, merge, modulo, multiply, none, not, omit, partialCurry, path, pathOr, pick, pickAll, pipe, pluck, prepend, prop, propEq, range, reduce, reject, repeat, replace, reverse, sort, sortBy, split, splitEvery, startsWith, subtract, tail, take, takeLast, tap, test, times, toLower, toString, toUpper, trim, type, uniq, update, values, without } from 'rambda';

function assocPath(path$$1, x, obj) {
  var pathValue = typeof path$$1 === 'string' ? path$$1.split('.') : path$$1;

  var lastProp = pathValue[pathValue.length - 1];

  var newProps = {
    [lastProp]: x
  };

  var counter = pathValue.length - 2;

  while (counter > -1) {
    var prop$$1 = pathValue[counter];
    newProps = {
      [prop$$1]: newProps
    };

    counter--;
  }

  return Object.assign({}, obj, newProps);
}

var assocPath$1 = curry(assocPath);

var types = ['Null', 'Undefined', 'RegExp'];

function compact(arr) {

  return filter(function (a) {
    var currentType = type(a);
    if (types.includes(currentType)) {
      return false;
    }
    if (currentType === 'Object') {
      return !equals(a, {});
    }

    return a.length !== 0;
  }, arr);
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject$$1) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject$$1,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type$$1, value) {
      switch (type$$1) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject$$1) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject$$1(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

function composeAsync() {
  for (var _len = arguments.length, inputArguments = Array(_len), _key = 0; _key < _len; _key++) {
    inputArguments[_key] = arguments[_key];
  }

  try {
    return function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(startArgument) {
        var argumentsToPass, fn;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                argumentsToPass = startArgument;

              case 1:
                if (!(inputArguments.length !== 0)) {
                  _context.next = 12;
                  break;
                }

                fn = inputArguments.pop();

                if (!(type(fn) === 'Async' || type(fn) === 'Promise')) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return fn(argumentsToPass);

              case 6:
                argumentsToPass = _context.sent;
                _context.next = 10;
                break;

              case 9:
                argumentsToPass = fn(argumentsToPass);

              case 10:
                _context.next = 1;
                break;

              case 12:
                return _context.abrupt('return', argumentsToPass);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  } catch (err) {
    throw err;
  }
}

function debounce(func, ms) {
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var timeout = void 0;

  return function () {
    for (var _len = arguments.length, input = Array(_len), _key = 0; _key < _len; _key++) {
      input[_key] = arguments[_key];
    }

    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(null, input);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
    if (callNow) {
      func.apply(null, input);
    }
  };
}

function delay(ms) {

  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('RAMBDAX_DELAY');
    }, ms);
  });
}

function debug() {
  var _console;

  (_console = console).log.apply(_console, arguments);
  process.exit();
}

var _require = require('rambda');
var type$2 = _require.type;
var curry$2 = _require.curry;
var filter$2 = _require.filter;

function evolve(rules, input) {
  var clone = Object.assign({}, input);
  var propRules = filter$2(function (x) {
    return clone[x] !== undefined;
  })(Object.keys(rules));

  if (propRules.length === 0) {
    return input;
  }

  propRules.map(function (prop$$1) {
    var fn = rules[prop$$1];
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
    return function (yHolder) {
      return greater(x, yHolder);
    };
  }

  return y > x;
}

function createThenable(x) {
  return function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", x(input));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}

function ifElseAsync(condition, ifFn, elseFn) {
  if (ifFn === undefined) {
    return function (ifFnHolder, elseFnHolder) {
      return ifElseAsync(condition, ifFnHolder, elseFnHolder);
    };
  } else if (elseFn === undefined) {
    return function (elseFnHolder) {
      return ifElseAsync(condition, ifFn, elseFnHolder);
    };
  }

  return function (input) {
    return new Promise(function (resolve, reject$$1) {
      var conditionPromise = createThenable(condition);
      var ifFnPromise = createThenable(ifFn);
      var elseFnPromise = createThenable(elseFn);

      conditionPromise(input).then(function (conditionResult) {
        var promised = conditionResult === true ? ifFnPromise : elseFnPromise;

        promised(input).then(resolve).catch(reject$$1);
      }).catch(reject$$1);
    });
  };
}

function intersection(a, b) {
  if (b === undefined) {
    return function (bHolder) {
      return intersection(a, bHolder);
    };
  }

  return filter(function (val) {
    return b.includes(val);
  })(a);
}

var _require$1 = require('rambda');
var type$3 = _require$1.type;

function isPromiseLike(x) {
  return ['Async', 'Promise'].includes(type$3(x));
}

function isValid(_ref) {
  var input = _ref.input,
      schema = _ref.schema;

  if (type(input) === 'Object' && type(schema) === 'Object') {
    var flag = true;
    for (var requirement in schema) {
      if (flag) {
        (function () {
          var rule = schema[requirement];
          var ruleType = type(rule);
          var inputProp = input[requirement];
          var inputPropType = type(input[requirement]);

          if (ruleType === 'Object' && rule.type === 'ArrayOfSchemas' && inputPropType === 'Array') {
            inputProp.map(function (val) {
              var localFlag = false;
              rule.rule.map(function (singleRule) {
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
            var arrayRuleType = type(rule[0]);

            if (arrayRuleType === 'String') {
              var result = any(function (val) {
                return toLower(type(val)) !== rule[0];
              }, inputProp);

              if (result) {
                flag = false;
              }
            } else if (arrayRuleType === 'Object') {
              var _result = any(function (val) {
                return !isValid(val, rule[0]);
              })(inputProp);
              if (_result) {
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
        })();
      }
    }

    return flag;
  }

  return false;
}

function less(x, y) {
  if (y === undefined) {
    return function (yHolder) {
      return less(x, yHolder);
    };
  }

  return y < x;
}

var mapAsyncFn = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn, arr) {
    var willReturn, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, a;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            willReturn = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;
            _iterator = arr[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 17;
              break;
            }

            a = _step.value;
            _context.t0 = willReturn;
            _context.next = 12;
            return fn(a);

          case 12:
            _context.t1 = _context.sent;

            _context.t0.push.call(_context.t0, _context.t1);

          case 14:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t2 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
            return _context.abrupt("return", willReturn);

          case 34:
            _context.prev = 34;
            _context.t3 = _context["catch"](0);
            throw _context.t3;

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 34], [5, 19, 23, 31], [24,, 26, 30]]);
  }));

  return function mapAsyncFn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function mapAsync(fn, arr) {
  var _this = this;

  if (arr === undefined) {
    return function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(holder) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return mapAsyncFn(fn, holder);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }();
  }

  return new Promise(function (resolve, reject$$1) {
    mapAsyncFn(fn, arr).then(resolve).catch(reject$$1);
  });
}

var mapFastAsyncFn = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn, arr) {
    var promised;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            promised = arr.map(function (a) {
              return fn(a);
            });
            _context.next = 4;
            return Promise.all(promised);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function mapFastAsyncFn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function mapFastAsync(fn, arr) {
  var _this = this;

  if (arr === undefined) {
    return function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(holder) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return mapFastAsyncFn(fn, holder);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }();
  }

  return new Promise(function (resolve, reject$$1) {
    mapFastAsyncFn(fn, arr).then(resolve).catch(reject$$1);
  });
}

var cache = {};

var normalizeObject = function normalizeObject(obj) {
  var sortFn = function sortFn(a, b) {
    return a > b;
  };
  var willReturn = {};
  compose(map(function (prop$$1) {
    return willReturn[prop$$1] = obj[prop$$1];
  }), sort(sortFn))(Object.keys(obj));

  return willReturn;
};

var stringify = function stringify(a) {
  if (type(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(type(a))) {
    var compacted = replace(/\s{1,}/g, ' ', a.toString());

    return replace(/\s/g, '_', take(15, compacted));
  } else if (type(a) === 'Object') {
    a = normalizeObject(a);
  }

  return JSON.stringify(a);
};

var generateProp = function generateProp(fn) {
  for (var _len = arguments.length, inputArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    inputArguments[_key - 1] = arguments[_key];
  }

  var propString = '';
  inputArguments.map(function (inputArgument) {
    propString += `${stringify(inputArgument)}_`;
  });

  return `${propString}${stringify(fn)}`;
};

function memoize(fn) {
  for (var _len2 = arguments.length, inputArguments = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    inputArguments[_key2 - 1] = arguments[_key2];
  }

  if (arguments.length === 1) {
    return function () {
      for (var _len3 = arguments.length, inputArgumentsHolder = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        inputArgumentsHolder[_key3] = arguments[_key3];
      }

      return memoize.apply(undefined, [fn].concat(inputArgumentsHolder));
    };
  }
  var prop$$1 = generateProp.apply(undefined, [fn].concat(inputArguments));
  if (prop$$1 in cache) {
    return cache[prop$$1];
  }
  if (type(fn) === 'Async') {
    return new Promise(function (resolve) {
      fn.apply(undefined, inputArguments).then(function (result) {
        cache[prop$$1] = result;
        resolve(result);
      });
    });
  }
  var result = fn.apply(undefined, inputArguments);
  cache[prop$$1] = result;

  return result;
}

function mergeAll(arr) {
  var willReturn = {};
  map(function (val) {
    willReturn = merge(willReturn, val);
  }, arr);

  return willReturn;
}

function omitBy(fn, obj) {
  if (arguments.length === 1) {
    return function (holder) {
      return omitBy(fn, holder);
    };
  }

  var willReturn = {};
  for (var prop$$1 in obj) {
    if (!fn(prop$$1, obj[prop$$1])) {
      willReturn[prop$$1] = obj[prop$$1];
    }
  }

  return willReturn;
}

function onceFn(fn, context) {
  var result = void 0;

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
    var wrap = onceFn(fn, context);

    return curry(wrap);
  }

  return onceFn(fn, context);
}

function pickBy(fn, obj) {
  if (arguments.length === 1) {
    return function (holder) {
      return pickBy(fn, holder);
    };
  }

  var willReturn = {};
  for (var prop$$1 in obj) {
    if (fn(prop$$1, obj[prop$$1])) {
      willReturn[prop$$1] = obj[prop$$1];
    }
  }

  return willReturn;
}

function helper(_ref) {
  var condition = _ref.condition,
      inputArgument = _ref.inputArgument,
      prop$$1 = _ref.prop;

  return new Promise(function (resolve, reject$$1) {
    if (!(type(condition) === 'Async')) {
      return resolve({
        type: prop$$1,
        payload: condition(inputArgument)
      });
    }

    condition(inputArgument).then(function (result) {
      resolve({
        type: prop$$1,
        payload: result
      });
    }).catch(function (err) {
      return reject$$1(err);
    });
  });
}

function produce(conditions, inputArgument) {
  if (arguments.length === 1) {
    return function (inputArgumentHolder) {
      return produce(conditions, inputArgumentHolder);
    };
  }
  var asyncConditionsFlag = false;
  for (var prop$$1 in conditions) {
    if (asyncConditionsFlag === false && type(conditions[prop$$1]) === 'Async') {
      asyncConditionsFlag = true;
    }
  }

  if (asyncConditionsFlag === false) {
    var willReturn = {};
    for (var _prop in conditions) {
      willReturn[_prop] = conditions[_prop](inputArgument);
    }

    return willReturn;
  }
  var promised = [];
  for (var _prop2 in conditions) {
    var condition = conditions[_prop2];
    promised.push(helper({
      inputArgument,
      condition,
      prop: _prop2
    }));
  }

  return new Promise(function (resolve, reject$$1) {
    Promise.all(promised).then(function (results) {
      var willReturn = {};

      map(function (result) {
        return willReturn[result.type] = result.payload;
      }, results);

      resolve(willReturn);
    }).catch(function (err) {
      return reject$$1(err);
    });
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rangeBy(startNum, endNum, distance) {
  if (endNum === undefined) {
    return function (endNumHolder, distanceHolder) {
      return rangeBy(startNum, endNumHolder, distanceHolder);
    };
  } else if (distance === undefined) {
    return function (distanceHolder) {
      return rangeBy(startNum, endNum, distanceHolder);
    };
  }

  var isInteger = !distance.toString().includes('.');
  if (startNum > endNum) {
    var startNumHolder = startNum;
    startNum = endNum;
    endNum = startNumHolder;
  }
  var willReturn = [startNum];
  var valueToPush = startNum;

  if (isInteger) {
    var loopIndexes = range(0, Math.floor((endNum - startNum) / distance));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = loopIndexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        valueToPush += distance;
        willReturn.push(valueToPush);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    var decimalLength = compose(length, last, split('.'))(distance.toString());
    var _loopIndexes = range(0, Math.floor((endNum - startNum) / distance));
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _loopIndexes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        valueToPush += distance;
        willReturn.push(Number(valueToPush.toFixed(decimalLength)));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return willReturn;
}

function renameProps(conditions, inputObject) {
  if (inputObject === undefined) {
    return function (inputObjectHolder) {
      return renameProps(conditions, inputObjectHolder);
    };
  }
  var renamed = {};
  Object.keys(conditions).map(function (renameConditionProp) {
    if (Object.keys(inputObject).includes(renameConditionProp)) {
      renamed[conditions[renameConditionProp]] = inputObject[renameConditionProp];
    }
  });

  return merge(renamed, omit(Object.keys(conditions), inputObject));
}

function resolveMethod(promises) {
  return new Promise(function (res, rej) {
    var counter = 0;
    var props = {};
    var promisedArr = [];
    for (var prop$$1 in promises) {
      props[counter] = prop$$1;
      promisedArr.push(promises[prop$$1]);
      counter++;
    }
    Promise.all(promisedArr).then(function (result) {
      var willReturn = {};
      result.map(function (val, key) {
        var prop$$1 = props[key];
        willReturn[prop$$1] = val;
      });

      res(willReturn);
    }).catch(rej);
  });
}

var resolveSecure = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
    var promised;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            promised = map(function (a) {
              return resolveSecureWrapper(a);
            }, input);
            _context.next = 4;
            return Promise.all(promised);

          case 4:
            return _context.abrupt('return', _context.sent);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function resolveSecure(_x) {
    return _ref.apply(this, arguments);
  };
}();

var resolveSecureWrapper = function resolveSecureWrapper(promise) {
  return new Promise(function (res) {
    promise.then(function (result) {
      res({
        payload: result,
        type: 'RESULT'
      });
    }).catch(function (err) {
      res({
        payload: err,
        type: 'ERROR'
      });
    });
  });
};

function shuffle(arrayRaw) {
  var array = arrayRaw.concat();
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function tapAsync(fn, input) {
  if (arguments.length === 1) {
    return function (inputHolder) {
      return tapAsync(fn, inputHolder);
    };
  }
  if (isPromiseLike(fn) === true) {
    return new Promise(function (resolve, reject$$1) {
      fn(input).then(function () {
        resolve(input);
      }).catch(reject$$1);
    });
  }
  fn(input);

  return input;
}

function throttle(fn, ms) {
  var wait = false;

  return function () {
    if (!wait) {
      for (var _len = arguments.length, input = Array(_len), _key = 0; _key < _len; _key++) {
        input[_key] = arguments[_key];
      }

      fn.apply(null, input);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, ms);
    }
  };
}

function tryCatch(fn, input) {
  var fnType = type(fn);
  if (fnType === 'Async' || fnType === 'Promise') {
    return new Promise(function (resolve) {
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
    return function (whenTrueFnHolder) {
      return when(condition, whenTrueFnHolder);
    };
  }

  return function (input) {
    if (condition(input) === true) {
      return whenTrueFn(input);
    }
    return input;
  };
}

function where(conditions, obj) {
  if (obj === undefined) {
    return function (objHolder) {
      return where(conditions, objHolder);
    };
  }
  var flag = true;
  for (var prop$$1 in conditions) {
    var result = conditions[prop$$1](obj[prop$$1]);
    if (flag && result === false) {
      flag = false;
    }
  }

  return flag;
}

var DELAY = 'RAMBDAX_DELAY';
// Follows code generated by `run rambda`
var always$1 = always;
var complement$1 = complement;
var F$1 = F;
var identity$1 = identity;
var not$1 = not;
var T$1 = T;
var trim$1 = trim;
var add$1 = add;
var addIndex$1 = addIndex;
var adjust$1 = adjust;
var all$1 = all;
var allPass$1 = allPass;
var anyPass$1 = anyPass;
var any$1 = any;
var append$1 = append;
var both$1 = both;
var compose$1 = compose;
var concat$1 = concat;
var contains$1 = contains;
var curry$1 = curry;
var dec$1 = dec;
var defaultTo$1 = defaultTo;
var divide$1 = divide;
var drop$1 = drop;
var dropLast$1 = dropLast;
var either$1 = either;
var endsWith$1 = endsWith;
var inc$1 = inc;
var equals$1 = equals;
var filter$1 = filter;
var find$1 = find;
var findIndex$1 = findIndex;
var flatten$1 = flatten;
var flip$1 = flip;
var forEach$1 = forEach;
var has$1 = has;
var head$1 = head;
var ifElse$1 = ifElse;
var is$1 = is;
var isNil$1 = isNil;
var includes$1 = includes;
var indexOf$1 = indexOf;
var init$1 = init;
var join$1 = join;
var lastIndexOf$1 = lastIndexOf;
var last$1 = last;
var length$1 = length;
var map$1 = map;
var match$1 = match;
var merge$1 = merge;
var modulo$1 = modulo;
var multiply$1 = multiply;
var none$1 = none;
var omit$1 = omit;
var partialCurry$1 = partialCurry;
var path$1 = path;
var pathOr$1 = pathOr;
var pick$1 = pick;
var pickAll$1 = pickAll;
var pipe$1 = pipe;
var pluck$1 = pluck;
var prepend$1 = prepend;
var prop$1 = prop;
var propEq$1 = propEq;
var range$1 = range;
var reduce$1 = reduce;
var reject$1 = reject;
var repeat$1 = repeat;
var replace$1 = replace;
var reverse$1 = reverse;
var sort$1 = sort;
var sortBy$1 = sortBy;
var split$1 = split;
var splitEvery$1 = splitEvery;
var startsWith$1 = startsWith;
var subtract$1 = subtract;
var tap$1 = tap;
var tail$1 = tail;
var take$1 = take;
var takeLast$1 = takeLast;
var test$1 = test;
var times$1 = times;
var toLower$1 = toLower;
var toUpper$1 = toUpper;
var toString$1 = toString;
var type$1 = type;
var uniq$1 = uniq;
var update$1 = update;
var values$1 = values;
var without$1 = without;

export { DELAY, always$1 as always, complement$1 as complement, F$1 as F, identity$1 as identity, not$1 as not, T$1 as T, trim$1 as trim, add$1 as add, addIndex$1 as addIndex, adjust$1 as adjust, all$1 as all, allPass$1 as allPass, anyPass$1 as anyPass, any$1 as any, append$1 as append, both$1 as both, compose$1 as compose, concat$1 as concat, contains$1 as contains, curry$1 as curry, dec$1 as dec, defaultTo$1 as defaultTo, divide$1 as divide, drop$1 as drop, dropLast$1 as dropLast, either$1 as either, endsWith$1 as endsWith, inc$1 as inc, equals$1 as equals, filter$1 as filter, find$1 as find, findIndex$1 as findIndex, flatten$1 as flatten, flip$1 as flip, forEach$1 as forEach, has$1 as has, head$1 as head, ifElse$1 as ifElse, is$1 as is, isNil$1 as isNil, includes$1 as includes, indexOf$1 as indexOf, init$1 as init, join$1 as join, lastIndexOf$1 as lastIndexOf, last$1 as last, length$1 as length, map$1 as map, match$1 as match, merge$1 as merge, modulo$1 as modulo, multiply$1 as multiply, none$1 as none, omit$1 as omit, partialCurry$1 as partialCurry, path$1 as path, pathOr$1 as pathOr, pick$1 as pick, pickAll$1 as pickAll, pipe$1 as pipe, pluck$1 as pluck, prepend$1 as prepend, prop$1 as prop, propEq$1 as propEq, range$1 as range, reduce$1 as reduce, reject$1 as reject, repeat$1 as repeat, replace$1 as replace, reverse$1 as reverse, sort$1 as sort, sortBy$1 as sortBy, split$1 as split, splitEvery$1 as splitEvery, startsWith$1 as startsWith, subtract$1 as subtract, tap$1 as tap, tail$1 as tail, take$1 as take, takeLast$1 as takeLast, test$1 as test, times$1 as times, toLower$1 as toLower, toUpper$1 as toUpper, toString$1 as toString, type$1 as type, uniq$1 as uniq, update$1 as update, values$1 as values, without$1 as without, assocPath$1 as assocPath, compact, composeAsync, debounce, delay, debug, evolve$1 as evolve, greater, ifElseAsync, intersection, isPromiseLike, isValid, less, mapAsync, mapFastAsync, memoize, mergeAll, omitBy, once, pickBy, produce, random, rangeBy, renameProps, resolveMethod as resolve, resolveSecure, shuffle, tapAsync, throttle, tryCatch, when, where };
//# sourceMappingURL=rambdax.esm.js.map
