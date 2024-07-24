const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel'); 

const Pet = sequelize.define('Pet', {
  pet_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pet_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  city: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'pet',
});


Pet.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Pet;
