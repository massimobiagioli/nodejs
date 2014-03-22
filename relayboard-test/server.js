var express = require('express'),
	http = require('http'),
	serialport = require("serialport");

var SerialPort = serialport.SerialPort; 
var sp = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.logger());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/service/lamp_on', function(req, res) {
	var buffer = new Buffer('FF0101', 'hex');
	
	sp.write(buffer, function(err) {
		if (err) {
			console.log('Error sending data to serial port: ' + err);
		}
	});
	
	res.send('Buffer sent: ' + buffer);
});

app.get('/service/lamp_off', function(req, res) {
	var buffer = new Buffer('FF0100', 'hex');
		
	sp.write(buffer, function(err) {
		if (err) {
			console.log('Error sending data to serial port: ' + err);
		}
	});
	
	res.send('Buffer sent: ' + buffer);
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