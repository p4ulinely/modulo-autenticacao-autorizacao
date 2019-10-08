const express = require('express');
const router = express.Router();

//const NewsController = require('./controllers/NewsController');
const UsuariosController = require('./controllers/UsuariosController');

router.get('/', (req, res) => {
	res.json({api: "api-news"});
});

router.get('/usuarios', UsuariosController.index);
router.get('/usuarios/:email', UsuariosController.show);
router.delete('/usuarios/:email', UsuariosController.destroy);
router.put('/usuarios/:email', UsuariosController.update);
router.post('/usuarios', UsuariosController.create);

module.exports = router;