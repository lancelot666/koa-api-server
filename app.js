const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const fs = require('fs');
//post解析参数中间件
const bodyParser = require('koa-bodyparser');
//跨域中间件
const cors = require('koa2-cors');
//jwt封装方法
const JWT = require('./utils/jwt');
//路由拦截封装方法
const checkRoute = require('./utils/check_route');

//公共方法和参数
require('./utils/common')();     
//日志配置
const log = require('./utils/log_util');  
//路由配置
const router_list = require('./config/router_list');
const FreeRoute = router_list['FreeRoute'];

//启用解析Post请求参数中间件
app.use(bodyParser())
//启用跨域中间件
app.use(cors());


//启用日志
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();
    //ms = new Date() - start;
    //记录响应日志(所有请求都会自动记录)
    //log.Res(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    log.Err(ctx, error.data, ms); 
  }
});

// 通过 router 加载所有路由
let controller = fs.readdirSync(__dirname + '/controller');
controller.forEach((element) => {
    let module = require(__dirname + '/controller/' + element)
    /*
      controller 下面的每个文件负责一个特定的功能，分开管理
      通过 fs.readdirSync 读取 controller 目录下的所有文件名，挂载到 router 上面
    */
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})

//启动路由
app.use(router.routes())

// 判断url是否有效和是否在免验证列表
app.use(async (ctx,next)=>{
  try{
    //如果路由无效，返回错误信息
    if(ctx.status==404) return ctx.response.body = global.showE('url错误：Not Found');
    //路由匹配成功，检查是否属于免验证
    let verify = checkRoute(ctx,next);
    //token解析失败，返回错误信息
    if(verify.code!=1002) return ctx.response.body = verify;
    //token解析成功或免验证，进入下一步
    await next();
  }catch(err){
    return ctx.response.body = global.showE(err);
  }
})


app.listen(3000);
console.log('server start...')