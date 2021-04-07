const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const User = sequelize.define(
  'User',
  {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'Users',
    timestamps: true,
  }
);

module.exports = { User };
