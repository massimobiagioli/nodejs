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

var PersonaCountPromise = new Promise(function (resolve, reject) {
	PersonaModel.count({}, function (err, count) {
		if (err) {
			reject(err);
		} else {
			resolve(count);
		}
	});
});

var p1 = new Promise(function (resolve, reject) {
	resolve({
		nome: "Pippo",
		cognome: "Pluto"
	});
});

// Funzione principale
var main = function main() {
	console.log("Express server listening on port 3000");

	co(regeneratorRuntime.mark(function callee$1$0() {
		var numeroPersone, who;
		return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
			while (1) switch (context$2$0.prev = context$2$0.next) {
				case 0:
					context$2$0.prev = 0;
					context$2$0.next = 3;
					return PersonaCountPromise;

				case 3:
					numeroPersone = context$2$0.sent;

					console.log("COUNT: " + numeroPersone);

					context$2$0.next = 7;
					return p1;

				case 7:
					who = context$2$0.sent;

					console.log("COUNT: " + JSON.stringify(who));

					context$2$0.next = 14;
					break;

				case 11:
					context$2$0.prev = 11;
					context$2$0.t0 = context$2$0['catch'](0);

					console.error(context$2$0.t0.message);

				case 14:
				case 'end':
					return context$2$0.stop();
			}
		}, callee$1$0, this, [[0, 11]]);
	}))['catch'](function (err) {
		console.log(err.stack);
	});
};

// Connessione a MongoDb
mongoose.connect('mongodb://localhost:27017/protsrv');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
	console.log("Connected to MongoDb");
	http.createServer(app).listen(3000, 'localhost', main);
});

// count
