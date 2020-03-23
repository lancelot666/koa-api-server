const Router = require('koa-router');
const test = new Router();
const mysql = require('mysql'); //导入模块
const crypto = require('../utils/crypto');
// const redis = require('../utils/redis');




// //test
// test.get('/',async (ctx,next)=>{
// 	let get =await redis.get(ctx.query.key);
// 	return ctx.response.body = get;//global.showS({token:token,rtoken:rtoken});

// })
// test.get('/set',async (ctx,next)=>{
// 	let set = await redis.set(ctx.query.key,ctx.query.val,ctx.query.exp);
// 	return ctx.response.body = set;//global.showS({token:token,rtoken:rtoken});

// })
// test.get('/del',async (ctx,next)=>{
// 	let del = await redis.del(ctx.query.key);
// 	return ctx.response.body = del;//global.showS({token:token,rtoken:rtoken});

// })


module.exports = test;