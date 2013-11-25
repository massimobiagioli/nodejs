var	Persona = function(data) {
	this.nome = data.nome;
	this.cognome = data.cognome;
	this.dataNascita = data.dataNascita;
	this.luogoNascita = data.luogoNascita;
	this.codiceFiscale = data.codiceFiscale;
	this.extraInfo = data.extraInfo;
};

module.exports = {
	Persona: Persona
};