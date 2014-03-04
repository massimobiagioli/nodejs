'use strict';

var express = require('express'),
	io = require('socket.io');

/* Crea applicazione Express */
var app = express();

/* Configura applicazione Express */
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

/* Crea server */
io.listen(app.listen(app.get('port')));