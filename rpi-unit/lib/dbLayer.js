/**
 * DB Layer (sqlite3)
 */

'use strict';

var serverConfig = require('../config/server'),
	_ = require('underscore'),
	q = require('q');

module.exports = (function(config) {
	var DBWrapper = require('node-dbi').DBWrapper;
	
	var	dbWrapper = new DBWrapper('sqlite3', config.connectionString);
	
	var openConnection = function() {
		var deferred = q.defer();
		
		dbWrapper.connect(function(err) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});
		
		return deferred.promise;
	}; 
	
	var closeConnection = function() {
		var deferred = q.defer();
		
		dbWrapper.close(function(err) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve();
			}
		});
		
		return deferred.promise;
	};
	
	var list = function(tableKey, queryobj) {						
		var	select = dbWrapper.getSelect().from(config.tableMap[tableKey]),
			deferred = q.defer();
		
		if (queryobj) {
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
		}
		
		dbWrapper.fetchAll(select, function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
	};
	
	var get = function(tableKey, id) {
		var deferred = q.defer();
		
		dbWrapper.fetchRow('SELECT * FROM ' + config.tableMap[tableKey] + ' WHERE id=?', [id], function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
	};
	
	var insert = function(tableKey, data) {
		var deferred = q.defer();
		
		dbWrapper.insert(config.tableMap[tableKey], data, function(err) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(dbWrapper.getLastInsertId());
			}
		});
		
		return deferred.promise;
	};
	
	var update = function(tableKey, id, data) {
		var deferred = q.defer();
		
		dbWrapper.update(config.tableMap[tableKey], data, [['id=?', id]], function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
	};
	
	var del = function(tableKey, id) {
		var deferred = q.defer();
		
		dbWrapper.remove(config.tableMap[tableKey], [['id=?', id]], function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
	};
	
	var findUserByName = function(name) {
		var deferred = q.defer();
		
		dbWrapper.fetchRow('SELECT * FROM users WHERE username=?', [name], function(err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
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