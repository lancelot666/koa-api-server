const path = require('path');

//错误日志输出完整路径
var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//日期日志输出完整路径
var dateLogPath = path.resolve(__dirname, "../logs/date/date");
 

module.exports = {
    appenders: { 
        //打印到控制台
        console: {
            type: 'console',
        },
    	//日期日志
    	log_file: {
    		// 设置类型为 dateFile
            type: 'dateFile',
            // 配置文件名为 myLog.log
            filename: dateLogPath,
            // 指定编码格式为 utf-8
            encoding: 'utf-8',
            // 日志文件按日期（天）切割
            pattern: "yyyy-MM-dd.log",
            // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
            keepFileExt: true,
            // 输出的日志文件名是都始终包含 pattern 日期结尾
            alwaysIncludePattern: true,
            //时间文件 保存多少天，距离当前天daysToKeep以前的log将被删除
            daysToKeep:7,
            //文件最大存储空间（byte）
            maxLogSize : 20971520,
    	},
    	//错误日志
    	error_file: {
    		type: 'dateFile', 
    		filename: errorLogPath,
    		encoding: 'utf-8',
    		pattern: "yyyy-MM-dd.log",
    		keepFileExt: true,
    		alwaysIncludePattern: true,
    		daysToKeep:10,
    		maxLogSize : 20971520,
    	} 
    },
    categories: { 
    	//默认log类型,控制台打印所有log
    	default: { appenders: ['console'], level: 'all' },
        //操作日志,输出info以上的log
        act_log: { appenders: ['log_file'], level: 'info' },
    	//error 等级log 单独输出到error文件中且在控制台打印 任何环境的errorlog 将都以日期文件单独记录
    	error_log:{appenders:['error_file','console'], level:'error'}

    }
}