const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const crypto = require('./crypto');
const key = 'Lancelot';	//秘钥
const exp = 60*60*2;	//过期时间：秒

//jwt+对称加密验证token
module.exports = {
	createToken : function(data){
		//参数1：载荷，参数2：加密秘钥，参数3：options
		return jwt.sign({data:crypto(data,1)}, key, { expiresIn: exp });
	},
	checkToken : function(token){
		try{
			return jwt.verify(token,key, function(err,res){
				//token解析失败时返回false，token过期时，在路由配置判断
				if(err) {
					if(err.name==='TokenExpiredError') return 1001;
					return false;
				}
				res.data = crypto(res.data);
				return res;
			});
		}catch(err){
			return false;
		}
	}
}