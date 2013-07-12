var events = require('events'),
	Q = require("Q"),
	fs = require('fs'),

	dataLocation = 'data/transactions.json',
	dataStore = null;


/**
* Read a file from the system. Returns a deferred.
*/
var readFile = function (filePath) {
	var deferred = Q.defer();

	dataStore = null;

	fs.readFile(filePath, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(new Error(error));
		}
		else {
			dataStore = JSON.parse(text);
			deferred.resolve(text);
		}
	});
	return deferred.promise;
};

/**
* Upon a sucussful read of data
*/
var readDataSuccess = function (value) {
	//parse the json into memory
};

/**
* requests
*/
exports.getData = function (req, res) {
	if (dataStore !== null) {
		res.send(JSON.stringify(dataStore));
		return true;
	}
	else {
		return readFile(dataLocation).then(
			function (value) {
				res.send(value);
			},
			function (error) {
				res.send(500, { error : 'Error: ' + error });
			}
		);
	}
};