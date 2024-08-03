const express = require('express');
const { getRelationships, addRelationship, deleteRelationship } = require('../controllers/relationshipController');
const authMiddleware = require ("../middlewares/authMiddleware")

const router = express.Router();

router.get('/',authMiddleware, getRelationships);
router.post('/',authMiddleware, addRelationship);
router.delete('/',authMiddleware,  deleteRelationship);

module.exports = router;