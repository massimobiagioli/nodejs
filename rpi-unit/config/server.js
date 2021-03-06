/**
 * Configurazione server
 */

'use strict';

module.exports = {
	port: 4000,
	db: {
		connectionString: { 			
			'path': __dirname + '/../data/rpi-unit.db'
		},
		tableMap: {
			'deviceType': {
				table: 'device_types',				
			},
			'program': {
				table: 'programs',
				view: 'programs_v01'
			},			
			'status': {
				table: 'statuses',
				view: 'statuses_v01'
			},
			'programParameter': {
				table: 'program_parameters'
			}
		}
	}
};