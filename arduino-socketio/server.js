var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(3000));

io.sockets.on('connection', function (socket) {
	
	var interval = setInterval(function() {
		socket.volatile.emit('evento', {			
			n: Math.floor((Math.random() * 5) + 1)
		});
	}, 5000);
		
	socket.on('disconnect', function () {
		clearInterval(interval);
	});
	
});