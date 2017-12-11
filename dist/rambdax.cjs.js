'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var R = require('rambda');

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

var assocPath$1 = R.curry(assocPath);

var types = ['Null', 'Undefined', 'RegExp'];

function compact(arr) {

  return R.filter(function (a) {
    var currentType = R.type(a);
    if (types.includes(currentType)) {
      return false;
    }
    if (currentType === 'Object') {
      return !R.equals(a, {});
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

                if (!(R.type(fn) === 'Async' || R.type(fn) === 'Promise')) {
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

  return R.filter(function (val) {
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

  if (R.type(input) === 'Object' && R.type(schema) === 'Object') {
    var flag = true;
    for (var requirement in schema) {
      if (flag) {
        (function () {
          var rule = schema[requirement];
          var ruleType = R.type(rule);
          var inputProp = input[requirement];
          var inputPropType = R.type(input[requirement]);

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
            var arrayRuleType = R.type(rule[0]);

            if (arrayRuleType === 'String') {
              var result = R.any(function (val) {
                return R.toLower(R.type(val)) !== rule[0];
              }, inputProp);

              if (result) {
                flag = false;
              }
            } else if (arrayRuleType === 'Object') {
              var _result = R.any(function (val) {
                return !isValid(val, rule[0]);
              })(inputProp);
              if (_result) {
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
  R.compose(R.map(function (prop$$1) {
    return willReturn[prop$$1] = obj[prop$$1];
  }), R.sort(sortFn))(Object.keys(obj));

  return willReturn;
};

var stringify = function stringify(a) {
  if (R.type(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(R.type(a))) {
    var compacted = R.replace(/\s{1,}/g, ' ', a.toString());

    return R.replace(/\s/g, '_', R.take(15, compacted));
  } else if (R.type(a) === 'Object') {
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
  if (R.type(fn) === 'Async') {
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
  R.map(function (val) {
    willReturn = R.merge(willReturn, val);
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

    return R.curry(wrap);
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
    if (!(R.type(condition) === 'Async')) {
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
    if (asyncConditionsFlag === false && R.type(conditions[prop$$1]) === 'Async') {
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

      R.map(function (result) {
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
    var loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance));
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
    var decimalLength = R.compose(R.length, R.last, R.split('.'))(distance.toString());
    var _loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance));
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

  return R.merge(renamed, R.omit(Object.keys(conditions), inputObject));
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
            promised = R.map(function (a) {
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
  var fnType = R.type(fn);
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
var always$1 = R.always;
var complement$1 = R.complement;
var F$1 = R.F;
var identity$1 = R.identity;
var not$1 = R.not;
var T$1 = R.T;
var trim$1 = R.trim;
var add$1 = R.add;
var addIndex$1 = R.addIndex;
var adjust$1 = R.adjust;
var all$1 = R.all;
var allPass$1 = R.allPass;
var anyPass$1 = R.anyPass;
var any$1 = R.any;
var append$1 = R.append;
var both$1 = R.both;
var compose$1 = R.compose;
var concat$1 = R.concat;
var contains$1 = R.contains;
var curry$1 = R.curry;
var dec$1 = R.dec;
var defaultTo$1 = R.defaultTo;
var divide$1 = R.divide;
var drop$1 = R.drop;
var dropLast$1 = R.dropLast;
var either$1 = R.either;
var endsWith$1 = R.endsWith;
var inc$1 = R.inc;
var equals$1 = R.equals;
var filter$1 = R.filter;
var find$1 = R.find;
var findIndex$1 = R.findIndex;
var flatten$1 = R.flatten;
var flip$1 = R.flip;
var forEach$1 = R.forEach;
var has$1 = R.has;
var head$1 = R.head;
var ifElse$1 = R.ifElse;
var is$1 = R.is;
var isNil$1 = R.isNil;
var includes$1 = R.includes;
var indexOf$1 = R.indexOf;
var init$1 = R.init;
var join$1 = R.join;
var lastIndexOf$1 = R.lastIndexOf;
var last$1 = R.last;
var length$1 = R.length;
var map$1 = R.map;
var match$1 = R.match;
var merge$1 = R.merge;
var modulo$1 = R.modulo;
var multiply$1 = R.multiply;
var none$1 = R.none;
var omit$1 = R.omit;
var partialCurry$1 = R.partialCurry;
var path$1 = R.path;
var pathOr$1 = R.pathOr;
var pick$1 = R.pick;
var pickAll$1 = R.pickAll;
var pipe$1 = R.pipe;
var pluck$1 = R.pluck;
var prepend$1 = R.prepend;
var prop$1 = R.prop;
var propEq$1 = R.propEq;
var range$1 = R.range;
var reduce$1 = R.reduce;
var reject$1 = R.reject;
var repeat$1 = R.repeat;
var replace$1 = R.replace;
var reverse$1 = R.reverse;
var sort$1 = R.sort;
var sortBy$1 = R.sortBy;
var split$1 = R.split;
var splitEvery$1 = R.splitEvery;
var startsWith$1 = R.startsWith;
var subtract$1 = R.subtract;
var tap$1 = R.tap;
var tail$1 = R.tail;
var take$1 = R.take;
var takeLast$1 = R.takeLast;
var test$1 = R.test;
var times$1 = R.times;
var toLower$1 = R.toLower;
var toUpper$1 = R.toUpper;
var toString$1 = R.toString;
var type$1 = R.type;
var uniq$1 = R.uniq;
var update$1 = R.update;
var values$1 = R.values;
var without$1 = R.without;

exports.DELAY = DELAY;
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
exports.tapAsync = tapAsync;
exports.throttle = throttle;
exports.tryCatch = tryCatch;
exports.when = when;
exports.where = where;
//# sourceMappingURL=rambdax.cjs.js.map
