/**
 * CRUD API Routes
 */

'use strict';

module.exports = {
		
	list: function(request, response) {
		response.send('elenco ' + request.params['tableKey']);
	},
	get: function(request, response) {
		response.send('get id: ' + request.params['tableId'] + ' of ' + request.params['tableKey']);
	},
	insert: function(request, response) {
		response.send('insert: ' + request.params['tableKey'] + ' (' + request.body.id + ' - ' + request.body.nome + ')');
	},
	update: function(request, response) {
		response.send('put id: ' + request.params['tableId'] + ' of ' + request.params['tableKey']);
	},
	del: function(request, response) {
		response.send('delete id: ' + request.params['tableId'] + ' of ' + request.params['tableKey']);
	}
		
};