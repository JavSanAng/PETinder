const User = require('../models/User.js');

exports.getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user; 

  try {
    const [updated] = await User.update(
      {
        user_name: req.body.user_name,
        avatar: req.body.avatar,
      },
      {
        where: { user_id: userId }
      }
    );
    if (updated) {
      const updatedUser = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      return res.json(updatedUser);
    }
    throw new Error('User not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};