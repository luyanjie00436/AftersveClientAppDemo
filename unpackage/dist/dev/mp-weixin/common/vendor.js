(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"AftersveClientApp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/variable/website.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 服务请地址
 */
module.exports = {
  website: 'http://192.168.1.151:5001' // 映射修改
  // website: 'https://apps.et-times.cn',		// https全局修改
};

/***/ }),

/***/ 11:
/*!********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/variable/imgPath.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 常见图片路径
 */
module.exports = {
  basic: {
    organ: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/49ff6a99-359d-4dac-ab1b-07b982e2e083.png',
    product: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/b543b323-e890-4ab0-b963-164f8f91844a.png',
    usercreate: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/85c739f8-ada3-436c-83fb-6aff3b512fae.png' },

  /**
                                                                                                                                             * /static/fabIcon
                                                                                                                                             */
  fabIcon: {
    organization: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/64239169-d58e-424c-895f-b34b594c7476.png',
    organizationHL: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/1e0d7f2f-4689-4fc5-8325-e66392862d21.png',
    person: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/69ea51ef-90c3-40b4-8f78-e1bdf02f926b.png',
    personHL: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/381510fc-fd7f-4e15-8858-e91d1712a518.png' },

  /**
                                                                                                                                           * /static/login
                                                                                                                                           */
  login: {
    logo_my: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/a6d1c4b0-b0f8-4e91-ba65-73620dd5180f.png' },

  /**
                                                                                                                                          * /static/organ
                                                                                                                                          */
  organ: {
    organ_default: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/99c9664c-5793-4535-9452-2da6fbf4ae1e.png' },

  /**
                                                                                                                                                * /static/thumb
                                                                                                                                                */
  thumb: {
    device_thumb: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/361f6d02-7e72-4b26-8e0e-09ba8bccd0a7.png' },

  /**
                                                                                                                                               * /static/logo.png
                                                                                                                                               */
  // logo :'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/bf1bd514-fc83-4648-b542-b3ccc096484a.png'
  logo: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-c07243ab-98a3-4f90-9b4d-2fa60aba2ee9/4bc9a4b3-fcf6-4995-898f-e66efd3dd687.png' };

/***/ }),

/***/ 12:
/*!***********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/publicfunc.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 全局中可能用到的通用方法
 * @property {Function} urlEncode 将对象转换为url参数形式
 * @property {Function} showTimePipe 类似于微信的显示方式 
 * 
 */

module.exports = {
  /** 当前页面是否包含上一页
                    * @param {Object} that 当前页面的参数
                    */
  hasBack: function hasBack(that) {
    var pages = getCurrentPages();
    return pages.length > 1;
  },
  /**将对象转换为url参数形式
      * @property {Object} param 将要转换为URL参数的字符串对象
      * @property {String} key URL 参数字符串的前缀
      * @property {Boolean} encode 是否进行URL编码，默认为true
      * @return {String} URL参数字符串
      */
  urlEncode: function urlEncode(param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof param;
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += this.urlEncode(param[i], k, encode);
      }
    }
    return paramStr;
  },
  /** 类似微信的显示方式
      * @param {Nmuber} unix_stamp 时间值（返回1970年午夜至今的毫秒数）
      */
  showTimePipe: function showTimePipe(unix_stamp) {// unix_stamp 精确到微秒
    var _today_obj = new Date(),
    _today_date = {
      y: _today_obj.getFullYear(),
      m: _today_obj.getMonth() + 1 < 10 ? '0' + (_today_obj.getMonth() - -1) : _today_obj.getMonth() - -1,
      d: _today_obj.getDate() < 10 ? '0' + _today_obj.getDate() : _today_obj.getDate() };


    var _today_stamp = Date.parse(_today_date.y + '/' + _today_date.m + '/' + _today_date.d + ' 00:00:00');

    var stamp = [];
    stamp[0] = _today_stamp + 86400000;
    stamp[1] = _today_stamp;
    stamp[2] = _today_stamp - 86400000;
    stamp[3] = _today_stamp - 172800000;

    stamp[4] = _today_stamp - 518400000; // 7天

    stamp[5] = _today_stamp - 31536000000; // 365天

    var _compare_obj = new Date();
    _compare_obj.setTime(unix_stamp);

    var return_str;

    if (unix_stamp >= stamp[1] && unix_stamp < stamp[0]) {
      return_str = _compare_obj.getHours() + ':' + (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes());
    } else if (unix_stamp >= stamp[2] && unix_stamp < stamp[1]) {
      var yesterdayText = '昨天';
      return_str = yesterdayText + ' ' + _compare_obj.getHours() + ':' + (
      _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes());
    } else if (unix_stamp >= stamp[3] && unix_stamp < stamp[2]) {
      var theDayBeforeYesterdayText = '前天';
      return_str = theDayBeforeYesterdayText + ' ' + _compare_obj.getHours() + ':' + (
      _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes());

    } else if (unix_stamp >= stamp[4] && unix_stamp < stamp[3]) {// 7天内
      var daynames = ['天', '一', '二', '三', '四', '五', '六'];
      var dathStr = '星期' + daynames[_compare_obj.getDay()];

      var SundayText = '星期天';
      var MondayText = '星期一';
      var TuesdayText = '星期二';
      var WednesdayText = '星期三';
      var ThursdayText = '星期四';
      var FridayText = '星期五';
      var SaturdayText = '星期六';

      var dathStr2;

      switch (dathStr) {
        case '星期天':
          dathStr2 = SundayText;
          break;
        case '星期一':
          dathStr2 = MondayText;
          break;
        case '星期二':
          dathStr2 = TuesdayText;
          break;
        case '星期三':
          dathStr2 = WednesdayText;
          break;
        case '星期四':
          dathStr2 = ThursdayText;
          break;
        case '星期五':
          dathStr2 = FridayText;
          break;
        case '星期六':
          dathStr2 = SaturdayText;
          break;
        default:
          dathStr2 = dathStr;
          break;}


      return_str = dathStr2 + ' ' + _compare_obj.getHours() + ':' + (
      _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes());
    } else if (unix_stamp >= stamp[5] && unix_stamp < stamp[4]) {// 365天内
      var monthText = '月';
      var dayText = '日';
      return_str = _compare_obj.getMonth() - -1 + monthText + _compare_obj.getDate() + dayText + ' ' +
      _compare_obj.getHours() + ':' + (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes());

    } else {
      var yearText = '年';
      var monthText = '月';
      var dayText = '日';
      return_str = _compare_obj.getFullYear() + yearText + (_compare_obj.getMonth() - -1) +
      monthText + _compare_obj.getDate() + dayText + ' ' + _compare_obj.getHours() + ':' + (
      _compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes());
    }
    return return_str;

  } };

/***/ }),

/***/ 13:
/*!**********************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/changeobjectecordname.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 修改字段名
 * @autho 陆彦捷
 * @description  循环修改数组或对象的字段名。(为了适配data-com系列控件值 ，修改当前和children对应的名称)
 * @property {Function} change 循环修改数组或对象字段名 
 * @property {Function} changeValeAndtext 递归修改value\text\children
 * @property {Function} changetoLabel 修改对象/数组 所有labelName名称为label
 * @property {Function} changetoLabel_rescusive 递归修改所有labelName 名称为label (这里子级的固定名称为children)
 * @property {Function} changetree_array 递归修改数组的值（用于xiaolu-tree）
 * @property {Function} changetree 递归修改对象的值（用于xiaolu-tree）
 */
module.exports = {

  /** 循环修改数组或对象字段名
                    * @param {Object} obj	数组/ 对象 (暂时不做类型验证)
                    * @param {Object} valueName	value对应的属性名
                    * @param {Object} textName		text对应的属性名
                    * @param {Object} childrenName children对应的属性名
                    */
  change: function change(obj) {var valueName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';var textName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';var childrenName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
    //  深拷贝对象(有缺陷，暂时这么用) + 修改children属性名 
    var newData = JSON.parse(JSON.stringify(obj));
    //  属性值(修改属性值)
    if (newData.length == undefined) {
      // 传递的obj类型为对象
      this.changeValeAndtext(newData, valueName, textName, childrenName);
    } else {
      // 传递的obj类型为数组
      for (var i = 0; i < newData.length; i++) {
        this.changeValeAndtext(newData[i], valueName, textName, childrenName);
      }
    }
    return newData;
  },

  /** 递归修改value\text\children
      * @param {Object} object 对象
      * @param {Object} valueName 原value属性名
      * @param {Object} textName 原text属性名
      */
  changeValeAndtext: function changeValeAndtext(object) {var valueName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';var textName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';var childrenName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
    // 修改value、text、chilren名
    if (valueName != 'value') {
      object["value"] = object[valueName] || object["value"] || '';
      delete object[valueName];
    }
    if (textName != 'text') {
      object['text'] = object[textName] || object['text'] || '';
      delete object[textName];
    }
    if (childrenName != 'children') {
      object['children'] = object[childrenName] || object["children"] || [];
      delete object[childrenName];
    }
    if (!Boolean(object.children)) {return;} // 不存在children时，返回
    if (object.children.length == 0) {return;} // children值为0时，返回
    // 递归修改chidren
    for (var i = 0; i < object.children.length; i++) {
      this.changeValeAndtext(object.children[i], valueName, textName, childrenName);
    }
  },
  /**
      * 修改对象/数组 所有labelName名称为label
      * @param {type}  obj
      * @param {type}  labelName
      */
  changetoLabel: function changetoLabel(obj) {var labelName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'label';
    //  深拷贝对象(有缺陷，暂时这么用) + 修改children属性名
    var newData = JSON.parse(JSON.stringify(obj));
    //  属性值(修改属性值)
    if (newData.length == undefined) {
      // 传递的obj类型为对象
      this.changetoLabel_rescusive(newData, labelName);
    } else {
      // 传递的obj类型为数组
      for (var i = 0; i < newData.length; i++) {
        this.changetoLabel_rescusive(newData[i], labelName);
      }
    }
    return newData;
  },
  /**
      * 递归修改所有labelName 名称为label (这里子级的固定名称为children)
      * @param {type}  obj
      * @param {type}  labelName
      */
  changetoLabel_rescusive: function changetoLabel_rescusive(obj) {var labelName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'label';
    // 修改 label名
    if (labelName != 'label') {
      obj["label"] = obj[labelName] || obj["label"] || '';
      delete obj[labelName];
    }
    if (Boolean(obj.children)) {return;} // 不存在children时，返回
    if (obj.children.length == 0) {return;} // children长度为0 ，返回
    // 递归修改chidren
    for (var i = 0; i < obj.children.length; i++) {
      this.changetoLabel_rescusive(obj.children[i], labelName);
    }
  },
  /** 递归修改数组的值（用于xiaolu-tree）
      * @param {Object} obj	需要修改的数组或对象
      * @param {String} idName id列对应的名称（默认id）
      * @param {String} nameName name列对应的名称（默认name）
      * @param {String} childrenName children列对应的名称（children）
      */
  changetree_array: function changetree_array(obj) {var idName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';var nameName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'name';var childrenName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
    //  深拷贝对象(有缺陷，暂时这么用) + 修改children属性名
    var newData = JSON.parse(JSON.stringify(obj));
    //  属性值(修改属性值)
    if (newData.length == undefined) {
      // 传递的obj类型为对象
      this.changetree(newData, idName, nameName, childrenName);
    } else {
      // 传递的obj类型为数组
      for (var i = 0; i < newData.length; i++) {
        this.changetree(newData[i], idName, nameName, childrenName);
      }
    }
    return newData;
  },
  /** 递归修改对象的值（用于xiaolu-tree）
      * @param {Object} object	需要修改的对象
      * @param {String} idName id列对应的名称
      * @param {String} nameName name列对应的名称
      * @param {String} childrenName children列对应的名称
      */
  changetree: function changetree(object) {var idName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';var nameName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'name';var childrenName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
    // 修改value、text、chilren名
    if (idName != 'id') {
      object["id"] = object[idName] || object["id"] || '';
      delete object[idName];
    }
    if (nameName != 'name') {
      object['name'] = object[nameName] || object['name'] || '';
      delete object[nameName];
    }
    if (childrenName != 'children') {
      object['children'] = object[childrenName] || object["children"] || [];
      delete object[childrenName];
    }
    if (!Boolean(object.children)) {return;} // children 不存在返回
    if (object.children.length == 0) {return;} // children 长度大于0返回
    // 递归修改chidren
    for (var i = 0; i < object.children.length; i++) {
      this.changetree(object.children[i], idName, nameName, childrenName);
    }
  } };

/***/ }),

/***/ 14:
/*!*************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/filterobject.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 过滤data-com控件的值
 * @autho 陆彦捷
 * @date 2021.06.25
 * @description  1.通过value过滤
 */
module.exports = {
  /** 过滤list数组内 与"value"字段等于传入值的对象，及其子对象
                    * @param {Object} list 数组
                    * @param {Object} value value值
                    * @description 这里用于编辑时不选择本身，以及下一级
                    *  注：这里对象没有用深拷贝。会影响本身的值。这里只是为了特定情况而这么做的。
                    * 注： 这里与 filterbyvalue 对象互相递归调用
                    */
  filterbyvalue_list: function filterbyvalue_list(list, value) {
    if (list != null) {
      for (var index = 0; index < list.length; index++) {
        var item = this.filterbyvalue(list[index], value);
        if (item == null) {
          list.splice(index, 1); // 删除为空的元素
          break;
        }
      }
    }
    return list;
  },
  /** 过滤obj对象 obj内"value"字段等于传入值的对象，及其子对象
      * @param {Object} obj obj对象（默认符合data-com，不进行验证）
      * @param {Object} value value值
      * @description 这里用于编辑时不选择本身，以及下一级
      *  注：这里没有用深拷贝，如果有有序操作可能会影响值。
      * 注： 这里与filterbyvalue_list对象互相递归调用
      */
  filterbyvalue: function filterbyvalue(obj, value) {
    if (!obj) {return null;}
    if (obj.value == value) {
      // 令当前对象等于空
      obj = null;
    } else if (obj.children != null) {
      if (obj.children.length > 0) {
        this.filterbyvalue_list(obj.children, value);
      }
    }
    return obj;
  } };

/***/ }),

/***/ 15:
/*!******************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/login.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {




var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));
var _userstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/userstorage.js */ 19));
var _staffstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/staffstorage.js */ 20));
var _merchant = _interopRequireDefault(__webpack_require__(/*! @/common/request/merchant.js */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                               * 登录的方法
                                                                                                                                                                               * @author 陆彦捷
                                                                                                                                                                               * @property {function} login_after 登录的后续操作及判断（登录、注册（后续可能）、绑定后返回的数据）
                                                                                                                                                                               */ // 登录
// 组织
// 用户
// 组织请求
module.exports = { /**
                    * 退出登录的后续操作（清除storage）
                    */login_exit_after: function login_exit_after() {// 跳转到登录页
    uni.navigateTo({ url: '/pages/login/login-weixin/login-weixin' });





  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/storage/loginstorage.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {




var _globalfuc = _interopRequireDefault(__webpack_require__(/*! @/common/function/globalfuc.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                  * 登录信息的验证
                                                                                                                                                                                  * @autho 陆彦捷
                                                                                                                                                                                  @description  注：当前程序上登录名（loginName）和手机号（Mobile）部分，后期可能会分开（因为返回参数中没有loginName）
                                                                                                                                                                                  */ // 全局方法
module.exports = { /** 设置当前登录的信息
                    * @param {String} Mobile	手机号码
                    * @param {DateTime} ServerTime 系统响应的登录时间
                    * @param {String} Token	Token的值
                    * @param {String} TokenExp	Token的有效时间（单位s）
                    * @param {Number} UserId	用户UserId
                    * @param {String}   OpenId	微信OpenId
                    */setloginMessage: function setloginMessage(Mobile, ServerTime, Token, TokenExp, UserId) {var OpenId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;try {uni.setStorageSync("login:loginName", Mobile); // 手机号码
    } catch (e) {}
    try {
      uni.setStorageSync("login:serverTime", Date(ServerTime)); // 服务时间
    } catch (e) {}
    try {
      uni.setStorageSync("login:token", Token); // Token值
    } catch (e) {}
    try {
      uni.setStorageSync("login:tokenExp", TokenExp); // Token的有效时间
    } catch (e) {}
    try {
      uni.setStorageSync("login:userId", UserId); // 用户UserId
    } catch (e) {}
    try {
      uni.setStorageSync("login:openId", OpenId); // 微信号
    } catch (e) {}
  },
  /**
      * 获取当期用户名
      */
  getLoginName: function getLoginName() {
    try {
      return uni.getStorageSync("login:loginName");
    } catch (e) {
      return null;
    }
  },
  /**
      * 获取当前手机号码
      */
  getMobile: function getMobile() {
    try {
      return uni.getStorageSync("login:mobile");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前Token值
      * @param {String} token
      */
  setToken: function setToken(token) {
    uni.setStorageSync("login:token", token); // Token值
  },
  /** 获取当前的Token值
      * @return {String} Token值
      */
  getToken: function getToken() {
    try {
      return uni.getStorageSync("login:token");
    } catch (e) {
      return null;
    }
  },
  /**
      * 获取当前UserId
      */
  getUserId: function getUserId() {
    try {
      return uni.getStorageSync("login:userId");
    } catch (e) {
      return 0;
    }
  },
  /** 设置用户openId
      * @param {Object} OpenId openId
      */
  setOpenId: function setOpenId(OpenId) {
    uni.setStorageSync("login:openId", OpenId);
  },
  /**
      * 返回用户openId
      */
  getOpenId: function getOpenId() {
    try {
      return uni.getStorageSync("login:openId");
    } catch (e) {
      return null;
    }
  },
  /** 设置组织列表数量
      * @param {Object} mchLength 数量
      */
  setMchLength: function setMchLength(mchLength) {
    uni.setStorageSync("login:mchLength", mchLength);
  },
  /**
      * 获取组织列表数量
      */
  getMchLength: function getMchLength() {
    try {
      return uni.getStorageSync("login:mchLength");
    } catch (e) {
      return 0;
    }
  },
  /**
      * 设置跳过此步骤为true
      */
  setSkipTrue: function setSkipTrue() {
    uni.setStorageSync("login:skip", true);
  },
  /**
      * 获取跳过此步骤值
      */
  getSkip: function getSkip() {
    try {
      return uni.getStorageSync("login:skip");
    } catch (e) {
      return false;
    }
  },
  /**
      * 清除当前登录信息
      */
  clearloginMessage: function clearloginMessage() {
    // 用户名
    try {
      _globalfuc.default.clearSingle("login:loginName", "login"); // 用户名
      _globalfuc.default.clearSingle("login:mobile", "login"); // 手机号码
      _globalfuc.default.clearSingle("login:serverTime", "login"); // 系统响应的登录时间
      _globalfuc.default.clearSingle("login:token", "login"); // Token值
      _globalfuc.default.clearSingle("login:tokenExp", "login"); // Token的有效时间（单位s）
      _globalfuc.default.clearSingle("login:userId", "login"); // UserId
      _globalfuc.default.clearSingle("login:openId", "login"); // 清除openId
      _globalfuc.default.clearSingle("login:mchLength", "login"); // 清除用户包含的组织长度
      _globalfuc.default.clearSingle("login:skip", "login"); // 清除跳过创建/加入组织步骤
    } catch (e) {
      console.error("清除login=>", e);
    }
  },
  /**
      * 判断用户是否处于登录状态。（实际与Token、以及有效期有关，暂时只判断登录名）
      * 注：由于本地时间与服务器时间差。这里不取本地这里不做
      */
  isLogin: function isLogin() {
    try {
      // 判断获取值非空
      if (!Boolean(uni.getStorageSync("login:loginName")) && !Boolean(uni.getStorageSync("login:serverTime")) && !Boolean(uni.getStorageSync("login:tokenExp"))) {
        return false;
      }
      // 获取或判断当前是否登录
      var loginName = uni.getStorageSync("login:loginName");
      var serverTime = new Date(uni.getStorageSync("login:serverTime"));
      var tokenExp = uni.getStorageSync("login:tokenExp");
      var lastTime = new Date(uni.getStorageSync("login:serverTime"));
      lastTime.setSeconds(lastTime.getMinutes() + tokenExp); // 当前时间，加上Token有效时间单位s
      return Boolean(loginName) && new Date().setSeconds(new Date().getSeconds() + 100) >= serverTime && new Date() <= lastTime;
    } catch (e) {
      console.log("isLogin=>", e);
      return false;
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!**********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/globalfuc.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * 全局方法
 * @author 陆彦捷
 * @date 2021.07.08 同步清除本地单个缓存clearSingle
 */

module.exports = {
  /** 全局清除单个缓存
                    * @param {Object} name	缓存名称
                    * @param {Object} groupName 缓存对应的组名称（如login、organ等）
                    */
  clearSingle: function clearSingle(name, groupName) {
    try {
      uni.clearStorageSync(name); // 用户名
    } catch (e) {
      //TODO handle the exception
      console.error("清除" + groupName + "=>", e);
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/storage/organstorage.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * 当前组织信息
 * @autho 陆彦捷
 * @description  获取当前的用户信息
 */

module.exports = {
  /** 设置当前组织id
                    * @param {Object} id
                    */
  setIndustryId: function setIndustryId(id) {
    uni.setStorageSync("organ:id", id);
  },
  /**
      * 获取当前组织id
      */
  getIndustryId: function getIndustryId() {
    try {
      return uni.getStorageSync("organ:id");
    } catch (e) {
      return 0;
    }
  },
  /** 设置当前组织名称
      * @param {Object} name
      */
  setTopName: function setTopName(name) {
    return uni.getStorageSync("organ:topName", name);
  },
  /**
      * 获取当前组织名称
      */
  getTopName: function getTopName() {
    try {
      return uni.getStorageSync("organ:topName");
    } catch (e) {
      return null;
    }
  },
  /**
      * 设置当前门店id	 
      * @param {Object} id 门店id
      */
  setBranchId: function setBranchId(id) {
    uni.setStorageSync("organ:branchid", id);
  },
  /**
      * 获取当前门店id
      */
  getBranchId: function getBranchId() {
    try {
      return uni.getStorageSync("organ:branchid");
    } catch (e) {
      return 0;
    }
  },
  /** 设置当前门店名称
      * @param {Object} name 门店名称
      */
  setName: function setName(name) {
    uni.setStorageSync("organ:name", name);
  },
  /**
      * 获取当前门店名称
      */
  getName: function getName() {
    try {
      return uni.getStorageSync("organ:name");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前门店地址
      * @param {Object} address 门店地址
      */
  setAddress: function setAddress(address) {
    uni.setStorageSync("organ:address", address);
  },
  /**
      * 获取当前门店名称
      */
  getAddress: function getAddress() {
    try {
      return uni.getStorageSync("organ:address");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前（组织/门店）是否为商户
      * @param {Boolean} isCust
      */
  setIsCust: function setIsCust(isCust) {
    uni.setStorageSync("organ:isCus", isCust);
  },
  /**
      * 获取当前（组织/门店）是否为商户
      */
  getIsCust: function getIsCust() {
    try {
      return uni.getStorageSync("organ:isCus");
    } catch (e) {
      return false;
    }
  },
  /** 设置当前（组织/门店）是否为厂商
      * @param {Boolean} isSup
      */
  setIsSup: function setIsSup(isSup) {
    uni.setStorageSync("organ:isSup", isSup);
  },
  /**
      * 获取当前（组织/门店）是否为厂商
      */
  getIsSup: function getIsSup() {
    try {
      return uni.getStorageSync("organ:isSup");
    } catch (e) {
      return false;
    }
  },
  /** 设置当前（组织/门店）是否为服务商
      * @param {Boolean} isSvc
      */
  setIsSvc: function setIsSvc(isSvc) {
    uni.setStorageSync("organ:isSvc", isSvc);
  },
  /**
      * 设置当前（组织/门店）是否为服务商
      */
  getIsSvc: function getIsSvc() {
    try {
      return uni.getStorageSync("organ:isSvc");
    } catch (e) {
      return false;
    }
  },
  /** 设置当前组织
      * @param {Object} organ
      */
  setCurrentOrg: function setCurrentOrg(organ) {
    uni.setStorageSync("organ:current", organ);
  },
  /**
      * 获取当前组织
      */
  getCurrentOrg: function getCurrentOrg() {
    try {
      return uni.getStorageSync("organ:current");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前门店
      * @param {Object} branch 门店信息
      */
  setCurrentBranch: function setCurrentBranch(branch) {
    uni.setStorageSync("organ:currentBranch", branch);
  },
  /**
      * 获取当前门店
      */
  getCurrentBranch: function getCurrentBranch() {
    try {
      return uni.getStorageSync("organ:currentBranch");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前用户的组织列表
      * @param {Array} organs
      */
  setmyOrgans: function setmyOrgans(organs) {
    uni.setStorageSync("organ:mylist", organs);
  },
  /**
      * 获取当前用户的组织列表
      */
  getmyOrgans: function getmyOrgans() {
    try {
      return uni.getStorageSync("organ:mylist");
    } catch (e) {
      return null;
    }
  },
  /**设置完整组织架构
      * @param {Object} datas 组织架构数据
      */
  setFullOrg: function setFullOrg(datas) {
    uni.setStorageSync("organ:fullOrg", datas);
  },
  /**
      * 获取完整组织架构
      */
  getFullOrg: function getFullOrg() {
    try {
      return uni.getStorageSync("organ:fullOrg");
    } catch (e) {
      return null;
    }
  },
  /**
      * 清除当前组织信息
      */
  clear: function clear() {
    try {
      uni.clearStorageSync("organ:id"); // 组织id
      uni.clearStorageSync("organ:branchid"); // 门店id
      uni.clearStorageSync("organ:name"); // 组织名称
      uni.clearStorageSync("organ:isCus"); // 是否为商户
      uni.clearStorageSync("organ:isSup"); // 是否为厂商
      uni.clearStorageSync("organ:isSvc"); // 是否为服务商
      uni.clearStorageSync("organ:current"); // 组织信息
      uni.clearStorageSync("organ:currentBranch"); // 门店信息
      uni.clearStorageSync("organ:mylist"); // 当前用户的组织列表
      uni.clearStorageSync("organ:fullOrg"); // 当前组织机构树
    } catch (e) {
      console.error("清除本地当前组织信息失败=>", e);
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!***********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/storage/userstorage.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * 当前用户信息
 * @autho 陆彦捷
 * @description  设置和获取当前用户信息
 */
module.exports = {
  /** 设置当前用户id
                    * @param {Object} id
                    */
  setUserId: function setUserId(id) {
    uni.setStorageSync("user:id", id);
  },
  /**
      * 获取当前用户id
      */
  getUserId: function getUserId() {
    try {
      return uni.getStorageSync("user:id");
    } catch (e) {
      return 0;
    }
  },
  /** 设置用户的姓名
      * @param {String} name 姓名
      */
  setName: function setName(name) {
    uni.setStorageSync("user:name", name);
  },
  /**
      * 返回用户的姓名
      */
  getName: function getName() {
    try {
      return uni.getStorageSync("user:name");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前用户登录名
      * @param {string} login_name 登录名
      */
  setLoginName: function setLoginName(login_name) {
    uni.setStorageSync("user:login_name", login_name);
  },
  /**
      * 返回当前用户登录名
      */
  getLoginName: function getLoginName() {
    try {
      return uni.getStorageSync("user:login_name");
    } catch (e) {
      return null;
    }
  },
  /** 设置用户绑定手机号
      * @param {String} mobile
      */
  setMobile: function setMobile(mobile) {
    uni.setStorageSync("user:mobile", mobile);
  },
  /**
      * 获取用户绑定手机号
      */
  getMobile: function getMobile() {
    try {
      return uni.getStorageSync("user:mobile");
    } catch (e) {
      return null;
    }
  },
  /** 设置当前用户的头像路径
      * @param {string} avatar 当前用户头像的路径
      */
  setAvatar: function setAvatar(avatar) {
    uni.setStorageSync("user:avatar", avatar);
  },
  /**
      * 获取当前用户的头像路径
      */
  getAvatar: function getAvatar() {
    try {
      return uni.getStorageSync("user:avatar");
    } catch (e) {
      return null;
    }
  },
  /**
      * 清除用户信息
      */
  clearUser: function clearUser() {
    try {
      uni.clearStorageSync("user:id");
      uni.clearStorageSync("user:name");
      uni.clearStorageSync("user:login_name");
      uni.clearStorageSync("user:mobile");
      uni.clearStorageSync("user:avatar");
    } catch (e) {
      console.error("清除本地信息失败");
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"AftersveClientApp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"AftersveClientApp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"AftersveClientApp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"AftersveClientApp","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/storage/staffstorage.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {


var _globalfuc = _interopRequireDefault(__webpack_require__(/*! @/common/function/globalfuc.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                  * 当前员工
                                                                                                                                                                                  */ // 全局方法
module.exports = { /** 设置当前员工id
                    * @param {Object} id
                    */setId: function setId(id) {
    uni.setStorageSync("staff:id", id);
  },
  /**
      * 获取当前员工id
      */
  getId: function getId() {
    try {
      return uni.getStorageSync("staff:id");
    } catch (e) {
      return 0;
    }
  },
  /**
      * 清除staff
      */
  clear: function clear() {
    try {
      _globalfuc.default.clearSingle("staff:id", "staff"); // 用户名
    } catch (e) {
      console.error("清除staff=>", e);
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/merchant.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {























var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));
var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 与组织、门店、商户有关请求
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       * 组织/门店
                                                                                                                                                                                       * @property {Function} getListAll_merchant 获取所有组织（不包含门店）
                                                                                                                                                                                       * @property {Function} getListPage 获取组织/门店列表
                                                                                                                                                                                       * @property {Function} getCurrentList 获取当前组织列表
                                                                                                                                                                                       * @property {Function} getSvcInfo 获取服务商信息
                                                                                                                                                                                       * @property {Function} getCurrentInfo 获取当前的组织信息
                                                                                                                                                                                       * @property {Function} getCurrentBranchInfo 获取当前用户的门店信息
                                                                                                                                                                                       * @property {Function} getInfo 根据id获取组织/门店的基础信息
                                                                                                                                                                                       * @property {Function} getDetail 根据id获取组织/门店的详细信息（包括TopName）
                                                                                                                                                                                       * @property {Function} addInfo 创建组织/门店
                                                                                                                                                                                       * @property {Function} updateInfo 更新组织/门店信息
                                                                                                                                                                                       * @property {Function} deleteInfo 根据id删除组织
                                                                                                                                                                                       * @property {Function} applyInfo 申请加入组织/门店
                                                                                                                                                                                       * @property {Function} trialInfo 成为体验用户
                                                                                                                                                                                       * @property {Function} switchInfo 切换主企业
                                                                                                                                                                                       * 组织架构
                                                                                                                                                                                       * @property {Function} getTrees_fullOrg 获取完整的树形图组织架构
                                                                                                                                                                                       * @property {Function} getTrees_org 获取组织架构
                                                                                                                                                                                       * @property {Function} getAreaOrg 获取区域组织架构
                                                                                                                                                                                       */ // 公共的方法
// 修改数据
// 服务端地址
// 登录
// 组织
module.exports = { // ========================================= 组织/门店 ======================================================
  /** 获取所有的组织(不包含门店)
   * @param {Object} obj
   * @property {Function} before 请求前执行方法
   * @property {Function} success 请求成功后执行方法
   * @property {Function} fail 请求失败后执行方法
   * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
   */getListAll_merchant: function getListAll_merchant(obj) {// 参数
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求方法
    if (typeof before === "function") {before();}uni.request({ url: _website.default.website + '/api/SvcMerchant/Get?parentId=0', header: { Authorization: 'Bearer ' + _loginstorage.default.getToken() }, method: 'GET', success: function success(result) {if (result.statusCode == 200) {if (result.data.ResultCode == "0") {if (typeof _success === "function") {_success(result.data.Data, result.data.ResultMsg);}return;}
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取组织/门店（分页）
      * @param {Object} obj
      * @property {Object} data  请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  getListPage: function getListPage(obj) {
    // 参数
    var data; // 请求数据
    var before;
    var _success2;
    var _fail2;
    var _complete2;
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求
    if (data.orgId == 0 || data.orgId == '0') {
      delete data.orgId;
    }
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 获取当前的组织列表
      * @param {Object} obj
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  getCurrentList: function getCurrentList(obj) {
    // 参数
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 完成回调函数
    if (Boolean(obj)) {
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/GetUserMchs',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 获取服务商信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 请求回调函数（不论成功失败都执行）
      */
  getSvcInfo: function getSvcInfo(obj) {
    // 请求参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 请求回调函数
    if (Boolean(obj)) {
      data = obj.data;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcCategory/GetSvcMch?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === '0') {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 获取当前的组织信息
      * @param {Object} obj
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  getCurrentInfo: function getCurrentInfo(obj) {
    // 获取参数
    var before; // 请求前执行方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败执行方法
    var _complete5; // 请求回调函数
    if (Boolean(obj)) {
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/GetDefMch',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  /** 获取当前门店信息
     * @param {Object} obj
     * @property {Function} before 请求前执行方法
     * @property {Function} success 请求成功执行方法
     * @property {Function} fail 请求失败执行方法
     * @property {Function} complete 请求回调函数（不论成功失败都执行）
      */
  getCurrentBranchInfo: function getCurrentBranchInfo(obj) {
    // 参数
    var before; // 请求前方法
    var _success6; // 请求成功执行方法
    var _fail6; // 请求失败执行方法
    var _complete6; // 回到函数
    if (Boolean(obj)) {
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete6 = obj.complete;
    }
    var id = _organstorage.default.getBranchId();
    // 请求
    if (typeof before == "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/Merchant/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail6 === "function") {
          _fail6(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  },
  /** 根据id获取组织/门店基础信息
      * @param {Object} obj
      * @property {Object} id 组织Id 
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 组织id
    var before; // 请求前执行方法
    var _success7; // 请求成功后执行方法
    var _fail7; // 请求失败后执行方法
    var _complete7; // 回调函数（无论成功、失败都执行）
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success7 = obj.success;
      _fail7 = obj.fail;
      _complete7 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success7 === "function") {
              _success7(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail7 === "function") {
          _fail7(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail7 === "function") {
          _fail7(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete7 === "function") {
          _complete7();
        }
      } });

  },
  /** 根据id获取组织/门店详细信息
      * @param {Object} obj
      * @property {Object} id 组织Id 
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  getDetail: function getDetail(obj) {
    // 参数
    var id; // 组织id
    var before; // 请求前执行方法
    var _success8; // 请求成功后执行方法
    var _fail8; // 请求失败后执行方法
    var _complete8; // 回调函数（无论成功、失败都执行）
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success8 = obj.success;
      _fail8 = obj.fail;
      _complete8 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Detail/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success8 === "function") {
              _success8(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail8 === "function") {
          _fail8(result);
        }
      },
      fail: function fail(erros) {
        if (typeof _fail8 === "function") {
          _fail8();
        }
      },
      complete: function complete() {
        if (typeof _complete8 === "function") {
          _complete8();
        }
      } });

  },
  /**创建加入组织/门店
      * @param {Object} obj
      * @property {Object} data  请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  addInfo: function addInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success9; // 请求成功后执行方法
    var _fail9; // 请求失败后执行方法
    var _complete9; // 回调函数（不论成功、失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.data;
      _success9 = obj.success;
      _fail9 = obj.fail;
      _complete9 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Create',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success9 === "function") {
              _success9(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
      },
      fail: function fail(errors) {
        if (typeof _fail9 === "function") {
          _fail9(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete9 === "function") {
          _complete9();
        }
      } });

  },
  /** 编辑组织/门店信息
      * @param {Object} obj
      * @property {Object} data  请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  updateInfo: function updateInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success10; // 请求成功后执行方法
    var _fail10; // 请求失败后执行方法
    var _complete10 = null; // 回调函数（不论成功、失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.data;
      _success10 = obj.success;
      _fail10 = obj.fail;
      _complete10 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success10 === "function") {
              _success10(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
      },
      fail: function fail(errors) {
        if (typeof _fail10 === "function") {
          _fail10(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete10 === "function") {
          _complete10();
        }
      } });

  },
  /** 删除当前组织/门店
      * @param {Object} obj
      * @property {Object} id 组织Id 
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  deleteInfo: function deleteInfo(obj) {
    // 参数
    var id; // 组织id
    var before; // 请求前执行方法
    var _success11; // 请求成功后执行方法
    var _fail11; // 请求失败后执行方法
    var _complete11; // 回调函数（无论成功、失败都执行）
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success11 = obj.success;
      _fail11 = obj.fail;
      _complete11 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success11 === "function") {
              _success11(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail11 === "function") {
          _fail11(result);
        }
      },
      fail: function fail(erros) {
        if (typeof _fail11 === "function") {
          _fail11();
        }
      },
      complete: function complete() {
        if (typeof _complete11 === "function") {
          _complete11();
        }
      } });

  },
  /** 申请加入组织/门店
      * @param {Object} obj
      * @property {Object} data  请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 请求回调函数（不论请求成功/失败都执行）
      */
  applyInfo: function applyInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success12; // 请求成功后执行方法
    var _fail12; // 请求失败后执行方法
    var _complete12; // 请求回调函数（不论请求成功、失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success12 = obj.success;
      _fail12 = obj.fail;
      _complete12 = obj.complete;
    }
    // 请求方法
    uni.showLoading();
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Join',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success12 === "function") {
              _success12(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail12 === "function") {
          _fail12(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail12 === "function") {
          _fail12(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete12 === "function") {
          _complete12();
        }
      } });

  },
  /** 成为体验用户
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求前执行方法
      * 	@property {Function} success  请求成功后执行方法
      * 	@property {Function} fail  请求失败后执行方法
      * 	@property {Function} complete  回调函数（无论成功或失败都执行）
      */
  trialInfo: function trialInfo(obj) {
    // 请求参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success13; // 请求成功执行方法
    var _fail13; // 请求失败执行方法
    var _complete13; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success13 = obj.success;
      _fail13 = obj.fail;
      _complete13 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Trial',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success13 === "function") {
              _success13(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail13 === "function") {
          _fail13(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail13 === "function") {
          _fail13(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete13 === "function") {
          _complete13();
        }
      } });

  },
  /** 切换主企业
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求前执行方法
      * 	@property {Function} success  请求成功后执行方法
      * 	@property {Function} fail  请求失败后执行方法
      * 	@property {Function} complete  回调函数（无论成功或失败都执行）
      */
  switchInfo: function switchInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success14; // 请求成功后执行方法
    var _fail14; // 请求失败后执行方法
    var _complete14; // 回调函数（无论成功或失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success14 = obj.success;
      _fail14 = obj.fail;
      _complete14 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcUser/ChangeMch?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success14 === "function") {
              _success14(result.data.Data, result.data.ResultMsg);
            }
          }
          return;
        }
        if (typeof _fail14 === "function") {
          _fail14(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail14 === "function") {
          _fail14(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete14 === "function") {
          _complete14();
        }
      } });

  },
  // ========================================= 组织架构 ==========================================================
  /** 获取完整的组织架构
   * @param {Object} obj
   * @property {Object} data 请求数据
   * @property {Function} before 请求前执行方法
   * @property {Function} success 请求成功执行方法
   * @property {Function} fail 请求失败执行方法
   * @property {Function} complete 请求回调函数（不论成功失败都执行）
   */
  getTrees_fullOrg: function getTrees_fullOrg(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success15; // 请求成功执行方法
    var _fail15; // 请求失败执行方法
    var _complete15; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success15 = obj.success;
      _fail15 = obj.fail;
      _complete15 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/GetFullOrg?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success15 === "function") {
              var fullData = result.data.Data;
              var childrenData = result.data.Data.Children;
              _success15({ fullData: fullData, childrenData: childrenData }, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail15 === "function") {
          _fail15(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail15 === "function") {
          _fail15(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete15 === "function") {
          _complete15();
        }
      } });

  },
  /** 获取组织架构
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 请求回调函数（不论成功失败都执行）
      */
  getTrees_org: function getTrees_org(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前方法
    var _success16; // 请求成功执行方法
    var _fail16; // 请求失败执行方法
    var _complete16; // 请求回调函数
    if (Boolean(obj)) {
      data = obj.data;
      _success16 = obj.success;
      _fail16 = obj.fail;
      _complete16 = obj.complete;
    }
    // 请求信息
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/GetOrgs?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success16 === "function") {
              _success16(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail16 === "function") {
          _fail16(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail16 === "function") {
          _fail16(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete16 === "function") {
          _complete16();
        }
      } });

  },
  /** 获取区域组织架构
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 请求回调函数（不论成功失败都执行）
      */
  getAreaOrg: function getAreaOrg(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success17; // 请求成功执行方法
    var _fail17; // 请求失败执行方法
    var _complete17; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success17 = obj.success;
      _fail17 = obj.fail;
      _complete17 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/LoadOrg?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success17 === "function") {
              var fullData = result.data.Data;
              var childrenData = result.data.Data[0].Children;
              _success17({ fullData: fullData, childrenData: childrenData }, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail17 === "function") {
          _fail17(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail17 === "function") {
          _fail17(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete17 === "function") {
          _complete17();
        }
      } });

  }
  // ========================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!*********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/merchant.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";





var _lang = _interopRequireDefault(__webpack_require__(/*! @/common/variable/lang.js */ 23));
var _zhCn = _interopRequireDefault(__webpack_require__(/*! ../../utils/lang/zh-Cn.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                        * 组织、门店、部门的公用方法
                                                                                                                                                                        * @author 陆彦捷
                                                                                                                                                                        *@property {function} getManagesName 返回负责人名称数组 
                                                                                                                                                                        */ // 语言
// 中文
var mylang; // 根据配置文件选择语言
switch (_lang.default.locale) {case 'zh-CN':mylang = _zhCn.default;break;default:
    mylang = _zhCn.default;
    break;}


module.exports = {
  /**返回负责人名称数组
                    * @param {Arrary} stafflist 员工信息数组
                    * @param {Arrary} managerIds 负责人Id数组
                    * @return {Array} 负责人名称数组
                    */
  getManagesName: function getManagesName(stafflist, managerIds) {
    var tempNames = [];
    if (!Boolean(stafflist) || !Boolean(managerIds)) {return tempNames;};
    if (stafflist.length === 0 || managerIds.length == 0) {return tempNames;};
    managerIds.forEach(function (id) {
      var temp = stafflist.find(function (item) {
        return id == item.StaffId;
      });
      if (Boolean(temp.Name)) {
        tempNames.push(temp.Name);
      }
    });
    return tempNames;
  },
  /**返回商户类型
      * @param {Array} types 商户类型（目前传值0,1,2）
      * @return {Array} 商户类型数组
      */
  getTypesName: function getTypesName(types) {
    var array = [];
    var a = types.includes(0);
    var b = types.includes(1);
    var c = types.includes(2);
    if (types.includes(0)) {
      array.push(mylang.merchant.merchant.typeCus);
    }
    if (types.includes(1)) {
      array.push(mylang.merchant.merchant.typeSup);
    }
    if (types.includes(2)) {
      array.push(mylang.merchant.merchant.typeSvc);
    }
    return array;
  } };

/***/ }),

/***/ 23:
/*!*****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/variable/lang.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 使用语言
 */
module.exports = {
  locale: 'zh-CN' // 使用语言
};

/***/ }),

/***/ 24:
/*!*************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/utils/lang/zh-Cn.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var _merchant, _staff;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /**
                                                                                                                                                                                                                                  * 语言包 - 中文
                                                                                                                                                                                                                                  */
module.exports =
{
  basic: {
    currentMessage: '当前',
    contactTitle: '协作沟通',
    searchSuccessMessage: '查询成功！',
    searchaFailMessage: '没有查询到',
    addSuccessMessage: '添加成功！',
    addFailMessage: '添加失败！',
    editSuccessMessage: '更新成功！',
    editFailMessage: '更新失败！',
    deleteTitle: '删除',
    deleteContent: '是否删除当前数据？',
    deleteSuccessMessage: '删除成功！',
    deleteFailMessage: '删除失败！',
    requestSuccessMessage: '提交成功！',
    requestFailMessage: '数据连接失败！',
    requestLoadingMessage: '数据请求中……',
    requestFileUpload: '文件上传中……',
    requestLongLoadingMessage: '首次加载，可能需要一些时间，请耐心等待。',
    agreeTitle: '同意',
    agreeContent: '是否同意申请？',
    disagreeTitle: '拒绝',
    disagreeContent: '是否拒绝申请?',
    noMessage: '当前信息不存在！',
    branch: '门店',
    supplier: '供应商',
    contact: '联系人',
    contactNumber: '联系人电话',
    category: '设备分类',
    modal_save_title: '保存',
    modal_save_content: '是否保存当前信息？',
    modal_submit_title: '提交',
    modal_submit_content: '是否提交当前信息？',
    modal_delete_title: '删除',
    modal_delete_content: '是否删除当前信息?',
    button_add: '添加',
    button_edit: '编辑',
    button_save: '保存',
    button_delete: '删除',
    btn_agree: '同意',
    btn_disagree: '拒绝',
    btn_down: '下载',
    btn_videoSelect: '选择视频',
    btn_fileSelect: '选择文件' },

  login: {
    loginLoadingTitle: '登录中……',
    changePassword: '修改密码',
    passwordTitle: '修改密码',
    resetPassword: '重置密码',
    forgetPassword: '忘记密码',
    msg_success: '密码修改成功！',
    mobilePlaceholder: '请输入手机号',
    smsCode: '验证码',
    smsCodePlaceholder: '请输入验证码',
    passwordPlaceholder: '请输入密码',
    oldPasswordPlaceholder: '请输入旧密码',
    newPasswordPlaceholder: '请输入新密码',
    reNewPasswordPlaceholder: '请再次输入新密码',
    modal_exit_title: '退出',
    modal_exit_content: '确定退出当前用户？' },

  merchant: (_merchant = {
    name: '组织',
    nameMy: '我的组织',
    nameBasic: '组织信息',
    nameManage: '组织管理',
    nameTop: '组织',
    nameBranch: '门店',
    nameAll: '组织/门店',
    nameAllInputplaceholder: '请输入组织/门店的名称或代码',
    nameArch: '组织架构',
    joinName: '加入组织/门店',
    switchName: '切换组织',
    indexListName: '我的组织',
    isBrancText: '是否门店',
    nameOrgan: '部门',
    area: '所在地区',
    areaTitle: '地区',
    areaPlaceholder: '请选择地区',
    address: '详细地址',
    addressPlaceholder: '请输入详细地址',
    linkTel: '联系方式',
    msg: '描述',
    msgPlaceholder: '请输入详细描述信息',
    postCode: '邮编',
    postCodePlaceholder: '请输入邮编',
    linkMan: '联系人',
    linkManPlaceholder: '请输入联系人姓名' }, _defineProperty(_merchant, "linkTel",
  '联系人电话'), _defineProperty(_merchant, "linkTelPlaceholder",
  '请输入联系人电话'), _defineProperty(_merchant, "merchantSelect",
  '商户选择'), _defineProperty(_merchant, "merchant",
  {
    merchantcreate: '创建组织',
    switchName: '切换',
    switchManage: '管理',
    switchCurrent: '当前组织',
    branches: '所含门店',
    branchesModalTiltle: '跳转门店',
    branchesModalContent: '将跳转至门店，是否保存当前信息？',
    mchNo: '组织代码',
    mchNoPlaceholder: '请输入组织代码',
    name: '组织名称',
    namePlaceholder: '请输入组织名称',
    industry: '所属行业',
    industryTitle: '行业',
    industryPlaceholder: '请选择行业',
    types: '商户类型',
    typeCus: '客户', // 客户类型-客户
    typeSup: '服务商',
    typeSvc: '供应商',
    legalPerson: '法人',
    legalPersonPlaceholder: '请输入法人姓名',
    bankName: '开户行',
    bankNamePlaceholder: '请输入开户行',
    bankAccount: '开户账号',
    bankAccountPlaceholder: '请输入开户账号' }), _defineProperty(_merchant, "branch",

  {
    branchSelectPlaceholder: '请输入门店编码或选择门店',
    branchcreate: '创建门店',
    searchPlaceholder: '请输入门店名称或代码',
    branchIndexListName: '当前',
    topMch: '所属组织',
    topMchPlaceholder: '请选择所属组织',
    mchNo: '门店代码',
    mchNoPlaceholder: '请输入门店代码',
    name: '门店名称',
    namePlaceholder: '请输入门店名称',
    org: '所属部门',
    orgPlaceholder: '请选择部门',
    orgTitle: '部门',
    status: '状态',
    managers: '负责人',
    managersPlaceholder: '请选择负责人' }), _defineProperty(_merchant, "organ",

  {
    name: '部门',
    nameBasic: '部门信息',
    nameAdd: '添加部门',
    nameEdit: '编辑部门',
    orgNo: '编码',
    orgNoPlaceholder: '请输入部门编码',
    orgName: '名称',
    orgNamePlaceholder: '请输入部门名称',
    phone: '电话',
    phonePlaceholder: '请输入部门联系电话',
    postCode: '邮编',
    postCodePlaceholder: '请输入邮编',
    address: '地址',
    addressPlaceholder: '请输入地址',
    manages: '主管',
    managesPlaceholder: '请选择主管',
    parentId: '上级部门',
    parentIdPlaceholder: '请选择上级部门',
    sort: '排序',
    sortPlaceholder: '请输入排序值' }), _defineProperty(_merchant, "arch",

  {
    searchPlaceholder: '请输入组织/门店/员工名称' }), _merchant),


  organ: {
    nameBasic: '部门信息',
    organTitle: '部门' },

  user: {
    nameBasic: '个人信息',
    loginName: '用户名',
    loginNamePlaceholder: '请输入用户名',
    name: '姓名',
    namePlaceholder: '请输入姓名',
    wxName: '微信名',
    loginPwd: '密码',
    loginPwdTo: '修改密码',
    mobile: '手机号',
    mobilePlaceholder: '请输入手机号',
    email: '邮箱',
    emailPlaceholder: '请输入邮箱号',
    createdAt: '创建日期' },

  staff: (_staff = {
    searchkeyPlaceholder: '请输入员工名称或编号',
    name: '员工',
    manageName: ' 员工列表',
    nameSelect: '员工选择',
    detailName: '员工信息',
    mydetail: '员工个人信息',
    applylist: '成员申请审核',
    apply: {
      status: '状态',
      mobile: '联系电话' },

    invitionName: '邀请成员',
    invition: {
      mobile: '手机号',
      mobilePlaceholder: '请输入受邀用户的手机号',
      msg: '邀请说明',
      msgPlaceholder: '请输入邀请说明',
      btn_submit: '邀请' },

    staffNo: '员工编号' }, _defineProperty(_staff, "name",
  '姓名'), _defineProperty(_staff, "namePlaceholder",
  '请输入员工姓名'), _defineProperty(_staff, "mobile",
  '绑定手机号'), _defineProperty(_staff, "mobilePlaceholder",
  '请输入绑定手机号'), _defineProperty(_staff, "phone",
  '联系电话'), _defineProperty(_staff, "phonePlaceholder",
  '请输入联系电话'), _defineProperty(_staff, "email",
  '邮箱'), _defineProperty(_staff, "emailPlaceholder",
  '请输入邮箱地址'), _defineProperty(_staff, "isJob",
  '是否在职'), _defineProperty(_staff, "entryAt",
  '入职时间'), _defineProperty(_staff, "quitAt",
  '离职时间'), _defineProperty(_staff, "createdAt",
  '创建时间'), _defineProperty(_staff, "updatedAt",
  '更新时间'), _staff),

  mchCustomer: {
    name: '客户',
    nameMange: '客户列表',
    nameBasic: '客户信息',
    searchKeyPlaceholder: '请输入客户名称或编码',
    detail: {
      name: '客户名称',
      namePlaceholder: '请输入客户名称',
      custNo: '客户编码',
      custNoPlaceholder: '请输入客户编码',
      custMch: '商户',
      custMchPlaceholder: '请选择商户',
      createAt: '创建时间',
      updateAt: '更新时间' } },


  notice: {
    name: '通知' },


  product: {
    productSummary: '产品目录',

    brandMange: '品牌列表',
    brandName: '品牌',
    brandPlaceholder: '请选择品牌',
    brandTiltle: '品牌',
    brand: {
      nameBasic: '品牌信息',
      name: '名称',
      namePlaceholder: '请输入名称',
      sort: '排序',
      sortPlaceholder: '请输入排序' },

    categoryManage: '设备分类列表',
    categoryPlaceholder: '请选择设备分类',
    categoryTitle: '设备分类',
    category: {},


    modelManage: '型号列表',
    modelPlaceholder: '请选择型号',
    modelTitle: '型号',
    model: {
      nameBasic: '型号信息',
      searchPlaceholder: '请输入型号',
      name: '名称',
      namePlaceholder: '请输入名称' },

    productManage: '产品列表',
    productTitle: '产品',
    product: {
      nameBasic: '产品信息',
      productNo: '产品编码',
      productNoPlaceholder: '请输入产品编码',
      productName: '产品名称',
      productNamePlaceholder: '请输入产品名称',
      category: '产品分类',
      categoryPlaceholder: '请选择产品分类',
      brand: '品牌',
      brandPlaceholder: '请选择品牌',
      model: '型号',
      modelPlaceholder: '请选择型号',
      msg: '备注',
      msgPlaceholder: '请输入备注' },

    deviceManage: '设备列表',
    device: {
      nameBasic: '设备信息',
      deviceScan: '扫一扫设备SN',
      searchKeyPlaceholder: '请输入设备名称或SN码',
      deviceSn: 'SN码',
      deviceSnPlaceholder: '请输入SN码',
      name: '名称',
      namePlaceholder: '请输入设备名称',
      category: '设备分类',
      categoryPlaceholder: '请选择设备分类',
      brand: '品牌',
      brandPlaceholder: '请选择品牌',
      model: '型号',
      modelPlaceholder: '请选择型号',
      mgs: '设备描述',
      mgsPlacehodler: '请输入设备详细信息',
      deliveryTime: '配送日期',
      deliverTimePlaceholder: '请选择配送日期',
      guarantee: '保修周期/月',
      guarantessPlaceholder: '请输入保修周期',
      repairStart: '保修开始日期',
      repairStartPlaceholder: '请选择保修开始日期',
      repairEnd: '请选择保修结束日期',
      repairEndPlaceholder: '请选择保修结束日期',
      mchId: '所属门店',
      mchidPlaceholder: '请选择所属门店',
      address: '门店地址',
      addressPlaceholder: '请输入门店地址',
      supplier: '供应商',
      supplierPlaceholder: '请选择供应商' },




    problemMange: '常见问题列表',
    problem: {} },



  order: {
    repairName: '报障',
    repairSnName: 'SN码报障',
    repairSnPlaceholder: '请输入报障SN码',
    repairCateName: '分类报障',
    device: {
      title: '设备报修' },

    repair: {
      nameBasic: '报障详情',
      orderType: '报障类型',
      snOrder: 'Sn码报障',
      cateOrder: '分类报障',
      deviceBasic: '设备信息',
      deviceSn: '设备SN',
      deviceSnPlaceholder: '请输入设备Sn',
      name: '名称',
      namePlaceholder: '请输入设备名称',
      category: '设备分类',
      categoryPlaceholder: '请输入设备分类',
      brand: '品牌',
      brandTitle: '品牌',
      brandPlaceholder: '请选择品牌',
      model: '型号',
      modelTitle: '型号',
      modelPlaceholder: '请选择型号',
      mch: '所属门店',
      address: '设备地址',
      addressPlaceholder: '请输入设备地址',
      supName: '服务商',
      supLinkTel: '联系方式',
      svcName: '服务商',
      svcLinkTel: '联系方式',
      linkMan: '联系人',
      orderMsg: '故障描述',
      orderMsgPlaceholder: '请说明设备的故障描述及服务需求',
      orderProblem: '常见故障',
      imgs: '相关图片',
      videos: '相关视频',
      files: '相关文件',
      addUserName: '姓名',
      addUserNamePlaceholder: '请输入姓名',
      addUserTel: '联系电话',
      addUserTelPlaceholder: '请输入联系电话',
      status: '状态',
      createAt: '报障时间',
      noSupTitle: '未找到服务商',
      noSupContent: '未找到服务商，是否继续提交当前数据？' },

    name: '工单',
    detailName: '工单跟踪',
    logdetailName: '工单流程',
    order: {
      btn_submit: '提交工单',
      btn_cancel: '取消工单',
      btn_valid: '验收',
      btn_rate: '评价',
      btn_repair: '再次报障',
      btn_dispose: '受理',
      btn_assign: '派单',
      btn_transfer: '工单转移',
      btn_canService: '确认工单',
      btn_canVaildation: '提交验收',
      btn_suspend: '结束工单' },

    customerOrderName: '报障工单',
    customerValidataonrName: '验收工单',
    customerRateOrderName: '评价',
    customer: {
      isPass: '验收通过',
      grade: '服务评分',
      msgPlaceholder: '本次服务是否满意,写下您的宝贵建议!' },

    serviceOrderName: '受理工单',
    serviceOrderDetailName: '受理工单跟踪',
    serviceOrderAcceptName: '受理工单',
    serviceOrderAssignName: '派单',
    serviceOrderProcessingName: '确认工单',
    serviceOrderSubmit: '申请验收',
    serviceOrderSubmitButton: '申请验收',
    serviceOrderSuspend: '结束工单',
    service: {
      deviceSn: 'SN码',
      deviceSnPlaceholder: '请输入设备SN码',
      svcMode: '服务方式',
      svcModePlaceholder: '请选择服务方式',
      isAccept: '是否受理',
      isCharge: '是否收费',
      isTrans: '是否转交供应商',
      svc: '供应商',
      svcPlaceholder: '请选择供应商',
      staff: '技术人员',
      staffPlaceholder: '请选择技术人员',
      mobile: '联系电话',
      mobilePlaceholder: '请输入技术人员联系电话',
      msg: '备注',
      msgPlaceholder: '请输入备注信息',
      submitMsg: '处理内容',
      submitMsgPlaceholder: '请输入工单处理内容',
      suspendMsg: '结束原因',
      suspendMsgPlaceholder: '请输入结束工单原因' },

    noToastTitle: '没有找到工单！' } };

/***/ }),

/***/ 25:
/*!*******************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/repair.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {







var _lang = _interopRequireDefault(__webpack_require__(/*! @/common/variable/lang.js */ 23));
var _zhCn = _interopRequireDefault(__webpack_require__(/*! ../../utils/lang/zh-Cn.js */ 24));











var _device = _interopRequireDefault(__webpack_require__(/*! @/common/request/device.js */ 26));
var _repairorder = _interopRequireDefault(__webpack_require__(/*! @/common/request/repairorder.js */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                     * 报障工单公共事件
                                                                                                                                                                                     * @author 陆彦捷
                                                                                                                                                                                     * @description 和报障有关的公共事件
                                                                                                                                                                                     * @property {Functin} toSearch	跳转到SN工单搜索页 
                                                                                                                                                                                     * @property {Function} snScan	SN扫码报障
                                                                                                                                                                                     * @property {Function} toType 跳转到分类报障页面  
                                                                                                                                                                                     */ // 语言
// 中文
var mylang; // 根据配置文件选择语言
switch (_lang.default.locale) {case 'zh-CN':mylang = _zhCn.default;break;default:mylang = _zhCn.default;break;} // 工单请求
var _self = module.exports = { /** 跳转到SN工单搜索页
                                * @param {Object} obj
                                */toSearch: function toSearch(obj) {// 跳转到搜索页
    uni.navigateTo({ url: '/pages_repair/search?searchKey=' + obj.value });}, /** SN扫码报障
                                                                               * @param {Object} e
                                                                               */snScan: function snScan(e) {uni.scanCode({ success: function success(re) {
        _self.repairNavigateTo(re.result);
      },
      fail: function fail(errors) {
        // 扫码失败，跳转到搜索页
        uni.showModal({
          title: '扫码失败',
          content: '是否跳转设备报修页面？',
          success: function success(result) {
            if (result.confirm) {
              uni.navigateTo({
                url: '/pages_repair/search?' });

            }
          } });


      } });

  },
  /** 根据设备SN进行页面跳转
      * @param {Object} DeviceSn 设备设备SN码
      */
  repairNavigateTo: function repairNavigateTo(DeviceSn) {
    var data = { sn: DeviceSn };
    _repairorder.default.getInfoByData({
      data: data,
      success: function success(data1) {
        if (Boolean(data1)) {
          // 存在工单则跳转工单跟踪（报障页）
          uni.navigateTo({
            url: '/pages_repair-order/customer/detail?OrderId=' + data1.OrderId });

        } else {
          // 查询设备
          _device.default.getInfoByData({
            data: data,
            success: function success(data2) {
              if (Boolean(data2)) {
                // 跳转到SN码报障页面
                uni.navigateTo({
                  url: '/pages_repair/repairsn?DeviceSn=' + DeviceSn });

              } else {
                uni.showModal({
                  title: 'SN码不存在',
                  content: '是否跳转设备报修页面？',
                  success: function success(result) {
                    if (result.confirm) {
                      uni.navigateTo({
                        url: '/pages_repair/search?searchKey=' + DeviceSn });

                    }
                  } });

              }
            },
            fail: function fail() {
              uni.showToast({
                title: mylang.basic.requestFailMessage,
                icon: 'none' });

            } });

        }
      },
      fail: function fail() {
        console.log("失败");
        uni.showToast({
          title: mylang.basic.requestFailMessage,
          icon: 'none' });

      } });

  },
  /** 跳转到分类报障页面
      * @param {Object} e
      */
  toType: function toType(e) {
    uni.navigateTo({
      url: '/pages_repair/repaircate' });

  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 26:
/*!******************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/device.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {








var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 与设备有关请求
                                                                                                                                                                                       * @property {Function} getListPage 分页请求设备列表信息
                                                                                                                                                                                       * @property {Function} getCustList 分页获取客户设备信息
                                                                                                                                                                                       * @property {Function} getInfo 根据设备Id,获取设备信息
                                                                                                                                                                                       * @event {Function()} getInfoImgs 根据id获取设备的图片
                                                                                                                                                                                       * @property {Function} getInfoByData 根据SN码，获取设备信息
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       */ // 路径
// 公共方法
// 登录
// 组织、商户、门店
module.exports = { /** 分页请求设备列表信息
                    * @param {Object} obj
                    * @property {Object} data 请求数据
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 请求成功后执行方
                    * @property {Function} fail 请求失败后执行方法
                    * @property {Function} complete 回调函数（无论请求成功或失败都执行）
                    */getListPage: function getListPage(obj) {// 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {data = obj.data;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;}
    // 请求信息
    if (data.categoryId === 0 || !Boolean(data.categoryId)) {
      delete data.categoryId;
    }
    if (data.vueId === 0 || !Boolean(data.vueId)) {
      delete data.vueId;
    }
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcDevice/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /**
      * 分页获取客户设备信息
      * @param {Object} obj 
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  getCustList: function getCustList(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }

    // 请求信息
    if (data.categoryId === 0 || !Boolean(data.categoryId)) {
      delete data.categoryId;
    }
    if (data.vueId === 0 || !Boolean(data.vueId)) {
      delete data.vueId;
    }
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchCustom/GetDevices?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /**
      * 根据Id获取设备信息
      * @property {Number} id 设备Id
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 设备id
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcDevice/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3();
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 根据图片id, 获取设备的图片
      * @param {Object} obj
      */
  getInfoImgs: function getInfoImgs(obj) {
    console.log("获取设备图片");
  },
  /** 根据Sn码(参考条件)，获取设备信息
      * @param {Object} obj
      * @property {Object} data 返回数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  getInfoByData: function getInfoByData(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    var param = _publicfunc.default.urlEncode(data);
    uni.request({
      url: _website.default.website + '/api/SvcDevice/Device?' + param,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(_fail4);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  }
  // =======================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 27:
/*!***********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/repairorder.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {































var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 与工单有关请求
                                                                                                                                                                                       * @description 按照查询工单信息、报修、报障工单方法、受理工单方法分类
                                                                                                                                                                                       * 报障
                                                                                                                                                                                       * @property {Function} getInfo  根据工单id获取当前工单的信息
                                                                                                                                                                                       * @property {Function} getInfoByData 根据SN码查询有效工单	
                                                                                                                                                                                       * @property {Function} saveInfo 保存当前工单
                                                                                                                                                                                       * @property {Function} repairSubmit_request 提交当前工单
                                                                                                                                                                                       * @property {Function} updateInfo 更新当前工单信息
                                                                                                                                                                                       *  报障工单
                                                                                                                                                                                       * @property {Function} getCustomerList  获取报障工单
                                                                                                                                                                                       * @property {Function} getCustomerListTop1  获取就近的报障工单
                                                                                                                                                                                       * @property {Function} cancelInfo  : 根据工单id取消工单
                                                                                                                                                                                       * @property {Function} recallInfo : 根据工单id撤回工单
                                                                                                                                                                                       * @property {Function} validatiaonInfo ： 验收通过
                                                                                                                                                                                       * @property {Function} rateInfo 根据工单id ,客户评价工单
                                                                                                                                                                                       *  
                                                                                                                                                                                       *  受理工单
                                                                                                                                                                                       * @property {Function} getSeviceList  获取受理工单列表
                                                                                                                                                                                       * @property {Function} getSeviceListTop1  获取就近的受理工单
                                                                                                                                                                                       *  @property {Function} acceptRepairInfo : 受理工单 - 服务商确认
                                                                                                                                                                                       *  @property {Function} acceptSvcInfo ： 受理工单 - 供应商确认
                                                                                                                                                                                       *	@property {Function} assignInfo ： 受理工单-派单（维修厂商）
                                                                                                                                                                                       *	@property {Function} confirmInfo ： 受理工单-服务商确认服务信息
                                                                                                                                                                                       *	@property {Function} svcAssignInfo ： 受理工单-服务商派工
                                                                                                                                                                                       *  @property {Function} beforeValidationInfo ： （服务商） 申请工单验收
                                                                                                                                                                                       *  @property {Function} newOrderInfo ： （服务商）转移工单
                                                                                                                                                                                       *  @property {Function} finishInfo : （平台/服务商）结束工单
                                                                                                                                                                                       * 其他
                                                                                                                                                                                       * @property {Function} getImgList  根据工单id获取工单图片
                                                                                                                                                                                       * @property {Function} getLogList  根据工单id获取工单Log
                                                                                                                                                                                       */ // 网址
// 公共方法
// 登录的本地缓存
// 组织\商户、门店
module.exports = { // ========================================================== 报障 =================================================================
  /** 根据工单id获取工单信息
   * @param {Object} obj 
   * @property {Number} id 工单id 
   * @property {Function} before 请求方法执行前函数
   * @property {Function} success 请求调用成功时执行函数
   * @property {Function} fail 请求调用失败时执行函数
   * @property {Function} complete 请求的回调函数
   */getInfo: function getInfo(obj) {// 参数
    var id; // 工单id
    var before; // 请求前执行方法
    var _success; // 请求成功后执行方法
    var _fail; // 请求失败时执行方法
    var _complete; // 请求回调函数
    if (Boolean(obj)) {id = obj.id;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求方法
    if (typeof before === "function") {before();} // 请求方法
    uni.request({ url: _website.default.website + '/api/SvcOrder/Detail/' + id, header: { Authorization: 'Bearer ' + _loginstorage.default.getToken() }, method: 'GET', success: function success(result) {if (result.statusCode === 200) {if (result.data.ResultCode === "0") {if (typeof _success === "function") {_success(result.data.Data, result.data.ResultMsg);}return;}}if (typeof _fail === "function") {_fail(result);}}, fail: function fail(errors) {if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 根据Sn码查询有效工单
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      *  @property {Function} success 请求调用成功时执行函数(默认为null)
      *  @property {Function} fail 请求调用失败时执行函数(默认为null)
      *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  getInfoByData: function getInfoByData(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/Proces?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success2 === "function") {
            _success2(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 保存当前工单信息
      * @param {Object} obj
      * 	@property {Boolean} isEdit 工单是否已编辑
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      *  @property {Function} success 请求调用成功时执行函数(默认为null)
      *  @property {Function} fail 请求调用失败时执行函数(默认为null)
      *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  saveInfo: function saveInfo(obj) {
    // 请求参数
    var isEdit; // 是否编辑
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 回调函数
    if (Boolean(obj)) {
      isEdit = Boolean(obj.isEdit);
      data = obj.data;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求事件
    var url = "";
    if (isEdit) {
      url = "/api/SvcOrder/Update";
    } else {
      url = "/api/SvcOrder/Add";
    }
    if (typeof before === "function") {
      before();
    }

    uni.request({
      url: _website.default.website + url,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success3 === "function") {
            _success3(result.data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 提交当前工单信息
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      *  @property {Function} success 请求调用成功时执行函数(默认为null)
      *  @property {Function} fail 请求调用失败时执行函数(默认为null)
      *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  submitInfo: function submitInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 请求完成执行方法
    if (obj) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + "/api/SvcOrder/Submit",
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success4 === "function") {
            _success4(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(_fail4);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 更新当前工单信息
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      *  @property {Function} success 请求调用成功时执行函数(默认为null)
      *  @property {Function} fail 请求调用失败时执行函数(默认为null)
      *  @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  updateInfo: function updateInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败执行方法
    var _complete5; // 请求完成执行方法
    if (obj) {
      data = obj.data;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + "/api/SvcOrder/Update",
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success5 === "function") {
            _success5(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(_fail5);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  // ========================================================== 报障工单 ==============================================================
  /** 获取报障工单
   * @param {Object} obj 
   * @property {Object} data 请求数据 
   * @property {Function} before	请求前方法(默认值null)
   * @property {Function} sucess 执行成功后的方法(默认值null)
   * @property {Function} fail 执行失败后的方法(默认值null)
   * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
   */
  getCustomerList: function getCustomerList(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success6; // 请求成功执行方法
    var _fail6; // 请求失败执行方法
    var _complete6; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete6 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail6 === "function") {
          _fail6(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  },
  /** 获取最近的报障工单
      * @param {Object} obj 
      * @property {Object} data 请求前数据
      * @property {Function} before	请求前方法(默认值null)
      * @property {Function} sucess 执行成功后的方法(默认值null)
      * @property {Function} fail 执行失败后的方法(默认值null)
      * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
      */
  getCustomerListTop1: function getCustomerListTop1(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success7; // 请求成功后执行方法
    var _fail7; // 请求失败后执行方法
    var _complete7; // 回调函数(不论成功、失败都执行费)
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success7 = obj.success;
      _fail7 = obj.fail;
      _complete7 = obj.fail;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success7 === "function") {
              var data = result.data.Data;
              if (Boolean(data)) {
                if (data.length > 0) {
                  _success7(data[0], result.data.ResultMsg);
                  return;
                }
              }
              _success7(null, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail7 === "function") {
          _fail7(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail7 === "function") {
          _fail7(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete7 === "function") {
          _complete7();
        }
      } });

  },
  /** 根据工单id取消工单(POST)
      * @property {Number} id 工单id
      * @property {Function} before	请求前方法(默认值null)
      * @property {Function} sucess 执行成功后的方法(默认值null)
      * @property {Function} fail 执行失败后的方法(默认值null)
      * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
      */
  cancelInfo: function cancelInfo(obj) {
    // 请求参数
    var id; // 工单id
    var before; // 请求前执行方法
    var _success8; // 请求成功执行方法
    var _fail8; // 请求失败执行方法
    var _complete8; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success8 = obj.success;
      _fail8 = obj.fail;
      _complete8 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/CancelOrder?orderId=' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success8 === "function") {
            _success8(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail8 === "function") {
          _fail8(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail8 === "function") {
          _fail8(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete8 === "function") {
          _complete8();
        }
      } });

  },
  /** 根据工单id撤回工单(POST)
      * @param {Object} obj
      * @property {Number} id 工单id
      * @property {Function} before	请求前方法(默认值null)
      * @property {Function} sucess 执行成功后的方法(默认值null)
      * @property {Function} fail 执行失败后的方法(默认值null)
      * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
      */
  recallInfo: function recallInfo(obj) {
    // 请求参数
    var id; // 工单id
    var before; // 请求前执行方法
    var _success9; // 请求成功执行方法
    var _fail9; // 请求失败执行方法
    var _complete9; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success9 = obj.success;
      _fail9 = obj.fail;
      _complete9 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/Withdraw?orderId=' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success9 === "function") {
            _success9(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail9 === "function") {
          _fail9(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail9 === "function") {
          _fail9(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete9 === "function") {
          _complete9();
        }
      } });

  },
  /** 工单验收通过
     * @param {Object} obj
     * @property {Object} data 请求数据id
     * @property {Function} before	请求前方法(默认值null)
     * @property {Function} sucess 执行成功后的方法(默认值null)
     * @property {Function} fail 执行失败后的方法(默认值null)
     * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
      */
  validatiaonInfo: function validatiaonInfo(obj) {
    // 请求参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success10; // 请求成功执行方法
    var _fail10; // 请求失败执行方法
    var _complete10; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success10 = obj.success;
      _fail10 = obj.fail;
      _complete10 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/UserCheck?',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success10 === "function") {
            _success10(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail10 === "function") {
          _fail10(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail10 === "function") {
          _fail10(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete10 === "function") {
          _complete10();
        }
      } });

  },
  /** 根据工单id,客户评价工单
     * @param {Object} obj
     * @property {Object} data 请求数据id
     * @property {Function} before	请求前方法(默认值null)
     * @property {Function} sucess 执行成功后的方法(默认值null)
     * @property {Function} fail 执行失败后的方法(默认值null)
     * @property {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
      */
  rateInfo: function rateInfo(obj) {
    // 请求参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success11; // 请求成功执行方法
    var _fail11; // 请求失败执行方法
    var _complete11; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success11 = obj.success;
      _fail11 = obj.fail;
      _complete11 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/UserScore',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success11 === "function") {
            _success11(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail11 === "function") {
          _fail11(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail11 === "function") {
          _fail11(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete11 === "function") {
          _complete11();
        }
      } });

  },
  // ================================================= 受理工单 ===================================================================
  /** 获取受理工单
   * @param {Object} obj   
   * @property {Object} data 请求前数据 
   * @param {Function} before	请求前方法（默认为null）
   * @param {Function} success 执行成功后的方法(默认为null)
   * @param {Function} fail 执行失败后的方法(默认为null)
   * @param {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）(默认为null)
   */
  getSeviceList: function getSeviceList(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success12; // 请求成功执行方法
    var _fail12; // 请求失败执行方法
    var _complete12; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success12 = obj.success;
      _fail12 = obj.fail;
      _complete12 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success12 === "function") {
              _success12(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail12 === "function") {
          _fail12(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail12 === "function") {
          _fail12(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete12 === "function") {
          _complete12();
        }
      } });

  },
  /** 获取最近的受理工单
      * @param {Object} obj   
      * @param {Object} data 请求参数
      * @param {Function} before	请求前方法(默认值null)
      * @param {Function} success 执行成功后的方法(默认值null)
      * @param {Function} fail 执行失败后的方法(默认值null)
      * @param {Function} complete 调用接口后方法（不论接口调用成功或者失败都执行）
      */
  getSeviceListTop1: function getSeviceListTop1(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前方法
    var _success13; // 请求成功执行方法
    var _fail13; // 请求失败执行方法
    var _complete13; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success13 = obj.success;
      _fail13 = obj.fail;
      _complete13 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success13 === "function") {
              var data = result.data.Data;
              if (Boolean(data)) {
                if (data.length > 0) {
                  _success13(data[0], result.data.ResultMsg);
                  return;
                }
              }
              _success13(null, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail13 === "function") {
          _fail13(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail13 === "function") {
          _fail13(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete13 === "function") {
          _complete13();
        }
      } });

  },
  /** 受理工单 - 确认（服务商商确认）
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function}  before 请求前执行方法 
      * 	@property {Function} success 请求成功后执行方法 
      * 	@property {Function}  fail 请求失败后执行方法 
      * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
      */
  acceptRepairInfo: function acceptRepairInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success14; // 请求成功执行方法
    var _fail14; // 请求失败执行方法
    var _complete14; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success14 = obj.success;
      _fail14 = obj.fail;
      _complete14 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/RepairConfirm',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success14 === "function") {
            _success14(result.data);
          }
          return;
        }
        if (typeof _fail14 === "function") {
          _fail14(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail14 === "function") {
          _fail14(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete14 === "function") {
          _complete14();
        }
      } });

  },
  /** 受理工单 - 确认(供应商确认)
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function}  before 请求前执行方法 
      * 	@property {Function} success 请求成功后执行方法 
      * 	@property {Function}  fail 请求失败后执行方法 
      * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
      */
  acceptSvcInfo: function acceptSvcInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success15; // 请求成功执行方法
    var _fail15; // 请求失败执行方法
    var _complete15; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success15 = obj.success;
      _fail15 = obj.fail;
      _complete15 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/SvcConfirm',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success15 === "function") {
            _success15(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail15 === "function") {
          _fail15(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail15 === "function") {
          _fail15(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete15 === "function") {
          _complete15();
        }
      } });

  },
  /** 受理工单 -派单、确认信息（维修厂商）
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function}  before 请求前执行方法 
      * 	@property {Function} success 请求成功后执行方法 
      * 	@property {Function}  fail 请求失败后执行方法 
      * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
      */
  assignInfo: function assignInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success16; // 请求成功后执行方法
    var _fail16; // 请求失败后执行方法
    var _complete16; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success16 = obj.success;
      _fail16 = obj.fail;
      _complete16 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/RepairAssign',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success16 === "function") {
            _success16(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail16 === "function") {
          _fail16(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail16 === "function") {
          _fail16(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete16 === "function") {
          _complete16();
        }
      } });

  },
  /**  受理工单- 确认服务信息（服务商）
      * @param {Object} obj 
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      * 	@property {Function} success 请求调用成功时执行函数(默认为null)
      * 	@property {Function} fail 请求调用失败时执行函数(默认为null)
      * 	@property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  confirmInfo: function confirmInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success17; // 请求成功执行方法
    var _fail17; // 请求失败时执行方法
    var _complete17; // 请求完成后执行方法
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success17 = obj.success;
      _fail17 = obj.fail;
      _complete17 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/SvcConfirm',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success17 === "function") {
            _success17(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail17 === "function") {
          _fail17(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail17 === "function") {
          _fail17(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete17 === "function") {
          _complete17();
        }
      } });

  },
  /** 受理工单 -服务商确认工单
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      * 	@property {Function}  before 请求前执行方法 
      * 	@property {Function} success 请求成功后执行方法 
      * 	@property {Function}  fail 请求失败后执行方法 
      * 	@property {Function} complete 回调函数（不论请求成功或失败都执行） 
      */
  svcAssignInfo: function svcAssignInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success18; // 请求成功后执行方法
    var _fail18; // 请求失败后执行方法
    var _complete18; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success18 = obj.success;
      _fail18 = obj.fail;
      _complete18 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/SvcAssign',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success18 === "function") {
            _success18(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail18 === "function") {
          _fail18(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail18 === "function") {
          _fail18(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete18 === "function") {
          _complete18();
        }
      } });

  },
  /** 服务商 - 申请工单验收
      * @param {object} obj 
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      * 	@property {Function} success 请求调用成功时执行函数(默认为null)
      * 	@property {Function} fail 请求调用失败时执行函数(默认为null)
      * 	@property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  beforeValidationInfo: function beforeValidationInfo(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success19; // 请求成功执行方法
    var _fail19; // 请求失败执行方法
    var _complete19; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success19 = obj.success;
      _fail19 = obj.fail;
      _complete19 = obj.complete;
    }
    // 请求服务商信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/RepairSubmit',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success19 === "function") {
            _success19(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail19 === "function") {
          _fail19(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail19 === "function") {
          _fail19(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete19 === "function") {
          _complete19();
        }
      } });

  },
  /** 服务商 - 转移工单
      * @param  {Object} obj 
      * 	@property {Number} orderId 工单id
      * 	@property {Number} serviceMchId 转移服务商
      * 	@property {Function} beforeF 请求方法执行前函数（默认为null）
      * 	@property {Function} successF 请求调用成功时执行函数(默认为null)
      * 	@property {Function} failF 请求调用失败时执行函数(默认为null)
      * 	@property {Function} completeF 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  newOrderInfo: function newOrderInfo(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success20; // 请求成功执行方法
    var _fail20; // 请求失败执行方法
    var _complete20; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success20 = obj.success;
      _fail20 = obj.fail;
      _complete20 = obj.complete;
    }

    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/NewOrder',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success20 === "function") {
            _success20(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail20 === "function") {
          _fail20(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail20 === "function") {
          _fail20(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete20 === "function") {
          _complete20();
        }
      } });

  },
  /** 受理工单 : 中止（/结束）工单
      * @param  {Object} obj 
      * 	@property {Object} data 请求数据
      * 	@property {Function} before 请求方法执行前函数（默认为null）
      * 	@property {Function} success 请求调用成功时执行函数(默认为null)
      * 	@property {Function} fail 请求调用失败时执行函数(默认为null)
      * 	@property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  finishInfo: function finishInfo(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success21; // 请求完成执行方法
    var _fail21; // 请求失败执行方法
    var _complete21; // 请求回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success21 = obj.success;
      _fail21 = obj.fail;
      _complete21 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrder/SvcFinish',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode === 200) {
          if (typeof _success21 === "function") {
            _success21(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail21 === "function") {
          _fail21(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail21 === "function") {
          _fail21(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete21 === "function") {
          _complete21();
        }
      } });

  },
  // ============================================= 其他 ==========================================================================
  /**根据工单Id获取工单图片
   * @param {Object} obj
   * @property   {Number} id 工单id
   * @property {Function} before 请求方法执行前函数（默认为null）
   * @property {Function} success 请求调用成功时执行函数(默认为null)
   * @property {Function} fail 请求调用失败时执行函数(默认为null)
   * @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
   */
  getImgList: function getImgList(obj) {
    // 请求参数
    var id; // 工单Id
    var before; // 请求前执行方法
    var _success22; // 请求成功时执行方法
    var _fail22; // 请求失败时执行方法
    var _complete22; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success22 = obj.success;
      _fail22 = obj.fail;
      _complete22 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrderImg/List?orderId=' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success22 === "function") {
              _success22(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail22 === "function") {
          _fail22(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail22 === "function") {
          _fail22(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete22 === "function") {
          _complete22();
        }
      } });

  },
  /** 根据工单id获取工单Log
     * @param  {Object} obj 
     * @property  {Number} 工单id
     * @property {Function} before 请求方法执行前函数（默认为null）
     * @property {Function} success 请求调用成功时执行函数(默认为null)
     * @property {Function} fail 请求调用失败时执行函数(默认为null)
     * @property {Function} complete 请求的回调函数（不论方法成功或失败都执行）(默认为null)
      */
  getLogList: function getLogList(obj) {
    // 请求参数
    var id; // 工单Id
    var before; // 请求前执行方法
    var _success23; // 请求成功时执行方法
    var _fail23; // 请求失败时执行方法
    var _complete23; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success23 = obj.success;
      _fail23 = obj.fail;
      _complete23 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrderLog/Get?orderId=' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success23 === "function") {
              _success23(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail23 === "function") {
          _fail23(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail23 === "function") {
          _fail23(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete23 === "function") {
          _complete23();
        }
      } });

  }
  // =============================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 28:
/*!********************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/function/repairOrderFunction.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 工单的公共方法
 * @description tranformStatus : 根据value值获取工单状态
 * 				tranformStatusCNName ： 根据工单状态返回中文的工单名称
 * 				getStatuClass 据工单状态，返回工单状态的背景色
 */
module.exports = {
  /** 根据value值获取工单状态
                    * @param {Number} value 值
                    * @param {String} orderType 工单类型
                    * 	@value customer 报障工单
                    *  @value service 受理工单
                    * @return {String} 工单状态字符串
                    */
  tranformStatus: function tranformStatus(value) {var orderType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "customer";
    var status = ''; // 工单状态
    switch (orderType) {
      case 'customer':
        // 报障工单状态
        switch (value) {
          case -1:status = '';break; // 全部
          // case 0:	status = 'Created';	break;	// 未提交、
          case 1:status = 'Created,Unprocessed';break; // 待受理
          case 2:status = 'SvcConfirmed,RepairConfirm,Processing';break; // 处理中
          case 3:status = 'Uncheck';break; // 待验收
          case 4:status = 'Checked,Finished';break; // 已完成
          case 5:status = 'Cancel';break; // 已取消 -Cancel
          default:break;}

        break;
      case 'service':
        switch (value) {
          case -1:status = '';break; // 全部
          case 0:status = 'Unprocessed';break; // 待受理
          case 1:status = 'SvcConfirmed';break; // 已受理
          case 2:status = 'RepairConfirm,Processing';break; // 处理中
          case 3:status = 'Uncheck';break; // 待验收
          case 4:status = 'Checked,Finished';break; // 已完成
          default:break;}

        break;
      default:break;}

    return status;
  },
  /** 根据工单状态返回中文的工单名称
      * @param {String} status 状态名称
      * 	@value Created 草稿
      *  @value Unprocessed 未处理
      *  @value SvcConfirmed 已受理
      *  @value RepairConfirm 维修已确认
      *  @value Processing 处理中
      *  @value Uncheck 待验收
      *  @value Checked 已验收
      *  @value Finished 已完成
      *  @value Cancel 已取消
      * @param {String} orderType 工单类型
      * 	@value customer 报障工单
      *  @value service 受理工单
      * @return {String} 工单状态的中文字符串
      * @description 暂时与orderType无关，根据
      */
  tranformStatusCNName: function tranformStatusCNName(status) {var orderType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "customer";
    var statusCn = '';
    switch (status) {
      case 'Created':statusCn = '草稿';break; // 草稿 
      case 'Unprocessed':statusCn = '未处理';break; // 未处理 
      case 'SvcConfirmed':statusCn = '已受理';break; // 已受理 
      case 'RepairConfirm':statusCn = '维修已确认';break; // 维修已确认 
      case 'Processing':statusCn = '处理中';break; // 处理中 
      case 'Uncheck':statusCn = '待验收';break; // 待验收 
      case 'Checked':statusCn = '已验收';break; // 已验收 
      case 'Finished':statusCn = '已完成';break; // 已完成 
      case 'Cancel':statusCn = '已取消';break; // 已取消 
      default:break;}

    return statusCn;
  },
  /** 根据工单状态，返回工单状态的背景色
      * @param {String} status 状态名称
      * 	@value Created 草稿
      *  @value Unprocessed 未处理
      *  @value SvcConfirmed 已受理
      *  @value RepairConfirm 维修已确认
      *  @value Processing 处理中
      *  @value Uncheck 待验收
      *  @value Checked 已验收
      *  @value Finished 已完成
      *  @value Cancel 已取消
      * @param {String} orderType 工单类型
      * 	@value customer 报障工单
      *  @value service 受理工单
      * @return {String} 工单状态的中文字符串
      * @description 
      */
  getStatuClass: function getStatuClass(status) {var orderType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "customer";
    var bgColor = ''; // 背景色
    switch (orderType) {
      case 'customer':
        // 报障工单
        switch (status) {
          case 'Unprocessed':bgColor = 'bg-red';break;
          case 'Processing':bgColor = 'bg-cyan';break;
          case 'Uncheck':bgColor = 'bg-orange';break;
          case 'Finished':bgColor = 'bg-grey';break;
          case 'Cancel':bgColor = 'bg-grey';break;
          default:bgColor = 'bg-grey';break;}

        break;
      case 'service':
        // 受理工单状态
        switch (status) {
          case 'Unprocessed':bgColor = 'bg-red';break;
          case 'Processing':bgColor = 'bg-cyan';break;
          case 'Uncheck':bgColor = 'bg-orange';break;
          case 'Finished':bgColor = 'bg-grey';break;
          default:bgColor = 'bg-grey';break;}

        break;
      default:bgColor = 'bg-grey';break;}

    return bgColor;
  },
  /** 根据工单状态，返回步骤
      * @param {String} status 状态名称
      * 	@value Created 草稿
      *  @value Unprocessed 未处理
      *  @value SvcConfirmed 已受理
      *  @value RepairConfirm 维修已确认
      *  @value Processing 处理中
      *  @value Uncheck 待验收
      *  @value Checked 已验收
      *  @value Finished 已完成
      *  @value Cancel 已取消
      * @return {Number} 当前工单的步骤 0 ~4
      * @description 
      */
  getSteps: function getSteps(status) {
    var steps = 0; // 当前步骤
    switch (status) {
      case 'Created':steps = 0;break;
      case 'Unprocessed':steps = 0;break;
      case 'SvcConfirmed':steps = 1;break;
      case 'RepairConfirm':steps = 2;break;
      case 'Processing':steps = 2;break;
      case 'Uncheck':steps = 3;break;
      case 'Checked':steps = 4;break;
      case 'Finished':steps = 4;break;
      case 'Cancel':steps = 1;break;
      default:steps = 0;break;}

    return steps;
  } };

/***/ }),

/***/ 29:
/*!**************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/grids.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var _lang = _interopRequireDefault(__webpack_require__(/*! @/common/variable/lang.js */ 23));
var _zhCn = _interopRequireDefault(__webpack_require__(/*! ../../utils/lang/zh-Cn.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                        * 目录的宫格索引
                                                                                                                                                                        */ // 语言
// 中文
var mylang; // 根据配置文件选择语言
switch (_lang.default.locale) {case 'zh-CN':mylang = _zhCn.default;
    break;
  default:
    mylang = _zhCn.default;;
    break;}


module.exports = {
  system_list: [{
    title: '成员管理',
    cur: 'applications',
    bgColor: 'bg-blue light', // 背景颜色
    color: 'blue',
    title_show: false,
    showAll: false,
    colNumber: 3, // 显示的列数
    iconsList: [{
      cuIcon: 'group_fill',
      color: 'blue',
      name: mylang.merchant.nameArch,
      url: '/pages_basic/orgation/organtion' },

    {
      cuIcon: 'friendadd',
      color: 'blue',
      name: '新成员申请',
      url: '/pages_basic/staff/staffapplylist?preview=true' },

    {
      cuIcon: 'friendaddfill',
      color: 'blue',
      name: '邀请新成员',
      exec: 'invite' }] },



  {
    title: '基础数据',
    cur: 'basic',
    bgColor: '', // 背景颜色
    color: 'blue',
    title_show: true,
    showAll: false,
    colNumber: 5, // 显示的列数
    iconsList: [{
      cuIcon: 'text',
      color: 'yellow',
      name: '基本信息',
      url: '/pages_basic/orgation/orgationdetail?preview=true' },

    {
      cuIcon: 'peoplelist',
      color: 'blue',
      name: '员工管理',
      url: '/pages_basic/staff/stafflist?preview=true' }] },



  {
    title: mylang.product.productSummary,
    cur: 'goods',
    bgColor: '', // 背景颜色
    color: 'blue',
    title_show: true,
    showAll: false,
    colNumber: 5, // 显示的列数
    iconsList: [{
      cuIcon: 'list',
      color: 'yellow',
      name: mylang.product.categoryManage,
      url: '/pages_basic/product/producttype/home?preview=true' },

    {
      cuIcon: 'goodsnew',
      color: 'blue',
      name: mylang.product.modelManage,
      url: '/pages_basic/product/productmodel/home?preview=true' },

    {
      cuIcon: 'shake',
      color: 'olive',
      name: mylang.product.deviceManage,
      url: '/pages_basic/product/product/home?preview=true' },

    {
      cuIcon: 'questionfill',
      color: 'yellow',
      name: mylang.product.problemMange,
      url: '/pages_basic/product/problem/home?preview=true' }] }],




  // 产品目录的列表
  product_list: [{
    title: mylang.product.productSummary,
    cur: 'goods',
    bgColor: '', // 背景颜色
    color: 'blue',
    title_show: false,
    showAll: false,
    colNumber: 5, // 显示的列数
    iconsList: [{
      // 分类
      cuIcon: 'list',
      color: 'yellow',
      name: mylang.product.categoryManage,
      url: '/pages_basic/product/producttype/home?preview=true' },

    {
      // 模型
      cuIcon: 'goodsnew',
      color: 'blue',
      name: mylang.product.modelManage,
      url: '/pages_basic/product/productmodel/home?preview=true' },

    {
      // 设备
      cuIcon: 'shake',
      color: 'olive',
      name: mylang.product.deviceManage,
      url: '/pages_basic/product/device/home?preview=true' },

    {
      // 问题
      cuIcon: 'questionfill',
      color: 'yellow',
      name: mylang.product.problemMange,
      url: '/pages_basic/product/problem/home?preview=true' }] }]


  //  列表显示项
};

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/compent_params.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 一些组件的参数
 * @property {Object} serviceIcon 图标-服务 
 * @property {Object} extraIcon 图标-意见反馈
 * @property {Object} loadContentText 点击加载数据
 * @property {Object} fab_pattern 悬浮按钮样式
 */
module.exports = {
  /**
                    * 图标-服务
                    */
  serviceIcon: {
    color: '#AEAEAE',
    size: '22',
    type: 'headphones' },

  /**
                           * 图标-意见反馈
                           */
  extraIcon: {
    color: '#AEAEAE',
    size: '22',
    type: 'compose' },

  /**
                        * 点击加载数据
                        */
  loadContentText: {
    contentdown: "点击刷新数据",
    contentrefresh: "正在加载...",
    contentnomore: "没有更多数据了" },

  /**
                                 * 悬浮按钮样式
                                 */
  fab_pattern: {
    color: '#7A7E83', // 文字默认颜色
    selectedColor: '#00BEB7',
    backgroundColor: '#fff',
    buttonColor: '#00BEB7' },
  // 可选配置项样式（悬浮按钮）
  activeColor: '#00BEB7',
  btn_list_confirm: [{
    name: '确定',
    clickName: 'confirm' }],


  btn_list_toEdit: [{
    name: '修改',
    icon: 'cuIcon-edit',
    clickName: 'edit' }],


  /**
                           * 添加状态底部按钮
                           */
  btn_list_add: [{
    name: '保存',
    icon: 'cuIcon-edit',
    clickName: 'edit' }],


  /**
                           * 编辑状态底部按钮
                           */
  btn_list_edit: [{
    name: '保存',
    icon: 'cuIcon-edit',
    clickName: 'edit' },

  {
    name: '删除',
    icon: 'cuIcon-delete',
    clickName: 'delete',
    color: 'red' }],


  btn_list_commit: [{
    name: '提交',
    icon: 'cuIcon-updown',
    clickName: 'submit' }],


  /**
                             * 组织架构按钮-管理人员
                             */
  btn_list_org_admin: [{
    name: '添加部门',
    icon: 'cuIcon-add',
    clickName: 'addorg' },

  {
    name: '添加成员',
    icon: 'cuIcon-add',
    clickName: 'addstaff' },

  {
    name: '查看门店',
    icon: 'cuIcon-attention',
    clickName: 'showbrand' },

  {
    name: '查看成员',
    icon: 'cuIcon-attention',
    clickName: 'showstaff' }],


  /**
                                * 组织架构按钮 - 普通员工
                                */
  btn_list_org: [{
    name: '查看门店',
    icon: 'cuIcon-attention',
    clickName: 'showbrand' },

  {
    name: '查看成员',
    icon: 'cuIcon-attention',
    clickName: 'showstaff' }],

  /**
                                * 工单流程的步骤条-开始到完成
                                */
  steps_row: [{
    title: '开始' },

  {
    title: '已受理' },

  {
    title: '处理中' },

  {
    title: '待验收' },

  {
    title: '完成' }],


  /**
                     * 工单处理的步骤条-开始到完成
                     */
  steps_row_cancel: [{
    title: '开始' },

  {
    title: '取消' }]

  // 取消的步骤条
};

/***/ }),

/***/ 31:
/*!****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/my_list.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _lang = _interopRequireDefault(__webpack_require__(/*! @/common/variable/lang.js */ 23));
var _zhCn = _interopRequireDefault(__webpack_require__(/*! ../../utils/lang/zh-Cn.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 语言
// 中文
var mylang; // 根据配置文件选择语言
switch (_lang.default.locale) {
  case 'zh-CN':
    mylang = _zhCn.default;
    break;
  default:
    mylang = _zhCn.default;;
    break;}

/**
             * 对象参数说明
             * @property {Boolean} hasMerch 
             * 	@value true 当前item在包含当前组织时显示
             *  @value false 当前item在不包含当前组织时显示
             *  @value null 不论是否包含组织，都显示
             * @property {Boolean} isAdmin
             *  @value true 当前item是管理员时显示
             *  @value false 当前item不是管理员时显示
             *  @value null 当前item 无论是否管理员都显示
             */
var mylist = [
[{
  // 加入组织/门店
  title: mylang.merchant.joinName,
  to: '/pages_basic/orgation/orgation_createOrJoin',
  hasMerch: false,
  isAdmin: null },

{
  // 切换组织/门店
  title: mylang.merchant.switchName,
  to: '/pages_basic/orgation/orgation_switch',
  hasMerch: null,
  isAdmin: null },

{
  // 我的组织
  title: mylang.merchant.nameMy,
  to: '/pages_basic/orgation/orgationdetail',
  hasMerch: true,
  isAdmin: null },

{
  // 组织架构
  title: mylang.merchant.nameArch,
  to: '/pages_basic/orgation/organtion',
  hasMerch: true,
  isAdmin: null }],



[{
  // 客户列表
  title: mylang.mchCustomer.nameMange,
  to: '/pages_basic/customer/customerlist',
  hasMerch: true,
  isAdmin: null,
  isCust: false,
  isSup: true,
  isSvc: true }],


[
{
  // 员工列表
  title: mylang.staff.manageName,
  to: '/pages_basic/staff/stafflist',
  hasMerch: true,
  isAdmin: true },

{
  // 员工个人信息
  title: mylang.staff.mydetail,
  to: '/pages_basic/staff/staffdetail',
  hasMerch: true,
  isAdmin: null },


{
  // 成员申请审核列表
  title: mylang.staff.applylist,
  to: '/pages_basic/staff/staffapplylist',
  hasMerch: true,
  isAdmin: true },

{
  // 邀请新成员
  title: mylang.staff.invitionName,
  to: '/pages_basic/staff/staffinvition',
  hasMerch: true,
  isAdmin: null }],



[
{
  // 品牌
  title: mylang.product.brandMange,
  to: '/pages_basic/product/brand/brandlist',
  hasMerch: true,
  isAdmin: null },

{
  // 设备分类
  title: mylang.product.categoryManage,
  to: '/pages_basic/product/producttype/home',
  hasMerch: true,
  isAdmin: null },

{
  // 型号
  title: mylang.product.modelManage,
  to: '/pages_basic/product/productmodel/home',
  hasMerch: true,
  isAdmin: null },

{
  // 产品
  title: mylang.product.productManage,
  to: '/pages_basic/product/product/home',
  hasMerch: true,
  isAdmin: null,
  isCust: false,
  isSup: true,
  isSvc: true },

{
  // 设备
  title: mylang.product.deviceManage,
  to: '/pages_basic/product/device/home',
  hasMerch: true,
  isAdmin: null },

{
  // 常见问题
  title: mylang.product.problemMange,
  to: '/pages_basic/product/problem/home',
  hasMerch: true,
  isAdmin: null }],



[
{
  // 修改密码
  title: mylang.login.changePassword,
  to: '/pages_basic/my/changepassword',
  hasMerch: null,
  isAdmin: null }]];var _default =





mylist;exports.default = _default;

/***/ }),

/***/ 32:
/*!**************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/rules.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 验证规则
 * @property {Array} mobile 手机号验证规则 
 */
module.exports = {
  /**
                    * 手机号验证
                    */
  mobile: [{
    required: true,
    errorMessage: '请输入手机号' },

  {
    pattern: "^[0-9]{11}$",
    errorMessage: '手机号为11位数' },

  {
    pattern: "^1[3|5|6|7|8|9][0-9]{9}$",
    errorMessage: '请输入正确的手机号码' }],


  /**
                                    * 邮箱号验证
                                    */
  email: [{
    required: true,
    errorMessage: '请输入邮箱地址' },

  {
    format: 'email',
    errorMessage: '请输入正确的邮箱地址' }],


  /**
                                    * 商户
                                    */
  custMchId: [{
    minimum: 1,
    errorMessage: '请选择商户' }],

  /**
                               * 门店
                               */
  mchId: [{
    minimum: 1,
    errorMessage: '请选择门店' }],


  /**
                               * 组织
                               */
  topMchId: [{
    minimum: 1,
    errorMessage: '请选择组织' }],

  /**
                               * 请输入门店地址
                               */
  address: [{
    required: true,
    errorMessage: '请输入门店地址' }],

  industryId: [{
    required: true,
    errorMessage: '请选择行业' },

  {
    minimum: 1,
    errorMessage: '请选择行业' }],


  /**
                               * 请选择设备分类
                               */
  categoryId: [{
    required: true,
    errorMessage: '请选择分类' },

  {
    minimum: 1,
    errorMessage: '请选择分类' }],


  /**
                               * 型号
                               */
  modelId: [{
    required: true,
    errorMessage: '请选择型号' },

  {
    minimum: 1,
    errorMessage: '请选择型号' }],


  /**
                               * 供应商
                               */
  supId: [{
    required: true,
    errorMessage: '请选择供应商' },

  {
    minimum: 1,
    errorMessage: '请选择供应商' }],


  /**
                                * 员工
                                */
  staffId: [{
    required: true,
    errorMessage: '请选择员工' },

  {
    minimum: 1,
    errorMessage: '请选择员工' }],


  /**
                               * 排序
                               */
  sort: [{
    required: true,
    errorMessage: '请输入排序' },

  {
    minimum: 0,
    errorMessage: '排序值必须大于0' }] };

/***/ }),

/***/ 33:
/*!***************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/status.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 申请的状态信息
 */
module.exports = {
  joinApplyStatus: [
  {
    label: '申请中',
    value: 'Created' },

  {
    label: '同意',
    value: 'Agreed' },

  {
    label: '拒绝',
    value: 'Refused' }],


  joinApplyStatusO: {
    Created: '申请中',
    Agreed: '同意',
    Refused: '拒绝' } };

/***/ }),

/***/ 34:
/*!*****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/merchant.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var _lang = _interopRequireDefault(__webpack_require__(/*! @/common/variable/lang.js */ 23));
var _zhCn = _interopRequireDefault(__webpack_require__(/*! ../../utils/lang/zh-Cn.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                        * 与组织有
                                                                                                                                                                        */ // 语言
// 中文
var mylang; // 根据配置文件选择语言
switch (_lang.default.locale) {case 'zh-CN':mylang = _zhCn.default;
    break;
  default:
    mylang = _zhCn.default;;
    break;}

module.exports = {
  // 客户类型列表
  merType: [{
    value: 0,
    text: mylang.merchant.merchant.typeCus },

  {
    value: 1,
    text: mylang.merchant.merchant.typeSup },

  {
    value: 2,
    text: mylang.merchant.merchant.typeSvc }] };

/***/ }),

/***/ 35:
/*!****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/problem.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 *  常见问题
 * @author 陆彦捷
 * @date 2021.07.09  问题列表
 */
module.exports = {
  list: [{
    id: 1,
    title: '斑马ZT-210 故障排除检查表',
    desc: '<h1>定义和用法</h1><p>valueOf() 方法可以字符串返回数字。</p>',
    Category: '电子设备>打印机',
    ModelName: 'ZT-210',
    tags: ['打印机', '故障排除'] },

  {
    id: 2,
    title: '电子秤故障排除',
    desc: '<h1>定义和用法</h1><p>valueOf() 方法可以字符串返回数字。</p>',
    Category: '电子设备>电子秤',
    ModelName: '',
    tags: ['故障排除'] },

  {
    id: 3,
    title: '通用问题',
    desc: '<h1>定义和用法</h1><p>valueOf() 方法可以字符串返回数字。</p>',
    Category: '',
    ModelName: '',
    tags: ['通用问题'] }],


  // 当前问题
  current: {
    id: 1,
    title: '斑马ZT-210 故障排除检查表',
    desc: '<h1>下载地址</h1><p><a href="https://www.dcloud.io/hbuilderx.html">https://www.dcloud.io/hbuilderx.html</a></p><p><img src="https://img2020.cnblogs.com/blog/1602649/202012/1602649-20201220161959440-198670061.png" alt="" loading="lazy" /></p><p>&nbsp;说明</p><table border="0"><tbody><tr><td><p>BuilderX标准版和App版的区别</p><p>BuilderX标准版可直接用于web开发、markdown、字处理场景。当用来做App开发时需要安装插件。App开发版预置了App/uni-app开发所需的插件，开箱即用。标准版也可以在插件安装界面安装App开发所需插件，App开发版预集成App开发所需插件。App开发插件体积大的原因主要有2方面：真机运行基座，Android版、iOS版、iOS模拟器版，加起来体积就1百多M。真机运行基座需要把所有模块都内置进去，方便大家开发调试。开发者自己做app打包是不会这么大的，因为可以在manifest里选模块来控制体积。uni-app的编译器，依赖webpack和各种node模块，node_modules就是这么一个生态现状，文件超级多，几万个文件，解压起来很慢。</p></td></tr></tbody></table><p>&nbsp;这里，我下载Windows 标准版。</p><h1>安装</h1><p>下载后，将压缩包复制到适当的位置，找到Hbuilder X（HbuilderX.exe）可执行程序，双击即可启动程序。</p><h1>参考网址</h1><p>https://blog.csdn.net/cnds123/article/details/106873406</p>',
    Category: '电子设备>打印机',
    ModelName: 'ZT-210',
    tags: ['打印机', '故障排除'] },

  // 按型号划分查询的列表
  models_list: [
  {
    "ModelId": 1,
    "MchId": 1,
    "CategoryId": 3,
    Category: '电子设备>打印机',
    Count: 3, // 型号所包含的问题数量
    "Name": "HP1108",
    "Sort": 0 },

  {
    "ModelId": 2,
    "MchId": 1,
    "CategoryId": 3,
    Category: '电子设备>打印机',
    Count: 3, // 型号所包含的问题数量
    "Name": "HP M126a",
    "Sort": 0 },

  {
    "ModelId": 3,
    "MchId": 1,
    "CategoryId": 3,
    Category: '电子设备>打印机',
    Count: 3, // 型号所包含的问题数量
    "Name": "M1213NF",
    "Sort": 0 },

  {
    "ModelId": 4,
    "MchId": 1,
    "CategoryId": 3,
    Category: '电子设备>打印机',
    Count: 3, // 型号所包含的问题数量
    "Name": "M128",
    "Sort": 0 },

  {
    "ModelId": 5,
    "MchId": 1,
    "CategoryId": 3,
    Category: '电子设备>打印机',
    Count: 3, // 型号所包含的问题数量
    "Name": "P1108",
    "Sort": 0 }],


  //  按分类划分查询的的列表
  category_list: [{
    "CategoryId": 1,
    "MchId": 1,
    "ParentId": 0,
    "Name": "PDA及配件",
    Count: 3,
    "Sort": 0,
    "Children": [] },

  {
    "CategoryId": 2,
    "MchId": 1,
    "ParentId": 0,
    "Name": "网络网关",
    Count: 3,
    "Sort": 1,
    "Children": [] },

  {
    "CategoryId": 3,
    "MchId": 1,
    "ParentId": 0,
    "Name": "打印机配件",
    Count: 3,
    "Sort": 2,
    "Children": [] }] };

/***/ }),

/***/ 36:
/*!**************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/order.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 工单信息 工单信息数据
 * @author 陆彦捷
 * @property {Array} svcModes 服务方式列表 
 */
module.exports = {
  svcModes: [
  { value: '1', text: '现场服务' },
  { value: '2', text: '远程服务' }]
  // 服务方式
};

/***/ }),

/***/ 37:
/*!***************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/img.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {








var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 图片方法
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       * @description  根据图片地址，上传图片
                                                                                                                                                                                       * @property {Function} imgUpload 根据图片地址上传图片 
                                                                                                                                                                                       * @property {Function} imgListUpload 批量上传本地图片
                                                                                                                                                                                       * @event {Function()} imgListIncreUpload 批量上传本地图片（与原图片地址进行对比）
                                                                                                                                                                                       */ // 请求服务器地址
// 登录
module.exports = { /** 根据图片地址上传图片
                    * @param {Object} obj 
                    * @property {String} imgUrl 本地路径
                    * @property  {String} LoadingText 加载时提示信息（默认提示信息"图片上传中……"）
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 上传成功后执行方法（默认为null）
                    * @property {Function} fail 上传失败后执行方法(默认为null)
                    * @property {Function} complete 请求回调函数（不论请求成功或失败都执行，默认为null）
                    * @param {Boolean}  showTitle 是否展示loading标题，默认为true
                    */imgUpload: function imgUpload(obj) {var showTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true; //参数
    var imgUrl;var LoadingText = '图片上传中……';var before; // 操作前方法
    var _success;var _fail;var _complete;
    if (Boolean(obj)) {
      imgUrl = obj.imgUrl;
      LoadingText = Boolean(obj.LoadingText) ? obj.LoadingText : LoadingText;
      before = obj.before;
      _success = obj.success;
      _fail = obj.fail;
      _complete = obj.complete;
    }
    // 请求
    if (showTitle) {
      uni.showLoading({
        title: LoadingText });

    }
    if (typeof before == "function") {
      before();
    }
    uni.uploadFile({
      url: _website.default.website + '/api/Share/Upload',
      filePath: imgUrl,
      name: 'files',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      success: function success(result) {
        if (showTitle) {
          uni.hideLoading();
        }
        if (result.statusCode == 200) {
          var data = JSON.parse(result.data);
          if (typeof _success == "function") {
            _success(data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail === "function") {
          _fail(result, result.data.ResultMsg);
        }
      },
      fail: function fail(errors) {
        if (showTitle) {
          uni.hideLoading();
        }
        if (typeof _fail === "function") {
          _fail(errors, null);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 批量上传图片(使用递归图片上传方法)
      * @param {Object} obj
      * @property {Number} index 索引
      * @property {Array} imgs 图片组
      * @property {Number} size 图片组长度（默认imgs的长度）
      * @property {Array} imgsResult 图片组的返回值（默认[]）
      * @property {Array} before 请求前执行方法
      * @property {Function} success 成功后执行方法（以最后的index为准）
      * @property {Function} fail 失败后的执行方法（以最后的index为准）
      * @property {Function} complete 执行完成后的回调函数（以最后的index为准）
      * @param {Boolean} showTitle 是否展示title标题，默认为true
      */
  imgListUpload: function imgListUpload(obj) {var showTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _self = this;
    // 参数
    var index = 0; // 索引
    var imgs = []; // 图片组
    var size = 0; // 图片组的大小
    var imgsResult = []; // 图片组的返回值
    var before; // 请求前执行方法
    var _success2; // 成功后执行方法（以最后的index为准）
    var _fail2; // 失败后执行方法（以最后的index为准）
    var _complete2; // 完成后方法（不论成功、失败都执行）
    if (Boolean(obj)) {
      index = Boolean(obj.index) ? obj.index : 0;
      imgs = Boolean(obj.imgs) ? obj.imgs : imgs;
      size = Boolean(obj.size) ? obj.size : imgs.length;
      imgsResult = Boolean(obj.imgsResult) ? obj.imgsResult : imgsResult;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 上传图片
    if (typeof before == "function" && index == 0) {
      before();
    }
    if (index < size) {
      this.imgUpload({
        imgUrl: imgs[index],
        LoadingText: "上传第" + (index + 1) + "张图片",
        success: function success(data, message) {
          imgsResult.push(data);
          if (index === size - 1) {
            if (typeof _success2 == "function") {
              _success2(imgsResult, message);
            }
          }
        },
        fail: function fail(errors) {
          imgsResult.push(imgs[index]);
          if (index === size - 1) {
            if (typeof _fail2 == "function") {
              _fail2(imgsResult, errors);
            }
          }
        },
        complete: function complete() {
          // 回调函数
          if (index === size - 1) {
            // 图片上传完成
            if (typeof _complete2 === "function") {
              _complete2();
            }
          } else {
            // 未完成图片上传
            _self.imgListUpload({
              index: index + 1,
              imgs: imgs,
              size: size,
              imgsResult: imgsResult,
              success: _success2,
              fail: _fail2,
              complete: _complete2 });

          }
        } },
      showTitle);
    }
  },
  /** 增量式批量上传（使用递归调用方法）
      * @param {Object} obj
      * @property {Number} index 索引
      * @property {Array} imgs 图片组
      * @property {Number} size 图片组长度（默认imgs的长度）
      * @property {Array} imgsResult 图片组的返回值（默认[]）
      * @property {Function} before 请求前执行方法
      * @property {Function} success 成功后执行方法（以最后的index为准）
      * @property {Function} fail 失败后的执行方法（以最后的index为准）
      * @property {Function} complete 执行完成后的回调函数（以最后的index为准）
      * @param {Boolean} showTitle 是否显示loading标题，默认为true
      */
  imgListIncreUpload: function imgListIncreUpload(obj) {var showTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _self = this;
    // 参数
    var index = 0; // 索引
    var beforeImgs = []; // 上传之前的图片数组
    var imgs = []; // 图片组
    var size = 0; // 图片组的大小
    var imgsResult = []; // 图片组的返回值
    var imgsPaths = []; // 图片的返回路径
    var before; // 请求前只执行方法
    var itemsuccess; // 每次请求成功执行方法
    var itemfail; // 每个请求失败执行方法
    var _success3; // 成功后执行方法（以最后的index为准）
    var _fail3; // 失败后执行方法（以最后的index为准）
    var _complete3; // 完成后方法（不论成功、失败都执行）
    if (Boolean(obj)) {
      index = Boolean(obj.index) ? obj.index : 0;
      beforeImgs = Boolean(obj.beforeImgs) ? obj.beforeImgs : beforeImgs;
      imgs = Boolean(obj.imgs) ? obj.imgs : imgs;
      size = Boolean(obj.size) ? obj.size : imgs.length;
      imgsResult = Boolean(obj.imgsResult) ? obj.imgsResult : imgsResult;
      imgsPaths = Boolean(obj.imgsPaths) ? obj.imgsPaths : imgsPaths;
      before = obj.before;
      itemsuccess = obj.itemsuccess;
      itemfail = obj.itemfail;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 上传图片
    if (typeof before == "function" && index == 0) {
      before();
    }
    if (index < size) {
      var temp = beforeImgs.find(function (item) {
        return item.file_url == imgs[index];
        return true;
      });
      if (!Boolean(temp)) {
        // 上传图片
        this.imgUpload({
          imgUrl: imgs[index],
          LoadingText: "上传第" + (index + 1) + "张图片",
          success: function success(data, message) {
            imgsResult.push(data);
            imgsPaths.push(data ? data.file_url : null);
            if (typeof itemsuccess == "function") {
              itemsuccess(data, index, message);
            }
            if (index === size - 1) {
              if (typeof _success3 === "function") {
                _success3(imgsResult, imgsPaths, message);
              }
            }
          },
          fail: function fail(errors) {
            imgsResult.push(imgs[index]);
            imgsPaths.push(imgs[index]);
            if (typeof itemfail == "function") {
              itemfail(null, index, errors);
            }
            if (index === size - 1) {
              if (typeof _fail3 === "function") {
                _fail3(imgsResult, imgsPaths, errors);
              }
            }
          },
          complete: function complete() {
            // 回调函数
            if (index === size - 1) {
              // 图片上传完成
              if (typeof _complete3 === "function") {
                _complete3();
              }
            } else {
              // 未完成图片上传
              _self.imgListIncreUpload({
                index: index + 1,
                imgs: imgs,
                size: size,
                imgsResult: imgsResult,
                imgsPaths: imgsPaths,
                before: before,
                itemsuccess: itemsuccess,
                itemfail: itemfail,
                success: _success3,
                fail: _fail3,
                complete: _complete3 },
              showTitle);
            }
          } },
        showTitle);
      } else {
        imgsResult.push(temp);
        imgsPaths.push(temp.file_url);
        if (typeof itemsuccess == "function") {
          itemsuccess(temp, index, "成功");
        }
        if (index === size - 1) {
          // 成功后执行方法
          if (typeof _success3 === "function") {
            _success3(imgsResult, imgsPaths, "成功");
          }
          // 图片上传完成
          if (typeof _complete3 === "function") {
            _complete3();
          }
        } else {
          // 未完成图片上传
          _self.imgListIncreUpload({
            index: index + 1,
            beforeImgs: beforeImgs,
            imgs: imgs,
            size: size,
            imgsResult: imgsResult,
            imgsPaths: imgsPaths,
            before: before,
            itemsuccess: itemsuccess,
            itemfail: itemfail,
            success: _success3,
            fail: _fail3,
            complete: _complete3 },
          showTitle);
        }
      }
    }
  }
  // ================================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 38:
/*!*****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/login.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {






var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                    * 登录的请求方法
                                                                                                                                                                                    * @author 陆彦捷
                                                                                                                                                                                    * @property {Function} login 登录请求方法
                                                                                                                                                                                    * @property {Function} updatePwd 更新密码
                                                                                                                                                                                    * 
                                                                                                                                                                                    */ // 请求的地址
// 登录
// 公共方法
module.exports = { /** 登录请求
                    * @param {Object} obj 
                    * @property {Object} 请求数据
                    * @property {Fuction} before  请求前执行方法
                    * @property {Fuction} success  请求成功执行方法
                    * @property {Fuction} nobind  未绑定成功执行费
                    * @property {Fuction} fail  请求失败执行方法
                    * @property {Fuction} complete  回调函数
                    */login: function login(obj) {// 参数
    var data; // 请求的数据
    var before; // 请求前执行方法
    var _success; // 请求成功后执行方法
    var nobind; // 未绑定成功后执行方法
    var _fail; // 请求失败后执行方法
    var _complete; // 回调函数(不论成功或失败都执行)
    if (Boolean(obj)) {data = obj.data;before = obj.before;_success = obj.success;nobind = obj.nobind;_fail = obj.fail;
      _complete = obj.complete;
    }
    // 请求方法
    uni.showLoading({
      title: '登录中……' });

    if (typeof before === "function") {
      before;
    }
    // 登录请求
    uni.request({
      url: _website.default.website + '/api/SvcUser/Login',
      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "601") {
            // 微信未绑定用户
            if (typeof nobind === "function") {
              nobind(result.data.Data, result.data.ResultMsg);
            }
            return;
          } else {
            // 请求成功方法
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ServerTime, result.data.ResultMsg);
            }
          }
          return;
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 更新密码
      * @param {Object} obj
      * @property {Object} data 	请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 请求回调函数
      */
  updatePwd: function updatePwd(obj) {
    // 请求参数
    var data; // 请求参数
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行参数
    var _complete2; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcUser/UpdatePwd?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        uni.hideLoading();
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success2 === "function") {
              _success2(result.data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2) {
          _complete2();
        }
      } });

  }
  // ================================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/user.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {












var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));
var _userstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/userstorage.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                     * 与用户相关的方法
                                                                                                                                                                                     * @author 陆彦捷
                                                                                                                                                                                     * @description 
                                                                                                                                                                                     * @property {Function} getCurrentInfo 获取当前用户
                                                                                                                                                                                     * @property {Function} getInfogetInfo 根据用户id获取用户
                                                                                                                                                                                     * @property {Function} bindPhoneInfo 用户绑定方法
                                                                                                                                                                                     * @property {Function} unbindPhoneInfo 用户解绑方法
                                                                                                                                                                                     * @event {Function(obj)}  updateInfo 更新用户信息
                                                                                                                                                                                     * 
                                                                                                                                                                                     *@property {Function} getCurrentIsAdminBoolean  判断当前用户是否当前组织管理员
                                                                                                                                                                                     *@property {Function} getIsAdminBoolean  判断当前用户是否组织管理员
                                                                                                                                                                                     */ // 请求地址
// 登录
// 组织
// 用户
module.exports = { /** 获取当前用户消息
                    * @param {Object} obj
                    * 	@property {Function} before 请求前执行方法
                    * 	@property {Function} success 请求成功执行方法
                    * 	@property {Function} fail 请求失败执行方法
                    * 	@property {Function} complete 回调函数（不论成功或失败都执行）
                    */getCurrentInfo: function getCurrentInfo(obj) {// 参数
    var before; // 请求前执行方法
    var _success; // 请求成功后执行方法
    var _fail; // 请求失败后执行方法
    var _complete; // 请求回调函数（不论请求成功或失败都执行）
    if (Boolean(obj)) {before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求方法
    if (typeof before === "function") {before();}uni.request({ url: _website.default.website + '/api/SvcUser/Info/' + _userstorage.default.getUserId(), header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        // 用户信息
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取用户Id
      * @param {Object} obj
      * 	@property {Int} id 用户Id
      * 	@property {Function} before 请求前执行方法
      * 	@property {Function} success 请求成功执行方法
      * 	@property {Function} fail 请求失败执行方法
      * 	@property {Function} complete 回调函数（不论成功或失败都执行）
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 用户Id
    var before; // 请求前执行方法
    var _success2; // 请求成功后执行方法
    var _fail2; // 请求失败后执行方法
    var _complete2; // 请求回调函数（不论请求成功或失败都执行）
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }

    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcUser/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        // 用户信息
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 用户绑定
      * @param {Object} obj
      * 	@property {Object} data 请求参数
      * 	@property {Function} before 请求前执行方法
      * 	@property {Function} success 请求成功执行方法
      * 	@property {Function} fail 请求失败执行方法
      * 	@property {Function} complete 回调函数（不论成功或失败都执行）
      */
  bindPhoneInfo: function bindPhoneInfo(obj) {
    // 请求参数
    var data; // 请求参数
    var before; // 请求前执行方法
    var _success3; // 请求成功后执行方法
    var _fail3; // 请求失败后执行方法
    var _complete3; // 请求回调函数（不论请求成功或失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcUser/Bind',
      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ServerTime, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 用户解绑(用户解绑)
      * @param {Object} obj
      */
  unbindPhoneInfo: function unbindPhoneInfo(obj) {
  },
  /** 更新用户信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数
      */
  updateInfo: function updateInfo(obj) {
    // 请求参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcUser/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          // 如果是当前用户，修改当前Session
          if (result.data.ResultCode == "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof errors === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  // =================================================== 用户权限 ===================================================================
  /** 判断当前用户是否为当前组织管理员
   * @param {Object} obj
   * 	@property {Function} before 请求前执行方法
   * 	@property {Function} success 请求成功执行方法
   * 	@property {Function} fail 请求失败执行方法
   * 	@property {Function} complete 回调函数（不论成功或失败都执行）
   */
  getCurrentIsAdminBoolean: function getCurrentIsAdminBoolean(obj) {
    // 参数
    var before; // 请求前执行方法
    var _success5; // 请求成功后执行方法
    var _fail5; // 请求失败后执行方法
    var _complete5; // 请求回调函数（不论请求成功或失败都执行）
    if (Boolean(obj)) {
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }

    // 请求方法
    if (typeof before === "function") {
      before();
    }
    var UserId = _userstorage.default.getUserId();
    var MchId = _organstorage.default.getIndustryId();
    if (!Boolean(UserId) || !Boolean(MchId)) {
      if (typeof _success5 === "function") {
        _success5(false, null);
      }
      return;
    }
    uni.request({
      url: _website.default.website + '/api/Share/CheckAdmin?userId=' + UserId + '&mchId=' + MchId,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        // 用户信息
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  /** 判断当前用户是否组织管理员
      * @param {Object} obj
      * 	@property {Number} mchId 组织id
      * 	@property {Function} before 请求前执行方法
      * 	@property {Function} success 请求成功执行方法
      * 	@property {Function} fail 请求失败执行方法
      * 	@property {Function} complete 回调函数（不论成功或失败都执行）
      */
  getIsAdminBoolean: function getIsAdminBoolean(obj) {
    // 参数
    var mchId; // 组织id
    var before; // 请求前执行方法
    var _success6; // 请求成功后执行方法
    var _fail6; // 请求失败后执行方法
    var _complete6; // 请求回调函数（不论请求成功或失败都执行）
    if (Boolean(obj)) {
      mchId = Boolean(obj.mchId) ? obj.mchId : _organstorage.default.getIndustryId();
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete6 = obj.complete;
    }

    // 请求方法
    if (typeof before === "function") {
      before();
    }
    var UserId = _userstorage.default.getUserId();
    if (!Boolean(UserId) || !Boolean(mchId)) {
      if (typeof _success6 === "function") {
        _success6(false, null);
      }
      return;
    }
    uni.request({
      url: _website.default.website + '/api/Share/CheckAdmin?userId=' + UserId + '&mchId=' + mchId,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        // 用户信息
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail6 === "function") {
          _fail6(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  }
  // ================================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') !== -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


var ignoreVueI18n = true;
function watchAppLocale(appVm, i18n) {
  appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
    i18n.setLocale(newLocale);
  });
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    locale =
    typeof uni !== 'undefined' && uni.getLocale && uni.getLocale() ||
    LOCALE_EN;
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      watchAppLocale(appVm, i18n);
      if (!appVm.$t || !appVm.$i18n || ignoreVueI18n) {
        // if (!locale) {
        //   i18n.setLocale(getDefaultLocale())
        // }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          // 触发响应式
          appVm.$locale;
          return i18n.t(key, values);
        };
      } else
      {
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 40:
/*!**********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/department.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {








var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));
var _filterobject = _interopRequireDefault(__webpack_require__(/*! @/common/function/filterobject.js */ 14));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 与部门有关请求
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       * @property {Function} getInfo 根据Id获取部门信息 
                                                                                                                                                                                       * @property {Function} getTrees 获取部门树形图 
                                                                                                                                                                                       * @property {Function} addInfo 添加部门信息
                                                                                                                                                                                       * @property {Function} updateInfo 更新部门信息
                                                                                                                                                                                       * @property {Function} deleteInfo 根据部门Id, 删除部门信息 
                                                                                                                                                                                       */ // 请求网址
// 请求方法
// 格式化数据
// 过滤数据
// 登录请求
module.exports = { /** 根据Id获取部门
                    * @param {Object} obj
                    * @property {Number} id 部门Id
                    * @property {Function} before 请求前方法（默认null）
                    * @property {Function} success 请求成功后执行方法（默认null）
                    * @property {Function} fail 请求失败后执行方法（默认null）
                    * @property {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
                    */getInfo: function getInfo(obj) {// 请求数据
    var id; // id
    var before; // 请求前执行方法
    var _success; // 请求成功时执行方法
    var _fail; // 请求失败时执行方法
    var _complete; // 请求回调函数
    if (Boolean(obj)) {id = obj.id;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求
    if (typeof before === "function") {before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取部门树形图（已数据化）
      * @param {Object} obj 
      * @property {Object} data 请求的参数
      * @property {Boolean} isformat 是否格式化返回值（默认true）
      * @property {Boolean} isFilter 是否过滤数据（默认false）
      * @property {Number} orgId 待过滤的部门Id(当isFilter为true是生效) 
      * @param {Function} before 请求前方法（默认null）
      * @param {Function} success 请求成功后执行方法（默认null）
      * @param {Function} fail 请求失败后执行方法（默认null）
      * @param {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
      */
  getTrees: function getTrees(obj) {
    // 参数
    var data; // 请求参数
    var isformat = true; // 是否格式化
    var isFilter = false; // 是否过滤数据
    var orgId; // 组织Id
    var before; // 请求前执行方法
    var _success2; // 请求成功后执行方法
    var _fail2; // 请求失败后执行方法
    var _complete2; // 回调函数（不论成功、失败都执行费）
    if (Boolean(obj)) {
      data = obj.data;
      isformat = obj.isformat != false;
      isFilter = Boolean(obj.isFilter);
      orgId = obj.orgId;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/GetFullOrg?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0" && Boolean(result.data.Data)) {
            if (typeof _success2 === "function") {
              var data = result.data.Data;
              // 格式化返回值
              var fullorgTree = isformat ? _changeobjectecordname.default.change(data.Children, "Value", "Name", "Children") : data;
              // 过滤返回值
              var organtrees = isFilter ? _filterobject.default.filterbyvalue_list(fullorgTree, orgId) : fullorgTree;
              _success2(fullorgTree, organtrees);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 添加部门信息
      * @param {Object} obj 
      * @property  {Object} data 请求数据
      * @property {Function} before 请求前方法（默认null）
      * @property {Function} success 请求成功后执行方法（默认null）
      * @property {Function} fail 请求失败后执行方法（默认null）
      * @property {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
      */
  addInfo: function addInfo(obj) {
    // 请求数据
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/Add',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 更新部门信息
     * @param {Object} obj
     * @property  {Object} data 请求数据
     * @property {Function} before 请求前方法（默认null）
     * @property {Function} success 请求成功后执行方法（默认null）
     * @property {Function} fail 请求失败后执行方法（默认null）
     * @property {Function} complete 回调函数执行方法（不论成功、失败都执行。默认为null）
      */
  updateInfo: function updateInfo(obj) {
    // 请求数据
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(erros) {
        if (typeof _fail4 === "function") {
          _fail4();
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 根据部门id,删除部门
      * @param {Object} obj
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 回调函数（不论成功、失败都执行）
      */
  deleteInfo: function deleteInfo(obj) {
    var id; // 部门id
    var before; // 请求前执行方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败执行方法
    var _complete5; // 请求完成执行方法
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        uni.hideLoading();
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0" && result.data.Data) {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  }
  // ===============================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!*****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/staff.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {













var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 与员工有关请求
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       * @property {Function} getAllList 获取员工信息（全部） 
                                                                                                                                                                                       * @property {Function} getMangesList 分页获取员工信息 
                                                                                                                                                                                       * @property {Function} getCurrentInfo 获取当前员工信息 
                                                                                                                                                                                       * @property {Function} getInfo 根据Id获取员工信息 
                                                                                                                                                                                       * @property {Function} changestaff_request 修改员工信息 
                                                                                                                                                                                       * @property {Function} getJoinList 获取成员申请 
                                                                                                                                                                                       * @property {Function} inviteInfo 邀请新成员 
                                                                                                                                                                                       * @property {Function} invitionCheckInfo 同意或拒绝邀请 
                                                                                                                                                                                       * @property {Function} joinCheckInfo 成员申请审核 
                                                                                                                                                                                       * @property {Function} deleteJoinLog 审核消息的删除 
                                                                                                                                                                                       */ // 服务器地址
// 公共方法
// 登录
// 组织
module.exports = { /** 获取员工信息（全部）
                    * @param {Object} obj 
                    * @param {Object} data 请求数据
                    * @property  {Function} before  请求前执行方法（默认为null）
                    * @property {Function} success 请求成功后执行方法（默认为null）
                    * 	@value {Object} data 请求返回的参数
                    * @property {Function} fail 请求失败后执行方法（默认为null）
                    * 	@value {Object} errors 请求失败返回的参数
                    * @property {Function} completeF请求的回调函数（不论请求成功或失败都执行，默认为null）
                    */getAllList: function getAllList(obj) {// 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {data = obj.data;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求
    var params = _publicfunc.default.urlEncode(data);if (typeof before === "function") {before();}uni.request({ url: _website.default.website + '/api/SvcMchStaff/Get?' + params, header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.resultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取部门主管
      * @param {Object} obj 
      * @property {Object} data 请求数据
      * @property  {Function} before  请求前执行方法（默认为null）
      * @property {Function} success 请求成功后执行方法（默认为null）
      * @property {Function} fail 请求失败后执行方法（默认为null）
      * @property {Function} completeF请求的回调函数（不论请求成功或失败都执行，默认为null）
      */
  getMangesList: function getMangesList(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcOrganization/GetManagers?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 分页获取员工信息
      * @param {Number} MchId 商户id
      * @param {Function} beforeF  请求前执行方法（默认为null）
      * @param {Function} successF 请求成功后执行方法（默认为null）
      * 	@value {Object} data 请求返回的参数
      * @param {Function} failF 请求失败后执行方法（默认为null）
      * 	@value {Object} errors 请求失败返回的参数
      * @param {Function} completeF请求的回调函数（不论请求成功或失败都执行，默认为null）
      */
  getListPage: function getListPage(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; //回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchStaff/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 获取当前员工信息
      * @param {Object} obj 
      * 	@property {Function} before 请求前执行方法
      * 	@property {Function} success 成功时执行方法（默认为null）
      * 	@property {Function} fail 失败时执行方法(默认为null)
      * 	@property {Function} compelete 方法调用完成执行方法（不论成功或失败都调用, 默认为空）
      */
  getCurrentInfo: function getCurrentInfo(obj) {
    // 参数
    var before; // 请求前执行方法
    var _success4; // 成功时执行方法
    var _fail4; // 失败时执行方法
    var compelete; // 回调函数
    if (Boolean(obj)) {
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      compelete = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcUser/GetMchStaff?mchId=' + _organstorage.default.getIndustryId() + '&userId=' +
      _loginstorage.default.getUserId(),
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === '0') {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof compelete === "function") {
          compelete();
        }
      } });

  },
  /** 获取员工信息
      * @param {Object} obj
      * @property {Number} id 员工id
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 员工id
    var before; // 请求前执行方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete4 = obj.complete;
    }
    if (!Boolean(id)) {
      return;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchStaff/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /**修改员工信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 完成时执行方法
      */
  updateInfo: function updateInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success6; // 请求成功执行方法
    var _fail6; // 请求失败执行方法
    var _complete5; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete5 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchStaff/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(erros) {
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  // 成员邀请和审核
  /** 获取成员申请列表
   * @param {Object} obj
   * @property {Object} data 请求数据
   * @property {Function} before 请求前执行方法
   * @property {Function} success  请求成功后执行方法
   * @property {Function} fail  请求失败后执行方法
   * @property {Function} complete  回调函数（不论成功失败都执行）
   */
  getJoinList: function getJoinList(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success7; // 请求成功执行方法
    var _fail7; // 请求失败执行方法
    var _complete6; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success7 = obj.success;
      _fail7 = obj.fail;
      _complete6 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcJoinLog/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success7 === "function") {
              _success7(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail7 === "function") {
          _fail7(result);
        }
      },
      fail: function fail(errors) {
        if (typeof errors) {
          _fail7(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  },
  /** 邀请新成员
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success  请求成功后执行方法
      * @property {Function} fail  请求失败后执行方法
      * @property {Function} complete  回调函数（不论成功失败都执行）
      */
  inviteInfo: function inviteInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success8; // 请求成功执行方法
    var _fail8; // 请求失败执行方法
    var _complete7; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success8 = obj.success;
      _fail8 = obj.fail;
      _complete7 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/Invitation',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success8 === "function") {
              _success8(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail8 === "function") {
          _fail8(result);
        }
      },
      fail: function fail(errors) {
        if (typeof errors) {
          _fail8(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete7 === "function") {
          _complete7();
        }
      } });

  },
  /** 同意或拒绝邀请
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success  请求成功后执行方法
      * @property {Function} fail  请求失败后执行方法
      * @property {Function} complete  回调函数（不论成功失败都执行）
      */
  invitionCheckInfo: function invitionCheckInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success9; // 请求成功执行方法
    var _fail9; // 请求失败执行方法
    var _complete8; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success9 = obj.success;
      _fail9 = obj.fail;
      _complete8 = obj.complete;
    }
    var params = _publicfunc.default.urlEncode(data);
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/InvitationCheck?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (typeof _success9 === "function") {
            _success9(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail9 === "function") {
          _fail9(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail9 === "function") {
          _fail9(errors);;
        }
      },
      complete: function complete() {
        if (typeof _complete8 === "function") {
          _complete8();
        }
      } });

  },
  /** 审核员工加入组织
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success  请求成功后执行方法
      * @property {Function} fail  请求失败后执行方法
      * @property {Function} complete  回调函数（不论成功失败都执行）
      */
  joinCheckInfo: function joinCheckInfo(obj) {
    // 参数
    var data; // 请求消息
    var before; // 请求前执行方法
    var _success10; // 请求成功后执行方法
    var _fail10; // 请求失败后执行方法
    var _complete9; // 完成后执行方法
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success10 = obj.success;
      _fail10 = obj.fail;
      _complete9 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMerchant/JoinCheck',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      data: data,
      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success10 === "function") {
              _success10(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail10 === "function") {
          _fail10(result);
        }
      },
      fail: function fail(errors) {
        if (typeof errors) {
          _fail10(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete9 === "function") {
          _complete9();
        }
      } });

  },
  /** 删除申请消息
      * @param {Object} obj
      * @property {Number} id 当前的item
      * @property {Function} before 请求前执行方法
      * @property {Function} success  请求成功后执行方法
      * @property {Function} fail  请求失败后执行方法
      * @property {Function} complete  回调函数（不论成功失败都执行）
      */
  deleteJoinLog: function deleteJoinLog(obj) {
    // 参数
    var id; // 请求消息
    var before; // 请求前执行方法
    var _success11; // 请求成功后执行方法
    var _fail11; // 请求失败后执行方法
    var _complete10; // 完成后执行方法
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success11 = obj.success;
      _fail11 = obj.fail;
      _complete10 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcJoinLog/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success11 === "function") {
              _success11(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail11 === "function") {
          _fail11(result);
        }
      },
      fail: function fail(errors) {
        if (typeof errors) {
          _fail11(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete10 === "function") {
          _complete10();
        }
      } });

  }
  // ===============================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 42:
/*!***************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/msg.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {








var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _userstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/userstorage.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                     * 通知请求方法
                                                                                                                                                                                     * @property {Function} getCount 获取用户未读通知条数
                                                                                                                                                                                     * @property {Function} getTypeList 请求用户的通知列表 
                                                                                                                                                                                     * @property {Function} messageList 根据消息类型获取消息 
                                                                                                                                                                                     * @property {Function} updateReadInfo 将消息设置为已读 
                                                                                                                                                                                     * 
                                                                                                                                                                                     * 
                                                                                                                                                                                     */ // 公共的方法
// 服务器地址
// 登录
// 用户
module.exports = { /** 获取用户的未读消息条数
                    * @param {Object} obj
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 请求成功执行方法
                    * @property {Function} fail 请求失败执行方法
                    * @property {Function} complete 回调函数
                    */getCount: function getCount(obj) {// 参数
    var before; // 请求前执行方法
    var _success; // 请求成功后执行方法
    var _fail; // 请求失败后执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求
    if (typeof before === "function") {before();}
    uni.request({
      url: _website.default.website + '/api/SvcMsg/GetMsgCount?userId=' + _userstorage.default.getUserId() + '&isRead=false',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (typeof _success === "function") {
            _success(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 请求用户的通知列表
      * @param {Object} obj
      * @property {Object} data  请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 回调函数
      */
  getTypeList: function getTypeList(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 回调函数（无论成功、失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    var param = _publicfunc.default.urlEncode(data);
    uni.request({
      url: _website.default.website + '/api/SvcMsgType/List?' + param,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (typeof _success2 === "function") {
            _success2(result.data.Data, result.data.ResultMsg);
          }
          return;
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /**根据消息类型获取消息
      * @param {Object} obj
      * @property {Object} data 
      * @property {Function} before 
      * @property {Function} success 
      * @property {Function} fail 
      * @property {Function} complete 
      */
  getList: function getList(obj) {
    // 请求数据
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 请求完成执行方法
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data); // 查询消息是否已读
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMsg/GetMessages?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 将消息设置为已读
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功执行方法
      * @property {Function} fail 请求失败执行方法
      * @property {Function} complete 请求完成执行方法
      */
  updateReadInfo: function updateReadInfo(obj) {
    // 请求数据
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 请求完成执行方法
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data); // 查询消息是否已读
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMsg/UpdateRead?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  }
  // =========================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 43:
/*!********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/industry.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {



var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                          * 行业
                                                                                                                                                                                                          * @property {type} getTreesFormat 获取行业树(匹配datacom数据)
                                                                                                                                                                                                          */ // 服务器地址
// 登录
// 格式化值
module.exports = { /** 获取所有行业(匹配datacom数据)
                    * @param {Object} obj
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 请求成功后执行方法
                    * @property {Function} fail 请求失败后执行方法
                    * @property {Function} complete 回调函数（无论成功、失败都执行）
                    */getTreesFormat: function getTreesFormat(obj) {// 参数
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {before = obj.before;
      _success = obj.success;
      _fail = obj.fail;
      _complete = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/Share/GetIndustry',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success === "function") {
              _success(_changeobjectecordname.default.change(result.data.Data, "IndustryId", "Name", "Children"), result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete == "function") {
          _complete();
        }
      } });

  }
  // =================================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 44:
/*!****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/area.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {




var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                          * 地区
                                                                                                                                                                                                          * @author 陆彦捷
                                                                                                                                                                                                          * @property {function} getTrees 请求所有的地区
                                                                                                                                                                                                          */ // 网络位置
// 登录
// 格式化数据
module.exports = { /** 请求所有地区（树形图）
                    * @param {Object} obj
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 请求成功后执行方法
                    * @property {Function} fail 请求失败后执行方法
                    * @property {Function} complete 回调函数（无论成功、失败都执行）
                    */getTrees: function getTrees(obj) {// 参数
    var before; // 请求前执行方法
    var _success; // 请求完成执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {before = obj.before;_success = obj.success;_fail = obj.fail;
      _complete = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/Share/Areas',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success === "function") {
              _success(_changeobjectecordname.default.change(result.data.Data, "code", "name", "Children"), result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 45:
/*!***********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/mchCustomer.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {







var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                    * 客户信息
                                                                                                                                                                                    * @event {Function(obj)} getShortList 客户信息列表（只包含主要内容）
                                                                                                                                                                                    * @event {Function(obj)} getList 获取客户列表
                                                                                                                                                                                    * @event {Function(obj)} getInfo 根据id获取客户信息
                                                                                                                                                                                    * @event {Function(obj)} AddInfo 添加客户信息
                                                                                                                                                                                    * @event {Function(obj)} UpdateInfo 更新客户信息
                                                                                                                                                                                    */ // 网络位置
// 登录
// 宫格方法
module.exports = { /** 客户信息列表（只包含主要内容）
                    * @param {Object} obj
                    * @property {Object} data 请求数据
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 请求成功后执行方法
                    * @property {Function} fail 请求失败后执行方法
                    * @property {Function} complete 回调函数（无论成功、失败都执行）
                    */getShortList: function getShortList(obj) {// 参数
    var data; // 当前门店id
    var before; // 请求方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数（无论成功/失败都执行）
    if (Boolean(obj)) {data = obj.data;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;}
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchCustom/ShortList?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success === "function") {
              _success(result.data.Data);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取客户列表
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论成功、失败都执行）
      */
  getList: function getList(obj) {
    // 参数
    var data; // 当前门店id
    var before; // 请求方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 回调函数（无论成功/失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchCustom/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 根据Id获取客户信息
      * @param {Object} obj
      * @property {Number} id 客户Id
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论成功、失败都执行）
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 当前门店id
    var before; // 请求方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 回调函数（无论成功/失败都执行）
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchCustom/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 添加客户信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论成功、失败都执行）
      */
  AddInfo: function AddInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数（无论成功/失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchCustom/Add',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 更新客户信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论成功、失败都执行）
      */
  UpdateInfo: function UpdateInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败执行方法
    var _complete5; // 回调函数（无论成功/失败都执行）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchCustom/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  }
  // ===============================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 46:
/*!*******************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/product.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {










var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 产品
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       * @description  产品信息
                                                                                                                                                                                       * @event {Function()} getList 获取产品列表
                                                                                                                                                                                       * @event {Function()} getListPage 分页获取产品列表
                                                                                                                                                                                       * @event {Function()} getInfo 根据Id获取产品信息
                                                                                                                                                                                       * @event {Function()} AddInfo 添加产品信息
                                                                                                                                                                                       * @event {Function()} UpdateInfo 更新产品信息
                                                                                                                                                                                       * @event {Function()} deleteInfo 删除产品型 
                                                                                                                                                                                       */ // 路径
// 公共方法
// 登录
module.exports = { /** 获取产品列表
                    * @param {Object} obj
                    * @property {Object} data 请求数据
                    * @property {Function} before 请求前执行方法
                    * @property {Function} success 请求成功后执行方
                    * @property {Function} fail 请求失败后执行方法
                    * @property {Function} complete 回调函数（无论请求成功或失败都执行）
                    */getList: function getList(obj) {// 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {data = obj.data;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求信息
    var params = _publicfunc.default.urlEncode(data);if (typeof before === "function") {before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchProduct/Get?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 分页获取产品列表
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  getListPage: function getListPage(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2;
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求信息
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchProduct/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 根据id获取产品信息
      * @param {Object} obj
      * @property {Number} id 产品id
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  getInfo: function getInfo(obj) {
    // 获取参数
    var id; // 请求数据
    var before; // 请求前执行方法
    var _success3; // 请求成功后执行方法
    var _fail3; // 请求失败后执行方法
    var _complete3; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchProduct/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 添加产品信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  AddInfo: function AddInfo(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchProduct/Add',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 更新产品信息
      * @param {Object} obj
      * @property {Object} data 请求数据
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  UpdateInfo: function UpdateInfo(obj) {
    // 获取参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success5; // 请求成功后执行方法
    var _fail5; // 请求失败后执行方法
    var _complete5; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }

    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchProduct/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  /** 删除产品信息
      * @param {Object} obj
      * @property {Number} id 产品id
      * @property {Function} before 请求前执行方法
      * @property {Function} success 请求成功后执行方
      * @property {Function} fail 请求失败后执行方法
      * @property {Function} complete 回调函数（无论请求成功或失败都执行）
      */
  deleteInfo: function deleteInfo(obj) {
    // 获取参数
    var id; // 产品id
    var before; // 请求前执行方法
    var _success6; // 请求成功执行方法
    var _fail6; // 请求失败执行方法
    var _complete6; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete6 = obj.complete;
    }

    // 请求信息
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcMchProduct/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail6 === "function") {
          _fail6(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  }
  // ============================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 47:
/*!********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/category.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {







var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 获取分类信息请求
                                                                                                                                                                                       * @author 陆彦捷
                                                                                                                                                                                       * @property {Function} getTrees 获取当前商户的分类-树形图结构
                                                                                                                                                                                       * @property {Function} getTreesFormat 获取当前商户的分类(格式化后的树形结构图)
                                                                                                                                                                                       * @property {Function} deleteInfo 删除当前分类id
                                                                                                                                                                                       * @property {Function} getCustomerTree 获取客户的设备分类
                                                                                                                                                                                       */ // 服务器路径
// 请求数据
// 格式化后的值
// 登录
module.exports = { /** 获取当前商户的分类-树形图结构
                    * @param {Object} obj
                    * 	@property {Object} data 请求数据
                    *  @property {Function} before 请求前执行方法 
                    *  @property {Function} success 请求成功后执行方法 
                    *  @property {Function} fail 请求失败后执行方法 
                    *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
                    */getTrees: function getTrees(obj) {var mchId; // 商户Id
    var before; // 请求前方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 请求回调函数（不论成功或失败都执行的方法）
    if (Boolean(obj)) {mchId = Boolean(obj.mchId) ? obj.mchId : 0;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;}if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcCategory/Tree?mchId=' + mchId,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取当前商户的分类(格式化后的树形结构图)
      * @param {Object} obj
      * 	@property {Object} data 请求数据
      *  @property {Function} before 请求前执行方法 
      *  @property {Function} success 请求成功后执行方法 
      *  @property {Function} fail 请求失败后执行方法 
      *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
      */
  getTreesFormat: function getTreesFormat(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 请求回调函数（不论成功或失败都执行的方法）
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求数据
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcCategory/Tree?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success2 === "function") {
              _success2(_changeobjectecordname.default.change(result.data.Data, "CategoryId", "Name", "Children"), result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 删除当前分类id
      * @param {Object} obj
      * 	@property {Number} id 分类Id
      *  @property {Function} before 请求前执行方法 
      *  @property {Function} success 请求成功后执行方法 
      *  @property {Function} fail 请求失败后执行方法 
      *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
      */
  deleteInfo: function deleteInfo(obj) {
    // 参数
    var id; // 设备分类id
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 请求回调函数
    if (Boolean(obj)) {
      id = Boolean(obj.id) ? obj.id : 0;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcCategory/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(erros) {
        if (typeof _fail3 === "function") {
          _fail3(erros);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  // =================================== 客户设备分类 =============================================================
  /** 获取客户的设备分类-树形图结构
   * @param {Object} obj
   * 	@property {Number} mchId 商户id
   *  @property {Function} before 请求前执行方法 
   *  @property {Function} success 请求成功后执行方法 
   *  @property {Function} fail 请求失败后执行方法 
   *  @property {Function} complete 请求回调函数（不论成功、失败都执行） 
   */
  getCustomerTree: function getCustomerTree(obj) {
    var mchId; // 商户Id
    var before; // 请求前方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 请求回调函数（不论成功或失败都执行的方法）
    if (Boolean(obj)) {
      mchId = Boolean(obj.mchId) ? obj.mchId : 0;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcCategory/CustTree?customId=' + mchId,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  }
  // ==============================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 48:
/*!*****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/brand.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {










var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                    * 品牌的请求方法
                                                                                                                                                                                    * @event {Function(obj)} getList 获取品牌列表
                                                                                                                                                                                    * @event {Function(obj)} getListPage 分页获取品牌类别
                                                                                                                                                                                    * @event {Function(obj)} getTree 获取品牌树形图
                                                                                                                                                                                    * @event {Function(obj)} getInfo 根据Id获取品牌值
                                                                                                                                                                                    * @event {Function(obj)} addInfo 添加品牌
                                                                                                                                                                                    * @event {Function(obj)} updateInfo 更新品牌
                                                                                                                                                                                    * @event {Function(obj)} deleteInfo 删除品牌
                                                                                                                                                                                    */ // 网络路径
// 登录
// 公共方法
module.exports = { /** 获取品牌
                    * @param {Object} obj
                    *  @property {Function} before  请求前执行方法
                    *  @property {Function} success 请求成功执行方法
                    *  @property {Function} fail 请求失败执行方法
                    *  @property {Function} complete 回调函数
                    */getList: function getList(obj) {// 参数
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; // 请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求方法
    if (typeof before === "function") {before();}
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Get?',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 分页获取品牌
      * @param {Object} obj
      *  @property {Object} data  请求数据
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  getListPage: function getListPage(obj) {
    // 请求参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success2; // 请求成功执行方法
    var _fail2; // 请求失败执行方法
    var _complete2; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success2 === "function") {
              _success2(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 获取品牌树形图
      * @param {Object} obj
      *  @property {Object} data  请求数据
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  getTree: function getTree(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求方法
    var params = _publicfunc.default.urlEncode(data);
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Tree?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 根据Id获取品牌值
      * @param {Object} obj
      *  @property {Number} id  品牌Id
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 添加品牌
      * @param {Object} obj
      *  @property {Object} data  请求数据
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  addInfo: function addInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败执行方法
    var _complete5; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Add',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  /** 更新品牌
      * @param {Object} obj
      *  @property {Object} data  请求数据
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  updateInfo: function updateInfo(obj) {
    // 参数
    var data;
    var before;
    var _success6;
    var _fail6;
    var _complete6;
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete6 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Update?',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail6 === "function") {
          _fail6(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  },
  /** 删除品牌
      * @param {Object} obj
      *  @property {Int} id  品牌Id
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  deleteInfo: function deleteInfo(obj) {
    var id; // 品牌Id
    var before; // 请求前执行方法
    var _success7; // 请求成功执行方法
    var _fail7; // 请求失败执行方法
    var _complete7; // 完成时执行方法
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success7 = obj.success;
      _fail7 = obj.fail;
      _complete7 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcBrand/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success7 === "function") {
              _success7(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail7 === "function") {
          _fail7(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail7 === "function") {
          _fail7(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete7 === "function") {
          _complete7();
        }
      } });

  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 49:
/*!*****************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/request/model.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {








var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));
var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                       * 获取型号有关请求
                                                                                                                                                                                       * @property {function} getListPage 分页获取型号
                                                                                                                                                                                       * @event {Function()} getTree 获取格式化后的型号信息
                                                                                                                                                                                       * @event {Function(obj)} getInfo 根据Id获取型号信息
                                                                                                                                                                                       * @event {Function(obj)} addInfo 添加型号
                                                                                                                                                                                       * @event {Function(obj)} updateInfo 更新型号
                                                                                                                                                                                       * @event {Function(obj)} deleteInfo 删除型号
                                                                                                                                                                                       */ // 网络
// 通用方法
// 格式化数据
// 登录
module.exports = { /** 分页获取型号
                    * @param {Object} obj
                    * @property {Object} data 请求数据 
                    * @property {Function} before 请求前执行方法 
                    * @property {Function} success 请求成功后执行方法
                    * @property {Function} fail 请求失败后执行操作 
                    * @property {Function} complete 回调函数(不论成功或失败都执行) 
                    */getListPage: function getListPage(obj) {// 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success; // 请求成功执行方法
    var _fail; //请求失败执行方法
    var _complete; // 回调函数
    if (Boolean(obj)) {data = obj.data;before = obj.before;_success = obj.success;_fail = obj.fail;_complete = obj.complete;} // 请求
    if (Boolean(data)) {
      // 如果分类id为0 , 删除分类的categoryId对象
      if (!data.categoryId) {
        delete data.categoryId;
      }
    }
    var params = _publicfunc.default.urlEncode(data);
    if (!Boolean(params)) {return;}
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcModel/Page?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success === "function") {
              _success(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail === "function") {
          _fail(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail === "function") {
          _fail(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete === "function") {
          _complete();
        }
      } });

  },
  /** 获取型号（已格式化、不分页）
      * @param {Object} obj
      *  @property {Object} data 请求数据 
      * @property {Function} before 请求前执行方法 
      * @property {Function} success 请求成功后执行方法
      * @property {Function} fail 请求失败后执行操作 
      * @property {Function} complete 回调函数(不论成功或失败都执行) 
      */
  getTree: function getTree(obj) {
    // 参数
    var data; //请求数据
    var before; // 请求前执行方法
    var _success2; // 请求后执行方法
    var _fail2; // 请求失败后执行方法
    var _complete2; // 回调函数

    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success2 = obj.success;
      _fail2 = obj.fail;
      _complete2 = obj.complete;
    }
    // 请求
    if (Boolean(data)) {
      // 如果分类id为0 , 删除分类的categoryId对象
      if (!data.categoryId) {
        delete data.categoryId;
      }
    }
    var params = _publicfunc.default.urlEncode(data);
    if (!Boolean(params)) {return;}
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcModel/Get?' + params,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode === 200) {
          if (result.data.ResultCode === "0") {
            if (typeof _success2 === "function") {
              _success2(_changeobjectecordname.default.change(result.data.Data, "ModelId", "Name"), result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail2 === "function") {
          _fail2(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail2 === "function") {
          _fail2(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete2 === "function") {
          _complete2();
        }
      } });

  },
  /** 根据id获取型号信息
      * @param {Object} obj
      *  @property {Number} id  型号id
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  getInfo: function getInfo(obj) {
    // 参数
    var id; // 型号id
    var before; // 请求前执行方法
    var _success3; // 请求成功执行方法
    var _fail3; // 请求失败执行方法
    var _complete3; // 回调函数
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success3 = obj.success;
      _fail3 = obj.fail;
      _complete3 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcModel/Info/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'GET',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success3 === "function") {
              _success3(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail3 === "function") {
          _fail3(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail3 === "function") {
          _fail3(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete3 === "function") {
          _complete3();
        }
      } });

  },
  /** 添加型号
      * @param {Object} obj
      *  @property {Object} data  请求数据
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  addInfo: function addInfo(obj) {
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success4; // 请求成功执行方法
    var _fail4; // 请求失败执行方法
    var _complete4; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success4 = obj.success;
      _fail4 = obj.fail;
      _complete4 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcModel/Add',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success4 === "function") {
              _success4(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail4 === "function") {
          _fail4(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail4 === "function") {
          _fail4(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete4 === "function") {
          _complete4();
        }
      } });

  },
  /** 更新型号
      * @param {Object} obj
      *  @property {Object} data  请求数据
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  updateInfo: function updateInfo(obj) {
    // 参数
    var data; // 请求数据
    var before; // 请求前执行方法
    var _success5; // 请求成功执行方法
    var _fail5; // 请求失败方法
    var _complete5; // 回调函数
    if (Boolean(obj)) {
      data = obj.data;
      before = obj.before;
      _success5 = obj.success;
      _fail5 = obj.fail;
      _complete5 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcModel/Update',
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      data: data,
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success5 === "function") {
              _success5(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail5 === "function") {
          _fail5(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail5 === "function") {
          _fail5(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete5 === "function") {
          _complete5();
        }
      } });

  },
  /** 删除型号
      * @param {Object} obj
      *  @property {Int} id  型号id
      *  @property {Function} before  请求前执行方法
      *  @property {Function} success 请求成功执行方法
      *  @property {Function} fail 请求失败执行方法
      *  @property {Function} complete 回调函数
      */
  deleteInfo: function deleteInfo(obj) {
    var id; // 型号id
    var before; // 请求前执行方法
    var _success6; // 请求成功执行方法
    var _fail6; // 请求失败执行方法
    var _complete6; // 完成时执行方法
    if (Boolean(obj)) {
      id = obj.id;
      before = obj.before;
      _success6 = obj.success;
      _fail6 = obj.fail;
      _complete6 = obj.complete;
    }
    // 请求方法
    if (typeof before === "function") {
      before();
    }
    uni.request({
      url: _website.default.website + '/api/SvcModel/Delete/' + id,
      header: {
        Authorization: 'Bearer ' + _loginstorage.default.getToken() },

      method: 'POST',
      success: function success(result) {
        if (result.statusCode == 200) {
          if (result.data.ResultCode == "0") {
            if (typeof _success6 === "function") {
              _success6(result.data.Data, result.data.ResultMsg);
            }
            return;
          }
        }
        if (typeof _fail6 === "function") {
          _fail6(result);
        }
      },
      fail: function fail(errors) {
        if (typeof _fail6 === "function") {
          _fail6(errors);
        }
      },
      complete: function complete() {
        if (typeof _complete6 === "function") {
          _complete6();
        }
      } });

  }
  // ==========================================================================================================================
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 5:
/*!****************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 52:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 53:
/*!****************************************************!*\
  !*** ./node_modules/vue-i18n/dist/vue-i18n.esm.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * vue-i18n v8.24.1 
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
/*  */

/**
 * constants
 */

var numberFormatKeys = [
  'compactDisplay',
  'currency',
  'currencyDisplay',
  'currencySign',
  'localeMatcher',
  'notation',
  'numberingSystem',
  'signDisplay',
  'style',
  'unit',
  'unitDisplay',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits'
];

/**
 * utilities
 */

function warn (msg, err) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack);
    }
  }
}

function error (msg, err) {
  if (typeof console !== 'undefined') {
    console.error('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.error(err.stack);
    }
  }
}

var isArray = Array.isArray;

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isBoolean (val) {
  return typeof val === 'boolean'
}

function isString (val) {
  return typeof val === 'string'
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

function isNull (val) {
  return val === null || val === undefined
}

function isFunction (val) {
  return typeof val === 'function'
}

function parseArgs () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var locale = null;
  var params = null;
  if (args.length === 1) {
    if (isObject(args[0]) || isArray(args[0])) {
      params = args[0];
    } else if (typeof args[0] === 'string') {
      locale = args[0];
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0];
    }
    /* istanbul ignore if */
    if (isObject(args[1]) || isArray(args[1])) {
      params = args[1];
    }
  }

  return { locale: locale, params: params }
}

function looseClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

function includes (arr, item) {
  return !!~arr.indexOf(item)
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function merge (target) {
  var arguments$1 = arguments;

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];
    if (source !== undefined && source !== null) {
      var key = (void 0);
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }
  return output
}

function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = isArray(a);
      var isArrayB = isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Sanitizes html special characters from input strings. For mitigating risk of XSS attacks.
 * @param rawText The raw input from the user that should be escaped.
 */
function escapeHtml(rawText) {
  return rawText
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Escapes html tags and special symbols from all provided params which were returned from parseArgs().params.
 * This method performs an in-place operation on the params object.
 *
 * @param {any} params Parameters as provided from `parseArgs().params`.
 *                     May be either an array of strings or a string->any map.
 *
 * @returns The manipulated `params` object.
 */
function escapeParams(params) {
  if(params != null) {
    Object.keys(params).forEach(function (key) {
      if(typeof(params[key]) == 'string') {
        params[key] = escapeHtml(params[key]);
      }
    });
  }
  return params
}

/*  */

function extend (Vue) {
  if (!Vue.prototype.hasOwnProperty('$i18n')) {
    // $FlowFixMe
    Object.defineProperty(Vue.prototype, '$i18n', {
      get: function get () { return this._i18n }
    });
  }

  Vue.prototype.$t = function (key) {
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

    var i18n = this.$i18n;
    return i18n._t.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this ].concat( values ))
  };

  Vue.prototype.$tc = function (key, choice) {
    var values = [], len = arguments.length - 2;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];

    var i18n = this.$i18n;
    return i18n._tc.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this, choice ].concat( values ))
  };

  Vue.prototype.$te = function (key, locale) {
    var i18n = this.$i18n;
    return i18n._te(key, i18n.locale, i18n._getMessages(), locale)
  };

  Vue.prototype.$d = function (value) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    return (ref = this.$i18n).d.apply(ref, [ value ].concat( args ))
  };

  Vue.prototype.$n = function (value) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    return (ref = this.$i18n).n.apply(ref, [ value ].concat( args ))
  };
}

/*  */

var mixin = {
  beforeCreate: function beforeCreate () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages = options.i18n && options.i18n.messages ? options.i18n.messages : {};
            options.__i18n.forEach(function (resource) {
              localeMessages = merge(localeMessages, JSON.parse(resource));
            });
            Object.keys(localeMessages).forEach(function (locale) {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
            });
          } catch (e) {
            if (true) {
              error("Cannot parse locale messages via custom blocks.", e);
            }
          }
        }
        this._i18n = options.i18n;
        this._i18nWatcher = this._i18n.watchI18nData();
      } else if (isPlainObject(options.i18n)) {
        var rootI18n = this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n
          ? this.$root.$i18n
          : null;
        // component local i18n
        if (rootI18n) {
          options.i18n.root = this.$root;
          options.i18n.formatter = rootI18n.formatter;
          options.i18n.fallbackLocale = rootI18n.fallbackLocale;
          options.i18n.formatFallbackMessages = rootI18n.formatFallbackMessages;
          options.i18n.silentTranslationWarn = rootI18n.silentTranslationWarn;
          options.i18n.silentFallbackWarn = rootI18n.silentFallbackWarn;
          options.i18n.pluralizationRules = rootI18n.pluralizationRules;
          options.i18n.preserveDirectiveContent = rootI18n.preserveDirectiveContent;
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages$1 = options.i18n && options.i18n.messages ? options.i18n.messages : {};
            options.__i18n.forEach(function (resource) {
              localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
            });
            options.i18n.messages = localeMessages$1;
          } catch (e) {
            if (true) {
              warn("Cannot parse locale messages via custom blocks.", e);
            }
          }
        }

        var ref = options.i18n;
        var sharedMessages = ref.sharedMessages;
        if (sharedMessages && isPlainObject(sharedMessages)) {
          options.i18n.messages = merge(options.i18n.messages, sharedMessages);
        }

        this._i18n = new VueI18n(options.i18n);
        this._i18nWatcher = this._i18n.watchI18nData();

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale();
        }

        if (rootI18n) {
          rootI18n.onComponentInstanceCreated(this._i18n);
        }
      } else {
        if (true) {
          warn("Cannot be interpreted 'i18n' option.");
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n;
    }
  },

  beforeMount: function beforeMount () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else if (isPlainObject(options.i18n)) {
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else {
        if (true) {
          warn("Cannot be interpreted 'i18n' option.");
        }
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    }
  },

  mounted: function mounted () {
    if (this !== this.$root && this.$options.__INTLIFY_META__ && this.$el) {
      this.$el.setAttribute('data-intlify', this.$options.__INTLIFY_META__);
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (!this._i18n) { return }

    var self = this;
    this.$nextTick(function () {
      if (self._subscribing) {
        self._i18n.unsubscribeDataChanging(self);
        delete self._subscribing;
      }

      if (self._i18nWatcher) {
        self._i18nWatcher();
        self._i18n.destroyVM();
        delete self._i18nWatcher;
      }

      if (self._localeWatcher) {
        self._localeWatcher();
        delete self._localeWatcher;
      }
    });
  }
};

/*  */

var interpolationComponent = {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: [String, Boolean, Object],
      default: 'span'
    },
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    },
    places: {
      type: [Array, Object]
    }
  },
  render: function render (h, ref) {
    var data = ref.data;
    var parent = ref.parent;
    var props = ref.props;
    var slots = ref.slots;

    var $i18n = parent.$i18n;
    if (!$i18n) {
      if (true) {
        warn('Cannot find VueI18n instance!');
      }
      return
    }

    var path = props.path;
    var locale = props.locale;
    var places = props.places;
    var params = slots();
    var children = $i18n.i(
      path,
      locale,
      onlyHasDefaultPlace(params) || places
        ? useLegacyPlaces(params.default, places)
        : params
    );

    var tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : 'span';
    return tag ? h(tag, data, children) : children
  }
};

function onlyHasDefaultPlace (params) {
  var prop;
  for (prop in params) {
    if (prop !== 'default') { return false }
  }
  return Boolean(prop)
}

function useLegacyPlaces (children, places) {
  var params = places ? createParamsFromPlaces(places) : {};

  if (!children) { return params }

  // Filter empty text nodes
  children = children.filter(function (child) {
    return child.tag || child.text.trim() !== ''
  });

  var everyPlace = children.every(vnodeHasPlaceAttribute);
  if ( true && everyPlace) {
    warn('`place` attribute is deprecated in next major version. Please switch to Vue slots.');
  }

  return children.reduce(
    everyPlace ? assignChildPlace : assignChildIndex,
    params
  )
}

function createParamsFromPlaces (places) {
  if (true) {
    warn('`places` prop is deprecated in next major version. Please switch to Vue slots.');
  }

  return Array.isArray(places)
    ? places.reduce(assignChildIndex, {})
    : Object.assign({}, places)
}

function assignChildPlace (params, child) {
  if (child.data && child.data.attrs && child.data.attrs.place) {
    params[child.data.attrs.place] = child;
  }
  return params
}

function assignChildIndex (params, child, index) {
  params[index] = child;
  return params
}

function vnodeHasPlaceAttribute (vnode) {
  return Boolean(vnode.data && vnode.data.attrs && vnode.data.attrs.place)
}

/*  */

var numberComponent = {
  name: 'i18n-n',
  functional: true,
  props: {
    tag: {
      type: [String, Boolean, Object],
      default: 'span'
    },
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    },
    locale: {
      type: String
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var data = ref.data;

    var i18n = parent.$i18n;

    if (!i18n) {
      if (true) {
        warn('Cannot find VueI18n instance!');
      }
      return null
    }

    var key = null;
    var options = null;

    if (isString(props.format)) {
      key = props.format;
    } else if (isObject(props.format)) {
      if (props.format.key) {
        key = props.format.key;
      }

      // Filter out number format options only
      options = Object.keys(props.format).reduce(function (acc, prop) {
        var obj;

        if (includes(numberFormatKeys, prop)) {
          return Object.assign({}, acc, ( obj = {}, obj[prop] = props.format[prop], obj ))
        }
        return acc
      }, null);
    }

    var locale = props.locale || i18n.locale;
    var parts = i18n._ntp(props.value, locale, key, options);

    var values = parts.map(function (part, index) {
      var obj;

      var slot = data.scopedSlots && data.scopedSlots[part.type];
      return slot ? slot(( obj = {}, obj[part.type] = part.value, obj.index = index, obj.parts = parts, obj )) : part.value
    });

    var tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : 'span';
    return tag
      ? h(tag, {
        attrs: data.attrs,
        'class': data['class'],
        staticClass: data.staticClass
      }, values)
      : values
  }
};

/*  */

function bind (el, binding, vnode) {
  if (!assert(el, vnode)) { return }

  t(el, binding, vnode);
}

function update (el, binding, vnode, oldVNode) {
  if (!assert(el, vnode)) { return }

  var i18n = vnode.context.$i18n;
  if (localeEqual(el, vnode) &&
    (looseEqual(binding.value, binding.oldValue) &&
     looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale)))) { return }

  t(el, binding, vnode);
}

function unbind (el, binding, vnode, oldVNode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return
  }

  var i18n = vnode.context.$i18n || {};
  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = '';
  }
  el._vt = undefined;
  delete el['_vt'];
  el._locale = undefined;
  delete el['_locale'];
  el._localeMessage = undefined;
  delete el['_localeMessage'];
}

function assert (el, vnode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return false
  }

  if (!vm.$i18n) {
    warn('VueI18n instance does not exists in Vue instance');
    return false
  }

  return true
}

function localeEqual (el, vnode) {
  var vm = vnode.context;
  return el._locale === vm.$i18n.locale
}

function t (el, binding, vnode) {
  var ref$1, ref$2;

  var value = binding.value;

  var ref = parseValue(value);
  var path = ref.path;
  var locale = ref.locale;
  var args = ref.args;
  var choice = ref.choice;
  if (!path && !locale && !args) {
    warn('value type not supported');
    return
  }

  if (!path) {
    warn('`path` is required in v-t directive');
    return
  }

  var vm = vnode.context;
  if (choice != null) {
    el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [ path, choice ].concat( makeParams(locale, args) ));
  } else {
    el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [ path ].concat( makeParams(locale, args) ));
  }
  el._locale = vm.$i18n.locale;
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
}

function parseValue (value) {
  var path;
  var locale;
  var args;
  var choice;

  if (isString(value)) {
    path = value;
  } else if (isPlainObject(value)) {
    path = value.path;
    locale = value.locale;
    args = value.args;
    choice = value.choice;
  }

  return { path: path, locale: locale, args: args, choice: choice }
}

function makeParams (locale, args) {
  var params = [];

  locale && params.push(locale);
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args);
  }

  return params
}

var Vue;

function install (_Vue) {
  /* istanbul ignore if */
  if ( true && install.installed && _Vue === Vue) {
    warn('already installed.');
    return
  }
  install.installed = true;

  Vue = _Vue;

  var version = (Vue.version && Number(Vue.version.split('.')[0])) || -1;
  /* istanbul ignore if */
  if ( true && version < 2) {
    warn(("vue-i18n (" + (install.version) + ") need to use Vue 2.0 or later (Vue: " + (Vue.version) + ")."));
    return
  }

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive('t', { bind: bind, update: update, unbind: unbind });
  Vue.component(interpolationComponent.name, interpolationComponent);
  Vue.component(numberComponent.name, numberComponent);

  // use simple mergeStrategies to prevent i18n instance lose '__proto__'
  var strats = Vue.config.optionMergeStrategies;
  strats.i18n = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };
}

/*  */

var BaseFormatter = function BaseFormatter () {
  this._caches = Object.create(null);
};

BaseFormatter.prototype.interpolate = function interpolate (message, values) {
  if (!values) {
    return [message]
  }
  var tokens = this._caches[message];
  if (!tokens) {
    tokens = parse(message);
    this._caches[message] = tokens;
  }
  return compile(tokens, values)
};



var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

function parse (format) {
  var tokens = [];
  var position = 0;

  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }

      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== '}') {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === '}';

      var type = RE_TOKEN_LIST_VALUE.test(sub)
        ? 'list'
        : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
          ? 'named'
          : 'unknown';
      tokens.push({ value: sub, type: type });
    } else if (char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[(position)] !== '{') {
        text += char;
      }
    } else {
      text += char;
    }
  }

  text && tokens.push({ type: 'text', value: text });

  return tokens
}

function compile (tokens, values) {
  var compiled = [];
  var index = 0;

  var mode = Array.isArray(values)
    ? 'list'
    : isObject(values)
      ? 'named'
      : 'unknown';
  if (mode === 'unknown') { return compiled }

  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break
      case 'named':
        if (mode === 'named') {
          compiled.push((values)[token.value]);
        } else {
          if (true) {
            warn(("Type of token '" + (token.type) + "' and format of value '" + mode + "' don't match!"));
          }
        }
        break
      case 'unknown':
        if (true) {
          warn("Detect 'unknown' type of token!");
        }
        break
    }
    index++;
  }

  return compiled
}

/*  */

/**
 *  Path parser
 *  - Inspired:
 *    Vue.js Path parser
 */

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Check if an expression is a literal value.
 */

var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral (exp) {
  return literalValueRE.test(exp)
}

/**
 * Strip quotes from a string
 */

function stripQuotes (str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27)
    ? str.slice(1, -1)
    : str
}

/**
 * Determine the type of a character in a keypath.
 */

function getPathCharType (ch) {
  if (ch === undefined || ch === null) { return 'eof' }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
      return ch

    case 0x5F: // _
    case 0x24: // $
    case 0x2D: // -
      return 'ident'

    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0:  // No-break space
    case 0xFEFF:  // Byte Order Mark
    case 0x2028:  // Line Separator
    case 0x2029:  // Paragraph Separator
      return 'ws'
  }

  return 'ident'
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */

function formatSubPath (path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) { return false }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed
}

/**
 * Parse a string path into an array of segments
 */

function parse$1 (path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c;
  var key;
  var newChar;
  var type;
  var transition;
  var action;
  var typeMap;
  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      if (key === undefined) { return false }
      key = formatSubPath(key);
      if (key === false) {
        return false
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote () {
    var nextChar = path[index + 1];
    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
      (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true
    }
  }

  while (mode !== null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined
        ? c
        : newChar;
      if (action() === false) {
        return
      }
    }

    if (mode === AFTER_PATH) {
      return keys
    }
  }
}





var I18nPath = function I18nPath () {
  this._cache = Object.create(null);
};

/**
 * External parse that check for a cache hit first
 */
I18nPath.prototype.parsePath = function parsePath (path) {
  var hit = this._cache[path];
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      this._cache[path] = hit;
    }
  }
  return hit || []
};

/**
 * Get path value from path string
 */
I18nPath.prototype.getPathValue = function getPathValue (obj, path) {
  if (!isObject(obj)) { return null }

  var paths = this.parsePath(path);
  if (paths.length === 0) {
    return null
  } else {
    var length = paths.length;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined || value === null) {
        return null
      }
      last = value;
      i++;
    }

    return last
  }
};

/*  */



var htmlTagMatcher = /<\/?[\w\s="/.':;#-\/]+>/;
var linkKeyMatcher = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g;
var linkKeyPrefixMatcher = /^@(?:\.([a-z]+))?:/;
var bracketsMatcher = /[()]/g;
var defaultModifiers = {
  'upper': function (str) { return str.toLocaleUpperCase(); },
  'lower': function (str) { return str.toLocaleLowerCase(); },
  'capitalize': function (str) { return ("" + (str.charAt(0).toLocaleUpperCase()) + (str.substr(1))); }
};

var defaultFormatter = new BaseFormatter();

var VueI18n = function VueI18n (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #290
  /* istanbul ignore if */
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var locale = options.locale || 'en-US';
  var fallbackLocale = options.fallbackLocale === false
    ? false
    : options.fallbackLocale || 'en-US';
  var messages = options.messages || {};
  var dateTimeFormats = options.dateTimeFormats || {};
  var numberFormats = options.numberFormats || {};

  this._vm = null;
  this._formatter = options.formatter || defaultFormatter;
  this._modifiers = options.modifiers || {};
  this._missing = options.missing || null;
  this._root = options.root || null;
  this._sync = options.sync === undefined ? true : !!options.sync;
  this._fallbackRoot = options.fallbackRoot === undefined
    ? true
    : !!options.fallbackRoot;
  this._formatFallbackMessages = options.formatFallbackMessages === undefined
    ? false
    : !!options.formatFallbackMessages;
  this._silentTranslationWarn = options.silentTranslationWarn === undefined
    ? false
    : options.silentTranslationWarn;
  this._silentFallbackWarn = options.silentFallbackWarn === undefined
    ? false
    : !!options.silentFallbackWarn;
  this._dateTimeFormatters = {};
  this._numberFormatters = {};
  this._path = new I18nPath();
  this._dataListeners = [];
  this._componentInstanceCreatedListener = options.componentInstanceCreatedListener || null;
  this._preserveDirectiveContent = options.preserveDirectiveContent === undefined
    ? false
    : !!options.preserveDirectiveContent;
  this.pluralizationRules = options.pluralizationRules || {};
  this._warnHtmlInMessage = options.warnHtmlInMessage || 'off';
  this._postTranslation = options.postTranslation || null;
  this._escapeParameterHtml = options.escapeParameterHtml || false;

  /**
   * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
   * @param choicesLength {number} an overall amount of available choices
   * @returns a final choice index
  */
  this.getChoiceIndex = function (choice, choicesLength) {
    var thisPrototype = Object.getPrototypeOf(this$1);
    if (thisPrototype && thisPrototype.getChoiceIndex) {
      var prototypeGetChoiceIndex = (thisPrototype.getChoiceIndex);
      return (prototypeGetChoiceIndex).call(this$1, choice, choicesLength)
    }

    // Default (old) getChoiceIndex implementation - english-compatible
    var defaultImpl = function (_choice, _choicesLength) {
      _choice = Math.abs(_choice);

      if (_choicesLength === 2) {
        return _choice
          ? _choice > 1
            ? 1
            : 0
          : 1
      }

      return _choice ? Math.min(_choice, 2) : 0
    };

    if (this$1.locale in this$1.pluralizationRules) {
      return this$1.pluralizationRules[this$1.locale].apply(this$1, [choice, choicesLength])
    } else {
      return defaultImpl(choice, choicesLength)
    }
  };


  this._exist = function (message, key) {
    if (!message || !key) { return false }
    if (!isNull(this$1._path.getPathValue(message, key))) { return true }
    // fallback for flat key
    if (message[key]) { return true }
    return false
  };

  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }

  this._initVM({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    dateTimeFormats: dateTimeFormats,
    numberFormats: numberFormats
  });
};

var prototypeAccessors = { vm: { configurable: true },messages: { configurable: true },dateTimeFormats: { configurable: true },numberFormats: { configurable: true },availableLocales: { configurable: true },locale: { configurable: true },fallbackLocale: { configurable: true },formatFallbackMessages: { configurable: true },missing: { configurable: true },formatter: { configurable: true },silentTranslationWarn: { configurable: true },silentFallbackWarn: { configurable: true },preserveDirectiveContent: { configurable: true },warnHtmlInMessage: { configurable: true },postTranslation: { configurable: true } };

VueI18n.prototype._checkLocaleMessage = function _checkLocaleMessage (locale, level, message) {
  var paths = [];

  var fn = function (level, locale, message, paths) {
    if (isPlainObject(message)) {
      Object.keys(message).forEach(function (key) {
        var val = message[key];
        if (isPlainObject(val)) {
          paths.push(key);
          paths.push('.');
          fn(level, locale, val, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(key);
          fn(level, locale, val, paths);
          paths.pop();
        }
      });
    } else if (isArray(message)) {
      message.forEach(function (item, index) {
        if (isPlainObject(item)) {
          paths.push(("[" + index + "]"));
          paths.push('.');
          fn(level, locale, item, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(("[" + index + "]"));
          fn(level, locale, item, paths);
          paths.pop();
        }
      });
    } else if (isString(message)) {
      var ret = htmlTagMatcher.test(message);
      if (ret) {
        var msg = "Detected HTML in message '" + message + "' of keypath '" + (paths.join('')) + "' at '" + locale + "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";
        if (level === 'warn') {
          warn(msg);
        } else if (level === 'error') {
          error(msg);
        }
      }
    }
  };

  fn(level, locale, message, paths);
};

VueI18n.prototype._initVM = function _initVM (data) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  this._vm = new Vue({ data: data });
  Vue.config.silent = silent;
};

VueI18n.prototype.destroyVM = function destroyVM () {
  this._vm.$destroy();
};

VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging (vm) {
  this._dataListeners.push(vm);
};

VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging (vm) {
  remove(this._dataListeners, vm);
};

VueI18n.prototype.watchI18nData = function watchI18nData () {
  var self = this;
  return this._vm.$watch('$data', function () {
    var i = self._dataListeners.length;
    while (i--) {
      Vue.nextTick(function () {
        self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
      });
    }
  }, { deep: true })
};

VueI18n.prototype.watchLocale = function watchLocale () {
  /* istanbul ignore if */
  if (!this._sync || !this._root) { return null }
  var target = this._vm;
  return this._root.$i18n.vm.$watch('locale', function (val) {
    target.$set(target, 'locale', val);
    target.$forceUpdate();
  }, { immediate: true })
};

VueI18n.prototype.onComponentInstanceCreated = function onComponentInstanceCreated (newI18n) {
  if (this._componentInstanceCreatedListener) {
    this._componentInstanceCreatedListener(newI18n, this);
  }
};

prototypeAccessors.vm.get = function () { return this._vm };

prototypeAccessors.messages.get = function () { return looseClone(this._getMessages()) };
prototypeAccessors.dateTimeFormats.get = function () { return looseClone(this._getDateTimeFormats()) };
prototypeAccessors.numberFormats.get = function () { return looseClone(this._getNumberFormats()) };
prototypeAccessors.availableLocales.get = function () { return Object.keys(this.messages).sort() };

prototypeAccessors.locale.get = function () { return this._vm.locale };
prototypeAccessors.locale.set = function (locale) {
  this._vm.$set(this._vm, 'locale', locale);
};

prototypeAccessors.fallbackLocale.get = function () { return this._vm.fallbackLocale };
prototypeAccessors.fallbackLocale.set = function (locale) {
  this._localeChainCache = {};
  this._vm.$set(this._vm, 'fallbackLocale', locale);
};

prototypeAccessors.formatFallbackMessages.get = function () { return this._formatFallbackMessages };
prototypeAccessors.formatFallbackMessages.set = function (fallback) { this._formatFallbackMessages = fallback; };

prototypeAccessors.missing.get = function () { return this._missing };
prototypeAccessors.missing.set = function (handler) { this._missing = handler; };

prototypeAccessors.formatter.get = function () { return this._formatter };
prototypeAccessors.formatter.set = function (formatter) { this._formatter = formatter; };

prototypeAccessors.silentTranslationWarn.get = function () { return this._silentTranslationWarn };
prototypeAccessors.silentTranslationWarn.set = function (silent) { this._silentTranslationWarn = silent; };

prototypeAccessors.silentFallbackWarn.get = function () { return this._silentFallbackWarn };
prototypeAccessors.silentFallbackWarn.set = function (silent) { this._silentFallbackWarn = silent; };

prototypeAccessors.preserveDirectiveContent.get = function () { return this._preserveDirectiveContent };
prototypeAccessors.preserveDirectiveContent.set = function (preserve) { this._preserveDirectiveContent = preserve; };

prototypeAccessors.warnHtmlInMessage.get = function () { return this._warnHtmlInMessage };
prototypeAccessors.warnHtmlInMessage.set = function (level) {
    var this$1 = this;

  var orgLevel = this._warnHtmlInMessage;
  this._warnHtmlInMessage = level;
  if (orgLevel !== level && (level === 'warn' || level === 'error')) {
    var messages = this._getMessages();
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }
};

prototypeAccessors.postTranslation.get = function () { return this._postTranslation };
prototypeAccessors.postTranslation.set = function (handler) { this._postTranslation = handler; };

VueI18n.prototype._getMessages = function _getMessages () { return this._vm.messages };
VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats () { return this._vm.dateTimeFormats };
VueI18n.prototype._getNumberFormats = function _getNumberFormats () { return this._vm.numberFormats };

VueI18n.prototype._warnDefault = function _warnDefault (locale, key, result, vm, values, interpolateMode) {
  if (!isNull(result)) { return result }
  if (this._missing) {
    var missingRet = this._missing.apply(null, [locale, key, vm, values]);
    if (isString(missingRet)) {
      return missingRet
    }
  } else {
    if ( true && !this._isSilentTranslationWarn(key)) {
      warn(
        "Cannot translate the value of keypath '" + key + "'. " +
        'Use the value of keypath as default.'
      );
    }
  }

  if (this._formatFallbackMessages) {
    var parsedArgs = parseArgs.apply(void 0, values);
    return this._render(key, interpolateMode, parsedArgs.params, key)
  } else {
    return key
  }
};

VueI18n.prototype._isFallbackRoot = function _isFallbackRoot (val) {
  return !val && !isNull(this._root) && this._fallbackRoot
};

VueI18n.prototype._isSilentFallbackWarn = function _isSilentFallbackWarn (key) {
  return this._silentFallbackWarn instanceof RegExp
    ? this._silentFallbackWarn.test(key)
    : this._silentFallbackWarn
};

VueI18n.prototype._isSilentFallback = function _isSilentFallback (locale, key) {
  return this._isSilentFallbackWarn(key) && (this._isFallbackRoot() || locale !== this.fallbackLocale)
};

VueI18n.prototype._isSilentTranslationWarn = function _isSilentTranslationWarn (key) {
  return this._silentTranslationWarn instanceof RegExp
    ? this._silentTranslationWarn.test(key)
    : this._silentTranslationWarn
};

VueI18n.prototype._interpolate = function _interpolate (
  locale,
  message,
  key,
  host,
  interpolateMode,
  values,
  visitedLinkStack
) {
  if (!message) { return null }

  var pathRet = this._path.getPathValue(message, key);
  if (isArray(pathRet) || isPlainObject(pathRet)) { return pathRet }

  var ret;
  if (isNull(pathRet)) {
    /* istanbul ignore else */
    if (isPlainObject(message)) {
      ret = message[key];
      if (!(isString(ret) || isFunction(ret))) {
        if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallback(locale, key)) {
          warn(("Value of key '" + key + "' is not a string or function !"));
        }
        return null
      }
    } else {
      return null
    }
  } else {
    /* istanbul ignore else */
    if (isString(pathRet) || isFunction(pathRet)) {
      ret = pathRet;
    } else {
      if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallback(locale, key)) {
        warn(("Value of key '" + key + "' is not a string or function!"));
      }
      return null
    }
  }

  // Check for the existence of links within the translated string
  if (isString(ret) && (ret.indexOf('@:') >= 0 || ret.indexOf('@.') >= 0)) {
    ret = this._link(locale, message, ret, host, 'raw', values, visitedLinkStack);
  }

  return this._render(ret, interpolateMode, values, key)
};

VueI18n.prototype._link = function _link (
  locale,
  message,
  str,
  host,
  interpolateMode,
  values,
  visitedLinkStack
) {
  var ret = str;

  // Match all the links within the local
  // We are going to replace each of
  // them with its translation
  var matches = ret.match(linkKeyMatcher);
  for (var idx in matches) {
    // ie compatible: filter custom array
    // prototype method
    if (!matches.hasOwnProperty(idx)) {
      continue
    }
    var link = matches[idx];
    var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
    var linkPrefix = linkKeyPrefixMatches[0];
      var formatterName = linkKeyPrefixMatches[1];

    // Remove the leading @:, @.case: and the brackets
    var linkPlaceholder = link.replace(linkPrefix, '').replace(bracketsMatcher, '');

    if (includes(visitedLinkStack, linkPlaceholder)) {
      if (true) {
        warn(("Circular reference found. \"" + link + "\" is already visited in the chain of " + (visitedLinkStack.reverse().join(' <- '))));
      }
      return ret
    }
    visitedLinkStack.push(linkPlaceholder);

    // Translate the link
    var translated = this._interpolate(
      locale, message, linkPlaceholder, host,
      interpolateMode === 'raw' ? 'string' : interpolateMode,
      interpolateMode === 'raw' ? undefined : values,
      visitedLinkStack
    );

    if (this._isFallbackRoot(translated)) {
      if ( true && !this._isSilentTranslationWarn(linkPlaceholder)) {
        warn(("Fall back to translate the link placeholder '" + linkPlaceholder + "' with root locale."));
      }
      /* istanbul ignore if */
      if (!this._root) { throw Error('unexpected error') }
      var root = this._root.$i18n;
      translated = root._translate(
        root._getMessages(), root.locale, root.fallbackLocale,
        linkPlaceholder, host, interpolateMode, values
      );
    }
    translated = this._warnDefault(
      locale, linkPlaceholder, translated, host,
      isArray(values) ? values : [values],
      interpolateMode
    );

    if (this._modifiers.hasOwnProperty(formatterName)) {
      translated = this._modifiers[formatterName](translated);
    } else if (defaultModifiers.hasOwnProperty(formatterName)) {
      translated = defaultModifiers[formatterName](translated);
    }

    visitedLinkStack.pop();

    // Replace the link with the translated
    ret = !translated ? ret : ret.replace(link, translated);
  }

  return ret
};

VueI18n.prototype._createMessageContext = function _createMessageContext (values) {
  var _list = isArray(values) ? values : [];
  var _named = isObject(values) ? values : {};
  var list = function (index) { return _list[index]; };
  var named = function (key) { return _named[key]; };
  return {
    list: list,
    named: named
  }
};

VueI18n.prototype._render = function _render (message, interpolateMode, values, path) {
  if (isFunction(message)) {
    return message(this._createMessageContext(values))
  }

  var ret = this._formatter.interpolate(message, values, path);

  // If the custom formatter refuses to work - apply the default one
  if (!ret) {
    ret = defaultFormatter.interpolate(message, values, path);
  }

  // if interpolateMode is **not** 'string' ('row'),
  // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
  return interpolateMode === 'string' && !isString(ret) ? ret.join('') : ret
};

VueI18n.prototype._appendItemToChain = function _appendItemToChain (chain, item, blocks) {
  var follow = false;
  if (!includes(chain, item)) {
    follow = true;
    if (item) {
      follow = item[item.length - 1] !== '!';
      item = item.replace(/!/g, '');
      chain.push(item);
      if (blocks && blocks[item]) {
        follow = blocks[item];
      }
    }
  }
  return follow
};

VueI18n.prototype._appendLocaleToChain = function _appendLocaleToChain (chain, locale, blocks) {
  var follow;
  var tokens = locale.split('-');
  do {
    var item = tokens.join('-');
    follow = this._appendItemToChain(chain, item, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && (follow === true))
  return follow
};

VueI18n.prototype._appendBlockToChain = function _appendBlockToChain (chain, block, blocks) {
  var follow = true;
  for (var i = 0; (i < block.length) && (isBoolean(follow)); i++) {
    var locale = block[i];
    if (isString(locale)) {
      follow = this._appendLocaleToChain(chain, locale, blocks);
    }
  }
  return follow
};

VueI18n.prototype._getLocaleChain = function _getLocaleChain (start, fallbackLocale) {
  if (start === '') { return [] }

  if (!this._localeChainCache) {
    this._localeChainCache = {};
  }

  var chain = this._localeChainCache[start];
  if (!chain) {
    if (!fallbackLocale) {
      fallbackLocale = this.fallbackLocale;
    }
    chain = [];

    // first block defined by start
    var block = [start];

    // while any intervening block found
    while (isArray(block)) {
      block = this._appendBlockToChain(
        chain,
        block,
        fallbackLocale
      );
    }

    // last block defined by default
    var defaults;
    if (isArray(fallbackLocale)) {
      defaults = fallbackLocale;
    } else if (isObject(fallbackLocale)) {
      /* $FlowFixMe */
      if (fallbackLocale['default']) {
        defaults = fallbackLocale['default'];
      } else {
        defaults = null;
      }
    } else {
      defaults = fallbackLocale;
    }

    // convert defaults to array
    if (isString(defaults)) {
      block = [defaults];
    } else {
      block = defaults;
    }
    if (block) {
      this._appendBlockToChain(
        chain,
        block,
        null
      );
    }
    this._localeChainCache[start] = chain;
  }
  return chain
};

VueI18n.prototype._translate = function _translate (
  messages,
  locale,
  fallback,
  key,
  host,
  interpolateMode,
  args
) {
  var chain = this._getLocaleChain(locale, fallback);
  var res;
  for (var i = 0; i < chain.length; i++) {
    var step = chain[i];
    res =
      this._interpolate(step, messages[step], key, host, interpolateMode, args, [key]);
    if (!isNull(res)) {
      if (step !== locale && "development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
        warn(("Fall back to translate the keypath '" + key + "' with '" + step + "' locale."));
      }
      return res
    }
  }
  return null
};

VueI18n.prototype._t = function _t (key, _locale, messages, host) {
    var ref;

    var values = [], len = arguments.length - 4;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 4 ];
  if (!key) { return '' }

  var parsedArgs = parseArgs.apply(void 0, values);
  if(this._escapeParameterHtml) {
    parsedArgs.params = escapeParams(parsedArgs.params);
  }

  var locale = parsedArgs.locale || _locale;

  var ret = this._translate(
    messages, locale, this.fallbackLocale, key,
    host, 'string', parsedArgs.params
  );
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn(("Fall back to translate the keypath '" + key + "' with root locale."));
    }
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return (ref = this._root).$t.apply(ref, [ key ].concat( values ))
  } else {
    ret = this._warnDefault(locale, key, ret, host, values, 'string');
    if (this._postTranslation && ret !== null && ret !== undefined) {
      ret = this._postTranslation(ret, key);
    }
    return ret
  }
};

VueI18n.prototype.t = function t (key) {
    var ref;

    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];
  return (ref = this)._t.apply(ref, [ key, this.locale, this._getMessages(), null ].concat( values ))
};

VueI18n.prototype._i = function _i (key, locale, messages, host, values) {
  var ret =
    this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key)) {
      warn(("Fall back to interpolate the keypath '" + key + "' with root locale."));
    }
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.i(key, locale, values)
  } else {
    return this._warnDefault(locale, key, ret, host, [values], 'raw')
  }
};

VueI18n.prototype.i = function i (key, locale, values) {
  /* istanbul ignore if */
  if (!key) { return '' }

  if (!isString(locale)) {
    locale = this.locale;
  }

  return this._i(key, locale, this._getMessages(), null, values)
};

VueI18n.prototype._tc = function _tc (
  key,
  _locale,
  messages,
  host,
  choice
) {
    var ref;

    var values = [], len = arguments.length - 5;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 5 ];
  if (!key) { return '' }
  if (choice === undefined) {
    choice = 1;
  }

  var predefined = { 'count': choice, 'n': choice };
  var parsedArgs = parseArgs.apply(void 0, values);
  parsedArgs.params = Object.assign(predefined, parsedArgs.params);
  values = parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
  return this.fetchChoice((ref = this)._t.apply(ref, [ key, _locale, messages, host ].concat( values )), choice)
};

VueI18n.prototype.fetchChoice = function fetchChoice (message, choice) {
  /* istanbul ignore if */
  if (!message || !isString(message)) { return null }
  var choices = message.split('|');

  choice = this.getChoiceIndex(choice, choices.length);
  if (!choices[choice]) { return message }
  return choices[choice].trim()
};

VueI18n.prototype.tc = function tc (key, choice) {
    var ref;

    var values = [], len = arguments.length - 2;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];
  return (ref = this)._tc.apply(ref, [ key, this.locale, this._getMessages(), null, choice ].concat( values ))
};

VueI18n.prototype._te = function _te (key, locale, messages) {
    var args = [], len = arguments.length - 3;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 3 ];

  var _locale = parseArgs.apply(void 0, args).locale || locale;
  return this._exist(messages[_locale], key)
};

VueI18n.prototype.te = function te (key, locale) {
  return this._te(key, this.locale, this._getMessages(), locale)
};

VueI18n.prototype.getLocaleMessage = function getLocaleMessage (locale) {
  return looseClone(this._vm.messages[locale] || {})
};

VueI18n.prototype.setLocaleMessage = function setLocaleMessage (locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
  }
  this._vm.$set(this._vm.messages, locale, message);
};

VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage (locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
  }
  this._vm.$set(this._vm.messages, locale, merge(
    typeof this._vm.messages[locale] !== 'undefined' && Object.keys(this._vm.messages[locale]).length
      ? this._vm.messages[locale]
      : {},
    message
  ));
};

VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat (locale) {
  return looseClone(this._vm.dateTimeFormats[locale] || {})
};

VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat (locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, format);
  this._clearDateTimeFormat(locale, format);
};

VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat (locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, merge(this._vm.dateTimeFormats[locale] || {}, format));
  this._clearDateTimeFormat(locale, format);
};

VueI18n.prototype._clearDateTimeFormat = function _clearDateTimeFormat (locale, format) {
  for (var key in format) {
    var id = locale + "__" + key;

    if (!this._dateTimeFormatters.hasOwnProperty(id)) {
      continue
    }

    delete this._dateTimeFormatters[id];
  }
};

VueI18n.prototype._localizeDateTime = function _localizeDateTime (
  value,
  locale,
  fallback,
  dateTimeFormats,
  key
) {
  var _locale = locale;
  var formats = dateTimeFormats[_locale];

  var chain = this._getLocaleChain(locale, fallback);
  for (var i = 0; i < chain.length; i++) {
    var current = _locale;
    var step = chain[i];
    formats = dateTimeFormats[step];
    _locale = step;
    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (step !== locale && "development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
        warn(("Fall back to '" + step + "' datetime formats from '" + current + "' datetime formats."));
      }
    } else {
      break
    }
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null
  } else {
    var format = formats[key];
    var id = _locale + "__" + key;
    var formatter = this._dateTimeFormatters[id];
    if (!formatter) {
      formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
    }
    return formatter.format(value)
  }
};

VueI18n.prototype._d = function _d (value, locale, key) {
  /* istanbul ignore if */
  if ( true && !VueI18n.availabilities.dateTimeFormat) {
    warn('Cannot format a Date value due to not supported Intl.DateTimeFormat.');
    return ''
  }

  if (!key) {
    return new Intl.DateTimeFormat(locale).format(value)
  }

  var ret =
    this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn(("Fall back to datetime localization of root: key '" + key + "'."));
    }
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.d(value, key, locale)
  } else {
    return ret || ''
  }
};

VueI18n.prototype.d = function d (value) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var locale = this.locale;
  var key = null;

  if (args.length === 1) {
    if (isString(args[0])) {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }
    }
  } else if (args.length === 2) {
    if (isString(args[0])) {
      key = args[0];
    }
    if (isString(args[1])) {
      locale = args[1];
    }
  }

  return this._d(value, locale, key)
};

VueI18n.prototype.getNumberFormat = function getNumberFormat (locale) {
  return looseClone(this._vm.numberFormats[locale] || {})
};

VueI18n.prototype.setNumberFormat = function setNumberFormat (locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, format);
  this._clearNumberFormat(locale, format);
};

VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat (locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, merge(this._vm.numberFormats[locale] || {}, format));
  this._clearNumberFormat(locale, format);
};

VueI18n.prototype._clearNumberFormat = function _clearNumberFormat (locale, format) {
  for (var key in format) {
    var id = locale + "__" + key;

    if (!this._numberFormatters.hasOwnProperty(id)) {
      continue
    }

    delete this._numberFormatters[id];
  }
};

VueI18n.prototype._getNumberFormatter = function _getNumberFormatter (
  value,
  locale,
  fallback,
  numberFormats,
  key,
  options
) {
  var _locale = locale;
  var formats = numberFormats[_locale];

  var chain = this._getLocaleChain(locale, fallback);
  for (var i = 0; i < chain.length; i++) {
    var current = _locale;
    var step = chain[i];
    formats = numberFormats[step];
    _locale = step;
    // fallback locale
    if (isNull(formats) || isNull(formats[key])) {
      if (step !== locale && "development" !== 'production' && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
        warn(("Fall back to '" + step + "' number formats from '" + current + "' number formats."));
      }
    } else {
      break
    }
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null
  } else {
    var format = formats[key];

    var formatter;
    if (options) {
      // If options specified - create one time number formatter
      formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
    } else {
      var id = _locale + "__" + key;
      formatter = this._numberFormatters[id];
      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
      }
    }
    return formatter
  }
};

VueI18n.prototype._n = function _n (value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (true) {
      warn('Cannot format a Number value due to not supported Intl.NumberFormat.');
    }
    return ''
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.format(value)
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.format(value);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key) && !this._isSilentFallbackWarn(key)) {
      warn(("Fall back to number localization of root: key '" + key + "'."));
    }
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.n(value, Object.assign({}, { key: key, locale: locale }, options))
  } else {
    return ret || ''
  }
};

VueI18n.prototype.n = function n (value) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var locale = this.locale;
  var key = null;
  var options = null;

  if (args.length === 1) {
    if (isString(args[0])) {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }

      // Filter out number format options only
      options = Object.keys(args[0]).reduce(function (acc, key) {
          var obj;

        if (includes(numberFormatKeys, key)) {
          return Object.assign({}, acc, ( obj = {}, obj[key] = args[0][key], obj ))
        }
        return acc
      }, null);
    }
  } else if (args.length === 2) {
    if (isString(args[0])) {
      key = args[0];
    }
    if (isString(args[1])) {
      locale = args[1];
    }
  }

  return this._n(value, locale, key, options)
};

VueI18n.prototype._ntp = function _ntp (value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (true) {
      warn('Cannot format to parts a Number value due to not supported Intl.NumberFormat.');
    }
    return []
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.formatToParts(value)
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.formatToParts(value);
  if (this._isFallbackRoot(ret)) {
    if ( true && !this._isSilentTranslationWarn(key)) {
      warn(("Fall back to format number to parts of root: key '" + key + "' ."));
    }
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n._ntp(value, locale, key, options)
  } else {
    return ret || []
  }
};

Object.defineProperties( VueI18n.prototype, prototypeAccessors );

var availabilities;
// $FlowFixMe
Object.defineProperty(VueI18n, 'availabilities', {
  get: function get () {
    if (!availabilities) {
      var intlDefined = typeof Intl !== 'undefined';
      availabilities = {
        dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
        numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
      };
    }

    return availabilities
  }
});

VueI18n.install = install;
VueI18n.version = '8.24.1';

/* harmony default export */ __webpack_exports__["default"] = (VueI18n);


/***/ }),

/***/ 54:
/*!***********************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 55));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 56));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 60));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 61));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 65));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 66));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 67));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 68));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 69));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 70));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 71));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 58));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 57));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 72));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 59));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 73));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 74));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 75));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 76));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 77));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 78);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 79));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 80));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 81));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 82));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!**********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/mixin/mixin.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 56:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/request/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 57));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 59));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 57:
/*!*****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/deepMerge.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 58));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 572:
/*!**********************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-load-more/components/uni-load-more/i18n/index.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 573));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 574));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 575));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 573:
/*!*********************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-load-more/components/uni-load-more/i18n/en.json ***!
  \*********************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"Pull up to show more\",\"uni-load-more.contentrefresh\":\"loading...\",\"uni-load-more.contentnomore\":\"No more data\"}");

/***/ }),

/***/ 574:
/*!**************************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hans.json ***!
  \**************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉显示更多\",\"uni-load-more.contentrefresh\":\"正在加载...\",\"uni-load-more.contentnomore\":\"没有更多数据了\"}");

/***/ }),

/***/ 575:
/*!**************************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hant.json ***!
  \**************************************************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉顯示更多\",\"uni-load-more.contentrefresh\":\"正在加載...\",\"uni-load-more.contentnomore\":\"沒有更多數據了\"}");

/***/ }),

/***/ 58:
/*!*****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/deepClone.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 59:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/test.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 60:
/*!*******************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/queryParams.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 61:
/*!*************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/route.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 62));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 615:
/*!************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 62));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      // TODO
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum || rule.minimum) {
        result = 'rangeNumber';
      } else if (rule.maxLength || rule.minLength) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var
    range = rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var

    minimum = rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ? 'exclusiveMinimum' : 'minimum']);
    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ? 'exclusiveMaximum' : 'maximum']);
    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {return keys2.indexOf(key) < 0;});
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 62:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 63);

/***/ }),

/***/ 63:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 64);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 64:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 65:
/*!******************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/timeFormat.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 66:
/*!****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/timeFrom.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 65));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 67:
/*!*********************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/colorGradient.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 678:
/*!************************************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/luyj-data-picker/components/uni-data-pickerview/uni-data-picker.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default2 = {
  props: {
    localdata: {
      type: [Array, Object],
      default: function _default() {
        return [];
      } },

    collection: {
      type: String,
      default: '' },

    action: {
      type: String,
      default: '' },

    field: {
      type: String,
      default: '' },

    orderby: {
      type: String,
      default: '' },

    where: {
      type: [String, Object],
      default: '' },

    pageData: {
      type: String,
      default: 'add' },

    pageCurrent: {
      type: Number,
      default: 1 },

    pageSize: {
      type: Number,
      default: 20 },

    getcount: {
      type: [Boolean, String],
      default: false },

    getone: {
      type: [Boolean, String],
      default: false },

    gettree: {
      type: [Boolean, String],
      default: false },

    manual: {
      type: Boolean,
      default: false },

    value: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    modelValue: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    preload: {
      type: Boolean,
      default: false },

    stepSearh: {
      type: Boolean,
      default: true },

    selfField: {
      type: String,
      default: '' },

    parentField: {
      type: String,
      default: '' },

    multiple: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      loading: false,
      errorMessage: '',
      loadMore: {
        contentdown: '',
        contentrefresh: '',
        contentnomore: '' },

      dataList: [],
      selected: [],
      selectedIndex: 0,
      page: {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0 } };


  },
  computed: {
    isLocaldata: function isLocaldata() {
      return !this.collection.length;
    },
    postField: function postField() {
      var fields = [this.field];
      if (this.parentField) {
        fields.push("".concat(this.parentField, " as parent_value"));
      }
      return fields.join(',');
    },
    dataValue: function dataValue() {
      var isarr = Array.isArray(this.value) && this.value.length === 0;
      var isstr = typeof this.value === 'string' && !this.value;
      var isnum = typeof this.value === 'number' && !this.value;

      if (isarr || isstr || isnum) {
        return this.modelValue;
      }

      return this.value;
    } },

  created: function created() {var _this = this;
    this.$watch(function () {
      var al = [];
      ['pageCurrent',
      'pageSize',
      'value',
      'modelValue',
      'localdata',
      'collection',
      'action',
      'field',
      'orderby',
      'where',
      'getont',
      'getcount',
      'gettree'].
      forEach(function (key) {
        al.push(_this[key]);
      });
      return al;
    }, function (newValue, oldValue) {
      var needReset = false;
      for (var i = 2; i < newValue.length; i++) {
        if (newValue[i] != oldValue[i]) {
          needReset = true;
          break;
        }
      }
      if (newValue[0] != oldValue[0]) {
        _this.page.current = _this.pageCurrent;
      }
      _this.page.size = _this.pageSize;

      _this.onPropsChange();
    });
    this._treeData = [];
  },
  methods: {
    onPropsChange: function onPropsChange() {
      this._treeData = [];
    },
    getCommand: function getCommand() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      /* eslint-disable no-undef */
      var db = uniCloud.database();

      var action = options.action || this.action;
      if (action) {
        db = db.action(action);
      }

      var collection = options.collection || this.collection;
      db = db.collection(collection);

      var where = options.where || this.where;
      if (!(!where || !Object.keys(where).length)) {
        db = db.where(where);
      }

      var field = options.field || this.field;
      if (field) {
        db = db.field(field);
      }

      var orderby = options.orderby || this.orderby;
      if (orderby) {
        db = db.orderBy(orderby);
      }

      var current = options.pageCurrent !== undefined ? options.pageCurrent : this.page.current;
      var size = options.pageSize !== undefined ? options.pageSize : this.page.size;
      var getCount = options.getcount !== undefined ? options.getcount : this.getcount;
      var getTree = options.gettree !== undefined ? options.gettree : this.gettree;

      var getOptions = {
        getCount: getCount,
        getTree: getTree };

      if (options.getTreePath) {
        getOptions.getTreePath = options.getTreePath;
      }

      db = db.skip(size * (current - 1)).limit(size).get(getOptions);

      return db;
    },
    getNodeData: function getNodeData(callback) {var _this2 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.getCommand({
        field: this.postField,
        where: this._pathWhere() }).
      then(function (res) {
        _this2.loading = false;
        _this2.selected = res.result.data;
        callback && callback();
      }).catch(function (err) {
        _this2.loading = false;
        _this2.errorMessage = err;
      });
    },
    getTreePath: function getTreePath(callback) {var _this3 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        getTreePath: {
          startWith: "".concat(this.selfField, "=='").concat(this.dataValue, "'") } }).

      then(function (res) {
        _this3.loading = false;
        var treePath = [];
        _this3._extractTreePath(res.result.data, treePath);
        _this3.selected = treePath;
        callback && callback();
      }).catch(function (err) {
        _this3.loading = false;
        _this3.errorMessage = err;
      });
    },
    loadData: function loadData() {var _this4 = this;
      if (this.isLocaldata) {
        this._processLocalData();
        return;
      }

      if (this.dataValue.length) {
        this._loadNodeData(function (data) {
          _this4._treeData = data;
          _this4._updateBindData();
          _this4._updateSelected();
        });
        return;
      }

      if (this.stepSearh) {
        this._loadNodeData(function (data) {
          _this4._treeData = data;
          _this4._updateBindData();
        });
      } else {
        this._loadAllData(function (data) {
          _this4._treeData = [];
          _this4._extractTree(data, _this4._treeData, null);
          _this4._updateBindData();
        });
      }
    },
    _loadAllData: function _loadAllData(callback) {var _this5 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        gettree: true,
        startwith: "".concat(this.selfField, "=='").concat(this.dataValue, "'") }).
      then(function (res) {
        _this5.loading = false;
        callback(res.result.data);
        _this5.onDataChange();
      }).catch(function (err) {
        _this5.loading = false;
        _this5.errorMessage = err;
      });
    },
    _loadNodeData: function _loadNodeData(callback, pw) {var _this6 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        where: pw || this._postWhere(),
        pageSize: 500 }).
      then(function (res) {
        _this6.loading = false;
        callback(res.result.data);
        _this6.onDataChange();
      }).catch(function (err) {
        _this6.loading = false;
        _this6.errorMessage = err;
      });
    },
    _pathWhere: function _pathWhere() {
      var result = [];
      var where_field = this._getParentNameByField();
      if (where_field) {
        result.push("".concat(where_field, " == '").concat(this.dataValue, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    _postWhere: function _postWhere() {
      var result = [];
      var selected = this.selected;
      var parentField = this.parentField;
      if (parentField) {
        result.push("".concat(parentField, " == null || ").concat(parentField, " == \"\""));
      }
      if (selected.length) {
        for (var i = 0; i < selected.length - 1; i++) {
          result.push("".concat(parentField, " == '").concat(selected[i].value, "'"));
        }
      }

      var where = [];
      if (this.where) {
        where.push("(".concat(this.where, ")"));
      }
      if (result.length) {
        where.push("(".concat(result.join(' || '), ")"));
      }

      return where.join(' && ');
    },
    _nodeWhere: function _nodeWhere() {
      var result = [];
      var selected = this.selected;
      if (selected.length) {
        result.push("".concat(this.parentField, " == '").concat(selected[selected.length - 1].value, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    _getParentNameByField: function _getParentNameByField() {
      var fields = this.field.split(',');
      var where_field = null;
      for (var i = 0; i < fields.length; i++) {
        var items = fields[i].split('as');
        if (items.length < 2) {
          continue;
        }
        if (items[1].trim() === 'value') {
          where_field = items[0].trim();
          break;
        }
      }
      return where_field;
    },
    _isTreeView: function _isTreeView() {
      return this.parentField && this.selfField;
    },
    _updateSelected: function _updateSelected() {
      var dl = this.dataList;
      var sl = this.selected;
      for (var i = 0; i < sl.length; i++) {
        var value = sl[i].value;
        var dl2 = dl[i];
        for (var j = 0; j < dl2.length; j++) {
          var item2 = dl2[j];
          if (item2.value === value) {
            sl[i].text = item2.text;
            break;
          }
        }
      }
    },
    _updateBindData: function _updateBindData(node) {var _this$_filterData =



      this._filterData(this._treeData, this.selected),dataList = _this$_filterData.dataList,hasNodes = _this$_filterData.hasNodes;

      var isleaf = this._stepSearh === false && !hasNodes;

      if (node) {
        node.isleaf = isleaf;
      }

      this.dataList = dataList;
      this.selectedIndex = dataList.length - 1;

      if (!isleaf && this.selected.length < dataList.length) {
        this.selected.push({
          value: null,
          text: "请选择" });

      }

      return {
        isleaf: isleaf,
        hasNodes: hasNodes };

    },
    _filterData: function _filterData(data, paths) {
      var dataList = [];

      var hasNodes = true;

      dataList.push(data.filter(function (item) {
        return item.parent_value === undefined;
      }));
      for (var i = 0; i < paths.length; i++) {
        var value = paths[i].value;
        var nodes = data.filter(function (item) {
          return item.parent_value === value;
        });

        if (nodes.length) {
          dataList.push(nodes);
        } else {
          hasNodes = false;
        }
      }

      return {
        dataList: dataList,
        hasNodes: hasNodes };

    },
    _extractTree: function _extractTree(nodes, result, parent_value) {
      var list = result || [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        if (parent_value !== undefined) {
          child.parent_value = parent_value;
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTree(children, result, node.value);
        }
      }
    },
    _extractTreePath: function _extractTreePath(nodes, result) {
      var list = result || [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTreePath(children, result);
        }
      }
    },
    /**
        * 查找当前点的路径
        */
    _findNodePath: function _findNodePath(key, nodes) {var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      for (var i = 0; i < nodes.length; i++) {var _nodes$i =




        nodes[i],value = _nodes$i.value,text = _nodes$i.text,children = _nodes$i.children;

        path.push({
          value: value,
          text: text });


        if (value === key) {
          return path;
        }

        if (children) {
          var p = this._findNodePath(key, children, path);
          if (p.length) {
            return p;
          }
        }

        path.pop();
      }
      return [];
    },
    _processLocalData: function _processLocalData() {
      this._treeData = [];
      this._extractTree(this.localdata, this._treeData);

      var inputValue = this.dataValue;
      if (inputValue === undefined) {
        return;
      }

      if (Array.isArray(inputValue)) {
        inputValue = inputValue[inputValue.length - 1];
        if (typeof inputValue === 'object' && inputValue.value) {
          inputValue = inputValue.value;
        }
      }

      this.selected = this._findNodePath(inputValue, this.localdata);
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 679)["default"]))

/***/ }),

/***/ 679:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 62));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function n(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var s = n(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},r = s.lib = {},o = r.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,r = e.sigBytes;if (this.clamp(), s % 4) for (var o = 0; o < r; o++) {var i = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[s + o >>> 2] |= i << 24 - (s + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[s + o >>> 2] = n[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], r = function r(t) {t = t;var n = 987654321,s = 4294967295;return function () {var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push((o >>> 4).toString(16)), s.push((15 & o).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push(String.fromCharCode(o));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,r = n.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(s, h);}var l = s.splice(0, c);n.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} }), s.algo = {});return s;}(Math), n);}),r = (n(function (e, t) {var n;e.exports = (n = s, function (e) {var t = n,s = t.lib,r = s.WordArray,o = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,r = e[s];e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],v = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],I = e[t + 14],A = e[t + 15],E = o[0],b = o[1],O = o[2],U = o[3];E = u(E, b, O, U, i, 7, a[0]), U = u(U, E, b, O, c, 12, a[1]), O = u(O, U, E, b, f, 17, a[2]), b = u(b, O, U, E, p, 22, a[3]), E = u(E, b, O, U, g, 7, a[4]), U = u(U, E, b, O, m, 12, a[5]), O = u(O, U, E, b, y, 17, a[6]), b = u(b, O, U, E, _, 22, a[7]), E = u(E, b, O, U, w, 7, a[8]), U = u(U, E, b, O, v, 12, a[9]), O = u(O, U, E, b, S, 17, a[10]), b = u(b, O, U, E, k, 22, a[11]), E = u(E, b, O, U, T, 7, a[12]), U = u(U, E, b, O, P, 12, a[13]), O = u(O, U, E, b, I, 17, a[14]), E = h(E, b = u(b, O, U, E, A, 22, a[15]), O, U, c, 5, a[16]), U = h(U, E, b, O, y, 9, a[17]), O = h(O, U, E, b, k, 14, a[18]), b = h(b, O, U, E, i, 20, a[19]), E = h(E, b, O, U, m, 5, a[20]), U = h(U, E, b, O, S, 9, a[21]), O = h(O, U, E, b, A, 14, a[22]), b = h(b, O, U, E, g, 20, a[23]), E = h(E, b, O, U, v, 5, a[24]), U = h(U, E, b, O, I, 9, a[25]), O = h(O, U, E, b, p, 14, a[26]), b = h(b, O, U, E, w, 20, a[27]), E = h(E, b, O, U, P, 5, a[28]), U = h(U, E, b, O, f, 9, a[29]), O = h(O, U, E, b, _, 14, a[30]), E = l(E, b = h(b, O, U, E, T, 20, a[31]), O, U, m, 4, a[32]), U = l(U, E, b, O, w, 11, a[33]), O = l(O, U, E, b, k, 16, a[34]), b = l(b, O, U, E, I, 23, a[35]), E = l(E, b, O, U, c, 4, a[36]), U = l(U, E, b, O, g, 11, a[37]), O = l(O, U, E, b, _, 16, a[38]), b = l(b, O, U, E, S, 23, a[39]), E = l(E, b, O, U, P, 4, a[40]), U = l(U, E, b, O, i, 11, a[41]), O = l(O, U, E, b, p, 16, a[42]), b = l(b, O, U, E, y, 23, a[43]), E = l(E, b, O, U, v, 4, a[44]), U = l(U, E, b, O, T, 11, a[45]), O = l(O, U, E, b, A, 16, a[46]), E = d(E, b = l(b, O, U, E, f, 23, a[47]), O, U, i, 6, a[48]), U = d(U, E, b, O, _, 10, a[49]), O = d(O, U, E, b, I, 15, a[50]), b = d(b, O, U, E, m, 21, a[51]), E = d(E, b, O, U, T, 6, a[52]), U = d(U, E, b, O, p, 10, a[53]), O = d(O, U, E, b, S, 15, a[54]), b = d(b, O, U, E, c, 21, a[55]), E = d(E, b, O, U, w, 6, a[56]), U = d(U, E, b, O, A, 10, a[57]), O = d(O, U, E, b, y, 15, a[58]), b = d(b, O, U, E, P, 21, a[59]), E = d(E, b, O, U, g, 6, a[60]), U = d(U, E, b, O, k, 10, a[61]), O = d(O, U, E, b, f, 15, a[62]), b = d(b, O, U, E, v, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + b | 0, o[2] = o[2] + O | 0, o[3] = o[3] + U | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,r = 8 * t.sigBytes;n[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(s / 4294967296),i = s;n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, r, o, i) {var a = e + (t & n | ~t & s) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, n, s, r, o, i) {var a = e + (t & s | n & ~s) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, n, s, r, o, i) {var a = e + (t ^ n ^ s) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, n, s, r, o, i) {var a = e + (n ^ (t | ~s)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), n.MD5);}), n(function (e, t) {var n, r, o;e.exports = (r = (n = s).lib.Base, o = n.enc.Utf8, void (n.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), n(function (e, t) {e.exports = s.HmacMD5;}));function o(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function i(e) {return "object" === o(e);}var a = /*#__PURE__*/function (_Error) {_inherits(a, _Error);var _super = _createSuper(a);function a(e, t) {var _this;_classCallCheck(this, a);_this = _super.call(this, e), _this.code = t;return _this;}return a;}( /*#__PURE__*/_wrapNativeSuper(Error));function c(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var u = "development" === "development",h = "mp-weixin",l = c(undefined),d = c([]),f = true;var p = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 680).default || __webpack_require__(/*! uni-stat-config */ 680);p = _e2.appid;}} catch (e) {}var g = {};function m(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = g, s = e, Object.prototype.hasOwnProperty.call(n, s) || (g[e] = t), g[e];}"app-plus" === h && (g = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var y = ["invoke", "success", "fail", "complete"],_ = m("_globalUniCloudInterceptor");function w(e, t) {_[e] || (_[e] = {}), i(t) && Object.keys(t).forEach(function (n) {y.indexOf(n) > -1 && function (e, t, n) {var s = _[e][t];s || (s = _[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function v(e, t) {_[e] || (_[e] = {}), i(t) ? Object.keys(t).forEach(function (n) {y.indexOf(n) > -1 && function (e, t, n) {var s = _[e][t];if (!s) return;var r = s.indexOf(n);r > -1 && s.splice(r, 1);}(e, n, t[n]);}) : delete _[e];}function S(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function k(e, t) {return _[e] && _[e][t] || [];}function T(e, t) {return t ? function (n) {var _this2 = this;var s = "callFunction" === t && "DCloud-clientDB" === (n && n.name);var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var o = r.then(function () {return s ? Promise.resolve() : S(k(t, "invoke"), n);}).then(function () {return e.call(_this2, n);}).then(function (e) {return s ? Promise.resolve(e) : S(k(t, "success"), e).then(function () {return S(k(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return s ? Promise.reject(e) : S(k(t, "fail"), e).then(function () {return S(k(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return o;o.then(function (e) {n.success && n.success(e), n.complete && n.complete(e);}).catch(function (e) {n.fail && n.fail(e), n.complete && n.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var P = /*#__PURE__*/function (_Error2) {_inherits(P, _Error2);var _super2 = _createSuper(P);function P(e) {var _this3;_classCallCheck(this, P);_this3 = _super2.call(this, e.message), _this3.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this3), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this3;}return P;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e3 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),I = _e3.t,A = _e3.setLocale,E = _e3.getLocale;var b, O;function U() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function C() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: h, OS: O, APPID: p, LOCALE: E(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.9" };}function D() {if ("n" === x()) {try {b = plus.runtime.getDCloudId();} catch (e) {b = "";}return b;}return b || (b = U(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: b })), b;}function x() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)[h];}var R = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), u && "h5" === h && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new P({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return s(new P({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, n(r);} }));});} };var q = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var F = /*#__PURE__*/function () {function F(e) {_classCallCheck(this, F);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(I("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = q, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(F, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return R.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this4 = this;return Promise.resolve().then(function () {return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this4.getAccessToken();}).then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});}) : _this4.getAccessToken().then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = R.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = R.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this5 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this5.setAccessToken(e.result.accessToken), _this5._getAccessTokenPromiseStatus = "fulfilled", t(_this5.accessToken)) : (_this5._getAccessTokenPromiseStatus = "rejected", n(new P({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this5._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this6 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this6.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new P({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this7 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,r = _ref2.config;if ("string" !== o(t)) throw new P({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new P({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new P({ code: "INVALID_PARAM", message: "cloudPath不合法" });var i = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: i, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this7.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: s }));}).then(function () {return _this7.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: c }) : s(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new P({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return F;}();var L = { init: function init(e) {var t = new F(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} },N = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var M;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(M || (M = {}));var $ = function $() {};var j = function j() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, n) {e = function e(_e4, s) {return _e4 ? n(_e4) : t(s);};});return e.promise = t, e;};function K(e) {return void 0 === e;}function B(e) {return "[object Null]" === Object.prototype.toString.call(e);}var H;function W(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e5 = _step.value;var _t2 = _e5.isMatch,_n = _e5.genAdapter,_s = _e5.runtime;if (_t2()) return { adapter: _n(), runtime: _s };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(H || (H = {}));var z = { adapter: null, runtime: void 0 },V = ["anonymousUuidKey"];var J = /*#__PURE__*/function (_$) {_inherits(J, _$);var _super3 = _createSuper(J);function J() {var _this8;_classCallCheck(this, J);_this8 = _super3.call(this), z.adapter.root.tcbObject || (z.adapter.root.tcbObject = {});return _this8;}_createClass(J, [{ key: "setItem", value: function setItem(e, t) {z.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return z.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete z.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete z.adapter.root.tcbObject;} }]);return J;}($);function Y(e, t) {switch (e) {case "local":return t.localStorage || new J();case "none":return new J();default:return t.sessionStorage || new J();}}var X = /*#__PURE__*/function () {function X(e) {_classCallCheck(this, X);if (!this._storage) {this._persistence = z.adapter.primaryStorage || e.persistence, this._storage = Y(this._persistence, z.adapter);var _t3 = "access_token_".concat(e.env),_n2 = "access_token_expire_".concat(e.env),_s2 = "refresh_token_".concat(e.env),_r = "anonymous_uuid_".concat(e.env),_o = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _n2, refreshTokenKey: _s2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(X, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = Y(e, z.adapter);for (var _e6 in this.keys) {var _s3 = this.keys[_e6];if (t && V.includes(_e6)) continue;var _r2 = this._storage.getItem(_s3);K(_r2) || B(_r2) || (n.setItem(_s3, _r2), this._storage.removeItem(_s3));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },r = JSON.stringify(s);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return X;}();var G = {},Q = {};function Z(e) {return G[e];}var ee = function ee(e, t) {_classCallCheck(this, ee);this.data = t || null, this.name = e;};var te = /*#__PURE__*/function (_ee) {_inherits(te, _ee);var _super4 = _createSuper(te);function te(e, t) {var _this9;_classCallCheck(this, te);_this9 = _super4.call(this, "error", { error: e, data: t }), _this9.error = e;return _this9;}return te;}(ee);var ne = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s4 = n[e].indexOf(t);-1 !== _s4 && n[e].splice(_s4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof te) return console.error(e.error), this;var n = "string" == typeof e ? new ee(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e7 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e7),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function se(e, t) {ne.on(e, t);}function re(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};ne.fire(e, t);}function oe(e, t) {ne.off(e, t);}var ie = "loginStateChanged",ae = "loginStateExpire",ce = "loginTypeChanged",ue = "anonymousConverted",he = "refreshAccessToken";var le;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(le || (le = {}));var de = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],fe = { "X-SDK-Version": "1.3.5" };function pe(e, t, n) {var s = e[t];e[t] = function (t) {var r = {},o = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(r, s), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e8 in r) {i.append(_e8, r[_e8]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), s.call(e, t);};}function ge() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, fe), {}, { "x-seqid": e }) };}var me = /*#__PURE__*/function () {function me() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, me);var t;this.config = e, this._reqClass = new z.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = Z(this.config.env), this._localCache = (t = this.config.env, Q[t]), pe(this._reqClass, "post", [ge]), pe(this._reqClass, "upload", [ge]), pe(this._reqClass, "download", [ge]);}_createClass(me, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, r, o, i, a, _e9, _e10, _t5, _s5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(n);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e9 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e9 || "REFRESH_TOKEN_EXPIRED" === _e9 || "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === le.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 19;break;}_e10 = this._cache.getStore(r);_t5 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e10, refresh_token: _t5 });case 17:_s5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s5.refresh_token), this._refreshAccessToken()));case 19:re(ae), this._cache.removeStore(n);case 20:throw new Error("\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code));case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (re(he), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:s = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!s || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, r, o, _e11, i, _e12, _e13, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === de.indexOf(e))) {_context7.next = 10;break;}_e11 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e11);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e12 in i) {i.hasOwnProperty(_e12) && void 0 !== i[_e12] && i.append(_e12, o[_e12]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e13 in o) {void 0 !== o[_e13] && (i[_e13] = o[_e13]);}}a = { headers: { "content-type": r } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var r = "";for (var _e14 in n) {"" === r ? !s && (t += "?") : r += "&", r += "".concat(_e14, "=").concat(encodeURIComponent(n[_e14]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(N, "//tcb-api.tencentcloudapi.com/web", d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(s, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === de.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n3 = _context8.sent;if (!_n3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_n3.data.code, "] ").concat(_n3.data.message));case 12:return _context8.abrupt("return", _n3.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new Error("[".concat(n.data.code, "] ").concat(n.data.message));case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return me;}();var ye = {};function _e(e) {return ye[e];}var we = /*#__PURE__*/function () {function we(e) {_classCallCheck(this, we);this.config = e, this._cache = Z(e.env), this._request = _e(e.env);}_createClass(we, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return we;}();var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = Z(this._envId), this._request = _e(this._envId), this.setUserInfo();}_createClass(ve, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this10 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this10[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ve;}();var Se = /*#__PURE__*/function () {function Se(e) {_classCallCheck(this, Se);if (!e) throw new Error("envId is not defined");this._cache = Z(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ve(e);}_createClass(Se, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === le.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === le.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === le.WECHAT || this.loginType === le.WECHAT_OPEN || this.loginType === le.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Se;}();var ke = /*#__PURE__*/function (_we) {_inherits(ke, _we);var _super5 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super5.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, r, _e15;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:re(ie);re(ce, { env: this.config.env, loginType: le.ANONYMOUS, persistence: "local" });_e15 = new Se(this.config.env);_context13.next = 19;return _e15.user.refresh();case 19:return _context13.abrupt("return", _e15);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);r = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:re(ue, { env: this.config.env });re(ce, { loginType: le.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, le.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return ke;}(we);var Te = /*#__PURE__*/function (_we2) {_inherits(Te, _we2);var _super6 = _createSuper(Te);function Te() {_classCallCheck(this, Te);return _super6.apply(this, arguments);}_createClass(Te, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:re(ie);re(ce, { env: this.config.env, loginType: le.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new Se(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return Te;}(we);var Pe = /*#__PURE__*/function (_we3) {_inherits(Pe, _we3);var _super7 = _createSuper(Pe);function Pe() {_classCallCheck(this, Pe);return _super7.apply(this, arguments);}_createClass(Pe, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;r = s.refresh_token;o = s.access_token;i = s.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:re(ie);re(ce, { env: this.config.env, loginType: le.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new Se(this.config.env));case 22:throw s.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Pe;}(we);var Ie = /*#__PURE__*/function (_we4) {_inherits(Ie, _we4);var _super8 = _createSuper(Ie);function Ie() {_classCallCheck(this, Ie);return _super8.apply(this, arguments);}_createClass(Ie, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: le.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;r = s.refresh_token;o = s.access_token_expire;i = s.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:re(ie);re(ce, { env: this.config.env, loginType: le.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new Se(this.config.env));case 23:throw s.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return Ie;}(we);var Ae = /*#__PURE__*/function () {function Ae(e) {_classCallCheck(this, Ae);this.config = e, this._cache = Z(e.env), this._request = _e(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), se(ce, this._onLoginTypeChanged);}_createClass(Ae, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new ke(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new Te(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Pe(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new Ie(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new ke(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Pe(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new Ie(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new ke(this.config)), se(ue, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === le.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), re(ie), re(ce, { env: this.config.env, loginType: le.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this11 = this;se(ie, function () {var t = _this11.hasLoginState();e.call(_this11, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {se(ae, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {se(he, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {se(ue, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this12 = this;se(ce, function () {var t = _this12.hasLoginState();e.call(_this12, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new Se(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new Te(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ae;}();var Ee = function Ee(e, t) {t = t || j();var n = _e(this.config.env),s = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: r, name: s, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},be = function be(e, t) {t = t || j();var n = _e(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Oe = function Oe(_ref5, t) {var e = _ref5.fileList;if (t = t || j(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return _e(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ue = function Ue(_ref6, t) {var e = _ref6.fileList;t = t || j(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s6 = _step4.value;"object" == typeof _s6 ? (_s6.hasOwnProperty("fileID") && _s6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s6.fileID, max_age: _s6.maxAge })) : "string" == typeof _s6 ? n.push({ fileid: _s6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return _e(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ce = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return Ue.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = _e(this.config.env);r = n.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function Ce(_x26, _x27) {return _ref8.apply(this, arguments);};}(),De = function De(_ref9, o) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,r = _ref9.search;var i = o || j();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: n, parse: s, search: r, function_name: e, request_data: a };return _e(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (s) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},xe = { timeout: 15e3, persistence: "session" },Re = {};var qe = /*#__PURE__*/function () {function qe(e) {_classCallCheck(this, qe);this.config = e || this.config, this.authObj = void 0;}_createClass(qe, [{ key: "init", value: function init(e) {switch (z.adapter || (this.requestClient = new z.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, xe), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new qe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || z.adapter.primaryStorage || xe.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;G[t] = new X(e), Q[t] = new X(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, ye[n.env] = new me(n), this.authObj = new Ae(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return se.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return oe.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return De.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return Ue.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return Ce.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ee.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return be.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Re[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Re[e];if (n) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = W(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (z.adapter = t), n && (z.runtime = n);} }]);return qe;}();var Fe = new qe();function Le(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),r = "";for (var o in n) {"" === r ? !s && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(n[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Ne = /*#__PURE__*/function () {function Ne() {_classCallCheck(this, Ne);}_createClass(Ne, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, r) {q.request({ url: Le("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = q.uploadFile({ url: Le("https:", s), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n);}, fail: function fail(e) {u && "mp-alipay" === h && console.warn("支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试"), n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Ne;}();var Me = { setItem: function setItem(e, t) {q.setStorageSync(e, t);}, getItem: function getItem(e) {return q.getStorageSync(e);}, removeItem: function removeItem(e) {q.removeStorageSync(e);}, clear: function clear() {q.clearStorageSync();} };var $e = { genAdapter: function genAdapter() {return { root: {}, reqClass: Ne, localStorage: Me, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Fe.useAdapters($e);var je = Fe,Ke = je.init;je.init = function (e) {e.env = e.spaceId;var t = Ke.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = T(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var Be = /*#__PURE__*/function (_F) {_inherits(Be, _F);var _super9 = _createSuper(Be);function Be() {_classCallCheck(this, Be);return _super9.apply(this, arguments);}_createClass(Be, [{ key: "getAccessToken", value: function getAccessToken() {var _this13 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this13.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = R.sign(n, this.config.clientSecret);var r = C(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return s["x-client-platform"] = i, s["x-client-appid"] = o, s["x-client-device-id"] = a, s["x-client-version"] = c, s["x-client-token"] = q.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this14 = this;var e = _ref12.url,t = _ref12.formData,n = _ref12.name,s = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this14.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new P({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this15 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,n = _ref13$fileType === void 0 ? "image" : _ref13$fileType,s = _ref13.onUploadProgress;if (!t) throw new P({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: n };return _this15.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: s }));}).then(function () {return _this15.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: r }) : s(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }]);return Be;}(F);var He = { init: function init(e) {var t = new Be(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var We, ze;function Ve(_ref14) {var e = _ref14.name,t = _ref14.data,n = _ref14.spaceId,s = _ref14.provider;We || (We = C(), ze = { ak: p, p: "android" === O ? "a" : "i", ut: x(), uuid: D() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = n,a = { tencent: "t", aliyun: "a" }[s];{var _e16 = Object.assign({}, ze, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: We, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e16)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e17 = q.getStorageSync("uni_id_token") || q.getStorageSync("uniIdToken");_e17 && (r.uniIdToken = _e17);}return r;}function Je(_ref15) {var _this16 = this;var e = _ref15.name,t = _ref15.data;var n = this.localAddress,s = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {q.request({ method: "POST", url: i, data: { name: e, platform: h, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,n = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref18) {var n = _ref18.code,s = _ref18.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e18 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e18), new Error(_e18);}case "SWITCH_TO_CLOUD":break;default:{var _e19 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e19), new Error(_e19);}}return _this16._originCallFunction({ name: e, data: t });}return new Promise(function (n, s) {var i = Ve({ name: e, data: t, provider: _this16.config.provider, spaceId: o });q.request({ method: "POST", url: a, data: { provider: r, platform: h, param: i }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? s(new P({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : n({ result: t });}, fail: function fail(e) {s(new P({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Ye = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Xe = /[\\^$.*+?()[\]{}|]/g,Ge = RegExp(Xe.source);function Qe(e, t, n) {return e.replace(new RegExp((s = t) && Ge.test(s) ? s.replace(Xe, "\\$&") : s, "g"), n);var s;}function Ze(_ref20) {var e = _ref20.functionName,t = _ref20.result,n = _ref20.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _s7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s7, "[/").concat(n, "-request]"));}}function et(e) {var t = e.callFunction,n = function n(e) {var _this17 = this;var n = e.name;e.data = Ve({ name: n, data: e.data, provider: this.config.provider, spaceId: this.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, e).then(function (e) {return Ze.call(_this17, { functionName: n, result: e, logPvd: s }), Promise.resolve(e);}, function (t) {return Ze.call(_this17, { functionName: n, result: t, logPvd: s }), t && t.message && (t.message = function () {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref21$message = _ref21.message,e = _ref21$message === void 0 ? "" : _ref21$message,_ref21$extraInfo = _ref21.extraInfo,t = _ref21$extraInfo === void 0 ? {} : _ref21$extraInfo,_ref21$formatter = _ref21.formatter,n = _ref21$formatter === void 0 ? [] : _ref21$formatter;for (var _s8 = 0; _s8 < n.length; _s8++) {var _n$_s = n[_s8],_r3 = _n$_s.rule,_o2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Qe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Qe(_c, "{".concat(_e21, "}"), t[_e21]);}switch (i) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: Ye, extraInfo: { functionName: n } })), Promise.reject(t);});};e.callFunction = function (t) {var s;return u && e.debugInfo && !e.debugInfo.forceRemote && d ? (e._originCallFunction || (e._originCallFunction = n), s = Je.call(this, t)) : s = n.call(this, t), Object.defineProperty(s, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), s;};}var tt = Symbol("CLIENT_DB_INTERNAL");function nt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = tt, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {return n in e || "string" != typeof n ? e[n] : t.get(e, n, s);} });}function st(e) {switch (o(e)) {case "array":return e.map(function (e) {return st(e);});case "object":return e._internalType === tt || Object.keys(e).forEach(function (t) {e[t] = st(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function rt() {var e = q.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(atob(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}var ot = t(n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function r(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function o(e, t, _ref22) {var s = _ref22.onChooseFile,r = _ref22.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var r = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var o = t.tempFiles,i = o.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!o.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = o[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, r);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? o(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: o, extension: i, success: function success(t) {e(r(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? o(e, function (e) {var t = e.camera,n = e.compressed,o = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,o = t.size,i = t.height,a = t.width;e(r({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : o(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(r(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var it = "manual";function at(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === it) return;var n = !1;var s = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (s.push(e[_r4]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$getone = _ref23.getone,e = _ref23$getone === void 0 ? !1 : _ref23$getone,t = _ref23.success,n = _ref23.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,r = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var o = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n4;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database();var s = t.action || this.action;s && (n = n.action(s));var r = t.collection || this.collection;n = Array.isArray(r) ? (_n4 = n).collection.apply(_n4, _toConsumableArray(r)) : n.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (n = n.where(o));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var h = t.orderby || this.orderby;h && (n = n.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (l - 1)).limit(d).get(m), n;} } };}function ct(_x30, _x31) {return _ct.apply(this, arguments);}function _ct() {_ct = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var n, _e28, s;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {q.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context32.sent;return _context32.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _ct.apply(this, arguments);}var ut = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var n = !1 !== e.debugFunction && u && ("h5" === h && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === h);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: n }));break;case "aliyun":t = L.init(Object.assign(e, { useDebugFunction: n }));break;case "private":t = He.init(Object.assign(e, { useDebugFunction: n }));break;default:throw new Error("未提供正确的provider参数");}var s = l;u && s && !s.code && (t.debugInfo = s);var r = Promise.resolve();var o;o = 1, r = new Promise(function (e, t) {setTimeout(function () {e();}, o);}), t.isReady = !1, t.isDefault = !1;var i = t.auth();t.initUniCloud = r.then(function () {return i.getLoginState();}).then(function (e) {return e ? Promise.resolve() : i.signInAnonymously();}).then(function () {if (u && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e22 = _t$debugInfo.address,_n5 = _t$debugInfo.servePort;return function () {var _ref24 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var n, _s9, _r5;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_s9 = 0;case 1:if (!(_s9 < e.length)) {_context31.next = 11;break;}_r5 = e[_s9];_context31.next = 5;return ct(_r5, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}n = _r5;return _context31.abrupt("break", 11);case 8:_s9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: n, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref24.apply(this, arguments);};}()(_e22, _n5);}return Promise.resolve();}).then(function () {var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref25.address,n = _ref25.port;if (!u) return Promise.resolve();if (e) t.localAddress = e, t.localPort = n;else if (t.debugInfo) {var _e23 = console["app-plus" === h ? "error" : "warn"];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _e23("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs")) : _e23("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs");}}).then(function () {return function () {if (!u || "h5" !== h) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === p) return;uni.setStorageSync("__LAST_DCLOUD_APPID", p), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) {"quickapp-native" === h ? (O = "android", uni.getStorage({ key: "__DC_CLOUD_UUID", success: function success(t) {b = t.data ? t.data : U(32), e();} })) : setTimeout(function () {O = uni.getSystemInfoSync().platform, b = uni.getStorageSync("__DC_CLOUD_UUID") || U(32), e();}, 0);});}).then(function () {t.isReady = !0;}), et(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this20 = this;var n;return n = this.isReady ? Promise.resolve() : this.initUniCloud, n.then(function () {return t.call(_this20, e);});};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {};var n = {};function s(_ref26) {var s = _ref26.action,r = _ref26.command,o = _ref26.multiCommand;return S(k("database", "invoke")).then(function () {return e.callFunction({ name: "DCloud-clientDB", data: { action: s, command: r, multiCommand: o } });}).then(function (e) {var _e$result = e.result,s = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,c = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (c) for (var _e24 = 0; _e24 < c.length; _e24++) {var _c$_e = c[_e24],_t10 = _c$_e.level,_n6 = _c$_e.message,_s10 = _c$_e.detail,_r6 = console["app-plus" === h && "warn" === _t10 ? "error" : _t10] || console.log;var _o3 = "[System Info]" + _n6;_s10 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s10)), _r6(_o3);}if (s) {var _e25 = new a(r, s);return n.error && n.error.forEach(function (t) {t(_e25);}), Promise.reject(_e25);}o && i && (t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), n.refreshToken && n.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}));var u = e.result.affectedDocs;return "number" == typeof u && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), u;} }), S(k("database", "success"), e).then(function () {return S(k("database", "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {var t = new a(e.message, e.code || "SYSTEM_ERROR");return n.error && n.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), S(k("database", "fail"), e).then(function () {return S(k("database", "complete"), e);}).then(function () {return Promise.reject(e);});});}this.isDefault && (n = m("_globalUniCloudDatabaseCallback"));var r = /*#__PURE__*/function () {function r(e, t) {_classCallCheck(this, r);this.content = e, this.prevStage = t, this.udb = null;}_createClass(r, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: st(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),r = this.getCommand();return r.$db.push({ $method: e, $param: st(t) }), s({ action: n, command: r });} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _n7 = e.content.$method;if ("aggregate" === _n7 || "pipeline" === _n7) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return c({ $method: "count", $param: st(Array.from(arguments)) }, e);};} }, { key: "multiSend", get: function get() {} }]);return r;}();var o = ["db.Geo", "db.command", "command.aggregate"];function i(e, t) {return o.indexOf("".concat(e, ".").concat(t)) > -1;}function c(e, t) {return nt(new r(e, t), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), i(n, t) ? c({ $method: t }, e) : function () {return c({ $method: t, $param: st(Array.from(arguments)) }, e);};} });}function u(_ref27) {var e = _ref27.path,t = _ref27.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var l = { auth: { on: function on(e, n) {t[e] = t[e] || [], t[e].indexOf(n) > -1 || t[e].push(n);}, off: function off(e, n) {t[e] = t[e] || [];var s = t[e].indexOf(n);-1 !== s && t[e].splice(s, 1);} }, on: function on(e, t) {n[e] = n[e] || [], n[e].indexOf(t) > -1 || n[e].push(t);}, off: function off(e, t) {n[e] = n[e] || [];var s = n[e].indexOf(t);-1 !== s && n[e].splice(s, 1);}, env: nt({}, { get: function get(e, t) {return { $env: t };} }), Geo: nt({}, { get: function get(e, t) {return u({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, multiSend: function multiSend() {var e = Array.from(arguments);return s({ multiCommand: e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };}) }).then(function (t) {for (var _n8 = 0; _n8 < e.length; _n8++) {var _s11 = e[_n8];_s11.udb && "function" == typeof _s11.udb.setResult && _s11.udb.setResult(t.result.dataList[_n8]);}return Promise.resolve(t);}, function (t) {for (var _n9 = 0; _n9 < e.length; _n9++) {var _s12 = e[_n9];_s12.udb && "function" == typeof _s12.udb.setResult && _s12.udb.setResult(t);}return Promise.reject(t);});}, get serverDate() {return u({ path: [], method: "serverDate" });}, get RegExp() {return u({ path: [], method: "RegExp" });} },d = nt(l, { get: function get(e, t) {return i("db", t) ? c({ $method: t }) : function () {return c({ $method: t, $param: st(Array.from(arguments)) });};} });return this._database = d, d;};}(t), function (e) {e.getCurrentUserInfo = rt, e.chooseAndUploadFile = ot.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return at(e);} });}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {t[e] && (t[e] = T(t[e], e));}), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = d;var t = {};if (1 === e.length) t = e[0], ut = ut.init(t), ut.isDefault = !0;else {var _t11 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var _n10;_n10 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : f ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t11.forEach(function (e) {ut[e] = function () {return console.error(_n10), Promise.reject(new P({ code: "SYS_ERR", message: _n10 }));};});}Object.assign(ut, { get mixinDatacom() {return at(ut);} }), ut.addInterceptor = w, ut.removeInterceptor = v, u && "h5" === h && (window.uniCloud = ut);}})();var ht = ut;var _default2 = ht;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 68:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/guid.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 680:
/*!********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/pages.json?{"type":"stat"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__3D360AE" };exports.default = _default;

/***/ }),

/***/ 69:
/*!*************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/color.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 70:
/*!*****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/type2icon.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 71:
/*!*******************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/randomArray.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 72:
/*!***************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/addUnit.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 59));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 729:
/*!*************************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatDate = formatDate;exports.friendlyDate = friendlyDate; // yyyy-MM-dd hh:mm:ss.SSS 所有支持的类型
function pad(str) {var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  str += '';
  while (str.length < length) {
    str = '0' + str;
  }
  return str.slice(-length);
}

var parser = {
  yyyy: function yyyy(dateObj) {
    return pad(dateObj.year, 4);
  },
  yy: function yy(dateObj) {
    return pad(dateObj.year);
  },
  MM: function MM(dateObj) {
    return pad(dateObj.month);
  },
  M: function M(dateObj) {
    return dateObj.month;
  },
  dd: function dd(dateObj) {
    return pad(dateObj.day);
  },
  d: function d(dateObj) {
    return dateObj.day;
  },
  hh: function hh(dateObj) {
    return pad(dateObj.hour);
  },
  h: function h(dateObj) {
    return dateObj.hour;
  },
  mm: function mm(dateObj) {
    return pad(dateObj.minute);
  },
  m: function m(dateObj) {
    return dateObj.minute;
  },
  ss: function ss(dateObj) {
    return pad(dateObj.second);
  },
  s: function s(dateObj) {
    return dateObj.second;
  },
  SSS: function SSS(dateObj) {
    return pad(dateObj.millisecond, 3);
  },
  S: function S(dateObj) {
    return dateObj.millisecond;
  } };


// 这都n年了iOS依然不认识2020-12-12，需要转换为2020/12/12
function getDate(time) {
  if (time instanceof Date) {
    return time;
  }
  switch (typeof time) {
    case 'string':
      {
        // 2020-12-12T12:12:12.000Z、2020-12-12T12:12:12.000
        if (time.indexOf('T') > -1) {
          return new Date(time);
        }
        return new Date(time.replace(/-/g, '/'));
      }
    default:
      return new Date(time);}

}

function formatDate(date) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd hh:mm:ss';
  if (!date && date !== 0) {
    return '';
  }
  date = getDate(date);
  var dateObj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds() };

  var tokenRegExp = /yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/;
  var flag = true;
  var result = format;
  while (flag) {
    flag = false;
    result = result.replace(tokenRegExp, function (matched) {
      flag = true;
      return parser[matched](dateObj);
    });
  }
  return result;
}

function friendlyDate(time, _ref)



{var _ref$locale = _ref.locale,locale = _ref$locale === void 0 ? 'zh' : _ref$locale,_ref$threshold = _ref.threshold,threshold = _ref$threshold === void 0 ? [60000, 3600000] : _ref$threshold,_ref$format = _ref.format,format = _ref$format === void 0 ? 'yyyy/MM/dd hh:mm:ss' : _ref$format;
  if (!time && time !== 0) {
    return '';
  }
  var localeText = {
    zh: {
      year: '年',
      month: '月',
      day: '天',
      hour: '小时',
      minute: '分钟',
      second: '秒',
      ago: '前',
      later: '后',
      justNow: '刚刚',
      soon: '马上',
      template: '{num}{unit}{suffix}' },

    en: {
      year: 'year',
      month: 'month',
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      ago: 'ago',
      later: 'later',
      justNow: 'just now',
      soon: 'soon',
      template: '{num} {unit} {suffix}' } };


  var text = localeText[locale] || localeText.zh;
  var date = getDate(time);
  var ms = date.getTime() - Date.now();
  var absMs = Math.abs(ms);
  if (absMs < threshold[0]) {
    return ms < 0 ? text.justNow : text.soon;
  }
  if (absMs >= threshold[1]) {
    return formatDate(date, format);
  }
  var num;
  var unit;
  var suffix = text.later;
  if (ms < 0) {
    suffix = text.ago;
    ms = -ms;
  }
  var seconds = Math.floor(ms / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  switch (true) {
    case years > 0:
      num = years;
      unit = text.year;
      break;
    case months > 0:
      num = months;
      unit = text.month;
      break;
    case days > 0:
      num = days;
      unit = text.day;
      break;
    case hours > 0:
      num = hours;
      unit = text.hour;
      break;
    case minutes > 0:
      num = minutes;
      unit = text.minute;
      break;
    default:
      num = seconds;
      unit = text.second;
      break;}


  if (locale === 'en') {
    if (num === 1) {
      num = 'a';
    } else {
      unit += 's';
    }
  }

  return text.template.replace(/{\s*num\s*}/g, num + '').replace(/{\s*unit\s*}/g, unit).replace(/{\s*suffix\s*}/g,
  suffix);
}

/***/ }),

/***/ 73:
/*!**************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/random.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 74:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/trim.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 75:
/*!*************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/toast.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 76:
/*!*****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/getParent.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 77:
/*!***************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/$parent.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 78:
/*!***********************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/sys.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 79:
/*!****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/debounce.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 80:
/*!****************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/function/throttle.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 81:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/config/config.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-03-17
var version = '1.8.4';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 82:
/*!************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uview-ui/libs/config/zIndex.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 845:
/*!*********************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 895:
/*!**************************************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-file-picker/components/uni-file-picker/choose-and-upload-file.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.chooseAndUploadFile = chooseAndUploadFile;exports.uploadCloudFiles = uploadCloudFiles;

var ERR_MSG_OK = 'chooseAndUploadFile:ok';
var ERR_MSG_FAIL = 'chooseAndUploadFile:fail';

function chooseImage(opts) {var

  count =



  opts.count,_opts$sizeType = opts.sizeType,sizeType = _opts$sizeType === void 0 ? ['original', 'compressed'] : _opts$sizeType,_opts$sourceType = opts.sourceType,sourceType = _opts$sourceType === void 0 ? ['album', 'camera'] : _opts$sourceType,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res, 'image'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseImage:fail', ERR_MSG_FAIL) });

      } });

  });
}

function chooseVideo(opts) {var

  camera =




  opts.camera,compressed = opts.compressed,maxDuration = opts.maxDuration,_opts$sourceType2 = opts.sourceType,sourceType = _opts$sourceType2 === void 0 ? ['album', 'camera'] : _opts$sourceType2,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseVideo({
      camera: camera,
      compressed: compressed,
      maxDuration: maxDuration,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {var

        tempFilePath =




        res.tempFilePath,duration = res.duration,size = res.size,height = res.height,width = res.width;
        resolve(normalizeChooseAndUploadFileRes({
          errMsg: 'chooseVideo:ok',
          tempFilePaths: [tempFilePath],
          tempFiles: [
          {
            name: res.tempFile && res.tempFile.name || '',
            path: tempFilePath,
            size: size,
            type: res.tempFile && res.tempFile.type || '',
            width: width,
            height: height,
            duration: duration,
            fileType: 'video',
            cloudPath: '' }] },

        'video'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseVideo:fail', ERR_MSG_FAIL) });

      } });

  });
}

function chooseAll(opts) {var

  count =

  opts.count,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    var chooseFile = uni.chooseFile;
    if (typeof wx !== 'undefined' &&
    typeof wx.chooseMessageFile === 'function') {
      chooseFile = wx.chooseMessageFile;
    }
    if (typeof chooseFile !== 'function') {
      return reject({
        errMsg: ERR_MSG_FAIL + ' 请指定 type 类型，该平台仅支持选择 image 或 video。' });

    }
    chooseFile({
      type: 'all',
      count: count,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseFile:fail', ERR_MSG_FAIL) });

      } });

  });
}

function normalizeChooseAndUploadFileRes(res, fileType) {
  res.tempFiles.forEach(function (item, index) {
    if (!item.name) {
      item.name = item.path.substring(item.path.lastIndexOf('/') + 1);
    }
    if (fileType) {
      item.fileType = fileType;
    }
    item.cloudPath =
    Date.now() + '_' + index + item.name.substring(item.name.lastIndexOf('.'));
  });
  if (!res.tempFilePaths) {
    res.tempFilePaths = res.tempFiles.map(function (file) {return file.path;});
  }
  return res;
}

function uploadCloudFiles(files) {var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;var _onUploadProgress = arguments.length > 2 ? arguments[2] : undefined;
  files = JSON.parse(JSON.stringify(files));
  var len = files.length;
  var count = 0;
  var self = this;
  return new Promise(function (resolve) {
    while (count < max) {
      next();
    }

    function next() {
      var cur = count++;
      if (cur >= len) {
        !files.find(function (item) {return !item.url && !item.errMsg;}) && resolve(files);
        return;
      }
      var fileItem = files[cur];
      var index = self.files.findIndex(function (v) {return v.uuid === fileItem.uuid;});
      fileItem.url = '';
      delete fileItem.errMsg;

      uniCloud.
      uploadFile({
        filePath: fileItem.path,
        cloudPath: fileItem.cloudPath,
        fileType: fileItem.fileType,
        onUploadProgress: function onUploadProgress(res) {
          res.index = index;
          _onUploadProgress && _onUploadProgress(res);
        } }).

      then(function (res) {
        fileItem.url = res.fileID;
        fileItem.index = index;
        if (cur < len) {
          next();
        }
      }).
      catch(function (res) {
        fileItem.errMsg = res.errMsg || res.message;
        fileItem.index = index;
        if (cur < len) {
          next();
        }
      });
    }
  });
}





function uploadFiles(choosePromise, _ref)


{var onChooseFile = _ref.onChooseFile,onUploadProgress = _ref.onUploadProgress;
  return choosePromise.
  then(function (res) {
    if (onChooseFile) {
      var customChooseRes = onChooseFile(res);
      if (typeof customChooseRes !== 'undefined') {
        return Promise.resolve(customChooseRes).then(function (chooseRes) {return typeof chooseRes === 'undefined' ?
          res : chooseRes;});
      }
    }
    return res;
  }).
  then(function (res) {
    if (res === false) {
      return {
        errMsg: ERR_MSG_OK,
        tempFilePaths: [],
        tempFiles: [] };

    }
    return res;
  });
}

function chooseAndUploadFile()

{var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: 'all' };
  if (opts.type === 'image') {
    return uploadFiles(chooseImage(opts), opts);
  } else
  if (opts.type === 'video') {
    return uploadFiles(chooseVideo(opts), opts);
  }
  return uploadFiles(chooseAll(opts), opts);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 679)["default"]))

/***/ }),

/***/ 896:
/*!*********************************************************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/uni_modules/uni-file-picker/components/uni-file-picker/utils.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get_file_data = exports.get_file_info = exports.get_files_and_is_max = exports.get_extname = exports.get_file_ext = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 62));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * 获取文件名和后缀
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {String} name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */
var get_file_ext = function get_file_ext(name) {
  var last_len = name.lastIndexOf('.');
  var len = name.length;
  return {
    name: name.substring(0, last_len),
    ext: name.substring(last_len + 1, len) };

};

/**
    * 获取扩展名
    * @param {Array} fileExtname
    */exports.get_file_ext = get_file_ext;
var get_extname = function get_extname(fileExtname) {
  if (!Array.isArray(fileExtname)) {
    var extname = fileExtname.replace(/(\[|\])/g, '');
    return extname.split(',');
  } else {
    return fileExtname;
  }
  return [];
};

/**
    * 获取文件和检测是否可选
    */exports.get_extname = get_extname;
var get_files_and_is_max = function get_files_and_is_max(res, _extname) {
  var filePaths = [];
  var files = [];
  if (!_extname || _extname.length === 0) {
    return {
      filePaths: filePaths,
      files: files };

  }
  res.tempFiles.forEach(function (v) {
    var fileFullName = get_file_ext(v.name);
    var extname = fileFullName.ext.toLowerCase();
    if (_extname.indexOf(extname) !== -1) {
      files.push(v);
      filePaths.push(v.path);
    }
  });
  if (files.length !== res.tempFiles.length) {
    uni.showToast({
      title: "\u5F53\u524D\u9009\u62E9\u4E86".concat(res.tempFiles.length, "\u4E2A\u6587\u4EF6 \uFF0C").concat(res.tempFiles.length - files.length, " \u4E2A\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E"),
      icon: 'none',
      duration: 5000 });

  }

  return {
    filePaths: filePaths,
    files: files };

};


/**
    * 获取图片信息
    * @param {Object} filepath
    */exports.get_files_and_is_max = get_files_and_is_max;
var get_file_info = function get_file_info(filepath) {
  return new Promise(function (resolve, reject) {
    uni.getImageInfo({
      src: filepath,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
};
/**
    * 获取封装数据
    */exports.get_file_info = get_file_info;
var get_file_data = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(files) {var type,fileFullName,extname,filedata,imageinfo,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'image';
            // 最终需要上传数据库的数据
            fileFullName = get_file_ext(files.name);
            extname = fileFullName.ext.toLowerCase();
            filedata = {
              name: files.name,
              uuid: files.uuid,
              extname: extname || '',
              cloudPath: files.cloudPath,
              fileType: files.fileType,
              url: files.path || files.path,
              size: files.size, //单位是字节
              image: {},
              path: files.path,
              video: {} };if (!(

            type === 'image')) {_context.next = 14;break;}_context.next = 7;return (
              get_file_info(files.path));case 7:imageinfo = _context.sent;
            delete filedata.video;
            filedata.image.width = imageinfo.width;
            filedata.image.height = imageinfo.height;
            filedata.image.location = imageinfo.path;_context.next = 15;break;case 14:

            delete filedata.image;case 15:return _context.abrupt("return",

            filedata);case 16:case "end":return _context.stop();}}}, _callee);}));return function get_file_data(_x) {return _ref.apply(this, arguments);};}();exports.get_file_data = get_file_data;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 9:
/*!*******************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/variable/global.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";














































var _website = _interopRequireDefault(__webpack_require__(/*! @/common/variable/website.js */ 10));
var _imgPath = _interopRequireDefault(__webpack_require__(/*! @/common/variable/imgPath.js */ 11));

var _publicfunc = _interopRequireDefault(__webpack_require__(/*! @/common/function/publicfunc.js */ 12));
var _changeobjectecordname = _interopRequireDefault(__webpack_require__(/*! @/common/function/changeobjectecordname.js */ 13));
var _filterobject = _interopRequireDefault(__webpack_require__(/*! @/common/function/filterobject.js */ 14));
var _login = _interopRequireDefault(__webpack_require__(/*! @/common/function/login.js */ 15));
var _merchant = _interopRequireDefault(__webpack_require__(/*! @/common/function/merchant.js */ 22));
var _repair = _interopRequireDefault(__webpack_require__(/*! @/common/function/repair.js */ 25));
var _repairOrderFunction = _interopRequireDefault(__webpack_require__(/*! @/common/function/repairOrderFunction.js */ 28));

var _grids = _interopRequireDefault(__webpack_require__(/*! @/common/data/grids.js */ 29));
var _compent_params = _interopRequireDefault(__webpack_require__(/*! @/common/data/compent_params.js */ 30));
var _my_list = _interopRequireDefault(__webpack_require__(/*! @/common/data/my_list.js */ 31));
var _rules = _interopRequireDefault(__webpack_require__(/*! @/common/data/rules.js */ 32));
var _status = _interopRequireDefault(__webpack_require__(/*! @/common/data/status.js */ 33));
var _merchant2 = _interopRequireDefault(__webpack_require__(/*! @/common/data/merchant.js */ 34));
var _problem = _interopRequireDefault(__webpack_require__(/*! @/common/data/problem.js */ 35));
var _order = _interopRequireDefault(__webpack_require__(/*! @/common/data/order.js */ 36));
var _msg = _interopRequireDefault(__webpack_require__(/*! @/common/data/msg.js */ 981));

var _loginstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/loginstorage.js */ 16));
var _organstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/organstorage.js */ 18));
var _userstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/userstorage.js */ 19));
var _staffstorage = _interopRequireDefault(__webpack_require__(/*! @/common/storage/staffstorage.js */ 20));

var _img = _interopRequireDefault(__webpack_require__(/*! @/common/request/img.js */ 37));
var _login2 = _interopRequireDefault(__webpack_require__(/*! @/common/request/login.js */ 38));
var _user = _interopRequireDefault(__webpack_require__(/*! @/common/request/user.js */ 39));
var _merchant3 = _interopRequireDefault(__webpack_require__(/*! @/common/request/merchant.js */ 21));
var _department = _interopRequireDefault(__webpack_require__(/*! @/common/request/department.js */ 40));
var _staff = _interopRequireDefault(__webpack_require__(/*! @/common/request/staff.js */ 41));
var _msg2 = _interopRequireDefault(__webpack_require__(/*! @/common/request/msg.js */ 42));
var _industry = _interopRequireDefault(__webpack_require__(/*! @/common/request/industry.js */ 43));
var _area = _interopRequireDefault(__webpack_require__(/*! @/common/request/area.js */ 44));
var _mchCustomer = _interopRequireDefault(__webpack_require__(/*! @/common/request/mchCustomer.js */ 45));
var _product = _interopRequireDefault(__webpack_require__(/*! @/common/request/product.js */ 46));
var _category = _interopRequireDefault(__webpack_require__(/*! @/common/request/category.js */ 47));
var _brand = _interopRequireDefault(__webpack_require__(/*! @/common/request/brand.js */ 48));
var _model = _interopRequireDefault(__webpack_require__(/*! @/common/request/model.js */ 49));
var _device = _interopRequireDefault(__webpack_require__(/*! @/common/request/device.js */ 26));
var _repairorder = _interopRequireDefault(__webpack_require__(/*! @/common/request/repairorder.js */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                     * 全局变量
                                                                                                                                                                                     * @autho 陆彦捷 
                                                                                                                                                                                     * @description  全局变量的引用文件
                                                                                                                                                                                     * @property {String} website 请求的地址
                                                                                                                                                                                     * @property {Object} static 图片的路径
                                                                                                                                                                                     * // 方法类
                                                                                                                                                                                     * @property {Object} publicF 一些通用的方法
                                                                                                                                                                                     * @property {Object} changeobjF 格式化数据
                                                                                                                                                                                     * @property {Object} filterobjF 过滤obj值
                                                                                                                                                                                     * @property {Object} loginF 登录公共方法 
                                                                                                                                                                                     * @property {Object} merchantF 组织、门店、部门的公共方法
                                                                                                                                                                                     * @property {Object} repairF 报障的公共方法 
                                                                                                                                                                                     * @property {Object} repairOrderF 工单公共方法
                                                                                                                                                                                     * // 测试数据
                                                                                                                                                                                     * @property {Object} grids 目录或功能索引的宫格
                                                                                                                                                                                     * @property {Object} params 一些组件的常用参数
                                                                                                                                                                                     * @property {Object} mylist 我的页面-列表
                                                                                                                                                                                     * @property {Object} rules 验证规则
                                                                                                                                                                                     * @property {Object} merchant 组织
                                                                                                                                                                                     * @property {Object} problems 常见问题
                                                                                                                                                                                     * @property {Object} orders 工单信息
                                                                                                                                                                                     * // 本地缓存
                                                                                                                                                                                     * @property {Object} login 登录:本地登录缓存数据的设置或获取方法集合
                                                                                                                                                                                     * @property {Object} organ 组织：本地组织缓存数据的设置或获取方法集合
                                                                                                                                                                                     * @property {Object} user 个人：本地个人缓存数据的设置或获取方法集合
                                                                                                                                                                                     * @property {Object} staff 员工：本地个人缓存数据的设置或获取方法集合
                                                                                                                                                                                     * // 页面请求
                                                                                                                                                                                     * @property {Object} imgR 图片
                                                                                                                                                                                     * @property {Object} login 登录等请求
                                                                                                                                                                                     * @property {Object} userR 用户
                                                                                                                                                                                     * @property {Object} merchantR 请求组织/商户/门店
                                                                                                                                                                                     * @property {Object} departmentR 部门
                                                                                                                                                                                     * @property {Object} staffR 员工
                                                                                                                                                                                     * @property {Object} msgR 通知 
                                                                                                                                                                                     * @property {Object} industryR 行业
                                                                                                                                                                                     * @property {Object} areaR 地区
                                                                                                                                                                                     * @property {Object} mchCustomerR 客户
                                                                                                                                                                                     * @property {Object} categoryR 分类 
                                                                                                                                                                                     * @property {Object} brandR 品牌 
                                                                                                                                                                                     * @property {Object} modelR  型号
                                                                                                                                                                                     * @property {Object} productR 产品 
                                                                                                                                                                                     * @property {Object} deviceR 设备 
                                                                                                                                                                                     * @property {Object} repairOrderR 工单 
                                                                                                                                                                                     */ // import i18n from ''
// 存放请求服务器地址
// static的相对路径
// 方法类
// 一些公用的方法
// 格式化值
// 过滤obj值
// 登录公用方法
// 组织的宫格方法
// 报障的公共方法
// 工单公用方法
// 测试数据
// 宫格的列表内容
// 组件参数
// 我的页面列表
// 验证规则
// 申请状态
// 组件
// 常见问题
// 工单信息
// 请求数据
// 本地缓存
// 登录
// 组织
// 人员
// 员工
// 页面请求事件
// 图片请求
// 登录等请求
// 用户
// 组织、商户、门店
// 部门
// 员工
// 通知请求
// 行业
// 地区
// 客户请求
// 产品请求
// 分类
// 品牌
// 型号
// 设备
// 工单
module.exports = { maxrequest: 10, // 连续请求最多次数10次
  website: _website.default.website, // 映射修改
  statics: _imgPath.default, // 相对static路径
  // 方法类
  publicF: _publicfunc.default, // 公用的方法
  changeobjF: _changeobjectecordname.default, // 格式化值
  filterobjF: _filterobject.default, // 过滤obj值
  loginF: _login.default, // 登录公用方法
  merchantF: _merchant.default, // 组织的公共方法
  repairF: _repair.default, // 报障的公共方法
  repairOrderF: _repairOrderFunction.default, // 工单公用方法
  // 测试数据
  grids: _grids.default, // 目录或功能索引的宫格
  params: _compent_params.default, // 参数
  mylist: _my_list.default, // 我的页面-列表
  rules: _rules.default, // 验证规则
  status: _status.default, // 申请状态
  merchants: _merchant2.default, // 组织
  problems: _problem.default, // 常见问题
  orders: _order.default, // 工单信息
  messages: _msg.default, // 消息
  // 页面的storage及其引用
  login: _loginstorage.default, // 登录地址
  organ: _organstorage.default, // 组织
  user: _userstorage.default, // 个人
  staff: _staffstorage.default, // 员工
  // 页面的请求事件
  imgR: _img.default, // 图片请求
  loginR: _login2.default, // 登录等请求
  userR: _user.default, // 用户
  merchantR: _merchant3.default, // 组织、商户、门店
  departmentR: _department.default, // 部门
  staffR: _staff.default, // 员工
  msgR: _msg2.default, // 通知
  industryR: _industry.default, // 行业
  areaR: _area.default, // 地区
  mchCustomerR: _mchCustomer.default, // 客户
  categoryR: _category.default, // 分类
  brandR: _brand.default, // 品牌
  modelR: _model.default, // 型号信息
  productR: _product.default, // 产品请求
  deviceR: _device.default, // 设备信息
  repairOrderR: _repairorder.default // 工单
};

/***/ }),

/***/ 981:
/*!************************************************************************!*\
  !*** D:/MyRepository/App/Uni-App/AftersveClientApp/common/data/msg.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 *  消息列表的模拟数据
 */
module.exports = {
  merchant_invited: [{
    Id: 1,
    MsgId: 1,
    MchName: '福州的客户公司',
    FromName: '小王',
    Msg: '福州的客户公司邀请您加入，是否同意？' },

  {
    Id: 2,
    MsgId: 2,
    MchName: '福州的服务商',
    FromName: '小王',
    Msg: '福州的服务商邀请您加入，是否同意？' },

  {
    Id: 3,
    MsgId: 3,
    MchName: '福州的客户',
    FromName: '小王',
    Msg: '福州的客户邀请您加入，是否同意？' }] };

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map