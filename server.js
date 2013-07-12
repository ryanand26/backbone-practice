var express = require('express'),
	Q = require("Q"),
	fs = require('fs');


/**
* Server start
*/
function start(data) {
	var app = express();

	//serve lib files that are supported in node
	app.use('/_js/lib/', express.static(__dirname + '/node_modules/requirejs/'));

	//serve static files | http://expressjs.com/api.html#app.use
	app.use(express.static(__dirname + '/app'));

	//handle root
	app.get('/', function(req, res){
		res.sendfile('app/index.html');
	});

	//handle data calls
	app.use('/data/', data.getData);

	app.listen(8080);

	console.log("Server has started.");
}


exports.start = start;