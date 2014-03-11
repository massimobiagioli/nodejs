var cryptUtils = require('../lib/cryptUtils'),
	should = require('should');

describe("MD5Crypt", function() {

	describe("getUserMD5Hash", function() {
		
		it("Check User by MD5 Hash", function() {			
			var username = 'admin',
				password = 'Admin$$$';			
			
			var token = cryptUtils.getUserMD5Hash(username, password).toLowerCase();
			
			'879f4a8ffee8be46f02a9fa2f845a1c0'.should.eql(token);		
		});
				
	});
	
});