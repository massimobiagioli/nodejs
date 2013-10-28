module.exports = function(mongoose, baucis) {
	
	var moment = require('moment');
	
	/*
	 * Schema 
	 */
	
	var PersonaSchema = new mongoose.Schema({
		nome: {type: String, required: true},
		cognome: {type: String, required: true},
		luogoNascita: {type: String, required: true},
		dataNascita: {type: Date, required: true}
	}, {
		collection: 'persona'
	});
	
	
	/*
	 * Model 
	 */
	
	var Persona = mongoose.model('Persona', PersonaSchema);
	
	/*
	 * Mock
	 */
	var insertMockData = function() {		
		var persona;
		
		persona = new Persona({
			nome: 'Mario',
			cognome: 'Rossi',
			luogoNascita: 'Milano',
			dataNascita: moment('1970-01-15').toDate()
		});
		persona.save();

		persona = new Persona({
			nome: 'Anna',
			cognome: 'Verdi',
			luogoNascita: 'Firenze',
			dataNascita: moment('1975-05-11').toDate()
		});
		persona.save();

		persona = new Persona({
			nome: 'Giulio',
			cognome: 'Bianchi',
			luogoNascita: 'Firenze',
			dataNascita: moment('1977-04-10').toDate()
		});
		persona.save();
	};
	
	/*
	 * Baucis
	 */
	
	baucis.rest({
		singular: 'Persona',
		plural: 'persone'
	});
	

	return {
		insertMockData: insertMockData
	};
	
};