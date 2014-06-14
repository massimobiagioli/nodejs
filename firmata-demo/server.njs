var firmata = require('firmata'),
	express = require('express'),
	http = require('http');

var board = new firmata.Board('COM4', function() {
	console.log("Arduino connected on COM4");		
	board.pinMode(13, board.MODES.OUTPUT);
});  

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/service/led_on', function(req, res) {
	board.digitalWrite(13, board.HIGH);		
	res.send("led on");
});

app.get('/service/led_off', function(req, res) {
	board.digitalWrite(13, board.LOW);
	res.send("led off");
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));		
});