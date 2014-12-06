'use strict';

var express = require('express'),
	http = require('http'),
	cors = require('cors'),
	serialport = require("serialport"),
	SerialPort = serialport.SerialPort;

var sp = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

var app = express();

app.set('port', 8080);
app.use(express.favicon());
app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/relay', function(req, res) {
	var channel = req.query.channel,
		command = req.query.command,
		toSend = 'FF0' + channel + '0' + command,
		buffer = new Buffer(toSend, 'hex');
		
	sp.write(buffer, function(err) {
		if (err) {
			console.log('Error sending data to serial port: ' + err);
		}
	});
	
	res.send('Buffer sent: ' + toSend);
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
	
	sp.open(function(err) {
		if (!err) {
			console.log('Serial port open');
		} else {
			console.log('Error open serial port: ' + err);
		}
	});
});