# koa-api-server
###一个配搭Mysql、redis、JWT、路由拦截、日志功能的nodejs服务  

####安装/启动：

```
npm install  
nodemon app.js
```
<br/>
####使用教程：
#####创建接口示例:
localhost:3000/model
localhost:3000/model/list

#####步骤一：在controller文件夹中新建文件model.js,代码如下：
```
const Router = require('koa-router');  
const model = new Router();

//接收get请求访问/model
model.get('/',async (ctx,next)=>{  
	return ctx.response.body = 'url is : /model , method is : GET';  
})

//接收post请求访问/model/list  
model.post('/list',async(ctx,next)=>{
	return ctx.response.body = 'url is : /model/list , method is : POST';  
})  

module.exports = model;  
```

  
  

   
#####步骤二：在config文件夹的router_list.js中解除对/model的路由拦截,代码如下：
```
module.exports = {
	//免验证路由
	FreeRoute: [
	'/',
	'/favicon.ico',
	'/login',
	'/login/test2',
	'/register',
	'/model'		//把/model写到免拦截列表，不去校验用户身份
	]
};
```


#####步骤三：地址栏访问：localhost:3000/model
<br/>
####配置项：
1、mysql文件夹中配置数据库。
2、utils文件夹中配置：
 (1) ****check-route.js**** --- 路由拦截方法。(默认以token拦截)  
 (2) ****log_util.js**** --- 日志功能配置。(默认主动捕捉sql错误)  
 (3) ****jwt.js**** --- token生成与校验方法。  
 (4) ****crypto.js**** --- 对jwt载荷加密方法。  
 (5) ****common.js**** --- 全局方法和变量。  
 (6) ****function.js**** --- 个人封装的方法。  
 (7) ****redis.js**** --- 对redis封装的方法。  
<br/>
###author：
####Lancelot666
<br/>
