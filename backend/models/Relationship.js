
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Relationship = sequelize.define('Relationship', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  followerUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
  followedUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_id'
    }
  },
}, {
  timestamps: true,
  tableName: 'relationships',
});

module.exports = Relationship;
