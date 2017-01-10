var express = require('express');
var router = express.Router();
var query=require('/shopping/public/javascripts/query');
/* GET home page. */
router.get('/', function(req, res) {
	var itemList={};
	type =req.query.type;
	if(type = "menButton"){
		
		itemList["items"] = {};
		query.getMenItems(function(err,rows){
			for (i in rows){
				console.log("first row title----"+rows[i].title+"<br>");
				itemList["items"]["sku"+rows[i].id] = {};
				itemList["items"]["sku"+rows[i].id]["imgurl"] = rows[i].imageurl;
				itemList["items"]["sku"+rows[i].id]["title"] = rows[i].title;
				itemList["items"]["sku"+rows[i].id]["desc"] = rows[i].description;
				itemList["items"]["sku"+rows[i].id]["stock"] = rows[i].stock;
				itemList["items"]["sku"+rows[i].id]["offer"] = rows[i].offer;
				var size = rows[i].size.split(",");
				itemList["items"]["sku"+rows[i].id]["size"] = size;
				itemList["items"]["sku"+rows[i].id]["op"] = rows[i].op;
				itemList["items"]["sku"+rows[i].id]["up"] = rows[i].up;
				itemList["items"]["sku"+rows[i].id]["disc"] = rows[i].disc;
			}
			console.log("ravi-----"+JSON.stringify(itemList));
			res.json({"records":JSON.stringify(itemList)});
		});
	}
});
router.get('/getItem',function(req,res){
	var productId = req.query.productId;
	var itemList={};
	query.getItem(productId,function(err,rows){
		for(i in rows){
			itemList['imgurl'] = rows[i].imageurl;
			itemList['title'] = rows[i].title;
			itemList['desc'] = rows[i].description;
			itemList['stock'] = rows[i].stock;
			itemList['offer'] = rows[i].offer;
			var size = rows[i].size.split(",");
			itemList['size'] = size;
			itemList['op'] = rows[i].op;
			itemList['up'] = rows[i].up;
			itemList['disc'] = rows[i].disc;
		}
		console.log("ravi-----"+JSON.stringify(itemList));
		res.json({"record":JSON.stringify(itemList)});
	});
});


router.get('/addToCart',function(req,res){
	console.log("itemid- "+req.query.itemid+"itemsize- "+req.query.size);
	query.addToCart(req.query.itemid,req.query.size,req.query.qty,req.query.sessionid,function(err,result){
		res.send('Ok');
	});
});

router.get('/removeItem',function(req,res){
	console.log("itemid- "+req.query.productId);
	query.removeFromCart(req.query.productId ,function(err,result){
		res.send('Ok');
	});
});

router.get('/updateItem',function(req,res){
	console.log("itemid- "+req.query.productId+"qty---"+req.query.qty);
	query.updateItemWithNewQty(req.query.productId,req.query.qty ,function(err,result){
		res.send('Ok');
	});
});

router.get('/showCartItems',function(req,res){
	var sessionId = req.query.sessionId;
	var itemList={};
	query.showCartItems(sessionId,function(err,rows){
		itemList["items"] = {};
		for (i in rows){
			console.log("first row title----"+rows[i].title+"<br>");
			itemList["items"]["sku"+rows[i].id] = {};
			itemList["items"]["sku"+rows[i].id]["imgurl"] = rows[i].imageurl;
			itemList["items"]["sku"+rows[i].id]["title"] = rows[i].title;
			itemList["items"]["sku"+rows[i].id]["desc"] = rows[i].description;
			itemList["items"]["sku"+rows[i].id]["qty"] = rows[i].qty;
			itemList["items"]["sku"+rows[i].id]["size"] = rows[i].size;
			itemList["items"]["sku"+rows[i].id]["op"] = rows[i].op;
			itemList["items"]["sku"+rows[i].id]["deltime"] = rows[i].deltime;
			itemList["items"]["sku"+rows[i].id]["up"] = rows[i].up;
			itemList["items"]["sku"+rows[i].id]["disc"] = rows[i].disc;
		}
		console.log("ravi-----"+JSON.stringify(itemList));
		res.json({"records":JSON.stringify(itemList)});
	});
});


router.get('/home',function(req,res){
	query.deleteAllItemOfBag(function(err,result){
		res.render('index1');
	});

});
router.get('/men',function(req,res){
	res.render('men');
});
router.get('/women',function(req,res){
	
	res.render('women');
});

router.get('/carousel',function(req,res){
	res.render('carousel');
});

router.get('/productInformation',function(req,res){
	res.render('productInformation');
});

router.get('/showBagItems',function(req,res){
	res.render('showBagItems');
});
module.exports = router;
