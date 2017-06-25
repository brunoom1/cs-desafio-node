var app = require("./../app.js");
var Sequelize = require('sequelize').Sequelize;
var User = require("./user");

const Telefone = app.orm.define('telefone', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV1    
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ddd: {
    type: Sequelize.STRING(3),
    allowNull: false
  }
});

module.exports = Telefone;