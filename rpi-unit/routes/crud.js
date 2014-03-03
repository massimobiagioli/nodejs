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
	response.send('get id: ' + request.params['tableId'] + ' of ' + request.params['tableKey']);
};

var insert = function(request, response) {
	response.send('insert: ' + request.params['tableKey'] + ' (' + request.body.id + ' - ' + request.body.nome + ')');
};

var update = function(request, response) {
	response.send('put id: ' + request.params['tableId'] + ' of ' + request.params['tableKey']);
};

var del = function(request, response) {
	response.send('delete id: ' + request.params['tableId'] + ' of ' + request.params['tableKey']);
};

module.exports = {	
	list: list,
	get: get,
	insert: insert,
	update: update,
	del: del	
};