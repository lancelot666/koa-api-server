const md5 = require('js-md5');		//npm i js-md5
const sha1 = require('js-sha1');	//npm i js-sha1

//生成随机整数
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//生成随机大写字母,n为个数
function chr(n=1){
	var result = [];
	for(var i=0;i<n;i++){
		//生成一个0到25的数字
   		var ranNum = Math.ceil(Math.random() * 25);
		//大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;
		//然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
    	result.push(String.fromCharCode(65+ranNum));
    }
    return result.join('');
}
//字符串反转
function strrev(str){
	return str.split("").reverse().join("");
}

//对称加密(接收字符串或对象)
module.exports = function(str='',type=0){
	try{
		const strType = Object.prototype.toString.call(str);
		const tag = strType==='[object String]'?1:(strType==='[object Object]'?2:3);
		if(!str||tag==3) return false;

		//加密
		if(type){
			str = tag==1?str:JSON.stringify(str);
			//构造主体
			const base = String(Buffer.from(JSON.stringify({value:str}),'utf-8').toString('base64'));
			//主体长度
			const baseLen = base.length;
			//随机数5~14		
			const rand = random(5,14);
			//拼接长度在3~8位
			const len = base.length<=12?random(3,6):rand%5+4;
			//随机数标识
			const a = rand>9?String(rand).substr(0,1)+chr()+String(rand).substr(1,1):rand;
			//拼接长度标识
			const b = chr()+String(len);
			//参数类型:0~4为字符串，5~9为对象
			const c = tag==1?random(0,4):random(5,9);
			//载荷头部:反转(主体前len位+随机码len位)
			const start = strrev(base.substr(0,len)+md5(str).substr(0,len));
			//载荷尾部:随机码len+主体后len位+a+b
			const end = sha1(str).substr(-len,len)+base.substr(-len,len)+String(a)+String(b)+String(c);
			//载荷主体:反转(主体-主体前len位-主体后len位)
			const body = strrev(base.substr(len).substr(0,baseLen-2*len));
			//输出
			return String(start)+String(body)+String(end);						
		}
		//解密

		//获取字符串长度
		const strLen = str.length;
		//获取参数类型
		const paramType = Number(str.substr(-1,1));
		//获取加密随机数
		const rand = Number(str.substr(-4,1)<5?str.substr(-6,1)+str.substr(-4,1):str.substr(-4,1));
		//获取拼接长度
		const len = Number(str.substr(-2,1));
		//随机数生成符：N或1xN
		const numLen = rand>9?3:1;
		//解密载荷头部
		const start = strrev(str.substr(0,len*2)).substr(0,len);
		//解密载荷尾部
		const end = strrev(strrev(str).substr(numLen+3,len*2)).substr(len,len);
		//解密载荷主体
		const body = strrev(str.substr(len*2,strLen-len*4-numLen-3));
		//解密结果
		const item = Buffer.from(start+body+end,'base64').toString('utf-8');
		let res =  JSON.parse(item).value?JSON.parse(item).value:false;
		//paramType>4为对象
		if(res){res = paramType>4?JSON.parse(res):res;}
		return res;
	}catch(err){
		return false;
	}
}