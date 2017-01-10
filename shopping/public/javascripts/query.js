var db = require('./db');
var exports = module.exports = {};


exports.getMenItems = function(next){
	sql = "select * from items";
	console.log(sql);
	db.query(sql,function(err,result){
		if(err)console.log(err);
		else next(null,result);
	});
}
exports.deleteAllItemOfBag = function(next){
	sql = "delete from bagitems";
	console.log(sql);
	db.query(sql,function(err,result){
		if(err)console.log(err);
		else next(null,result);
	});
}
exports.getItem = function(id,next){
	sql = "select * from items where id = "+id;
	console.log(sql);
	db.query(sql,function(err,result){
		if(err)console.log(err);
		else next(null,result);
	});
}
exports.updateItemWithNewQty = function(itemid,qty,next){
	sql = "update bagitems set qty="+qty+" where itemid = "+itemid;
	console.log(sql);
	db.query(sql,function(err,result){
		if(err)console.log(err);
		else next(null,result);
	});
}

exports.removeFromCart = function(itemid,next){
	sql = "delete from bagitems where itemid = "+itemid;
	console.log(sql);
	db.query(sql,function(err,result){
		if(err)console.log(err);
		else next(null,result);
	});
}
exports.addToCart = function(itemid,size,qty,sessionid,next){
	var post  = {id: null, itemid: itemid, size:size,qty:qty,sessionid:sessionid,deltime:"14 Jan 2017"};
	var query = db.query('insert into bagitems SET ?', post, function(err, result) {
	  if(err){
		  console.log(err);
	  }else{
		  next(null,result);
	   }
	  
	});
};

exports.showCartItems = function(sessionId,next){
	sql ="SELECT i.id,i.imageurl,i.title,i.description,b.qty,b.size,i.op,b.deltime,i.up,i.disc FROM bagitems AS b JOIN items AS i ON b.itemid = i.id WHERE b.sessionid='"+ sessionId +"'";
	console.log(sql);
	db.query(sql,function(err,result){
		if(err)console.log(err);
		else next(null,result);
	});
}