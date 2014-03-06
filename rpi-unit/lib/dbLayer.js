/**
 * DB Layer (sqlite3)
 */

'use strict';

var serverConfig = require('../config/server');

module.exports = (function(config) {
	var DBWrapper = require('node-dbi').DBWrapper;
	
	var	dbWrapper = new DBWrapper('sqlite3', config.connectionString);
	
	var openConnection = function(callback) {
		dbWrapper.connect(callback);
	}; 
	
	var closeConnection = function(callback) {
		dbWrapper.close(callback);
	};
	
	var query = function(tableKey, queryData, callback) {
		dbWrapper.fetchAll('SELECT * FROM ' + config.tableMap[tableKey], null, callback);
	};
	
	var get = function(tableKey, id, callback) {
		dbWrapper.fetchRow('SELECT * FROM ' + config.tableMap[tableKey] + ' WHERE id=?', [id], callback);
	};
	
	var insert = function(tableKey, data, callback) {
		dbWrapper.insert(config.tableMap[tableKey], data, function(err) {
			callback(err, dbWrapper.getLastInsertId());
		});
	};
	
	var update = function(tableKey, id, data, callback) {
		dbWrapper.update(config.tableMap[tableKey], data, [['id=?', id]], callback);
	};
	
	var del = function(tableKey, id, callback) {
		dbWrapper.remove(config.tableMap[tableKey], [['id=?', id]], callback);
	};
	
	return {		
		openConnection: openConnection,
		closeConnection: closeConnection,
		query: query,
		get: get,
		insert: insert,
		update: update,
		del: del
	};
})(serverConfig.db);