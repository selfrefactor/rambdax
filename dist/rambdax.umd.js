(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.R = {})));
}(this, (function (exports) { 'use strict';

  function n(r, t) {
    return void 0 === t ? function (t) {
      return n(r, t);
    } : r + t;
  }function r(n) {
    return function (r) {
      for (var t = [], u = arguments.length - 1; u-- > 0;) t[u] = arguments[u + 1];var i = 0;return n.apply(null, [function () {
        for (var n = [], t = arguments.length; t--;) n[t] = arguments[t];return r.apply(null, n.concat([i++]));
      }].concat(t));
    };
  }function t(n, r, u) {
    return void 0 === r ? function (r, u) {
      return t(n, r, u);
    } : void 0 === u ? function (u) {
      return t(n, r, u);
    } : u.concat().map(function (t, i) {
      return i === r ? n(u[r]) : t;
    });
  }function u(n, r) {
    if (void 0 === r) return function (r) {
      return u(n, r);
    };if (void 0 === r.length) return function (n, r) {
      var t = {};for (var u in r) n(r[u], u) && (t[u] = r[u]);return t;
    }(n, r);for (var t = -1, i = 0, o = r.length, e = []; ++t < o;) {
      var f = r[t];n(f) && (e[i++] = f);
    }return e;
  }function i(n, r) {
    return void 0 === r ? function (r) {
      return i(n, r);
    } : u(n, r).length === r.length;
  }function o(n, r) {
    if (void 0 === r) return function (r) {
      return o(n, r);
    };for (var t = 0; t < r.length;) {
      if (n(r[t])) return !0;t++;
    }return !1;
  }function e(n, r) {
    return 1 === arguments.length ? function (r) {
      return e(n, r);
    } : !o(function (n) {
      return !n(r);
    }, n);
  }function f(n) {
    return function () {
      return n;
    };
  }function c(n, r) {
    return 1 === arguments.length ? function (r) {
      return c(n, r);
    } : o(function (n) {
      return n(r);
    })(n);
  }function v(n, r) {
    if (void 0 === r) return function (r) {
      return v(n, r);
    };if ("string" == typeof r) return "" + r + n;var t = r.concat();return t.push(n), t;
  }function l(n, r) {
    return void 0 === r ? function (r) {
      return l(n, r);
    } : function (t) {
      return n(t) && r(t);
    };
  }function a(n) {
    return function (r) {
      return !n(r);
    };
  }function d() {
    for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];return function () {
      for (var r = [], t = arguments.length; t--;) r[t] = arguments[t];var u = n.slice();if (u.length > 0) {
        for (var i = u.pop().apply(void 0, r); u.length > 0;) i = u.pop()(i);return i;
      }
    };
  }function g(n, r) {
    return void 0 === r ? function (r) {
      return g(n, r);
    } : "string" == typeof n ? "" + n + r : n.concat(r);
  }function h(n) {
    var r = typeof n;if (null === n) return "Null";if (void 0 === n) return "Undefined";if ("boolean" === r) return "Boolean";if ("number" === r) return "Number";if ("string" === r) return "String";if (Array.isArray(n)) return "Array";if (n instanceof RegExp) return "RegExp";var t = n.toString();return t.startsWith("async") ? "Async" : "[object Promise]" === t ? "Promise" : t.includes("function") || t.includes("=>") ? "Function" : "Object";
  }function s(n, r) {
    if (1 === arguments.length) return function (r) {
      return s(n, r);
    };if (n === r) return !0;var t = h(n);if (t !== h(r)) return !1;if ("Array" === t) {
      var u = Array.from(n),
          i = Array.from(r);if (u.toString() !== i.toString()) return !1;var o = !0;return u.forEach(function (n, r) {
        o && (n === i[r] || s(n, i[r]) || (o = !1));
      }), o;
    }if ("Object" === t) {
      var e = Object.keys(n);if (e.length !== Object.keys(r).length) return !1;var f = !0;return e.forEach(function (t) {
        if (f) {
          var u = n[t],
              i = r[t];u === i || s(u, i) || (f = !1);
        }
      }), f;
    }return !1;
  }function p(n, r) {
    if (void 0 === r) return function (r) {
      return p(n, r);
    };for (var t = -1, u = !1; ++t < r.length && !u;) s(r[t], n) && (u = !0);return u;
  }function y(n, r) {
    return void 0 === r && (r = []), function () {
      for (var t, u = [], i = arguments.length; i--;) u[i] = arguments[i];return (t = r.concat(u)).length >= n.length ? n.apply(void 0, t) : y(n, t);
    };
  }function b(n) {
    return n - 1;
  }function A(n, r) {
    return 1 === arguments.length ? function (r) {
      return A(n, r);
    } : void 0 === r || null === r || !0 === Number.isNaN(r) ? n : r;
  }function m(n, r) {
    if (1 === arguments.length) return function (r) {
      return m(n, r);
    };if (null !== r && void 0 !== r) {
      var t = "string" == typeof n ? n = n.split(",") : n,
          u = {};for (var i in r) t.includes(i) || (u[i] = r[i]);return u;
    }
  }function j(n, r) {
    if (1 === arguments.length) return function (r) {
      return j(n, r);
    };if (null !== r && void 0 !== r) {
      var t = {};for (var u in r) u !== "" + n && (t[u] = r[u]);return t;
    }
  }function O(n, r) {
    return void 0 === r ? function (r) {
      return O(n, r);
    } : n / r;
  }function S(n, r) {
    return void 0 === r ? function (r) {
      return S(n, r);
    } : r.slice(n);
  }function N(n, r) {
    return void 0 === r ? function (r) {
      return N(n, r);
    } : r.slice(0, -n);
  }function E(n, r) {
    return void 0 === r ? function (r) {
      return E(n, r);
    } : function (t) {
      return n(t) || r(t);
    };
  }function P(n, r) {
    return void 0 === r ? function (r) {
      return P(n, r);
    } : r.endsWith(n);
  }function k() {
    return !1;
  }function x(n, r) {
    return void 0 === r ? function (r) {
      return x(n, r);
    } : r.find(n);
  }function W(n, r) {
    if (void 0 === r) return function (r) {
      return W(n, r);
    };for (var t = r.length, u = -1; ++u < t;) if (n(r[u])) return u;return -1;
  }function w(n, r) {
    r = void 0 === r ? [] : r;for (var t = 0; t < n.length; t++) Array.isArray(n[t]) ? w(n[t], r) : r.push(n[t]);return r;
  }function C(n) {
    for (var r = [], t = arguments.length - 1; t-- > 0;) r[t] = arguments[t + 1];return function (n) {
      return function () {
        for (var r = [], t = arguments.length; t--;) r[t] = arguments[t];return 1 === r.length ? function (t) {
          return n(t, r[0]);
        } : 2 === r.length ? n(r[1], r[0]) : void 0;
      };
    }(n);
  }function R(n, r) {
    if (void 0 === r) return function (r) {
      return R(n, r);
    };if (void 0 === r.length) return function (n, r) {
      var t = {};for (var u in r) t[u] = n(r[u], u);return t;
    }(n, r);for (var t = -1, u = r.length, i = Array(u); ++t < u;) i[t] = n(r[t]);return i;
  }function U(n, r) {
    return void 0 === r ? function (r) {
      return U(n, r);
    } : (R(n, r), r);
  }function B(n, r) {
    if (void 0 === r) return function (r) {
      return B(n, r);
    };for (var t = {}, u = 0; u < r.length; u++) {
      var i = r[u],
          o = n(i);t[o] || (t[o] = []), t[o].push(i);
    }return t;
  }function F(n, r) {
    return void 0 === r ? function (r) {
      return F(n, r);
    } : void 0 !== r[n];
  }function L(n) {
    return "string" == typeof n ? n[0] || "" : n[0];
  }function q(n) {
    return n;
  }function z(n, r, t) {
    return void 0 === r ? function (r, t) {
      return z(n, r, t);
    } : void 0 === t ? function (t) {
      return z(n, r, t);
    } : function (u) {
      return !0 === ("boolean" == typeof n ? n : n(u)) ? r(u) : t(u);
    };
  }function D(n) {
    return n + 1;
  }function G(n, r) {
    return void 0 === r ? function (r) {
      return G(n, r);
    } : r.includes(n);
  }function H(n, r) {
    if (void 0 === r) return function (r) {
      return H(n, r);
    };for (var t = {}, u = 0; u < r.length; u++) {
      var i = r[u];t[n(i)] = i;
    }return t;
  }function I(n, r) {
    if (void 0 === r) return function (r) {
      return I(n, r);
    };for (var t = -1, u = r.length; ++t < u;) if (r[t] === n) return t;return -1;
  }function J(n, r, t) {
    var u = -1,
        i = n.length;(t = t > i ? i : t) < 0 && (t += i), i = r > t ? 0 : t - r >>> 0, r >>>= 0;for (var o = Array(i); ++u < i;) o[u] = n[u + r];return o;
  }function K(n) {
    return "string" == typeof n ? n.slice(0, -1) : n.length ? J(n, 0, -1) : [];
  }function M(n, r) {
    return 1 === arguments.length ? function (r) {
      return M(n, r);
    } : null != r && r.constructor === n || r instanceof n;
  }function Q(n) {
    return void 0 === n || null === n;
  }function T(n, r) {
    return void 0 === r ? function (r) {
      return T(n, r);
    } : r.join(n);
  }function V(n) {
    return Object.keys(n);
  }function X(n) {
    return "string" == typeof n ? n[n.length - 1] || "" : n[n.length - 1];
  }function Y(n, r) {
    if (void 0 === r) return function (r) {
      return Y(n, r);
    };var t = -1;return r.map(function (r, u) {
      s(r, n) && (t = u);
    }), t;
  }function Z(n) {
    return n.length;
  }function $(n, r) {
    if (void 0 === r) return function (r) {
      return $(n, r);
    };var t = r.match(n);return null === t ? [] : t;
  }function _(n, r) {
    return void 0 === r ? function (r) {
      return _(n, r);
    } : Object.assign({}, n, r);
  }function nn(n, r) {
    return 1 === arguments.length ? function (r) {
      return nn(n, r);
    } : r > n ? r : n;
  }function rn(n, r, t) {
    return 2 === arguments.length ? function (t) {
      return rn(n, r, t);
    } : 1 === arguments.length ? function (r, t) {
      return rn(n, r, t);
    } : n(t) > n(r) ? t : r;
  }function tn(n, r) {
    return 1 === arguments.length ? function (r) {
      return tn(n, r);
    } : r < n ? r : n;
  }function un(n, r, t) {
    return 2 === arguments.length ? function (t) {
      return un(n, r, t);
    } : 1 === arguments.length ? function (r, t) {
      return un(n, r, t);
    } : n(t) < n(r) ? t : r;
  }function on(n, r) {
    return void 0 === r ? function (r) {
      return on(n, r);
    } : n % r;
  }function en(n, r) {
    return void 0 === r ? function (r) {
      return en(n, r);
    } : n * r;
  }function fn(n, r) {
    return void 0 === r ? function (r) {
      return fn(n, r);
    } : 0 === r.filter(n).length;
  }function cn(n) {
    return !n;
  }function vn(n, r) {
    if (void 0 === r) return function (r) {
      return vn(n, r);
    };var t = n < 0 ? r.length + n : n;return "[object String]" === Object.prototype.toString.call(r) ? r.charAt(t) : r[t];
  }function ln(n, r) {
    return void 0 === r && (r = {}), function (t) {
      return "Async" === h(n) || "Promise" === h(n) ? new Promise(function (u, i) {
        n(_(t, r)).then(u).catch(i);
      }) : n(_(t, r));
    };
  }function an(n, r) {
    if (1 === arguments.length) return function (r) {
      return an(n, r);
    };if (null !== r && void 0 !== r) {
      for (var t = r, u = 0, i = "string" == typeof n ? n.split(".") : n; u < i.length;) {
        if (null === t || void 0 === t) return;t = t[i[u]], u++;
      }return t;
    }
  }var dn = /*#__PURE__*/y(function (n, r, t) {
    return A(n, an(r, t));
  });function gn(n, r) {
    if (1 === arguments.length) return function (r) {
      return gn(n, r);
    };if (null !== r && void 0 !== r) {
      for (var t = "string" == typeof n ? n.split(",") : n, u = {}, i = 0; i < t.length;) t[i] in r && (u[t[i]] = r[t[i]]), i++;return u;
    }
  }function hn(n, r) {
    if (1 === arguments.length) return function (r) {
      return hn(n, r);
    };if (null !== r && void 0 !== r) {
      for (var t = "string" == typeof n ? n.split(",") : n, u = {}, i = 0; i < t.length;) u[t[i]] = t[i] in r ? r[t[i]] : void 0, i++;return u;
    }
  }function sn() {
    for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];return d.apply(void 0, n.reverse());
  }function pn(n, r) {
    if (void 0 === r) return function (r) {
      return pn(n, r);
    };var t = [];return R(function (r) {
      void 0 !== r[n] && t.push(r[n]);
    }, r), t;
  }function yn(n, r) {
    if (void 0 === r) return function (r) {
      return yn(n, r);
    };if ("string" == typeof r) return "" + n + r;var t = r.concat();return t.unshift(n), t;
  }function bn(n, r) {
    return void 0 === r ? function (r) {
      return bn(n, r);
    } : r[n];
  }function An(n, r, t) {
    return void 0 === r ? function (r, t) {
      return An(n, r, t);
    } : void 0 === t ? function (t) {
      return An(n, r, t);
    } : t[n] === r;
  }function mn(n, r) {
    if (void 0 === r) return function (r) {
      return mn(n, r);
    };for (var t = [], u = n; u < r; u++) t.push(u);return t;
  }function jn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return jn(n, r, t);
    } : void 0 === t ? function (t) {
      return jn(n, r, t);
    } : t.reduce(n, r);
  }function On(n, r) {
    return void 0 === r ? function (r) {
      return On(n, r);
    } : u(function (r) {
      return !n(r);
    }, r);
  }function Sn(n, r) {
    return void 0 === r ? function (r) {
      return Sn(n, r);
    } : Array(r).fill(n);
  }function Nn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return Nn(n, r, t);
    } : void 0 === t ? function (t) {
      return Nn(n, r, t);
    } : t.replace(n, r);
  }function En(n) {
    return n.concat().reverse();
  }function Pn(n, r) {
    return void 0 === r ? function (r) {
      return Pn(n, r);
    } : r.concat().sort(n);
  }function kn(n, r) {
    return void 0 === r ? function (r) {
      return kn(n, r);
    } : r.concat().sort(function (r, t) {
      var u = n(r),
          i = n(t);return u < i ? -1 : u > i ? 1 : 0;
    });
  }function xn(n, r) {
    return void 0 === r ? function (r) {
      return xn(n, r);
    } : r.split(n);
  }function Wn(n, r) {
    if (void 0 === r) return function (r) {
      return Wn(n, r);
    };for (var t = n > 1 ? n : 1, u = [], i = 0; i < r.length;) u.push(r.slice(i, i += t));return u;
  }function wn(n, r) {
    return void 0 === r ? function (r) {
      return wn(n, r);
    } : r.startsWith(n);
  }function Cn(n, r) {
    return void 0 === r ? function (r) {
      return Cn(n, r);
    } : n - r;
  }function Rn() {
    return !0;
  }function Un(n) {
    return S(1, n);
  }function Bn(n, r) {
    return void 0 === r ? function (r) {
      return Bn(n, r);
    } : "string" == typeof r ? r.slice(0, n) : J(r, 0, n);
  }function Fn(n, r) {
    if (void 0 === r) return function (r) {
      return Fn(n, r);
    };var t = r.length,
        u = n > t ? t : n;return "string" == typeof r ? r.slice(t - u) : J(r, u = t - u, t);
  }function Ln(n, r) {
    return void 0 === r ? function (r) {
      return Ln(n, r);
    } : (n(r), r);
  }function qn(n, r) {
    return void 0 === r ? function (r) {
      return qn(n, r);
    } : -1 !== r.search(n);
  }function zn(n, r) {
    return void 0 === r ? function (r) {
      return zn(n, r);
    } : R(n, mn(0, r));
  }function Dn(n) {
    return n.toLowerCase();
  }function Gn(n) {
    return n.toString();
  }function Hn(n) {
    return n.toUpperCase();
  }function In(n) {
    return n.trim();
  }function Jn(n) {
    for (var r = -1, t = []; ++r < n.length;) {
      var u = n[r];p(u, t) || t.push(u);
    }return t;
  }function Kn(n, r) {
    if (1 === arguments.length) return function (r) {
      return Kn(n, r);
    };for (var t = -1, u = [], i = function () {
      var i = r[t];o(function (r) {
        return n(i, r);
      }, u) || u.push(i);
    }; ++t < r.length;) i();return u;
  }function Mn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return Mn(n, r, t);
    } : void 0 === t ? function (t) {
      return Mn(n, r, t);
    } : t.concat().fill(r, n, n + 1);
  }function Qn(n) {
    var r = [];for (var t in n) r.push(n[t]);return r;
  }function Tn(n, r) {
    return jn(function (r, t) {
      return p(t, n) ? r : r.concat(t);
    }, [], r);
  }function Vn(n, t) {
    return void 0 === t ? function (r) {
      return Vn(n, r);
    } : r(jn)(function (n, r, u) {
      return t[u] ? n.concat([[r, t[u]]]) : n;
    }, [], n);
  }function Xn(n, r) {
    return void 0 === r ? function (r) {
      return Xn(n, r);
    } : n.reduce(function (n, t, u) {
      return n[t] = r[u], n;
    }, {});
  }

  function assocPath(path, x$$1, obj) {
    const pathValue = typeof path === 'string' ? path.split('.') : path;

    const lastProp = pathValue[pathValue.length - 1];

    let newProps = { [lastProp]: x$$1 };

    let counter = pathValue.length - 2;

    while (counter > -1) {
      const prop = pathValue[counter];
      newProps = { [prop]: newProps };

      counter--;
    }

    return Object.assign({}, obj, newProps);
  }

  var assocPath$1 = /*#__PURE__*/y(assocPath);

  const types = ['Null', 'Undefined', 'RegExp'];

  function compact(arr) {
    return u(a$$1 => {
      const currentType = h(a$$1);
      if (types.includes(currentType)) {
        return false;
      }
      if (currentType === 'Object') {
        return !s(a$$1, {});
      }

      return a$$1.length !== 0;
    }, arr);
  }

  function composeAsync(...inputArguments) {
    try {
      return async function (startArgument) {
        let argumentsToPass = startArgument;

        while (inputArguments.length !== 0) {
          const fn$$1 = inputArguments.pop();
          if (h(fn$$1) === 'Async' || h(fn$$1) === 'Promise') {
            argumentsToPass = await fn$$1(argumentsToPass);
          } else {
            argumentsToPass = fn$$1(argumentsToPass);
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
    const propRules = u(x$$1 => clone[x$$1] !== undefined)(Object.keys(rules));

    if (propRules.length === 0) {
      return input;
    }

    propRules.map(prop => {
      const fn$$1 = rules[prop];
      if (h(fn$$1) === 'Function') {
        clone[prop] = fn$$1(clone[prop]);
      } else if (h(fn$$1) === 'Object') {
        clone[prop] = evolve(fn$$1, clone[prop]);
      }
    });

    return clone;
  }

  var evolve$1 = /*#__PURE__*/y(evolve);

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

    return Nn(marker, `${marker}${injection}`, content);
  }

  function isPromiseLike(x$$1) {
    return ['Async', 'Promise'].includes(h(x$$1));
  }

  function isValid({ input, schema }) {
    if (h(input) === 'Object' && h(schema) === 'Object') {

      let flag = true;
      const boom = boomFlag => {
        if (!boomFlag) {
          flag = false;
        }
      };

      for (const requirement in schema) {

        if (flag) {
          const rule = schema[requirement];
          const ruleType = h(rule);
          const inputProp = input[requirement];
          const inputPropType = h(input[requirement]);

          if (ruleType === 'Object') {
            /**
             * This rule is standalone schema - schema = {a: {b: 'string'}}
             */
            const isValidResult = isValid({
              input: inputProp,
              schema: rule
            });
            boom(isValidResult);
          } else if (ruleType === 'String') {
            /**
             * rule is concrete rule such as 'number' so two types are compared
             */
            boom(Dn(inputPropType) === rule);
          } else if (typeof rule === 'function') {
            /**
             * rule is function so we pass to it the input
             */
            boom(rule(inputProp));
          } else if (ruleType === 'Array' && inputPropType === 'String') {
            /**
             * enum case | rule is like a: ['foo', 'bar']
             */
            boom(p(inputProp, rule));
          } else if (ruleType === 'Array' && rule.length === 1 && inputPropType === 'Array') {
            /**
             * 1. array of type | rule is like a: ['number']
             * 2. rule is like a: [{from: 'string'}]
             */
            const currentRule = rule[0];
            const currentRuleType = h(rule[0]);
            // Check if rule is invalid
            boom(currentRuleType === 'String' || currentRuleType === 'Object');

            if (currentRuleType === 'String') {

              /**
               * 1. array of type
               */
              const isInvalidResult = o(inputPropInstance => h(inputPropInstance).toLowerCase() !== currentRule, inputProp);
              boom(!isInvalidResult);
            }

            if (currentRuleType === 'Object') {

              /**
               * 2. rule is like a: [{from: 'string'}]
               */
              const isValidResult = i(inputPropInstance => isValid({ input: inputPropInstance, schema: currentRule }), inputProp);
              boom(isValidResult);
            }
          } else if (ruleType === 'RegExp' && inputPropType === 'String') {

            boom(qn(rule, inputProp));
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
      if (Array.isArray(arr)) {
        const willReturn = [];
        for (const a of arr) {
          willReturn.push((await fn(a)));
        }

        return willReturn;
      }

      const willReturn = {};
      for (const prop in arr) {
        willReturn[prop] = await fn(arr[prop], prop);
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
    const sortFn = (a$$1, b$$1) => a$$1 > b$$1;
    const willReturn = {};
    d(R(prop => willReturn[prop] = obj[prop]), Pn(sortFn))(Object.keys(obj));

    return willReturn;
  };

  const stringify = a$$1 => {
    if (h(a$$1) === 'String') {
      return a$$1;
    } else if (['Function', 'Async'].includes(h(a$$1))) {
      const compacted = Nn(/\s{1,}/g, ' ', a$$1.toString());

      return Nn(/\s/g, '_', Bn(15, compacted));
    } else if (h(a$$1) === 'Object') {
      a$$1 = normalizeObject(a$$1);
    }

    return JSON.stringify(a$$1);
  };

  const generateProp = (fn$$1, ...inputArguments) => {
    let propString = '';
    inputArguments.map(inputArgument => {
      propString += `${stringify(inputArgument)}_`;
    });

    return `${propString}${stringify(fn$$1)}`;
  };

  function memoize(fn$$1, ...inputArguments) {
    if (arguments.length === 1) {
      return (...inputArgumentsHolder) => memoize(fn$$1, ...inputArgumentsHolder);
    }
    const prop = generateProp(fn$$1, ...inputArguments);
    if (prop in cache) {
      return cache[prop];
    }
    if (h(fn$$1) === 'Async') {
      return new Promise(resolve => {
        fn$$1(...inputArguments).then(result => {
          cache[prop] = result;
          resolve(result);
        });
      });
    }
    const result = fn$$1(...inputArguments);
    cache[prop] = result;

    return result;
  }

  function mergeAll(arr) {
    let willReturn = {};
    R(val => {
      willReturn = _(willReturn, val);
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

  function onceFn(fn$$1, context) {
    let result;

    return function () {
      if (fn$$1) {
        result = fn$$1.apply(context || this, arguments);
        fn$$1 = null;
      }

      return result;
    };
  }

  function once(fn$$1, context) {
    if (arguments.length === 1) {
      const wrap = onceFn(fn$$1, context);

      return y(wrap);
    }

    return onceFn(fn$$1, context);
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
      if (!(h(condition) === 'Async')) {
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
      if (asyncConditionsFlag === false && h(conditions[prop]) === 'Async') {
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

        R(result => willReturn[result.type] = result.payload, results);

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
      const loopIndexes = mn(0, Math.floor((endNum - startNum) / distance));
      for (const i$$1 of loopIndexes) {
        valueToPush += distance;
        willReturn.push(valueToPush);
      }
    } else {
      const decimalLength = d(Z, X, xn('.'))(distance.toString());
      const loopIndexes = mn(0, Math.floor((endNum - startNum) / distance));
      for (const i$$1 of loopIndexes) {
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

    return _(renamed, m(Object.keys(conditions), inputObject));
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
      const promised = R(a$$1 => resolveSecureWrapper(a$$1), input);

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

  const NO_MATCH_FOUND = /*#__PURE__*/Symbol('NO_MATCH_FOUND');

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
    const willReturn = typeof testValue === 'function' ? testValue(matchValue) : s(testValue, matchValue);

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

  function createThenable$1(x) {
    return async function (input) {
      return x(input);
    };
  }

  function whenAsync(condition, whenTrueFn) {
    if (whenTrueFn === undefined) {

      return (condition, whenTrueFnHolder) => whenAsync(condition, whenTrueFnHolder);
    }

    return input => new Promise((resolve, reject) => {
      const whenTrueFnPromise = createThenable$1(whenTrueFn);

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

  const DELAY = 'RAMBDAX_DELAY';

  // Follows code generated by `run rambda`
  const add = n;
  const addIndex = r;
  const adjust = t;
  const all = i;
  const allPass = e;
  const always = f;
  const any = o;
  const anyPass = c;
  const append = v;
  const both = l;
  const complement = a;
  const compose = d;
  const concat = g;
  const contains = p;
  const curry = y;
  const dec = b;
  const defaultTo = A;
  const dissoc = j;
  const divide = O;
  const drop = S;
  const dropLast = N;
  const either = E;
  const endsWith = P;
  const equals = s;
  const F$1 = k;
  const filter = u;
  const find = x;
  const findIndex = W;
  const flatten = w;
  const flip = C;
  const forEach = U;
  const groupBy = B;
  const has = F;
  const head = L;
  const identity = q;
  const ifElse = z;
  const inc = D;
  const includes = G;
  const indexBy = H;
  const indexOf = I;
  const init = K;
  const is$1 = M;
  const isNil = Q;
  const join = T;
  const keys = V;
  const last = X;
  const lastIndexOf = Y;
  const length = Z;
  const map = R;
  const match = $;
  const merge = _;
  const max = nn;
  const maxBy = rn;
  const min = tn;
  const minBy = un;
  const modulo = on;
  const multiply = en;
  const none = fn;
  const not = cn;
  const nth = vn;
  const omit = m;
  const partialCurry = ln;
  const path = an;
  const pathOr = dn;
  const pick = gn;
  const pickAll = hn;
  const pipe = sn;
  const pluck = pn;
  const prepend = yn;
  const prop = bn;
  const propEq = An;
  const range = mn;
  const reduce = jn;
  const reject = On;
  const repeat = Sn;
  const replace = Nn;
  const reverse = En;
  const sort = Pn;
  const sortBy = kn;
  const split = xn;
  const splitEvery = Wn;
  const startsWith = wn;
  const subtract = Cn;
  const T$1 = Rn;
  const tail = Un;
  const take = Bn;
  const takeLast = Fn;
  const tap = Ln;
  const test = qn;
  const times = zn;
  const toLower = Dn;
  const toString = Gn;
  const toUpper = Hn;
  const trim = In;
  const type = h;
  const uniq = Jn;
  const uniqWith = Kn;
  const update = Mn;
  const values = Qn;
  const without = Tn;
  const zip = Vn;
  const zipObj = Xn;

  exports.DELAY = DELAY;
  exports.add = add;
  exports.addIndex = addIndex;
  exports.adjust = adjust;
  exports.all = all;
  exports.allPass = allPass;
  exports.always = always;
  exports.any = any;
  exports.anyPass = anyPass;
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
  exports.equals = equals;
  exports.F = F$1;
  exports.filter = filter;
  exports.find = find;
  exports.findIndex = findIndex;
  exports.flatten = flatten;
  exports.flip = flip;
  exports.forEach = forEach;
  exports.groupBy = groupBy;
  exports.has = has;
  exports.head = head;
  exports.identity = identity;
  exports.ifElse = ifElse;
  exports.inc = inc;
  exports.includes = includes;
  exports.indexBy = indexBy;
  exports.indexOf = indexOf;
  exports.init = init;
  exports.is = is$1;
  exports.isNil = isNil;
  exports.join = join;
  exports.keys = keys;
  exports.last = last;
  exports.lastIndexOf = lastIndexOf;
  exports.length = length;
  exports.map = map;
  exports.match = match;
  exports.merge = merge;
  exports.max = max;
  exports.maxBy = maxBy;
  exports.min = min;
  exports.minBy = minBy;
  exports.modulo = modulo;
  exports.multiply = multiply;
  exports.none = none;
  exports.not = not;
  exports.nth = nth;
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
  exports.T = T$1;
  exports.tail = tail;
  exports.take = take;
  exports.takeLast = takeLast;
  exports.tap = tap;
  exports.test = test;
  exports.times = times;
  exports.toLower = toLower;
  exports.toString = toString;
  exports.toUpper = toUpper;
  exports.trim = trim;
  exports.type = type;
  exports.uniq = uniq;
  exports.uniqWith = uniqWith;
  exports.update = update;
  exports.values = values;
  exports.without = without;
  exports.zip = zip;
  exports.zipObj = zipObj;
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
  exports.whenAsync = whenAsync;
  exports.where = where;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
