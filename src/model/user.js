var app = require("./../app.js");
var Sequelize = require('sequelize').Sequelize;
var Telefone = require('./telefone');

const User = app.orm.define('user', {

  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV1    
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'compositeIndex',
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },

  data_criacao: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

  data_atualizacao: {
    type: Sequelize.DATE,
    allowNull: true
  },

  ultimo_login: {
    type: Sequelize.DATE,
    allowNull: true
  },

  token: {
    type: String,
    allowNull: true,
    unique: 'compositeIndex'
  }
});

User.hasMany(Telefone, {as: 'Telefones'});

module.exports = User;