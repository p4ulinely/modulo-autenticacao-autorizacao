const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UsuariosSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	}, sobreNome: {
		type: String,
		required: true
	}, email: {
		type: String,
		required: true,
		unique: true
	}, senha: {
		type: String,
		required: true
	}, nivel: {
		type: Number,
		default: 1
	}, createdAt: {
		type: Date,
		default: Date.now()
	}
});

UsuariosSchema.plugin(mongoosePaginate);
mongoose.model('Usuarios', UsuariosSchema);