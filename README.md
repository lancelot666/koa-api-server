# koa-api-server
一个配搭Mysql、redis、JWT、路由拦截、日志功能的nodejs服务  

****安装/启动：****

npm install  
nodemon app.js

****使用教程：****
  
举例：  
访问url:  
http:xxx.com/model/  
http:xxx.com/model/list

  
1、在controller文件夹中新建文件model.js,代码如下：  
  
const Router = require('koa-router');  
const model = new Router();  

  //get方法访问/model
model.get('/',async (ctx,next)=>{  
	return ctx.response.body = 'url is : /model , method is : GET';  
})  
  
  //post方法访问/model/list
model.post('/list',async(ctx,next)=>{
	return ctx.response.body = 'url is : /model/list , method is : POST';  
})  

module.exports = model;  
  

  
2、把 '/model' 写入到 config/router_list.js ,解除/model的路由拦截。  

3、地址栏访问：localhost:3000/model

****配置项：****

1、mysql文件夹中配置数据库。  
  
2、utils文件夹中配置：  
 (1) check-route.js --- 路由拦截方法。(默认以token拦截)  
 (2) log_util.js --- 日志功能配置。(默认主动捕捉sql错误)  
 (3) jwt.js --- token生成与校验方法。  
 (4) crypto.js --- 对jwt载荷加密方法。  
 (5) common.js --- 全局方法和变量。  
 (6) function.js --- 个人封装的方法。  
 (7) redis.js --- 对redis封装的方法。  

****author：****  
Lancelot666



