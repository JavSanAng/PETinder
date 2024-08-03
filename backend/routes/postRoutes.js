
const express = require('express');
const { getPosts, addPost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getPosts);
router.post('/', authMiddleware, addPost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;