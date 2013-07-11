var express = require('express'),
	Q = require("Q"),
	fs = require('fs');


function readFile(filePath) {
	//'data/transactions.json'
	var deferred = Q.defer();
	fs.readFile(filePath, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(new Error(error));
		}
		else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}

function start() {
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
	app.use('/data/transactions.json', function(req, res){
		readFile('data/transactions.json').then(
			function (value) {
				res.send(value);
			},
			function (error) {
				res.send(500, { error : 'Error: ' + error });
			}
		);
		//res.sendfile('data/transactions.json');
	});

	app.listen(8080);
	console.log("Server has started.");
}


exports.start = start;