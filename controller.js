const fs = require('fs');

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    let files = fs.readdirSync(__dirname + `/${dir}`);
    let jsFiles = files.filter(f => {
        return f.endsWith('.js');
    });

    console.log(`----------------------------`);
    for (let f of jsFiles) {
        console.log(`process controllers in file ${f}...`);
        let mapping = require(__dirname + `/${dir}/` + f);
        addMapping(router, mapping);
    }
    console.log(`----------------------------`);
}

module.exports = dir => {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}



