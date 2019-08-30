const db = {};
const mysql = require('mysql'); //导入模块

const pool  = mysql.createPool({  
  	connectionLimit : 10,  
  	host:'localhost',
   	user:'post',
   	port: '3306',
   	password:'123456',
   	database:'test1'
}); 


//sql为查询语句字符串，val为占位符
db.query = async function(sql='',val=[], callback){ 
  	 
  	return new Promise(( resolve, reject ) => {
  		if (!sql) {  
	  		reject('sql error:sql empty!');  
	  	} 
  		pool.getConnection(function(err,conn){
	  		if(err){
		   		reject(err);
		  	}else{
		   		conn.query(sql,val,function(qerr,vals,fields){
		   			if ( qerr ) {
			            reject(qerr);
			          } else {
			            resolve(vals);	//global.showS
			          }
		    		//释放连接
		    		conn.release();
		   		});
		  	}
  		}) 
  	});
}  

module.exports = db;