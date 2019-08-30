const Router = require('koa-router');
const model = new Router();
const mysql = require('mysql'); //导入模块
const crypto = require('../utils/crypto');





// url:/model
model.get('/',async (ctx,next)=>{
	let token = crypto({a:'aa'},1);
	let rtoken = crypto(token);
	return ctx.response.body = global.showS({token:token,rtoken:rtoken});

})

// url:model/test
model.get('/test',async(ctx,next)=>{
	return ctx.response.body = global.showS('test');
})


module.exports = model;