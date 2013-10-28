
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	mongoose = require('mongoose'),
	baucis = require('baucis'),
	modelManager = require('./lib/model-manager')(mongoose, baucis),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use('/api', baucis());
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
	http.createServer(app).listen(app.get('port'), '127.0.0.1', function() {
		
		/*
		 * Abilitare per inserire dei dati Mock
		modelManager.insertMockData();
		*/
		
		console.log("Express server listening on port " + app.get('port'));
	});
});