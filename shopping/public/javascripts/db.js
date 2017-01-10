var mysql = require('mysql');
var connection = mysql.createConnection({
	   host     : 'localhost',
	   user     : 'root',
	   password : 'ravi',
	   database : 'jabong'
	 });
	 

connection.connect(function(err) {
    if (err) {
    	console.log("connection err");
    	throw err;}
});

	 module.exports = connection;