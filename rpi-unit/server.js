/**
 * Main
 */

'use strict';

var express = require('express'),
	serverConfig = require('./config/server'),
	io = require('socket.io'),
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
app.use(express.static(__dirname + '/public'));

/* Configura Routes */
app.get('/api/list/:tableKey', crudRoutes.list); 
app.get('/api/get/:tableKey/:tableId', crudRoutes.get); 
app.post('/api/insert/:tableKey', crudRoutes.insert); 
app.put('/api/update/:tableKey/:tableId', crudRoutes.update); 
app.del('/api/delete/:tableKey/:tableId', crudRoutes.del);  

/* Crea server */
io.listen(app.listen(app.get('port')));