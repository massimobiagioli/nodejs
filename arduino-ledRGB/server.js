var express = require('express'),
	http = require('http');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.logger());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/service/change', function(req, res) {
	console.log("*** Color Changed ***");
	console.log("Red: " + req.query.red + " Green: " + req.query.green + " Blue: " + req.query.blue);
	res.send("ok");
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});