const express = require('express');
const router = express.Router();
const verificacao = require('./middlewares/auth');

//carregando controllers
const UsuariosController = require('./controllers/UsuariosController');

router.get('/', (req, res) => {
	res.json({api: "api-jwt"});
});

router.get('/usuarios', verificacao, UsuariosController.index);
router.get('/usuarios/:email', verificacao, UsuariosController.show);
router.delete('/usuarios/:email', verificacao, UsuariosController.destroy);
router.put('/usuarios/:email', verificacao, UsuariosController.update);
router.post('/usuarios', UsuariosController.create);

module.exports = router;