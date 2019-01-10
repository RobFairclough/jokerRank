const pgp = require('pg-promise')();
console.log(process.env.NODE_ENV);
const config =
  process.env.NODE_ENV === 'production'
    ? require('../config')
    : {
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT,
        database: 'jokes',
        // host: "localhost",
        // port: 5432,
        // database: "jokes",
        delpass: 'rob'
      };

const db = pgp(config);

module.exports = db;
