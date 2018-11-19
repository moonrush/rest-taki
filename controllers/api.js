let rt_hello = async (ctx, next) => {
    ctx.response.body = 'Hello World';
}
let test_get = async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
        products: [
            {
                name: 'Nora',
                age: 18,
            }, {
                name: 'Taki',
                age: 29,
            }
        ]
    };
}

let test_post = async (ctx, next) => {
    ctx.response.type = 'application/json';
    let p = {
        name: ctx.request.body.name,
        age: ctx.request.body.age
    };
    ctx.response.body = p;
}
// cmd test
// curl -H "Content-Type: application/json" -X POST -d "{\"name\":\"XBox\",\"age\":3999}" http://localhost:3000/api/persons

let test_monk = async (ctx, next) => {
    ctx.response.type = 'application/json';
    const db = require('monk')('localhost/test');
    const test = db.get('test');
    let docs = await test.find();
    ctx.response.body = docs;
}

module.exports = {
    'GET /': rt_hello,
    'GET /api/persons': test_get,
    'POST /api/persons': test_post,
    'GET /api/monk': test_monk,
}