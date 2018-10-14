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
      for (var t = [], u = arguments.length - 1; u-- > 0;) t[u] = arguments[u + 1];var e = 0;return n.apply(null, [function () {
        for (var n = [], t = arguments.length; t--;) n[t] = arguments[t];return r.apply(null, n.concat([e++]));
      }].concat(t));
    };
  }function t(n, r, u) {
    return void 0 === r ? function (r, u) {
      return t(n, r, u);
    } : void 0 === u ? function (u) {
      return t(n, r, u);
    } : u.concat().map(function (t, e) {
      return e === r ? n(u[r]) : t;
    });
  }function u(n, r) {
    if (1 === arguments.length) return function (r) {
      return u(n, r);
    };if (void 0 === r) return [];if (void 0 === r.length) return function (n, r) {
      var t = {};for (var u in r) n(r[u], u) && (t[u] = r[u]);return t;
    }(n, r);for (var t = -1, e = 0, i = r.length, o = []; ++t < i;) {
      var f = r[t];n(f) && (o[e++] = f);
    }return o;
  }function e(n, r) {
    return 1 === arguments.length ? function (r) {
      return e(n, r);
    } : u(n, r).length === r.length;
  }function i(n, r) {
    if (1 === arguments.length) return function (r) {
      return i(n, r);
    };for (var t = 0; t < r.length;) {
      if (n(r[t])) return !0;t++;
    }return !1;
  }function o(n, r) {
    return 1 === arguments.length ? function (r) {
      return o(n, r);
    } : !i(function (n) {
      return !n(r);
    }, n);
  }function f(n) {
    return function () {
      return n;
    };
  }function c(n, r) {
    return 1 === arguments.length ? function (r) {
      return c(n, r);
    } : i(function (n) {
      return n(r);
    })(n);
  }function l(n, r) {
    if (1 === arguments.length) return function (r) {
      return l(n, r);
    };if ("string" == typeof r) return "" + r + n;var t = r.concat();return t.push(n), t;
  }function g(n, r) {
    return void 0 === r && (r = []), function () {
      for (var t, u = [], e = arguments.length; e--;) u[e] = arguments[e];return (t = r.concat(u)).length >= n.length ? n.apply(void 0, t) : g(n, t);
    };
  }var h = /*#__PURE__*/g(function (n, r, t) {
    var u;return Object.assign({}, t, ((u = {})[n] = r, u));
  });function a(n, r) {
    return 1 === arguments.length ? function (r) {
      return a(n, r);
    } : function (t) {
      return n(t) && r(t);
    };
  }function v(n) {
    return function (r) {
      return !n(r);
    };
  }function s() {
    for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];return function () {
      for (var r = [], t = arguments.length; t--;) r[t] = arguments[t];var u = n.slice();if (u.length > 0) {
        for (var e = u.pop().apply(void 0, r); u.length > 0;) e = u.pop()(e);return e;
      }
    };
  }function p(n, r) {
    return 1 === arguments.length ? function (r) {
      return p(n, r);
    } : "string" == typeof n ? "" + n + r : n.concat(r);
  }function d(n) {
    var r = typeof n;if (null === n) return "Null";if (void 0 === n) return "Undefined";if ("boolean" === r) return "Boolean";if ("number" === r) return "Number";if ("string" === r) return "String";if (Array.isArray(n)) return "Array";if (n instanceof RegExp) return "RegExp";var t = n.toString();return t.startsWith("async") ? "Async" : "[object Promise]" === t ? "Promise" : t.includes("function") || t.includes("=>") ? "Function" : "Object";
  }function y(n, r) {
    if (1 === arguments.length) return function (r) {
      return y(n, r);
    };if (n === r) return !0;var t = d(n);if (t !== d(r)) return !1;if ("Array" === t) {
      var u = Array.from(n),
          e = Array.from(r);if (u.toString() !== e.toString()) return !1;var i = !0;return u.forEach(function (n, r) {
        i && (n === e[r] || y(n, e[r]) || (i = !1));
      }), i;
    }if ("Object" === t) {
      var o = Object.keys(n);if (o.length !== Object.keys(r).length) return !1;var f = !0;return o.forEach(function (t) {
        if (f) {
          var u = n[t],
              e = r[t];u === e || y(u, e) || (f = !1);
        }
      }), f;
    }return !1;
  }function b(n, r) {
    if (1 === arguments.length) return function (r) {
      return b(n, r);
    };for (var t = -1, u = !1; ++t < r.length && !u;) y(r[t], n) && (u = !0);return u;
  }function m(n) {
    return n - 1;
  }function A(n, r) {
    return 1 === arguments.length ? function (r) {
      return A(n, r);
    } : void 0 === r || null === r || !0 === Number.isNaN(r) ? n : r;
  }function j(n, r) {
    if (1 === arguments.length) return function (r) {
      return j(n, r);
    };if (null === r || void 0 === r) return {};var t = {};for (var u in r) t[u] = r[u];return delete t[n], t;
  }function O(n, r) {
    return 1 === arguments.length ? function (r) {
      return O(n, r);
    } : n / r;
  }function S(n, r) {
    return 1 === arguments.length ? function (r) {
      return S(n, r);
    } : r.slice(n);
  }function N(n, r) {
    return 1 === arguments.length ? function (r) {
      return N(n, r);
    } : r.slice(0, -n);
  }function E(n, r) {
    return 1 === arguments.length ? function (r) {
      return E(n, r);
    } : function (t) {
      return n(t) || r(t);
    };
  }function P(n, r, t) {
    var u = -1,
        e = n.length;(t = t > e ? e : t) < 0 && (t += e), e = r > t ? 0 : t - r >>> 0, r >>>= 0;for (var i = Array(e); ++u < e;) i[u] = n[u + r];return i;
  }function k(n, r) {
    if (1 === arguments.length) return function (r) {
      return k(n, r);
    };var t = r.length,
        u = n > t ? t : n;return "string" == typeof r ? r.slice(t - u) : P(r, u = t - u, t);
  }function x(n, r) {
    return 1 === arguments.length ? function (r) {
      return x(n, r);
    } : y(n, k(n.length, r));
  }function w() {
    return !1;
  }function B(n, r) {
    return 1 === arguments.length ? function (r) {
      return B(n, r);
    } : r.find(n);
  }function C(n, r) {
    if (1 === arguments.length) return function (r) {
      return C(n, r);
    };for (var t = r.length, u = -1; ++u < t;) if (n(r[u])) return u;return -1;
  }function R(n, r) {
    r = void 0 === r ? [] : r;for (var t = 0; t < n.length; t++) Array.isArray(n[t]) ? R(n[t], r) : r.push(n[t]);return r;
  }function U(n) {
    for (var r = [], t = arguments.length - 1; t-- > 0;) r[t] = arguments[t + 1];return function (n) {
      return function () {
        for (var r = [], t = arguments.length; t--;) r[t] = arguments[t];return 1 === r.length ? function (t) {
          return n(t, r[0]);
        } : 2 === r.length ? n(r[1], r[0]) : void 0;
      };
    }(n);
  }function W(n, r) {
    if (1 === arguments.length) return function (r) {
      return W(n, r);
    };if (void 0 === r) return [];if (void 0 === r.length) return function (n, r) {
      var t = {};for (var u in r) t[u] = n(r[u], u);return t;
    }(n, r);for (var t = -1, u = r.length, e = Array(u); ++t < u;) e[t] = n(r[t]);return e;
  }function F(n, r) {
    return 1 === arguments.length ? function (r) {
      return F(n, r);
    } : (W(n, r), r);
  }function L(n, r) {
    if (1 === arguments.length) return function (r) {
      return L(n, r);
    };for (var t = {}, u = 0; u < r.length; u++) {
      var e = r[u],
          i = n(e);t[i] || (t[i] = []), t[i].push(e);
    }return t;
  }function q(n, r) {
    return 1 === arguments.length ? function (r) {
      return q(n, r);
    } : void 0 !== r[n];
  }function z(n) {
    return "string" == typeof n ? n[0] || "" : n[0];
  }function D(n) {
    return n;
  }function G(n, r, t) {
    return void 0 === r ? function (r, t) {
      return G(n, r, t);
    } : void 0 === t ? function (t) {
      return G(n, r, t);
    } : function (u) {
      return !0 === ("boolean" == typeof n ? n : n(u)) ? r(u) : t(u);
    };
  }function H(n) {
    return n + 1;
  }function I(n, r) {
    return 1 === arguments.length ? function (r) {
      return I(n, r);
    } : r.includes(n);
  }function J(n, r) {
    if (1 === arguments.length) return function (r) {
      return J(n, r);
    };for (var t = {}, u = 0; u < r.length; u++) {
      var e = r[u];t[n(e)] = e;
    }return t;
  }function K(n, r) {
    if (1 === arguments.length) return function (r) {
      return K(n, r);
    };for (var t = -1, u = r.length; ++t < u;) if (r[t] === n) return t;return -1;
  }function M(n) {
    return "string" == typeof n ? n.slice(0, -1) : n.length ? P(n, 0, -1) : [];
  }function Q(n, r) {
    return 1 === arguments.length ? function (r) {
      return Q(n, r);
    } : null != r && r.constructor === n || r instanceof n;
  }function T(n) {
    return void 0 === n || null === n;
  }function V(n, r) {
    return 1 === arguments.length ? function (r) {
      return V(n, r);
    } : r.join(n);
  }function X(n) {
    return Object.keys(n);
  }function Y(n) {
    return "string" == typeof n ? n[n.length - 1] || "" : n[n.length - 1];
  }function Z(n, r) {
    if (1 === arguments.length) return function (r) {
      return Z(n, r);
    };var t = -1;return r.map(function (r, u) {
      y(r, n) && (t = u);
    }), t;
  }function $(n) {
    return n.length;
  }function _(n, r) {
    if (1 === arguments.length) return function (r) {
      return _(n, r);
    };var t = r.match(n);return null === t ? [] : t;
  }function nn(n, r) {
    return 1 === arguments.length ? function (r) {
      return nn(n, r);
    } : Object.assign({}, n || {}, r || {});
  }function rn(n, r) {
    return 1 === arguments.length ? function (r) {
      return rn(n, r);
    } : r > n ? r : n;
  }function tn(n, r, t) {
    return 2 === arguments.length ? function (t) {
      return tn(n, r, t);
    } : 1 === arguments.length ? function (r, t) {
      return tn(n, r, t);
    } : n(t) > n(r) ? t : r;
  }function un(n, r) {
    return 1 === arguments.length ? function (r) {
      return un(n, r);
    } : r < n ? r : n;
  }var en = /*#__PURE__*/g(function (n, r, t) {
    return n(t) < n(r) ? t : r;
  });function on(n, r) {
    return 1 === arguments.length ? function (r) {
      return on(n, r);
    } : n % r;
  }function fn(n, r) {
    return 1 === arguments.length ? function (r) {
      return fn(n, r);
    } : n * r;
  }function cn(n, r) {
    return 1 === arguments.length ? function (r) {
      return cn(n, r);
    } : 0 === r.filter(n).length;
  }function ln(n) {
    return !n;
  }function gn(n, r) {
    if (1 === arguments.length) return function (r) {
      return gn(n, r);
    };var t = n < 0 ? r.length + n : n;return "[object String]" === Object.prototype.toString.call(r) ? r.charAt(t) : r[t];
  }function hn(n, r) {
    if (1 === arguments.length) return function (r) {
      return hn(n, r);
    };if (null !== r && void 0 !== r) {
      var t = "string" == typeof n ? n = n.split(",") : n,
          u = {};for (var e in r) t.includes(e) || (u[e] = r[e]);return u;
    }
  }function an(n, r) {
    return void 0 === r && (r = {}), function (t) {
      return "Async" === d(n) || "Promise" === d(n) ? new Promise(function (u, e) {
        n(nn(t, r)).then(u).catch(e);
      }) : n(nn(t, r));
    };
  }function vn(n, r) {
    if (1 === arguments.length) return function (r) {
      return vn(n, r);
    };if (null !== r && void 0 !== r) {
      for (var t = r, u = 0, e = "string" == typeof n ? n.split(".") : n; u < e.length;) {
        if (null === t || void 0 === t) return;t = t[e[u]], u++;
      }return t;
    }
  }var sn = /*#__PURE__*/g(function (n, r, t) {
    return A(n, vn(r, t));
  });function pn(n, r) {
    if (1 === arguments.length) return function (r) {
      return pn(n, r);
    };if (null !== r && void 0 !== r) {
      for (var t = "string" == typeof n ? n.split(",") : n, u = {}, e = 0; e < t.length;) t[e] in r && (u[t[e]] = r[t[e]]), e++;return u;
    }
  }function dn(n, r) {
    if (1 === arguments.length) return function (r) {
      return dn(n, r);
    };if (null !== r && void 0 !== r) {
      for (var t = "string" == typeof n ? n.split(",") : n, u = {}, e = 0; e < t.length;) u[t[e]] = t[e] in r ? r[t[e]] : void 0, e++;return u;
    }
  }function yn() {
    for (var n = [], r = arguments.length; r--;) n[r] = arguments[r];return s.apply(void 0, n.reverse());
  }function bn(n, r) {
    if (1 === arguments.length) return function (r) {
      return bn(n, r);
    };var t = [];return W(function (r) {
      void 0 !== r[n] && t.push(r[n]);
    }, r), t;
  }function mn(n, r) {
    if (1 === arguments.length) return function (r) {
      return mn(n, r);
    };if ("string" == typeof r) return "" + n + r;var t = r.concat();return t.unshift(n), t;
  }function An(n, r) {
    return 1 === arguments.length ? function (r) {
      return An(n, r);
    } : r[n];
  }function jn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return jn(n, r, t);
    } : void 0 === t ? function (t) {
      return jn(n, r, t);
    } : t[n] === r;
  }function On(n, r) {
    if (1 === arguments.length) return function (r) {
      return On(n, r);
    };for (var t = [], u = n; u < r; u++) t.push(u);return t;
  }function Sn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return Sn(n, r, t);
    } : void 0 === t ? function (t) {
      return Sn(n, r, t);
    } : t.reduce(n, r);
  }function Nn(n, r) {
    return 1 === arguments.length ? function (r) {
      return Nn(n, r);
    } : u(function (r) {
      return !n(r);
    }, r);
  }function En(n, r) {
    return 1 === arguments.length ? function (r) {
      return En(n, r);
    } : Array(r).fill(n);
  }function Pn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return Pn(n, r, t);
    } : void 0 === t ? function (t) {
      return Pn(n, r, t);
    } : t.replace(n, r);
  }function kn(n) {
    return n.concat().reverse();
  }function xn(n, r) {
    return 1 === arguments.length ? function (r) {
      return xn(n, r);
    } : r.concat().sort(n);
  }function wn(n, r) {
    return 1 === arguments.length ? function (r) {
      return wn(n, r);
    } : r.concat().sort(function (r, t) {
      var u = n(r),
          e = n(t);return u < e ? -1 : u > e ? 1 : 0;
    });
  }function Bn(n, r) {
    return 1 === arguments.length ? function (r) {
      return Bn(n, r);
    } : r.split(n);
  }function Cn(n, r) {
    if (1 === arguments.length) return function (r) {
      return Cn(n, r);
    };for (var t = n > 1 ? n : 1, u = [], e = 0; e < r.length;) u.push(r.slice(e, e += t));return u;
  }function Rn(n, r) {
    return 1 === arguments.length ? function (r) {
      return Rn(n, r);
    } : r.startsWith(n);
  }function Un(n, r) {
    return 1 === arguments.length ? function (r) {
      return Un(n, r);
    } : n - r;
  }function Wn() {
    return !0;
  }function Fn(n) {
    return S(1, n);
  }function Ln(n, r) {
    return 1 === arguments.length ? function (r) {
      return Ln(n, r);
    } : "string" == typeof r ? r.slice(0, n) : P(r, 0, n);
  }function qn(n, r) {
    return 1 === arguments.length ? function (r) {
      return qn(n, r);
    } : (n(r), r);
  }function zn(n, r) {
    return 1 === arguments.length ? function (r) {
      return zn(n, r);
    } : -1 !== r.search(n);
  }function Dn(n, r) {
    return 1 === arguments.length ? function (r) {
      return Dn(n, r);
    } : W(n, On(0, r));
  }function Gn(n) {
    return n.toLowerCase();
  }function Hn(n) {
    return n.toString();
  }function In(n) {
    return n.toUpperCase();
  }function Jn(n) {
    return n.trim();
  }function Kn(n) {
    for (var r = -1, t = []; ++r < n.length;) {
      var u = n[r];b(u, t) || t.push(u);
    }return t;
  }function Mn(n, r) {
    if (1 === arguments.length) return function (r) {
      return Mn(n, r);
    };for (var t = -1, u = [], e = function () {
      var e = r[t];i(function (r) {
        return n(e, r);
      }, u) || u.push(e);
    }; ++t < r.length;) e();return u;
  }function Qn(n, r, t) {
    return void 0 === r ? function (r, t) {
      return Qn(n, r, t);
    } : void 0 === t ? function (t) {
      return Qn(n, r, t);
    } : t.concat().fill(r, n, n + 1);
  }function Tn(n) {
    var r = [];for (var t in n) r.push(n[t]);return r;
  }function Vn(n, r) {
    return Sn(function (r, t) {
      return b(t, n) ? r : r.concat(t);
    }, [], r);
  }function Xn(n, t) {
    return 1 === arguments.length ? function (r) {
      return Xn(n, r);
    } : r(Sn)(function (n, r, u) {
      return t[u] ? n.concat([[r, t[u]]]) : n;
    }, [], n);
  }function Yn(n, r) {
    return 1 === arguments.length ? function (r) {
      return Yn(n, r);
    } : n.reduce(function (n, t, u) {
      return n[t] = r[u], n;
    }, {});
  }

  function allFalse(...inputs) {
    let counter = 0;

    while (counter < inputs.length) {
      const x$$1 = inputs[counter];

      if (d(x$$1) === 'Function') {
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
      const x$$1 = inputs[counter];

      if (d(x$$1) === 'Function') {
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
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
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
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
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
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
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
    let length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
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
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }
    path = isKey(path, object) ? [path] : castPath(path);

    let index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

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
  function getMapData(map, key) {
    const data = map.__data__;

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
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;

    return Boolean(length) && (typeof value === 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
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
    const type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
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
    const type = typeof value;

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
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
    const type = typeof value;

    return Boolean(value) && (type == 'object' || type == 'function');
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
  function toString(value) {
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
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
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
    const path = pathRaw === '' ? '' : `${pathRaw}.`;

    for (const ruleKey of Object.keys(rules)) {
      const rule = rules[ruleKey];
      if (!isObject$1(rule)) {
        set(willReturn, `${path}${ruleKey}`, rule);
        continue;
      }
      Object.keys(rule).filter(subruleKey => !isObject$1(rule[subruleKey])).map(subruleKey => {
        const subrule = rule[subruleKey];
        set(willReturn, `${path}${ruleKey}.${subruleKey}`, subrule);
      });
      Object.keys(rule).filter(subruleKey => isObject$1(rule[subruleKey])).map(subruleKey => {
        const subrule = rule[subruleKey];
        Object.keys(subrule).map(deepKey => {
          const deep = rule[subruleKey][deepKey];
          set(willReturn, `${path}${ruleKey}.${subruleKey}.${deepKey}`, deep);
        });
      });
    }

    return willReturn;
  }

  const types = ['Null', 'Undefined', 'RegExp'];

  function compact(arr) {
    return u(a$$1 => {
      const currentType = d(a$$1);
      if (types.includes(currentType)) {
        return false;
      }
      if (currentType === 'Object') {
        return !y(a$$1, {});
      }

      return a$$1.length !== 0;
    }, arr);
  }

  function composeAsync(...inputArguments) {
    return async function (startArgument) {
      let argumentsToPass = startArgument;

      while (inputArguments.length !== 0) {
        const fn$$1 = inputArguments.pop();
        const typeFn = d(fn$$1);

        if (typeFn === 'Async' || typeFn === 'Promise') {
          argumentsToPass = await fn$$1(argumentsToPass);
        } else {
          argumentsToPass = fn$$1(argumentsToPass);
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
    const propRules = u(x$$1 => clone[x$$1] !== undefined)(Object.keys(rules));

    if (propRules.length === 0) {
      return input;
    }

    propRules.map(prop => {
      const fn$$1 = rules[prop];
      if (d(fn$$1) === 'Function') {
        clone[prop] = fn$$1(clone[prop]);
      } else if (d(fn$$1) === 'Object') {
        clone[prop] = evolve(fn$$1, clone[prop]);
      }
    });

    return clone;
  }

  const evolve = /*#__PURE__*/g(evolveFn);

  function findInObject(fn, obj) {
    let willReturn = { fallback: true };

    Object.entries(obj).map(([prop, value]) => {
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

  function greater(x, y) {
    if (y === undefined) {
      return yHolder => greater(x, yHolder);
    }

    return y > x;
  }

  function headObject(x$$1) {
    if (d(x$$1) !== 'Object') throw new Error('R.headObject.type');
    const [tag, no] = Object.keys(x$$1);
    if (tag === undefined) throw new Error('R.headObject.less');
    if (no !== undefined) throw new Error('R.headObject.more');

    return {
      prop: tag,
      value: x$$1[tag]
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
    return Pn(marker, `${marker}${injection}`, content);
  }

  function intersection(a$$1, b$$1) {
    if (b$$1 === undefined) {
      return bHolder => intersection(a$$1, bHolder);
    }

    return u(val => b$$1.includes(val))(a$$1);
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
        const requirement = isOptional ? M(requirementRaw) : requirementRaw;

        const rule = schema[requirementRaw];
        const ruleType = d(rule);
        const inputProp = input[requirement];
        const inputPropType = d(input[requirement]);
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
          boom(Gn(inputPropType) === rule);
        } else if (typeof rule === 'function') {
          /**
           * rule is function so we pass to it the input
           */
          boom(rule(inputProp));
        } else if (ruleType === 'Array' && inputPropType === 'String') {
          /**
           * enum case | rule is like a: ['foo', 'bar']
           */
          boom(b(inputProp, rule));
        } else if (ruleType === 'Array' && rule.length === 1 && inputPropType === 'Array') {
          /**
           * 1. array of type | rule is like a: ['number']
           * 2. rule is like a: [{from: 'string'}]
           */
          const currentRule = rule[0];
          const currentRuleType = d(rule[0]);
          //Check if rule is invalid
          boom(currentRuleType === 'String' || currentRuleType === 'Object');

          if (currentRuleType === 'String') {
            /**
             * 1. array of type
             */
            const isInvalidResult = i(inputPropInstance => d(inputPropInstance).toLowerCase() !== currentRule, inputProp);
            boom(!isInvalidResult);
          }

          if (currentRuleType === 'Object') {
            /**
             * 2. rule is like a: [{from: 'string'}]
             */
            const isValidResult = e(inputPropInstance => isValid({
              input: inputPropInstance,
              schema: currentRule
            }), inputProp);
            boom(isValidResult);
          }
        } else if (ruleType === 'RegExp' && inputPropType === 'String') {
          boom(zn(rule, inputProp));
        } else {
          boom(false);
        }
      }
    }

    return flag;
  }

  function any(fn, arr) {
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
      const wrong = any((singleInput, i) => {
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

  function isPromise(x$$1) {
    return ['Async', 'Promise'].includes(d(x$$1));
  }

  function isType(xType, x$$1) {
    if (arguments.length === 1) {
      return xHolder => isType(xType, xHolder);
    }

    return d(x$$1) === xType;
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
    s(W(prop => willReturn[prop] = obj[prop]), xn(sortFn))(Object.keys(obj));

    return willReturn;
  };

  const stringify = a$$1 => {
    if (d(a$$1) === 'String') {
      return a$$1;
    } else if (['Function', 'Async'].includes(d(a$$1))) {
      const compacted = Pn(/\s{1,}/g, ' ', a$$1.toString());

      return Pn(/\s/g, '_', Ln(15, compacted));
    } else if (d(a$$1) === 'Object') {
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

  function memoize$1(fn$$1, ...inputArguments) {
    if (arguments.length === 1) {
      return (...inputArgumentsHolder) => memoize$1(fn$$1, ...inputArgumentsHolder);
    }
    const prop = generateProp(fn$$1, ...inputArguments);
    if (prop in cache) {
      return cache[prop];
    }
    if (d(fn$$1) === 'Async') {
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
    W(val => {
      willReturn = nn(willReturn, val);
    }, arr);

    return willReturn;
  }

  function mergeRight(x$$1, y$$1) {
    return nn(y$$1, x$$1);
  }

  function multiline(input, glue) {

    return input.split('\n').filter(x => x.trim().length > 0).map(x => x.trim()).join(glue ? glue : ' ');
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

  function check$1(singleInput, schema) {
    return isValid({
      input: { singleInput },
      schema: { singleInput: schema }
    });
  }

  function ok(...inputs) {
    return (...schemas) => {
      if (inputs.length !== schemas.length) return false;

      return any$1((singleInput, i) => !check$1(singleInput, schemas[i]), inputs) === false;
    };
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

      return g(wrap);
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
      if (!(d(condition) === 'Async')) {
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
      if (asyncConditionsFlag === false && d(conditions[prop]) === 'Async') {
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

        W(result => willReturn[result.type] = result.payload, results);

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
      const promised = W(a$$1 => promiseAllSecureWrapper(a$$1), input);

      return await Promise.all(promised);
    } catch (err) {
      console.log(err);
    }
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
      const loopIndexes = On(0, Math.floor((endNum - startNum) / distance));
      for (const i$$1 of loopIndexes) {
        valueToPush += distance;
        willReturn.push(valueToPush);
      }
    } else {
      const decimalLength = s($, Y, Bn('.'))(distance.toString());
      const loopIndexes = On(0, Math.floor((endNum - startNum) / distance));
      for (const i$$1 of loopIndexes) {
        valueToPush += distance;
        willReturn.push(Number(valueToPush.toFixed(decimalLength)));
      }
    }

    return willReturn;
  }

  function remove(inputs, text) {
    if (d(inputs) !== 'Array') {
      return Pn(inputs, '', text).trim();
    }

    let textCopy = text;

    inputs.forEach(singleInput => {
      textCopy = Pn(singleInput, '', textCopy).trim();
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

    return nn(renamed, hn(Object.keys(conditions), inputObject));
  }

  const getOccurances = input => input.match(/{{[_a-zA-Z0-9]+}}/g);

  const getOccuranceProp = occurance => occurance.replace(/{{|}}/g, '');

  const replace = ({ inputHolder, prop, replacer }) => inputHolder.replace(`{{${prop}}}`, replacer);

  function template(input, templateInput) {
    const occurances = getOccurances(input);
    if (occurances === null) return input;

    let inputHolder = input;
    for (const occurance of occurances) {
      const prop = getOccuranceProp(occurance);
      const replacer = templateInput[prop];

      if (replacer === undefined) continue;
      inputHolder = replace({
        inputHolder,
        prop,
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
              value: x$$1
            } = headObject(dataInstance);
            const { value: evaluationFunction } = headObject(hn('label', singleEvaluation));

            const label = template(singleEvaluation.label, { tag });

            test(label, () => {
              evaluationFunction(x$$1);
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

  function s$1() {
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
    const willReturn = typeof testValue === 'function' ? testValue(matchValue) : y(testValue, matchValue);

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
  //Follows code generated by `run rambda`
  const add = n;
  const addIndex = r;
  const adjust = t;
  const all = e;
  const allPass = o;
  const always = f;
  const any$2 = i;
  const anyPass = c;
  const append = l;
  const assoc = h;
  const both = a;
  const complement = v;
  const compose = s;
  const concat = p;
  const contains = b;
  const curry = g;
  const dec = m;
  const defaultTo = A;
  const dissoc = j;
  const divide = O;
  const drop = S;
  const dropLast = N;
  const either = E;
  const endsWith = x;
  const equals = y;
  const F$1 = w;
  const filter = u;
  const find = B;
  const findIndex = C;
  const flatten = R;
  const flip = U;
  const forEach = F;
  const groupBy = L;
  const has = q;
  const head = z;
  const identity = D;
  const ifElse = G;
  const inc = H;
  const includes = I;
  const indexBy = J;
  const indexOf = K;
  const init = M;
  const isNil = T;
  const join = V;
  const keys = X;
  const last = Y;
  const lastIndexOf = Z;
  const length = $;
  const map = W;
  const match = _;
  const merge = nn;
  const max = rn;
  const maxBy = tn;
  const min = un;
  const minBy = en;
  const modulo = on;
  const multiply = fn;
  const none = cn;
  const not = ln;
  const nth = gn;
  const omit = hn;
  const partialCurry = an;
  const path = vn;
  const pathOr = sn;
  const pick = pn;
  const pickAll = dn;
  const pipe = yn;
  const pluck = bn;
  const prepend = mn;
  const prop = An;
  const propEq = jn;
  const range = On;
  const reduce = Sn;
  const reject = Nn;
  const repeat = En;
  const replace$1 = Pn;
  const reverse = kn;
  const sort = xn;
  const sortBy = wn;
  const split = Bn;
  const splitEvery = Cn;
  const startsWith = Rn;
  const subtract = Un;
  const T$1 = Wn;
  const tail = Fn;
  const take = Ln;
  const takeLast = k;
  const tap = qn;
  const test$1 = zn;
  const times = Dn;
  const toLower = Gn;
  const toString$1 = Hn;
  const toUpper = In;
  const trim = Jn;
  const type = d;
  const uniq = Kn;
  const uniqWith = Mn;
  const update = Qn;
  const values = Tn;
  const without = Vn;
  const zip = Xn;
  const zipObj = Yn;

  exports.DELAY = DELAY;
  exports.add = add;
  exports.addIndex = addIndex;
  exports.adjust = adjust;
  exports.all = all;
  exports.allPass = allPass;
  exports.always = always;
  exports.any = any$2;
  exports.anyPass = anyPass;
  exports.append = append;
  exports.assoc = assoc;
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
  exports.replace = replace$1;
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
  exports.test = test$1;
  exports.times = times;
  exports.toLower = toLower;
  exports.toString = toString$1;
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
  exports.allFalse = allFalse;
  exports.allTrue = allTrue;
  exports.change = change;
  exports.compact = compact;
  exports.composeAsync = composeAsync;
  exports.defaultWhen = defaultWhen;
  exports.debounce = debounce;
  exports.delay = delay;
  exports.evolve = evolve;
  exports.findInObject = findInObject;
  exports.greater = greater;
  exports.headObject = headObject;
  exports.ifElseAsync = ifElseAsync;
  exports.inject = inject;
  exports.intersection = intersection;
  exports.is = is;
  exports.isInit = isInit;
  exports.isPromise = isPromise;
  exports.isType = isType;
  exports.isValid = isValid;
  exports.less = less;
  exports.mapAsync = mapAsync;
  exports.mapFastAsync = mapFastAsync;
  exports.memoize = memoize$1;
  exports.mergeAll = mergeAll;
  exports.mergeRight = mergeRight;
  exports.multiline = multiline;
  exports.ok = ok;
  exports.omitBy = omitBy;
  exports.once = once;
  exports.pickBy = pickBy;
  exports.produce = produce;
  exports.promiseAllObject = promiseAllObject;
  exports.promiseAllSecure = promiseAllSecure;
  exports.random = random;
  exports.rangeBy = rangeBy;
  exports.remove = remove;
  exports.renameProps = renameProps;
  exports.runTests = runTests;
  exports.s = s$1;
  exports.shuffle = shuffle;
  exports.switcher = switcher;
  exports.tapAsync = tapAsync;
  exports.template = template;
  exports.throttle = throttle;
  exports.validate = validate;
  exports.when = when;
  exports.whenAsync = whenAsync;
  exports.where = where;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
