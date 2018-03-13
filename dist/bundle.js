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
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],7:[function(require,module,exports){
function Binding() {
    
}

module.exports = Binding
},{}],8:[function(require,module,exports){
function Compiler() {
    
}

module.exports = Compiler
},{}],9:[function(require,module,exports){
module.exports = {}
},{}],10:[function(require,module,exports){
function Directive() {
    
}

module.exports = Directive
},{}],11:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],12:[function(require,module,exports){
exports.$get = function(path) {
    
}

exports.$set = function(path, val) {
    
}

exports.$watch = function(key, cb) {
    
}

exports.$unwatch = function(id) {
    
}
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
;['emit', 'on', 'off', 'once'].forEach(function(method) {
    exports[method] = function() {
        
    }
})

exports.$broadcast = function() {
    
}

exports.$dispatch = function() {
    
}
},{}],15:[function(require,module,exports){
exports.$mount = function(el) {
    
}

exports.$destroy = function() {
    
}
},{}],16:[function(require,module,exports){
var debug = true
var log = debug ? console.log.bind(console) : function() {}
},{}],17:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],18:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],19:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],20:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],21:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],22:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],23:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],24:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],25:[function(require,module,exports){
module.exports = 123
},{}],26:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],27:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],28:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],29:[function(require,module,exports){
// common utils

exports.mixin = function(target, mixin) {
    for (var key in mixin) {
        if (target[key] !== mixin[key]) {
            target[key] = mixin[key]
        }
    }
}
},{}],30:[function(require,module,exports){
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
log('vue p', p)
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
},{"./api/asset-register":1,"./api/config":2,"./api/extend":3,"./api/require":4,"./api/use":5,"./compiler/compiler":8,"./instance/data":12,"./instance/dom":13,"./instance/events":14,"./instance/lifecycle":15,"./util":29}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
