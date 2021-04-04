const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: 5432,
  dialect: 'postgres',
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

module.exports = { dbConnection, sequelize };
