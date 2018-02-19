# LearnVue
Learn Vue from the commits

## commit 1 

## commit 2 rename and core code

#### 先从入口看起
```
<div id="test">
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{msg}}</p>
    <p>{{what}}</p>
    <p>{{hey}}</p>
</div>

var app = new Element('test', {
    msg: 'hello winter test'
})

```

1. 元素 id test 标识，在此 dom 节点下做插入动作

2. 解析 dom 结构，通过 {{}} 标记提取变量

    `el.innerHTML.replace(/\{\{(.*)\}\}/g, markToken)`

3. 通过 bind 函数实现 dom 与数据层绑定

``` 
function bind(variable) {
    bindings[variable].els = el.querySelectorAll('[' + bindingMark + '="' + variable + '"]')
    ;[].forEach.call(bindings[variable].els, function(e) {
        // log('e', e)
        e.removeAttribute(bindingMark)
    })
    // 此处是双向绑定的核心
    Object.defineProperty(data, variable, {
        set: function(newVal) {
            [].forEach.call(bindings[variable].els, function(e) {
                // 连接 dom 和数据
                bindings[variable].value = newVal
                e.textContent = newVal
            })
        },
        get: function() {
            return bindings[variable].value
        }
    })
}
```


