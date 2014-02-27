/**
 * DB Layer (sqlite3)
 */

'use strict';

module.exports = (function() {
	var DBWrapper = require('node-dbi').DBWrapper;
	
	var	connectionString = { 			
		'database': '../data/rpi-unit.db'
	};
	
	var	dbWrapper = new DBWrapper('sqlite3', connectionString);
	
	var	tableMap = {
		'deviceType': 'device_types'	
	};
	
	var openConnection = function(callback) {
		dbWrapper.connect(callback);
	}; 
	
	var closeConnection = function(callback) {
		dbWrapper.close(callback);
	};
	
	var query = function(tableKey, queryData, callback) {
		dbWrapper.fetchAll('SELECT * FROM ' + tableMap[tableKey], null, callback);
	};
	
	return {		
		openConnection: openConnection,
		closeConnection: closeConnection,
		query: query
	};
})();