const Router = require('koa-router');
const login = new Router();
const mysql = require('mysql'); //导入模块
const crypto = require('../utils/crypto');





//login
login.get('/',async (ctx,next)=>{
	let token = crypto({a:'aa'},1);
	let rtoken = crypto(token);
	return ctx.response.body = global.showS({token:token,rtoken:rtoken});

})

// login/test
login.get('/test',async(ctx,next)=>{
	return ctx.response.body = global.showS(112);
})


module.exports = login;