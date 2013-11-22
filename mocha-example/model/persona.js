var	Persona = function(data) {
	this.nome = data.nome;
	this.cognome = data.cognome;
	this.dataNascita = data.dataNascita;
	this.luogoNascita = data.luogoNascita;
};

module.exports = {
	Persona: Persona
};