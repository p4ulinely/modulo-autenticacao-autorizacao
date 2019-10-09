const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const jwt = require('jsonwebtoken');

module.exports = {
	async index(req, res){
		try {
			const usuario = await Usuarios.find({
				email: req.body.email,
				senha: req.body.senha
			});

			if (usuario.length > 0) {
				const token = jwt.sign({ usuario }, process.env.SECRET, {
					expiresIn: 300
				});

				res.json({ 
					auth: true,
					token: token
				});
			} else {
				res.status(400).json({
					erros: "email ou senha incorretos"
				});
			}

			// return (usuario.length > 0 ? res.json(usuario) : res.status(400).json({erros: "email ou senha incorretos"}))
		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	}
}