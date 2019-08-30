const Router = require('koa-router');
const user = new Router();
const mysql = require('mysql'); //导入mysql模块

// /user
user.get('/',async (ctx,next)=>{
	console.log('这是User逻辑')
	let token = global.checkToken(ctx.request.query.token);
	ctx.response.body = token;
	await next()
	console.log('这是User逻辑执行完成')
})

// /user/list
user.get('/list',async (ctx,next)=>{
	console.log('/user/list')
	ctx.response.body = 'list';
	await next()
})

module.exports = user;