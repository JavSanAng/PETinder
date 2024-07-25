const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pet = require('./Pet'); 

const Post = sequelize.define('Post', {
  post_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pet,
      key: 'pet_id',
    },
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  content: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
  tableName: 'posts',
});


Post.belongsTo(Pet, { foreignKey: 'pet_id' });

module.exports = Post;
