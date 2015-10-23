'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	co = require('co'),
	app = express(),
	db;
	
// Configurazione app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

var PersonaSchema = mongoose.Schema({
	nome: String,
	cognome: String,
	indirizzo: String
}, {
	collection: 'persone'
});

var PersonaModel = mongoose.model('Persona', PersonaSchema);

var PersonaCountPromise = new Promise(function(resolve, reject) {
	PersonaModel.count({}, function(err, count) {
		if (err) {
			reject(err);
		} else {
			resolve(count);
		}
	})
});

var p1 = new Promise(function(resolve, reject) {
	resolve({
		nome: "Pippo",
		cognome: "Pluto"
	})
});

// Funzione principale
var main = function() {
	console.log("Express server listening on port 3000");
	
	co(function * () {		
		try {
			
			// count	
			let numeroPersone = yield PersonaCountPromise;
			console.log("COUNT: " + numeroPersone);
			
			let who = yield p1;
			console.log("COUNT: " + JSON.stringify(who));
							
		} catch (err) {
			console.error(err.message);
		}
	}).catch(function(err) {
		console.log(err.stack);
	});
	
};

// Connessione a MongoDb
mongoose.connect('mongodb://localhost:27017/protsrv');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	console.log("Connected to MongoDb");
	http.createServer(app).listen(3000, 'localhost', main);
});