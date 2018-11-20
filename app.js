const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const https = require('https');
const options = require('./ssl/ssl');

app.use(bodyParser());

app.use(async (ctx, next) => {
    console.log(`--Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(controller());

// app.listen(3000);
https.createServer(options,app.callback()).listen(3000);
console.log('app started at port 3000...');
