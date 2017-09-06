module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function(c,d){ true?d(exports):typeof define==='function'&&define.amd?define(['exports'],d):d(c.R={});})(this,function(e){'use strict';function helper(g,x,y){if(x===void 0){return function(h,j){return helper(g,h,j);};}else if(y===void 0){return function(k){return helper(g,x,k);};}if(y[g]!==void 0){return y[g](x);}}function curry(l){return function(x,y){if(y===void 0){return function(m){return l(x,m);};}return l(x,y);};}function curryThree(n){return function(x,y,z){if(y===void 0){var helper=function helper(q,r){return n(x,q,r);};return curry(helper);}else if(z===void 0){return function(s){return n(x,y,s);};}return n(x,y,z);};}function mathHelper(t,x,y){switch(t){case'+':return x+y;case'-':return x-y;case'/':return x/y;case'*':return x*y;case'%':return x%y;}}var u=curryThree(mathHelper);function oppositeHelper(v,x,y){if(x===void 0){return function(w,A){return oppositeHelper(v,w,A);};}else if(y===void 0){return function(B){return oppositeHelper(v,x,B);};}if(x[v]!==void 0){return x[v](y);}}function propHelper(C,x){if(x===void 0){return function(D){return propHelper(C,D);};}return x[C];}function simpleHelper(E,x){if(x===void 0){return function(G){return simpleHelper(E,G);};}if(x[E]!==void 0){return x[E]();}}function addIndex(H){return function(I){for(var J=0,newFn=function newFn(){for(var K=arguments.length,L=Array(K),M=0;M<K;M++){L[M]=arguments[M];}return I.apply(null,[].concat(L,[J++]));},N=arguments.length,O=Array(N>1?N-1:0),P=1;P<N;P++){O[P-1]=arguments[P];}return H.apply(null,[newFn].concat(O));};}function adjust(Q,R,S){var U=S.concat();return U.map(function(V,W){if(W===R){return Q(S[R]);}return V;});}var X=curryThree(adjust);function filterObject(Y,Z){var a1={};for(var b1 in Z){if(Y(Z[b1])){a1[b1]=Z[b1];}}return a1;}function filter(fn,d1){if(d1.length===void 0){return filterObject(fn,d1);}var e1=-1,f1=0,g1=d1.length,h1=[];while(++e1<g1){var i1=d1[e1];if(fn(i1)){h1[f1++]=i1;}}return h1;}var j1=curry(filter);function all(k1,l1){if(arguments.length===1){return function(m1){return all(k1,m1);};}return j1(k1,l1).length===l1.length;}function any(fn,o1){var p1=0;while(p1<o1.length){if(fn(o1[p1])){return!0;}p1++;}return!1;}var q1=curry(any);function allPass(r1,x){if(arguments.length===1){return function(s1){return allPass(r1,s1);};}return!q1(function(t1){return!t1(x);})(r1);}function anyPass(u1,x){if(arguments.length===1){return function(v1){return anyPass(u1,v1);};}return q1(function(w1){return w1(x);})(u1);}function append(x1,y1){var z1=y1.concat();z1.push(x1);return z1;}var A1=curry(append);function both(x,y){return function(B1){return x(B1)&&y(B1);};}var C1=curry(both);function compose(){for(var D1=arguments.length,E1=Array(D1),F1=0;F1<D1;F1++){E1[F1]=arguments[F1];}return function(G1){var H1=E1.slice();while(H1.length>0){G1=H1.pop()(G1);}return G1;};}var I1=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(J1){return typeof J1;}:function(K1){return K1&&typeof Symbol==="function"&&K1.constructor===Symbol&&K1!==Symbol.prototype?"symbol":typeof K1;},toConsumableArray=function(L1){if(Array.isArray(L1)){for(var i=0,M1=Array(L1.length);i<L1.length;i++)M1[i]=L1[i];return M1;}else{return Array.from(L1);}};function type(a){var N1=typeof a==='undefined'?'undefined':I1(a);if(a===null){return'Null';}else if(a===void 0){return'Undefined';}else if(N1==='boolean'){return'Boolean';}else if(N1==='number'){return'Number';}else if(N1==='string'){return'String';}else if(Array.isArray(a)){return'Array';}else if(a instanceof RegExp){return'RegExp';}var O1=a.toString();if(O1.startsWith('async')){return'Async';}else if(O1==='[object Promise]'){return'Promise';}else if(O1.includes('function')||O1.includes('=>')){return'Function';}return'Object';}function equals(a,b){if(a===b){return!0;}var P1=type(a);if(P1!==type(b)){return!1;}if(P1==='Array'){var Q1=Array.from(a),R1=Array.from(b);return Q1.sort().toString()===R1.sort().toString();}if(P1==='Object'){var S1=Object.keys(a);if(S1.length===Object.keys(b).length){if(S1.length===0){return!0;}var T1=!0;S1.map(function(U1){if(T1){var V1=type(a[U1]),W1=type(b[U1]);if(V1===W1){if(V1==='Object'){if(Object.keys(a[U1]).length===Object.keys(b[U1]).length){if(Object.keys(a[U1]).length!==0){if(!equals(a[U1],b[U1])){T1=!1;}}}else{T1=!1;}}else if(!equals(a[U1],b[U1])){T1=!1;}}else{T1=!1;}}});return T1;}}return!1;}var X1=curry(equals);function contains(Y1,Z1){var a2=-1,b2=!1;while(++a2<Z1.length&&!b2){if(X1(Z1[a2],Y1)){b2=!0;}}return b2;}var c2=curry(contains);function curry$1(f){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return function(){for(var d2=arguments.length,p=Array(d2),e2=0;e2<d2;e2++){p[e2]=arguments[e2];}return function(o){return o.length>=f.length?f.apply(void 0,toConsumableArray(o)):curry$1(f,o);}([].concat(toConsumableArray(a),p));};}var dec=function(x){return x-1;};function defaultTo(f2,g2){if(arguments.length===1){return function(h2){return defaultTo(f2,h2);};}return g2===void 0||!(type(g2)===type(f2))?f2:g2;}function drop(i2,a){return a.slice(i2);}var j2=curry(drop);function dropLast(k2,a){return a.slice(0,-k2);}var l2=curry(dropLast);function either(x,y){return function(m2){return x(m2)||y(m2);};}var n2=curry(either),inc=function(x){return x+1;};function find(fn,p2){return p2.find(fn);}var q2=curry(find);function findIndex(fn,s2){var t2=s2.length,u2=-1;while(++u2<t2){if(fn(s2[u2])){return u2;}}return-1;}var v2=curry(findIndex);function flatten(w2,x2){x2=x2===void 0?[]:x2;for(var i=0;i<w2.length;i++){if(Array.isArray(w2[i])){flatten(w2[i],x2);}else{x2.push(w2[i]);}}return x2;}function flipExport(fn){return function(){for(var z2=arguments.length,A2=Array(z2),B2=0;B2<z2;B2++){A2[B2]=arguments[B2];}if(A2.length===1){return function(C2){return fn(C2,A2[0]);};}else if(A2.length===2){return fn(A2[1],A2[0]);}return void 0;};}function flip(fn){return flipExport(fn);}function has(E2,F2){return F2[E2]!==void 0;}var G2=curry(has);function head(a){if(typeof a==='string'){return a[0]||'';}return a[0];}function ifElse(H2,I2,J2){return function(K2){if(H2(K2)===!0){return I2(K2);}return J2(K2);};}var L2=curryThree(ifElse);function isNil(x){return type(x)==='Undefined'||type(x)==='Null';}function indexOf(x,M2){var N2=-1,O2=M2.length;while(++N2<O2){if(M2[N2]===x){return N2;}}return-1;}var P2=curry(indexOf);function baseSlice(Q2,R2,S2){var T2=-1,U2=Q2.length;S2=S2>U2?U2:S2;if(S2<0){S2+=U2;}U2=R2>S2?0:S2-R2>>>0;R2>>>=0;var V2=Array(U2);while(++T2<U2){V2[T2]=Q2[T2+R2];}return V2;}function init(a){if(typeof a==='string'){return a.slice(0,-1);}return a.length?baseSlice(a,0,-1):[];}function last(a){if(typeof a==='string'){return a[a.length-1]||'';}return a[a.length-1];}function mapObject(fn,X2){var Y2={};for(var Z2 in X2){Y2[Z2]=fn(X2[Z2]);}return Y2;}function map(fn,b3){if(b3.length===void 0){return mapObject(fn,b3);}var c3=-1,d3=b3.length,e3=Array(d3);while(++c3<d3){e3[c3]=fn(b3[c3]);}return e3;}var f3=curry(map);function match(g3,h3){var i3=h3.match(g3);return i3===null?[]:i3;}var j3=curry(match);function merge(k3,l3){return Object.assign({},k3,l3);}var m3=curry(merge);function omit(n3,o3){if(arguments.length===1){return function(p3){return omit(n3,p3);};}if(o3===void 0||o3===null){return void 0;}if(typeof n3==='string'){n3=n3.split(',').map(function(x){return x.trim();});}var q3={};for(var r3 in o3){if(!n3.includes(r3)){q3[r3]=o3[r3];}}return q3;}function partialCurry(fn){var t3=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return function(u3){if(type(fn)==='Async'||type(fn)==='Promise'){return new Promise(function(v3,w3){fn(m3(u3,t3)).then(v3).catch(w3);});}return fn(m3(u3,t3));};}function path(x3,y3){if(arguments.length===1){return function(z3){return path(x3,z3);};}if(y3===null||y3===void 0){return void 0;}var A3=y3,B3=0;if(typeof x3==='string'){x3=x3.split('.');}while(B3<x3.length){if(A3===null||A3===void 0){return void 0;}A3=A3[x3[B3]];B3++;}return A3;}function pick(C3,D3){if(arguments.length===1){return function(E3){return pick(C3,E3);};}if(!(type(D3)==='Object')){return void 0;}if(type(C3)==='String'){C3=C3.split(',').map(function(x){return x.trim();});}var F3={},G3=0;while(G3<C3.length){if(C3[G3]in D3){F3[C3[G3]]=D3[C3[G3]];}G3++;}return F3;}function pluck(H3,I3){var J3=[];f3(function(K3){if(!(K3[H3]===void 0)){J3.push(K3[H3]);}},I3);return J3;}var L3=curry(pluck);function prepend(M3,N3){var O3=N3.concat();O3.unshift(M3);return O3;}var P3=curry(prepend);function prop(Q3,R3){return R3[Q3];}var S3=curry(prop);function propEq(T3,U3,V3){return V3[T3]===U3;}var W3=curryThree(propEq);function range(X3,Y3){for(var Z3=[],i=X3;i<Y3;i++){Z3.push(i);}return Z3;}function reduce(fn,b4,c4){return c4.reduce(fn,b4);}var d4=curryThree(reduce);function repeat(a,e4){var f4=Array(e4);return f4.fill(a);}var g4=curry(repeat);function replace(h4,i4,j4){return j4.replace(h4,i4);}var k4=curryThree(replace);function sort(fn,m4){var n4=m4.concat();return n4.sort(fn);}var o4=curry(sort);function sortBy(fn,q4){var r4=q4.concat();return r4.sort(function(a,b){var s4=fn(a),t4=fn(b);return s4<t4?-1:s4>t4?1:0;});}var u4=curry(sortBy);function split(v4,w4){return w4.split(v4);}var x4=curry(split);function splitEvery(y4,a){y4=y4>1?y4:1;var z4=[],A4=0;while(A4<a.length){z4.push(a.slice(A4,A4+=y4));}return z4;}var B4=curry(splitEvery);function tap(fn,D4){fn(D4);return D4;}var E4=curry(tap);function tail(F4){return j2(1,F4);}function take(G4,a){if(typeof a==='string'){return a.slice(0,G4);}return baseSlice(a,0,G4);}var H4=curry(take);function takeLast(I4,a){var J4=a.length;I4=I4>J4?J4:I4;if(typeof a==='string'){return a.slice(J4-I4);}I4=J4-I4;return baseSlice(a,I4,J4);}var K4=curry(takeLast);function test(L4,M4){return M4.search(L4)!==-1;}var N4=curry(test);function uniq(O4){var P4=-1,Q4=[];while(++P4<O4.length){var R4=O4[P4];if(!c2(R4,Q4)){Q4.push(R4);}}return Q4;}function update(S4,T4,U4){var V4=U4.concat();return V4.fill(T4,S4,S4+1);}var W4=curryThree(update);function values(X4){var Y4=[];for(var Z4 in X4){Y4.push(X4[Z4]);}return Y4;}var a5=u('+'),always=function always(x){return function(){return x;};},complement=function complement(fn){return function(c5){return!fn(c5);};},d5=oppositeHelper('concat'),e5=u('/'),f5=helper('endsWith'),F=function F(){return!1;},identity=function identity(x){return x;},g5=helper('includes'),h5=helper('join'),i5=helper('lastIndexOf'),j5=propHelper('length'),k5=u('%'),l5=u('*'),not=function not(x){return!x;},m5=helper('padEnd'),n5=helper('padStart'),o5=simpleHelper('reverse'),p5=helper('startsWith'),q5=u('-'),T=function T(){return!0;},r5=simpleHelper('toLowerCase'),s5=simpleHelper('toString'),t5=simpleHelper('toUpperCase'),u5=simpleHelper('trim');e.add=a5;e.always=always;e.complement=complement;e.concat=d5;e.divide=e5;e.endsWith=f5;e.F=F;e.identity=identity;e.includes=g5;e.join=h5;e.lastIndexOf=i5;e.length=j5;e.modulo=k5;e.multiply=l5;e.not=not;e.padEnd=m5;e.padStart=n5;e.reverse=o5;e.startsWith=p5;e.subtract=q5;e.T=T;e.toLower=r5;e.toString=s5;e.toUpper=t5;e.trim=u5;e.addIndex=addIndex;e.adjust=X;e.all=all;e.allPass=allPass;e.anyPass=anyPass;e.any=q1;e.append=A1;e.both=C1;e.compose=compose;e.contains=c2;e.curry=curry$1;e.dec=dec;e.defaultTo=defaultTo;e.drop=j2;e.dropLast=l2;e.either=n2;e.inc=inc;e.equals=X1;e.filter=j1;e.find=q2;e.findIndex=v2;e.flatten=flatten;e.flip=flip;e.has=G2;e.head=head;e.ifElse=L2;e.isNil=isNil;e.indexOf=P2;e.init=init;e.last=last;e.map=f3;e.match=j3;e.merge=m3;e.omit=omit;e.partialCurry=partialCurry;e.path=path;e.pick=pick;e.pluck=L3;e.prepend=P3;e.prop=S3;e.propEq=W3;e.range=range;e.reduce=d4;e.repeat=g4;e.replace=k4;e.sort=o4;e.sortBy=u4;e.split=x4;e.splitEvery=B4;e.tap=E4;e.tail=tail;e.take=H4;e.takeLast=K4;e.test=N4;e.type=type;e.uniq=uniq;e.update=W4;e.values=values;Object.defineProperty(e,'__esModule',{value:!0});});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const isType = __webpack_require__(2)

exports.compact = __webpack_require__(3)
exports.composeAsync = __webpack_require__(4)
exports.debounce = __webpack_require__(5)
exports.DELAY = 'RAMBDAX_DELAY'
exports.delay = __webpack_require__(6)
exports.evolve = __webpack_require__(7)
exports.ifElseAsync = __webpack_require__(8)
exports.intersection = __webpack_require__(9)
exports.isArray = x => isType('Array', x)
exports.isObject = x => isType('Object', x)
exports.isPromiseLike = __webpack_require__(10)
exports.isString = x => isType('String', x)
exports.isType = isType
exports.isValid = __webpack_require__(11)
exports.mapAsync = __webpack_require__(12)
exports.mapFastAsync = __webpack_require__(13)
exports.memoize = __webpack_require__(14)
exports.mergeAll = __webpack_require__(15)
exports.omitBy = __webpack_require__(16)
exports.once = __webpack_require__(17)
exports.pickBy = __webpack_require__(18)
exports.produce = __webpack_require__(19)
exports.race = __webpack_require__(20)
exports.random = __webpack_require__(21)
exports.rangeBy = __webpack_require__(22)
exports.renameProps = __webpack_require__(23)
exports.resolve = __webpack_require__(24)
exports.resolveSecure = __webpack_require__(25)
exports.shuffle = __webpack_require__(26)
exports.tap = __webpack_require__(27)
exports.tapAsync = __webpack_require__(28)
exports.throttle = __webpack_require__(29)
exports.where = __webpack_require__(30)
exports.wrap = __webpack_require__(31)

Object.keys(R).map(method => {
  exports[ method ] = R[ method ]
})


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { type } = __webpack_require__(0)

function isType (xType, x) {
  if (arguments.length === 1) {
    return xHolder => isType(xType, xHolder)
  }

  return type(x) === xType
}

module.exports = isType


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const types = [
  'Null',
  'Undefined',
  'RegExp',
  'Function',
  'Async',
]

function compact (arr) {
  return R.filter(

    a => {
      const currentType = R.type(a)
      if (types.includes(currentType)) {
        return false
      }
      if (currentType === 'Object') {
        return !R.equals(a, {})
      }

      return a.length !== 0
    },
    arr)
}

module.exports = compact


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const composeAsync = (...inputArguments) => {
  try {
    return async function (startArgument) {
      let argumentsToPass = startArgument

      while (inputArguments.length !== 0) {
        const fn = inputArguments.pop()
        if (R.type(fn) === 'Async' || R.type(fn) === 'Promise') {
          argumentsToPass = await fn(argumentsToPass)
        } else {
          argumentsToPass = fn(argumentsToPass)
        }
      }

      return argumentsToPass
    }
  } catch (err) {
    throw err
  }
}

module.exports = composeAsync


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function debounce (func, ms, immediate = false) {
  let timeout

  return function () {
    const thisHolder = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) {
        func.apply(thisHolder, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
    if (callNow) {
      func.apply(thisHolder, args)
    }
  }
}

module.exports = debounce


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve('RAMBDAX_DELAY')
  }, ms)
})


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const { type, curry, filter } = __webpack_require__(0)
function evolve (rules, input) {
  const clone = Object.assign({}, input)
  const propRules = filter(
    x => clone[ x ] !== undefined
  )(Object.keys(rules))

  if (propRules.length === 0) {
    return input
  }

  propRules.map(prop => {
    const fn = rules[ prop ]
    if (type(fn) === 'Function') {
      clone[ prop ] = fn(clone[ prop ])
    } else if (type(fn) === 'Object') {
      clone[ prop ] = evolve(fn, clone[ prop ])
    }
  })

  return clone
}

module.exports = curry(evolve)


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const isThenable = x => [ 'Async', 'Promise' ].includes(R.type(x))

const createThenable = x => async input => await x(input)

function ifElseAsync (condition, ifFn, elseFn) {
  if (ifFn === undefined) {
    return (ifFnHolder, elseFnHolder) => ifElseAsync(condition, ifFnHolder, elseFnHolder)
  } else if (elseFn === undefined) {
    return elseFnHolder => ifElseAsync(condition, ifFn, elseFnHolder)
  }

  return input => new Promise((resolve, reject) => {
    const conditionPromise = createThenable(condition)
    const ifFnPromise = createThenable(ifFn)
    const elseFnPromise = createThenable(elseFn)
    //console.log(condition, conditionPromise, isThenable(condition), R.type(condition))
    conditionPromise(input)
      .then(conditionResult => {
        const promised = conditionResult === true ?
          ifFnPromise :
          elseFnPromise

        promised(input)
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}

module.exports = ifElseAsync


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

function intersection (a, b) {
  if (b === undefined) {
    return bHolder => intersection(a, bHolder)
  }

  return R.filter(val => b.includes(val))(a)
}

module.exports = intersection


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const { type } = __webpack_require__(0)

function isPromiseLike (x) {
  return [ 'Async', 'Promise' ].includes(type(x))
}

module.exports = isPromiseLike


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const isValid = ({input, schema}) => {
  if (R.type(input) === 'Object' && R.type(schema) === 'Object') {
    let flag = true
    for (requirement in schema) {
      if (flag) {
        const rule = schema[ requirement ]
        const ruleType = R.type(rule)
        const inputProp = input[ requirement ]
        const inputPropType = R.type(input[ requirement ])

        if (ruleType === 'Object' && rule.type === 'ArrayOfSchemas' && inputPropType === 'Array') {
          inputProp.map(val => {
            let localFlag = false
            rule.rule.map(singleRule => {
              if (isValid(val, singleRule)) {
                localFlag = true
              }
            })
            if (localFlag === false) {
              flag = false
            }
          })
        } else if (
          ruleType === 'String'
        ) {
          if (inputProp !== undefined) {
            if (R.toLower(inputPropType) !== rule) {
              flag = false
            }
          } else {
            flag = false
          }
        } else if (
          typeof rule === 'function'
        ) {
          if (rule(inputProp) === false) {
            flag = false
          }
        } else if (
          ruleType === 'Object' &&
          inputPropType === 'Object'
        ) {
          if (
            !isValid(inputProp, rule)
          ) {
            flag = false
          }
        } else if (
          ruleType === 'Array' &&
          inputPropType === 'String'
        ) {
          if (!R.contains(inputProp, rule)) {
            flag = false
          }
        } else if (
          ruleType === 'Array' &&
          inputPropType === 'Array' &&
          rule.length === 1 &&
          inputProp.length > 0
        ) {
          const arrayRuleType = R.type(rule[ 0 ])

          if (arrayRuleType === 'String') {
            const result = R.any(
              val => R.toLower(R.type(val)) !== rule[ 0 ],
              inputProp
            )

            if (result) {
              flag = false
            }
          } else if (arrayRuleType === 'Object') {
            const result = R.any(
              val => !isValid(val, rule[ 0 ])
            )(inputProp)
            if (result) {
              flag = false
            }
          }
        } else if (
          ruleType === 'RegExp' &&
          inputPropType === 'String'
        ) {
          if (!R.test(rule, inputProp)) {
            flag = false
          }
        } else {
          flag = false
        }
      }
    }

    return flag
  }

  return false
}

module.exports = isValid


/***/ }),
/* 12 */
/***/ (function(module, exports) {

async function mapAsyncFn (fn, arr) {
  try {
    const willReturn = []
    for (const a of arr) {
      willReturn.push(await fn(a))
    }

    return willReturn
  } catch (err) {
    throw err
  }
}

function mapAsync (fn, arr) {
  if (arr === undefined) {
    return async holder => await mapAsyncFn(fn, holder)
  }

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, arr).then(resolve).catch(reject)
  })
}

module.exports = mapAsync


/***/ }),
/* 13 */
/***/ (function(module, exports) {

async function mapFastAsyncFn (fn, arr) {
  try {
    const promised = arr.map(a => fn(a))

    return await Promise.all(promised)
  } catch (err) {
    throw err
  }
}

function mapFastAsync (fn, arr) {
  if (arr === undefined) {
    return async holder => await mapFastAsyncFn(fn, holder)
  }

  return new Promise((resolve, reject) => {
    mapFastAsyncFn(fn, arr).then(resolve).catch(reject)
  })
}

module.exports = mapFastAsync


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)
const cache = {}

const normalizeObject = obj => {
  const sortFn = (a, b) => a > b
  const willReturn = {}
  R.compose(
    R.map(prop => willReturn[ prop ] = obj[ prop ]),
    R.sort(sortFn)
  )(Object.keys(obj))

  return willReturn
}

const stringify = a => {
  if (R.type(a) === 'String') {
    return a
  } else if ([ 'Function', 'Async' ].includes(R.type(a))) {
    const compacted = R.replace(/\s{1,}/g, ' ', a.toString())

    return R.replace(/\s/g, '_', R.take(15, compacted))
  } else if (R.type(a) === 'Object') {
    a = normalizeObject(a)
  }

  return JSON.stringify(a)
}

const generateProp = (fn, ...inputArguments) => {
  let propString = ''
  inputArguments.map(inputArgument => {
    propString += `${ stringify(inputArgument) }_`
  })

  return `${ propString }${ stringify(fn) }`
}

function memoize (fn, ...inputArguments) {
  if (arguments.length === 1) {
    return (...inputArgumentsHolder) => memoize(fn, ...inputArgumentsHolder)
  }
  const prop = generateProp(fn, ...inputArguments)
  if (prop in cache) {
    return cache[ prop ]
  }
  if (R.type(fn) === 'Async') {
    return new Promise(resolve => {
      fn(...inputArguments).then(result => {
        cache[ prop ] = result
        resolve(result)
      })
    })
  }
  const result = fn(...inputArguments)
  cache[ prop ] = result

  return result
}

module.exports = memoize


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

function mergeAll (arr) {
  let willReturn = {}
  R.map(val => {
    willReturn = R.merge(willReturn, val)
  }, arr)

  return willReturn
}

module.exports = mergeAll


/***/ }),
/* 16 */
/***/ (function(module, exports) {

function omitBy (fn, obj) {
  if (obj === undefined) {
    return holder => omitBy(fn, holder)
  }

  const willReturn = {}
  for (prop in obj) {
    if (!fn(prop, obj[ prop ])) {
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

module.exports = omitBy


/***/ }),
/* 17 */
/***/ (function(module, exports) {

function curry (fnToCurry) {
  return (...curryArguments) => {
    const len = fnToCurry.length
    if (curryArguments[ 1 ] === undefined) {
      if (len > 1) {
        return (...futureArguments) => {
          if (len === 3 && futureArguments.length === 1) {
            return b => fnToCurry(curryArguments[ 0 ], futureArguments[ 0 ], b)
          }

          return fnToCurry(curryArguments[ 0 ], ...futureArguments)
        }
      }
    } else if (curryArguments[ 2 ] === undefined && len === 3) {
      return futureArgument => fnToCurry(...curryArguments, futureArgument)
    }

    return fnToCurry(...curryArguments)
  }
}

function onceFn (fn, context) {
  let result

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments)
      fn = null
    }

    return result
  }
}

function once (fn, context) {
  if (arguments.length === 1) {
    const wrap = onceFn(fn, context)

    return curry(wrap)
  }

  return onceFn(fn, context)
}

module.exports = once


/***/ }),
/* 18 */
/***/ (function(module, exports) {

function pickBy (fn, obj) {
  if (obj === undefined) {
    return holder => pickBy(fn, holder)
  }

  const willReturn = {}
  for (prop in obj) {
    if (fn(prop, obj[ prop ])) {
      willReturn[ prop ] = obj[ prop ]
    }
  }

  return willReturn
}

module.exports = pickBy


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

function helper ({ condition, inputArgument, prop }) {
  return new Promise((resolve, reject) => {
    if (!(R.type(condition) === 'Async')) {
      return resolve({
        type    : prop,
        payload : condition(inputArgument),
      })
    }

    condition(inputArgument)
      .then(result => {
        resolve({
          type    : prop,
          payload : result,
        })
      })
      .catch(err => reject(err))
  })
}

function produce (conditions, inputArgument) {
  if (inputArgument === undefined) {
    return inputArgumentHolder => produce(conditions, inputArgumentHolder)
  }
  let asyncConditionsFlag = false
  for (const prop in conditions) {
    if (
      asyncConditionsFlag === false &&
    R.type(conditions[ prop ]) === 'Async'
    ) {
      asyncConditionsFlag = true
    }
  }

  if (asyncConditionsFlag === false) {
    const willReturn = {}
    for (const prop in conditions) {
      willReturn[ prop ] = conditions[ prop ](inputArgument)
    }

    return willReturn
  }
  const promised = []
  for (const prop in conditions) {
    const condition = conditions[ prop ]
    promised.push(helper({
      inputArgument,
      condition,
      prop,
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(promised)
      .then(results => {
        const willReturn = {}

        R.map(result => {
          willReturn[ result.type ] = result.payload
        }, results)

        resolve(willReturn)
      })
      .catch(err => reject(err))
  })
}

module.exports = produce


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const helper = ({ promise, prop }) => new Promise((resolve, reject) => {
  promise.then(result => {
    resolve({
      prop   : prop,
      result : result,
    })
  }).catch(err => {
    reject({
      prop  : prop,
      error : err,
    })
  })
})

function race (promises) {
  return new Promise((resolve, reject) => {
    const props = {}
    const promisedArr = []
    for (const prop in promises) {
      promisedArr.push(helper({
        promise : promises[ prop ],
        prop    : prop,
      }))
    }
    Promise.race(promisedArr)
      .then(result => {
        resolve({ [ result.prop ] : result.result })
      })
      .catch(err => {
        resolve({ [ err.prop ] : err.error })
      })
  })
}

module.exports = race


/***/ }),
/* 21 */
/***/ (function(module, exports) {

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

module.exports = random


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

function rangeBy (startNum, endNum, distance) {
  if (endNum === undefined) {
    return (endNumHolder, distanceHolder) => rangeBy(startNum, endNumHolder, distanceHolder)
  } else if (distance === undefined) {
    return distanceHolder => rangeBy(startNum, endNum, distanceHolder)
  }

  const isInteger = !distance.toString().includes('.')
  if (startNum > endNum) {
    const startNumHolder = startNum
    startNum = endNum
    endNum = startNumHolder
  }
  const willReturn = [ startNum ]
  let valueToPush = startNum

  if (isInteger) {
    const loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance))
    for (const i of loopIndexes) {
      valueToPush += distance
      willReturn.push(valueToPush)
    }
  } else {
    const decimalLength = R.compose(
      R.length,
      R.last,
      R.split('.')
    )(distance.toString())
    const loopIndexes = R.range(0, Math.floor((endNum - startNum) / distance))
    for (const i of loopIndexes) {
      valueToPush += distance
      willReturn.push(Number(valueToPush.toFixed(decimalLength)))
    }
  }

  return willReturn
}

module.exports = rangeBy


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

function renameProps (conditions, inputObject) {
  if (inputObject === undefined) {
    return inputObjectHolder => renameProps(conditions, inputObjectHolder)
  }
  const renamed = {}
  Object.keys(conditions).map(renameConditionProp => {
    if (Object.keys(inputObject).includes(renameConditionProp)) {
      renamed[ conditions[ renameConditionProp ] ] = inputObject[ renameConditionProp ]
    }
  })

  return R.merge(
    renamed,
    R.omit(
      Object.keys(conditions),
      inputObject
    )
  )
}
module.exports = renameProps


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

function resolve (promises) {
  return new Promise((res, rej) => {
    let counter = 0
    const props = {}
    const promisedArr = []
    for (const prop in promises) {
      props[ counter ] = prop
      promisedArr.push(promises[ prop ])
      counter++
    }
    Promise.all(promisedArr)
      .then(result => {
        const willReturn = {}
        result.map((val, key) => {
          const prop = props[ key ]
          willReturn[ prop ] = val
        })

        res(willReturn)
      })
      .catch(rej)
  })
}

module.exports = resolve


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const wrapper = promise => new Promise(resolve => {
  promise.then(result => {
    resolve({
      payload : result,
      type    : 'RESULT',
    })
  }).catch(err => {
    resolve({
      payload : err,
      type    : 'ERROR',
    })
  })
})

async function resolve (input) {
  try {
    const promised = R.map(
      a => wrapper(a),
      input
    )

    return await Promise.all(promised)
  } catch (err) {
    console.log(err)
  }
}

module.exports = resolve


/***/ }),
/* 26 */
/***/ (function(module, exports) {

const shuffle = arrayRaw => {
  const array = arrayRaw.concat()
  let counter = array.length
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter)
    counter--
    const temp = array[ counter ]
    array[ counter ] = array[ index ]
    array[ index ] = temp
  }

  return array
}

module.exports = shuffle


/***/ }),
/* 27 */
/***/ (function(module, exports) {

function tap (fn, inputArguments) {
  if (inputArguments === undefined) {
    return inputArgumentsHolder => tap(fn, inputArgumentsHolder)
  }
  fn(inputArguments)

  return inputArguments
}

module.exports = tap


/***/ }),
/* 28 */
/***/ (function(module, exports) {

const isPromiseLike = x => [ 'Async', 'Promise' ].includes(x)

function tapAsync (fn, input) {
  if (input === undefined) {
    return inputHolder => tapAsync(fn, inputHolder)
  }
  if (isPromiseLike(fn) === true) {
    return new Promise((resolve, reject) => {
      fn(input)
        .then(() => {
          resolve(input)
        })
        .catch(reject)
    })
  }
  fn(input)

  return input
}

module.exports = tapAsync


/***/ }),
/* 29 */
/***/ (function(module, exports) {

function throttle (callback, ms) {
  let wait = false

  return function () {
    if (!wait) {
      callback.call()
      wait = true
      setTimeout(() => {
        wait = false
      }, ms)
    }
  }
}

module.exports = throttle


/***/ }),
/* 30 */
/***/ (function(module, exports) {

function where (conditions, obj) {
  if (obj === undefined) {
    return objHolder => where(conditions, objHolder)
  }
  let flag = true
  for (const prop in conditions) {
    const result = conditions[ prop ](obj[ prop ])
    if (flag && result === false) {
      flag = false
    }
  }

  return flag
}

module.exports = where


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const R = __webpack_require__(0)

const isPromiseLike = x => [ 'Async', 'Promise' ].includes(R.type(x))

function wrap ({ fn, when, defaultTo }) {
  if (isPromiseLike(fn)) {
    return input => new Promise((resolve, reject) => {
      fn(input).then(intermediateResult => {
        if (isPromiseLike(when)) {
          when(input)
            .then(whenResult => {
              const result = whenResult === true ?
                defaultTo :
                intermediateResult

              resolve()
            })
            .catch(reject)
        } else {
          const result = when(intermediateResult) === true ?
            defaultTo :
            intermediateResult

          resolve(result)
        }
      }).catch(reject)
    })
  }
  if (isPromiseLike(when)) {
    return input => new Promise((resolve, reject) => {
      const intermediateResult = fn(input)

      when(intermediateResult)
        .then(whenResult => {
          const result = whenResult === true ?
            defaultTo :
            intermediateResult

          resolve(result)
        })
        .catch(reject)
    })
  }

  return function (input) {
    const intermediateResult = fn(input)

    return when(intermediateResult) === true ?
      defaultTo :
      intermediateResult
  }
}

module.exports = wrap


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map