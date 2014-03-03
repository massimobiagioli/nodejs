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
	
	return {		
		openConnection: openConnection,
		closeConnection: closeConnection,
		query: query
	};
})(serverConfig.db);