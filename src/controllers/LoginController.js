const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const jwt = require('jsonwebtoken');

module.exports = {
	async index(req, res){
		try {
			const usuario = await Usuarios.findOne({
				email: req.body.email,
				senha: req.body.senha
			});

			if (usuario != null) {
				const token = jwt.sign({ usuario }, process.env.SECRET, {
					expiresIn: 600 //10 minutos
				});

				// res.json(usuario);
				// res.redirect('/api/usuarios');
				res.json({ 
					auth: true,
					token: token
				});				
			} else {
				res.status(400).json({
					erros: "email ou senha incorretos"
				});
			}

		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	}
}