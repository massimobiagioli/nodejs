var personaManager = require('../model/Persona'),
	moment = require('moment'),	
	should = require('should');

describe("Persona", function() {
	
	describe("constructor", function() {
		var p = new personaManager.Persona({
			nome: "Mario",
			cognome: "Rossi",
			dataNascita: moment('1960-03-03').toDate(),
			luogoNascita: 'Milano'
		});
		
		it("should be a 'Persona'", function() {			
			p.should.be.an.instanceOf(personaManager.Persona);		
		});
		
		it ("should be 'Mario'", function() {			
			p.should.have.property('nome', 'Mario');
		});
		
	});
	
});