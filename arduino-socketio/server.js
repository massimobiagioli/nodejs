var express = require('express'),
	serialport = require("serialport");

var app = express();
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(3000));

var SerialPort = serialport.SerialPort; 
var sp = new SerialPort("/dev/ttyACM0", {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

io.sockets.on('connection', function (socket) {
	
	sp.open(function(err) {
		if (!err) {
			console.log('Serial port open');
			
			sp.on('data', function(data) {
			    console.log('data received: ' + data);
			    socket.emit('serial', {
			    	buffer: data	
			    });
			});
			
		} else {
			console.log('Error open serial port: ' + err);
		}
	});
	
});