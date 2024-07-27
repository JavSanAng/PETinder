const Pet = require('../models/Pet');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getPets = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const pets = await Pet.findAll({
        include: [{
          model: User,
          attributes: ['name'],
          where: {
            user_id: userInfo.user_id
          }
        }],
        limit: 4
      });
      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

exports.addPet = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const newPet = await Pet.create({
        pet_name: req.body.pet_name,
        avatar: req.body.avatar,
        city: req.body.city,
        user_id: userInfo.user_id,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      });
      return res.status(201).json("Pet has been created.");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

exports.deletePet = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const result = await Pet.destroy({
        where: {
          pet_id: req.params.id,
          user_id: userInfo.user_id,
        },
      });
      if (result > 0) {
        return res.status(200).json("Pet has been deleted.");
      } else {
        return res.status(403).json("You can delete only your pet!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};