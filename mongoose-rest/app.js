
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	mongoose = require('mongoose'),
	baucis = require('baucis'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-rest');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	http.createServer(app).listen(3000, '127.0.0.1', function() {
		console.log("Express server listening on port " + app.get('port'));
	});
});