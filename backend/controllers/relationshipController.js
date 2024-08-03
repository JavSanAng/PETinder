const Relationship = require('../models/Relationship');

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
    try {
        await Relationship.create({
            followerUserId: req.user.user_id,
            followedUserId: req.body.userId
        });
        return res.status(200).json("Following");
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteRelationship = async (req, res) => {
    try {
        await Relationship.destroy({
            where: {
                followerUserId: req.user.user_id,
                followedUserId: req.query.userId
            }
        });
        return res.status(200).json("Unfollow");
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    getRelationships,
    addRelationship,
    deleteRelationship,
};