'use strict';

module.exports.create = function(q) {
	
	var sum = function(a, b) {
		var deferred = q.defer();
		
		deferred.resolve(a + b);
		
		return deferred.promise;
	};
	
	var sumWithErrorHandling = function(a, b) {
		var deferred = q.defer();
		
		if (a < 0 || b < 0) {
			deferred.reject("Wrong parameters!");
		} else {
			deferred.resolve(a + b);	
		}
		
		return deferred.promise;		
	}
	
	return {
		sum: sum,
		sumWithErrorHandling: sumWithErrorHandling
	}
};