var Seed = require('../src/main.js')
var expect = require('chai').expect

// describe('Element', function () {
//     it('should have a variable', function () {        
//         expect(Seed).to.be.equal(123);        
//     })
// })

// var app = Seed.create({
//     id: 'test',
//     // template
//     scope: {
//         msg: 'hellowinter',
//         hello: 'WHWHWHW',
//         changeMessage: function () {
//             app.scope.msg = 'hola'
//         }
//     }
// })

var app = Seed.create({
    id: 'test',
    // template
    scope: {
        'msg.wow': 'wow',
        hello: 'hello',
        changeMessage: function () {
            app.scope['msg.wow'] = 'hola'
        },
        remove: function () {
            app.destroy()
        },
        todos: [
            {
                title: 'make this shit work',
                done: false
            },
            {
                title: 'make this shit kinda work',
                done: true
            }
        ]
    }
})