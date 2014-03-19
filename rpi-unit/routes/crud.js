/**
 * CRUD API Routes
 */

'use strict';

var q = require('q'),
	dbLayer = require('../lib/dbLayer'),
	cryptUtils = require('../lib/cryptUtils'),
	errors = require('../messages/errors');

var handleSuccess = function(response, result) {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify({
		result: result
	}));
};

var handleError = function(response, errorCode, errorMsg) {
	response.writeHead(errorCode, {"Content-Type": "application/json"});
	response.end(JSON.stringify({
		error: errorMsg
	}));
};

var checkPassword = function(request) {
	var token,		
		deferred = q.defer(),
		username = request.headers['x-username'] || null,
		password = request.headers['x-password'] || null;
	
	if (username && password) {		
		dbLayer.findUserByName(username).then(function(result) {
			token = cryptUtils.getUserMD5Hash(username, password).toLowerCase();			
			if (token === result.password) {
				deferred.resolve();
			} else {
				deferred.reject();
			}					
		}, function(err) {
			deferred.reject();
		});
		
	} else {
		deferred.reject();
	}	
	
	return deferred.promise;	
};

var list = function(request, response) {
	dbLayer.openConnection().then(function() {
		checkPassword(request).then(function() {
			dbLayer.list(request.params['tableKey'], request.query['queryobj']).then(function(result) {				
				handleSuccess(response, result);
				dbLayer.closeConnection();
			}, function(err) {
				dbLayer.closeConnection();
				handleError(response, 500, err);
			});
		}, function(err) {
			handleError(response, 403, errors.ERR_UNHAUTORIZED);
		});
	}, function(err) {
		handleError(response, 500, errors.ERR_OPEN_CONNECTION);
	});	
};

var get = function(request, response) {
	dbLayer.openConnection().then(function() {
		checkPassword(request).then(function() {
			dbLayer.get(request.params['tableKey'], request.params['tableId']).then(function(result) {
				dbLayer.closeConnection();
				handleSuccess(response, result);
			}, function(err) {
				dbLayer.closeConnection();
				handleError(response, 500, err);
			});
		}, function(err) {
			handleError(response, 403, errors.ERR_UNHAUTORIZED);
		});
	}, function(err) {
		handleError(response, 500, errors.ERR_OPEN_CONNECTION);
	});	
	
};

var insert = function(request, response) {	
	dbLayer.openConnection().then(function() {
		checkPassword(request).then(function() {
			dbLayer.insert(request.params['tableKey'], request.body.model).then(function(result) {
				dbLayer.closeConnection();
				handleSuccess(response, result);
			}, function(err) {
				dbLayer.closeConnection();
				handleError(response, 500, err);
			});
		}, function(err) {
			handleError(response, 403, errors.ERR_UNHAUTORIZED);
		});
	}, function(err) {
		handleError(response, 500, errors.ERR_OPEN_CONNECTION);
	});	
};

var update = function(request, response) {
	dbLayer.openConnection().then(function() {
		checkPassword(request).then(function() {
			dbLayer.update(request.params['tableKey'], request.params['tableId'], request.body.model).then(function(result) {
				dbLayer.closeConnection();
				handleSuccess(response, result);
			}, function(err) {
				dbLayer.closeConnection();
				handleError(response, 500, err);
			});
		}, function(err) {
			handleError(response, 403, errors.ERR_UNHAUTORIZED);
		});
	}, function(err) {
		handleError(response, 500, errors.ERR_OPEN_CONNECTION);
	});	
};

var del = function(request, response) {
	dbLayer.openConnection().then(function() {
		checkPassword(request).then(function() {
			dbLayer.del(request.params['tableKey'], request.params['tableId']).then(function(result) {
				dbLayer.closeConnection();
				handleSuccess(response, result);
			}, function(err) {
				dbLayer.closeConnection();
				handleError(response, 500, err);
			});
		}, function(err) {
			handleError(response, 403, errors.ERR_UNHAUTORIZED);
		});
	}, function(err) {
		handleError(response, 500, errors.ERR_OPEN_CONNECTION);
	});	
};

module.exports = {	
	list: list,
	get: get,
	insert: insert,
	update: update,
	del: del	
};