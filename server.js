/* node:true */
var express = require('express'),
	Q = require("Q"),
	fs = require('fs');

/**
* Server start
*/
function start(data) {
	var app = express();

	tempDataReference = data;

	//serve lib files that are supported in node
	app.use('/_js/lib/', express.static(__dirname + '/node_modules/'));

	//set session cookie | http://expressjs.com/api.html#cookieSession
	//app.use(express.cookieSession());

	//serve static files | http://expressjs.com/api.html#app.use
	app.use(express.static(__dirname + '/app'));

	//logger
	app.use(express.logger('dev'));

	//handle root
	app.get('/', function(req, res){
		res.sendfile('app/index.html');
	});

	//handle data calls
	app.get('/data/:PName', data.getData);
	app.post('/data/:PName/:Type/:Description', data.tempPost);
	app.put('/data/:PName/:Type/:Description', data.tempPut);
	app.delete('/data/:PName', data.tempDel);

	app.listen(8080);

	console.log("Server has started.");
}


exports.start = start;