
//日志功能
exports.startLog = async(ctx,next)=>{
	//日志配置
	const log = require('./log_util'); 
	//响应开始时间
	const start = new Date();
	//响应间隔时间
	var ms; 
	//开始进入到下一个中间件
	await next();
	//最终处理结果逻辑
	
	try {
	  //通过token校验且路由无效时，返回错误信息
	  if(ctx.response.status!==200) 
	    return ctx.response.body =global.showE(`访问错误：${ctx.response.status} ${ctx.response.message}`);
	  //ms = new Date() - start;
	  //记录响应日志(所有请求都会自动记录)
	  //log.Res(ctx, ms);
	} catch (error) {
	  ms = new Date() - start;
	  //记录异常日志
	  log.Err(ctx, error, ms); 
	  //抛出异常信息
	  throw(error)
	}
}

//路由拦截功能
exports.routerAuth = async(ctx,next)=>{
	//路由拦截封装方法
	const checkRoute = require('./check_route');
    //检查url是否属于免验证
    let verify = checkRoute(ctx,next);
    //token解析失败，抛出错误信息
    if(verify.code!=1002) throw verify.data;
    //token解析成功或免验证，进入下一步
    await next();
}

