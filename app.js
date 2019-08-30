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
//全局公共方法和参数
require('./utils/common')();    
//独立封装的function
const func = require('./utils/function');


//启用日志(封装了url无效处理),同时捕捉全局错误
app.use(async (ctx, next) => {
  try{
    await func.startLog(ctx,next)
  }catch(err){
    //全局错误捕捉
    return ctx.response.body = global.showE(err);
  }
});

//启用解析Post请求参数中间件
app.use(bodyParser())

//启用跨域中间件
app.use(cors());

// 路由拦截:判断当前url是否在免验证列表,不在则验证token是否有效
app.use(async (ctx,next)=>{ await func.routerAuth(ctx,next) })

// 通过 router 加载所有路由文件
let controller = fs.readdirSync(__dirname + '/controller');
controller.forEach(async(element) => {
    let module = require(__dirname + '/controller/' + element)
    //controller 下面的每个文件负责一个特定的功能，分开管理
    //通过 fs.readdirSync 读取 controller 目录下的所有文件名，挂载到 router 上面   
    router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})

//通过路由拦截后:启动路由匹配
app.use(router.routes())

// 根路由重定向到/home
app.use(async(ctx,next)=>{
  if(ctx.request.url==='/'||ctx.request.url===''){
    router.get('/', ctx.response.redirect('/home'));
  }
  await next();
});

app.listen(3000);
console.log('server start in port 3000 ...')