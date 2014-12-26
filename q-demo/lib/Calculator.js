'use strict';

module.exports.create = function() {
	
	var sum = function(a, b, callback) {
		callback(a + b);
	};
	
	return {
		sum: sum
	}
};