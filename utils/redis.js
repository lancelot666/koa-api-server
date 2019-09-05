//封装redis-api(使用前需要安装并启动redis服务)
const js_redis = require('redis');
const client = js_redis.createClient(6379,'127.0.0.1');	//默认值
const redis = {};

//监听错误
client.on("error", function (err) {
	return new Promise((resolve,reject)=>{
	    console.log("redisError " + err);
	    reject(err);
    })
});

//设置值，exp为过期时间：秒
redis.set = (key,val,exp=0)=>{
	if(!key||!val) return false;
	return new Promise((resolve,reject)=>{
		client.set(key,val,(err,val)=>{
			if(err) reject(err);
		});
		if(exp) client.expire(key,exp);
		resolve(true);
	})
	
}

//get获取值，存在返回值，否则返回false
redis.get = (key)=>{
	if(!key) return false;
	return new Promise((resolve,reject)=>{
		client.get(key,function(err,val){
			if(err) reject(err);
			resolve(!val?false:val);
			
		});
	})
}

//del删除值，成功返回true,失败返回false
redis.del = (key)=>{
	if(!key) return false;
	return new Promise((resolve,reject)=>{
		client.del(key,function(err,val){
			if(err) reject(err);
			resolve(!val?false:true);
		});
	})
}


module.exports = redis;