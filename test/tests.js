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

// var app = Seed.create({
//     id: 'test',
//     // template
//     scope: {
//         'msg.wow': 'wow',
//         hello: 'helloL',
//         changeMessage: function () {
//             app.scope['msg.wow'] = 'hola'
//         },
//         remove: function () {
//             app.destroy()
//         },
//         todos: [
//             {
//                 title: 'make this shit work',
//                 done: false
//             },
//             {
//                 title: 'make this shit kinda work',
//                 done: true
//             }
//         ]
//     }
// })


Seed.filter('money', function (value) {
    return '$' + value.toFixed(2)
})

// define a seed
var Todos = Seed.extend({
    id: 0,
    changeMessage: function () {
        this.scope['msg.wow'] = 'hola'
    },
    remove: function () {
        this.destroy()
    }
})

var todos = new Todos('#test', {
    total     : 1000,
    'msg.wow' : 'wow',
    hello     : 'hello',
    todos     : [
        {
            title: 'make this shit work',
            done: false
        },
        {
            title: 'make this shit kinda work',
            done: true
        }
    ]
})