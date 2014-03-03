/**
 * Configurazione server
 */

'use strict';

module.exports = {
	port: 3000,
	db: {
		connectionString: { 			
			'path': __dirname + '/../data/rpi-unit.db'
		},
		tableMap: {
			'deviceType': 'device_types'	
		}
	}
};