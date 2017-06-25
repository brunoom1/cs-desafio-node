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
      storage: './db/database.sqlite'
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
      storage: './db/database-test.sqlite'
    }    
  }
};

module.exports = config;