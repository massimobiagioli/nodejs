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

	var getTable = function(tableKey) {
		return config.tableMap[tableKey].table;
	};
	
	var getView = function(tableKey) {
		if (_.has(config.tableMap[tableKey], 'view')) {
			return config.tableMap[tableKey].view;
		} else {
			return getTable(tableKey);
		}
	};
	
	var list = function(tableKey, queryobj) {						
		var	select = dbWrapper.getSelect().from(getView(tableKey)),
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
				deferred.reject(err.message);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
	};
	
	var get = function(tableKey, id) {
		var deferred = q.defer();
		
		dbWrapper.fetchRow('SELECT * FROM ' + getView(tableKey) + ' WHERE id=?', [id], function(err, result) {
			if (err) {
				deferred.reject(err.message);
			} else {
				deferred.resolve(result);
			}
		});
		
		return deferred.promise;
	};
	
	var insert = function(tableKey, data) {
		var deferred = q.defer();
						
		dbWrapper.insert(getTable(tableKey), data, function(err) {
			if (err) {
				deferred.reject(err.message);
			} else {
				deferred.resolve(dbWrapper.getLastInsertId());
			}
		});				
			
		return deferred.promise;
	};
	
	var update = function(tableKey, id, data) {
		var deferred = q.defer();
		
		dbWrapper.fetchRow('SELECT * FROM ' + getTable(tableKey) + ' WHERE id=?', [data.id], function(err, model) {			
			if (err) {
				deferred.reject(err.message);
			} else {				
				
				_.each(_.keys(model), function(property) {
					model[property] = data[property];
				});
		
				dbWrapper.update(getTable(tableKey), model, [['id=?', id]], function(err, result) {
					if (err) {
						deferred.reject(err.message);
					} else {
						deferred.resolve(result);
					}
				});
			};
		});
		
		return deferred.promise;
	};
	
	var del = function(tableKey, id) {
		var deferred = q.defer();
		
		dbWrapper.remove(getTable(tableKey), [['id=?', id]], function(err, result) {
			if (err) {
				deferred.reject(err.message);
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