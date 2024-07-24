const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pet = require('./petModel'); 
const Friend = sequelize.define('Friend', {
  friends_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pet_id_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pet,
      key: 'pet_id',
    },
  },
  pet_id_2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pet,
      key: 'pet_id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['pending', 'accepted', 'rejected']],
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'friends',
});


Friend.belongsTo(Pet, { as: 'Pet1', foreignKey: 'pet_id_1' });
Friend.belongsTo(Pet, { as: 'Pet2', foreignKey: 'pet_id_2' });

module.exports = Friend;
