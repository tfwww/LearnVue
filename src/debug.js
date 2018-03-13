var _ = require('./util')
var objectAgu = require('./observer/object-augmentations')
var arrayAgu = require('./observer/array-augmentations')
var Observer = require('./observer/observer')

var obj = {}
var ob = Observer.create(obj)
ob.init()
obj.test = 'value'



