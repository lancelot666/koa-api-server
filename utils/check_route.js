//jwt封装方法
const JWT = require('./jwt');
//路由配置
const router_list = require('../config/router_list');
const FreeRoute = router_list['FreeRoute'];
//公共方法和参数
require('./common')(); 

module.exports = function(ctx,next){
    try{
      //当前url不需要校验时，直接跳转
      if(FreeRoute.indexOf(ctx.request.path) > -1){ 
        return global.showS('无需验证!');;
      }
      const req = ctx.request;
      let token = '';
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