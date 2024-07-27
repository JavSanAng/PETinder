const Post = require('../models/Post');
const Pet = require('../models/Pet');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getPosts = async (req, res) => {
  const userId = req.query.userId;
  const token = req.header('Authorization');
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      let posts;
      if (userId !== "undefined") {
        posts = await Post.findAll({
          where: { userId: userId },
          include: { model: Pet },
          order: [['createdAt', 'DESC']],
        });
      } else {
        posts = await Post.findAll({
          include: { model: Pet },
          order: [['createdAt', 'DESC']],
        });
      }
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

exports.addPost = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const newPost = await Post.create({
        desc: req.body.desc,
        img: req.body.img,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        userId: userInfo.id,
      });
      return res.status(200).json("Post has been created.");
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

exports.deletePost = async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const result = await Post.destroy({
        where: {
          post_id: req.params.id,
          userId: userInfo.id,
        },
      });
      if (result > 0) {
        return res.status(200).json("Post has been deleted.");
      } else {
        return res.status(403).json("You can delete only your post");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};