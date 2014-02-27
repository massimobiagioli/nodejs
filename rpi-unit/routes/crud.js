/**
 * CRUD API Routes
 */

'use strict';

var dbLayer = require('../lib/dbLayer');

var list = function(request, response) {
	dbLayer.openConnection(function(err) {
		if (!err) {
			response.send('elenco ' + request.params['tableKey']);
			
			dbLayer.query(request.params['tableKey'], null, function(err, result) {
				if (!err) {
					console.log(result)
				}
				dbLayer.closeConnection();
			});			
		} else {
			response.send('errore apertura database');
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