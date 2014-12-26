'use strict';

var q = require('q'),
	Calculator = require('./lib/Calculator'),
	calculator = Calculator.create(),
	QCalculator = require('./lib/QCalculator'),
	qCalculator = QCalculator.create(q);

/*
 * Pyramid of Doom
 */
var test1 = function() {
	calculator.sum(2, 3, function(result) {
		console.log('Step #1 Result (2 + 3): ' + result);
		calculator.sum(result, 4, function(result1) {
			console.log('Step #2 Result (' + result + ' + 4): ' + result1);
			calculator.sum(result1, 5, function(result2) {
				console.log('Step #3 Result (' + result1 + ' + 5): ' + result2);
				calculator.sum(result2, 6, function(result3) {
					console.log('Step #4 Result (' + result2 + ' + 6): ' + result3);
					calculator.sum(result3, 7, function(result4) {
						console.log('Step #5 Result (' + result3 + ' + 7): ' + result4);
					});
				});
			});
		});
	});
};

/*
 * Example with promise (Chaining inside handler)
 */
var test2 = function() {
	qCalculator.sum(2, 3)
		.then(function(result) {
			console.log('Step #1 Result (2 + 3): ' + result);
			return qCalculator.sum(result, 4)
			.then(function(result1) {
				console.log('Step #2 Result (' + result + ' + 4): ' + result1);
				return qCalculator.sum(result1, 5)
				.then(function(result2) {
					console.log('Step #3 Result (' + result1 + ' + 5): ' + result2);
					return qCalculator.sum(result2, 6)
					.then(function(result3) {
						console.log('Step #4 Result (' + result2 + ' + 6): ' + result3);
						return qCalculator.sum(result3, 7)
						.then(function(result4) {
							console.log('Step #5 Result (' + result3 + ' + 7): ' + result4);
						});
					});
				});
			});
		})
		.done();
};

/*
 * Example with promise (Chaining outside handler)
 */
var test3 = function() {
	var oldResult = 0;
	qCalculator.sum(2, 3)
		.then(function(result) {
			console.log('Step #1 Result (2 + 3): ' + result);
			oldResult = result;
			return qCalculator.sum(result, 4);
		})
		.then(function(result1) {
			console.log('Step #2 Result (' + oldResult + ' + 4): ' + result1);
			oldResult = result1;
			return qCalculator.sum(result1, 5);
		})
		.then(function(result2) {
			console.log('Step #3 Result (' + oldResult + ' + 5): ' + result2);
			oldResult = result2;
			return qCalculator.sum(result2, 6);
		})
		.then(function(result3) {
			console.log('Step #4 Result (' + oldResult + ' + 6): ' + result3);
			oldResult = result3;
			return qCalculator.sum(result3, 7);
		})
		.then(function(result4) {
			console.log('Step #5 Result (' + oldResult + ' + 7): ' + result4);
		})
		.done();
};

/*
 * Example with array of promises
 */
var test4 = function() {
	var operations = [];
	
	operations.push(qCalculator.sum(2, 3));
	operations.push(qCalculator.sum(4, 5));
	operations.push(qCalculator.sum(6, 7));
	
	q.all(operations).spread(function(r1, r2, r3) {
		console.log("Result #1: " + r1);
		console.log("Result #2: " + r2);
		console.log("Result #3: " + r3);
		console.log("Total: " + (r1 + r2 + r3));
	});
};

/*
 * Example with array of promises (allSettled)
 */
var test5 = function() {
	var operations = [],
		tot = 0;
	
	operations.push(qCalculator.sum(2, 3));
	operations.push(qCalculator.sum(4, 5));
	operations.push(qCalculator.sum(6, 7));
	
	q.allSettled(operations).then(function(results) {
		results.forEach(function(result) {
			if (result.state === "fulfilled") {
				console.log("Result n: " + result.value);
				tot += result.value;
			}
		});
		console.log("Total: " + tot);
	});
};

/*
 * Error Handling
 */
var test6 = function() {
	qCalculator.sumWithErrorHandling(-1, 1).then(function(result) {
		console.log("Result: " + result);
	},
	function(error) {
		console.log(error);
	});
};

/*
 * Error Handling - chaining
 */
var test7 = function() {
	var oldResult = 0;
	qCalculator.sumWithErrorHandling(2, 3)
		.then(function(result) {
			console.log('Step #1 Result (2 + 3): ' + result);
			oldResult = result;
			return qCalculator.sumWithErrorHandling(result, -1);
		})
		.then(function(result1) {
			console.log('Step #2 Result (' + oldResult + ' + (-1)): ' + result1);
		})
		.catch(function(err) {
			console.log("Error: " + err);
		})
		.done();
};

/*
 * MAIN
 */
test1();
