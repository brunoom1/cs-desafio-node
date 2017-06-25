var express = require("express");
var bodyParser = require("body-parser");
var sequelize = require("sequelize");
var config_db = require("./configs/db");

// App criada
var app = express();

var env = process.env.ENV;

switch(env){
  case "test": {
    config_db = config_db.test;
  } break;
  default: {
    config_db = config_db.dev;
  }
}

// iniciando ORM
const orm = new sequelize.Sequelize(config_db.database, config_db.username, config_db.password, config_db.options);
orm.authenticate()
  .then(() => {
    console.log("Conexao realizada com sucesso");
  })
  .catch( err => {
    console.log("Erro na conexao: ", err);
  });

app.orm = orm;

// aplicando bodyparser para o tipo json
app.use(bodyParser.json());


app.post('/signup', (req, res) => {
  require('./controller/user').signup(req, res);
});

app.post('/signin', (req, res) => {
  require('./controller/user').signin(req, res);
});

app.get('/users/', (req, res) => {
  require('./controller/user').users(req, res);
});


module.exports = app;
