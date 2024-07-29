const Relationship = require('../models/Relationship');
const jwt = require('jsonwebtoken');

const getRelationships = async (req, res) => {
    try {
        const relationships = await Relationship.findAll({
            where: { followedUserId: req.query.followedUserId },
            attributes: ['followerUserId']
        });
        return res.status(200).json(relationships.map(relationship => relationship.followerUserId));
    } catch (err) {
        return res.status(500).json(err);
    }
};

const addRelationship = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json("Not logged in!");

    const token = authHeader.split(' ')[1];
    try {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET);
        await Relationship.create({
            followerUserId: userInfo.user_id,
            followedUserId: req.body.userId
        });
        return res.status(200).json("Following");
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json("Token is not valid!");
        }
        return res.status(500).json(err);
    }
};

const deleteRelationship = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json("Not logged in!");

    const token = authHeader.split(' ')[1];
    try {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET);
        await Relationship.destroy({
            where: {
                followerUserId: userInfo.user_id,
                followedUserId: req.query.userId
            }
        });
        return res.status(200).json("Unfollow");
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json("Token is not valid!");
        }
        return res.status(500).json(err);
    }
};

module.exports = {
    getRelationships,
    addRelationship,
    deleteRelationship,
};