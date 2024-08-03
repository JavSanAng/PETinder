const express = require('express');
const { getPets, addPet, deletePet, updatePet } = require('../controllers/petController');
const authMiddleware = require ("../middlewares/authMiddleware")
const router = express.Router();

router.get('/',authMiddleware, getPets);
router.post('/',authMiddleware, addPet);
router.delete('/:id',authMiddleware, deletePet);
router.put('/:id', authMiddleware, updatePet);

module.exports = router;