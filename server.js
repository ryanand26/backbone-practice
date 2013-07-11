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

	app
		.use('/_js/lib/', express.static(__dirname + '/node_modules/requirejs/'))
		.use(express.static(__dirname + '/app'));

	app.get('/', function(req, res){
		//res.send('Hello Worldy');
		res.sendfile('app/index.html');
	});

	app.get('/data/transactions.json', function(req, res){
		/*readFile('data/transactions.json').then(function (value4) {
			// Do something with value4
				console.log('file success', text);
			},
			function (error) {
				// Handle any error from step1 through step4
				console.log('file fail', text);
			}
		);*/
		res.sendfile('data/transactions.json');
	});

	app.listen(8080);
	console.log("Server has started.");
}


exports.start = start;