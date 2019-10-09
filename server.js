const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const loginBD = require('./src/loginDb');
// require("dotenv-safe").config({path: __dirname + '/.env'});
require("dotenv-safe").config();

//iniciando app
const app = express();
app.use(express.json());

//iniciando BD
mongoose.connect(`mongodb+srv://${loginBD.usuario}:${loginBD.senha}@cluster-mongo-jglvg.mongodb.net/test?retryWrites=true&w=majority`, {
	useNewUrlParser: true
}).then(() => {
	console.log('MongoDB is on!');

}).catch(err => {
	console.log(`MongoDB: ${err}`);
});

mongoose.set('useFindAndModify', true);
mongoose.set('useUnifiedTopology', true);

//carregando todos os models
requireDir('./src/models');

//carregando controllers
const LoginController = require('./src/controllers/LoginController');

//rotas app
app.get('/', (req, res) => {
	res.send("<p align='center'><a href='/api'>API news</a></p>");
});
app.post('/login', LoginController.index);

//rotas da api
app.use('/api', require('./src/routes'));

//porta
app.listen(8000, () => {
	console.log('Server is On (8000)!');
});