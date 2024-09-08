import Reaction from '../models/reactionModel.js';
import Post from '../models/postModel.js';

export const addReaction = async (req, res) => {
    try {
        const { type } = req.body; // 'like', 'love', etc.
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        let reaction = await Reaction.findOne({
            user: req.user._id,
            post: req.params.postId
        });

        if (reaction) {
            // Update existing reaction
            reaction.type = type;
        } else {
            // Create new reaction
            reaction = new Reaction({
                type,
                user: req.user._id,
                post: req.params.postId
            });
        }

        await reaction.save();
        res.status(201).json(reaction);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reaction', error: error.message });
    }
};

export const removeReaction = async (req, res) => {
    try {
        const reaction = await Reaction.findOneAndDelete({
            user: req.user._id,
            post: req.params.postId
        });

        if (!reaction) {
            return res.status(404).json({ message: 'Reaction not found' });
        }

        res.json({ message: 'Reaction removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error: error.message });
    }
};

export const getReactions = async (req, res) => {
    try {
        const reactions = await Reaction.find({ post: req.params.postId })
            .populate('user', 'username');
        res.json(reactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reactions', error: error.message });
    }
};