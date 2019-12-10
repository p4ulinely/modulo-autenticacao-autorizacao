const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

//midlleware para verificar token
const verificacao = (req, res, next) => {

	const token = req.headers['authorization'] || req.headers['x-access-token'];

	if (!token) return res.status(401).send({ auth: false, erros: "token nao fornecido" });

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) return res.status(500).send({ auth: false, erros: "falha ao autenticar token" });
		req.usuarioAutenticado = decoded.usuario;
		next();
	});
}

module.exports = verificacao;