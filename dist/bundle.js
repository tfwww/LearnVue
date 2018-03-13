(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],3:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],6:[function(require,module,exports){
function Compiler() {
    
}

module.exports = Compiler
},{}],7:[function(require,module,exports){
exports.$get = function(path) {
    
}

exports.$set = function(path, val) {
    
}

exports.$watch = function(key, cb) {
    
}

exports.$unwatch = function(id) {
    
}
},{}],8:[function(require,module,exports){
exports.$appendTo = function() {
    
}

exports.$prependTo = function() {
    
}

exports.$before = function() {
    
}

exports.$after = function() {
    
}

exports.$remove = function() {
    
}
},{}],9:[function(require,module,exports){
;['emit', 'on', 'off', 'once'].forEach(function(method) {
    exports[method] = function() {
        
    }
})

exports.$broadcast = function() {
    
}

exports.$dispatch = function() {
    
}
},{}],10:[function(require,module,exports){
exports.$mount = function(el) {
    
}

exports.$destroy = function() {
    
}
},{}],11:[function(require,module,exports){
// common utils

exports.mixin = function(target, mixin) {    
    for (var key in mixin) {
        if (target[key] !== mixin[key]) {
            target[key] = mixin[key]
        }
    }    
}
},{}],12:[function(require,module,exports){
var _        = require('./util'),
Compiler = require('./compiler/compiler')

/**
*  The exposed Vue constructor.
*/
function Vue (options) {
    this._compiler = new Compiler(this, options)
}

// mixin instance methods
var p = Vue.prototype
// 添加实体方法
_.mixin(p, require('./instance/lifecycle'))
_.mixin(p, require('./instance/data'))
_.mixin(p, require('./instance/dom'))
_.mixin(p, require('./instance/events'))



// mixin asset registers
_.mixin(Vue, require('./api/asset-register'))

// static methods
Vue.config    = require('./api/config')
Vue.use       = require('./api/use')
Vue.require   = require('./api/require')
Vue.extend    = require('./api/extend')
Vue.nextTick  = require('./util').nextTick

module.exports = Vue
},{"./api/asset-register":1,"./api/config":2,"./api/extend":3,"./api/require":4,"./api/use":5,"./compiler/compiler":6,"./instance/data":7,"./instance/dom":8,"./instance/events":9,"./instance/lifecycle":10,"./util":11}]},{},[12]);
