var Vue = require('../src/main.js')
var expect = require('chai').expect

describe('Element', function () {
    it('should have a variable', function () {        
        expect(Vue).to.be.equal(123);        
    })
})