const UserModel = require("./../model/user");
const TelefoneModel = require("./../model/telefone");
const config = require("./../configs/config");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const Sequelize = require("sequelize").Sequelize;

class User{

  /**
    Signup
    Realiza o cadastramento do usuario
  */

  signup(req, res){
    
    var userData = req.body;

    if(!userData.nome){
      res.status(400).send({'message': 'Nome é obrigatorio'});
      return;
    }

    if(!userData.email){
      res.status(400).send({'message': 'E-mail é obrigatorio'});
      return;
    }

    if(!userData.senha){
      res.status(400).send({'message': 'Senha é obrigatoria'});
      return;
    }

    UserModel.findOne({where: {email: userData.email}}).then(user => {
      if(user){
        res.status(400).send({'message': 'E-mail já existente'});        
      }
      else{

        UserModel.create({
          nome: userData.nome,
          email: userData.email,
          ultimo_login: new Date(),
          senha: sha1(userData.senha)
        }).then(user => {

          var token = jwt.sign({
            'id': user.id,
            'nome': user.nome,
            'email': user.email
          }, config.token.secret, config.token.options);

          user.token = token;
          user.save();

          userData.telefones.forEach(elem => {
            TelefoneModel.create({
              userId: user.id,
              numero: elem.numero,
              ddd: elem.ddd
            });
          });

          var response = {
            'id': user.id,
            'nome': user.nome,
            'email': user.email,
            'data_criacao': user.data_criacao,
            'data_atualizacao': user.data_atualizacao,
            'ultimo_login': user.ultimo_login,
            'token': user.token,
            'telefones': []
          };

          user.getTelefones().then(telefones => {
            telefones.forEach(tel => {
              response.telefones.push({
                numero: tel.numero,
                ddd: tel.ddd
              });
            });
  
            res.status(200).send(response);
          });
    

        });

      }
    });
  }

  /**
    Signin
    Realiza o login do usuario 
  **/

  signin(req, res){
    var data = req.body;

    if(!data.email){
      res.status(400).send({message: 'E-mail obrigatorio'});
      return;
    }

    if(!data.senha){
      res.status(400).send({message: 'Senha e obrigatoria'});
      return;
    }

    UserModel.findOne({where: {email: data.email, senha: sha1(data.senha)}}).then(user => {
      if(!user){
        res.status(401).send({message: 'Usuário e/ou senha inválidos'});
      }
      else{

        var token = jwt.sign({
          'id': user.id,
          'nome': user.nome,
          'email': user.email
        }, config.token.secret, config.token.options);

        user.token = token;
        user.ultimo_login = new Date();
        user.save();

        var response = {
          'id': user.id,
          'nome': user.nome,
          'email': user.email,
          'data_criacao': user.data_criacao,
          'data_atualizacao': user.data_atualizacao,
          'ultimo_login': user.ultimo_login,
          'token': user.token,
          'telefones': []
        };

        user.getTelefones().then(telefones => {
          telefones.forEach(tel => {
            response.telefones.push({
              numero: tel.numero,
              ddd: tel.ddd
            });
          });

          res.status(200).send(response);
        });
      }
    });
  } 

  /** 
    find
    Realiza a busca por um usuario
  **/

  users(req, res){

    var token = req.get("Authentication");

    if(!token){
      res.status(401).send({messagem: "Não autorizado"});
    }

    jwt.verify(token, config.token.secret, config.token.options, (err, decoded) => {

      if(err){
        res.status(401).send({messagem: "Não autorizado"});
      }
      else{

        var user_id = decoded.id;
        UserModel.findOne({where: {id: user_id}}).then(user => {

          if(user){
            if(token !== user.token){
              res.status(401).send({messagem: "Não autorizado"});
            }
            else{
              var now = new Date();
              var d = new Date(user.ultimo_login);

              if(now.getMinutes() - d.getMinutes() > 30){
                res.status(401).send({mensagem: "Sessão invalida"});
              }
              else{

                var response = {
                  'id': user.id,
                  'nome': user.nome,
                  'email': user.email,
                  'data_criacao': user.data_criacao,
                  'data_atualizacao': user.data_atualizacao,
                  'ultimo_login': user.ultimo_login,
                  'token': user.token,
                  'telefones': []
                };

                user.getTelefones().then(telefones => {
                  telefones.forEach(tel => {
                    response.telefones.push({
                      numero: tel.numero,
                      ddd: tel.ddd
                    });
                  });

                  res.status(200).send(response);
                });

              }
            }            
          }
          else{
            res.status(401).send({messagem: "Não autorizado"});
          }
        });
      }

    });
  }
}

module.exports = new User();