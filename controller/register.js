const Router = require('koa-router');
const register = new Router();
const JWT = require('../utils/jwt');

const mysql = require('mysql'); //导入模块


// 注册
register.get('/',async (ctx,next)=>{
	if(!ctx.request.query.name) return ctx.response.body = global.showE('用户名不能为空');
	if(!ctx.request.query.psd) return ctx.response.body = global.showE('用户密码不能为空');
	let token = JWT.createToken({name:ctx.request.query.name,psd:ctx.request.query.psd});
	console.log(token);
	return ctx.response.body = global.showS(token);

})

// /register/list
register.get('/list',async (ctx,next)=>{
	console.log('/register/list')
	ctx.response.body = 'list';
	await next()
})

module.exports = register;