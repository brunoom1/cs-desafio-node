var path = require("path");

var root_dir = path.dirname(__filename) + "/../..";

var config = {
  dev: {
    database: '',
    username: '',
    password: '',

    options: {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 1,
        min: 0,
        idle: 10000
      },

      // SQLite only
      storage: root_dir + '/db/database.sqlite'
    }
  },
  test: {
    database: '',
    username: '',
    password: '',

    options: {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      // SQLite only
      storage: root_dir + '/db/database-test.sqlite'
    }    
  }
};

module.exports = config;