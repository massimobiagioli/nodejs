var app = require('commander'),
	BackupDemo = require('./lib/BackupDemo'),
	backupDemo = BackupDemo.create();

app
	.version('1.0.0')
	.option('-s, --src [type]', 'Source')
	.option('-d, --dest [type]', 'Destination')
	.option('-v, --verbose', 'Verbose')
	.parse(process.argv);

backupDemo.execute(app.src, app.dest || app.src, app.verbose);