const log = require('./log_util');
const JWT = require('./jwt');

//全局方法和对象
module.exports = function (){
	global.version = '0.0.1';
	//成功返回
	global.showS = function(data=''){
		return {code:1002,data:data};
	}
	//失败返回
	global.showE = function(data=''){
		return {code:1001,data:data};
	}
	//手动打印操作日志
	global.logA = function(ctx,sql,time=0){
		log.Act(ctx,sql,time);
	}
	//手动打印错误日志
	global.logE = function(ctx,data,time=0){
		log.Err(ctx,data,time);
	}
	//手动解析token
	global.checkToken = function(token){
		return JWT.checkToken(token);
	}
	//手动生成token
	global.createToken = function(data){
		return JWT.createToken(data,1);
	}

}