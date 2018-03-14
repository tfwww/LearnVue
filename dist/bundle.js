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
var _ = require('./util')
var objectAgu = require('./observer/object-augmentations')
var arrayAgu = require('./observer/array-augmentations')
var Observer = require('./observer/observer')

var obj = {test: 'old'}
var ob = new Observer(obj)
ob.init()
ob.on('set', setLog)

obj.test = 'new'
function setLog() {
    log('set')
}
log('ob', ob)


},{"./observer/array-augmentations":13,"./observer/object-augmentations":14,"./observer/observer":15,"./util":16}],8:[function(require,module,exports){
/**
 * Simple event emitter based on component/emitter.
 *
 * @constructor
 * @param {Object} ctx - the context to call listners with.
 */

function Emitter(ctx) {
    this._ctx = ctx || this
}

var p = Emitter.prototype

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 */

p.on = function (event, fn) {
    this._cbs = this._cbs || {}
        ;(this._cbs[event] = this._cbs[event] || [])
            .push(fn)
    // 等价于以下两行
    // this._cbs[event] = this._cbs[event] || []
    // this._cbs[event].push(fn)
    return this
}

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 */

p.once = function (event, fn) {
    var self = this
    this._cbs = this._cbs || {}

    function on() {
        self.off(event, on)
        fn.apply(this, arguments)
    }

    on.fn = fn
    this.on(event, on)
    return this
}

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 */

p.off = function (event, fn) {
    this._cbs = this._cbs || {}

    // all
    // 所有事件
    if (!arguments.length) {
        this._cbs = {}
        return this
    }

    // specific event
    var callbacks = this._cbs[event]
    if (!callbacks) return this

    // remove all handlers
    if (arguments.length === 1) {
        delete this._cbs[event]
        return this
    }

    // remove specific handler
    var cb
    for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i]
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1)
            break
        }
    }
    return this
}

/**
 * The internal, faster emit with fixed amount of arguments
 * using Function.call.
 *
 * @param {Object} event
 * @return {Emitter}
 */

p.emit = function (event, a, b, c) {
    this._cbs = this._cbs || {}
    var callbacks = this._cbs[event]

    if (callbacks) {
        callbacks = callbacks.slice(0)
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].call(this._ctx, a, b, c)
        }
    }

    return this
}

/**
 * The external emit using Function.apply, used
 * by Vue instance event methods.
 *
 * @param {Object} event
 * @return {Emitter}
 */

p.applyEmit = function (event) {
    this._cbs = this._cbs || {}
    var callbacks = this._cbs[event], args

    if (callbacks) {
        callbacks = callbacks.slice(0)
        args = callbacks.slice.call(arguments, 1)
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].apply(this._ctx, args)
        }
    }

    return this
}

module.exports = Emitter
},{}],9:[function(require,module,exports){
exports.$get = function() {
    
}

exports.$set = function() {
    
}

exports.$watch = function() {
    
}

exports.$unwatch = function() {
    
}
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
;['emit', 'on', 'off', 'once'].forEach(function(method) {
    exports[method] = function() {
        
    }
})

exports.$broadcast = function() {
    
}

exports.$dispatch = function() {
    
}
},{}],12:[function(require,module,exports){
exports.$mount = function() {
    
}

exports.$destroy = function() {
    
}
},{}],13:[function(require,module,exports){
var _ = require('../util')
var slice = [].slice
var arrayAugmentations = Object.create(Array.prototype)

    /**
     * Intercept mutating methods and emit events
     */

    ;[
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ]
        .forEach(function (method) {
            // cache original method
            var original = Array.prototype[method]
            // define wrapped method
            _.define(arrayAugmentations, method, function () {
                var args = slice.call(arguments)
                var result = original.apply(this, args)
                var ob = this.$observer
                var inserted, removed

                switch (method) {
                    case 'push':
                    case 'unshift':
                        inserted = args
                        break
                    case 'pop':
                    case 'shift':
                        removed = [result]
                        break
                    case 'splice':
                        inserted = args.slice(2)
                        removed = result
                        break
                }

                ob.link(inserted)
                ob.unlink(removed)
                // empty path, value is the Array itself
                ob.emit('mutate', [], this, {
                    method: method,
                    args: args,
                    result: result,
                    inserted: inserted,
                    removed: removed
                })
            })
        })

/**
 * Swap the element at the given index with a new value
 * and emits corresponding event.
 *
 * @param {Number} index
 * @param {*} val
 * @return {*} - replaced element
 */

_.define(arrayAugmentations, '$set', function (index, val) {
    if (index >= this.length) {
        this.length = index + 1
    }
    return this.splice(index, 1, val)[0]
})

/**
 * Convenience method to remove the element at given index.
 *
 * @param {Number} index
 * @param {*} val
 */

_.define(arrayAugmentations, '$remove', function (index) {
    if (index > -1) {
        return this.splice(index, 1)[0]
    }
})
},{"../util":16}],14:[function(require,module,exports){
var _ = require('../util')
var objectAgumentations = Object.create(Object.prototype)

/**
 * Add a new property to an observed object
 * and emits corresponding event
 *
 * @param {String} key
 * @param {*} val
 * @public
 */

_.define(objectAgumentations, '$add', function (key, val) {
    if (this.hasOwnProperty(key)) return
    this[key] = val
    this.$observer.convert(key, val)
    this.$observer.emit('add', key, val)
})

/**
 * Deletes a property from an observed object
 * and emits corresponding event
 *
 * @param {String} key
 * @public
 */

_.define(objectAgumentations, '$delete', function (key) {    
    if (!this.hasOwnProperty(key)) return
    // trigger set events
    this[key] = undefined
    delete this[key]
    this.$observer.emit('delete', key)
})

module.exports = objectAgumentations
},{"../util":16}],15:[function(require,module,exports){
var _ = require('../util')
var Emitter = require('../emitter')
var arrayAugmentations = require('./array-augmentations')
var objectAugmentations = require('./object-augmentations')

/**
 * Type enums
 */

var ARRAY = 0
var OBJECT = 1

/**
 * Observer class that are attached to each observed
 * object. Observers can connect to each other like nodes
 * to map the hierarchy of data objects. Once connected,
 * detected change events can propagate up the nested chain.
 *
 * The constructor can be invoked without arguments to
 * create a value-less observer that simply listens to
 * other observers.
 *
 * @constructor
 * @extends Emitter
 * @param {Array|Object} [value]
 * @param {Number} [type]
 */

function Observer(value, type) {
    Emitter.call(this)
    this.value = value
    this.type = type
    this.initiated = false
    this.adaptors = Object.create(null)
    if (value) {
        _.define(value, '$observer', this)
    }
}

var p = Observer.prototype = Object.create(Emitter.prototype)

/**
 * Simply concatenating the path segments with `.` cannot
 * deal with keys that happen to contain the dot.
 *
 * Instead of the dot, we use the backspace character
 * which is much less likely to appear in property keys.
 */

var delimiter = Observer.pathDelimiter = '\b'

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 *
 * @param {*} value
 * @return {Observer|undefined}
 * @static
 */

Observer.create = function (value) {
    if (value && value.$observer) {
        return value.$observer
    } if (_.isArray(value)) {
        return new Observer(value, ARRAY)
    } else if (_.isObject(value)) {
        return new Observer(value, OBJECT)
    }
}

/**
 * Initialize the observation based on value type.
 * Should only be called once.
 */

p.init = function () {
    var value = this.value
    if (this.type === ARRAY) {
        _.augment(value, arrayAugmentations)
        this.link(value)
    } else if (this.type === OBJECT) {
        _.augment(value, objectAugmentations)
        this.walk(value)
    }
    this.initiated = true
}

/**
 * Walk through each property, converting them and adding them as child.
 * This method should only be called when value type is Object.
 *
 * @param {Object} obj
 */

p.walk = function (obj) {
    var key, val
    for (key in obj) {
        val = obj[key]
        this.observe(key, val)
        this.convert(key, val)
    }
}

/**
 * If a property is observable,
 * create an Observer for it and add it as a child.
 * This method is called only on properties observed
 * for the first time.
 *
 * @param {String} key
 * @param {*} val
 */

p.observe = function (key, val) {
    var ob = Observer.create(val)
    if (ob) {
        this.add(key, ob)
        if (ob.initiated) {
            this.deliver(key, val)
        } else {
            ob.init()
        }
    }
    // emit an initial set event
    this.emit('set', key, val)
    if (_.isArray(val)) {
        this.emit('set', key + delimiter + 'length', val.length)
    }
}

/**
 * Unobserve a property.
 * If it has an observer, remove it from children.
 *
 * @param {String} key
 * @param {*} val
 */

p.unobserve = function (key, val) {
    if (val && val.$observer) {
        this.remove(key, val.$observer)
    }
}

/**
 * Convert a tip value into getter/setter so we can emit
 * the events when the property is accessed/changed.
 * Properties prefixed with `$` or `_` are ignored.
 *
 * @param {String} key
 * @param {*} val
 */

p.convert = function (key, val) {
    var prefix = key.charAt(0)
    if (prefix === '$' || prefix === '_') {
        return
    }
    var ob = this
    Object.defineProperty(this.value, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            ob.emit('get', key)
            return val
        },
        set: function (newVal) {
            if (newVal === val) return
            ob.unobserve(key, val)
            ob.observe(key, newVal)
            val = newVal
        }
    })
}

/**
 * Link a list of items to the observer's value Array.
 * When any of these items emit change event, the Array will be notified.
 * This method should only be called when value type is Array.
 *
 * @param {Array} items
 */

p.link = function (items) {

}

/**
 * Unlink the items from the observer's value Array.
 *
 * @param {Array} items
 */

p.unlink = function (items) {

}

/**
 * Walk through an already observed object and emit its tip values.
 * This is necessary because newly observed objects emit their values
 * during init; for already observed ones we can skip the initialization,
 * but still need to emit the values.
 *
 * @param {String} key
 * @param {*} val
 */

p.deliver = function (key, val) {

}

/**
 * Add a child observer for a property key,
 * capture its get/set/mutate events and relay the events
 * while prepending a key segment to the path.
 *
 * @param {String} key
 * @param {Observer} ob
 */

p.add = function (key, ob) {
    var self = this
    var base = key + delimiter
    var adaptors = this.adaptors[key] = {}

    adaptors.get = function (path) {
        path = base + path
        self.emit('get', path)
    }

    adaptors.set = function (path, val) {
        path = base + path
        self.emit('set', path, val)
    }

    adaptors.mutate = function (path, val, mutation) {
        // if path is empty string, the mutation
        // comes directly from an Array
        path = path
            ? base + path
            : key
        self.emit('mutate', path, val, mutation)
        // also emit for length
        self.emit('set', path + delimiter + 'length', val.length)
    }

    ob.on('get', adaptors.get)
        .on('set', adaptors.set)
        .on('mutate', adaptors.mutate)
}

/**
 * Remove a child observer.
 *
 * @param {String} key
 * @param {Observer} ob
 */

p.remove = function (key, ob) {
    var adaptors = this.adaptors[key]
    this.adaptors[key] = null
    ob.off('get', adaptors.get)
        .off('set', adaptors.set)
        .off('mutate', adaptors.mutate)
}

module.exports = Observer
},{"../emitter":8,"../util":16,"./array-augmentations":13,"./object-augmentations":14}],16:[function(require,module,exports){
/**
 * Mix properties into target object.
 *
 * @param {Object} target
 * @param {Object} mixin
 */

exports.mixin = function (target, mixin) {
    for (var key in mixin) {
        if (target[key] !== mixin[key]) {
            target[key] = mixin[key]
        }
    }
}

/**
 * Object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

exports.isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

exports.isArray = function (obj) {
    return Array.isArray(obj)
}

/**
 * Define a non-enumerable property
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 */

exports.define = function (obj, key, val) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: false,
        writable: true,
        configurable: true
    })
}

/**
 * Augment an target Object or Array by either
 * intercepting the prototype chain using __proto__,
 * or copy over property descriptors
 *
 * @param {Object|Array} target
 * @param {Object} proto
 */

if ('__proto__' in {}) {
    exports.augment = function (target, proto) {
        target.__proto__ = proto
    }
} else {
    exports.augment = function (target, proto) {
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            var descriptor = Object.getOwnPropertyDescriptor(proto, key)
            Object.defineProperty(target, key, descriptor)
        })
    }
}
},{}],17:[function(require,module,exports){
var _        = require('./util')
var Compiler = require('./compiler/compiler')
var debug = require('./debug')

/**
 * The exposed Vue constructor.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */

function Vue (options) {
  this._compiler = new Compiler(this, options)
}

/**
 * Mixin instance methods
 */

var p = Vue.prototype
_.mixin(p, require('./instance/lifecycle'))
_.mixin(p, require('./instance/data'))
_.mixin(p, require('./instance/dom'))
_.mixin(p, require('./instance/events'))

/**
 * Mixin asset registers
 */

_.mixin(Vue, require('./api/asset-register'))

/**
 * Static methods
 */

Vue.config   = require('./api/config')
Vue.use      = require('./api/use')
Vue.require  = require('./api/require')
Vue.extend   = require('./api/extend')
Vue.nextTick = require('./util').nextTick

module.exports = Vue
},{"./api/asset-register":1,"./api/config":2,"./api/extend":3,"./api/require":4,"./api/use":5,"./compiler/compiler":6,"./debug":7,"./instance/data":9,"./instance/dom":10,"./instance/events":11,"./instance/lifecycle":12,"./util":16}]},{},[17]);
