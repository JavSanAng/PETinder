const Pet = require('../models/Pet');
const User = require('../models/User'); 
require('dotenv').config();

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: [{
        model: User,
        attributes: ['user_name'], 
        where: {
          user_id: req.user.user_id
        }
      }],
      limit: 10
    });
    return res.status(200).json(pets);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addPet = async (req, res) => {
  try {
    const newPet = await Pet.create({
      pet_name: req.body.pet_name,
      avatar: req.body.avatar,
      city: req.body.city,
      user_id: req.user.user_id,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
    return res.status(201).json("Pet has been created.");
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deletePet = async (req, res) => {
  try {
    const result = await Pet.destroy({
      where: {
        pet_id: req.params.id,
        user_id: req.user.user_id,
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
};

exports.updatePet = async (req, res) => {
  try {
    const { pet_name, avatar, city } = req.body;
    const petId = req.params.id;

    const [updated] = await Pet.update(
      { pet_name, avatar, city },
      { 
        where: { 
          pet_id: petId, 
          user_id: req.user.user_id 
        }
      }
    );

    if (updated) {
      const updatedPet = await Pet.findOne({ where: { pet_id: petId } });
      return res.status(200).json(updatedPet);
    }
    throw new Error('Pet not found');
  } catch (error) {
    return res.status(500).json(error);
  }
};