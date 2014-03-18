/**
 * CRUD API Routes
 */

'use strict';

var q = require('q'),
	dbLayer = require('../lib/dbLayer'),
	cryptUtils = require('../lib/cryptUtils'),
	errors = require('../messages/errors');

var handleResponse = function(response, err, result) {
	if (!err) {
		response.writeHead(200, {"Content-Type": "application/json"});
		response.end(JSON.stringify({
			result: result
		}));
	} else {
		handleInternalError(err);
	}
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
		dbLayer.findUserByName(username, function(err, result) {	
			if (err) {
				deferred.reject();
			} else {
				token = cryptUtils.getUserMD5Hash(username, password).toLowerCase();			
				if (token === result.password) {
					deferred.resolve();
				} else {
					deferred.reject();
				}					
			}
		});		
	} else {
		deferred.reject();
	}	
	
	return deferred.promise;	
};

var list = function(request, response) {
	var promise;
	
	dbLayer.openConnection(function(err) {						
		if (!err) {						
			promise = checkPassword(request);
			promise.then(function() {
				dbLayer.list(request.params['tableKey'], request.query['queryobj'], function(err, result) {
					handleResponse(response, err, result);
					dbLayer.closeConnection();
				});			
			}, function() {
				dbLayer.closeConnection();
				handleError(response, 403, errors.ERR_UNHAUTORIZED);
			});						
		} else {			
			handleError(response, 500, errors.ERR_OPEN_CONNECTION);
		}
	});		
};

var get = function(request, response) {
	var promise;
	
	dbLayer.openConnection(function(err) {
		if (!err) {
			promise = checkPassword(request);
			promise.then(function() {
				dbLayer.get(request.params['tableKey'], request.params['tableId'], function(err, result) {
					handleResponse(response, err, result);
					dbLayer.closeConnection();
				});			
			}, function() {
				dbLayer.closeConnection();
				handleError(response, 403, errors.ERR_UNHAUTORIZED);
			});						
		} else {			
			handleError(response, 500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

var insert = function(request, response) {	
	var promise;
	
	dbLayer.openConnection(function(err) {
		if (!err) {
			promise = checkPassword(request);
			promise.then(function() {
				dbLayer.insert(request.params['tableKey'], request.body.model).then(function(result) {
					handleResponse(response, false, result);
				}, function(err) {
					handleError(response, 500, err);
				});
			}, function() {
				dbLayer.closeConnection();
				handleError(response, 403, errors.ERR_UNHAUTORIZED);
			});	
		} else {			
			handleError(response, 500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

var update = function(request, response) {
	var promise;
	
	dbLayer.openConnection(function(err) {
		if (!err) {
			promise = checkPassword(request);
			promise.then(function() {
				dbLayer.update(request.params['tableKey'], request.params['tableId'], request.body.model, function(err, result) {
					handleResponse(response, err, result);
					dbLayer.closeConnection();
				});			
			}, function() {
				dbLayer.closeConnection();
				handleError(response, 403, errors.ERR_UNHAUTORIZED);
			});				
		} else {			
			handleError(response, 500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

var del = function(request, response) {
	var promise;
	
	dbLayer.openConnection(function(err) {
		if (!err) {
			promise = checkPassword(request);
			promise.then(function() {
				dbLayer.del(request.params['tableKey'], request.params['tableId'], function(err, result) {
					handleResponse(response, err, result);
					dbLayer.closeConnection();
				});		
			}, function() {
				dbLayer.closeConnection();
				handleError(response, 403, errors.ERR_UNHAUTORIZED);
			});					
		} else {			
			handleError(response, 500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

module.exports = {	
	list: list,
	get: get,
	insert: insert,
	update: update,
	del: del	
};