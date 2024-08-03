const User = require('./User');
const Relationship = require('./Relationship');


User.belongsToMany(User, {
  through: Relationship,
  as: 'Followers',
  foreignKey: 'followedUserId',
  otherKey: 'followerUserId',
});

User.belongsToMany(User, {
  through: Relationship,
  as: 'Followings',
  foreignKey: 'followerUserId',
  otherKey: 'followedUserId',
});

module.exports = { User, Relationship };