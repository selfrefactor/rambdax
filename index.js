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

(function(c,d){ true?d(exports):typeof define==='function'&&define.amd?define(['exports'],d):d(c.R={});})(this,function(e){'use strict';function helper(g,x,y){if(x===void 0){return function(h,j){return helper(g,h,j);};}else if(y===void 0){return function(k){return helper(g,x,k);};}if(y[g]!==void 0){return y[g](x);}}function curry(l){return function(x,y){if(y===void 0){return function(m){return l(x,m);};}return l(x,y);};}function curryThree(n){return function(x,y,z){if(y===void 0){var helper=function helper(q,r){return n(x,q,r);};return curry(helper);}else if(z===void 0){return function(s){return n(x,y,s);};}return n(x,y,z);};}function mathHelper(t,x,y){switch(t){case'+':return x+y;case'-':return x-y;case'/':return x/y;case'*':return x*y;case'%':return x%y;}}var u=curryThree(mathHelper);function oppositeHelper(v,x,y){if(x===void 0){return function(w,A){return oppositeHelper(v,w,A);};}else if(y===void 0){return function(B){return oppositeHelper(v,x,B);};}if(x[v]!==void 0){return x[v](y);}}function propHelper(C,x){if(x===void 0){return function(D){return propHelper(C,D);};}return x[C];}function simpleHelper(E,x){if(x===void 0){return function(G){return simpleHelper(E,G);};}if(x[E]!==void 0){return x[E]();}}function addIndex(H){return function(I){for(var J=0,newFn=function newFn(){for(var K=arguments.length,L=Array(K),M=0;M<K;M++){L[M]=arguments[M];}return I.apply(null,[].concat(L,[J++]));},N=arguments.length,O=Array(N>1?N-1:0),P=1;P<N;P++){O[P-1]=arguments[P];}return H.apply(null,[newFn].concat(O));};}function adjust(Q,R,S){var U=S.concat();return U.map(function(V,W){if(W===R){return Q(S[R]);}return V;});}var X=curryThree(adjust);function filterObject(Y,Z){var a1={};for(var b1 in Z){if(Y(Z[b1])){a1[b1]=Z[b1];}}return a1;}function filter(fn,d1){if(d1.length===void 0){return filterObject(fn,d1);}var e1=-1,f1=0,g1=d1.length,h1=[];while(++e1<g1){var i1=d1[e1];if(fn(i1)){h1[f1++]=i1;}}return h1;}var j1=curry(filter);function all(k1,l1){if(arguments.length===1){return function(m1){return all(k1,m1);};}return j1(k1,l1).length===l1.length;}function any(fn,o1){var p1=0;while(p1<o1.length){if(fn(o1[p1])){return!0;}p1++;}return!1;}var q1=curry(any);function allPass(r1,x){if(arguments.length===1){return function(s1){return allPass(r1,s1);};}return!q1(function(t1){return!t1(x);})(r1);}function anyPass(u1,x){if(arguments.length===1){return function(v1){return anyPass(u1,v1);};}return q1(function(w1){return w1(x);})(u1);}function append(x1,y1){if(typeof y1==='string'){return''+y1+x1;}var z1=y1.concat();z1.push(x1);return z1;}var A1=curry(append);function both(x,y){return function(B1){return x(B1)&&y(B1);};}var C1=curry(both);function compose(){for(var D1=arguments.length,E1=Array(D1),F1=0;F1<D1;F1++){E1[F1]=arguments[F1];}return function(G1){var H1=E1.slice();while(H1.length>0){G1=H1.pop()(G1);}return G1;};}var I1={},J1=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(K1){return typeof K1;}:function(L1){return L1&&typeof Symbol==="function"&&L1.constructor===Symbol&&L1!==Symbol.prototype?"symbol":typeof L1;},M1=function(){function AwaitValue(N1){this.value=N1;}function AsyncGenerator(O1){var P1,Q1;function send(R1,S1){return new Promise(function(T1,U1){var V1={key:R1,arg:S1,resolve:T1,reject:U1,next:null};if(Q1){Q1=Q1.next=V1;}else{P1=Q1=V1;resume(R1,S1);}});}function resume(W1,X1){try{var Y1=O1[W1](X1),Z1=Y1.value;if(Z1 instanceof AwaitValue){Promise.resolve(Z1.value).then(function(a2){resume("next",a2);},function(b2){resume("throw",b2);});}else{settle(Y1.done?"return":"normal",Y1.value);}}catch(err){settle("throw",err);}}function settle(c2,d2){switch(c2){case"return":P1.resolve({value:d2,done:!0});break;case"throw":P1.reject(d2);break;default:P1.resolve({value:d2,done:!1});break;}P1=P1.next;if(P1){resume(P1.key,P1.arg);}else{Q1=null;}}this._invoke=send;if(typeof O1.return!=="function"){this.return=void 0;}}if(typeof Symbol==="function"&&Symbol.asyncIterator){AsyncGenerator.prototype[Symbol.asyncIterator]=function(){return this;};}AsyncGenerator.prototype.next=function(e2){return this._invoke("next",e2);};AsyncGenerator.prototype.throw=function(f2){return this._invoke("throw",f2);};AsyncGenerator.prototype.return=function(g2){return this._invoke("return",g2);};return{wrap:function(fn){return function(){return new AsyncGenerator(fn.apply(this,arguments));};},await:function(i2){return new AwaitValue(i2);}};}(),toConsumableArray=function(j2){if(Array.isArray(j2)){for(var i=0,k2=Array(j2.length);i<j2.length;i++)k2[i]=j2[i];return k2;}else{return Array.from(j2);}};I1;function type(a){var l2=typeof a==='undefined'?'undefined':J1(a);if(a===null){return'Null';}else if(a===void 0){return'Undefined';}else if(l2==='boolean'){return'Boolean';}else if(l2==='number'){return'Number';}else if(l2==='string'){return'String';}else if(Array.isArray(a)){return'Array';}else if(a instanceof RegExp){return'RegExp';}var m2=a.toString();if(m2.startsWith('async')){return'Async';}else if(m2==='[object Promise]'){return'Promise';}else if(m2.includes('function')||m2.includes('=>')){return'Function';}return'Object';}function equals(a,b){if(a===b){return!0;}var n2=type(a);if(n2!==type(b)){return!1;}if(n2==='Array'){var o2=Array.from(a),p2=Array.from(b);return o2.sort().toString()===p2.sort().toString();}if(n2==='Object'){var q2=Object.keys(a);if(q2.length===Object.keys(b).length){if(q2.length===0){return!0;}var r2=!0;q2.map(function(s2){if(r2){var t2=type(a[s2]),u2=type(b[s2]);if(t2===u2){if(t2==='Object'){if(Object.keys(a[s2]).length===Object.keys(b[s2]).length){if(Object.keys(a[s2]).length!==0){if(!equals(a[s2],b[s2])){r2=!1;}}}else{r2=!1;}}else if(!equals(a[s2],b[s2])){r2=!1;}}else{r2=!1;}}});return r2;}}return!1;}var v2=curry(equals);function contains(w2,x2){var y2=-1,z2=!1;while(++y2<x2.length&&!z2){if(v2(x2[y2],w2)){z2=!0;}}return z2;}var A2=curry(contains);function curry$1(f){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return function(){for(var B2=arguments.length,p=Array(B2),C2=0;C2<B2;C2++){p[C2]=arguments[C2];}return function(o){return o.length>=f.length?f.apply(void 0,toConsumableArray(o)):curry$1(f,o);}([].concat(toConsumableArray(a),p));};}var dec=function(x){return x-1;};function defaultTo(D2,E2){if(arguments.length===1){return function(F2){return defaultTo(D2,F2);};}return E2===void 0||E2===null||Number.isNaN(E2)===!0?D2:E2;}function drop(G2,a){return a.slice(G2);}var H2=curry(drop);function dropLast(I2,a){return a.slice(0,-I2);}var J2=curry(dropLast);function either(x,y){return function(K2){return x(K2)||y(K2);};}var L2=curry(either),inc=function(x){return x+1;};function find(fn,N2){return N2.find(fn);}var O2=curry(find);function findIndex(fn,Q2){var R2=Q2.length,S2=-1;while(++S2<R2){if(fn(Q2[S2])){return S2;}}return-1;}var T2=curry(findIndex);function flatten(U2,V2){V2=V2===void 0?[]:V2;for(var i=0;i<U2.length;i++){if(Array.isArray(U2[i])){flatten(U2[i],V2);}else{V2.push(U2[i]);}}return V2;}function flipExport(fn){return function(){for(var X2=arguments.length,Y2=Array(X2),Z2=0;Z2<X2;Z2++){Y2[Z2]=arguments[Z2];}if(Y2.length===1){return function(a3){return fn(a3,Y2[0]);};}else if(Y2.length===2){return fn(Y2[1],Y2[0]);}return void 0;};}function flip(fn){return flipExport(fn);}function has(c3,d3){return d3[c3]!==void 0;}var e3=curry(has);function head(a){if(typeof a==='string'){return a[0]||'';}return a[0];}function ifElse(f3,g3,h3){return function(i3){if(f3(i3)===!0){return g3(i3);}return h3(i3);};}var j3=curryThree(ifElse);function isNil(x){return x===void 0||x===null;}function indexOf(x,k3){var l3=-1,m3=k3.length;while(++l3<m3){if(k3[l3]===x){return l3;}}return-1;}var n3=curry(indexOf);function baseSlice(o3,p3,q3){var r3=-1,s3=o3.length;q3=q3>s3?s3:q3;if(q3<0){q3+=s3;}s3=p3>q3?0:q3-p3>>>0;p3>>>=0;var t3=Array(s3);while(++r3<s3){t3[r3]=o3[r3+p3];}return t3;}function init(a){if(typeof a==='string'){return a.slice(0,-1);}return a.length?baseSlice(a,0,-1):[];}function last(a){if(typeof a==='string'){return a[a.length-1]||'';}return a[a.length-1];}function mapObject(fn,v3){var w3={};for(var x3 in v3){w3[x3]=fn(v3[x3]);}return w3;}function map(fn,z3){if(z3.length===void 0){return mapObject(fn,z3);}var A3=-1,B3=z3.length,C3=Array(B3);while(++A3<B3){C3[A3]=fn(z3[A3]);}return C3;}var D3=curry(map);function match(E3,F3){var G3=F3.match(E3);return G3===null?[]:G3;}var H3=curry(match);function merge(I3,J3){return Object.assign({},I3,J3);}var K3=curry(merge);function omit(L3,M3){if(arguments.length===1){return function(N3){return omit(L3,N3);};}if(M3===void 0||M3===null){return void 0;}if(typeof L3==='string'){L3=L3.split(',').map(function(x){return x.trim();});}var O3={};for(var P3 in M3){if(!L3.includes(P3)){O3[P3]=M3[P3];}}return O3;}function partialCurry(fn){var R3=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return function(S3){if(type(fn)==='Async'||type(fn)==='Promise'){return new Promise(function(T3,U3){fn(K3(S3,R3)).then(T3).catch(U3);});}return fn(K3(S3,R3));};}function path(V3,W3){if(arguments.length===1){return function(X3){return path(V3,X3);};}if(W3===null||W3===void 0){return void 0;}var Y3=W3,Z3=0;if(typeof V3==='string'){V3=V3.split('.');}while(Z3<V3.length){if(Y3===null||Y3===void 0){return void 0;}Y3=Y3[V3[Z3]];Z3++;}return Y3;}function pathOr(a4,b4,c4){return defaultTo(a4,path(b4,c4));}var d4=curry$1(pathOr);function pick(e4,f4){if(arguments.length===1){return function(g4){return pick(e4,g4);};}if(!(type(f4)==='Object')){return void 0;}if(type(e4)==='String'){e4=e4.split(',').map(function(x){return x.trim();});}var h4={},i4=0;while(i4<e4.length){if(e4[i4]in f4){h4[e4[i4]]=f4[e4[i4]];}i4++;}return h4;}function pipe(){for(var j4=arguments.length,k4=Array(j4),l4=0;l4<j4;l4++){k4[l4]=arguments[l4];}return compose.apply(void 0,toConsumableArray(k4.reverse()));}function pluck(m4,n4){var o4=[];D3(function(p4){if(!(p4[m4]===void 0)){o4.push(p4[m4]);}},n4);return o4;}var q4=curry(pluck);function prepend(r4,s4){if(typeof s4==='string'){return''+r4+s4;}var t4=s4.concat();t4.unshift(r4);return t4;}var u4=curry(prepend);function prop(v4,w4){return w4[v4];}var x4=curry(prop);function propEq(y4,z4,A4){return A4[y4]===z4;}var B4=curryThree(propEq);function range(C4,D4){for(var E4=[],i=C4;i<D4;i++){E4.push(i);}return E4;}function reduce(fn,G4,H4){return H4.reduce(fn,G4);}var I4=curryThree(reduce);function repeat(a,J4){var K4=Array(J4);return K4.fill(a);}var L4=curry(repeat);function replace(M4,N4,O4){return O4.replace(M4,N4);}var P4=curryThree(replace);function sort(fn,R4){var S4=R4.concat();return S4.sort(fn);}var T4=curry(sort);function sortBy(fn,V4){var W4=V4.concat();return W4.sort(function(a,b){var X4=fn(a),Y4=fn(b);return X4<Y4?-1:X4>Y4?1:0;});}var Z4=curry(sortBy);function split(a5,b5){return b5.split(a5);}var c5=curry(split);function splitEvery(d5,a){d5=d5>1?d5:1;var e5=[],f5=0;while(f5<a.length){e5.push(a.slice(f5,f5+=d5));}return e5;}var g5=curry(splitEvery);function tap(fn,i5){fn(i5);return i5;}var j5=curry(tap);function tail(k5){return H2(1,k5);}function take(l5,a){if(typeof a==='string'){return a.slice(0,l5);}return baseSlice(a,0,l5);}var m5=curry(take);function takeLast(n5,a){var o5=a.length;n5=n5>o5?o5:n5;if(typeof a==='string'){return a.slice(o5-n5);}n5=o5-n5;return baseSlice(a,n5,o5);}var p5=curry(takeLast);function test(q5,r5){return r5.search(q5)!==-1;}var s5=curry(test);function typedDefaultTo(t5,u5){if(arguments.length===1){return function(v5){return typedDefaultTo(t5,v5);};}return!(type(u5)===type(t5))?t5:u5;}function typedPathOr(w5,x5,y5){return typedDefaultTo(w5,path(x5,y5));}var z5=curry$1(typedPathOr);function uniq(A5){var B5=-1,C5=[];while(++B5<A5.length){var D5=A5[B5];if(!A2(D5,C5)){C5.push(D5);}}return C5;}function update(E5,F5,G5){var H5=G5.concat();return H5.fill(F5,E5,E5+1);}var I5=curryThree(update);function values(J5){var K5=[];for(var L5 in J5){K5.push(J5[L5]);}return K5;}var M5=u('+'),always=function always(x){return function(){return x;};},complement=function complement(fn){return function(O5){return!fn(O5);};},P5=oppositeHelper('concat'),Q5=u('/'),R5=helper('endsWith'),F=function F(){return!1;},identity=function identity(x){return x;},S5=helper('includes'),T5=helper('join'),U5=helper('lastIndexOf'),V5=propHelper('length'),W5=u('%'),X5=u('*'),not=function not(x){return!x;},Y5=helper('padEnd'),Z5=helper('padStart'),a6=simpleHelper('reverse'),b6=helper('startsWith'),c6=u('-'),T=function T(){return!0;},d6=simpleHelper('toLowerCase'),e6=simpleHelper('toString'),f6=simpleHelper('toUpperCase'),g6=simpleHelper('trim');e.add=M5;e.always=always;e.complement=complement;e.concat=P5;e.divide=Q5;e.endsWith=R5;e.F=F;e.identity=identity;e.includes=S5;e.join=T5;e.lastIndexOf=U5;e.length=V5;e.modulo=W5;e.multiply=X5;e.not=not;e.padEnd=Y5;e.padStart=Z5;e.reverse=a6;e.startsWith=b6;e.subtract=c6;e.T=T;e.toLower=d6;e.toString=e6;e.toUpper=f6;e.trim=g6;e.addIndex=addIndex;e.adjust=X;e.all=all;e.allPass=allPass;e.anyPass=anyPass;e.any=q1;e.append=A1;e.both=C1;e.compose=compose;e.contains=A2;e.curry=curry$1;e.dec=dec;e.defaultTo=defaultTo;e.drop=H2;e.dropLast=J2;e.either=L2;e.inc=inc;e.equals=v2;e.filter=j1;e.find=O2;e.findIndex=T2;e.flatten=flatten;e.flip=flip;e.has=e3;e.head=head;e.ifElse=j3;e.isNil=isNil;e.indexOf=n3;e.init=init;e.last=last;e.map=D3;e.match=H3;e.merge=K3;e.omit=omit;e.partialCurry=partialCurry;e.path=path;e.pathOr=d4;e.pick=pick;e.pipe=pipe;e.pluck=q4;e.prepend=u4;e.prop=x4;e.propEq=B4;e.range=range;e.reduce=I4;e.repeat=L4;e.replace=P4;e.sort=T4;e.sortBy=Z4;e.split=c5;e.splitEvery=g5;e.tap=j5;e.tail=tail;e.take=m5;e.takeLast=p5;e.test=s5;e.type=type;e.typedPathOr=z5;e.typedDefaultTo=typedDefaultTo;e.uniq=uniq;e.update=I5;e.values=values;Object.defineProperty(e,'__esModule',{value:!0});});

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
exports.random = __webpack_require__(20)
exports.rangeBy = __webpack_require__(21)
exports.renameProps = __webpack_require__(22)
exports.resolve = __webpack_require__(23)
exports.resolveSecure = __webpack_require__(24)
exports.shuffle = __webpack_require__(25)
exports.tap = __webpack_require__(26)
exports.tapAsync = __webpack_require__(27)
exports.throttle = __webpack_require__(28)
exports.when = __webpack_require__(29)
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
/***/ (function(module, exports) {

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

module.exports = random


/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports) {

function when(rule, fn){
  if(rule === undefined){
    return ruleHolder => when(ruleHolder, fn)
  }
  
  return input => {
    if(rule(input) === true){
      return fn(input)
    }
    return input
  }
}

module.exports = when

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