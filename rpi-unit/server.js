/**
 * Main
 */

'use strict';

var express = require('express'),
	fs = require('fs'),
	https = require('https'),
	io = require('socket.io'),
	serverConfig = require('./config/server'),
	cors = require('cors'),
	crudRoutes = require('./routes/crud');

/* Crea applicazione Express */
var app = express();

/* Configura applicazione Express */
app.set('port', process.env.PORT || serverConfig.port);
app.use(express.favicon());
app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

/* Configura Routes */
app.get('/api/list/:tableKey', crudRoutes.list); 
app.get('/api/get/:tableKey/:tableId(\\d+)', crudRoutes.get); 
app.post('/api/insert/:tableKey', crudRoutes.insert); 
app.put('/api/update/:tableKey/:tableId(\\d+)', crudRoutes.update); 
app.del('/api/delete/:tableKey/:tableId(\\d+)', crudRoutes.del);  

/* Crea server */
var sslOptions = {
	key: fs.readFileSync('./ssl/server.key'),
	cert: fs.readFileSync('./ssl/server.crt'),
	ca: fs.readFileSync('./ssl/ca.crt'),
	requestCert: true,
	rejectUnauthorized: false
};
https.createServer(sslOptions, app).listen(app.get('port'), function() {
	console.log('Secure Express server listening on port ' + app.get('port'));
});