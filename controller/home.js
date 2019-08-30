const Router = require('koa-router');
const home = new Router();
const mysql = require('mysql'); //导入模块
const db = require('../mysql/db');

// /home
home.get('/',async(ctx,next)=>{
	var start = new Date();
	var ms;
	try{
		let sql = 'select id from tc_school where id IN (?,?,?)';
		let val = [2,3,4];
		let res = await db.query(sql,val); 
		ctx.response.body = global.showS(res);
		await next(); 
		//global.logA(ctx,sql,new Date() - start);	
	}catch(err){
		global.logE(ctx,err,new Date() - start);
		ctx.response.body= global.showE(err.message);
	}

})

// /home/list
home.get('/list',async (ctx,next)=>{
	console.log('/home/list')
	ctx.response.body = 'list';
	await next()
})

module.exports = home;