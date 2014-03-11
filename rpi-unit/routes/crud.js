/**
 * CRUD API Routes
 */

'use strict';

var dbLayer = require('../lib/dbLayer'),
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
	var token = cryptUtils.getUserMD5Hash(request.headers['x-username'] || '', request.headers['x-password'] || '').toLowerCase();
	
	return true;
};

var list = function(request, response) {
	if (checkPassword(request)) {
		dbLayer.openConnection(function(err) {
			if (!err) {
				dbLayer.query(request.params['tableKey'], null, function(err, result) {
					handleResponse(response, err, result);
					dbLayer.closeConnection();
				});			
			} else {			
				handleError(500, errors.ERR_OPEN_CONNECTION);
			}
		});		
	} else {			
		handleError(403, errors.ERR_UNHAUTORIZED);
	}
};

var get = function(request, response) {
	dbLayer.openConnection(function(err) {
		if (!err) {
			dbLayer.get(request.params['tableKey'], request.params['tableId'], function(err, result) {
				handleResponse(response, err, result);
				dbLayer.closeConnection();
			});			
		} else {			
			handleError(500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

var insert = function(request, response) {	
	dbLayer.openConnection(function(err) {
		if (!err) {
			dbLayer.insert(request.params['tableKey'], request.body.model, function(err, result) {
				handleResponse(response, err, result);
				dbLayer.closeConnection();
			});			
		} else {			
			handleError(500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

var update = function(request, response) {
	dbLayer.openConnection(function(err) {
		if (!err) {
			dbLayer.update(request.params['tableKey'], request.params['tableId'], request.body.model, function(err, result) {
				handleResponse(response, err, result);
				dbLayer.closeConnection();
			});			
		} else {			
			handleError(500, errors.ERR_OPEN_CONNECTION);
		}
	});	
};

var del = function(request, response) {
	dbLayer.openConnection(function(err) {
		if (!err) {
			dbLayer.del(request.params['tableKey'], request.params['tableId'], function(err, result) {
				handleResponse(response, err, result);
				dbLayer.closeConnection();
			});			
		} else {			
			handleError(500, errors.ERR_OPEN_CONNECTION);
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