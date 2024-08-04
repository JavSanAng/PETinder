

const express = require('express');
const { getPosts, addPost, deletePost, updatePost, getPostsByUserOrPets } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getPosts);
router.get('/user/:userId', authMiddleware, getPostsByUserOrPets); // Ruta para obtener posts por usuario
router.post('/', authMiddleware, addPost);
router.delete('/:id', authMiddleware, deletePost);
router.put('/:id', authMiddleware, updatePost);

module.exports = router;