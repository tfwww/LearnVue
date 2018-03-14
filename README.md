# LearnVue
Learn Vue from the commits

## commit 1 init
- 配置 git ignore 文件

## commit 2 setup unit testing
- 配置测试框架，主要用的 karma

## commit 3 scaffolding
- 配置个功能模块，主要是文件目录的设置
- 我自己加了一些方便调试的工具
1. 主要是 [log.js](https://github.com/wmzhong/LearnVue/blob/master/dist/log.js)
2. 配置了 Browsersync 和 browserify 打包工具

## commit 4 setup build
- 设置 jshint

## commit 5 more files
- 添加说明文档等

## commit 6 working on new observer
- 添加观察者

## commit 7 _.define
- 在 [util.js](https://github.com/wmzhong/LearnVue/blob/master/src/util.js) 添加方法，定义一个不可迭代，只读的对象属性

## commit 8 working on observer
- 添加了观察者
- 重新封装定义对象和数组

## commit 9 observer object
- 完善观察者功能
```
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
```
在 Observer 对象里，当对象属性值有变动时候，通过 emit 自定义事件通知
在观察者模式中，有两种数据结构的处理方式，一种是针对对象，另一种是针对数组

## commit 10 use \\b as delimiter
- 退格作为分隔符
