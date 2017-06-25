  var User = require("./src/model/user");
  var Telefone = require("./src/model/telefone");

  // cria tabela se nao existir
  User.sync().then(() => {
    console.log("Tabela usuario criada");
  }).catch(() => {
    console.log("Problema ao tentar criar tabela de usuarios");
  });

  Telefone.sync().then(() => {
    console.log("Tabela telefones criada");
  }).catch(() => {
    console.log('Problema ao tentar criar tabela de telefones');
  });
