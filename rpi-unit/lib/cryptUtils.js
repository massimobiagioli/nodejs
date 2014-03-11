var md5 = require('MD5');

module.exports = {
	getUserMD5Hash: function(username, password) {
		return md5(username + md5(password));
	}	
};