
const Post = require('../models/Post');
const Pet = require('../models/Pet');
const User = require('../models/User'); 

exports.getPosts = async (req, res) => {
    const userId = req.query.userId;

    try {
        let posts;
        if (userId) {
            console.log(`Fetching posts for user ID: ${userId}`);
            posts = await Post.findAll({
                include: [
                    {
                        model: Pet,
                        attributes: ['pet_name'],
                        include: {
                            model: User,
                            attributes: ['user_name'],
                            where: { user_id: userId }
                        }
                    }
                ],
                order: [['date', 'DESC']],
            });
        } else {
            console.log('Fetching all posts');
            posts = await Post.findAll({
                include: [
                    {
                        model: Pet,
                        attributes: ['pet_name'],
                        include: {
                            model: User,
                            attributes: ['user_name']
                        }
                    }
                ],
                order: [['date', 'DESC']],
            });
        }
        console.log('Posts fetched successfully:', posts);
        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Error fetching posts' });
    }
};

exports.getPostsByUserOrPets = async (req, res) => {
    const userId = req.params.userId;

    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: Pet,
                    attributes: ['pet_name'],
                    include: {
                        model: User,
                        attributes: ['user_name'],
                        where: { user_id: userId }
                    }
                }
            ],
            order: [['date', 'DESC']],
        });

        console.log(`Posts for user ID ${userId} fetched successfully:`, posts);
        return res.status(200).json(posts);
    } catch (error) {
        console.error(`Error fetching posts for user ID ${userId}:`, error);
        return res.status(500).json({ error: 'Error fetching posts' });
    }
};

exports.addPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            content: req.body.content,
            pet_id: req.body.pet_id,
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        });
        console.log('Post created successfully:', newPost);
        return res.status(200).json("Post has been created.");
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Error creating post' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const result = await Post.destroy({
            where: {
                post_id: req.params.id,
                pet_id: req.body.pet_id,
            },
        });
        if (result > 0) {
            console.log('Post deleted successfully');
            return res.status(200).json("Post has been deleted.");
        } else {
            return res.status(403).json("You can delete only your post");
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: 'Error deleting post' });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { content, pet_id } = req.body;

    try {
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.content = content;
        post.pet_id = pet_id;

        await post.save();
        console.log('Post updated successfully:', post);
        return res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ error: 'Error updating post' });
    }
};