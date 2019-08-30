//jwt封装方法
const JWT = require('./jwt');
//路由配置
const FreeRoute = require('../config/router_list')['FreeRoute'];
//公共方法和参数
require('./common')(); 
//获取token的方式,参数中获取或请求头中获取：1/0 --- body/header
const type = 1;

module.exports = function(ctx,next){
    try{
      //当前url不需要校验时，直接跳转
      if(FreeRoute.indexOf(ctx.request.path) > -1){ 
        return global.showS('无需验证!');;
      }
      const req = ctx.request;
      let token = '';
      //从参数中获取token
      if(type){
        if(req.method==='GET'){
          if(!req.query||!req.query.token){
            return global.showE('无权访问!(1)');
          }
          token = req.query.token;
        }else{
          if(!req.body||!req.body.token){
            return global.showE('无权访问!(2)');
          }
          token = req.body.token;
        }
      }
      //从请求头中获取token
      else{
        if(!req.headers.token) return global.showE('无权访问!(3)'); 
        token = req.headers.token;
      }
      
      //解析token
      const expToken = JWT.checkToken(token);
      //token无效
      if(!expToken) return global.showE('身份校验失败!');
      //token超时
      if(expToken===1001) return global.showE('身份信息过期,请重新登录!');
      //解析成功
      return global.showS('身份校验成功!');
      
    }catch(err){
      return global.showE(`服务器错误：${err}`);
    }
}