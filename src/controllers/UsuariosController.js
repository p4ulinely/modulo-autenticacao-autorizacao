const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

module.exports = {
	async index(req, res){
		try {

			//caso o usuario autenticado nao seja admin
			if (req.usuarioAutenticado.nivel < 2) return res.status(401).json({erros: "usuario sem permissao"});

			// const usuarios = await Usuarios.find().sort({ createdAt: -1});

			const { page = 1 } = req.query;
			
			const usuarios = await Usuarios.paginate({}, {
				page,
				limit: 10, 
				sort: {
					createdAt: -1
				}});

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

			/* para garantir que os usuarios nao tenham acesso ao roles
				assim, o model atribui o valor padrao de 1
			*/
			if(req.body.nivel) delete req.body.nivel
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

			//caso o usuario autenticado tente ver outro usuario
			if (req.usuarioAutenticado.nivel < 2 && req.params.email != req.usuarioAutenticado.email){
				return res.status(401).json({
					erros: "falha nas credenciais"
				});
			}

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
			if (req.usuarioAutenticado.nivel < 2 && req.params.email != req.usuarioAutenticado.email){
				return res.status(401).json({
					erros: "falha nas credenciais"
				});
			}

			// garante que um user comum nao altere seu role
			if (req.usuarioAutenticado.nivel < 2) req.body.nivel = 1

			const usuario = await Usuarios.findOneAndUpdate({
				email: req.params.email },
			{
				nome: req.body.nome,
				sobreNome: req.body.sobreNome,
				email: req.body.email,
				senha: req.body.senha,
				nivel: req.body.nivel },
			{
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
			if (req.usuarioAutenticado.nivel < 2 && req.params.email != req.usuarioAutenticado.email) return res.status(401).json({erros: "falha na credencial"});

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