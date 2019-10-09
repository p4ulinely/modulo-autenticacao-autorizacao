const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//carregando controllers
const UsuariosController = require('./controllers/UsuariosController');

router.get('/', (req, res) => {
	res.json({api: "api-news"});
});

router.get('/usuarios', verificarJWT, UsuariosController.index);
router.get('/usuarios/:email', UsuariosController.show);
router.delete('/usuarios/:email', UsuariosController.destroy);
router.put('/usuarios/:email', UsuariosController.update);
router.post('/usuarios', UsuariosController.create);

function verificarJWT(req, res, next){
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, erros: 'Token nao fornecido' });
  
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err) return res.status(500).send({ auth: false, erros: 'Falha ao autenticar token' });
		req.userId = decoded.id;
		console.log(req.userId);
		next();
	});
}

module.exports = router;