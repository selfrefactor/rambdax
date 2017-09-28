'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Rambda = require('rambda');
var Rambda__default = _interopDefault(Rambda);

function isType$1(xType, x) {
  if (arguments.length === 1) {
    return function (xHolder) {
      return isType$1(xType, xHolder);
    };
  }

  return Rambda.type(x) === xType;
}

var types = ['Null', 'Undefined', 'RegExp'];

function compact(arr) {

  return Rambda.filter(function (a) {
    var currentType = Rambda.type(a);
    if (types.includes(currentType)) {
      return false;
    }
    if (currentType === 'Object') {
      return !Rambda.equals(a, {});
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
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
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
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
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

                if (!(Rambda.type(fn) === 'Async' || Rambda.type(fn) === 'Promise')) {
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
    var thisHolder = this;
    var args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(thisHolder, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
    if (callNow) {
      func.apply(thisHolder, args);
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

var _require = require('rambda');
var type$1 = _require.type;
var curry$1 = _require.curry;
var filter$1 = _require.filter;

function evolve(rules, input) {
  var clone = Object.assign({}, input);
  var propRules = filter$1(function (x) {
    return clone[x] !== undefined;
  })(Object.keys(rules));

  if (propRules.length === 0) {
    return input;
  }

  propRules.map(function (prop) {
    var fn = rules[prop];
    if (type$1(fn) === 'Function') {
      clone[prop] = fn(clone[prop]);
    } else if (type$1(fn) === 'Object') {
      clone[prop] = evolve(fn, clone[prop]);
    }
  });

  return clone;
}

var evolve$1 = curry$1(evolve);

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
    return new Promise(function (resolve, reject) {
      var conditionPromise = createThenable(condition);
      var ifFnPromise = createThenable(ifFn);
      var elseFnPromise = createThenable(elseFn);

      conditionPromise(input).then(function (conditionResult) {
        var promised = conditionResult === true ? ifFnPromise : elseFnPromise;

        promised(input).then(resolve).catch(reject);
      }).catch(reject);
    });
  };
}

function intersection(a, b) {
  if (b === undefined) {
    return function (bHolder) {
      return intersection(a, bHolder);
    };
  }

  return Rambda.filter(function (val) {
    return b.includes(val);
  })(a);
}

var _require$1 = require('rambda');
var type$2 = _require$1.type;

function isPromiseLike(x) {
  return ['Async', 'Promise'].includes(type$2(x));
}

function isValid(_ref) {
  var input = _ref.input,
      schema = _ref.schema;

  if (Rambda.type(input) === 'Object' && Rambda.type(schema) === 'Object') {
    var flag = true;
    for (var requirement in schema) {
      if (flag) {
        (function () {
          var rule = schema[requirement];
          var ruleType = Rambda.type(rule);
          var inputProp = input[requirement];
          var inputPropType = Rambda.type(input[requirement]);

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
              if (Rambda.toLower(inputPropType) !== rule) {
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
            if (!Rambda.contains(inputProp, rule)) {
              flag = false;
            }
          } else if (ruleType === 'Array' && inputPropType === 'Array' && rule.length === 1 && inputProp.length > 0) {
            var arrayRuleType = Rambda.type(rule[0]);

            if (arrayRuleType === 'String') {
              var result = Rambda.any(function (val) {
                return Rambda.toLower(Rambda.type(val)) !== rule[0];
              }, inputProp);

              if (result) {
                flag = false;
              }
            } else if (arrayRuleType === 'Object') {
              var _result = Rambda.any(function (val) {
                return !isValid(val, rule[0]);
              })(inputProp);
              if (_result) {
                flag = false;
              }
            }
          } else if (ruleType === 'RegExp' && inputPropType === 'String') {
            if (!Rambda.test(rule, inputProp)) {
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

  return new Promise(function (resolve, reject) {
    mapAsyncFn(fn, arr).then(resolve).catch(reject);
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

  return new Promise(function (resolve, reject) {
    mapFastAsyncFn(fn, arr).then(resolve).catch(reject);
  });
}

var cache = {};

var normalizeObject = function normalizeObject(obj) {
  var sortFn = function sortFn(a, b) {
    return a > b;
  };
  var willReturn = {};
  Rambda.compose(Rambda.map(function (prop) {
    return willReturn[prop] = obj[prop];
  }), Rambda.sort(sortFn))(Object.keys(obj));

  return willReturn;
};

var stringify = function stringify(a) {
  if (Rambda.type(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(Rambda.type(a))) {
    var compacted = Rambda.replace(/\s{1,}/g, ' ', a.toString());

    return Rambda.replace(/\s/g, '_', Rambda.take(15, compacted));
  } else if (Rambda.type(a) === 'Object') {
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
    propString += stringify(inputArgument) + '_';
  });

  return '' + propString + stringify(fn);
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
  var prop = generateProp.apply(undefined, [fn].concat(inputArguments));
  if (prop in cache) {
    return cache[prop];
  }
  if (Rambda.type(fn) === 'Async') {
    return new Promise(function (resolve) {
      fn.apply(undefined, inputArguments).then(function (result) {
        cache[prop] = result;
        resolve(result);
      });
    });
  }
  var result = fn.apply(undefined, inputArguments);
  cache[prop] = result;

  return result;
}

function mergeAll(arr) {
  var willReturn = {};
  Rambda.map(function (val) {
    willReturn = Rambda.merge(willReturn, val);
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
  for (var prop in obj) {
    if (!fn(prop, obj[prop])) {
      willReturn[prop] = obj[prop];
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

    return Rambda.curry(wrap);
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
  for (var prop in obj) {
    if (fn(prop, obj[prop])) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}

function helper(_ref) {
  var condition = _ref.condition,
      inputArgument = _ref.inputArgument,
      prop = _ref.prop;

  return new Promise(function (resolve, reject) {
    if (!(Rambda.type(condition) === 'Async')) {
      return resolve({
        type: prop,
        payload: condition(inputArgument)
      });
    }

    condition(inputArgument).then(function (result) {
      resolve({
        type: prop,
        payload: result
      });
    }).catch(function (err) {
      return reject(err);
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
  for (var prop in conditions) {
    if (asyncConditionsFlag === false && Rambda.type(conditions[prop]) === 'Async') {
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
      inputArgument: inputArgument,
      condition: condition,
      prop: _prop2
    }));
  }

  return new Promise(function (resolve, reject) {
    Promise.all(promised).then(function (results) {
      var willReturn = {};

      Rambda.map(function (result) {
        return willReturn[result.type] = result.payload;
      }, results);

      resolve(willReturn);
    }).catch(function (err) {
      return reject(err);
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
    var loopIndexes = Rambda.range(0, Math.floor((endNum - startNum) / distance));
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
    var decimalLength = Rambda.compose(Rambda.length, Rambda.last, Rambda.split('.'))(distance.toString());
    var _loopIndexes = Rambda.range(0, Math.floor((endNum - startNum) / distance));
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

  return Rambda.merge(renamed, Rambda.omit(Object.keys(conditions), inputObject));
}

function resolve(promises) {
  return new Promise(function (res, rej) {
    var counter = 0;
    var props = {};
    var promisedArr = [];
    for (var prop in promises) {
      props[counter] = prop;
      promisedArr.push(promises[prop]);
      counter++;
    }
    Promise.all(promisedArr).then(function (result) {
      var willReturn = {};
      result.map(function (val, key) {
        var prop = props[key];
        willReturn[prop] = val;
      });

      res(willReturn);
    }).catch(rej);
  });
}

var wrapper = function wrapper(promise) {
  return new Promise(function (resolve) {
    promise.then(function (result) {
      resolve({
        payload: result,
        type: 'RESULT'
      });
    }).catch(function (err) {
      resolve({
        payload: err,
        type: 'ERROR'
      });
    });
  });
};

var resolveSecure = (function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
    var promised;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            promised = Rambda.map(function (a) {
              return wrapper(a);
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

  function resolve(_x) {
    return _ref.apply(this, arguments);
  }

  return resolve;
})();

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
    return new Promise(function (resolve, reject) {
      fn(input).then(function () {
        resolve(input);
      }).catch(reject);
    });
  }
  fn(input);

  return input;
}

function throttle(callback, ms) {
  var wait = false;

  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, ms);
    }
  };
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
  for (var prop in conditions) {
    var result = conditions[prop](obj[prop]);
    if (flag && result === false) {
      flag = false;
    }
  }

  return flag;
}

var DELAY = 'RAMBDAX_DELAY';
var isArray = function isArray(x) {
  return isType$1('Array', x);
};
var isObject = function isObject(x) {
  return isType$1('Object', x);
};
var isString = function isString(x) {
  return isType$1('String', x);
};
var isType = isType$1;
Object.keys(Rambda__default).map(function (method) {
  exports[method] = Rambda__default[method];
});

exports.DELAY = DELAY;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isString = isString;
exports.isType = isType;
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
exports.resolve = resolve;
exports.resolveSecure = resolveSecure;
exports.shuffle = shuffle;
exports.tapAsync = tapAsync;
exports.throttle = throttle;
exports.when = when;
exports.where = where;
//# sourceMappingURL=rambdax.cjs.js.map
