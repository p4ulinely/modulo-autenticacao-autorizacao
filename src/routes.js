const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//carregando controllers
const UsuariosController = require('./controllers/UsuariosController');

//midlleware para verificar token
const verificarJWT = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, erros: 'Token nao fornecido' });

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) return res.status(500).send({ auth: false, erros: 'Falha ao autenticar token' });
		req.usuarioAutenticado = decoded.usuario;
		next();
	});
}

router.get('/', (req, res) => {
	res.json({api: "api-news"});
});

router.get('/usuarios', verificarJWT, UsuariosController.index);
router.get('/usuarios/:email', UsuariosController.show);
router.delete('/usuarios/:email', verificarJWT, UsuariosController.destroy);
router.put('/usuarios/:email', verificarJWT, UsuariosController.update);
router.post('/usuarios', UsuariosController.create);

module.exports = router;