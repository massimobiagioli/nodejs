var personaManager = require('../model/Persona'),
	moment = require('moment'),	
	should = require('should');

describe("Persona", function() {

	var p = new personaManager.Persona({
		nome: "Mario",
		cognome: "Rossi",
		dataNascita: moment('1960-03-03').toDate(),
		luogoNascita: 'Milano',
		codiceFiscale: 'RSSMRA60C03F205E',
		extraInfo: [{
			tipo: "telefono",
			valore: "02-12345678"
		},
		{
			tipo: "email",
			valore: "m.rossi@gmail.it"
		}]
	});
	
	describe("constructor", function() {
		
		it("deve essere una 'Persona'", function() {			
			p.should.be.an.instanceOf(personaManager.Persona);		
		});
		
		it ("si deve chiamate 'Mario'", function() {			
			p.should.have.property('nome', 'Mario');
		});
		
	});
	
	describe("#checkCodiceFiscale", function() {
		
		var checkCodiceFiscale = function(cfins) {
			var i;
			var cf = cfins.toUpperCase();
			var cfReg = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
			if (!cfReg.test(cf)) {
				return false;
			}
			var set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			var setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";
			var s = 0;
			for(i = 1; i <= 13; i += 2) {
				s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
			}	
			for(i = 0; i <= 14; i += 2) {
				s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
			}
			if (s%26 != cf.charCodeAt(15)-'A'.charCodeAt(0)) {
				return false;
			}
			return true;
		};
		
		it("deve avere un codice fiscale formalmente corretto", function() {												
			checkCodiceFiscale(p.codiceFiscale).should.be.ok;
		});
				
	});
	
	describe("#checkExtraInfo", function() {

		it("deve avere delle informazioni extra", function() {												
			p.extraInfo.should.be.not.empty;
		});
		
	});
	
});