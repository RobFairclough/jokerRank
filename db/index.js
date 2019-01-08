const pgp = require('pg-promise')();

const config = require('../config/config');

const db = pgp(config);

module.exports = db;
