/**
 * CRUD API Routes
 */

'use strict';

var dbLayer = require('../lib/dbLayer'),
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

var handleInternalError = function(response, errorMsg) {
	response.writeHead(500, {"Content-Type": "application/json"});
	response.end(JSON.stringify({
		error: errorMsg
	}));
};

var list = function(request, response) {
	dbLayer.openConnection(function(err) {
		if (!err) {
			dbLayer.query(request.params['tableKey'], null, function(err, result) {
				handleResponse(response, err, result);
				dbLayer.closeConnection();
			});			
		} else {			
			handleInternalError(errors.ERR_OPEN_CONNECTION);
		}
	});
};

var get = function(request, response) {
	dbLayer.openConnection(function(err) {
		if (!err) {
			dbLayer.get(request.params['tableKey'], request.params['tableId'], function(err, result) {
				handleResponse(response, err, result);
				dbLayer.closeConnection();
			});			
		} else {			
			handleInternalError(errors.ERR_OPEN_CONNECTION);
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
			handleInternalError(errors.ERR_OPEN_CONNECTION);
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
			handleInternalError(errors.ERR_OPEN_CONNECTION);
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
			handleInternalError(errors.ERR_OPEN_CONNECTION);
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