const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');
const authMiddleware = require ("../middlewares/authMiddleware")

const router = express.Router();

router.get('/:userId', authMiddleware ,getUser);
router.put('/',authMiddleware, updateUser);

module.exports = router;