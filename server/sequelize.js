const { Sequelize,Op } = require('sequelize');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operators: false,
  }
);

module.exports = sequelize;
