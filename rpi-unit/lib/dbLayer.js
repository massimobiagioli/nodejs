/**
 * DB Layer (sqlite3)
 */

'use strict';

var serverConfig = require('../config/server'),
	_ = require('underscore');

module.exports = (function(config) {
	var DBWrapper = require('node-dbi').DBWrapper;
	
	var	dbWrapper = new DBWrapper('sqlite3', config.connectionString);
	
	var openConnection = function(callback) {
		dbWrapper.connect(callback);
	}; 
	
	var closeConnection = function(callback) {
		dbWrapper.close(callback);
	};
	
	var list = function(tableKey, queryobj, callback) {						
		var	select = dbWrapper.getSelect().from(config.tableMap[tableKey]);
		
		_.each(queryobj.filters, function(filter) {
			select.where(filter.name + ' ' + filter.operator + ' ?', filter.value);
		});
		
		_.each(queryobj.orderCriterions, function(orderCriterion) {
			if (_.has(orderCriterion, 'direction')) {
				select.order(orderCriterion.name, orderCriterion.direction);
			} else {
				select.order(orderCriterion.name);
			}			
		});
		
		if (_.has(queryobj, 'limit')) {
			if (_.has(queryobj.limit, 'startIndex')) {
				select.limit(queryobj.limit.rows, queryobj.limit.startIndex)
			} else {
				select.limit(queryobj.limit.rows)
			}			
		}
		
		dbWrapper.fetchAll(select, callback);
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
	
	var findUserByName = function(name, callback) {
		dbWrapper.fetchRow('SELECT * FROM users WHERE username=?', [name], callback);
	};
	
	return {		
		openConnection: openConnection,
		closeConnection: closeConnection,
		list: list,
		get: get,
		insert: insert,
		update: update,
		del: del,
		findUserByName: findUserByName
	};
})(serverConfig.db);