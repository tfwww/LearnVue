var _ = require('./util')
var objectAgu = require('./observer/object-augmentations')
var arrayAgu = require('./observer/array-augmentations')
var Observer = require('./observer/observer')

var obj = {test: 'old'}
var ob = new Observer(obj)
// ob.init()
// ob.on('set', setLog)

// obj.test = 'new'
// function setLog() {
//     log('set')
// }

// log('ob', ob)



