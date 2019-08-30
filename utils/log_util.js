//日志配置文件             
const log_config = require('../config/log_config');
const log4js  = require('log4js');
//加载日志配置文件
log4js.configure(log_config);


var log = {};

var errorLogger = log4js.getLogger('error_log');    //对应log_config所设置的categories的子对象
var actLogger = log4js.getLogger('act_log');        //操作日志
var resLogger = log4js.getLogger('defalut');    //默认打印到控制台

//封装错误日志
log.Err = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装请求响应日志（所有请求都会打印）
log.Res = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

//封装操作日志（记录增删改）
log.Act = function (ctx,sql,time) {
    if (ctx) {
        actLogger.info(formatAct(ctx,sql,time));
    }
}

//格式化响应日志
var formatRes = function (ctx, resTime) {
    var logText = new String();

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    return logText;

}

//格式化操作日志
var formatAct = function (ctx,sql,time) {
    var logText = new String();

    //请求客户端ip、原始地址、sql语句、消耗时间
    logText += "ip[" + ctx.request.ip + "]" + " url[" + ctx.request.originalUrl + "]"+ " " + time +'ms';

    //sql语句 
    logText += "\n"+"sql[" + sql + ']' +"\n";

    //请求方法、参数
    if (ctx.request.method !== 'GET') {
        logText += ctx.request.method +" body["+ JSON.stringify(ctx.request.body) + "]";
    }else{
        logText += "GET body[]";
    }

    logText += "\n" + "*************** error log end ***************" + '\n';

    return logText;

}

//格式化错误日志
var formatError = function (ctx, err, resTime) {
    var logText = new String();

    //添加请求日志
    logText += "\n" + formatReqLog(ctx.request, resTime);

    //错误信息
    logText += "\n" + "err message: " + err + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

//格式化请求日志
var formatReqLog = function (req, resTime) {

    var logText = new String();

    //客户端ip
    logText += "ip[" + req.ip + "]";

    //请求原始地址
    logText += " url[" + req.originalUrl + "]" + " " + resTime + 'ms';

    //请求参数
    if (req.method !== 'GET') {
        logText += " body["+ JSON.stringify(req.body) + "]";
    }else{
    	logText += " body[]";
    }

    return logText;
}

module.exports = log;