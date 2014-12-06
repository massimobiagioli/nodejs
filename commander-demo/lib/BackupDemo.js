module.exports.create = function() {
	var colors = require('colors');
	
	var execute = function(from, to, verbose) {
		if (verbose) {
			console.log('Begin backup...'.green);
			console.log('From: '.bgYellow + from);
			console.log('To: '.bgYellow + to);
		}
		
		copy(from, to);
		
		if (verbose) {
			console.log('End backup!'.green);
		}
	};
	
	var copy = function(from, dest) {
		// TODO backup ......
	};
	
	return {
		execute: execute
	};
};