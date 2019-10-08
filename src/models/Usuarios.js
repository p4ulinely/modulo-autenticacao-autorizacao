const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	}, sobreNome: {
		type: String,
		required: true
	}, email: {
		type: String,
		required: true
	}, senha: {
		type: String,
		required: true
	}, createdAt: {
		type: Date,
		default: Date.now()
	}
});

mongoose.model('Usuarios', UsuariosSchema);