const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

module.exports = {
	async index(req, res){
		try {
			const usuarios = await Usuarios.find().sort({
				dia: -1
			});

			return res.json({
				dados: usuarios
			});
		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	},
	async create(req, res){
		try {

			const errosCampos = []
			if (req.body.nome == null || req.body.nome == '') {
				errosCampos.push("Informar nome");
			}
			if (req.body.email == null || req.body.email == '') {
				errosCampos.push("Informar e-mail");
			}
			if (req.body.senha == null || req.body.senha == '') {
				errosCampos.push("Informar senha");
			}

			const emailExiste = await Usuarios.find({
				email: req.body.email
			});
			if (emailExiste.length > 0) {
				errosCampos.push("E-mail ja esta em uso");
			}

			if(errosCampos.length != 0){
				return res.status(400).json({
					erros: errosCampos
				});
			}

			const novoUsuario = await Usuarios.create(req.body);

			return res.json(novoUsuario);
		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	},
	async show(req, res){
		try {
			const usuario = await Usuarios.find({
				email: req.params.email
			});

			return (usuario.length > 0 ? res.json(usuario) : res.status(400).json({erros: "usuario invalido"}));
		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	},
	async update(req, res){
		try {

			//caso o usuario autenticado tente aletar outro usuario
			if (req.params.email != req.usuarioAutenticado.email) return res.status(400).json({erros: "falha na credencial"});

			const usuario = await Usuarios.findOneAndUpdate({
				email: req.params.email 
			}, {
				nome: req.body.nome,
				sobreNome: req.body.sobreNome,
				email: req.body.email,
				senha: req.body.senha,
				nivel: req.body.nivel
			}, {
				useFindAndModify: false,
				new: true
			});

			return (usuario != null ? res.json(usuario) : res.status(400).json({erros: "usuario invalido"}));
		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	},
	async destroy(req, res){
		try {

			//caso o usuario autenticado tente remover outro usuario
			if (req.params.email != req.usuarioAutenticado.email) return res.status(400).json({erros: "falha na credencial"});

			const remocao = await Usuarios.deleteMany({
				email: req.params.email
			});

			return (remocao.deletedCount ? res.send() : res.status(400).json({erros: "usuario invalido"}));
		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	},	
}